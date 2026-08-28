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
  lang = "zh-HK"
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
  recognition.onerror = () => onEnd();
  recognition.onend = () => onEnd();

  recognition.start();
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

// Reads one or more Chinese/Cantonese lines aloud back-to-back (e.g. the
// chapter-start greeting followed by the first question) — same
// fallback-friendly design as speakEnglish, just with a Chinese voice
// preference instead of an English one. Chains lines via each utterance's
// onend so they play in order with a natural pause between them, rather
// than overlapping or requiring separate calls.
export async function speakChinese(text: string | string[], rate = 1): Promise<void> {
  const lines = (Array.isArray(text) ? text : [text]).filter(Boolean);
  if (!isSpeechSynthesisSupported() || lines.length === 0) return;
  const voices = await loadVoices();
  window.speechSynthesis.cancel();
  const best = pickBestVoiceZh(voices);
  const lang = best?.lang || "zh-HK";

  let i = 0;
  const speakNext = () => {
    if (i >= lines.length) return;
    const utterance = new SpeechSynthesisUtterance(lines[i]);
    utterance.lang = lang;
    utterance.rate = rate;
    if (best) utterance.voice = best;
    utterance.onend = () => {
      i += 1;
      speakNext();
    };
    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  };
  speakNext();
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
