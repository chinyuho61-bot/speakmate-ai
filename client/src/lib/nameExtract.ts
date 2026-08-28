// Lightweight, pattern-based name extraction for self-intro turns — not real
// NLU, just recognizes the "我叫X" / "我係X" shapes our own chips produce
// (including the literal "..." left behind when a chip is clicked and then
// extended, e.g. "我叫...Alice"). Returns null for anything else, in which
// case the lesson falls back to its default example name rather than
// guessing wrong.
const NAME_PATTERNS = [/^我叫\.{0,3}\s*(.+)$/, /^我係\.{0,3}\s*(.+)$/];

export function extractSelfIntroName(answer: string): string | null {
  const trimmed = answer.trim();
  for (const pattern of NAME_PATTERNS) {
    const match = trimmed.match(pattern);
    if (!match) continue;
    const name = match[1].trim().replace(/[。！？,.!?]+$/, "").trim();
    if (name && name.length <= 20) return name;
  }
  return null;
}
