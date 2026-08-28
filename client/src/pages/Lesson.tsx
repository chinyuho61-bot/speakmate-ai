import { useEffect, useRef, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { X, Mic, Volume2, Gauge, CheckCheck } from "lucide-react";
import { getScenario, getScenarioIndex, scenarios } from "@shared/scenarios";
import { api } from "@/lib/api";
import {
  isSpeechRecognitionSupported,
  startListening,
  playModelAudio,
  playNameSplicedAudio,
  playNarrationSequence,
  speakEnglish,
  cancelSpeech,
} from "@/lib/speech";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { RileyVideo } from "@/components/RileyVideo";
import { extractSelfIntroName } from "@/lib/nameExtract";
import { getCurrentTutorName, getStoredTutorId } from "@/lib/tutors";
import type { ModelSentence } from "@shared/types";

type Phase = "ask" | "answer" | "understood" | "model" | "complete";

// Every encouragementZh in shared/scenarios.ts starts with this exact
// phrase — split out here so it can be recorded once per tutor instead of
// once per turn (see the encouragement-narration effect below).
const ENCOURAGEMENT_PREFIX = "明白了，你想";

export function LessonPage() {
  const [, params] = useRoute<{ scenarioId: string; chapterId: string }>(
    "/lesson/:scenarioId/:chapterId"
  );
  const [, navigate] = useLocation();
  const { t } = useI18n();
  const { user } = useAuth();
  const tutorName = getCurrentTutorName();
  const scenario = params ? getScenario(params.scenarioId) : undefined;
  const chapter = scenario?.chapters.find((c) => c.id === params?.chapterId);

  const [turnIndex, setTurnIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("ask");
  const [answerText, setAnswerText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const stopListeningRef = useRef<(() => void) | null>(null);
  const [completing, setCompleting] = useState(false);
  // The learner's own name, once we spot it in a "我叫X" / "我係X" answer —
  // kept for the rest of the chapter so every later model sentence that
  // uses the placeholder example name swaps in theirs instead.
  const [learnerName, setLearnerName] = useState<string | null>(null);
  // Per-turn override: when a turn's answer matches a `variants` keyword,
  // the models actually taught for that turn index — so both the live
  // lesson and the chapter-completion summary reflect what the learner
  // said instead of always the same fixed example.
  const [matchedModelsByTurn, setMatchedModelsByTurn] = useState<Record<number, ModelSentence[]>>(
    {}
  );

  useEffect(() => {
    setTurnIndex(0);
    setPhase("ask");
    setAnswerText("");
    setLearnerName(null);
    setMatchedModelsByTurn({});
  }, [params?.scenarioId, params?.chapterId]);

  useEffect(() => {
    return () => {
      stopListeningRef.current?.();
    };
  }, []);

  // Reads the question aloud as soon as a turn starts, so the tutor "asks"
  // it instead of the learner having to silently read the card themselves.
  // At the start of a chapter (turnIndex 0), it leads with a personalized
  // greeting — learner's name + what this chapter covers — before the
  // question, same as the reference app's "Alice, welcome back!" intro.
  useEffect(() => {
    if (phase !== "ask") return;
    const activeTurn = chapter?.turns[turnIndex];
    const questionZh = activeTurn?.questionZh;
    if (!questionZh || !scenario || !chapter) return;
    const questionAudioId = `${getStoredTutorId()}/zh/${scenario.id}--${chapter.id}--${activeTurn!.id}--question`;
    if (turnIndex === 0 && user?.name) {
      const greeting = t("lesson.chapterGreeting", { name: user.name, goal: chapter.goalZh });
      playNarrationSequence([
        { audioId: null, text: greeting },
        { audioId: questionAudioId, text: questionZh },
      ]);
    } else {
      playNarrationSequence([{ audioId: questionAudioId, text: questionZh }]);
    }
    return () => cancelSpeech();
  }, [phase, turnIndex, chapter, scenario, user?.name, t]);

  // Reads the encouragement line aloud once the learner's answer is
  // understood, same recorded-clip-with-TTS-fallback approach as the
  // question above. Every encouragementZh in shared/scenarios.ts starts
  // with the same "明白了，你想" opener, so instead of re-recording that
  // phrase 126 times (once per turn), it's split into one shared prefix
  // clip per tutor + a short per-turn suffix clip — far less repetitive to
  // record, and it splices back together seamlessly since both halves are
  // real recordings (no live-TTS join needed, unlike the name-splice case).
  useEffect(() => {
    if (phase !== "understood") return;
    const activeTurn = chapter?.turns[turnIndex];
    const encouragementZh = activeTurn?.encouragementZh;
    if (!encouragementZh || !scenario || !chapter) return;
    const tutorId = getStoredTutorId();
    const suffixText = encouragementZh.startsWith(ENCOURAGEMENT_PREFIX)
      ? encouragementZh.slice(ENCOURAGEMENT_PREFIX.length)
      : encouragementZh;
    playNarrationSequence([
      { audioId: `${tutorId}/zh/_shared--understood-prefix`, text: ENCOURAGEMENT_PREFIX },
      {
        audioId: `${tutorId}/zh/${scenario.id}--${chapter.id}--${activeTurn!.id}--encouragement-suffix`,
        text: suffixText,
      },
    ]);
    return () => cancelSpeech();
  }, [phase, turnIndex, chapter, scenario]);

  if (!scenario || !chapter || !params) {
    return (
      <div className="app-shell">
        <div className="loading-screen">{t("common.notFoundChapterOrScenario")}</div>
      </div>
    );
  }

  const turn = chapter.turns[turnIndex];
  const isLastTurn = turnIndex === chapter.turns.length - 1;
  const chapterNumber = scenario.chapters.findIndex((c) => c.id === chapter.id) + 1;
  // Matches the recorded-clip filenames in scripts/audio-manifest.md, under
  // a per-tutor folder (client/public/audio/{tutorId}/...) since each tutor
  // needs their own voice recording — falls back to browser TTS
  // automatically if a clip is missing (e.g. a tutor with no recordings
  // yet), see lib/speech.ts.
  const modelAudioId = (modelIndex: number) =>
    `${getStoredTutorId()}/${scenario.id}--${chapter.id}--${turn.id}--${modelIndex}`;

  // Swaps the learner's real name in for a model sentence's placeholder
  // example name, when we have one.
  function applyName(text: string, namePlaceholder?: string): string {
    return namePlaceholder && learnerName ? text.replaceAll(namePlaceholder, learnerName) : text;
  }

  // Plays a model sentence.
  // - Keyword-matched variant (see `variants` on the Turn type): there's no
  //   recording for these dynamically-picked sentences, and `modelIndex`
  //   would otherwise collide with the default model's real recorded clip
  //   (same id, different words) — so these always use live TTS directly.
  // - Name substituted: the recorded clip can only ever say the original
  //   example name, so instead of falling back to full-sentence TTS (which
  //   sounds nothing like the tutor), we splice: recorded clip for the
  //   fixed wording before the name, live TTS for just the name, recorded
  //   clip for the wording after.
  // - Otherwise: play the recorded clip, falling back to TTS if missing.
  function playModel(modelIndex: number, model: (typeof turn.models)[number], rate?: number) {
    const displayEn = applyName(model.en, model.namePlaceholder);
    if (matchedModelsByTurn[turnIndex]) {
      speakEnglish(displayEn, rate);
    } else if (model.namePlaceholder && learnerName) {
      const audioId = modelAudioId(modelIndex);
      playNameSplicedAudio(`${audioId}--pre`, `${audioId}--suf`, learnerName, displayEn, rate);
    } else {
      playModelAudio(modelAudioId(modelIndex), displayEn, rate);
    }
  }

  function toggleMic() {
    if (listening) {
      stopListeningRef.current?.();
      setListening(false);
      return;
    }
    setMicError(null);
    const stop = startListening(
      (text) => setAnswerText(text),
      () => {
        setListening(false);
        stopListeningRef.current = null;
      },
      "zh-HK",
      (error) => {
        setMicError(
          error === "not-allowed" || error === "service-not-allowed"
            ? t("lesson.micDenied")
            : error === "no-speech"
              ? t("lesson.micNoSpeech")
              : error === "audio-capture"
                ? t("lesson.micNotFound")
                : t("lesson.micGenericError")
        );
      }
    );
    if (stop) {
      stopListeningRef.current = stop;
      setListening(true);
      // Some mobile browsers (notably iOS Safari when mic access was
      // permanently denied via device Settings, not just the in-page
      // prompt) do nothing at all — no permission dialog, no onresult, no
      // onerror, no onend — leaving the mic pulsing "listening" forever
      // with zero feedback. Recognition normally settles well before this
      // via "no-speech"; if this exact session is still active this long,
      // force-stop it and explain, rather than leaving it stuck silently.
      const session = stop;
      setTimeout(() => {
        if (stopListeningRef.current === session) {
          session();
          stopListeningRef.current = null;
          setListening(false);
          setMicError(t("lesson.micDenied"));
        }
      }, 8000);
    } else {
      setMicError(t("lesson.micGenericError"));
    }
  }

  function submitAnswer() {
    if (!answerText.trim()) return;
    stopListeningRef.current?.();
    setListening(false);
    const trimmed = answerText.trim();
    setSubmittedText(trimmed);
    if (!learnerName) {
      const name = extractSelfIntroName(trimmed);
      if (name) setLearnerName(name);
    }
    const variant = turn.variants?.find((v) => v.keywords.some((k) => trimmed.includes(k)));
    if (variant) {
      setMatchedModelsByTurn((prev) => ({ ...prev, [turnIndex]: variant.models }));
    }
    setPhase("understood");
  }

  const activeModels = matchedModelsByTurn[turnIndex] ?? turn.models;

  function goToModel() {
    setPhase("model");
    playModel(0, activeModels[0]);
  }

  async function finishChapterTurn() {
    if (!isLastTurn) {
      setTurnIndex((i) => i + 1);
      setPhase("ask");
      setAnswerText("");
      return;
    }
    setCompleting(true);
    try {
      await api.completeChapter({ scenarioId: scenario!.id, chapterId: chapter!.id });
    } finally {
      setCompleting(false);
      setPhase("complete");
    }
  }

  const scenarioIndex = getScenarioIndex(scenario.id);
  const chapterIdx = scenario.chapters.findIndex((c) => c.id === chapter.id);
  const nextChapterInScenario = scenario.chapters[chapterIdx + 1];
  const nextScenario = scenarios[scenarioIndex + 1];

  function continueAfterComplete() {
    if (nextChapterInScenario) {
      navigate(`/lesson/${scenario!.id}/${nextChapterInScenario.id}`);
    } else {
      navigate("/");
    }
  }

  const isExplainPhase = phase === "understood" || phase === "model" || phase === "complete";

  return (
    <div className="app-shell">
      <div className="lesson">
        <div className="stage">
          <RileyVideo className="rileyimg" variantSeed={chapterNumber - 1} />
          <span className="close" onClick={() => navigate("/")}>
            <X size={18} />
          </span>
          <span className="speed">1x</span>
          <div className="steps">
            <span className={`step ${isExplainPhase ? "on" : ""}`}>
              <i />
              {t("lesson.explainStep")}
            </span>
            <span className={`step ${!isExplainPhase ? "on" : ""}`}>
              <i />
              {t("lesson.practiceStep")}
            </span>
          </div>
          <span className={`tag ${phase === "model" ? "play" : ""}`}>
            <i />
            {phase === "model"
              ? t("lesson.rileyReading", { tutor: tutorName })
              : phase === "understood"
                ? t("lesson.rileyExplaining", { tutor: tutorName })
                : t("lesson.rileyReady", { tutor: tutorName })}
          </span>
        </div>

        <div className="ltop">
          <div className="t">
            <b>{chapter.title}</b>
            <em>
              {scenario.titleZh} · 第 {chapterNumber} 章／{scenario.chapters.length}
            </em>
          </div>
          <span className="pg">
            {phase === "complete" ? t("lesson.complete") : `${turnIndex + 1} / ${chapter.turns.length}`}
          </span>
        </div>

        <div className="talk">
          {phase === "complete" ? (
            <ChapterDone
              chapterTitle={chapter.title}
              learnedLines={chapter.turns.flatMap((t, i) =>
                (matchedModelsByTurn[i] ?? t.models).map((m) => applyName(m.en, m.namePlaceholder))
              )}
              nextTitle={nextChapterInScenario?.title ?? nextScenario?.titleZh ?? null}
              onSave={() => navigate("/progress")}
              onHome={() => navigate("/")}
              onContinue={continueAfterComplete}
            />
          ) : (
            <>
              <div className="msg">
                <div className="who">
                  <b>{tutorName}</b>
                  {phase === "ask" && (
                    <span
                      className="hear"
                      onClick={() => {
                        const questionZh = turn.questionZh;
                        const questionAudioId = `${getStoredTutorId()}/zh/${scenario.id}--${chapter.id}--${turn.id}--question`;
                        if (turnIndex === 0 && user?.name) {
                          playNarrationSequence([
                            { audioId: null, text: t("lesson.chapterGreeting", { name: user.name, goal: chapter.goalZh }) },
                            { audioId: questionAudioId, text: questionZh },
                          ]);
                        } else {
                          playNarrationSequence([{ audioId: questionAudioId, text: questionZh }]);
                        }
                      }}
                      title={t("lesson.hearQuestion")}
                    >
                      <Volume2 size={16} />
                    </span>
                  )}
                </div>
                {turnIndex === 0 && (
                  <div className="goal">
                    {user?.name
                      ? t("lesson.chapterGreeting", { name: user.name, goal: chapter.goalZh })
                      : chapter.goalZh}
                  </div>
                )}
                <div className="q">{turn.questionZh}</div>
                {turn.questionSubZh && <div className="sub">{turn.questionSubZh}</div>}
              </div>

              {phase !== "ask" && (
                <div className="me">
                  <div className="t">{t("lesson.youLabel")}</div>
                  {submittedText}
                </div>
              )}

              {phase === "understood" && (
                <div className="msg enc">
                  <div className="who">
                    <b>{tutorName}</b>
                  </div>
                  <div className="q">{turn.encouragementZh}</div>
                </div>
              )}

              {phase === "model" &&
                activeModels.map((m, i) => (
                  <div className="model" key={i}>
                    <span className="lbl">{m.labelZh.replace("Riley", tutorName)}</span>
                    <div className="en">
                      {applyName(m.en, m.namePlaceholder)}
                      {m.enSmall && <small>{applyName(m.enSmall, m.namePlaceholder)}</small>}
                    </div>
                    <div className="zh">{applyName(m.zh, m.namePlaceholder)}</div>
                    <div className="use">{m.usageZh}</div>
                    <div className="audio">
                      <button className="btn btn-ghost btn-sm" onClick={() => playModel(i, m)}>
                        <Volume2 size={16} />
                        {t("lesson.replayNatural")}
                      </button>
                      <button className="btn btn-ghost btn-sm" onClick={() => playModel(i, m, 0.65)}>
                        <Gauge size={16} />
                        {t("lesson.slow")}
                      </button>
                    </div>
                  </div>
                ))}

              {phase === "ask" && (
                <div className="chiprow">
                  {turn.chips.map((chip) => (
                    <span
                      key={chip}
                      className="chip"
                      onClick={() => {
                        setAnswerText(chip);
                        setPhase("answer");
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}

              {phase === "answer" && (
                <div className="answer">
                  <div className="hd">
                    <span className="lbl">{t("lesson.yourAnswer")}</span>
                    <span style={{ fontSize: 12.5, color: "var(--sm-mute)" }}>{t("lesson.anyLanguage")}</span>
                  </div>
                  <div className="chiprow">
                    {turn.chips.map((chip) => (
                      <span
                        key={chip}
                        className={`chip ${answerText === chip ? "on" : ""}`}
                        onClick={() => setAnswerText(chip)}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <textarea
                    className="field"
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder={t("lesson.inputPlaceholder")}
                  />
                  <div className="row">
                    {isSpeechRecognitionSupported() && (
                      <>
                        <span
                          className={`mic ${listening ? "listening" : ""}`}
                          onClick={toggleMic}
                          title={listening ? t("lesson.micStopTitle") : t("lesson.micIdle")}
                        >
                          <Mic size={26} />
                        </span>
                        <span style={{ fontSize: 12.5, color: "var(--sm-mute)", fontWeight: 600 }}>
                          {listening ? t("lesson.micListening") : t("lesson.micIdle")}
                        </span>
                      </>
                    )}
                    <button className="btn btn-primary" onClick={submitAnswer}>
                      {t("lesson.submitAnswer", { tutor: tutorName })}
                    </button>
                  </div>
                  {micError && <div className="mic-error">{micError}</div>}
                </div>
              )}
            </>
          )}
        </div>

        {phase !== "complete" && (
          <div className="ctrl">
            {phase === "ask" && (
              <button className="btn btn-primary btn-block" onClick={() => setPhase("answer")}>
                {t("lesson.answerPrompt", { tutor: tutorName })}
              </button>
            )}
            {phase === "understood" && (
              <button className="btn btn-primary btn-block" onClick={goToModel}>
                {t("lesson.hearEnglish", { tutor: tutorName })}
              </button>
            )}
            {phase === "model" && (
              <button className="btn btn-primary btn-block" onClick={finishChapterTurn} disabled={completing}>
                {completing ? (
                  t("lesson.processing")
                ) : isLastTurn ? (
                  <>
                    <CheckCheck size={18} />
                    {t("lesson.finishChapter")}
                  </>
                ) : (
                  t("lesson.nextQuestion")
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ChapterDone({
  chapterTitle,
  learnedLines,
  nextTitle,
  onSave,
  onHome,
  onContinue,
}: {
  chapterTitle: string;
  learnedLines: string[];
  nextTitle: string | null;
  onSave: () => void;
  onHome: () => void;
  onContinue: () => void;
}) {
  const { t } = useI18n();
  return (
    <>
      <div className="done">
        <span className="ck">
          <CheckCheck size={26} />
        </span>
        <h3>{t("lesson.doneHeading", { title: chapterTitle })}</h3>
        <p>{t("lesson.doneBody")}</p>
        <div className="learn">
          <b>{t("lesson.learnedHeading")}</b>
          <br />
          {learnedLines.map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </div>
        {nextTitle && (
          <div className="nx">
            <div className="k">{t("lesson.nextChapter")}</div>
            <b>{nextTitle}</b>
          </div>
        )}
      </div>
      <div className="ctrl" style={{ padding: "14px 0 0" }}>
        <div className="aux">
          <button onClick={onSave}>{t("lesson.saveToSentences")}</button>
          <button onClick={onHome}>{t("lesson.backToMap")}</button>
        </div>
        <button className="btn btn-primary btn-block" onClick={onContinue}>
          {nextTitle ? t("lesson.continueNextChapter") : t("lesson.backToHome")}
        </button>
      </div>
    </>
  );
}
