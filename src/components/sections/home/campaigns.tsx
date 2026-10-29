"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { media, type Campaign } from "@/content/media";
import { cn } from "@/lib/utils";

const DURATION_MS = 6500;
const SIZES = "(min-width: 1216px) 1152px, (min-width: 768px) 92vw, 100vw";

/** <picture> with the desktop banner on ≥768px and the portrait banner on phones. */
function CampaignPicture({ campaign, eager }: { campaign: Campaign; eager: boolean }) {
  const desktop = campaign.desktop ?? campaign.mobile!;
  const mobile = campaign.mobile ?? campaign.desktop!;
  const common = { alt: desktop.alt, sizes: SIZES, quality: 80 } as const;
  const { props: d } = getImageProps({ ...common, src: desktop.src, width: desktop.width, height: desktop.height });
  const { props: m } = getImageProps({
    ...common,
    alt: mobile.alt,
    src: mobile.src,
    width: mobile.width,
    height: mobile.height,
    loading: eager ? "eager" : "lazy",
    fetchPriority: eager ? "high" : "auto",
  });
  // Portrait-only artwork on a wide frame: show it whole over a blurred copy of itself.
  const containOnDesktop = !campaign.desktop;

  return (
    <>
      {containOnDesktop ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          {...m}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 hidden size-full scale-110 object-cover opacity-70 blur-2xl md:block"
        />
      ) : null}
      <picture>
        <source media="(min-width: 768px)" srcSet={d.srcSet} sizes={d.sizes} />
        {}
        <img
          {...m}
          alt={m.alt}
          className={cn("absolute inset-0 size-full object-cover", containOnDesktop && "md:object-contain")}
        />
      </picture>
    </>
  );
}

/** The old homepage hero slider, re-presented as a calm, framed showcase. */
export function Campaigns() {
  const slides = media.campaigns;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + slides.length) % slides.length);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), { threshold: 0.35 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const running = visible && !paused;

  return (
    <section ref={ref} aria-labelledby="campaigns-title" className="relative py-8 md:py-12">
      <div className="container-page">
        <div className="mb-8 flex items-end justify-between gap-6" data-reveal suppressHydrationWarning>
          <div className="flex flex-col gap-3">
            <span className="text-eyebrow text-brand-ink">What&apos;s on</span>
            <h2 id="campaigns-title" className="text-heading">
              Latest from Acestar
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous campaign"
              className="grid size-11 place-items-center rounded-full glass-strong transition-transform hover:-translate-x-0.5"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next campaign"
              className="grid size-11 place-items-center rounded-full glass-strong transition-transform hover:translate-x-0.5"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Campaigns"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          data-reveal
          suppressHydrationWarning
          className="relative overflow-hidden rounded-[1.75rem] p-1.5 glass md:rounded-[2.25rem] md:p-2"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-bg-elevated md:aspect-[1920/996] md:rounded-[1.85rem]">
            {slides.map((slide, i) => {
              const active = i === index;
              const content = <CampaignPicture campaign={slide} eager={i === 0} />;
              return (
                <div
                  key={slide.title}
                  aria-hidden={!active}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${slides.length}: ${slide.title}`}
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform] duration-[1100ms] ease-out-expo",
                    active ? "scale-100 opacity-100" : "pointer-events-none scale-[1.03] opacity-0",
                  )}
                >
                  {slide.href ? (
                    <Link href={slide.href} tabIndex={active ? 0 : -1} className="absolute inset-0">
                      {content}
                      <span className="sr-only">{slide.title}: learn more</span>
                    </Link>
                  ) : (
                    content
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress tabs: the bar's CSS animation drives autoplay (none for reduced motion). */}
        <ol className="mt-5 grid grid-cols-6 gap-2 md:mt-6 md:gap-4" aria-label="Choose campaign">
          {slides.map((slide, i) => {
            const active = i === index;
            return (
              <li key={slide.title}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={active}
                  aria-label={`Show campaign: ${slide.title}`}
                  className="group/tab flex w-full flex-col gap-3 py-2 text-left"
                >
                  <span className="relative h-1 w-full overflow-hidden rounded-full bg-line">
                    <span
                      key={active ? `run-${index}` : "idle"}
                      className={cn(
                        "campaign-bar absolute inset-y-0 left-0 rounded-full bg-brand",
                        active ? "w-full" : "w-0",
                      )}
                      style={
                        active
                          ? {
                              animation: `campaign-progress ${DURATION_MS}ms linear both`,
                              animationPlayState: running ? "running" : "paused",
                            }
                          : undefined
                      }
                      onAnimationEnd={() => go(1)}
                    />
                  </span>
                  <span className="hidden flex-col md:flex">
                    <span
                      className={cn(
                        "text-sm font-semibold transition-colors",
                        active ? "text-fg" : "text-fg-subtle group-hover/tab:text-fg",
                      )}
                    >
                      {slide.title}
                    </span>
                    <span className="text-xs text-fg-subtle">{slide.caption}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <p className="mt-1 text-sm font-semibold md:hidden" aria-live="polite">
          {slides[index].title} <span className="font-normal text-fg-subtle">· {slides[index].caption}</span>
        </p>
      </div>
    </section>
  );
}
