import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { SESSION_COOKIE, sessionCookieOptions, signSession, verifySession } from "./token";

/** Current admin session or null. Deduplicated per request. */
export const getSession = cache(async () => verifySession((await cookies()).get(SESSION_COOKIE)?.value));

/**
 * Data Access Layer gate. Call at the top of every admin page AND every admin Server Action:
 * the proxy redirect is only a UX shortcut, this is the real check.
 */
export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function startSession(email: string) {
  (await cookies()).set(SESSION_COOKIE, await signSession(email), sessionCookieOptions);
}

export async function endSession() {
  (await cookies()).delete({ name: SESSION_COOKIE, path: sessionCookieOptions.path });
}
