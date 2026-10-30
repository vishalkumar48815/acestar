import type { Metadata } from "next";
import { PageHero } from "@/components/solutions/page-hero";
import { Eyebrow } from "@/components/solutions/primitives";
import { TicketForm } from "@/components/support/ticket-form";
import { Headset, Paperclip, Ticket } from "@/components/ui/icons";
import { SupportVisual } from "@/components/visuals/support-visual";
import { help, hero, zoho } from "@/content/pages/support";
import "@/components/visuals/visuals.css";

export const metadata: Metadata = {
  title: "Tech Support",
  description:
    "Submit an Acestar tech support ticket for Adobe, Microsoft, Maxon, Apple, Lenovo, Asus or HP products, or reach our Client Experience Team.",
  alternates: { canonical: "/support" },
};

const icons = { ticket: Ticket, care: Headset, files: Paperclip };

export default function SupportPage() {
  return (
    <>
      <PageHero hero={hero} visual={<SupportVisual />} />

      <section id="ticket" aria-labelledby="ticket-title" className="scroll-mt-24 pt-2 pb-16 lg:pb-24">
        <div className="container-page grid gap-6 lg:grid-cols-[0.8fr_1.6fr] lg:gap-10">
          {/* How it works */}
          <div className="flex flex-col gap-3 lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>How we help</Eyebrow>
            <ol className="mt-2 flex flex-col gap-3">
              {help.map((h, i) => {
                const Icon = icons[h.key as keyof typeof icons];
                return (
                  <li
                    key={h.key}
                    data-reveal
                    suppressHydrationWarning
                    style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                    className="flex gap-4 rounded-[1.25rem] border border-line bg-white/60 p-5 dark:bg-white/[0.03]"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[image:var(--btn-gradient)] text-white">
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <h2 className="font-semibold text-ink">{h.title}</h2>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed break-words text-fg-muted">{h.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Ticket form */}
          <div
            data-reveal
            suppressHydrationWarning
            className="rounded-[1.75rem] border border-white/80 bg-white/70 p-6 shadow-[0_40px_80px_-50px_rgb(40_50_140/0.5)] backdrop-blur-xl sm:p-8 lg:p-10 dark:border-white/[0.08] dark:bg-white/[0.03]"
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
