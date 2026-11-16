import type { SolutionBrief } from "@/content/solutions/types";
import { AiReasons } from "./ai-sections";
import { Eyebrow, Section, SectionHead } from "./primitives";

const delay = (i: number) => ({ "--reveal-delay": `${i * 70}ms` }) as React.CSSProperties;
const h2 =
  "font-display text-[clamp(1.75rem,1.15rem+2vw,2.625rem)] leading-[1.1] font-bold tracking-[-0.035em] text-balance text-ink";

/** Intro copy on the left, the list of offerings on the right (rows, not boxes). */
export function BriefOverview({ overview, id = "overview" }: { overview: SolutionBrief["overview"]; id?: string }) {
  return (
    <Section id={id} labelledBy={`${id}-title`}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <div data-reveal suppressHydrationWarning className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>{overview.eyebrow}</Eyebrow>
          <h2 id={`${id}-title`} className={`mt-4 ${h2}`}>
            {overview.title}
          </h2>
          <div className="mt-5 flex flex-col gap-4 text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] leading-relaxed text-pretty text-fg-muted">
            {overview.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-[0.8125rem] font-bold tracking-[0.22em] text-eyebrow-ink uppercase">
            {overview.offeringsTitle}
          </h3>
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
        </div>
      </div>
    </Section>
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
