import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import type { Request, Response, NextFunction } from "express";
import { ENV } from "./env.js";
import { getUserById, type DbUser } from "./db.js";

const SCRYPT_KEYLEN = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, SCRYPT_KEYLEN).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, derivedHex] = stored.split(":");
  if (!salt || !derivedHex) return false;
  const derived = scryptSync(password, salt, SCRYPT_KEYLEN);
  const expected = Buffer.from(derivedHex, "hex");
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}

const secretKey = () => new TextEncoder().encode(ENV.jwtSecret);

export async function signToken(userId: number): Promise<string> {
  return new SignJWT({ sub: String(userId) })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secretKey());
}

export async function verifyToken(token: string): Promise<number | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"] });
    const sub = payload.sub;
    if (!sub) return null;
    const id = Number(sub);
    return Number.isFinite(id) ? id : null;
  } catch {
    return null;
  }
}

export type AuthedRequest = Request & { user?: DbUser };

export async function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = typeof authHeader === "string" && authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    res.status(401).json({ error: "Missing bearer token" });
    return;
  }

  const userId = await verifyToken(token);
  if (!userId) {
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }

  const user = getUserById(userId);
  if (!user) {
    res.status(401).json({ error: "User not found" });
    return;
  }

  req.user = user;
  next();
}
