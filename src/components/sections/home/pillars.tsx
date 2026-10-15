"use client";

import { ArrowUpRight, Check } from "@/components/ui/icons";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { pillars, specializations } from "@/content/home";
import { cn } from "@/lib/utils";
import type { PillarKey } from "@/types/content";

/** Ring rotation per pillar, so the visual "turns" as the story moves on. */
const ROTATION: Record<PillarKey, number> = { create: 0, compute: 120, collaborate: 240 };

/**
 * Desktop: a pinned visual on the left that cross-fades as each pillar scrolls past.
 * Mobile: simple stacked blocks, each carrying its own brand chips (no pinning).
 */
export function Pillars() {
  const [active, setActive] = useState<PillarKey>("create");
  const blockRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive((entry.target as HTMLElement).dataset.key as PillarKey);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    blockRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const current = pillars.find((p) => p.key === active) ?? pillars[0];

  return (
    <section id="solutions" aria-labelledby="pillars-title" className="relative py-20 md:py-32">
      <div className="container-page">
        <div data-reveal className="flex max-w-2xl flex-col gap-4">
          <span className="text-eyebrow text-brand-ink">{specializations.eyebrow}</span>
          <h2 id="pillars-title" className="text-title">
            {specializations.title}
          </h2>
          <p className="text-lead text-fg-muted">{specializations.lead}</p>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          {/* Pinned visual (desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] glass">
                {/* Rotating ring with the active pillar name at its centre */}
                <div aria-hidden="true" className="absolute inset-x-0 top-[7%] grid place-items-center">
                  <div
                    className="col-start-1 row-start-1 aspect-square w-[68%] rounded-full transition-transform duration-[1400ms] ease-out-expo"
                    style={{
                      transform: `rotate(${ROTATION[active]}deg)`,
                      background:
                        "conic-gradient(from 0deg, var(--brand), var(--aurora-2), transparent 45%, var(--aurora-3) 70%, var(--brand))",
                      maskImage: "radial-gradient(circle, transparent 60%, #000 61%, #000 66%, transparent 67%)",
                      WebkitMaskImage: "radial-gradient(circle, transparent 60%, #000 61%, #000 66%, transparent 67%)",
                    }}
                  />
                  <div className="col-start-1 row-start-1 aspect-square w-[52%] rounded-full bg-[var(--aurora-1)] opacity-50 blur-[60px]" />
                  {pillars.map((p) => (
                    <span
                      key={p.key}
                      className={cn(
                        "col-start-1 row-start-1 font-display text-[clamp(2.25rem,3.4vw,3.25rem)] font-extrabold tracking-[-0.04em] transition-all duration-700 ease-out-expo",
                        p.key === active ? "blur-0 translate-y-0 opacity-100" : "translate-y-3 opacity-0 blur-sm",
                      )}
                    >
                      {p.eyebrow}
                    </span>
                  ))}
                </div>

                <div className="absolute inset-x-0 bottom-0 grid p-8">
                  {pillars.map((p) => (
                    <div
                      key={p.key}
                      aria-hidden={p.key !== active}
                      className={cn(
                        "col-start-1 row-start-1 flex flex-col gap-6 transition-all duration-700 ease-out-expo",
                        p.key === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
                      )}
                    >
                      <div>
                        <p className="font-display text-5xl font-extrabold tracking-[-0.035em]">{p.fact.value}</p>
                        <p className="mt-1 text-fg-muted">{p.fact.label}</p>
                      </div>
                      <ul className="flex flex-wrap gap-2">
                        {p.brands.map((brand, i) => (
                          <li
                            key={brand}
                            className="rounded-full px-3.5 py-1.5 text-sm font-semibold glass-strong transition-all duration-500"
                            style={{ transitionDelay: p.key === active ? `${150 + i * 60}ms` : "0ms" }}
                          >
                            {brand}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <p className="sr-only" aria-live="polite">
                Showing {current.title}
              </p>
            </div>
          </div>

          {/* Scrolling text blocks */}
          <div className="flex flex-col gap-6 lg:gap-0">
            {pillars.map((pillar, index) => (
              <article
                key={pillar.key}
                ref={(el) => {
                  blockRefs.current[index] = el;
                }}
                data-key={pillar.key}
                className={cn(
                  "flex flex-col justify-center gap-5 rounded-[1.75rem] p-6 glass sm:p-8",
                  "lg:min-h-[78vh] lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none",
                  "lg:transition-opacity lg:duration-700",
                  pillar.key === active ? "lg:opacity-100" : "lg:opacity-35",
                )}
              >
                <span className="text-eyebrow text-brand-ink">{pillar.eyebrow}</span>
                <h3 className="font-display text-[clamp(1.75rem,1.3rem+2vw,2.75rem)] leading-[1.05] font-bold tracking-[-0.03em]">
                  {pillar.title}
                </h3>
                <p className="max-w-[32rem] text-lead text-fg-muted">{pillar.summary}</p>
                <ul className="flex flex-col gap-2.5">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex gap-3 text-fg-muted">
                      <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-ink" strokeWidth={2.5} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                {/* Mobile: show brands inline since there is no pinned visual */}
                <ul className="flex flex-wrap gap-2 lg:hidden" aria-label={`${pillar.title} brands`}>
                  {pillar.brands.map((brand) => (
                    <li
                      key={brand}
                      className="rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand-ink"
                    >
                      {brand}
                    </li>
                  ))}
                </ul>
                <Link
                  href={pillar.href}
                  className="group/link mt-1 inline-flex min-h-11 w-max items-center gap-1.5 font-semibold text-fg"
                >
                  Explore {pillar.title.toLowerCase()}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 text-brand-ink transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
