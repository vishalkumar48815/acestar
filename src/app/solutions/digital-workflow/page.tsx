import type { Metadata } from "next";
import Image from "next/image";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { RelatedSolutions } from "@/components/solutions/blocks";
import { PageHero } from "@/components/solutions/page-hero";
import { AppIcon, BannerStrip, Section, panel } from "@/components/solutions/primitives";
import { SubNav } from "@/components/solutions/sub-nav";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { hero, sections, type WorkflowSection } from "@/content/solutions/digital-workflow";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Digital Workflow Management",
  description:
    "Adobe Document Cloud and Acrobat Sign, Microsoft 365, Faronics, Saleslive CRM and video conferencing from Zoom, Jabra and Logitech, implemented by Acestar.",
  alternates: { canonical: "/solutions/digital-workflow" },
};

function WorkflowBlock({ s, index }: { s: WorkflowSection; index: number }) {
  return (
    <Section id={s.id} labelledBy={`${s.id}-title`} className="py-8 lg:py-10">
      <article data-reveal suppressHydrationWarning className={cn(panel, "overflow-hidden")}>
        <BannerStrip
          banner={s.banner}
          title={s.name}
          kicker={String(index + 1).padStart(2, "0")}
          as="h2"
          id={`${s.id}-title`}
        />
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-[1.0625rem] leading-relaxed text-fg">{s.intro}</p>
            {s.story ? <p className="mt-3 leading-relaxed text-fg-muted">{s.story}</p> : null}

            {s.icons?.length ? (
              <ul className="mt-6 flex flex-wrap gap-2.5" aria-label={`${s.name} apps`}>
                {s.icons.map((icon) => (
                  <li
                    key={icon.src}
                    title={icon.alt}
                    className="grid size-14 place-items-center rounded-2xl border border-line bg-white/80 transition-transform duration-300 hover:-translate-y-1 dark:bg-white/[0.06]"
                  >
                    <Image
                      src={icon.src}
                      width={icon.width}
                      height={icon.height}
                      alt={icon.alt}
                      sizes="40px"
                      className="size-8 object-contain"
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {s.link ? (
            <div>
              <ButtonLink href={s.link.href} external={s.link.external} variant="gradient" size="md" className="px-6">
                {s.link.label}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-1" />
              </ButtonLink>
            </div>
          ) : null}
        </div>

        {s.highlights?.length ? (
          <ul
            className={cn(
              "grid gap-3 border-t border-line p-4 sm:p-6 lg:p-8",
              s.highlights.length > 1 ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : "grid-cols-1",
            )}
          >
            {s.highlights.map((h) => (
              <li key={h.title} className="flex items-start gap-3 rounded-2xl bg-white/60 p-4 dark:bg-white/[0.03]">
                <AppIcon icon={h.icon} name={h.title} className="size-10" />
                <div className="min-w-0">
                  <h3 className="text-[0.9375rem] font-semibold text-ink">{h.title}</h3>
                  <p className="mt-1 text-[0.875rem] leading-relaxed text-fg-muted">{h.body}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        {s.stats?.length ? (
          <dl className="grid grid-cols-2 border-t border-line sm:grid-cols-4">
            {s.stats.map((st, i) => (
              <div
                key={st.label}
                className={cn(
                  "flex flex-col p-5 lg:p-6",
                  i > 0 && "border-l border-line max-sm:[&:nth-child(3)]:border-l-0",
                  i > 1 && "max-sm:border-t",
                )}
              >
                <dt className="text-sm text-fg-muted">{st.label}</dt>
                <dd className="order-first text-gradient font-display text-[1.75rem] font-extrabold tracking-[-0.03em]">
                  {st.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {s.partners?.length ? (
          <ul className="grid gap-3 border-t border-line p-4 sm:grid-cols-3 sm:p-6 lg:p-8">
            {s.partners.map((p) => (
              <li key={p.name} className="flex flex-col rounded-2xl bg-white/60 p-5 dark:bg-white/[0.03]">
                <div className="flex h-10 items-center">
                  {p.logo ? (
                    <Image
                      src={p.logo.src}
                      width={p.logo.width}
                      height={p.logo.height}
                      alt={p.logo.alt}
                      sizes="140px"
                      className="h-8 w-auto max-w-[8rem] object-contain dark:brightness-0 dark:invert"
                    />
                  ) : (
                    <span className="font-display text-xl font-bold text-ink">{p.name}</span>
                  )}
                </div>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    </Section>
  );
}

export default function DigitalWorkflowPage() {
  return (
    <>
      <PageHero hero={hero} />
      <SubNav items={sections.map((s) => ({ id: s.id, label: s.name }))} />
      <div className="py-4">
        {sections.map((s, i) => (
          <WorkflowBlock key={s.id} s={s} index={i} />
        ))}
      </div>
      <RelatedSolutions current="workflow" />
      <ClosingCta
        content={{
          eyebrow: "Work smarter",
          title: "Ready to streamline how your team works?",
          body: "Consultation, licensing and implementation for document, collaboration and meeting-room workflows.",
          cta: { label: "Talk to us", href: "/contact" },
        }}
      />
    </>
  );
}
