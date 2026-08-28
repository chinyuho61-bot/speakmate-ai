import type {
  AuthResponse,
  ProgressSummary,
  CompleteChapterRequest,
  User,
  LearnerLevel,
  NativeLanguageId,
  FreeTalkReplyRequest,
  FreeTalkReplyResponse,
} from "@shared/types";

const TOKEN_KEY = "speakmate.token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

// `code` is the server's stable error string (e.g. "invalid_email") — never
// display it directly, look it up via useI18n().terr(code) so the message
// follows the UI's selected language.
class ApiError extends Error {
  constructor(public code: string, public status: number) {
    super(code);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "content-type": "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (token) headers.authorization = `Bearer ${token}`;

  const res = await fetch(`/api${path}`, { ...init, headers });
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await res.json() : undefined;

  if (!res.ok) {
    throw new ApiError(body?.error || "generic", res.status);
  }
  return body as T;
}

export const api = {
  register: (email: string, password: string, name: string) =>
    request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    }),
  login: (email: string, password: string) =>
    request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  me: () => request<{ user: AuthResponse["user"] }>("/auth/me"),
  updateProfile: (nativeLanguage: NativeLanguageId, level: LearnerLevel) =>
    request<{ user: User }>("/auth/profile", {
      method: "PUT",
      body: JSON.stringify({ nativeLanguage, level }),
    }),
  getProgress: () => request<ProgressSummary>("/progress"),
  completeChapter: (payload: CompleteChapterRequest) =>
    request<{ ok: true }>("/progress/complete", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  freeTalkReply: (payload: FreeTalkReplyRequest) =>
    request<FreeTalkReplyResponse>("/free-talk/reply", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export { ApiError };
