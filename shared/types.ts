export type LearnerLevel = "beginner" | "intermediate" | "advanced" | "native-like";
export type NativeLanguageId = "yue" | "cmn" | "ja" | "ko" | "vi" | "es" | "other";

export type User = {
  id: number;
  email: string;
  name: string;
  nativeLanguage: NativeLanguageId | null;
  level: LearnerLevel | null;
  createdAt: string;
};

export type UpdateProfileRequest = {
  nativeLanguage: NativeLanguageId;
  level: LearnerLevel;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type ModelSentence = {
  labelZh: string;
  en: string;
  enSmall?: string;
  zh: string;
  usageZh: string;
  // When set, this is the example name used in `en`/`zh` (e.g. "Wei Ling").
  // If the learner's answer names themself, the client swaps it in — and
  // switches that one line to live TTS instead of the pre-recorded clip,
  // since the recording can only ever say the original example name.
  namePlaceholder?: string;
};

export type TurnVariant = {
  // Cantonese keywords — if any appears in the learner's own typed answer,
  // this variant's models are taught instead of the turn's default models,
  // so the English actually reflects what they said (e.g. "hair salon")
  // rather than always the same fixed example.
  keywords: string[];
  models: ModelSentence[];
};

export type Turn = {
  id: string;
  questionZh: string;
  questionSubZh?: string;
  chips: string[];
  encouragementZh: string;
  models: ModelSentence[];
  variants?: TurnVariant[];
};

export type Chapter = {
  id: string;
  title: string;
  goalZh: string;
  turns: Turn[];
};

export type ScenarioAccent = "mint" | "lilac" | "yellow" | "coral" | "blue";
export type ScenarioIcon =
  | "user-circle"
  | "fork-knife"
  | "briefcase"
  | "presentation-chart"
  | "map-trifold"
  | "stethoscope"
  | "landmark";

// Groups scenarios into roadmap sections the learner unlocks in order —
// all "beginner" scenarios must be completed before any "intermediate"
// scenario unlocks, regardless of the level picked at onboarding (that
// picked level is diagnostic only, matching the reference app's behaviour
// of always starting everyone at the first band).
export type ScenarioLevel = "beginner" | "intermediate";

export type Scenario = {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  accent: ScenarioAccent;
  icon: ScenarioIcon;
  level: ScenarioLevel;
  chapters: Chapter[];
};

export type ChapterProgressState = "locked" | "available" | "current" | "complete";

export type ScenarioProgressSummary = {
  scenarioId: string;
  state: ChapterProgressState;
  completedChapters: number;
  totalChapters: number;
  currentChapterId: string | null;
  currentTurnIndex: number;
};

export type SavedSentence = {
  id: number;
  scenarioId: string;
  chapterId: string;
  en: string;
  zh: string;
  createdAt: string;
};

export type ProgressSummary = {
  completedChapters: number;
  streakDays: number;
  savedSentenceCount: number;
  scenarios: ScenarioProgressSummary[];
  savedSentences: SavedSentence[];
};

export type CompleteChapterRequest = {
  scenarioId: string;
  chapterId: string;
};

export type FreeTalkIcon = "coffee" | "heart" | "plane" | "briefcase";

export type FreeTalkTopicId = "daily-life" | "hobbies" | "travel" | "work";

export type FreeTalkTopic = {
  id: FreeTalkTopicId;
  icon: FreeTalkIcon;
  // Riley's opener is genuine English-learning content, not UI chrome — it
  // doesn't change with the interface language.
  openingEn: string;
};

export type FreeTalkRole = "user" | "assistant";

export type FreeTalkMessage = {
  role: FreeTalkRole;
  content: string;
};

export type FreeTalkCorrectionType =
  | "grammar"
  | "vocabulary"
  | "word_order"
  | "preposition"
  | "tense"
  | "other";

export type FreeTalkCorrection = {
  original: string;
  corrected: string;
  explanation: string;
  type: FreeTalkCorrectionType;
};

export type FreeTalkReplyRequest = {
  topicId: FreeTalkTopicId;
  // Full conversation so far, including the learner's newest message as the
  // last entry.
  history: FreeTalkMessage[];
};

export type FreeTalkReplyResponse = {
  reply: string;
  corrections: FreeTalkCorrection[];
  grammarTip: string;
  // true while served by the scripted placeholder engine (no LLM connected
  // yet) — see server/freeTalk/engine.ts.
  mock: boolean;
};
