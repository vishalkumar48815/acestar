"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import type { Testimonial } from "@/types/content";
import { cn } from "@/lib/utils";

const INTERVAL = 7000;

/**
 * One testimonial at a time. All quotes are stacked in the same grid cell, so the block keeps
 * the height of the longest quote and never jumps. Auto-advances every 7s; pauses on hover,
 * focus, hidden tab or reduced motion.
 */
export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") go(1);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, go, index]);

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="What our clients say"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => !rootRef.current?.contains(e.relatedTarget as Node) && setPaused(false)}
      className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-12 shrink-0 rotate-180 lg:size-14">
        <defs>
          <linearGradient id="quote-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--accent-from)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--accent-to)" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <path
          fill="url(#quote-grad)"
          d="M3 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2H4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 0-1 1.03V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.76-2-2-2h-4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
        />
      </svg>

      <div className="grid min-w-0 flex-1" aria-live={paused ? "polite" : "off"}>
        {items.map((t, i) => (
          <figure
            key={t.name}
            aria-hidden={i !== index}
            className={cn(
              "col-start-1 row-start-1 flex flex-col gap-5 transition-[opacity,transform] ease-out-expo lg:flex-row lg:items-center lg:gap-10",
              // Sequential: the old quote leaves fast, the new one arrives after it has gone.
              i === index
                ? "translate-y-0 opacity-100 delay-200 duration-700"
                : "pointer-events-none translate-y-2 opacity-0 delay-0 duration-200",
            )}
          >
            <blockquote className="flex-1 text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-relaxed text-fg">
              <p>{t.quote}</p>
            </blockquote>
            <figcaption className="shrink-0 border-line text-sm leading-snug lg:flex lg:w-52 lg:flex-col lg:justify-center lg:self-stretch lg:border-l lg:pl-8">
              <span className="block font-semibold text-ink">{t.name}</span>
              <span className="block text-fg-subtle">{[t.role, t.company].filter(Boolean).join(", ")}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="grid size-11 place-items-center rounded-full border border-line bg-bg-elevated text-ink shadow-[0_4px_14px_-6px_rgb(30_40_90/0.2)] transition-all hover:-translate-y-0.5 hover:border-transparent hover:bg-[image:var(--btn-gradient)] hover:text-white"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="grid size-11 place-items-center rounded-full border border-line bg-bg-elevated text-ink shadow-[0_4px_14px_-6px_rgb(30_40_90/0.2)] transition-all hover:-translate-y-0.5 hover:border-transparent hover:bg-[image:var(--btn-gradient)] hover:text-white"
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
        <span className="ml-1 text-xs text-fg-subtle tabular-nums" aria-hidden="true">
          {index + 1} / {items.length}
        </span>
      </div>
    </div>
  );
}
