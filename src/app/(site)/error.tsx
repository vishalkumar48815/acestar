"use client";

import { RotateCcw } from "@/components/ui/icons";
import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";

/** Route-level error boundary: keeps header/footer and offers a retry. */
export default function RouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Hook point for error monitoring (e.g. Sentry) once it is set up.
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70svh] items-center pt-32 pb-20">
      <div className="container-page flex flex-col items-start gap-6">
        <span className="text-eyebrow text-danger">Something went wrong</span>
        <h1 className="max-w-2xl text-title">We couldn&apos;t load this section.</h1>
        <p className="max-w-xl text-lead text-fg-muted">
          Please try again. If it keeps happening, contact us and quote reference{" "}
          <code className="font-mono text-fg">{error.digest ?? "n/a"}</code>.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset}>
            <RotateCcw aria-hidden="true" className="size-4" />
            Try again
          </Button>
          <ButtonLink href="/" variant="glass">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
