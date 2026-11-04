import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import { spotlight } from "@/components/solutions/primitives";
import { ArrowDown, ArrowRight, ArrowUpRight, Sparkles } from "@/components/ui/icons";
import { formatDate, isExternal, languageLabel, type PressItem } from "@/content/newsroom";
import { cn } from "@/lib/utils";

/**
 * Editorial top of /news: the top story as a large image-led card, with the latest
 * other headlines in a glass panel beside it.
 */
export function NewsSpotlight({ top, headlines }: { top: PressItem; headlines: PressItem[] }) {
  return (
    <CardSpotlight className="grid gap-5 lg:grid-cols-[1.45fr_1fr] lg:gap-6">
      <TopStory item={top} />

      <aside
        aria-labelledby="headlines-title"
        className="relative isolate flex flex-col overflow-hidden rounded-[1.75rem] border border-white/90 bg-white/75 p-5 shadow-[0_1px_2px_rgb(30_40_90/0.05),0_30px_60px_-40px_rgb(40_50_120/0.35)] sm:p-6 dark:border-white/[0.08] dark:bg-white/[0.03]"
      >
        <span
          aria-hidden="true"
          className="absolute -top-24 -right-20 -z-10 size-64 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent-to)_22%,transparent),transparent)]"
        />
        <div className="flex items-center justify-between gap-3">
          <h2
            id="headlines-title"
            className="text-gradient text-[0.6875rem] font-semibold tracking-[0.34em] uppercase sm:text-xs"
          >
            Also in the headlines
          </h2>
          <span className="flex items-center gap-1.5 text-xs text-fg-subtle">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent-from)] opacity-60 motion-reduce:animate-none" />
              <span className="relative size-2 rounded-full bg-[image:var(--btn-gradient)]" />
            </span>
            Latest
          </span>
        </div>

        <ol className="mt-4 flex flex-1 flex-col divide-y divide-line">
          {headlines.map((item, i) => (
            <li key={item.id} className="flex-1">
              <Headline item={item} index={i + 1} />
            </li>
          ))}
        </ol>

        <a
          href="#stories"
          className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-white/70 px-5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-transparent hover:bg-[image:var(--btn-gradient)] hover:text-white dark:bg-white/[0.04] dark:text-fg"
        >
          Browse all coverage
          <ArrowDown aria-hidden="true" className="size-4" />
        </a>
      </aside>
    </CardSpotlight>
  );
}

function TopStory({ item }: { item: PressItem }) {
  const external = isExternal(item.url);
  const body = (
    <>
      <span aria-hidden="true" className={spotlight} />
      <div className="relative min-h-[26rem] flex-1 overflow-hidden sm:min-h-[30rem] lg:min-h-[34rem]">
        {item.image ? (
          <Image
            src={item.image.src}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 760px, 94vw"
            className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover/card:scale-[1.04]"
          />
        ) : (
          <span className="absolute inset-0 bg-[linear-gradient(135deg,#1b1f4a,#2b2a7a_55%,#5b3cc4)]" />
        )}
        {/* Legibility scrim + brand tint */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_10_30/0.05)_0%,rgb(8_10_30/0.15)_30%,rgb(8_10_30/0.7)_62%,rgb(8_10_30/0.94)_100%)]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(70%_60%_at_0%_100%,color-mix(in_oklab,var(--accent-from)_45%,transparent),transparent_70%)] mix-blend-screen"
        />

        <div className="absolute top-4 left-4 flex flex-wrap gap-2 sm:top-5 sm:left-5">
          <Chip className="bg-[image:var(--btn-gradient)] text-white">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Top story
          </Chip>
          <Chip className="bg-white text-[#0b1020]">{item.publisher}</Chip>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7 lg:p-9">
          <p className="flex flex-wrap items-center gap-x-2 text-[0.8125rem] text-white/75">
            <time dateTime={item.date}>{formatDate(item.date)}</time>
            {item.language !== "en" ? (
              <>
                <span aria-hidden="true">·</span>
                <span>{languageLabel[item.language]}</span>
              </>
            ) : null}
          </p>
          <h2
            id="featured-title"
            className="mt-2 max-w-[38rem] font-display text-[clamp(1.5rem,1.05rem+1.6vw,2.4rem)] leading-[1.1] font-bold tracking-[-0.035em] text-balance"
          >
            {item.title}
          </h2>
          <p className="mt-3 hidden max-w-[36rem] text-[0.9375rem] leading-relaxed text-white/80 sm:line-clamp-2">
            {item.excerpt}
          </p>
          {item.url ? (
            <span className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#0b1020] shadow-[0_12px_30px_-12px_rgb(0_0_0/0.6)] transition-transform group-hover/card:-translate-y-0.5">
              {external ? `Read on ${item.publisher}` : "Read article"}
              {external ? (
                <ArrowUpRight aria-hidden="true" className="size-4" />
              ) : (
                <ArrowRight aria-hidden="true" className="size-4" />
              )}
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
  const cls =
    "group/card relative isolate flex overflow-hidden rounded-[1.75rem] bg-[#0b1020] shadow-[0_40px_80px_-40px_rgb(40_40_120/0.55)] ring-1 ring-white/70 dark:ring-white/10";
  return <StoryLink item={item} className={cls} body={body} />;
}

function Headline({ item, index }: { item: PressItem; index: number }) {
  const body = (
    <>
      <span className="relative size-[4.5rem] shrink-0 overflow-hidden rounded-xl bg-[linear-gradient(135deg,#1b1f4a,#5b3cc4)] sm:size-20">
        {item.image ? (
          <Image
            src={item.image.src}
            alt=""
            fill
            sizes="80px"
            className="object-cover transition-transform duration-500 group-hover/row:scale-110"
          />
        ) : null}
        <span className="absolute bottom-1 left-1 grid size-5 place-items-center rounded-md bg-white/90 text-[0.625rem] font-bold text-[#0b1020] tabular-nums">
          {index}
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-fg-subtle">
          <span className="font-semibold text-brand-ink">{item.publisher}</span> · {formatDate(item.date)}
        </span>
        <span className="mt-1 line-clamp-2 text-[0.9375rem] leading-snug font-semibold text-ink transition-colors group-hover/row:text-brand-ink">
          {item.title}
        </span>
      </span>
    </>
  );
  return (
    <StoryLink
      item={item}
      className="group/row -mx-2 flex h-full items-center gap-4 rounded-xl px-2 py-3.5 transition-colors hover:bg-brand-soft"
      body={body}
    />
  );
}

function StoryLink({ item, className, body }: { item: PressItem; className: string; body: ReactNode }) {
  if (!item.url) return <article className={className}>{body}</article>;
  return isExternal(item.url) ? (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      data-spotlight
      className={className}
      aria-label={`${item.title} (${item.publisher}, opens in a new tab)`}
    >
      {body}
    </a>
  ) : (
    <Link href={item.url} data-spotlight className={className}>
      {body}
    </Link>
  );
}

function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shadow-[0_6px_16px_-6px_rgb(0_0_0/0.45)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
