// Tutor persona catalog for the "choose your tutor" picker. Only Riley has
// real photo/video assets today, so she's the sole `available: true` entry —
// the others are fully designed (name, accent, personality) but shown
// locked ("即將推出") rather than faked with a placeholder photo standing in
// for a distinct person. Flip `available` and add `avatar`/video assets once
// real character art exists for them.

export type TutorId = "riley" | "zoe" | "claire" | "marcus" | "echo" | "nicky" | "mia";

export type TutorTaglineKey =
  | "tutor.riley.tagline"
  | "tutor.zoe.tagline"
  | "tutor.claire.tagline"
  | "tutor.marcus.tagline"
  | "tutor.echo.tagline"
  | "tutor.nicky.tagline"
  | "tutor.mia.tagline";

export type TraitKey =
  | "trait.warm"
  | "trait.encouraging"
  | "trait.patient"
  | "trait.thorough"
  | "trait.lively"
  | "trait.chatty"
  | "trait.humorous"
  | "trait.brisk"
  | "trait.gentle"
  | "trait.structured"
  | "trait.meticulous"
  | "trait.unhurried"
  | "trait.professional"
  | "trait.direct"
  | "trait.efficient"
  | "trait.business"
  | "trait.precise"
  | "trait.logical"
  | "trait.calm"
  | "trait.consistent"
  | "trait.approachable"
  | "trait.relatable"
  | "trait.easygoing"
  | "trait.practical"
  | "trait.confident"
  | "trait.articulate"
  | "trait.positive"
  | "trait.motivating";

export type TutorProfile = {
  id: TutorId;
  name: string; // proper noun — not translated
  avatar: string | null;
  // Looping teaching-gesture clips + their poster frame, used everywhere the
  // static photo used to be (Home hero, Lesson stage). Only set once real
  // video assets exist for a tutor — RileyVideo falls back to Riley's clips
  // if the selected tutor doesn't have its own.
  videos?: string[];
  poster?: string;
  accentKey: "tutor.accentUs" | "tutor.accentUk";
  taglineKey: TutorTaglineKey;
  traitKeys: TraitKey[];
  available: boolean;
};

export const tutors: TutorProfile[] = [
  {
    id: "riley",
    name: "Riley",
    avatar: "/riley.jpg",
    videos: ["/riley-teaching.mp4", "/riley-teaching-2.mp4"],
    poster: "/riley-stage-wide.jpg",
    accentKey: "tutor.accentUs",
    taglineKey: "tutor.riley.tagline",
    traitKeys: ["trait.warm", "trait.encouraging", "trait.patient", "trait.thorough"],
    available: true,
  },
  {
    id: "zoe",
    name: "Zoe",
    avatar: null,
    accentKey: "tutor.accentUk",
    taglineKey: "tutor.zoe.tagline",
    traitKeys: ["trait.lively", "trait.chatty", "trait.humorous", "trait.brisk"],
    available: false,
  },
  {
    id: "claire",
    name: "Claire",
    avatar: null,
    accentKey: "tutor.accentUk",
    taglineKey: "tutor.claire.tagline",
    traitKeys: ["trait.gentle", "trait.structured", "trait.meticulous", "trait.unhurried"],
    available: false,
  },
  {
    id: "marcus",
    name: "Marcus",
    avatar: "/marcus.jpg",
    videos: ["/marcus-teaching.mp4", "/marcus-teaching-2.mp4"],
    poster: "/marcus-stage-wide.jpg",
    accentKey: "tutor.accentUs",
    taglineKey: "tutor.marcus.tagline",
    traitKeys: ["trait.professional", "trait.direct", "trait.efficient", "trait.business"],
    available: true,
  },
  {
    id: "echo",
    name: "Echo",
    avatar: "/echo.jpg",
    videos: ["/echo-teaching.mp4", "/echo-teaching-2.mp4"],
    poster: "/echo-stage-wide.jpg",
    accentKey: "tutor.accentUs",
    taglineKey: "tutor.echo.tagline",
    traitKeys: ["trait.precise", "trait.logical", "trait.calm", "trait.consistent"],
    available: true,
  },
  {
    id: "nicky",
    name: "Nicky",
    avatar: "/nicky.jpg",
    videos: ["/nicky-teaching.mp4", "/nicky-teaching-2.mp4"],
    poster: "/nicky-stage-wide.jpg",
    accentKey: "tutor.accentUs",
    taglineKey: "tutor.nicky.tagline",
    traitKeys: ["trait.approachable", "trait.relatable", "trait.easygoing", "trait.practical"],
    available: true,
  },
  {
    id: "mia",
    name: "Mia",
    avatar: "/mia.jpg",
    videos: ["/mia-teaching.mp4", "/mia-teaching-2.mp4"],
    poster: "/mia-stage-wide.jpg",
    accentKey: "tutor.accentUk",
    taglineKey: "tutor.mia.tagline",
    traitKeys: ["trait.confident", "trait.articulate", "trait.positive", "trait.motivating"],
    available: true,
  },
];

const TUTOR_STORAGE_KEY = "speakmate.tutorId";

export function getStoredTutorId(): TutorId {
  const stored = typeof window !== "undefined" ? localStorage.getItem(TUTOR_STORAGE_KEY) : null;
  return tutors.some((t) => t.id === stored && t.available) ? (stored as TutorId) : "riley";
}

export function setStoredTutorId(id: TutorId): void {
  localStorage.setItem(TUTOR_STORAGE_KEY, id);
}

// For UI chrome text that names the tutor (e.g. "{{tutor}} is ready") in
// components that don't otherwise track the current tutor as state — reads
// localStorage fresh each call, so it's only reactive across a navigation,
// not a live update mid-page (tutor switching only happens from Home).
export function getCurrentTutorName(): string {
  return tutors.find((t) => t.id === getStoredTutorId())?.name ?? "Riley";
}
