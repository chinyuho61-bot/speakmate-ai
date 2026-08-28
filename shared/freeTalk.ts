import type { FreeTalkTopic } from "./types.js";

// Titles/descriptions live in the i18n dictionaries (keys "topic.<id>.title"
// / "topic.<id>.description") so they translate with the rest of the UI.
export const freeTalkTopics: FreeTalkTopic[] = [
  { id: "daily-life", icon: "coffee", openingEn: "Hey! What have you been up to today?" },
  {
    id: "hobbies",
    icon: "heart",
    openingEn: "Nice to chat! What do you like doing in your free time?",
  },
  { id: "travel", icon: "plane", openingEn: "Have you traveled anywhere interesting recently?" },
  { id: "work", icon: "briefcase", openingEn: "So, what do you do for work?" },
];

export function getFreeTalkTopic(id: string) {
  return freeTalkTopics.find((t) => t.id === id);
}
