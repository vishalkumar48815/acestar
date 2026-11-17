import type { SolutionBrief } from "@/content/solutions/types";
import { AiReasons } from "./ai-sections";
import { Eyebrow, Section, SectionHead } from "./primitives";

const delay = (i: number) => ({ "--reveal-delay": `${i * 70}ms` }) as React.CSSProperties;
const h2 =
  "font-display text-[clamp(1.75rem,1.15rem+2vw,2.625rem)] leading-[1.1] font-bold tracking-[-0.035em] text-balance text-ink";

/** Intro copy on the left, the list of offerings on the right (rows, not boxes). */
function OverviewParagraphs({ paragraphs, className }: { paragraphs: string[]; className?: string }) {
  return (
    <div
      className={`mt-5 flex flex-col gap-4 text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] leading-relaxed text-pretty text-fg-muted ${className ?? ""}`}
    >
      {paragraphs.map((p) => (
        <p key={p.slice(0, 32)}>{p}</p>
      ))}
    </div>
  );
}

export function BriefOverview({
  overview,
  id = "overview",
  showOfferings = true,
  collapsible = false,
}: {
  overview: SolutionBrief["overview"];
  id?: string;
  /** false = intro only, without the numbered offerings list. */
  showOfferings?: boolean;
  /** true = offerings as cards showing only the title; the description opens on click. */
  collapsible?: boolean;
}) {
  return (
    <Section id={id} labelledBy={`${id}-title`}>
      <div
        className={
          showOfferings
            ? "grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16"
            : "grid gap-5 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16"
        }
      >
        <div
          data-reveal
          suppressHydrationWarning
          className={showOfferings ? "lg:sticky lg:top-28 lg:self-start" : undefined}
        >
          <Eyebrow>{overview.eyebrow}</Eyebrow>
          <h2 id={`${id}-title`} className={`mt-4 ${h2}`}>
            {overview.title}
          </h2>
          {showOfferings ? <OverviewParagraphs paragraphs={overview.paragraphs} /> : null}
        </div>
        {/* Intro only: title on the left, description on the right */}
        {showOfferings ? null : (
          <div data-reveal suppressHydrationWarning>
            <OverviewParagraphs paragraphs={overview.paragraphs} className="lg:mt-9" />
          </div>
        )}
        {showOfferings ? (
          <div>
            <h3 className="text-[0.8125rem] font-bold tracking-[0.22em] text-eyebrow-ink uppercase">
              {overview.offeringsTitle}
            </h3>
            {collapsible ? (
              <OfferingAccordion offerings={overview.offerings} name={`${id}-offerings`} />
            ) : (
              <ol className="mt-4 divide-y divide-line border-y border-line">
                {overview.offerings.map((o, i) => (
                  <li
                    key={o.title}
                    data-reveal
                    suppressHydrationWarning
                    style={delay(i)}
                    className="group/row grid grid-cols-[2.75rem_1fr] gap-x-4 py-5 sm:py-6"
                  >
                    <span className="text-gradient font-display text-xl font-bold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-[1.125rem] leading-snug font-semibold tracking-[-0.015em] text-ink transition-colors group-hover/row:text-brand-ink">
                        {o.title}
                      </span>
                      <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-fg-muted">{o.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        ) : null}
      </div>
    </Section>
  );
}

/**
 * Offerings as an accordion: a short list of titles, each opening its description on click
 * (one open at a time). Native <details>, so it works without JavaScript and with the keyboard.
 */
function OfferingAccordion({ offerings, name }: { offerings: SolutionBrief["overview"]["offerings"]; name: string }) {
  return (
    <ol className="mt-5 flex flex-col gap-3">
      {offerings.map((o, i) => (
        <li key={o.title} data-reveal suppressHydrationWarning style={delay(i)}>
          <details
            name={name}
            className="group/acc rounded-2xl border border-line bg-white/70 transition-[border-color,background-color,box-shadow] duration-300 open:border-[color-mix(in_oklab,var(--eyebrow)_35%,transparent)] open:bg-white open:shadow-[0_24px_50px_-34px_rgb(60_50_160/0.45)] hover:border-[color-mix(in_oklab,var(--eyebrow)_30%,transparent)] dark:bg-white/[0.03] dark:open:bg-white/[0.06]"
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft font-display text-[0.9375rem] font-bold text-eyebrow-ink tabular-nums transition-colors duration-300 group-open/acc:bg-[image:var(--btn-gradient)] group-open/acc:text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-[1.0625rem] leading-snug font-semibold tracking-[-0.015em] text-ink sm:text-[1.125rem]">
                {o.title}
              </span>
              <span
                aria-hidden="true"
                className="relative grid size-8 shrink-0 place-items-center rounded-full border border-line text-fg-muted transition-[transform,background-color,color,border-color] duration-300 group-open/acc:rotate-45 group-open/acc:border-transparent group-open/acc:bg-brand-soft group-open/acc:text-eyebrow-ink"
              >
                <span className="absolute h-0.5 w-3 rounded-full bg-current" />
                <span className="absolute h-3 w-0.5 rounded-full bg-current" />
              </span>
            </summary>
            <p className="animate-[fade-up_0.45s_var(--ease-out)_both] px-5 pb-5 pl-[4.75rem] text-[0.9375rem] leading-relaxed text-fg-muted sm:px-6 sm:pb-6 sm:pl-[5rem]">
              {o.body}
            </p>
          </details>
        </li>
      ))}
    </ol>
  );
}

/** "Why Choose Acestar?": heading and intro, then four highlights in a row (same layout as the AI page). */
export function BriefWhy({ why, id = "why" }: { why: SolutionBrief["why"]; id?: string }) {
  return (
    <Section id={id} labelledBy={`${id}-title`}>
      <SectionHead
        eyebrow="Why Acestar"
        title={why.title}
        body={why.paragraphs.map((p, i) => (
          <span key={p.slice(0, 24)} className={i ? "mt-3 block" : "block"}>
            {p}
          </span>
        ))}
        id={`${id}-title`}
        className="mb-10"
      />
      {why.highlights.length ? <AiReasons items={why.highlights} /> : null}
    </Section>
  );
}
