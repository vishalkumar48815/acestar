"use client";

import { useId, useState } from "react";
import { ChevronDown } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type Belief = { title: string; tagline: string; body: string };

/** 4S beliefs: title + short line; one "Learn more" below opens each belief's paragraph. */
export function BeliefsGrid({ items }: { items: readonly Belief[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <>
      <ul className="mt-6 grid gap-y-10 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4">
        {items.map((b, i) => (
          <li
            key={b.title}
            data-reveal
            suppressHydrationWarning
            style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            className={cn(
              "px-6 py-1 text-center",
              i > 0 && "lg:border-l lg:border-[#d7deee] dark:lg:border-white/15",
              i % 2 === 1 && "sm:border-l sm:border-[#d7deee] dark:sm:border-white/15",
            )}
          >
            <h3 className="font-display text-[clamp(1.375rem,1.1rem+0.8vw,1.75rem)] font-bold tracking-[-0.025em] text-ink">
              {b.title}
            </h3>
            <p className="mt-1 text-[clamp(1.125rem,1rem+0.4vw,1.375rem)] text-fg-muted">{b.tagline}</p>
            <div
              id={`${id}-${i}`}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden" inert={!open}>
                <p className="pt-4 text-[0.9375rem] leading-relaxed text-fg-muted">{b.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={items.map((_, i) => `${id}-${i}`).join(" ")}
          onClick={() => setOpen((o) => !o)}
          className="group inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] border-[#8b5cf6] bg-white px-6 text-[0.9375rem] font-semibold text-eyebrow-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f5f0ff] dark:border-[#a78bfa] dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
        >
          {open ? "Show less" : "Learn more"}
          <ChevronDown
            aria-hidden="true"
            className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
          />
        </button>
      </div>
    </>
  );
}
