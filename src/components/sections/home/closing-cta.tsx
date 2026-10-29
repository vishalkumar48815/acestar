import { ArrowRight } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/button";
import { closingCta } from "@/content/home";

type Content = { eyebrow: string; title: string; body: string; cta: { label: string; href: string } };

/** Shared closing call-to-action. Defaults to the homepage copy; inner pages pass their own. */
export function ClosingCta({ content = closingCta }: { content?: Content }) {
  return (
    <section aria-labelledby="cta-title" className="pt-4 pb-8 lg:pb-10">
      <div className="container-page">
        <div
          data-reveal
          suppressHydrationWarning
          className="relative isolate overflow-hidden rounded-[1.75rem] border border-white/80 bg-[linear-gradient(110deg,#f3f4fe_0%,#eef1fd_55%,#f1ebfd_100%)] px-7 py-12 sm:px-12 lg:px-14 lg:py-14 dark:border-white/[0.08] dark:bg-[linear-gradient(110deg,#0e1530,#121a3a_55%,#1c1640)]"
        >
          {/* Flowing silk waves (original SVG), drifting slowly */}
          <svg
            aria-hidden="true"
            viewBox="0 0 800 320"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-y-0 right-0 -z-10 h-full w-[85%] [--wave-a1:#dfe7ff] [--wave-a2:#d6e0ff] [--wave-a3:#e3d4ff] [--wave-b2:#efe6ff] [--wave-b:#ffffff] [--wave-line:#ffffff] sm:w-[65%] dark:[--wave-a1:#27306b] dark:[--wave-a2:#2c3a8a] dark:[--wave-a3:#5a3aa8] dark:[--wave-b2:#6b4bc4] dark:[--wave-b:#3b4aa8] dark:[--wave-line:#9fb0ff]"
          >
            <defs>
              <linearGradient id="cta-wave-a" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="var(--wave-a1)" stopOpacity="0" />
                <stop offset="0.45" stopColor="var(--wave-a2)" />
                <stop offset="1" stopColor="var(--wave-a3)" />
              </linearGradient>
              <linearGradient id="cta-wave-b" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="var(--wave-b)" stopOpacity="0" />
                <stop offset="0.6" stopColor="var(--wave-b)" stopOpacity="0.85" />
                <stop offset="1" stopColor="var(--wave-b2)" stopOpacity="0.9" />
              </linearGradient>
              <radialGradient id="cta-glow" cx="1" cy="0.75" r="0.55">
                <stop offset="0" stopColor="#b48cff" stopOpacity="0.55" />
                <stop offset="1" stopColor="#b48cff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="800" height="320" fill="url(#cta-glow)" />
            <g style={{ animation: "cta-wave 14s ease-in-out infinite alternate" }}>
              <path
                d="M0 320 C 210 300, 300 150, 500 165 S 740 90, 820 30 L 820 320 Z"
                fill="url(#cta-wave-a)"
                opacity="0.9"
              />
            </g>
            <g style={{ animation: "cta-wave 18s ease-in-out -6s infinite alternate-reverse" }}>
              <path d="M120 320 C 330 290, 430 215, 610 222 S 770 170, 820 140 L 820 320 Z" fill="url(#cta-wave-b)" />
              <path
                d="M60 318 C 270 292, 380 175, 560 182 S 760 110, 820 70"
                fill="none"
                stroke="var(--wave-line)"
                strokeOpacity="0.9"
                strokeWidth="2"
              />
            </g>
          </svg>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-gradient text-[0.6875rem] font-semibold tracking-[0.34em] uppercase sm:text-xs">
                {content.eyebrow}
              </p>
              <h2
                id="cta-title"
                className="mt-4 font-display text-[clamp(2rem,1.2rem+2.6vw,3.125rem)] leading-[1.05] font-bold tracking-[-0.04em] text-ink"
              >
                {content.title}
              </h2>
              <p className="mt-4 max-w-md text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] leading-relaxed text-fg-muted">
                {content.body}
              </p>
            </div>
            <ButtonLink
              href={content.cta.href}
              variant="gradient"
              className="min-h-14 w-full shrink-0 px-10 text-base sm:w-auto"
            >
              {content.cta.label}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
