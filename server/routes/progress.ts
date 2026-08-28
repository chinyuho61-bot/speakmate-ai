import { Router } from "express";
import { scenarios, getChapter } from "../../shared/scenarios.js";
import type {
  ProgressSummary,
  ScenarioProgressSummary,
  CompleteChapterRequest,
  SavedSentence,
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

function buildScenarioSummaries(completedKeys: Set<string>): ScenarioProgressSummary[] {
  const summaries: ScenarioProgressSummary[] = [];
  let previousComplete = true;

  for (const scenario of scenarios) {
    const totalChapters = scenario.chapters.length;
    const completedChapters = scenario.chapters.filter((c) =>
      completedKeys.has(`${scenario.id}:${c.id}`)
    ).length;
    const isComplete = completedChapters === totalChapters;
    const unlocked = previousComplete;

    let state: ScenarioProgressSummary["state"];
    if (!unlocked) state = "locked";
    else if (isComplete) state = "complete";
    else state = "current";

    const nextChapter = scenario.chapters.find(
      (c) => !completedKeys.has(`${scenario.id}:${c.id}`)
    );

    summaries.push({
      scenarioId: scenario.id,
      state,
      completedChapters,
      totalChapters,
      currentChapterId: unlocked ? nextChapter?.id ?? null : null,
      currentTurnIndex: 0,
    });

    previousComplete = isComplete && previousComplete;
  }

  return summaries;
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
    scenarios: buildScenarioSummaries(completedKeys),
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
