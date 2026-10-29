import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { InnerPagePromo, RelatedSolutions } from "@/components/solutions/blocks";
import { BrandExplorer } from "@/components/solutions/brand-explorer";
import { PageHero } from "@/components/solutions/page-hero";
import { Section, SectionHead } from "@/components/solutions/primitives";
import { asset } from "@/content/solutions/assets";
import { brands, closing, hero, intro } from "@/content/solutions/creative-software";

export const metadata: Metadata = {
  title: "Creative Software",
  description:
    "Adobe Platinum Partner in Malaysia. Licensing, deployment and support for Adobe Creative Cloud, Autodesk, Video Copilot, Resolume and Boris FX.",
  alternates: { canonical: "/solutions/creative-software" },
};

export default function CreativeSoftwarePage() {
  return (
    <>
      <PageHero hero={hero} />

      <Section labelledBy="serve-title" className="pt-4 lg:pt-6">
        <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
          <SectionHead eyebrow={intro.eyebrow} title={intro.title} body={intro.body} id="serve-title" />
          <ul data-reveal suppressHydrationWarning className="grid grid-cols-2 gap-2.5">
            {intro.segments.map((s) => (
              <li
                key={s}
                className="rounded-2xl border border-line bg-white/60 px-4 py-4 text-center text-[0.9375rem] font-semibold text-ink dark:bg-white/[0.03]"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Section>

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

      <Section labelledBy="ccpro-promo" className="pt-0 lg:pt-0">
        <InnerPagePromo
          eyebrow="Adobe Creative Cloud Pro"
          title="Creative Cloud Teams is now Creative Cloud Pro."
          body="Compare plans, see what's new in Firefly and Express, and check your volume discount level."
          href="/solutions/creative-software/adobe-creative-cloud-pro"
          label="Explore Creative Cloud Pro"
          image={asset("2025/10/1.png", "")}
        />
      </Section>

      <RelatedSolutions current="creative" />
      <ClosingCta content={{ ...closing, cta: { label: "Talk to us", href: "/contact" } }} />
    </>
  );
}
