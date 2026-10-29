import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "@/components/ui/icons";
import type { PageHero as Hero } from "@/content/solutions/types";
import { cn } from "@/lib/utils";

/** CSS-only staggered entrance, so the hero paints before JavaScript loads. */
const enter = (delay: number) => ({ animation: `fade-up 0.9s var(--ease-out) ${delay}ms both` });

function Title({ title, accent }: { title: string; accent?: string }) {
  if (!accent || !title.includes(accent)) return <>{title}</>;
  const [before, after] = title.split(accent);
  return (
    <>
      {before}
      <span className="text-gradient-live">{accent}</span>
      {after}
    </>
  );
}

/** Inner-page hero: breadcrumbs, headline, lead, two actions and the page artwork. */
export function PageHero({ hero }: { hero: Hero }) {
  const fit = hero.imageFit ?? "cover";
  const side = hero.image && (fit === "cover" || fit === "contain");
  const cover = fit === "cover";
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden">
      {/* Soft brand glow behind the hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_85%_10%,color-mix(in_oklab,var(--accent-to)_16%,transparent),transparent_70%),radial-gradient(50%_60%_at_5%_0%,color-mix(in_oklab,var(--accent-from)_12%,transparent),transparent_70%)]"
      />
      {hero.image && fit === "backdrop" ? (
        /*
         * Full-bleed hero artwork from the old site (subject on the right, open space on the left).
         * Phones: shown as a band at the top with the text below it. Desktop: behind the text.
         */
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[min(80vw,26rem)] [mask-image:linear-gradient(180deg,#000_62%,transparent)] lg:inset-y-0 lg:h-auto lg:[mask-image:linear-gradient(180deg,#000_82%,transparent)] dark:opacity-45"
        >
          <Image
            src={hero.image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
            style={{ animation: "hero-art-in 1.4s var(--ease-out) both" }}
          />
          {/* Keeps the headline side crisp on desktop */}
          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,color-mix(in_srgb,var(--bg)_55%,transparent)_0%,color-mix(in_srgb,var(--bg)_20%,transparent)_40%,transparent_60%)] lg:block dark:bg-[linear-gradient(90deg,var(--bg)_5%,color-mix(in_srgb,var(--bg)_50%,transparent)_50%,transparent_75%)]" />
        </div>
      ) : null}
      <div
        className={cn(
          "container-page grid items-center gap-10 lg:pt-36",
          fit === "backdrop" && hero.image ? "pt-[min(68vw,22rem)]" : "pt-28",
          side ? "pb-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-16" : "pb-10 lg:pb-12",
          fit === "backdrop" && "lg:min-h-[38rem] lg:pb-20",
        )}
      >
        <div className={cn("flex min-w-0 flex-col items-start", !side && "max-w-[46rem]")}>
          <nav aria-label="Breadcrumb" style={enter(0)}>
            <ol className="flex flex-wrap items-center gap-1 text-[0.8125rem] text-fg-subtle">
              {hero.crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight aria-hidden="true" className="size-3.5 opacity-60" />}
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-fg">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current={i === hero.crumbs.length - 1 ? "page" : undefined}>{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <p
            className="mt-6 text-gradient text-[0.6875rem] font-semibold tracking-[0.34em] uppercase sm:text-xs"
            style={enter(60)}
          >
            {hero.eyebrow}
          </p>
          <h1
            id="page-title"
            className="mt-4 font-display text-[clamp(2.25rem,1.2rem+3.2vw,4rem)] leading-[1.04] font-extrabold tracking-[-0.04em] text-balance text-ink"
            style={enter(140)}
          >
            <Title title={hero.title} accent={hero.accent} />
          </h1>
          <p
            className="mt-5 max-w-[36rem] text-[clamp(1.0625rem,0.97rem+0.35vw,1.25rem)] leading-[1.6] text-pretty text-fg-muted"
            style={enter(260)}
          >
            {hero.lead}
          </p>

          {(hero.primary || hero.secondary) && (
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row" style={enter(360)}>
              {hero.primary && (
                <ButtonLink
                  href={hero.primary.href}
                  external={hero.primary.external}
                  variant="gradient"
                  className="min-h-13 px-8"
                >
                  {hero.primary.label}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </ButtonLink>
              )}
              {hero.secondary && (
                <ButtonLink
                  href={hero.secondary.href}
                  external={hero.secondary.external}
                  variant="glass"
                  className="min-h-13 rounded-full px-7"
                >
                  {hero.secondary.label}
                </ButtonLink>
              )}
            </div>
          )}

          {hero.chips?.length ? (
            <ul className="mt-8 flex flex-wrap gap-2" style={enter(460)} aria-label="Highlights">
              {hero.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-line bg-white/50 px-3.5 py-1.5 text-[0.8125rem] font-medium text-fg-muted dark:bg-white/[0.03]"
                >
                  {chip}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {side && hero.image && (
          <div style={{ animation: "hero-art-in 1.1s var(--ease-out) 200ms both" }} className="min-w-0">
            <div
              style={
                {
                  "--cover-ratio": Math.min(Math.max(hero.image.width / hero.image.height, 1), 4 / 3),
                } as CSSProperties
              }
              className={cn(
                "relative overflow-hidden rounded-[1.75rem]",
                cover
                  ? "aspect-[var(--cover-ratio)] shadow-[0_40px_80px_-40px_rgb(40_40_120/0.45)] ring-1 ring-white/70 dark:ring-white/10"
                  : "aspect-[5/4] p-4 sm:p-8",
              )}
            >
              <Image
                src={hero.image.src}
                width={hero.image.width}
                height={hero.image.height}
                alt={hero.image.alt}
                priority
                sizes="(min-width: 1024px) 560px, 92vw"
                className={cn(
                  "h-full w-full",
                  cover
                    ? "object-cover"
                    : "[animation:float-y_7s_ease-in-out_infinite] object-contain drop-shadow-[0_30px_40px_rgb(50_50_140/0.22)]",
                )}
              />
            </div>
          </div>
        )}
      </div>
      {hero.image && fit === "banner" ? (
        <div
          className="container-page pb-10 lg:pb-12"
          style={{ animation: "hero-art-in 1.1s var(--ease-out) 300ms both" }}
        >
          <div
            className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] shadow-[0_40px_80px_-40px_rgb(40_40_120/0.45)] ring-1 ring-white/70 sm:aspect-[var(--banner-ratio)] dark:ring-white/10"
            style={{ "--banner-ratio": Math.max(hero.image.width / hero.image.height, 2.6) } as CSSProperties}
          >
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              sizes="(min-width: 1216px) 1152px, 100vw"
              className="object-cover object-right"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
