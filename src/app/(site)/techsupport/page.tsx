import type { Metadata } from "next";
import { PageHero } from "@/components/solutions/page-hero";
import { Eyebrow } from "@/components/solutions/primitives";
// import { TicketForm } from "@/components/support/ticket-form"; (new-design form, hidden for now)
import { SupportVisual } from "@/components/visuals/support-visual";
import { hero } from "@/content/pages/support"; // add `zoho` back with TicketForm
import "@/components/visuals/visuals.css";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "TechSupport - Acestar", path: "/techsupport/" });

export default function SupportPage() {
  return (
    <>
      <PageHero hero={hero} visual={<SupportVisual />} />

      <section id="ticket" aria-labelledby="ticket-title" className="scroll-mt-24 pt-2 pb-16 lg:pb-24">
        <div className="container-page">
          {/* Zoho Desk ticket form (the Advanced Web Form embed, public/zoho/support-ticket-embed.html) */}
          <div
            data-reveal
            suppressHydrationWarning
            className="mx-auto max-w-3xl rounded-[1.75rem] border border-white/80 bg-white/70 p-6 shadow-[0_40px_80px_-50px_rgb(40_50_140/0.5)] backdrop-blur-xl sm:p-8 lg:p-10 dark:border-white/[0.08] dark:bg-white/[0.03]"
          >
            <Eyebrow>Submit a ticket</Eyebrow>
            <h2
              id="ticket-title"
              className="mt-3 font-display text-[clamp(1.625rem,1.2rem+1.4vw,2.25rem)] leading-tight font-bold tracking-[-0.03em] text-ink"
            >
              How can we assist you?
            </h2>
            <p className="mt-2 mb-6 leading-relaxed text-fg-muted">
              The more detail you share, the faster we can help.
            </p>
            <iframe
              src="/zoho/support-ticket-embed.html"
              title="Zoho Desk support ticket form"
              className="h-[50rem] w-full rounded-xl border-0 bg-white"
            />
          </div>

          {/*
            New-design ticket form (posts to the same Zoho web form). Hidden for now; to switch back,
            restore this block and the TicketForm / zoho imports at the top of the file.

          <div
            data-reveal
            suppressHydrationWarning
            className="mx-auto max-w-3xl rounded-[1.75rem] border border-white/80 bg-white/70 p-6 shadow-[0_40px_80px_-50px_rgb(40_50_140/0.5)] backdrop-blur-xl sm:p-8 lg:p-10 dark:border-white/[0.08] dark:bg-white/[0.03]"
          >
            <Eyebrow>Submit a ticket</Eyebrow>
            <h2
              id="ticket-title"
              className="mt-3 font-display text-[clamp(1.625rem,1.2rem+1.4vw,2.25rem)] leading-tight font-bold tracking-[-0.03em] text-ink"
            >
              How can we assist you?
            </h2>
            <p className="mt-2 mb-7 leading-relaxed text-fg-muted">
              Fields marked <span className="text-brand-ink">*</span> are required. The more detail you share, the
              faster we can help.
            </p>
            <TicketForm zoho={zoho} />
          </div>
          */}
        </div>
      </section>
    </>
  );
}
