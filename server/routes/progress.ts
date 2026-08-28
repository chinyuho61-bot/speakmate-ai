import { Router } from "express";
import { scenarios, getChapter } from "../../shared/scenarios.js";
import type {
  ProgressSummary,
  ScenarioProgressSummary,
  CompleteChapterRequest,
  SavedSentence,
  ScenarioLevel,
} from "../../shared/types.js";
import {
  listCompletions,
  addCompletion,
  isChapterComplete,
  listSavedSentences,
  addSavedSentence,
} from "../db.js";
import { requireAuth, type AuthedRequest } from "../auth.js";

export const progressRouter = Router();
progressRouter.use(requireAuth);

function computeStreakDays(completedAtIso: string[]): number {
  if (completedAtIso.length === 0) return 0;

  const dates = new Set(completedAtIso.map((iso) => iso.slice(0, 10)));
  const toDate = (s: string) => new Date(`${s}T00:00:00Z`);
  const oneDayMs = 24 * 60 * 60 * 1000;

  const sortedDates = Array.from(dates).sort();
  const mostRecent = toDate(sortedDates[sortedDates.length - 1]);
  const today = new Date(new Date().toISOString().slice(0, 10) + "T00:00:00Z");
  const daysSinceLast = Math.round((today.getTime() - mostRecent.getTime()) / oneDayMs);

  if (daysSinceLast > 1) return 0;

  let streak = 1;
  let cursor = mostRecent;
  for (;;) {
    const prev = new Date(cursor.getTime() - oneDayMs);
    const prevKey = prev.toISOString().slice(0, 10);
    if (dates.has(prevKey)) {
      streak += 1;
      cursor = prev;
    } else {
      break;
    }
  }
  return streak;
}

// Roadmap band order — must match the sequence scenarios are authored in
// (shared/scenarios.ts appends higher bands after lower ones).
const BAND_ORDER: ScenarioLevel[] = ["beginner", "intermediate"];
function bandRank(level: ScenarioLevel): number {
  return BAND_ORDER.indexOf(level);
}

// The level picked at onboarding decides which band a learner starts
// unlocked at — an "intermediate" (or higher) learner shouldn't be forced
// to redo 初級 before reaching 中級. Levels above the highest authored band
// just start at that highest band.
function startingBandFor(userLevel: string | null): ScenarioLevel {
  if (userLevel === "intermediate" || userLevel === "advanced" || userLevel === "native-like") {
    return "intermediate";
  }
  return "beginner";
}

function buildScenarioSummaries(
  completedKeys: Set<string>,
  userLevel: string | null
): ScenarioProgressSummary[] {
  const startingRank = bandRank(startingBandFor(userLevel));

  // Pass 1: a scenario in a band strictly BELOW the learner's starting band
  // is unlocked outright (skippable). Scenarios in the starting band itself
  // — and any band above it — still go through the original "complete
  // everything before it" sequential chain, so within-band ordering (and
  // any future band beyond what's authored) is unaffected.
  let previousComplete = true;
  const computed = scenarios.map((scenario) => {
    const totalChapters = scenario.chapters.length;
    const completedChapters = scenario.chapters.filter((c) =>
      completedKeys.has(`${scenario.id}:${c.id}`)
    ).length;
    const isComplete = completedChapters === totalChapters;
    const belowStartingBand = bandRank(scenario.level) < startingRank;
    const unlocked = belowStartingBand || previousComplete;
    previousComplete = (isComplete || belowStartingBand) && previousComplete;
    return { scenario, totalChapters, completedChapters, isComplete, unlocked };
  });

  // Pass 2: exactly one scenario is "current" (the home screen's CTA
  // target) — prefer the first incomplete one at/after the starting band,
  // so an intermediate learner's CTA points at 中級, not back at 初級; fall
  // back to an earlier skippable-band scenario only if everything from
  // their starting band onward is already done.
  let currentIndex = computed.findIndex(
    (c) => c.unlocked && !c.isComplete && bandRank(c.scenario.level) >= startingRank
  );
  if (currentIndex === -1) {
    currentIndex = computed.findIndex((c) => c.unlocked && !c.isComplete);
  }

  return computed.map((c, i) => {
    let state: ScenarioProgressSummary["state"];
    if (!c.unlocked) state = "locked";
    else if (c.isComplete) state = "complete";
    else if (i === currentIndex) state = "current";
    else state = "available";

    const nextChapter = c.scenario.chapters.find(
      (ch) => !completedKeys.has(`${c.scenario.id}:${ch.id}`)
    );

    return {
      scenarioId: c.scenario.id,
      state,
      completedChapters: c.completedChapters,
      totalChapters: c.totalChapters,
      currentChapterId: c.unlocked ? nextChapter?.id ?? null : null,
      currentTurnIndex: 0,
    };
  });
}

progressRouter.get("/", (req: AuthedRequest, res) => {
  const userId = req.user!.id;
  const completions = listCompletions(userId);
  const completedKeys = new Set(completions.map((c) => `${c.scenario_id}:${c.chapter_id}`));
  const savedRows = listSavedSentences(userId);

  const savedSentences: SavedSentence[] = savedRows.map((r) => ({
    id: r.id,
    scenarioId: r.scenario_id,
    chapterId: r.chapter_id,
    en: r.en,
    zh: r.zh,
    createdAt: r.created_at,
  }));

  const summary: ProgressSummary = {
    completedChapters: completions.length,
    streakDays: computeStreakDays(completions.map((c) => c.completed_at)),
    savedSentenceCount: savedSentences.length,
    scenarios: buildScenarioSummaries(completedKeys, req.user!.level),
    savedSentences,
  };

  res.json(summary);
});

progressRouter.post("/complete", (req: AuthedRequest, res) => {
  const userId = req.user!.id;
  const { scenarioId, chapterId } = (req.body ?? {}) as Partial<CompleteChapterRequest>;

  if (typeof scenarioId !== "string" || typeof chapterId !== "string") {
    return res.status(400).json({ error: "missing_fields" });
  }

  const chapter = getChapter(scenarioId, chapterId);
  if (!chapter) {
    return res.status(404).json({ error: "unknown_chapter" });
  }

  const alreadyComplete = isChapterComplete(userId, scenarioId, chapterId);
  addCompletion(userId, scenarioId, chapterId);

  if (!alreadyComplete) {
    for (const turn of chapter.turns) {
      for (const model of turn.models) {
        addSavedSentence(userId, scenarioId, chapterId, model.en, model.zh);
      }
    }
  }

  res.status(200).json({ ok: true });
});
