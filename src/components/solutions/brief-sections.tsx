import type { SolutionBrief } from "@/content/solutions/types";
import { cn } from "@/lib/utils";
import { AiReasons } from "./ai-sections";
import { Eyebrow, Section, SectionHead } from "./primitives";

const delay = (i: number) => ({ "--reveal-delay": `${i * 70}ms` }) as React.CSSProperties;
const h2 =
  "font-display text-[clamp(1.75rem,1.15rem+2vw,2.625rem)] leading-[1.1] font-bold tracking-[-0.035em] text-balance text-ink";

/** Intro copy on the left, the offerings on the right as numbered rows that open on click. */
function OverviewParagraphs({ paragraphs, className }: { paragraphs: string[]; className?: string }) {
  return (
    <div
      className={cn(
        "mt-5 flex flex-col gap-4 text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] leading-relaxed text-pretty text-fg-muted",
        className,
      )}
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
  align = "start",
}: {
  overview: SolutionBrief["overview"];
  id?: string;
  /** false = intro only, without the numbered offerings list. */
  showOfferings?: boolean;
  /** Intro only: "center" stacks eyebrow, title and description in the middle. */
  align?: "start" | "center";
}) {
  if (!showOfferings && align === "center") {
    return (
      <Section id={id} labelledBy={`${id}-title`}>
        <div
          data-reveal
          suppressHydrationWarning
          className="mx-auto flex max-w-[56rem] flex-col items-center text-center"
        >
          <Eyebrow>{overview.eyebrow}</Eyebrow>
          <h2 id={`${id}-title`} className={`mt-4 text-balance ${h2}`}>
            {overview.title}
          </h2>
          <OverviewParagraphs paragraphs={overview.paragraphs} className="mt-4 max-w-[44rem]" />
        </div>
      </Section>
    );
  }
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
            <OfferingAccordion offerings={overview.offerings} name={`${id}-offerings`} />
          </div>
        ) : null}
      </div>
    </Section>
  );
}

/**
 * Offerings as an accordion in the same numbered-row style as the static list: number and title
 * with a "+" on the right; the description opens on click (one open at a time). Native <details>,
 * so it works without JavaScript and with the keyboard.
 */
function OfferingAccordion({ offerings, name }: { offerings: SolutionBrief["overview"]["offerings"]; name: string }) {
  return (
    <ol className="mt-4 divide-y divide-line border-y border-line">
      {offerings.map((o, i) => (
        <li key={o.title} data-reveal suppressHydrationWarning style={delay(i)}>
          <details name={name} className="group/acc">
            <summary className="grid cursor-pointer list-none grid-cols-[2.75rem_1fr_auto] items-center gap-x-4 py-5 sm:py-6 [&::-webkit-details-marker]:hidden">
              <span className="text-gradient font-display text-xl font-bold tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[1.125rem] leading-snug font-semibold tracking-[-0.015em] text-ink transition-colors group-open/acc:text-brand-ink group-hover/acc:text-brand-ink">
                {o.title}
              </span>
              <span
                aria-hidden="true"
                className="relative grid size-8 shrink-0 place-items-center rounded-full text-fg-muted transition-[transform,background-color,color] duration-300 group-open/acc:rotate-45 group-open/acc:bg-brand-soft group-open/acc:text-eyebrow-ink group-hover/acc:bg-brand-soft group-hover/acc:text-eyebrow-ink"
              >
                <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                <span className="absolute h-3.5 w-0.5 rounded-full bg-current" />
              </span>
            </summary>
            <p className="-mt-2 animate-[fade-up_0.45s_var(--ease-out)_both] pr-12 pb-6 pl-[3.75rem] text-[0.9375rem] leading-relaxed text-fg-muted">
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
        align="center"
        className="mb-10"
      />
      {why.highlights.length ? <AiReasons items={why.highlights} /> : null}
    </Section>
  );
}
