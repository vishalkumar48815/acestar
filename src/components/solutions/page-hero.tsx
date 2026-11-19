import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
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

/**
 * Inner-page hero: breadcrumbs, headline, lead, two actions and the page artwork.
 * Pass `visual` to show a custom (e.g. animated) illustration in place of an image.
 */
export function PageHero({ hero, visual }: { hero: Hero; visual?: ReactNode }) {
  const fit = hero.imageFit ?? "cover";
  const side = Boolean(visual) || (hero.image && (fit === "cover" || fit === "contain"));
  const cover = fit === "cover";
  const centered = hero.align === "center" && !side && !(hero.image && fit === "backdrop");
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden">
      {/* Soft brand glow behind the hero */}
      <div
        aria-hidden="true"
        className="art-frame -z-10 bg-[radial-gradient(60%_70%_at_85%_10%,color-mix(in_oklab,var(--accent-to)_16%,transparent),transparent_70%),radial-gradient(50%_60%_at_5%_0%,color-mix(in_oklab,var(--accent-from)_12%,transparent),transparent_70%)]"
      />
      {hero.image && fit === "backdrop" ? (
        /*
         * Full-bleed hero artwork from the old site (subject on the right, open space on the left).
         * Phones: shown as a band at the top with the text below it. Desktop: behind the text.
         */
        <div
          aria-hidden="true"
          className={cn(
            "absolute left-1/2 -z-10 h-[min(80vw,26rem)] w-full max-w-[90rem] -translate-x-1/2 [mask-image:linear-gradient(180deg,#000_62%,transparent)] opacity-[var(--art-o)] lg:h-auto lg:[mask-image:linear-gradient(180deg,#000_82%,transparent)] dark:opacity-[calc(var(--art-o)*var(--art-dark))]",
            /* Stops growing at 1440px; edges soften from 1440px, and from 1600px nothing shows outside the 80rem column */
            "min-[90rem]:[mask-image:linear-gradient(180deg,#000_82%,transparent),linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] min-[90rem]:[mask-composite:intersect] min-[100rem]:[mask-image:linear-gradient(180deg,#000_82%,transparent),linear-gradient(90deg,transparent_5rem,#000_10rem,#000_calc(100%-10rem),transparent_calc(100%-5rem))]",
            /* Header is 62px tall on phones, 78px from lg up */
            hero.imageBelowHeader ? "top-[3.875rem] lg:top-[4.875rem] lg:bottom-0" : "top-0 lg:inset-y-0",
            /* imageShiftY (wide screens): move the whole fading frame, so its bottom still fades out */
            hero.imageShiftY && "xl:top-(--art-y) xl:bottom-[calc(var(--art-y)*-1)]",
          )}
          style={
            {
              "--art-o": hero.imageOpacity ?? 1,
              "--art-dark": hero.imageDark ? 1 : hero.imageScrim ? 0.8 : 0.45,
              "--art-y": hero.imageShiftY ?? "0%",
            } as CSSProperties
          }
        >
          <Image
            src={hero.image.src}
            alt=""
            fill
            priority
            sizes="(min-width: 1440px) 1440px, 100vw"
            quality={90}
            className={cn("object-cover object-right", hero.imageDark && "dark:hidden")}
            style={{ animation: "hero-art-in 1.4s var(--ease-out) both" }}
          />
          {hero.imageDark ? (
            <Image
              src={hero.imageDark.src}
              alt=""
              fill
              priority
              sizes="(min-width: 1440px) 1440px, 100vw"
              quality={90}
              className="hidden object-cover object-right dark:block"
              style={{ animation: "hero-art-in 1.4s var(--ease-out) both" }}
            />
          ) : null}
          {/* Keeps the headline side crisp on desktop */}
          {hero.imageScrim ? (
            /* Solid page colour under the text, fading out so the photo shows in full on the right. */
            <>
              <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,var(--bg)_0%,var(--bg)_46%,color-mix(in_srgb,var(--bg)_85%,transparent)_55%,color-mix(in_srgb,var(--bg)_35%,transparent)_68%,transparent_82%)] lg:block" />
              {/* Fades the photo out under the transparent header so the navigation stays readable */}
              <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,var(--bg)_10%,color-mix(in_srgb,var(--bg)_70%,transparent)_45%,transparent)] lg:h-36" />
            </>
          ) : (
            <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,color-mix(in_srgb,var(--bg)_55%,transparent)_0%,color-mix(in_srgb,var(--bg)_20%,transparent)_40%,transparent_60%)] lg:block dark:bg-[linear-gradient(90deg,var(--bg)_5%,color-mix(in_srgb,var(--bg)_50%,transparent)_50%,transparent_75%)]" />
          )}
        </div>
      ) : null}
      <div
        className={cn(
          "container-page grid items-center gap-10 lg:pt-36",
          fit === "backdrop" && hero.image
            ? hero.imageBelowHeader
              ? "pt-[calc(min(68vw,22rem)+3.875rem)]"
              : "pt-[min(68vw,22rem)]"
            : "pt-28",
          side ? "pb-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-16" : "pb-10 lg:pb-12",
          fit === "backdrop" && "lg:min-h-[38rem] lg:pb-20",
        )}
      >
        <div
          className={cn(
            "flex min-w-0 flex-col",
            centered ? "mx-auto max-w-[52rem] items-center text-center" : "items-start",
            !side && !centered && "max-w-[46rem]",
          )}
        >
          {hero.showCrumbs === false ? null : (
            <nav aria-label="Breadcrumb" style={enter(0)}>
              <ol
                className={cn(
                  "flex flex-wrap items-center gap-1 text-[0.8125rem] text-fg-subtle",
                  centered && "justify-center",
                )}
              >
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
          )}

          {hero.keyword ? null : (
            <p
              className={cn(
                "text-[0.6875rem] font-bold tracking-[0.34em] text-eyebrow-ink uppercase sm:text-xs",
                hero.showCrumbs === false ? "" : "mt-6",
              )}
              style={enter(60)}
            >
              {hero.eyebrow}
            </p>
          )}
          <h1
            id="page-title"
            className={cn(
              "font-display text-balance text-ink",
              /* Centred text-only heroes use a calmer, corporate title size */
              centered
                ? "text-[clamp(1.75rem,1.45rem+2.2vw,3.375rem)] font-bold tracking-[-0.035em]"
                : "text-[clamp(1.875rem,1.2rem+3.2vw,4rem)] font-extrabold tracking-[-0.04em]",
              /* Must come AFTER the text-[…] size: cn() (tailwind-merge) drops a line-height listed before a font-size */
              "leading-[1.08]",
              hero.keyword ? "mt-6" : "mt-4",
            )}
            style={enter(140)}
          >
            {hero.keyword ? (
              <>
                {/* Keyword line: styled as the eyebrow, but part of the heading for SEO */}
                <span
                  className="mb-4 block font-sans text-[0.6875rem] leading-normal font-bold tracking-[0.34em] text-eyebrow-ink uppercase sm:text-xs"
                  style={enter(60)}
                >
                  {hero.keyword}
                </span>
                <span className="block">
                  <Title title={hero.title} accent={hero.accent} />
                </span>
              </>
            ) : (
              <Title title={hero.title} accent={hero.accent} />
            )}
          </h1>
          {hero.subheading ? (
            <h2
              className="mt-5 flex items-center gap-3 text-[clamp(1rem,0.94rem+0.3vw,1.1875rem)] leading-snug font-semibold text-ink"
              style={enter(200)}
            >
              <span aria-hidden="true" className="h-0.5 w-8 shrink-0 rounded-full bg-[image:var(--btn-gradient)]" />
              {hero.subheading}
            </h2>
          ) : null}
          <p
            className={cn(
              "mt-5 text-[clamp(1rem,0.94rem+0.35vw,1.25rem)] leading-[1.6] text-pretty text-fg-muted",
              centered ? "max-w-[40rem]" : "max-w-[36rem]",
            )}
            style={enter(260)}
          >
            {hero.lead}
          </p>

          {(hero.primary || hero.secondary) && (
            <div
              className={cn("mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row", centered && "sm:justify-center")}
              style={enter(360)}
            >
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
            <ul
              className={cn("mt-8 flex flex-wrap gap-2", centered && "justify-center")}
              style={enter(460)}
              aria-label="Highlights"
            >
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

        {visual ? <div className="min-w-0">{visual}</div> : null}
        {!visual && side && hero.image && (
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
