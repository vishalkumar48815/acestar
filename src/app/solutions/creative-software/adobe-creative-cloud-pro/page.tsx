import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { CompareTable, FeatureGrid, SplitRows, StatStrip } from "@/components/solutions/blocks";
import { PageHero } from "@/components/solutions/page-hero";
import { Section, SectionHead, panel, toneCard, toneStyle } from "@/components/solutions/primitives";
import { SubNav } from "@/components/solutions/sub-nav";
import { apps, compare, discounts, hero, plans, trust, upgrade, whatsNew } from "@/content/solutions/creative-cloud";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Adobe Creative Cloud Pro",
  description:
    "Buy, renew or manage Adobe Creative Cloud Pro licences with Malaysia's only Adobe Platinum Partner. Compare plans, VIP Marketplace and ETLA, and discount levels.",
  alternates: { canonical: "/solutions/creative-software/adobe-creative-cloud-pro" },
};

const nav = [
  { id: "apps", label: "Apps" },
  { id: "upgrade", label: "Teams → Pro" },
  { id: "compare", label: "Compare" },
  { id: "whats-new", label: "What's new" },
  { id: "plans", label: "Plans" },
];

export default function CreativeCloudProPage() {
  return (
    <>
      <PageHero hero={hero} />

      <div className="container-page mt-6 mb-4 lg:mt-8">
        <p data-reveal suppressHydrationWarning className="mb-6 max-w-3xl leading-relaxed text-fg-muted">
          {trust.body}
        </p>
        <StatStrip stats={trust.stats} />
      </div>

      <SubNav items={nav} />

      <Section id="apps" labelledBy="apps-title">
        <SectionHead
          eyebrow="Creative Cloud Pro"
          title="Every app you need, plus Adobe AI."
          body="Over 20 apps including Photoshop, Illustrator, Premiere Pro and Acrobat Pro, with unlimited standard Firefly generative AI."
          id="apps-title"
          className="mb-8"
        />
        <FeatureGrid items={apps} variant="icon" columns={3} />
      </Section>

      <Section id="upgrade" labelledBy="upgrade-title">
        <div
          className={cn(toneCard, "grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:p-12")}
          style={toneStyle("violet")}
        >
          <SectionHead eyebrow={upgrade.eyebrow} title={upgrade.title} body={upgrade.body} id="upgrade-title" />
          <ol className="flex flex-col gap-3 self-center">
            {upgrade.points.map((p, i) => (
              <li
                key={p}
                data-reveal
                suppressHydrationWarning
                className="flex items-start gap-4 rounded-2xl bg-white/70 p-4 dark:bg-white/[0.04]"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[image:var(--btn-gradient)] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-1 leading-relaxed text-fg">{p}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="compare" labelledBy="compare-title">
        <SectionHead
          eyebrow="Compare"
          title="Find the right Creative Cloud plan."
          id="compare-title"
          className="mb-8"
        />
        <CompareTable table={compare} />
      </Section>

      <Section id="whats-new" labelledBy="new-title">
        <SectionHead eyebrow="What's new" title="Firefly and Express, built in." id="new-title" className="mb-8" />
        <SplitRows items={whatsNew} />
      </Section>

      <Section id="plans" labelledBy="plans-title">
        <SectionHead eyebrow={plans.eyebrow} title={plans.title} body={plans.body} id="plans-title" className="mb-8" />
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_0.9fr]">
          {plans.items.map((plan, i) => (
            <article
              key={plan.name}
              data-reveal
              suppressHydrationWarning
              className={cn(toneCard, "flex flex-col p-6 lg:p-8")}
              style={toneStyle(i === 0 ? "sky" : "mint")}
            >
              <p className="text-eyebrow text-fg-subtle">{plan.audience}</p>
              <h3 className="mt-3 text-[1.375rem] leading-tight font-bold tracking-[-0.02em] text-ink">{plan.name}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {plan.points.map((pt) => (
                  <li key={pt} className="flex gap-3 leading-relaxed text-fg-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[image:var(--btn-gradient)]"
                    />
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <div data-reveal suppressHydrationWarning className={cn(panel, "p-6 lg:p-8")}>
            <p className="text-eyebrow text-fg-subtle">{discounts.eyebrow}</p>
            <h3 className="mt-3 text-[1.25rem] leading-tight font-bold tracking-[-0.02em] text-ink">
              {discounts.title}
            </h3>
            <table className="mt-5 w-full text-left">
              <caption className="sr-only">Discount level by licence quantity</caption>
              <thead>
                <tr className="text-sm text-fg-subtle">
                  <th scope="col" className="pb-2 font-medium">
                    Level
                  </th>
                  <th scope="col" className="pb-2 text-right font-medium">
                    Licences
                  </th>
                </tr>
              </thead>
              <tbody>
                {discounts.rows.map((r) => (
                  <tr key={r.level} className="border-t border-line">
                    <td className="py-3">
                      <span className="text-gradient font-display text-xl font-extrabold">{r.level}</span>
                    </td>
                    <td className="py-3 text-right font-semibold text-ink">{r.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-sm text-fg-subtle">{discounts.note}</p>
          </div>
        </div>
      </Section>

      <ClosingCta
        content={{
          eyebrow: "Licensing made simple",
          title: "Get Creative Cloud Pro with Acestar.",
          body: "Genuine licences, expert consultation and deployment from Malaysia's only Adobe Platinum Partner.",
          cta: { label: "Get a quote", href: "/contact" },
        }}
      />
    </>
  );
}
