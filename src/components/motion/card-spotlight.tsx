"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sets --sx / --sy on whichever `[data-spotlight]` card the pointer is over, so a CSS radial
 * gradient can follow the cursor. One listener for the whole list; fine pointers only.
 */
export function CardSpotlight({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      const card = (event.target as HTMLElement).closest<HTMLElement>("[data-spotlight]");
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--sx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--sy", `${event.clientY - rect.top}px`);
      });
    };
    root.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      root.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
