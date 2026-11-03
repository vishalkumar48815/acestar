import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { StatStrip } from "@/components/solutions/blocks";
import { PageHero } from "@/components/solutions/page-hero";
import { Section, SectionHead, spotlight, toneCard, toneCycle, toneStyle } from "@/components/solutions/primitives";
import { SubNav } from "@/components/solutions/sub-nav";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { aboutLinks } from "@/content/about";
import { ambition, hero, leadership, mission, pillars, stats, story, training, vision } from "@/content/about/profile";
import { media } from "@/content/media";
import { solutionTree } from "@/content/solutions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Company Profile",
  description:
    "Acestar Sdn. Bhd. is a holistic IT solutions provider since 2008 and Adobe's only Platinum Partner in Malaysia, specialising in creative software, high-performance computers and digital workflow.",
  alternates: { canonical: "/about" },
};

const delay = (i: number) => ({ "--reveal-delay": `${i * 80}ms` }) as React.CSSProperties;

export default function CompanyProfilePage() {
  return (
    <>
      <PageHero hero={hero} />

      <SubNav
        items={[
          { id: "story", label: "Who we are" },
          { id: "vision", label: "Vision & mission" },
          { id: "what-we-do", label: "What we do" },
          { id: "training", label: "Training & community" },
          { id: "leadership", label: "Leadership" },
        ]}
      />

      {/* Who we are */}
      <Section id="story" labelledBy="story-title">
        <StatStrip stats={stats} />
        <div className="mt-14 grid items-center gap-10 lg:mt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <SectionHead eyebrow="Who we are" title={story.title} id="story-title" />
            <div className="mt-6 flex flex-col gap-4 text-[1.0625rem] leading-relaxed text-pretty text-fg-muted">
              {story.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} data-reveal suppressHydrationWarning>
                  {p}
                </p>
              ))}
            </div>
          </div>
          {story.image ? (
            <div data-reveal suppressHydrationWarning className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_70%_30%,color-mix(in_oklab,var(--accent-to)_22%,transparent),transparent_70%)] blur-xl"
              />
              <Image
                src={story.image.src}
                width={story.image.width}
                height={story.image.height}
                alt={story.image.alt}
                sizes="(min-width: 1024px) 540px, 92vw"
                className="aspect-[4/3] w-full rounded-[1.75rem] object-cover shadow-[0_40px_80px_-40px_rgb(40_40_120/0.45)] ring-1 ring-white/70 dark:ring-white/10"
              />
            </div>
          ) : null}
        </div>
      </Section>

      {/* Vision & mission */}
      <Section id="vision" labelledBy="vision-title" className="pt-0 lg:pt-0">
        <div
          data-reveal
          suppressHydrationWarning
          className="relative isolate overflow-hidden rounded-[1.75rem] bg-[linear-gradient(120deg,#1b1f4a,#2b2a7a_55%,#5b3cc4)] p-7 text-white sm:p-10 lg:p-14"
        >
          <span
            aria-hidden="true"
            className="absolute -top-28 -right-24 -z-10 size-80 rounded-full bg-[radial-gradient(circle,rgb(180_140_255/0.5),transparent_70%)]"
          />
          <h2 id="vision-title" className="sr-only">
            Vision and mission
          </h2>
          <blockquote className="max-w-3xl font-display text-[clamp(1.375rem,1rem+1.4vw,2.125rem)] leading-[1.2] font-bold tracking-[-0.03em] text-balance">
            {ambition.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </blockquote>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[vision, mission].map((v) => (
              <div
                key={v.title}
                className="rounded-[1.25rem] border border-white/15 bg-white/[0.07] p-6 backdrop-blur lg:p-8"
              >
                <p className="text-[0.6875rem] font-semibold tracking-[0.34em] text-white/70 uppercase sm:text-xs">
                  {v.title}
                </p>
                <p className="mt-3 text-[1.125rem] leading-relaxed text-white/90 lg:text-[1.25rem]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* What we do */}
      <Section id="what-we-do" labelledBy="what-title" className="pt-0 lg:pt-0">
        <SectionHead
          eyebrow="What we do"
          title="Three specialisations, one partner."
          body="Creative Software, High Performance Computers and Digital Workflow Management, plus IT as a Service with TechCare."
          id="what-title"
        />
        <CardSpotlight className="mt-8">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solutionTree.map((n, i) => (
              <li key={n.key} data-reveal suppressHydrationWarning style={delay(i)}>
                <div
                  data-spotlight
                  className={cn(toneCard, "group/card flex h-full flex-col p-6")}
                  style={toneStyle(toneCycle[i % toneCycle.length])}
                >
                  <span aria-hidden="true" className={spotlight} />
                  <span className="font-mono text-xs font-medium tracking-widest text-brand-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Link href={n.href} className="mt-4 after:absolute after:inset-0 after:content-['']">
                    <h3 className="text-[1.125rem] leading-snug font-semibold tracking-[-0.015em] text-ink">
                      {n.label}
                    </h3>
                  </Link>
                  <p className="mt-2 text-[0.9375rem] text-fg-muted">{n.description}</p>
                  <span className="mt-auto grid size-10 place-items-center self-start rounded-full bg-white text-ink shadow-[0_4px_12px_-4px_rgb(30_40_90/0.18)] transition-all duration-300 group-hover/card:bg-[image:var(--btn-gradient)] group-hover/card:text-white dark:bg-white/[0.08] dark:text-fg">
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </CardSpotlight>
      </Section>

      {/* Training & community */}
      <Section id="training" labelledBy="training-title" className="pt-0 lg:pt-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <div>
            <SectionHead eyebrow={training.eyebrow} title={training.title} body={training.body} id="training-title" />
            <ul className="mt-8 flex flex-col gap-3">
              {training.highlights.map((h, i) => (
                <li
                  key={h.title}
                  data-reveal
                  suppressHydrationWarning
                  style={delay(i)}
                  className="flex gap-4 rounded-2xl border border-line bg-white/50 p-4 dark:bg-white/[0.03]"
                >
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-[image:var(--btn-gradient)] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">{h.title}</span>
                    <span className="block text-[0.9375rem] text-fg-muted">{h.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* Event photo mosaic */}
          <ul className="grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:gap-4">
            {training.photos.map((photo, i) => (
              <li
                key={photo.src}
                data-reveal
                suppressHydrationWarning
                style={delay(i)}
                className={cn(
                  "group/photo overflow-hidden rounded-[1.25rem] ring-1 ring-white/70 dark:ring-white/10",
                  i === 0 && "col-span-2 row-span-2",
                )}
              >
                <Image
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt={photo.alt}
                  sizes={i === 0 ? "(min-width: 1024px) 600px, 92vw" : "(min-width: 1024px) 300px, 46vw"}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover/photo:scale-[1.05]"
                />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Leadership */}
      <Section id="leadership" labelledBy="leadership-title" className="pt-0 lg:pt-0">
        <div
          data-reveal
          suppressHydrationWarning
          className={cn(toneCard, "grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-14 lg:p-14")}
          style={toneStyle("violet")}
        >
          <div>
            <p className="text-gradient text-[0.6875rem] font-semibold tracking-[0.34em] uppercase sm:text-xs">
              {leadership.eyebrow}
            </p>
            <h2
              id="leadership-title"
              className="mt-4 font-display text-[clamp(1.75rem,1.15rem+2vw,2.625rem)] leading-[1.1] font-bold tracking-[-0.035em] text-ink"
            >
              {leadership.name}
              <span className="ml-3 align-middle text-base font-medium tracking-normal text-fg-muted">
                {leadership.role}
              </span>
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-pretty text-fg-muted">{leadership.body}</p>
            {media.ceoSignature ? (
              <Image
                src={media.ceoSignature.src}
                width={media.ceoSignature.width}
                height={media.ceoSignature.height}
                alt={media.ceoSignature.alt}
                className="mt-6 h-14 w-auto dark:invert"
              />
            ) : null}
          </div>
          <ul className="flex flex-col gap-3">
            {leadership.ventures.map((v) => (
              <li key={v.label}>
                <Link
                  href={v.href}
                  {...(v.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group/v flex items-center justify-between gap-4 rounded-2xl border border-white/90 bg-white/70 p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-22px_rgb(70_70_180/0.4)] dark:border-white/[0.08] dark:bg-white/[0.04]"
                >
                  <span>
                    <span className="block text-[0.75rem] font-semibold tracking-wide text-brand-ink uppercase">
                      New venture
                    </span>
                    <span className="mt-1 block text-lg font-semibold text-ink">{v.label}</span>
                    <span className="block text-[0.9375rem] text-fg-muted">{v.body}</span>
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-ink shadow-[0_4px_12px_-4px_rgb(30_40_90/0.18)] transition-all group-hover/v:bg-[image:var(--btn-gradient)] group-hover/v:text-white dark:bg-white/[0.08] dark:text-fg">
                    {v.external ? (
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    ) : (
                      <ArrowRight aria-hidden="true" className="size-4" />
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* The next chapter */}
        <div className="mt-14 text-center lg:mt-16">
          <p className="text-gradient text-[0.6875rem] font-semibold tracking-[0.34em] uppercase sm:text-xs">
            The next chapter of Acestar
          </p>
          <p className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1 font-display text-[clamp(1.75rem,1rem+3vw,3.5rem)] leading-[1.1] font-extrabold tracking-[-0.04em]">
            {pillars.map((word, i) => (
              <span
                key={word}
                data-reveal
                suppressHydrationWarning
                style={delay(i)}
                className={i % 2 ? "text-gradient-live" : "text-ink"}
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </Section>

      {/* More about Acestar */}
      <Section labelledBy="more-title" className="pt-0 lg:pt-0">
        <h2 id="more-title" className="sr-only">
          More about Acestar
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {aboutLinks
            .filter((l) => l.key !== "profile")
            .map((l, i) => (
              <li key={l.href} data-reveal suppressHydrationWarning style={delay(i)}>
                <Link
                  href={l.href}
                  className="group/m flex items-center justify-between gap-6 rounded-[1.5rem] border border-line bg-white/60 p-7 transition-all hover:-translate-y-1 hover:shadow-[0_24px_44px_-24px_rgb(70_70_180/0.35)] dark:bg-white/[0.03]"
                >
                  <span>
                    <span className="block font-display text-2xl font-bold tracking-[-0.03em] text-ink">{l.label}</span>
                    <span className="mt-1 block text-fg-muted">{l.description}</span>
                  </span>
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[image:var(--btn-gradient)] text-white shadow-[var(--btn-gradient-shadow)] transition-transform group-hover/m:translate-x-1">
                    <ArrowRight aria-hidden="true" className="size-5" />
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </Section>

      <ClosingCta />
    </>
  );
}
