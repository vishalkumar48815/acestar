"use client";

import { ChevronLeft, ChevronRight, Quote } from "@/components/ui/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/content/home";
import { cn } from "@/lib/utils";

const INTERVAL = 8000;

/**
 * One testimonial at a time. All quotes share one grid cell, so the card keeps the height
 * of the longest quote and nothing jumps. Autoplay pauses on hover, keyboard focus,
 * when off-screen, and never runs for reduced-motion users.
 */
export function Voices() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const count = testimonials.length;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!!entry?.isIntersecting), { threshold: 0.3 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => go(1), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [index, paused, visible, go]);

  return (
    <section ref={sectionRef} aria-labelledby="voices-title" className="relative py-14 md:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div data-reveal suppressHydrationWarning className="flex flex-col gap-6">
          <span className="text-eyebrow text-brand-ink">In their words</span>
          <h2 id="voices-title" className="text-title">
            Client testimonials
          </h2>
          <p className="text-lead text-fg-muted">
            What our clients say about working with Acestar, from creative studios to healthcare and law.
          </p>
        </div>

        <div
          data-reveal
          suppressHydrationWarning
          style={{ ["--reveal-delay" as string]: "120ms" }}
          className="relative flex flex-col gap-8 rounded-[2rem] p-7 glass sm:p-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <Quote aria-hidden="true" className="size-9 text-brand-ink" strokeWidth={1.5} />

          <div className="grid" aria-live={paused ? "polite" : "off"}>
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                aria-hidden={i !== index}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                className={cn(
                  "col-start-1 row-start-1 flex flex-col gap-6 transition-all duration-700 ease-out-expo",
                  i === index ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
                )}
              >
                <blockquote className="font-display text-[clamp(1.1875rem,1.05rem+0.6vw,1.5rem)] leading-[1.35] font-medium tracking-[-0.015em]">
                  {t.quote}
                </blockquote>
                <figcaption className="flex flex-col">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-sm text-fg-muted">{[t.role, t.company].filter(Boolean).join(", ")}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2" role="group" aria-label="Choose testimonial">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial from ${t.company}`}
                  aria-current={i === index}
                  className="grid h-11 w-6 place-items-center"
                >
                  <span
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      i === index ? "w-6 bg-brand" : "w-1.5 bg-fg-subtle/40",
                    )}
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="grid size-11 place-items-center rounded-full glass-strong transition-transform hover:-translate-x-0.5"
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="grid size-11 place-items-center rounded-full glass-strong transition-transform hover:translate-x-0.5"
              >
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
