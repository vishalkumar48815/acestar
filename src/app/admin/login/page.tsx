import type { Metadata } from "next";
import { Suspense } from "react";
import { Logo } from "@/components/ui/logo";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="relative isolate grid min-h-svh flex-1 place-items-center overflow-hidden px-4 py-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_15%_20%,color-mix(in_oklab,var(--accent-from)_22%,transparent),transparent_70%),radial-gradient(45%_45%_at_85%_80%,color-mix(in_oklab,var(--accent-to)_22%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)] [background-size:48px_48px]"
      />
      <main className="w-full max-w-[25rem]" style={{ animation: "fade-up 0.7s var(--ease-out) both" }}>
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Logo className="h-9 w-auto" priority />
          <h1 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink">Admin sign in</h1>
          <p className="text-sm text-fg-muted">Manage news, blog posts and the gallery.</p>
        </div>
        <div className="rounded-3xl border border-white/80 bg-white/85 p-6 shadow-[0_30px_60px_-30px_rgb(40_40_120/0.45)] sm:p-8 dark:border-white/10 dark:bg-white/[0.04]">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
        <p className="mt-6 text-center text-xs text-fg-subtle">Protected area · sign-in attempts are logged</p>
      </main>
    </div>
  );
}
