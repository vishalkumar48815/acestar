"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import { spotlight } from "@/components/solutions/primitives";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { formatDate, isExternal, languageLabel, type PressItem, type PressLanguage } from "@/content/newsroom";
import { cn } from "@/lib/utils";

type Filter = PressLanguage | "all";

const PAGE = 12;

/** Press coverage: language filter + search, grouped by year, newest first. */
export function PressFeed({ items }: { items: PressItem[] }) {
  const [lang, setLang] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const q = useDeferredValue(query.trim().toLowerCase());

  const langs = useMemo(
    () => (["en", "ms", "zh"] as PressLanguage[]).filter((l) => items.some((i) => i.language === l)),
    [items],
  );

  // Paging resets whenever the filter changes (derived, no effect needed).
  const filterKey = `${lang}|${q}`;
  const [paging, setPaging] = useState({ key: filterKey, limit: PAGE });
  const limit = paging.key === filterKey ? paging.limit : PAGE;

  const matching = useMemo(
    () =>
      items.filter(
        (i) =>
          (lang === "all" || i.language === lang) &&
          (!q || `${i.title} ${i.excerpt} ${i.publisher}`.toLowerCase().includes(q)),
      ),
    [items, lang, q],
  );
  const years = useMemo(() => {
    const groups = new Map<string, PressItem[]>();
    for (const item of matching.slice(0, limit)) {
      const y = item.date.slice(0, 4);
      groups.set(y, [...(groups.get(y) ?? []), item]);
    }
    return [...groups.entries()];
  }, [matching, limit]);
  const shown = matching.length;
  const remaining = matching.length - limit;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by language" className="flex flex-wrap gap-2">
          {(["all", ...langs] as Filter[]).map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={lang === l}
              onClick={() => setLang(l)}
              className={cn(
                "min-h-11 rounded-full px-5 text-[0.9375rem] font-medium transition-all duration-300",
                lang === l
                  ? "bg-[image:var(--btn-gradient)] text-white shadow-[var(--btn-gradient-shadow)]"
                  : "border border-line bg-white/60 text-fg-muted hover:text-fg dark:bg-white/[0.03]",
              )}
            >
              {l === "all" ? "All news" : languageLabel[l]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {/* Icon and input sit side by side (no absolute positioning), so native search styling can't overlap them */}
          <label className="flex min-h-11 w-full items-center gap-2.5 rounded-full border border-line bg-white/80 px-4 transition-shadow focus-within:shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent-from)_25%,transparent)] lg:w-72 dark:bg-white/[0.04]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-4 shrink-0 text-fg-subtle"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="sr-only">Search news</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search headlines, publishers…"
              className="min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-[0.9375rem] text-fg outline-none placeholder:text-fg-subtle [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
            />
          </label>
          <p className="hidden shrink-0 text-sm text-fg-subtle sm:block" aria-live="polite">
            {shown} {shown === 1 ? "story" : "stories"}
          </p>
        </div>
      </div>

      {years.length === 0 ? (
        <p className="mt-16 text-center text-fg-muted">No stories match your search.</p>
      ) : (
        <CardSpotlight className="mt-10 flex flex-col gap-14">
          {years.map(([year, list]) => (
            <section key={year} aria-labelledby={`y-${year}`}>
              <div className="mb-6 flex items-center gap-4">
                <h3
                  id={`y-${year}`}
                  className="text-gradient font-display text-[1.75rem] leading-none font-extrabold tracking-[-0.04em] tabular-nums"
                >
                  {year}
                </h3>
                <span aria-hidden="true" className="h-px flex-1 bg-[linear-gradient(90deg,var(--line),transparent)]" />
                <span className="text-sm text-fg-subtle">
                  {(() => {
                    const n = matching.filter((m) => m.date.startsWith(year)).length;
                    return `${n} ${n === 1 ? "story" : "stories"}`;
                  })()}
                </span>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((item, i) => (
                  <li key={item.id} style={{ animation: `fade-up 0.6s var(--ease-out) ${Math.min(i, 6) * 60}ms both` }}>
                    <PressCard item={item} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
          {remaining > 0 ? (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setPaging({ key: filterKey, limit: limit + PAGE })}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-white/70 px-7 font-semibold text-ink shadow-[0_8px_24px_-14px_rgb(40_40_120/0.35)] transition-all hover:-translate-y-0.5 hover:border-transparent hover:bg-[image:var(--btn-gradient)] hover:text-white dark:bg-white/[0.04] dark:text-fg"
              >
                Show more stories
                <span className="text-sm font-normal opacity-70">({remaining} more)</span>
              </button>
            </div>
          ) : null}
        </CardSpotlight>
      )}
    </div>
  );
}

export function PressCard({ item }: { item: PressItem }) {
  const external = isExternal(item.url);
  const body = (
    <>
      <span aria-hidden="true" className={spotlight} />
      <div className="relative aspect-[16/9] overflow-hidden bg-[linear-gradient(135deg,#1b1f4a,#2b2a7a_55%,#5b3cc4)]">
        {item.image ? (
          <Image
            src={item.image.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 92vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.05]"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center font-display text-2xl font-bold text-white/80">
            {item.publisher}
          </span>
        )}
        <span className="absolute top-3 left-3 z-10 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0b1020] shadow-[0_4px_12px_-4px_rgb(0_0_0/0.35)] dark:bg-[#0b1222] dark:text-white">
          {item.publisher}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-2 text-[0.8125rem] text-fg-subtle">
          <time dateTime={item.date}>{formatDate(item.date)}</time>
          {item.language !== "en" ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{languageLabel[item.language]}</span>
            </>
          ) : null}
        </p>
        <h4 className="mt-2 line-clamp-3 text-[1.0625rem] leading-snug font-semibold tracking-[-0.01em] text-ink">
          {item.title}
        </h4>
        <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-fg-muted">{item.excerpt}</p>
        {item.url ? (
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-ink">
            {external ? `Read on ${item.publisher}` : "Read article"}
            {external ? (
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
              />
            ) : (
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/card:translate-x-1" />
            )}
          </span>
        ) : null}
      </div>
    </>
  );
  const cls = cn(
    "group/card relative isolate flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-white/90 bg-white/80 shadow-[0_1px_2px_rgb(30_40_90/0.05)] transition-[transform,box-shadow] duration-500 ease-out-expo",
    "hover:-translate-y-1 hover:shadow-[0_24px_44px_-24px_rgb(70_70_180/0.35)] dark:border-white/[0.08] dark:bg-white/[0.03]",
  );
  if (!item.url)
    return (
      <article data-spotlight className={cls}>
        {body}
      </article>
    );
  return external ? (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      data-spotlight
      className={cls}
      aria-label={`${item.title} (${item.publisher}, opens in a new tab)`}
    >
      {body}
    </a>
  ) : (
    <Link href={item.url} data-spotlight className={cls}>
      {body}
    </Link>
  );
}
