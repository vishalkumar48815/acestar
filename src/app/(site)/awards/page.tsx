import type { Metadata } from "next";
import { AwardTimeline } from "@/components/about/award-timeline";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { PageHero } from "@/components/solutions/page-hero";
import { Section, SectionHead } from "@/components/solutions/primitives";
import { awardYears, hero, quote } from "@/content/about/awards";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Awards - Acestar", path: "/awards/" });

export default function AwardsPage() {
  return (
    <>
      <PageHero hero={hero} />

      <Section labelledBy="quote-title" className="pt-0 lg:pt-4">
        <figure data-reveal suppressHydrationWarning className="mx-auto max-w-2xl pt-4 text-center lg:pt-6">
          {/* Small caps label with a line either side (same style as "Our Mission" on Company Profile) */}
          <h2
            id="quote-title"
            className="mb-8 flex items-center justify-center gap-4 text-[0.8125rem] font-bold tracking-[0.22em] text-ink uppercase sm:gap-6 sm:text-[0.9375rem]"
          >
            <span
              aria-hidden="true"
              className="h-px w-10 bg-[linear-gradient(90deg,transparent,var(--accent-from))] sm:w-28"
            />
            Our Achievements
            <span
              aria-hidden="true"
              className="h-px w-10 bg-[linear-gradient(90deg,var(--accent-from),transparent)] sm:w-28"
            />
          </h2>
          <blockquote className="font-display text-[clamp(1.25rem,1.05rem+0.7vw,1.625rem)] leading-[1.4] font-medium tracking-[-0.015em] text-balance text-ink">
            <p>&ldquo;{quote.text}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-4 text-[0.75rem] font-semibold tracking-[0.2em] text-fg-subtle uppercase">
            {quote.author}
          </figcaption>
        </figure>
      </Section>

      <Section id="timeline" labelledBy="timeline-title" className="pt-4 lg:pt-6">
        <SectionHead
          eyebrow="Timeline"
          title="Recognised year after year."
          body="From our technology partners and Malaysia's leading business awards."
          id="timeline-title"
          className="mb-8"
        />
        <AwardTimeline years={awardYears} founded={site.foundedYear} />
      </Section>

      <ClosingCta
        content={{
          eyebrow: "Award-winning service",
          title: "Work with an award-winning partner.",
          body: "Talk to our team about creative software, high-performance computers and digital workflow for your organisation.",
          cta: { label: "Contact Us", href: "/contact-acestarian/" },
        }}
      />
    </>
  );
}
