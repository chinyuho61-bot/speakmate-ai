import { Router } from "express";
import { requireAuth, type AuthedRequest } from "../auth.js";
import { generateMockReply } from "../freeTalk/engine.js";
import { freeTalkTopics } from "../../shared/freeTalk.js";
import type { FreeTalkReplyRequest, FreeTalkReplyResponse } from "../../shared/types.js";

export const freeTalkRouter = Router();
freeTalkRouter.use(requireAuth);

freeTalkRouter.post("/reply", (req: AuthedRequest, res) => {
  const { topicId, history } = (req.body ?? {}) as Partial<FreeTalkReplyRequest>;

  if (typeof topicId !== "string" || !freeTalkTopics.some((t) => t.id === topicId)) {
    return res.status(400).json({ error: "unknown_topic" });
  }
  if (!Array.isArray(history)) {
    return res.status(400).json({ error: "missing_history" });
  }

  // Hook point for the real integration: once an LLM_API_KEY is configured,
  // call the model here with the SpeakMate tutor System Prompt, injecting
  // req.user!.native_language / req.user!.level into its {{native_language}}
  // / {{initial_level}} placeholders, and validate the response against the
  // AI_Reply/Corrections/Grammar_Tips json_schema. Until then, the scripted
  // placeholder keeps the UI and data contract fully wired.
  const response: FreeTalkReplyResponse = generateMockReply(topicId, history);
  res.json(response);
});
