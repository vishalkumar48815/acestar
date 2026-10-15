import type { Metadata } from "next";
import { ArrowLeft } from "@/components/ui/icons";
import { Aurora } from "@/components/ui/aurora";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden pt-32 pb-20">
      <Aurora />
      <div className="container-page flex flex-col items-start gap-6">
        <span className="text-eyebrow text-brand-ink">Error 404</span>
        <h1 className="max-w-3xl text-display">This page took a different route.</h1>
        <p className="max-w-xl text-lead text-fg-muted">
          The link may be outdated or the page may still be under construction. Head back home, or tell us what you were
          looking for.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="glass">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
