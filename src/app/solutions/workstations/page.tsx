import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { InnerPagePromo, RelatedSolutions } from "@/components/solutions/blocks";
import { DeviceCatalog } from "@/components/solutions/device-catalog";
import { PageHero } from "@/components/solutions/page-hero";
import { Section, SectionHead } from "@/components/solutions/primitives";
import { asset } from "@/content/solutions/assets";
import { brands, hero } from "@/content/solutions/workstations";

export const metadata: Metadata = {
  title: "High Performance Computers",
  description:
    "Workstation customisation for creative, commercial and education teams: Apple, HP, Lenovo, Dell and Asus, configured and supported by Acestar.",
  alternates: { canonical: "/solutions/workstations" },
};

export default function WorkstationsPage() {
  return (
    <>
      <PageHero hero={hero} />

      <Section id="brands" labelledBy="brands-title" className="pt-4 lg:pt-6">
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
        <InnerPagePromo
          eyebrow="Apple Authorised Reseller · 18+ years"
          title="Apple, delivered the right way, start to finish."
          body="Deployment, device management, AppleCare and support for schools, government and business."
          href="/solutions/workstations/apple"
          label="Explore our Apple Solution"
          image={asset("2026/09/apple-hero-4.webp", "")}
        />
      </Section>

      <RelatedSolutions current="computers" />
      <ClosingCta
        content={{
          eyebrow: "Let's spec it",
          title: "Tell us how you work. We'll build the machine.",
          body: "Workstation consultation, procurement and after-sales support for teams of any size.",
          cta: { label: "Talk to a specialist", href: "/contact" },
        }}
      />
    </>
  );
}
