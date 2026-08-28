// Thin wrappers around the browser's Web Speech API. Both STT (Cantonese input)
// and TTS (English model-sentence playback) run entirely client-side — no
// server/API-key dependency, so the core practice loop works out of the box.

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function getRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function isSpeechRecognitionSupported(): boolean {
  return getRecognitionCtor() !== null;
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function startListening(
  onResult: (text: string, isFinal: boolean) => void,
  onEnd: () => void,
  lang = "zh-HK",
  onError?: (error: string) => void
): (() => void) | null {
  const Ctor = getRecognitionCtor();
  if (!Ctor) return null;

  const recognition = new Ctor();
  recognition.lang = lang;
  recognition.interimResults = true;
  recognition.continuous = false;

  recognition.onresult = (event: any) => {
    let finalText = "";
    let interimText = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      if (result.isFinal) finalText += result[0].transcript;
      else interimText += result[0].transcript;
    }
    if (finalText) onResult(finalText, true);
    else if (interimText) onResult(interimText, false);
  };
  // event.error values per the Web Speech API spec: "not-allowed" (mic
  // permission denied/blocked), "no-speech" (timed out with nothing heard),
  // "audio-capture" (no mic found), "network", "language-not-supported", etc.
  // Previously this just silently stopped listening with no feedback at
  // all — from the user's side that's indistinguishable from "the mic
  // button is broken", so surface the reason to the caller.
  recognition.onerror = (event: any) => {
    onError?.(event?.error || "unknown");
    onEnd();
  };
  recognition.onend = () => onEnd();

  try {
    recognition.start();
  } catch {
    onError?.("start-failed");
    return null;
  }
  return () => recognition.stop();
}

let currentUtterance: SpeechSynthesisUtterance | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];
let voicesReadyPromise: Promise<SpeechSynthesisVoice[]> | null = null;

// Chrome/Edge report an empty voice list on the very first call — the
// browser loads its voice catalog asynchronously and fires "voiceschanged"
// once it's ready. Calling getVoices() synchronously before that (as the
// original implementation did) silently falls through to the OS's absolute
// default voice, which on Windows is usually the flattest, most "robotic"
// local SAPI voice available. Waiting for the real list fixes that.
function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!isSpeechSynthesisSupported()) return Promise.resolve([]);
  if (cachedVoices.length > 0) return Promise.resolve(cachedVoices);
  if (voicesReadyPromise) return voicesReadyPromise;

  voicesReadyPromise = new Promise((resolve) => {
    const immediate = window.speechSynthesis.getVoices();
    if (immediate.length > 0) {
      cachedVoices = immediate;
      resolve(immediate);
      return;
    }
    const onVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        cachedVoices = voices;
        window.speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged);
        resolve(voices);
      }
    };
    window.speechSynthesis.addEventListener("voiceschanged", onVoicesChanged);
    // Some browsers never fire the event — don't hang forever.
    setTimeout(() => resolve(window.speechSynthesis.getVoices()), 1000);
  });
  return voicesReadyPromise;
}

// Ranks voices so we consistently pick the most natural-sounding option the
// browser has available, instead of whatever happens to be first/default.
// Edge's "Online (Natural)" voices and Chrome's "Google" voices are
// cloud/neural-quality and sound meaningfully more human than local OS
// voices — and picking one costs nothing extra, it's just a better default.
function scoreVoice(voice: SpeechSynthesisVoice): number {
  if (!voice.lang.toLowerCase().startsWith("en")) return -1;
  const name = voice.name.toLowerCase();
  let score = 0;
  if (voice.lang.toLowerCase() === "en-us") score += 2;
  if (name.includes("online") || name.includes("natural")) score += 10;
  if (name.includes("google")) score += 6;
  if (
    name.includes("aria") ||
    name.includes("jenny") ||
    name.includes("samantha") ||
    name.includes("female")
  )
    score += 2;
  if (voice.localService) score -= 1;
  return score;
}

function pickBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  return voices
    .map((v) => ({ voice: v, score: scoreVoice(v) }))
    .filter((entry) => entry.score >= 0)
    .sort((a, b) => b.score - a.score)[0]?.voice;
}

