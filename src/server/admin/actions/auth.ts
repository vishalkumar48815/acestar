"use server";

import { and, count, eq, gt } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { FormState } from "@/lib/admin-form";
import { safeEqual, verifyPassword } from "@/server/auth/password";
import { endSession, startSession } from "@/server/auth/session";
import { getDb, hasDatabase, schema } from "@/server/db";

const MAX_FAILURES = 5;
const WINDOW_MINUTES = 15;

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next"));

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (!adminEmail || !passwordHash || (process.env.SESSION_SECRET?.length ?? 0) < 32) {
    return {
      status: "error",
      message: "Admin login isn't configured yet: set ADMIN_EMAIL, ADMIN_PASSWORD_HASH and SESSION_SECRET.",
    };
  }
  if (!email || !password) return { status: "error", message: "Enter your email and password." };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";

  // Brute-force throttle: 5 failed attempts per IP per 15 minutes (needs the database).
  if (hasDatabase) {
    const since = new Date(Date.now() - WINDOW_MINUTES * 60_000);
    const [{ failures }] = await getDb()
      .select({ failures: count() })
      .from(schema.adminLoginAttempts)
      .where(
        and(
          eq(schema.adminLoginAttempts.ip, ip),
          eq(schema.adminLoginAttempts.succeeded, false),
          gt(schema.adminLoginAttempts.createdAt, since),
        ),
      );
    if (failures >= MAX_FAILURES) {
      return { status: "error", message: `Too many attempts. Try again in ${WINDOW_MINUTES} minutes.` };
    }
  }

  // Always hash, so a wrong email takes as long as a wrong password.
  const passwordOk = await verifyPassword(password, passwordHash);
  const ok = safeEqual(email, adminEmail) && passwordOk;

  if (hasDatabase) {
    await getDb()
      .insert(schema.adminLoginAttempts)
      .values({ ip, succeeded: ok })
      .catch((e) => console.warn("[admin] could not record login attempt", e));
  }

  if (!ok) {
    await new Promise((r) => setTimeout(r, 400));
    return { status: "error", message: "That email and password don't match." };
  }

  await startSession(adminEmail);
  redirect(next);
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

/** Only allow redirects back into /admin (no open redirects). */
function safeNext(value: FormDataEntryValue | null) {
  const next = typeof value === "string" ? value : "";
  return /^\/admin(\/[\w\-/?=&%.]*)?$/.test(next) && !next.startsWith("//") ? next : "/admin";
}
