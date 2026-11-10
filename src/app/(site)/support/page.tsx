import type { Metadata } from "next";
import { PageHero } from "@/components/solutions/page-hero";
import { Eyebrow } from "@/components/solutions/primitives";
import { TicketForm } from "@/components/support/ticket-form";
import { SupportVisual } from "@/components/visuals/support-visual";
import { hero, zoho } from "@/content/pages/support";
import "@/components/visuals/visuals.css";

export const metadata: Metadata = {
  title: "Tech Support",
  description:
    "Submit an Acestar tech support ticket for Adobe, Microsoft, Maxon, Apple, Lenovo, Asus or HP products, or reach our Client Experience Team.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <>
      <PageHero hero={hero} visual={<SupportVisual />} />

      <section id="ticket" aria-labelledby="ticket-title" className="scroll-mt-24 pt-2 pb-16 lg:pb-24">
        <div className="container-page">
          {/* Ticket form */}
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
        </div>
      </section>
    </>
  );
}
