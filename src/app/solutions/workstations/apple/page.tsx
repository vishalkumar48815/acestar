import type { Metadata } from "next";
import Image from "next/image";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { FeatureGrid, Marquee, StatStrip, Steps } from "@/components/solutions/blocks";
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
import { CardSpotlight } from "@/components/motion/card-spotlight";
import {
  capabilities,
  closing,
  gallery,
  glance,
  hero,
  industries,
  process,
  stats,
  trustedBy,
  why,
} from "@/content/solutions/apple";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Apple Solution",
  description:
    "Apple Authorised Reseller in Malaysia for 18+ years. Mac, iPad and iPhone deployment, Apple Business and School Manager, AppleCare for Enterprise and ongoing support.",
  alternates: { canonical: "/solutions/workstations/apple" },
};

export default function AppleSolutionPage() {
  return (
    <>
      <PageHero hero={hero} />

      <div className="container-page">
        <StatStrip stats={stats} />
      </div>

      <div className="py-10 lg:py-14" aria-label="Apple devices we deploy">
        <Marquee images={gallery} />
      </div>

      <Section id="capabilities" labelledBy="cap-title" className="pt-0 lg:pt-0">
        <SectionHead eyebrow={capabilities.eyebrow} title={capabilities.title} id="cap-title" className="mb-8" />
        <FeatureGrid items={capabilities.items} columns={3} />
      </Section>

      <Section id="industries" labelledBy="ind-title">
        <SectionHead
          eyebrow={industries.eyebrow}
          title={industries.title}
          body={industries.body}
          id="ind-title"
          className="mb-8"
        />
        <CardSpotlight>
          <ul className="grid gap-4 sm:grid-cols-2">
            {industries.items.map((item, i) => (
              <li key={item.title} data-reveal suppressHydrationWarning>
                <article
                  data-spotlight
                  className={cn(
                    toneCard,
                    "group/card grid h-full grid-cols-[1fr] overflow-hidden sm:grid-cols-[1fr_9rem] lg:grid-cols-[1fr_12rem]",
                  )}
                  style={toneStyle(toneCycle[i % toneCycle.length])}
                >
                  <span aria-hidden="true" className={spotlight} />
                  <div className="p-6">
                    <h3 className="text-[1.125rem] font-semibold tracking-[-0.015em] text-ink">{item.title}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-fg-muted">{item.body}</p>
                  </div>
                  {item.image ? (
                    <div className="relative hidden sm:block">
                      <Image
                        src={item.image.src}
                        width={item.image.width}
                        height={item.image.height}
                        alt=""
                        sizes="200px"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover/card:scale-105"
                      />
                    </div>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        </CardSpotlight>
      </Section>

      <Section id="process" labelledBy="proc-title">
        <SectionHead eyebrow={process.eyebrow} title={process.title} align="center" id="proc-title" className="mb-10" />
        <Steps steps={process.steps} />
      </Section>

      <Section id="why" labelledBy="why-title">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div>
            <SectionHead eyebrow={why.eyebrow} title={why.title} body={why.body} id="why-title" className="mb-8" />
            <FeatureGrid items={why.items} columns={2} tone="violet" />
          </div>
          <aside
            data-reveal
            suppressHydrationWarning
            className={cn(panel, "self-start p-6 lg:sticky lg:top-24 lg:p-8")}
            aria-labelledby="glance-title"
          >
            <h3 id="glance-title" className="text-eyebrow text-brand-ink">
              Acestar at a glance
            </h3>
            <dl className="mt-4">
              {glance.map((g) => (
                <div
                  key={g.label}
                  className="flex flex-col gap-0.5 border-t border-line py-3.5 first:border-t-0 sm:flex-row sm:justify-between sm:gap-6"
                >
                  <dt className="text-sm text-fg-subtle">{g.label}</dt>
                  <dd className="text-[0.9375rem] font-semibold text-ink sm:text-right">{g.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>

      <Section labelledBy="trusted-title" className="pt-0 lg:pt-4">
        <div data-reveal suppressHydrationWarning className="flex flex-col items-center gap-5 text-center">
          <h2 id="trusted-title" className="text-eyebrow text-fg-subtle">
            Trusted by
          </h2>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {trustedBy.map((name) => (
              <li
                key={name}
                className="font-display text-[clamp(1.0625rem,0.95rem+0.5vw,1.375rem)] font-bold tracking-[-0.02em] text-fg-muted"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ClosingCta content={{ ...closing, cta: { label: "Talk to an Apple specialist", href: "/contact" } }} />
    </>
  );
}
