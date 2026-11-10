import { Award, Sparkles } from "@/components/ui/icons";
import { type AwardYear, recognitionSummary } from "@/content/about/awards";
import { cn } from "@/lib/utils";

/**
 * Awards hero visual: summarises the record instead of repeating the logos listed below.
 * The latest honour in a spotlight card, recognition per year as a bar chart, and the
 * partner / business split. Everything is derived from the timeline data.
 */
export function AwardsShowcase({ years }: { years: AwardYear[] }) {
  const latest = years[0];
  const [headline, ...others] = [...latest.awards].sort(
    (a, b) => Number(/top|platinum/i.test(b.title)) - Number(/top|platinum/i.test(a.title)),
  );

  const chronological = [...years].reverse();
  const first = chronological[0].year;
  const last = latest.year;
  const perYear = Array.from({ length: last - first + 1 }, (_, i) => {
    const y = first + i;
    return { year: y, count: years.find((x) => x.year === y)?.awards.length ?? 0 };
  });
  const peak = Math.max(...perYear.map((p) => p.count));

  const all = years.flatMap((y) => y.awards);
  const partner = all.filter((a) => a.kind === "partner").length;

  return (
    <div className="relative grid gap-4 sm:grid-cols-2" aria-label="Awards at a glance">
      <span
        aria-hidden="true"
        className="absolute -inset-10 -z-10 bg-[radial-gradient(50%_50%_at_60%_40%,color-mix(in_oklab,var(--accent-to)_22%,transparent),transparent_70%)] blur-2xl"
      />

      {/* Latest honour */}
      <article
        className="relative isolate overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,#141a44,#2b2a7a_55%,#6a3fd0)] p-6 text-white shadow-[0_40px_80px_-40px_rgb(40_40_120/0.7)] sm:col-span-2 sm:p-7"
        style={{ animation: "hero-art-in 1.1s var(--ease-out) 150ms both" }}
      >
        <span
          aria-hidden="true"
          className="absolute -top-16 -right-10 -z-10 size-64 rounded-full bg-[radial-gradient(closest-side,rgb(255_214_120/0.35),transparent)]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 [background-image:linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] [mask-image:radial-gradient(70%_80%_at_80%_20%,black,transparent)] [background-size:28px_28px]"
        />
        <div className="flex items-start gap-4 sm:gap-5">
          <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(145deg,#ffe29a,#f5b544_55%,#d88a1f)] text-[#3b2600] shadow-[0_12px_30px_-10px_rgb(245_181_68/0.8),inset_0_1px_0_rgb(255_255_255/0.6)] sm:size-16">
            <Award className="size-7 sm:size-8" strokeWidth={2.2} />
            <span className="absolute -inset-1 -z-10 animate-pulse rounded-[1.1rem] bg-[rgb(255_214_120/0.25)] blur-md motion-reduce:animate-none" />
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-[0.6875rem] font-semibold tracking-[0.22em] text-white/70 uppercase">
              <Sparkles aria-hidden="true" className="size-3.5 text-[#ffd57a]" />
              Latest honour · {latest.year}
            </p>
            <p className="mt-2 font-display text-[clamp(1.25rem,1rem+0.9vw,1.625rem)] leading-[1.15] font-bold tracking-[-0.025em] text-balance">
              {headline.issuer} {headline.title}
            </p>
            {others.length ? (
              <p className="mt-2 text-sm text-white/70">
                Also in {latest.year}: {others.map((o) => `${o.issuer} ${o.title}`).join(", ")}
              </p>
            ) : null}
          </div>
        </div>
      </article>

      {/* Recognition per year */}
      <article
        className="rounded-[1.5rem] border border-white/90 bg-white/80 p-5 shadow-[0_1px_2px_rgb(30_40_90/0.05),0_24px_48px_-32px_rgb(40_50_120/0.35)] dark:border-white/[0.08] dark:bg-white/[0.04]"
        style={{ animation: "hero-art-in 1.1s var(--ease-out) 300ms both" }}
      >
        <p className="text-sm font-semibold text-ink">Recognised every year</p>
        <p className="text-xs text-fg-subtle">
          Awards per year, {first}–{last}
        </p>
        <div
          className="mt-4 flex h-28 items-end gap-[3px] sm:gap-1"
          role="img"
          aria-label={`Awards per year from ${first} to ${last}; peak of ${peak} in a year`}
        >
          {perYear.map((p, i) => (
            <span key={p.year} className="group relative flex h-full flex-1 items-end">
              <span
                className={cn(
                  "block w-full origin-bottom rounded-t-[4px]",
                  p.year === last
                    ? "bg-[linear-gradient(180deg,#ffd57a,#f5a524)]"
                    : "bg-[image:var(--btn-gradient)] opacity-80",
                )}
                style={{
                  height: `${Math.max(p.count / peak, 0.06) * 100}%`,
                  animation: `bar-grow 0.9s var(--ease-out) ${500 + i * 45}ms both`,
                }}
              />
            </span>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[0.6875rem] text-fg-subtle tabular-nums">
          <span>{first}</span>
          <span>{last}</span>
        </div>
      </article>

      {/* Partner vs business */}
      <article
        className="flex flex-col rounded-[1.5rem] border border-white/90 bg-white/80 p-5 shadow-[0_1px_2px_rgb(30_40_90/0.05),0_24px_48px_-32px_rgb(40_50_120/0.35)] dark:border-white/[0.08] dark:bg-white/[0.04]"
        style={{ animation: "hero-art-in 1.1s var(--ease-out) 420ms both" }}
      >
        <p className="text-sm font-semibold text-ink">Who recognises us</p>
        <p className="text-xs text-fg-subtle">Technology partners and industry bodies</p>
        <div className="mt-auto pt-5">
          <div className="flex h-3 overflow-hidden rounded-full bg-brand-soft">
            <span
              className="h-full origin-left bg-[image:var(--btn-gradient)]"
              style={{
                width: `${(partner / all.length) * 100}%`,
                animation: "bar-grow-x 1s var(--ease-out) 700ms both",
              }}
            />
            <span className="h-full flex-1 bg-[linear-gradient(90deg,#ffd57a,#f5a524)] opacity-90" />
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            {[
              { value: recognitionSummary.partners, label: "Partners", dot: "bg-[image:var(--btn-gradient)]" },
              { value: recognitionSummary.awards, label: "Awards", dot: "bg-[#f5a524]" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col-reverse">
                <dt className="mt-0.5 flex items-center gap-1.5 text-sm text-fg-muted">
                  <span aria-hidden="true" className={cn("size-2 rounded-full", item.dot)} />
                  {item.label}
                </dt>
                <dd className="font-display text-[1.75rem] leading-none font-bold tracking-[-0.03em] text-ink">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </article>
    </div>
  );
}
