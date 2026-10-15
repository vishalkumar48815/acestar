"use client";

import { useEffect } from "react";

/**
 * Lenis inertial scrolling. Loaded lazily after hydration so it never blocks first paint,
 * and skipped entirely for users who prefer reduced motion or are on touch devices
 * (native momentum scrolling is already good there).
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    let frame = 0;
    let destroyed = false;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;

    import("lenis")
      .then(({ default: Lenis }) => {
        if (destroyed) return;
        lenis = new Lenis({ duration: 1.1, anchors: { offset: -96 } });
        const loop = (time: number) => {
          lenis?.raf(time);
          frame = requestAnimationFrame(loop);
        };
        frame = requestAnimationFrame(loop);
      })
      .catch(() => {
        /* Smooth scroll is an enhancement; native scrolling still works. */
      });

    return () => {
      destroyed = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
