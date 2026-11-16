import type { Metadata } from "next";
import Image from "next/image";
import { JobBoard } from "@/components/careers/job-board";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import { spotlight, toneCard, toneCycle, toneStyle } from "@/components/solutions/primitives";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import {
  ArrowRight,
  Award,
  Briefcase,
  Calculator,
  Clock,
  GraduationCap,
  MapPin,
  Megaphone,
  Phone,
  Scale,
  TrendingUp,
  Users,
} from "@/components/ui/icons";
import { apply, careersHero, internship, jobs, nextChapter, roleSummaries, whyJoin } from "@/content/pages/careers";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Career - Acestar", path: "/career/" });

const teamIcon: Record<string, typeof Briefcase> = {
  "Sales & Product": Briefcase,
  Marketing: Megaphone,
  Legal: Scale,
  Finance: Calculator,
  Sales: Phone,
};
const perkIcon = { learning: GraduationCap, team: Users, growth: TrendingUp, rewards: Award } as const;
const eyebrow =
  "flex items-center gap-3 text-[0.6875rem] font-bold tracking-[0.3em] text-eyebrow-ink uppercase sm:text-xs";
const h2 =
  "font-display text-[clamp(1.875rem,1.2rem+2.2vw,2.875rem)] leading-[1.08] font-bold tracking-[-0.035em] text-ink";
const delay = (i: number) => ({ "--reveal-delay": `${i * 70}ms` }) as React.CSSProperties;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className={eyebrow}>
      <span aria-hidden="true" className="h-px w-8 bg-[var(--accent-from)]" />
      {children}
    </p>
  );
}

