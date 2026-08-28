import type {
  FreeTalkMessage,
  FreeTalkReplyResponse,
  FreeTalkTopicId,
} from "../../shared/types.js";

// Placeholder conversation engine — no LLM connected yet. It rotates through
// a small canned pool per topic so the Free Talk UI, data contract, and
// storage plumbing can be built and tested end to end before an LLM API key
// is wired in. It intentionally never fabricates Corrections or a
// Grammar_Tips: a fake grammar check would be actively misleading, whereas
// an empty field is honest about "not connected yet".
//
// Swap this function's body for a real LLM call (see server/routes/freeTalk.ts)
// once an API key is available — the request/response shape below already
// matches the structured-output contract designed for that System Prompt.

const FOLLOW_UPS: Record<FreeTalkTopicId, string[]> = {
  "daily-life": [
    "That's nice! What time did you wake up today?",
    "Cool! Did you do anything different from your usual routine?",
    "Nice one! What are you planning to do later?",
    "Got it! Who did you spend today with?",
  ],
  hobbies: [
    "That sounds fun! How long have you been doing that?",
    "Nice! Do you do that alone or with friends?",
    "Interesting! What do you enjoy most about it?",
    "Cool! How did you get into that?",
  ],
  travel: [
    "That sounds exciting! What was your favorite part?",
    "Nice! Was the food there good?",
    "Cool! Would you like to go back one day?",
    "I see! How long did you stay there?",
  ],
  work: [
    "Got it! What's the most interesting part of your job?",
    "I see! Do you work with a big team?",
    "Nice! What's a typical day like for you?",
    "Cool! How long have you been doing that job?",
  ],
};

// Offset from the follow-up pool's own leading words so the two never repeat
// back-to-back (e.g. "Nice! That's nice! ...").
const ACKS = ["Got it!", "Ha, nice.", "Thanks for sharing!", "Ah I see.", "Good to know!"];

export function generateMockReply(
  topicId: FreeTalkTopicId,
  history: FreeTalkMessage[]
): FreeTalkReplyResponse {
  const turnIndex = Math.max(0, history.filter((m) => m.role === "user").length - 1);
  const pool = FOLLOW_UPS[topicId] ?? FOLLOW_UPS["daily-life"];
  const ack = ACKS[turnIndex % ACKS.length];
  const followUp = pool[turnIndex % pool.length];

  return {
    reply: `${ack} ${followUp}`,
    corrections: [],
    grammarTip: "",
    mock: true,
  };
}
