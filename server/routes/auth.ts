import { Router } from "express";
import { createUser, getUserByEmail, updateUserProfile, type DbUser } from "../db.js";
import { hashPassword, verifyPassword, signToken, requireAuth, type AuthedRequest } from "../auth.js";
import type { AuthResponse, LearnerLevel, NativeLanguageId, User } from "../../shared/types.js";
import { levelOptions, nativeLanguageOptions } from "../../shared/onboarding.js";

export const authRouter = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toPublicUser(user: DbUser): User {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    nativeLanguage: (user.native_language as NativeLanguageId | null) ?? null,
    level: (user.level as LearnerLevel | null) ?? null,
    createdAt: user.created_at,
  };
}

// Responses use stable error codes (not prose) — the client maps each code
// to a localized message via i18n's terr(), so the error text follows the
// UI's selected language instead of always being Chinese.
authRouter.post("/register", async (req, res) => {
  const { email, password, name } = req.body ?? {};

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "invalid_email" });
  }
  if (typeof password !== "string" || password.length < 8) {
    return res.status(400).json({ error: "password_too_short" });
  }
  if (typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ error: "name_required" });
  }
  if (getUserByEmail(email)) {
    return res.status(409).json({ error: "email_taken" });
  }

  const user = createUser(email, name, hashPassword(password));
  const token = await signToken(user.id);
  const response: AuthResponse = { token, user: toPublicUser(user) };
  res.status(201).json(response);
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "missing_credentials" });
  }

  const user = getUserByEmail(email);
  if (!user || !verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ error: "invalid_credentials" });
  }

  const token = await signToken(user.id);
  const response: AuthResponse = { token, user: toPublicUser(user) };
  res.json(response);
});

authRouter.get("/me", requireAuth, (req: AuthedRequest, res) => {
  res.json({ user: toPublicUser(req.user!) });
});

authRouter.put("/profile", requireAuth, (req: AuthedRequest, res) => {
  const { nativeLanguage, level } = req.body ?? {};

  if (typeof nativeLanguage !== "string" || !nativeLanguageOptions.includes(nativeLanguage as NativeLanguageId)) {
    return res.status(400).json({ error: "native_language_required" });
  }
  if (typeof level !== "string" || !levelOptions.includes(level as LearnerLevel)) {
    return res.status(400).json({ error: "level_required" });
  }

  const user = updateUserProfile(req.user!.id, nativeLanguage, level);
  res.json({ user: toPublicUser(user) });
});