export default function CareersPage() {
  const roles = jobs.slice(0, 5);
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="careers-title" className="relative isolate overflow-hidden">
        {/* Hero artwork as the background of the right side, fading into the page under the copy */}
        <div
          aria-hidden="true"
          className="absolute top-[7%] right-0 bottom-0 -z-10 hidden w-[58%] lg:block dark:top-20"
          style={{ animation: "hero-art-in 1.2s var(--ease-out) both" }}
        >
          <Image
            src={careersHero.image.src}
            alt=""
            fill
            priority
            sizes="58vw"
            className="[mask-image:linear-gradient(90deg,transparent_0%,black_30%),linear-gradient(180deg,transparent,black_10%,black_82%,transparent)] [mask-composite:intersect] object-cover object-right xl:object-[70%_30%] dark:opacity-85"
          />
        </div>

        <div className="container-page pt-32 pb-10 lg:flex lg:min-h-[44rem] lg:items-center lg:pt-28 lg:pb-16">
          <div className="max-w-[40rem] lg:max-w-[46%]" style={{ animation: "fade-up 0.9s var(--ease-out) both" }}>
            <Eyebrow>{careersHero.eyebrow}</Eyebrow>
            <h1 id="careers-title" className="mt-5 text-ink">
              <span className="block font-display text-[clamp(2.5rem,1.6rem+2.6vw,4rem)] leading-[1.02] font-medium tracking-[-0.035em] lg:whitespace-nowrap">
                {careersHero.title}
              </span>
              <span className="relative mt-1 inline-block pb-4">
                <span className="block bg-[linear-gradient(95deg,#3aa0f5_0%,#3b5bf0_38%,#7b3df0_68%,#c13ff2_100%)] bg-clip-text pr-2 font-marker text-[clamp(2.75rem,1.6rem+3.6vw,5.25rem)] leading-[1.05] font-bold whitespace-nowrap text-transparent">
                  {careersHero.script}
                </span>
                {/* Brush underline */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 400 24"
                  preserveAspectRatio="none"
                  className="absolute bottom-0 left-[22%] h-4 w-[78%]"
                >
                  <defs>
                    <linearGradient id="impact-line" x1="0" x2="1">
                      <stop offset="0" stopColor="#3b5bf0" />
                      <stop offset="0.7" stopColor="#8b3df0" />
                      <stop offset="1" stopColor="#c13ff2" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M4 18 C 120 6, 260 4, 396 8"
                    fill="none"
                    stroke="url(#impact-line)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-fg">{careersHero.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#open-roles" variant="gradient" className="min-h-14 px-8 text-[0.9375rem]">
                Explore Open Roles
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-1" />
              </ButtonLink>
              <ButtonLink href="#why" variant="glass" className="min-h-14 rounded-full px-8 text-[0.9375rem]">
                Why Join Us
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Below lg: the artwork sits under the copy, full width */}
        <div className="relative -mt-2 aspect-[1549/1015] w-full lg:hidden">
          <Image
            src={careersHero.image.src}
            alt={careersHero.image.alt}
            fill
            sizes="100vw"
            className="[mask-image:linear-gradient(180deg,transparent,black_14%,black_86%,transparent)] object-cover"
          />
        </div>
      </section>

      {/* Featured roles */}
      <section id="open-roles" aria-labelledby="featured-title" className="scroll-mt-24 py-14 lg:py-20">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Featured roles</Eyebrow>
              <h2 id="featured-title" className={`mt-4 ${h2}`}>
                Be Part of Something Bigger
              </h2>
            </div>
          </div>

          <CardSpotlight className="mt-10">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map((job, i) => {
                const Icon = teamIcon[job.team] ?? Briefcase;
                return (
                  <li key={job.slug} data-reveal suppressHydrationWarning style={delay(i)}>
                    <a
                      href={`#role-${job.slug}`}
                      data-spotlight
                      className={cn(toneCard, "group/card flex h-full gap-4 p-6")}
                      style={toneStyle(toneCycle[i % toneCycle.length])}
                    >
                      <span aria-hidden="true" className={spotlight} />
                      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-brand-ink shadow-[0_8px_20px_-12px_rgb(40_40_120/0.45)] dark:bg-white/[0.08]">
                        <Icon className="size-5" />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="text-[1.0625rem] leading-snug font-semibold text-ink">{job.title}</span>
                        <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-fg-subtle">
                          <span className="inline-flex items-center gap-1">
                            <MapPin aria-hidden="true" className="size-3.5" /> Kuala Lumpur
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock aria-hidden="true" className="size-3.5" /> Full-time
                          </span>
                        </span>
                        <span className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">
                          {roleSummaries[job.slug] ?? job.experience}
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          className="mt-auto size-5 self-end pt-1 text-brand-ink transition-transform group-hover/card:translate-x-1"
                        />
                      </span>
                    </a>
                  </li>
                );
              })}
              <li data-reveal suppressHydrationWarning style={delay(roles.length)}>
                <a
                  href="#apply-internship"
                  data-spotlight
                  className={cn(toneCard, "group/card flex h-full gap-4 p-6")}
                  style={toneStyle("sky")}
                >
                  <span aria-hidden="true" className={spotlight} />
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-brand-ink shadow-[0_8px_20px_-12px_rgb(40_40_120/0.45)] dark:bg-white/[0.08]">
                    <GraduationCap className="size-5" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-[1.0625rem] leading-snug font-semibold text-ink">Internship Program</span>
                    <span className="mt-2 flex flex-wrap items-center gap-x-3 text-[0.8125rem] text-fg-subtle">
                      <span className="inline-flex items-center gap-1">
                        <MapPin aria-hidden="true" className="size-3.5" /> Kuala Lumpur
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock aria-hidden="true" className="size-3.5" /> Internship
                      </span>
                    </span>
                    <span className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">
                      Gain hands-on experience and kickstart your career with us.
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-auto size-5 self-end pt-1 text-brand-ink transition-transform group-hover/card:translate-x-1"
                    />
                  </span>
                </a>
              </li>
            </ul>
          </CardSpotlight>

          {/* Internship banner */}
          <div
            data-reveal
            suppressHydrationWarning
            className="relative isolate mt-10 flex flex-col gap-6 overflow-hidden rounded-[1.75rem] border border-white/90 bg-[linear-gradient(110deg,#eef3ff,#f6eeff)] p-6 sm:flex-row sm:items-center sm:p-8 lg:mt-12 lg:p-10 dark:border-white/[0.08] dark:bg-[linear-gradient(110deg,rgb(124_155_255/0.1),rgb(200_141_255/0.08))]"
          >
            <span className="grid size-16 shrink-0 place-items-center rounded-2xl text-brand-ink sm:[border-radius:0] sm:border-r sm:border-line sm:pr-6">
              <GraduationCap className="size-12" strokeWidth={1.4} />
            </span>
            <div className="flex-1">
              <p className="text-[0.6875rem] font-bold tracking-[0.3em] text-eyebrow-ink uppercase sm:text-xs">
                {internship.eyebrow}
              </p>
              <p className="mt-2 font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] leading-tight font-semibold tracking-[-0.03em] text-ink">
                {internship.title}
              </p>
            </div>
            <a
              href="#apply-internship"
              className={buttonClasses("gradient", "lg", "min-h-14 shrink-0 px-8 text-[0.9375rem]")}
            >
              {internship.cta}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* All roles + application form */}
      <section id="roles" aria-labelledby="roles-title" className="scroll-mt-24 pb-16 lg:pb-24">
        <div className="container-page">
          <JobBoard jobs={jobs} to={apply.to} />
        </div>
      </section>

      {/* Why work with us */}
      <section id="why" aria-labelledby="why-title" className="scroll-mt-24 pb-16 lg:pb-24">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <Eyebrow>{whyJoin.eyebrow}</Eyebrow>
            <h2 id="why-title" className={`mt-4 ${h2}`}>
              {whyJoin.title}
            </h2>
            <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-fg-muted">{whyJoin.body}</p>
            <ul className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-4">
              {whyJoin.perks.map((p, i) => {
                const Icon = perkIcon[p.key as keyof typeof perkIcon];
                return (
                  <li
                    key={p.key}
                    data-reveal
                    suppressHydrationWarning
                    style={delay(i)}
                    className={cn("flex flex-col items-center px-3 text-center", i > 0 && "sm:border-l sm:border-line")}
                  >
                    <Icon aria-hidden="true" className="size-9 text-brand-ink" strokeWidth={1.5} />
                    <span className="mt-3 text-[0.875rem] leading-snug font-medium text-ink">{p.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <figure data-reveal suppressHydrationWarning className="relative">
            <Image
              src={whyJoin.image.src}
              width={whyJoin.image.width}
              height={whyJoin.image.height}
              alt={whyJoin.image.alt}
              sizes="(min-width: 1024px) 520px, 92vw"
              className="w-full rounded-[1.75rem] object-cover shadow-[0_40px_80px_-40px_rgb(40_40_120/0.5)] ring-1 ring-white/70 dark:ring-white/10"
            />
          </figure>
        </div>
      </section>

      {/* Closing: "Your Next Chapter Starts Here." on soft waves */}
      <section
        aria-label="Your next chapter"
        className="relative isolate overflow-hidden pt-16 pb-20 lg:pt-20 lg:pb-28"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 420"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full dark:opacity-30"
        >
          <defs>
            <linearGradient id="chapter-a" x1="0" x2="1">
              <stop offset="0" stopColor="#dbe6ff" />
              <stop offset="1" stopColor="#efe4ff" />
            </linearGradient>
            <linearGradient id="chapter-b" x1="0" x2="1">
              <stop offset="0" stopColor="#cfe0ff" stopOpacity="0.9" />
              <stop offset="1" stopColor="#e6d2ff" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path
            d="M0 40 C 360 0, 720 90, 1080 60 S 1380 30, 1440 50 L 1440 420 L 0 420 Z"
            fill="url(#chapter-a)"
            opacity="0.55"
          />
          <path
            d="M0 360 C 300 320, 520 400, 860 380 S 1300 320, 1440 340 L 1440 420 L 0 420 Z"
            fill="url(#chapter-b)"
            opacity="0.8"
          />
        </svg>
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.15fr_auto_1fr_auto] lg:gap-12">
          <h2 className="relative -rotate-[6deg] pb-6 font-marker text-[clamp(2.75rem,1.8rem+3.4vw,4.75rem)] leading-[1] font-bold">
            <span className="block bg-[linear-gradient(95deg,#3aa0f5_0%,#3b5bf0_45%,#3b5bf0_60%)] bg-clip-text pr-2 text-transparent">
              {nextChapter.line1}
            </span>
            <span className="block pl-[8%] whitespace-nowrap">
              <span className="bg-[linear-gradient(95deg,#3a8ff5,#3b5bf0)] bg-clip-text text-transparent">
                {nextChapter.line2a}
              </span>{" "}
              <span className="bg-[linear-gradient(95deg,#5b45f0_0%,#8b3df0_55%,#c13ff2_100%)] bg-clip-text pr-2 text-transparent">
                {nextChapter.line2b}
              </span>
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 400 30"
              preserveAspectRatio="none"
              className="absolute bottom-0 left-[28%] h-5 w-[64%]"
            >
              <defs>
                <linearGradient id="chapter-line" x1="0" x2="1">
                  <stop offset="0" stopColor="#3b5bf0" />
                  <stop offset="0.75" stopColor="#8b3df0" />
                  <stop offset="1" stopColor="#c13ff2" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M4 26 C 130 12, 270 6, 396 4"
                fill="none"
                stroke="url(#chapter-line)"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </h2>
          <span
            aria-hidden="true"
            className="hidden h-28 w-px bg-[linear-gradient(180deg,transparent,#8b5cf6,transparent)] lg:block"
          />
          <div>
            <p className="max-w-sm text-[1.0625rem] leading-relaxed text-fg">{nextChapter.body}</p>
            <ButtonLink href="#open-roles" variant="gradient" className="mt-6 min-h-13 px-7 text-[0.9375rem]">
              {nextChapter.cta}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </ButtonLink>
          </div>
          {/* Mountain with a flag (line art) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 240 150"
            className="hidden h-36 w-auto lg:block"
            fill="none"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <defs>
              <linearGradient id="peak" x1="0" x2="1" y1="1" y2="0">
                <stop offset="0" stopColor="#3b5bf0" />
                <stop offset="1" stopColor="#c13ff2" />
              </linearGradient>
            </defs>
            <g stroke="url(#peak)">
              <path d="M40 146 L120 46 L200 144" />
              <path d="M96 76 L108 84 L120 72 L134 86 L148 78" />
              <path d="M70 110 L82 104 L92 112" />
              <path d="M120 46 V8 L144 14 L134 22 L144 30 L120 30" />
              <path d="M8 96 C 10 84, 30 84, 34 94 C 38 90, 46 92, 48 98" />
              <path d="M182 60 C 186 50, 202 50, 206 58 C 212 56, 220 60, 222 66" />
            </g>
          </svg>
        </div>
      </section>
    </>
  );
}
