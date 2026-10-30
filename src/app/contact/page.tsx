import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import { PageHero } from "@/components/solutions/page-hero";
import { Eyebrow, spotlight, toneCard, toneStyle, type Tone } from "@/components/solutions/primitives";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "@/components/ui/icons";
import { ContactVisual } from "@/components/visuals/contact-visual";
import { channels, form, hero, visit } from "@/content/pages/contact";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk to Acestar: call 03-2201 7688, WhatsApp us, email isr@acestar.my or visit us in Bangsar South, Kuala Lumpur.",
  alternates: { canonical: "/contact" },
};

const icons = { phone: Phone, whatsapp: MessageCircle, email: Mail, map: MapPin };
const tones: Tone[] = ["violet", "mint", "peach"];

export default function ContactPage() {
  return (
    <>
      <PageHero hero={hero} visual={<ContactVisual city="Bangsar South, KL" phone={site.contact.phone.display} />} />

      {/* Ways to reach us */}
      <section aria-label="Ways to reach us" className="pt-2 pb-12 lg:pb-16">
        <CardSpotlight className="container-page">
          <ul className="grid gap-4 md:grid-cols-3">
            {channels.map((c, i) => (
              <li key={c.key} data-reveal suppressHydrationWarning>
                <article
                  data-spotlight
                  className={cn(toneCard, "group/card flex h-full flex-col p-6")}
                  style={toneStyle(tones[i])}
                >
                  <span aria-hidden="true" className={spotlight} />
                  <h2 className="text-[1.125rem] font-semibold tracking-[-0.015em] text-ink">{c.title}</h2>
                  <p className="mt-1.5 text-[0.9375rem] text-fg-muted">{c.body}</p>
                  <ul className="mt-5 flex flex-col gap-2">
                    {c.links.map((l) => {
                      const Icon = icons[l.kind];
                      const external = l.href.startsWith("http");
                      return (
                        <li key={l.href}>
                          <a
                            href={l.href}
                            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="flex min-h-11 items-center gap-3 rounded-xl bg-white/70 px-3 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-white dark:bg-white/[0.05] dark:hover:bg-white/[0.09]"
                          >
                            <Icon className="size-4 shrink-0 text-brand-ink" />
                            <span className="min-w-0 truncate">{l.label}</span>
                            <span className="sr-only">
                              {l.kind === "whatsapp" ? " on WhatsApp" : l.kind === "phone" ? " (call)" : " (email)"}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              </li>
            ))}
          </ul>
        </CardSpotlight>
      </section>

      {/* Message + visit */}
      <section id="message" aria-labelledby="message-title" className="scroll-mt-24 pb-16 lg:pb-24">
        <div className="container-page grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div
            data-reveal
            suppressHydrationWarning
            className="rounded-[1.75rem] border border-white/80 bg-white/70 p-6 shadow-[0_40px_80px_-50px_rgb(40_50_140/0.5)] backdrop-blur-xl sm:p-8 lg:p-10 dark:border-white/[0.08] dark:bg-white/[0.03]"
          >
            <Eyebrow>{form.eyebrow}</Eyebrow>
            <h2
              id="message-title"
              className="mt-3 font-display text-[clamp(1.625rem,1.2rem+1.4vw,2.25rem)] leading-tight font-bold tracking-[-0.03em] text-ink"
            >
              {form.title}
            </h2>
            <p className="mt-2 mb-7 leading-relaxed text-fg-muted">{form.body}</p>
            <ContactForm to={form.to} />
          </div>

          <aside
            data-reveal
            suppressHydrationWarning
            aria-labelledby="visit-title"
            className="relative isolate flex flex-col overflow-hidden rounded-[1.75rem] bg-[linear-gradient(150deg,#1b1f4a,#2b2a7a_55%,#5b3cc4)] p-6 text-white sm:p-8 lg:p-10"
          >
            {/* Stylised map: streets as soft lines, a pulsing pin */}
            <svg
              aria-hidden="true"
              viewBox="0 0 300 200"
              className="absolute inset-0 -z-10 h-full w-full opacity-40"
              preserveAspectRatio="xMidYMid slice"
            >
              <g fill="none" stroke="#9fb0ff" strokeOpacity="0.35">
                <path d="M-10 150 C 60 120, 120 160, 310 90" strokeWidth="6" />
                <path d="M40 -10 C 70 60, 60 140, 120 210" strokeWidth="3" />
                <path d="M180 -10 C 170 80, 230 120, 210 210" strokeWidth="3" />
                <path d="M-10 60 L 310 40" strokeWidth="2" />
                <path d="M-10 110 L 310 130" strokeWidth="1.5" />
              </g>
            </svg>
            <span aria-hidden="true" className="absolute top-[38%] left-[58%] grid place-items-center">
              <span className="absolute size-16 [animation:vis-ping_2.4s_ease-out_infinite] rounded-full bg-white/25" />
              <span className="relative grid size-11 place-items-center rounded-full bg-white text-[#2b2a7a] shadow-lg">
                <MapPin className="size-5" />
              </span>
            </span>

            <p className="text-[0.6875rem] font-semibold tracking-[0.34em] text-white/70 uppercase">Office</p>
            <h2 id="visit-title" className="mt-3 font-display text-[1.75rem] font-bold tracking-[-0.03em]">
              {visit.title}
            </h2>
            <address className="mt-4 leading-relaxed text-white/85 not-italic">
              {site.legalName}
              <br />
              {visit.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <a
              href={visit.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex min-h-12 items-center gap-2 self-start rounded-full bg-white px-6 font-semibold text-[#1b1f4a] transition-transform hover:-translate-y-0.5 max-lg:mt-40"
            >
              Open in Google Maps <ArrowUpRight className="size-4" />
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
