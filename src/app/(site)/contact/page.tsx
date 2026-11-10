import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/solutions/page-hero";
import { Eyebrow } from "@/components/solutions/primitives";
import { ArrowUpRight, Mail, MapPin, Phone } from "@/components/ui/icons";
import { ContactVisual } from "@/components/visuals/contact-visual";
import { form, hero, visit } from "@/content/pages/contact";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Talk to Acestar: call 03-2201 7688, email icare@acestar.my or visit us in Bangsar South, Kuala Lumpur.",
  alternates: { canonical: "/contact" },
};

const direct = [
  { href: "tel:+60322017688", label: "03-2201 7688", hint: "Call us", icon: Phone },
  { href: "mailto:icare@acestar.my", label: "icare@acestar.my", hint: "Email us", icon: Mail },
];

export default function ContactPage() {
  return (
    <>
      <PageHero hero={hero} visual={<ContactVisual city="Bangsar South, KL" phone={site.contact.phone.display} />} />

      {/* Message form, centred, with the two direct contacts at the top */}
      <section id="message" aria-labelledby="message-title" className="scroll-mt-24 pt-2 pb-12 lg:pb-16">
        <div className="container-page">
          <div
            data-reveal
            suppressHydrationWarning
            className="mx-auto max-w-3xl rounded-[1.75rem] border border-white/80 bg-white/70 p-6 shadow-[0_40px_80px_-50px_rgb(40_50_140/0.5)] backdrop-blur-xl sm:p-8 lg:p-10 dark:border-white/[0.08] dark:bg-white/[0.03]"
          >
            <Eyebrow>{form.eyebrow}</Eyebrow>
            <h2
              id="message-title"
              className="mt-3 font-display text-[clamp(1.625rem,1.2rem+1.4vw,2.25rem)] leading-tight font-bold tracking-[-0.03em] text-ink"
            >
              {form.title}
            </h2>
            <p className="mt-2 leading-relaxed text-fg-muted">{form.body}</p>

            <ul aria-label="Contact us directly" className="mt-6 grid gap-3 sm:grid-cols-2">
              {direct.map(({ href, label, hint, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="group flex min-h-16 items-center gap-3.5 rounded-2xl border border-line bg-white/80 px-4 py-3 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_16px_32px_-20px_rgb(70_70_180/0.5)] dark:bg-white/[0.04]"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[image:var(--btn-gradient)] text-white shadow-[0_8px_18px_-10px_rgb(91_84_240/0.9)]">
                      <Icon className="size-[1.125rem]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-fg-subtle">{hint}</span>
                      <span className="block truncate font-semibold text-ink group-hover:text-brand-ink">{label}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="my-8 flex items-center gap-4 text-xs font-medium tracking-[0.2em] text-fg-subtle uppercase">
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
              or send us a message
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
            </div>
            <ContactForm to={form.to} />
          </div>
        </div>
      </section>

      {/* Office map, as a closing call to action */}
      <section aria-labelledby="visit-title" className="pb-16 lg:pb-24">
        <div className="container-page">
          <div
            data-reveal
            suppressHydrationWarning
            className="relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#141a44,#2b2a7a_55%,#6a3fd0)] px-6 py-10 text-white shadow-[0_40px_80px_-40px_rgb(40_40_120/0.7)] sm:px-10 lg:px-14 lg:py-14"
          >
            {/* Stylised map: streets as soft lines, a pulsing pin */}
            <svg
              aria-hidden="true"
              viewBox="0 0 600 240"
              className="absolute inset-0 -z-10 h-full w-full opacity-45"
              preserveAspectRatio="xMidYMid slice"
            >
              <g fill="none" stroke="#9fb0ff" strokeOpacity="0.35">
                <path d="M-10 190 C 120 150, 260 210, 610 110" strokeWidth="9" />
                <path d="M330 -10 C 360 80, 350 160, 420 250" strokeWidth="4" />
                <path d="M500 -10 C 490 90, 560 140, 540 250" strokeWidth="4" />
                <path d="M-10 70 L 610 45" strokeWidth="2" />
                <path d="M-10 130 L 610 150" strokeWidth="2" />
                <path d="M120 -10 C 140 90, 100 170, 160 250" strokeWidth="2" />
              </g>
            </svg>
            <span aria-hidden="true" className="absolute top-[42%] right-[18%] hidden place-items-center md:grid">
              <span className="absolute size-20 [animation:vis-ping_2.4s_ease-out_infinite] rounded-full bg-white/25" />
              <span className="relative grid size-14 place-items-center rounded-full bg-white text-[#2b2a7a] shadow-lg">
                <MapPin className="size-6" />
              </span>
            </span>

            <div className="max-w-xl">
              <p className="text-[0.6875rem] font-semibold tracking-[0.34em] text-white/70 uppercase">Office</p>
              <h2
                id="visit-title"
                className="mt-3 font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] leading-tight font-bold tracking-[-0.03em]"
              >
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
                className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-[#1b1f4a] transition-transform hover:-translate-y-0.5"
              >
                Open in Google Maps <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
