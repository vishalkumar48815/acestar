import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { InnerPagePromo, RelatedSolutions, LightPromo } from "@/components/solutions/blocks";
import { DeviceCatalog } from "@/components/solutions/device-catalog";
import { BriefOverview, BriefWhy } from "@/components/solutions/brief-sections";
import { PageHero } from "@/components/solutions/page-hero";
import { Section, SectionHead } from "@/components/solutions/primitives";
import { asset } from "@/content/solutions/assets";
import { brands, brief, hero, techcareBlock } from "@/content/solutions/workstations";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "High Performance Computer - Acestar",
  path: "/high-performance-computer/",
});

export default function WorkstationsPage() {
  return (
    <>
      <PageHero hero={hero} />

      <BriefOverview overview={brief.overview} />

      <Section id="brands" labelledBy="brands-title" className="pt-0 lg:pt-0">
        <SectionHead
          eyebrow="Brands we configure"
          title="The right machine, configured for your work."
          body="One size doesn't fit all. Pick a brand to see the line-up, and our technical team will help you spec it."
          align="center"
          id="brands-title"
          className="mb-8"
        />
        <DeviceCatalog brands={brands} />
      </Section>

      <Section labelledBy="apple-promo" className="pt-0 lg:pt-0">
        <LightPromo
          id="apple-promo"
          eyebrow="Apple Authorised Reseller · 18+ years"
          title="Apple, delivered the right way, start to finish."
          body="Deployment, device management, AppleCare and support for schools, government and business."
          points={["Deployment", "Device management", "AppleCare", "Education & business"]}
          href="/solution/apple/"
          label="Explore our Apple Solution"
          image={asset("2026/09/apple-hero-4.webp", "Mac Studio display and iPad")}
        />
      </Section>

      <Section id="techcare" labelledBy="techcare-promo" className="pt-0 lg:pt-0">
        <InnerPagePromo
          eyebrow={techcareBlock.eyebrow}
          title={techcareBlock.title}
          body={techcareBlock.paragraphs}
          href="/techcare"
          label="Explore TechCare"
          image={asset("2025/10/2.png", "")}
        />
      </Section>

      <BriefWhy why={brief.why} />

      <RelatedSolutions current="computers" />
      <ClosingCta content={brief.closing} />
    </>
  );
}
