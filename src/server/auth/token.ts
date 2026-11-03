/**
 * Admin session token: a signed JWT (HS256) in an httpOnly cookie.
 * Shared by src/proxy.ts (optimistic redirect) and the server-side session check,
 * so it must not import "server-only" or Node-only APIs.
 */
import { jwtVerify, SignJWT } from "jose";

export const SESSION_COOKIE = "acestar_admin";
export const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours
const ISSUER = "acestar-admin";

export type AdminSession = { email: string; expiresAt: number };

function key() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET must be set (32+ characters).");
  return new TextEncoder().encode(secret);
}

export async function signSession(email: string) {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuer(ISSUER)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(key());
}

/** Returns the session, or null for a missing, expired, tampered or foreign token. */
export async function verifySession(token: string | undefined): Promise<AdminSession | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key(), { issuer: ISSUER, algorithms: ["HS256"] });
    if (payload.role !== "admin" || !payload.sub || !payload.exp) return null;
    // The account is defined in env: a token for a previous ADMIN_EMAIL is no longer valid.
    if (payload.sub.toLowerCase() !== (process.env.ADMIN_EMAIL ?? "").toLowerCase()) return null;
    return { email: payload.sub, expiresAt: payload.exp * 1000 };
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/admin",
  maxAge: SESSION_TTL_SECONDS,
};
