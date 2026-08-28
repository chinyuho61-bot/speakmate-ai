import type { LearnerLevel, NativeLanguageId } from "./types.js";

// Display labels live in the i18n dictionaries (client/src/lib/i18n.tsx,
// keys "level.<id>.*" and "nativeLang.<id>") so they translate with the rest
// of the UI — these arrays are just the fixed id order for the pickers.
export const levelOptions: LearnerLevel[] = ["beginner", "intermediate", "advanced", "native-like"];

export const nativeLanguageOptions: NativeLanguageId[] = ["yue", "cmn", "ja", "ko", "vi", "es", "other"];
