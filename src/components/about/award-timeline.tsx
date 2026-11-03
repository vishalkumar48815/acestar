"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { AwardKind, AwardYear } from "@/content/about/awards";
import { cn } from "@/lib/utils";

const filters: { key: AwardKind | "all"; label: string }[] = [
  { key: "all", label: "All awards" },
  { key: "partner", label: "Partner awards" },
  { key: "business", label: "Business & leadership" },
];

/**
 * Year-by-year awards with a filter. Desktop: sticky year column beside a card grid, joined by
 * a gradient spine. The founding year closes the timeline.
 */
export function AwardTimeline({ years, founded }: { years: AwardYear[]; founded: number }) {
  const [filter, setFilter] = useState<AwardKind | "all">("all");

  const visible = useMemo(
    () =>
      years
        .map((y) => ({ ...y, awards: y.awards.filter((a) => filter === "all" || a.kind === filter) }))
        .filter((y) => y.awards.length > 0),
    [years, filter],
  );
  const shown = visible.reduce((n, y) => n + y.awards.length, 0);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filter awards" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "min-h-11 rounded-full px-5 text-[0.9375rem] font-medium transition-all duration-300",
                filter === f.key
                  ? "bg-[image:var(--btn-gradient)] text-white shadow-[var(--btn-gradient-shadow)]"
                  : "border border-line bg-white/60 text-fg-muted hover:text-fg dark:bg-white/[0.03]",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-fg-subtle" aria-live="polite">
          Showing {shown} {shown === 1 ? "award" : "awards"}
        </p>
      </div>

      <ol className="relative mt-10 lg:mt-12">
        {/* Gradient spine */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[0.4375rem] w-px bg-[linear-gradient(180deg,var(--accent-from),var(--accent-to)_60%,transparent)] opacity-40 lg:left-[9.4375rem]"
        />
        {visible.map((y) => (
          <li key={y.year} className="relative grid gap-5 pb-10 pl-8 lg:grid-cols-[9rem_1fr] lg:gap-8 lg:pb-12 lg:pl-0">
            <span
              aria-hidden="true"
              className="absolute top-2 left-0 size-[0.9375rem] rounded-full border-[3px] border-bg bg-[image:var(--btn-gradient)] shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent-from)_18%,transparent)] lg:left-36"
            />
            <div className="lg:sticky lg:top-28 lg:self-start lg:pr-10 lg:text-right">
              <h3 className="text-gradient font-display text-[2rem] leading-none font-extrabold tracking-[-0.04em] tabular-nums lg:text-[2.5rem]">
                {y.year}
              </h3>
              <p className="mt-1.5 text-sm text-fg-subtle">
                {y.awards.length} {y.awards.length === 1 ? "award" : "awards"}
              </p>
            </div>
            <ul className="grid gap-3 md:grid-cols-2">
              {y.awards.map((award, i) => (
                <li
                  key={`${award.title}-${i}`}
                  className="group/award flex items-center gap-4 rounded-[1.25rem] border border-white/90 bg-white/70 p-3 pr-5 shadow-[0_1px_2px_rgb(30_40_90/0.05)] backdrop-blur transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-24px_rgb(70_70_180/0.35)] dark:border-white/[0.08] dark:bg-white/[0.03]"
                  style={{ animation: `fade-up 0.6s var(--ease-out) ${i * 60}ms both` }}
                >
                  <div className="relative h-[4.5rem] w-28 shrink-0 rounded-xl bg-white ring-1 ring-line">
                    {award.image ? (
                      <Image
                        src={award.image.src}
                        width={award.image.width}
                        height={award.image.height}
                        alt={award.image.alt}
                        sizes="112px"
                        className="absolute inset-0 h-full w-full object-contain p-2.5 transition-transform duration-700 ease-out-expo group-hover/award:scale-105"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.6875rem] font-semibold tracking-wide text-brand-ink uppercase">
                      {award.issuer}
                    </p>
                    <p className="mt-0.5 text-[0.9375rem] leading-snug font-semibold text-ink">{award.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
        <li className="relative grid gap-3 pl-8 lg:grid-cols-[9rem_1fr] lg:gap-8 lg:pl-0">
          <span
            aria-hidden="true"
            className="absolute top-2 left-0 size-[0.9375rem] rounded-full border-[3px] border-bg bg-fg-subtle lg:left-36"
          />
          <h3 className="font-display text-[2rem] leading-none font-extrabold tracking-[-0.04em] text-fg-subtle tabular-nums lg:pr-10 lg:text-right lg:text-[2.5rem]">
            {founded}
          </h3>
          <p className="self-center leading-relaxed text-fg-muted">
            <span className="font-semibold text-ink">Acestar is founded.</span> The start of the journey.
          </p>
        </li>
      </ol>
    </div>
  );
}
