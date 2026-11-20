import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BeliefsGrid } from "@/components/about/beliefs-grid";
import { StoryMore } from "@/components/about/story-more";
import { beliefs, hero, mission, principles, promise, story, vision } from "@/content/about/profile";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Company Profile - Acestar", path: "/company-profile/" });

const delay = (i: number) => ({ "--reveal-delay": `${i * 80}ms` }) as React.CSSProperties;

/** Small caps label with a line either side, as in the design. */
function Lined({ children, as: Tag = "p", id }: { children: ReactNode; as?: "p" | "h2"; id?: string }) {
  return (
    <Tag
      id={id}
      className="flex items-center justify-center gap-4 text-[0.8125rem] font-bold tracking-[0.22em] text-ink uppercase sm:gap-6 sm:text-[0.9375rem]"
    >
      <span
        aria-hidden="true"
        className="h-px w-10 bg-[linear-gradient(90deg,transparent,var(--accent-from))] sm:w-28"
      />
      {children}
      <span
        aria-hidden="true"
        className="h-px w-10 bg-[linear-gradient(90deg,var(--accent-from),transparent)] sm:w-28"
      />
    </Tag>
  );
}

/** Soft blue/violet ribbons, as in the design (decorative). */
function Ribbons({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 400"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute", flip && "-scale-x-100", className)}
    >
      <defs>
        <linearGradient id="rb-a" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#5ab8ff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#5ab8ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#3b63f3" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="rb-b" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#a24df0" stopOpacity="0" />
          <stop offset="0.6" stopColor="#a24df0" stopOpacity="0.45" />
          <stop offset="1" stopColor="#7b8cff" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path d="M0 330 C 180 300, 300 120, 600 40 L 600 120 C 380 170, 260 320, 0 360 Z" fill="url(#rb-a)" />
      <path d="M60 380 C 230 330, 360 210, 600 170 L 600 230 C 400 250, 280 350, 60 400 Z" fill="url(#rb-b)" />
    </svg>
  );
}

