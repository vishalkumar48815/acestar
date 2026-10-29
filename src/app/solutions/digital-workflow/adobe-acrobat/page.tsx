import type { Metadata } from "next";
import Image from "next/image";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { CompareTable, FeatureGrid, SplitRows } from "@/components/solutions/blocks";
import { PageHero } from "@/components/solutions/page-hero";
import {
  AppIcon,
  Section,
  SectionHead,
  panel,
  toneCard,
  toneCycle,
  toneStyle,
} from "@/components/solutions/primitives";
import { SubNav } from "@/components/solutions/sub-nav";
import { apps, closing, compare, features, hero, intro, perks, stories, whatsNew } from "@/content/solutions/acrobat";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Adobe Acrobat",
  description:
    "Adobe Acrobat Studio, Acrobat Pro and Reader from Malaysia's only Adobe Platinum Partner. PDF Spaces, AI Assistant, Adobe Express and e-signatures.",
  alternates: { canonical: "/solutions/digital-workflow/adobe-acrobat" },
};

const nav = [
  { id: "whats-new", label: "What's new" },
  { id: "features", label: "Features" },
  { id: "compare", label: "Compare" },
  { id: "stories", label: "Stories" },
];

export default function AdobeAcrobatPage() {
  return (
    <>
      <PageHero hero={hero} />

      <Section labelledBy="apps-title" className="pt-2 lg:pt-4">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <SectionHead
            eyebrow="Malaysia's only Adobe Platinum Partner"
            title="One connected PDF workspace."
            body={intro}
            id="apps-title"
          />
          <ul className="grid gap-3">
            {apps.map((a, i) => (
              <li
                key={a.title}
                data-reveal
                suppressHydrationWarning
                className={cn(toneCard, "flex items-center gap-4 p-4 sm:p-5")}
                style={toneStyle(toneCycle[i % toneCycle.length])}
              >
                <AppIcon icon={a.icon} name={a.title} />
                <div>
                  <h3 className="font-semibold text-ink">{a.title}</h3>
                  <p className="text-[0.9375rem] text-fg-muted">{a.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <SubNav items={nav} />

      <Section id="whats-new" labelledBy="new-title">
        <SectionHead
          eyebrow="What's new"
          title="The modern PDF: connected, intelligent, creative."
          id="new-title"
          className="mb-8"
        />
        <SplitRows items={whatsNew} />
      </Section>

      <Section id="features" labelledBy="feat-title">
        <SectionHead
          eyebrow="Everyday PDF tools"
          title="Everything you need to work with PDFs."
          id="feat-title"
          className="mb-8"
        />
        <FeatureGrid items={features} variant="image" columns={3} />
      </Section>

      <Section id="compare" labelledBy="compare-title">
        <SectionHead
          eyebrow="Compare"
          title="Which Acrobat is right for your team?"
          id="compare-title"
          className="mb-8"
        />
        <CompareTable table={compare} />
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {perks.map((p) => (
            <li
              key={p.title}
              data-reveal
              suppressHydrationWarning
              className={cn(panel, "flex items-center gap-3 p-4 lg:flex-col lg:items-start")}
            >
              <AppIcon icon={p.icon} name={p.title} className="size-10" />
              <span className="text-[0.9375rem] leading-snug font-medium text-ink">{p.title}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="stories" labelledBy="stories-title">
        <SectionHead
          eyebrow="Customer stories"
          title="See Acrobat AI Assistant at work."
          id="stories-title"
          className="mb-8"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {stories.map((s) => (
            <article key={s.title} data-reveal suppressHydrationWarning className={cn(panel, "group overflow-hidden")}>
              {s.image ? (
                <div className="overflow-hidden">
                  <Image
                    src={s.image.src}
                    width={s.image.width}
                    height={s.image.height}
                    alt={s.image.alt}
                    sizes="(min-width: 768px) 560px, 92vw"
                    className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                  />
                </div>
              ) : null}
              <div className="p-6 lg:p-8">
                <h3 className="text-[1.25rem] leading-snug font-bold tracking-[-0.02em] text-ink">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-fg-muted">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <ClosingCta content={{ ...closing, cta: { label: "Subscribe now", href: "/contact" } }} />
    </>
  );
}
