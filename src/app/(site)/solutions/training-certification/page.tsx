import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { RelatedSolutions } from "@/components/solutions/blocks";
import { BriefOverview, BriefWhy } from "@/components/solutions/brief-sections";
import { PageHero } from "@/components/solutions/page-hero";
import { Section, SectionHead, toneCard, toneStyle } from "@/components/solutions/primitives";
import { Check } from "@/components/ui/icons";
import { brief, hero, upskilling } from "@/content/solutions/training";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: brief.meta.title,
  description: brief.meta.description,
  keywords: brief.meta.keywords,
  alternates: { canonical: "/solutions/training-certification/" },
};

export default function TrainingCertificationPage() {
  return (
    <>
      <PageHero hero={hero} />

      <BriefOverview overview={brief.overview} />

      <Section id="upskilling" labelledBy="upskilling-title" className="pt-0 lg:pt-0">
        <div
          data-reveal
          suppressHydrationWarning
          className={cn(toneCard, "grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14 lg:p-14")}
          style={toneStyle("peach")}
        >
          <SectionHead
            eyebrow={upskilling.eyebrow}
            title={upskilling.title}
            body={upskilling.body}
            id="upskilling-title"
          />
          <ul className="grid gap-3">
            {upskilling.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/90 bg-white/75 px-5 py-4 font-semibold text-ink dark:border-white/[0.08] dark:bg-white/[0.05]"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[image:var(--btn-gradient)] text-white">
                  <Check aria-hidden="true" className="size-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <BriefWhy why={brief.why} />

      <RelatedSolutions current="training" />
      <ClosingCta content={brief.closing} />
    </>
  );
}
