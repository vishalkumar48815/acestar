import type { Metadata } from "next";
import { AwardTimeline } from "@/components/about/award-timeline";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { StatStrip } from "@/components/solutions/blocks";
import { PageHero } from "@/components/solutions/page-hero";
import { Section, SectionHead } from "@/components/solutions/primitives";
import { awardCount, awardYears, hero, quote, stats } from "@/content/about/awards";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Awards",
  description: `${awardCount} awards and recognitions since 2013, including Adobe SEA Top Platinum Partner of the Year and Frost & Sullivan Malaysia System Integration Company of the Year.`,
  alternates: { canonical: "/about/awards" },
};

export default function AwardsPage() {
  return (
    <>
      <PageHero hero={hero} />

      <Section labelledBy="quote-title" className="pt-0 lg:pt-4">
        <StatStrip stats={stats} />
        <figure data-reveal suppressHydrationWarning className="mx-auto mt-14 max-w-3xl text-center lg:mt-16">
          <h2 id="quote-title" className="sr-only">
            Our philosophy
          </h2>
          <blockquote className="font-display text-[clamp(1.5rem,1.05rem+1.6vw,2.375rem)] leading-[1.2] font-bold tracking-[-0.03em] text-balance text-ink">
            <p>&ldquo;{quote.text}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-4 text-fg-subtle">— {quote.author}</figcaption>
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
          cta: { label: "Contact Us", href: "/contact" },
        }}
      />
    </>
  );
}
