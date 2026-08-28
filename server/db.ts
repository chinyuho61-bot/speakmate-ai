import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { ENV } from "./env.js";

mkdirSync(path.dirname(ENV.dbPath), { recursive: true });

const db = new DatabaseSync(ENV.dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    native_language TEXT,
    level TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS chapter_completions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    scenario_id TEXT NOT NULL,
    chapter_id TEXT NOT NULL,
    completed_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(user_id, scenario_id, chapter_id)
  );

  CREATE TABLE IF NOT EXISTS saved_sentences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    scenario_id TEXT NOT NULL,
    chapter_id TEXT NOT NULL,
    en TEXT NOT NULL,
    zh TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Migration guard for databases created before native_language/level existed
// — CREATE TABLE IF NOT EXISTS above already covers fresh installs, so these
// throw "duplicate column" (caught and ignored) on any DB created after this
// change.
for (const columnDdl of ["native_language TEXT", "level TEXT"]) {
  try {
    db.exec(`ALTER TABLE users ADD COLUMN ${columnDdl}`);
  } catch {
    // Column already exists.
  }
}

export type DbUser = {
  id: number;
  email: string;
  name: string;
  password_hash: string;
  native_language: string | null;
  level: string | null;
  created_at: string;
};

export type DbCompletion = {
  id: number;
  user_id: number;
  scenario_id: string;
  chapter_id: string;
  completed_at: string;
};

export type DbSavedSentence = {
  id: number;
  user_id: number;
  scenario_id: string;
  chapter_id: string;
  en: string;
  zh: string;
  created_at: string;
};

export function getUserByEmail(email: string): DbUser | undefined {
  return db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email.toLowerCase().trim()) as DbUser | undefined;
}

export function getUserById(id: number): DbUser | undefined {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as DbUser | undefined;
}

export function createUser(email: string, name: string, passwordHash: string): DbUser {
  const result = db
    .prepare("INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)")
    .run(email.toLowerCase().trim(), name.trim(), passwordHash);
  return getUserById(Number(result.lastInsertRowid))!;
}

export function updateUserProfile(
  userId: number,
  nativeLanguage: string,
  level: string
): DbUser {
  db.prepare("UPDATE users SET native_language = ?, level = ? WHERE id = ?").run(
    nativeLanguage,
    level,
    userId
  );
  return getUserById(userId)!;
}

export function listCompletions(userId: number): DbCompletion[] {
  return db
    .prepare("SELECT * FROM chapter_completions WHERE user_id = ? ORDER BY completed_at ASC")
    .all(userId) as DbCompletion[];
}

export function isChapterComplete(userId: number, scenarioId: string, chapterId: string): boolean {
  const row = db
    .prepare(
      "SELECT id FROM chapter_completions WHERE user_id = ? AND scenario_id = ? AND chapter_id = ?"
    )
    .get(userId, scenarioId, chapterId);
  return !!row;
}

export function addCompletion(userId: number, scenarioId: string, chapterId: string): void {
  db.prepare(
    "INSERT OR IGNORE INTO chapter_completions (user_id, scenario_id, chapter_id) VALUES (?, ?, ?)"
  ).run(userId, scenarioId, chapterId);
}

export function listSavedSentences(userId: number): DbSavedSentence[] {
  return db
    .prepare("SELECT * FROM saved_sentences WHERE user_id = ? ORDER BY created_at DESC")
    .all(userId) as DbSavedSentence[];
}

export function addSavedSentence(
  userId: number,
  scenarioId: string,
  chapterId: string,
  en: string,
  zh: string
): void {
  db.prepare(
    "INSERT INTO saved_sentences (user_id, scenario_id, chapter_id, en, zh) VALUES (?, ?, ?, ?, ?)"
  ).run(userId, scenarioId, chapterId, en, zh);
}