export default function CompanyProfilePage() {
  return (
    // Keeps the original slate headline colour (see .ink-original)
    <div className="ink-original contents">
      {/* Hero */}
      <section
        aria-labelledby="profile-title"
        className="relative isolate overflow-hidden pt-36 pb-8 lg:pt-44 lg:pb-10"
      >
        <div aria-hidden="true" className="art-frame -z-10">
          <Ribbons className="top-10 -right-10 h-[22rem] w-[36rem] opacity-80 max-sm:w-[22rem]" />
        </div>
        <div className="container-page text-center">
          <h1
            id="profile-title"
            className="mx-auto max-w-[70rem] font-display text-[clamp(1.3rem,1.1rem+2.1vw,2.6rem)] leading-[1.08] font-extrabold tracking-[-0.04em] text-balance text-ink"
            style={{ animation: "fade-up 0.9s var(--ease-out) both" }}
          >
            {hero.title} <span className="text-gradient">{hero.accent}</span>
          </h1>
          <p
            className="mx-auto mt-2 max-w-[45rem] text-[clamp(1.0rem,0.95rem+0.3vw,1.1rem)] leading-relaxed text-fg-muted"
            style={{ animation: "fade-up 0.9s var(--ease-out) 120ms both" }}
          >
            {hero.lead}
          </p>
        </div>
      </section>

      {/* Vision & mission */}
      <section aria-labelledby="vision-title" className="pb-14 lg:pb-20">
        <div className="container-page text-center">
          <p
            data-reveal
            suppressHydrationWarning
            className="mx-auto inline-flex rounded-full bg-brand-soft px-6 py-2 text-[0.8125rem] font-bold tracking-[0.22em] text-ink uppercase sm:text-[0.9375rem]"
          >
            {vision.title}
          </p>
          <h2
            id="vision-title"
            data-reveal
            suppressHydrationWarning
            className="mx-auto mt-6 max-w-[64rem] font-display text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-[1.18] font-bold tracking-[-0.03em] text-balance text-ink"
          >
            {/* Two lines on larger screens: break after "business growth and" (as in the mock) */}
            {vision.body.split(/(?<= and) /).map((line, i) => (
              <span key={line} className={i ? "sm:block" : undefined}>
                {i ? " " : null}
                {line}
              </span>
            ))}
          </h2>

          <div data-reveal suppressHydrationWarning className="mt-12 lg:mt-14">
            <Lined>{mission.title}</Lined>
            <p className="mx-auto mt-2 max-w-[38rem] text-[clamp(1.0625rem,0.98rem+0.35vw,1.25rem)] leading-relaxed text-fg-muted">
              {mission.body}
            </p>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section aria-labelledby="story-title" className="pb-16 lg:pb-24">
        <div className="container-page">
          <div className="mx-auto flex max-w-[44rem] flex-col text-center">
            <h2
              id="story-title"
              data-reveal
              suppressHydrationWarning
              className="mx-auto inline-block bg-[linear-gradient(95deg,#2f7cf6_0%,#3b5bf0_35%,#7b3df0_68%,#d43ff0_100%)] bg-clip-text px-5 pb-3 font-brush text-[clamp(3.5rem,2.4rem+4.4vw,5.75rem)] leading-[1.2] tracking-[-0.01em] text-transparent [word-spacing:-0.06em]"
            >
              {story.title}
            </h2>
            <p data-reveal suppressHydrationWarning className="mt-4 font-semibold text-ink">
              {story.subtitle}
            </p>
            <div className="mt-6 flex flex-col gap-4 text-[1.0625rem] leading-relaxed text-pretty text-fg-muted">
              {story.intro.map((p) => (
                <p key={p.slice(0, 32)} data-reveal suppressHydrationWarning>
                  {p}
                </p>
              ))}
              <StoryMore paragraphs={story.more} />
            </div>
          </div>
        </div>
      </section>

      {/* 4S core values */}
      <section aria-labelledby="beliefs-title" className="pb-16 lg:pb-24">
        <div className="container-page">
          <div data-reveal suppressHydrationWarning className="text-center">
            <Lined as="h2" id="beliefs-title">
              {beliefs.eyebrow}
            </Lined>
            <p className="mx-auto mt-4 max-w-[45rem] text-fg-muted">{beliefs.body}</p>
          </div>
          <BeliefsGrid items={beliefs.items} />
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-title" className="pb-16 lg:pb-24">
        <div className="container-page">
          <div data-reveal suppressHydrationWarning className="text-center">
            <Lined>{principles.eyebrow}</Lined>
            <h2
              id="principles-title"
              className="mt-4 text-gradient font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] font-bold tracking-[-0.03em] italic"
            >
              {principles.title}
            </h2>
          </div>
          <ol className="mt-10 grid border-line sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {principles.items.map((p, i) => (
              <li
                key={p.title}
                data-reveal
                suppressHydrationWarning
                style={delay(i)}
                className={cn(
                  "flex gap-5 border-[#d7deee] p-6 lg:p-7 dark:border-white/15",
                  "max-sm:border-b lg:[&:nth-child(-n+3)]:border-b sm:max-lg:[&:nth-child(-n+4)]:border-b",
                  "lg:[&:not(:nth-child(3n+1))]:border-l sm:max-lg:[&:nth-child(even)]:border-l",
                )}
              >
                <span
                  className={cn(
                    "grid h-10 min-w-12 shrink-0 place-items-center rounded-full font-display text-lg font-bold",
                    i % 2 ? "bg-[#f3e8ff] text-[#8b3fe0] dark:bg-[#a24df0]/15" : "bg-brand-soft text-brand-ink",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[1.1875rem] font-semibold tracking-[-0.015em] text-ink">{p.title}</span>
                  <span className="mt-2 block text-[0.9375rem] leading-relaxed text-fg-muted">{p.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Promise, on a soft wave */}
      <section aria-labelledby="promise-title" className="relative isolate overflow-hidden pt-4 pb-40 lg:pb-52">
        <div className="container-page text-center">
          <div data-reveal suppressHydrationWarning>
            <Lined>{promise.eyebrow}</Lined>
            <h2
              id="promise-title"
              className="mt-3 text-gradient-live font-display text-[clamp(2.5rem,1.6rem+3.6vw,4.5rem)] leading-[1.05] font-extrabold tracking-[-0.045em]"
            >
              {promise.title}
            </h2>
            <div className="mx-auto mt-5 flex max-w-[50rem] flex-col gap-3 text-[1.0625rem] leading-relaxed text-balance text-fg-muted">
              {promise.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className="mt-6 font-semibold text-ink">{promise.closing}</p>
          </div>
        </div>
        <div aria-hidden="true" className="art-frame -z-10">
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 220"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full lg:h-52"
          >
            <defs>
              <linearGradient id="wave-a" x1="0" x2="1">
                <stop offset="0" stopColor="#5ab8ff" stopOpacity="0.55" />
                <stop offset="0.5" stopColor="#8fa8ff" stopOpacity="0.25" />
                <stop offset="1" stopColor="#a24df0" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="wave-b" x1="0" x2="1">
                <stop offset="0" stopColor="#3b63f3" stopOpacity="0.35" />
                <stop offset="1" stopColor="#c48bff" stopOpacity="0.45" />
              </linearGradient>
            </defs>
            <path d="M0 120 C 320 40, 620 200, 960 120 S 1300 60, 1440 90 L 1440 220 L 0 220 Z" fill="url(#wave-a)" />
            <path
              d="M0 170 C 380 110, 700 230, 1060 160 S 1360 130, 1440 150 L 1440 220 L 0 220 Z"
              fill="url(#wave-b)"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}
