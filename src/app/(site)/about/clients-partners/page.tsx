import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LogoWall } from "@/components/about/logo-wall";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { TestimonialSlider } from "@/components/sections/home/testimonial-slider";
import { StatStrip } from "@/components/solutions/blocks";
import { PageHero } from "@/components/solutions/page-hero";
import {
  Section,
  SectionHead,
  panel,
  spotlight,
  toneCard,
  toneCycle,
  toneStyle,
} from "@/components/solutions/primitives";
import { ArrowRight } from "@/components/ui/icons";
import { clients, hero, partners, stats } from "@/content/about/clients";
import { testimonials } from "@/content/home";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Clients & Partners",
  description:
    "Acestar serves 5,000+ clients including Petronas, Bank Negara Malaysia and Touch 'n Go, with key partners Adobe, Apple, Microsoft, HP, Lenovo, Autodesk and Certiport.",
  alternates: { canonical: "/about/clients-partners" },
};

const delay = (i: number) => ({ "--reveal-delay": `${i * 70}ms` }) as React.CSSProperties;

/** Hero wall: clients and partners interleaved. */
const wall = [
  clients[0],
  partners[0],
  clients[1],
  partners[1],
  clients[2],
  partners[3],
  clients[5],
  partners[6],
  clients[6],
]
  .map((x) => x.logo)
  .filter((x) => x !== undefined);

export default function ClientsPartnersPage() {
  return (
    <>
      <PageHero hero={hero} visual={<LogoWall logos={wall} />} />

      <Section labelledBy="clients-title" className="pt-0 lg:pt-4">
        <StatStrip stats={stats} />
        <SectionHead
          eyebrow="Some of our clients"
          title="From national institutions to world-class studios."
          id="clients-title"
          className="mt-14 mb-8 lg:mt-16"
        />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {clients.map((c, i) => (
            <li
              key={c.name}
              data-reveal
              suppressHydrationWarning
              style={delay(i)}
              className={cn(
                panel,
                "group/c flex flex-col items-center gap-3 p-5 transition-transform duration-500 ease-out-expo hover:-translate-y-1 sm:p-6",
              )}
            >
              <div className="relative h-20 w-full rounded-xl bg-white">
                {c.logo ? (
                  <Image
                    src={c.logo.src}
                    width={c.logo.width}
                    height={c.logo.height}
                    alt={c.name}
                    sizes="200px"
                    className="absolute inset-0 m-auto h-full w-full object-contain p-3 transition-transform duration-500 group-hover/c:scale-105"
                  />
                ) : null}
              </div>
              <span className="text-center">
                <span className="block text-[0.9375rem] font-semibold text-ink">{c.name}</span>
                <span className="block text-[0.8125rem] text-fg-subtle">{c.sector}</span>
              </span>
            </li>
          ))}
          <li
            data-reveal
            suppressHydrationWarning
            style={delay(clients.length)}
            className="flex flex-col justify-center rounded-[1.5rem] bg-[linear-gradient(120deg,#1b1f4a,#2b2a7a_55%,#5b3cc4)] p-6 text-white"
          >
            <span className="font-display text-3xl font-extrabold tracking-[-0.04em]">5,000+</span>
            <span className="mt-1 text-[0.9375rem] text-white/75">
              clients across education, enterprise, SME and public sector
            </span>
          </li>
        </ul>
      </Section>

      <Section labelledBy="voices-title" className="pt-4 lg:pt-6">
        <SectionHead eyebrow="In their words" title="What our clients say." id="voices-title" className="mb-8" />
        <div className={cn(panel, "p-6 sm:p-8 lg:p-10")}>
          <TestimonialSlider items={testimonials} />
        </div>
      </Section>

      <Section id="partners" labelledBy="partners-title" className="pt-4 lg:pt-6">
        <SectionHead
          eyebrow="Our key partners"
          title="Partnered with the world's technology leaders."
          body="Long-standing partnerships mean better pricing, faster support and certified expertise for our clients."
          id="partners-title"
          className="mb-8"
        />
        <CardSpotlight>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p, i) => (
              <li
                key={p.name}
                data-reveal
                suppressHydrationWarning
                style={delay(i)}
                className={cn(i === 0 && "lg:col-span-2")}
              >
                <div
                  data-spotlight
                  className={cn(
                    toneCard,
                    "group/card flex h-full flex-col p-6",
                    i === 0 && "lg:flex-row lg:items-center lg:gap-8",
                  )}
                  style={toneStyle(toneCycle[i % toneCycle.length])}
                >
                  <span aria-hidden="true" className={spotlight} />
                  <div
                    className={cn(
                      "relative h-20 rounded-xl bg-white shadow-[0_1px_2px_rgb(30_40_90/0.06)]",
                      i === 0 ? "lg:h-32 lg:w-64 lg:shrink-0" : "w-full",
                    )}
                  >
                    {p.logo ? (
                      <Image
                        src={p.logo.src}
                        width={p.logo.width}
                        height={p.logo.height}
                        alt={`${p.name} logo`}
                        sizes="240px"
                        className="absolute inset-0 h-full w-full object-contain p-3"
                      />
                    ) : null}
                  </div>
                  <div className={cn("mt-5 flex flex-1 flex-col", i === 0 && "lg:mt-0")}>
                    <span className="self-start rounded-full border border-line bg-white/70 px-3 py-1 text-[0.75rem] font-semibold text-brand-ink dark:bg-white/[0.04]">
                      {p.badge}
                    </span>
                    <Link href={p.href} className="mt-3 after:absolute after:inset-0 after:content-['']">
                      <h3 className="text-[1.125rem] font-semibold tracking-[-0.015em] text-ink">{p.name}</h3>
                    </Link>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-fg-muted">{p.body}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-ink">
                      Learn more
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-300 group-hover/card:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardSpotlight>
      </Section>

      <ClosingCta
        content={{
          eyebrow: "Join them",
          title: "Let’s build what’s next, together.",
          body: "Talk to our team and discover how AI and technology can create real value for your business.",
          cta: { label: "Contact Us", href: "/contact" },
        }}
      />
    </>
  );
}
