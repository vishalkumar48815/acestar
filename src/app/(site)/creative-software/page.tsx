import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { InnerPagePromo, RelatedSolutions } from "@/components/solutions/blocks";
import { BrandExplorer } from "@/components/solutions/brand-explorer";
import { BriefOverview, BriefWhy } from "@/components/solutions/brief-sections";
import { PageHero } from "@/components/solutions/page-hero";
import { Section, SectionHead } from "@/components/solutions/primitives";
import { asset } from "@/content/solutions/assets";
import { brands, brief, hero } from "@/content/solutions/creative-software";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Creative Software - Acestar", path: "/creative-software/" });

export default function CreativeSoftwarePage() {
  return (
    <>
      <PageHero hero={hero} />

      <BriefOverview overview={brief.overview} />

      <Section id="brands" labelledBy="brands-title">
        <SectionHead
          eyebrow="Our partners"
          title="The tools creative teams rely on."
          body="Pick a brand to see its line-up. Tap any product for details or a quote."
          align="center"
          id="brands-title"
          className="mb-8"
        />
        <BrandExplorer brands={brands} />
      </Section>

      <BriefWhy why={brief.why} />

      {/* <RelatedSolutions current="creative" /> */}

      <Section labelledBy="ccpro-promo" className="pt-0 lg:pt-0">
        <InnerPagePromo
          eyebrow="Adobe Creative Cloud Pro"
          title="Creative Cloud Teams is now Creative Cloud Pro."
          body="Compare plans, see what's new in Firefly and Express, and check your volume discount level."
          href="/creative-cloud/"
          label="Explore Creative Cloud Pro"
          image={asset("2025/10/1.png", "")}
        />
      </Section>
      <ClosingCta content={brief.closing} />
    </>
  );
}