export async function speakEnglish(text: string, rate = 1): Promise<void> {
  if (!isSpeechSynthesisSupported()) return;
  const voices = await loadVoices();
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  const best = pickBestVoice(voices);
  if (best) utterance.voice = best;
  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

// Same natural-voice-picking approach as scoreVoice, but for the Chinese
// question text — prefers an actual Cantonese (zh-HK) voice, then falls
// back through Traditional/Simplified Mandarin if the device has no
// Cantonese voice installed (common on Windows).
function scoreVoiceZh(voice: SpeechSynthesisVoice): number {
  const lang = voice.lang.toLowerCase();
  if (!lang.startsWith("zh")) return -1;
  const name = voice.name.toLowerCase();
  let score = 0;
  if (lang === "zh-hk") score += 5;
  else if (lang === "zh-tw") score += 2;
  else if (lang === "zh-cn") score += 1;
  if (name.includes("online") || name.includes("natural")) score += 10;
  if (name.includes("google")) score += 6;
  if (voice.localService) score -= 1;
  return score;
}

function pickBestVoiceZh(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  return voices
    .map((v) => ({ voice: v, score: scoreVoiceZh(v) }))
    .filter((entry) => entry.score >= 0)
    .sort((a, b) => b.score - a.score)[0]?.voice;
}

let speechUnlocked = false;

// Mobile browsers (iOS Safari in particular, and some Android WebViews)
// only allow speechSynthesis.speak() when it's part of a real user
// gesture's call stack. Our auto-speak calls fire from a useEffect after
// navigation/render, one step removed from the tap that triggered them, so
// they get silently blocked — no error, just no sound. Calling one silent
// zero-length utterance synchronously inside the very first tap/click
// anywhere in the app unlocks the engine for the rest of the page session,
// so later programmatic calls (auto-speaking a question on turn change)
// work normally. Safe to call multiple times; only the first tap does
// anything.
export function unlockSpeechOnFirstInteraction(): void {
  if (typeof document === "undefined" || !isSpeechSynthesisSupported()) return;
  const unlock = () => {
    if (speechUnlocked) return;
    speechUnlocked = true;
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(""));
  };
  document.addEventListener("touchend", unlock, { once: true, passive: true });
  document.addEventListener("click", unlock, { once: true });
}

let currentAudioEl: HTMLAudioElement | null = null;

export function cancelSpeech(): void {
  if (isSpeechSynthesisSupported()) window.speechSynthesis.cancel();
  currentUtterance = null;
  if (currentAudioEl) {
    currentAudioEl.pause();
    currentAudioEl = null;
  }
}

// Plays a pre-recorded model-sentence clip from /public/audio (see
// scripts/audio-manifest.md for the recording list and naming convention),
// falling back to browser TTS if the clip is missing — so content added
// later without a recording still has a voice, and nothing breaks if a
// filename typo slips through.
export function playModelAudio(audioId: string, fallbackText: string, rate = 1): void {
  cancelSpeech();
  const audio = new Audio(`/audio/${audioId}.mp3`);
  audio.playbackRate = rate;
  currentAudioEl = audio;

  let fellBack = false;
  const fallback = () => {
    if (fellBack) return;
    fellBack = true;
    speakEnglish(fallbackText, rate);
  };

  audio.addEventListener("error", fallback);
  audio.play().catch(fallback);
}

