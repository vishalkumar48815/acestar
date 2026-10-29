"use client";

import { useEffect, useRef, useState } from "react";
import { NeuralField } from "@/components/motion/neural-field";
import { cn } from "@/lib/utils";

type Variant = { layout: "desk" | "mob"; theme: "light" | "dark" };

const WIDE = "(min-width: 64rem)";

function currentVariant(): Variant {
  const theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  return { layout: window.matchMedia(WIDE).matches ? "desk" : "mob", theme };
}

/** Motion is skipped for reduced-motion users and on Save-Data connections. */
function motionAllowed() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !conn?.saveData;
}

/**
 * Hero artwork: the static render paints first (CSS background, no JS needed), then a seamless
 * 10-second loop of the same scene (ribbons turning, light pulses travelling along them, silk
 * drifting) fades in once it is actually playing. A neural-network canvas sits on top and reacts
 * to the cursor. Everything pauses when the hero is off-screen or the tab is hidden.
 */
export function HeroBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [variant, setVariant] = useState<Variant | null>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);
  const [failed, setFailed] = useState<string | null>(null);

  // Pick the video for the current theme + layout, and follow changes to either.
  useEffect(() => {
    if (!motionAllowed()) return;
    const update = () =>
      setVariant((prev) => {
        const next = currentVariant();
        return prev && prev.layout === next.layout && prev.theme === next.theme ? prev : next;
      });
    update();
    const mq = window.matchMedia(WIDE);
    mq.addEventListener("change", update);
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      mq.removeEventListener("change", update);
      mo.disconnect();
    };
  }, []);

  // Pause off-screen / hidden tab.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.01 });
    io.observe(root);
    const onVis = () => setVisible(document.visibilityState === "visible" && root.getBoundingClientRect().bottom > 0);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !variant) return;
    if (visible) video.play().catch(() => {});
    else video.pause();
  }, [visible, variant]);

  // Gentle pointer parallax (fine pointers only), eased with rAF.
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || !window.matchMedia("(pointer: fine)").matches || !motionAllowed()) return;
    let tx = 0,
      ty = 0,
      x = 0,
      y = 0,
      frame = 0;
    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      layer.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(1.03)`;
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.05 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * -18;
      ty = (e.clientY / window.innerHeight - 0.5) * -12;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const candidate = variant ? `/videos/hero/hero-${variant.layout}-${variant.theme}` : undefined;
  // A missing/unsupported file just leaves the still artwork in place.
  const src = candidate && candidate !== failed ? candidate : undefined;

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      <div
        ref={layerRef}
        className="absolute inset-0 will-change-transform"
        style={{ animation: "hero-art-in 1.6s var(--ease-out) both" }}
      >
        <div className="hero-art absolute inset-0" />
        {src && (
          <video
            key={src}
            ref={videoRef}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            disablePictureInPicture
            onPlaying={() => setPlaying(true)}
            onEmptied={() => setPlaying(false)}
            className={cn(
              "absolute top-0 left-0 w-full transition-opacity duration-1000 ease-out-expo",
              "max-lg:h-auto lg:h-full lg:object-cover lg:object-[68%_50%]",
              playing ? "opacity-100" : "opacity-0",
            )}
          >
            <source src={`${src}.webm`} type="video/webm" />
            {/* Errors surface on the last <source>, not the <video> */}
            <source
              src={`${src}.mp4`}
              type="video/mp4"
              onError={() => {
                setPlaying(false);
                setFailed(src);
              }}
            />
          </video>
        )}
      </div>
      <NeuralField className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,#000_0%,#000_26%,transparent_42%)] lg:[mask-image:linear-gradient(to_right,transparent_28%,#000_62%)]" />
    </div>
  );
}
