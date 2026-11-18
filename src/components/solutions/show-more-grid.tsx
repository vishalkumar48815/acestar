"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * Collapsible card grid: shows the first two rows and a "Show More / Show Less" button.
 * The grid itself stays server-rendered; items hide via `collapsedItemClass` (show-more-grid-items.ts) while
 * the wrapper has data-expanded="false" (so every card is still in the HTML for SEO).
 *
 * Two rows = 2 cards on phones (1 column), 4 on tablets (2 columns), 6 on desktop (3 columns).
 */
export function ShowMoreGrid({ count, children }: { count: number; children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const id = useId();

  if (count <= 2) return <>{children}</>;

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    // When collapsing from far down the list, bring the top of the grid back into view.
    if (!next) {
      const top = rootRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={rootRef} id={id} data-expanded={expanded} className="group/more scroll-mt-28">
      {children}
      <div
        className={cn(
          "mt-8 flex justify-center",
          // Hide the link at sizes where everything already fits in two rows.
          count <= 4 && "sm:hidden",
          count > 4 && count <= 6 && "lg:hidden",
        )}
      >
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          aria-controls={id}
          // Same outline pill as the home page "Show More" partners button
          className="group/btn inline-flex min-h-13 items-center gap-3 rounded-full border-[1.5px] border-[#8b5cf6] bg-white px-10 text-[1rem] font-bold text-eyebrow-ink shadow-[0_8px_24px_-16px_rgb(91_33_214/0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f5f0ff] dark:border-[#a78bfa] dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
        >
          {expanded ? "Show Less" : "Show More"}
          <ArrowRight
            aria-hidden="true"
            className={cn(
              "size-4 transition-transform duration-300",
              expanded ? "-rotate-90" : "group-hover/btn:translate-x-0.5",
            )}
          />
        </button>
      </div>
    </div>
  );
}