// Plays a sequence of Cantonese narration lines (e.g. chapter greeting +
// question), using a pre-recorded per-tutor clip when available for a line
// and falling back to live TTS for just that line otherwise — so a
// partially-recorded narration set (some turns done, some not yet) still
// plays correctly, and a line with no possible recording (audioId: null,
// e.g. the greeting, which is built from the learner's own name at
// runtime) always uses live TTS.
export function playNarrationSequence(
  lines: { audioId: string | null; text: string }[],
  rate = 1
): void {
  cancelSpeech();
  const filtered = lines.filter((l) => l.text);
  if (filtered.length === 0) return;

  let i = 0;
  const playNext = async () => {
    if (i >= filtered.length) return;
    const { audioId, text } = filtered[i];

    const speakLiveThenNext = async () => {
      if (!isSpeechSynthesisSupported()) {
        i += 1;
        playNext();
        return;
      }
      const voices = await loadVoices();
      const best = pickBestVoiceZh(voices);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = best?.lang || "zh-HK";
      utterance.rate = rate;
      if (best) utterance.voice = best;
      utterance.onend = () => {
        i += 1;
        playNext();
      };
      currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    };

    if (!audioId) {
      speakLiveThenNext();
      return;
    }

    const audio = new Audio(`/audio/${audioId}.mp3`);
    audio.playbackRate = rate;
    currentAudioEl = audio;
    let fellBack = false;
    const fallback = () => {
      if (fellBack) return;
      fellBack = true;
      speakLiveThenNext();
    };
    audio.addEventListener("error", fallback);
    audio.addEventListener("ended", () => {
      i += 1;
      playNext();
    });
    audio.play().catch(fallback);
  };
  playNext();
}

// Plays the encouragement line, trying three tiers in order: (1) a single
// clip for the full sentence — how earlier chapters were recorded, before
// the shared-prefix split existed, and re-recording those isn't worth it;
// (2) a shared "明白了，你想" prefix clip (recorded once per tutor) + a
// short per-turn suffix clip — how later chapters are recorded, since
// saying that opener 126 times over was pure repetition; (3) live TTS for
// the full text if neither recording exists yet. Whichever tier actually
// has files on disk for a given turn plays correctly — no need to track
// which chapters use which scheme.
export function playEncouragementAudio(
  fullAudioId: string,
  prefixLine: { audioId: string; text: string },
  suffixLine: { audioId: string; text: string },
  rate = 1
): void {
  cancelSpeech();
  const fullAudio = new Audio(`/audio/${fullAudioId}.mp3`);
  fullAudio.playbackRate = rate;
  currentAudioEl = fullAudio;
  let fellBack = false;
  const trySplitFormat = () => {
    if (fellBack) return;
    fellBack = true;
    playNarrationSequence([prefixLine, suffixLine], rate);
  };
  fullAudio.addEventListener("error", trySplitFormat);
  fullAudio.play().catch(trySplitFormat);
}

// Plays a model sentence that has the learner's own name spliced into it:
// recorded clip (prefix) -> live TTS of just the name -> recorded clip
// (suffix). Keeps Riley's real voice for the fixed wording either side of
// the name, so only the one arbitrary word ever sounds synthesized, instead
// of falling back to full-sentence TTS for the whole line. Falls back to
// full-sentence TTS (fallbackText) if either clip is missing/fails, so
// nothing breaks before both halves are recorded.
export function playNameSplicedAudio(
  prefixAudioId: string,
  suffixAudioId: string,
  name: string,
  fallbackText: string,
  rate = 1
): void {
  cancelSpeech();

  let failed = false;
  const fallbackToFullSentence = () => {
    if (failed) return;
    failed = true;
    speakEnglish(fallbackText, rate);
  };

  const speakNameThenSuffix = async () => {
    if (failed || !isSpeechSynthesisSupported()) {
      fallbackToFullSentence();
      return;
    }
    const voices = await loadVoices();
    if (failed) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(name);
    utterance.lang = "en-US";
    utterance.rate = rate;
    const best = pickBestVoice(voices);
    if (best) utterance.voice = best;
    utterance.onend = () => {
      if (failed) return;
      const suffixAudio = new Audio(`/audio/${suffixAudioId}.mp3`);
      suffixAudio.playbackRate = rate;
      currentAudioEl = suffixAudio;
      suffixAudio.addEventListener("error", fallbackToFullSentence);
      suffixAudio.play().catch(fallbackToFullSentence);
    };
    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const prefixAudio = new Audio(`/audio/${prefixAudioId}.mp3`);
  prefixAudio.playbackRate = rate;
  currentAudioEl = prefixAudio;
  prefixAudio.addEventListener("error", fallbackToFullSentence);
  prefixAudio.addEventListener("ended", speakNameThenSuffix);
  prefixAudio.play().catch(fallbackToFullSentence);
}
