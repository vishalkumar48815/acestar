"use client";

import { useSearchParams } from "next/navigation";
import { startTransition, useActionState } from "react";
import { Spinner } from "@/components/admin/form";
import { button, inputClass } from "@/components/admin/ui";
import { idle } from "@/lib/admin-form";
import { login } from "@/server/admin/actions/auth";

export function LoginForm() {
  const next = useSearchParams().get("next") ?? "/admin";
  const [state, action, pending] = useActionState(login, idle);
  const error = state.status === "error" ? state.message : null;

  return (
    <form
      className="flex flex-col gap-4"
      // Submit via a transition (not <form action>) so a wrong password doesn't clear the email field.
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
    >
      <input type="hidden" name="next" value={next} />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="username" required autoFocus className={inputClass} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </div>
      {error ? (
        <p
          role="alert"
          className="rounded-xl bg-[color-mix(in_oklab,var(--danger)_10%,transparent)] px-3.5 py-2.5 text-sm font-medium text-danger"
        >
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className={button("primary", "mt-2 min-h-12 text-[0.9375rem]")}>
        {pending ? <Spinner /> : null}
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
