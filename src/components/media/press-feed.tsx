"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useMemo, useRef, useState } from "react";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import { spotlight } from "@/components/solutions/primitives";
import { ArrowRight, ArrowUpRight, ChevronDown } from "@/components/ui/icons";
import { formatDate, isExternal, languageLabel, type PressItem, type PressLanguage } from "@/content/newsroom";
import { cn } from "@/lib/utils";

type Filter = PressLanguage | "all";

/**
 * Press coverage: language filter + search, grouped by year (newest first) on a timeline.
 * Each year shows one row of cards and expands on its own ("See more / See less").
 */
export function PressFeed({ items }: { items: PressItem[] }) {
  const [lang, setLang] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const q = useDeferredValue(query.trim().toLowerCase());

  const langs = useMemo(
    () => (["en", "ms", "zh"] as PressLanguage[]).filter((l) => items.some((i) => i.language === l)),
    [items],
  );
  const countFor = (l: Filter) => (l === "all" ? items.length : items.filter((i) => i.language === l).length);

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
    for (const item of matching) {
      const y = item.date.slice(0, 4);
      groups.set(y, [...(groups.get(y) ?? []), item]);
    }
    return [...groups.entries()];
  }, [matching]);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-[1.5rem] border border-white/90 bg-white/70 p-2 shadow-[0_1px_2px_rgb(30_40_90/0.05),0_20px_40px_-32px_rgb(40_50_120/0.35)] lg:flex-row lg:items-center dark:border-white/[0.08] dark:bg-white/[0.03]">
        <div
          role="group"
          aria-label="Filter by language"
          className="-mx-1 flex [scrollbar-width:none] gap-1 overflow-x-auto px-1 [&::-webkit-scrollbar]:hidden"
        >
          {(["all", ...langs] as Filter[]).map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={lang === l}
              onClick={() => setLang(l)}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-2xl px-4 text-[0.9375rem] font-medium whitespace-nowrap transition-all duration-300",
                lang === l
                  ? "bg-[image:var(--btn-gradient)] text-white shadow-[var(--btn-gradient-shadow)]"
                  : "text-fg-muted hover:bg-brand-soft hover:text-fg",
              )}
            >
              {l === "all" ? "All news" : languageLabel[l]}
              <span className={cn("text-xs tabular-nums", lang === l ? "text-white/80" : "text-fg-subtle")}>
                {countFor(l)}
              </span>
            </button>
          ))}
        </div>
        {/* Icon and input sit side by side (no absolute positioning), so native search styling can't overlap them */}
        <label className="flex min-h-11 w-full items-center gap-2.5 rounded-2xl border border-line bg-white px-4 transition-shadow focus-within:shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent-from)_25%,transparent)] lg:ml-auto lg:w-[22rem] dark:bg-white/[0.04]">
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
            placeholder="Search stories or publishers…"
            className="min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-[0.9375rem] text-fg outline-none placeholder:text-fg-subtle [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
          />
          <span className="shrink-0 text-xs text-fg-subtle tabular-nums" aria-live="polite">
            {matching.length} {matching.length === 1 ? "story" : "stories"}
          </span>
        </label>
      </div>

      {years.length === 0 ? (
        <div className="mt-12 grid place-items-center rounded-[1.5rem] border border-dashed border-line px-6 py-16 text-center">
          <p className="font-semibold text-ink">No stories match your search.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setLang("all");
            }}
            className="mt-3 text-sm font-semibold text-brand-ink"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <CardSpotlight className="relative mt-10 flex flex-col gap-12 lg:mt-14 lg:gap-16">
          {/* Timeline spine (desktop) */}
          <span
            aria-hidden="true"
            className="absolute top-3 bottom-0 left-[0.4375rem] hidden w-px bg-[linear-gradient(180deg,var(--accent-from),color-mix(in_oklab,var(--accent-to)_60%,transparent)_40%,transparent)] lg:block"
          />
          {years.map(([year, list]) => (
            <YearGroup key={`${year}|${lang}|${q}`} year={year} items={list} expandAll={Boolean(q)} />
          ))}
        </CardSpotlight>
      )}
    </div>
  );
}

/* Cards per row: 1 on phones, 2 from sm, 3 from lg. Collapsed = first row only (pure CSS, no layout jump). */
const collapsedHide =
  "[&>li:nth-child(n+2)]:hidden sm:[&>li:nth-child(n+2)]:block sm:[&>li:nth-child(n+3)]:hidden lg:[&>li:nth-child(n+3)]:block lg:[&>li:nth-child(n+4)]:hidden";

function YearGroup({ year, items, expandAll }: { year: string; items: PressItem[]; expandAll: boolean }) {
  const [open, setOpen] = useState(expandAll);
  const ref = useRef<HTMLElement>(null);
  const n = items.length;
  const id = `y-${year}`;
  const languages = [...new Set(items.map((i) => i.language))];

  // The toggle only exists at breakpoints where something is hidden.
  const toggleVisibility = n > 3 ? "flex" : n === 3 ? "flex lg:hidden" : n === 2 ? "flex sm:hidden" : "hidden";

  function toggle() {
    if (open) {
      // Collapsing a long list: bring the year heading back into view first.
      const top = ref.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(!open);
  }

  return (
    <section
      ref={ref}
      aria-labelledby={id}
      className="relative scroll-mt-28 lg:grid lg:grid-cols-[10.5rem_1fr] lg:gap-8"
    >
      <header className="mb-5 flex items-end gap-4 lg:sticky lg:top-28 lg:mb-0 lg:block lg:self-start lg:pl-8">
        <span
          aria-hidden="true"
          className="absolute left-0 mt-4 hidden size-[0.9375rem] rounded-full border-[3px] border-[var(--bg)] bg-[image:var(--btn-gradient)] shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent-from)_18%,transparent)] lg:block"
        />
        <h3
          id={id}
          className="text-gradient font-display text-[2.5rem] leading-none font-extrabold tracking-[-0.05em] tabular-nums lg:text-[3.25rem]"
        >
          {year}
        </h3>
        <div className="pb-1 lg:mt-3 lg:pb-0">
          <p className="text-sm font-semibold text-ink">
            {n} {n === 1 ? "story" : "stories"}
          </p>
          <p className="text-xs text-fg-subtle">{languages.map((l) => languageLabel[l]).join(" · ")}</p>
        </div>
      </header>

      <div className="min-w-0">
        <ul
          id={`${id}-list`}
          className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", !open && collapsedHide)}
        >
          {items.map((item, i) => (
            <li
              key={item.id}
              style={{ animation: `fade-up 0.55s var(--ease-out) ${open ? Math.min(i % 6, 5) * 50 : 0}ms both` }}
            >
              <PressCard item={item} />
            </li>
          ))}
        </ul>

        <div className={cn("mt-5 items-center gap-4", toggleVisibility)}>
          <span aria-hidden="true" className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--line))]" />
          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-controls={`${id}-list`}
            className="group/more inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white/80 px-5 text-sm font-semibold text-ink shadow-[0_8px_24px_-16px_rgb(40_40_120/0.45)] transition-all hover:-translate-y-0.5 hover:border-transparent hover:bg-[image:var(--btn-gradient)] hover:text-white dark:bg-white/[0.04] dark:text-fg"
          >
            {open ? "See less stories" : "See more stories"}
            {!open ? (
              <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-semibold text-brand-ink tabular-nums transition-colors group-hover/more:bg-white/20 group-hover/more:text-white">
                +<span className="sm:hidden">{n - 1}</span>
                <span className="hidden sm:inline lg:hidden">{n - 2}</span>
                <span className="hidden lg:inline">{n - 3}</span>
              </span>
            ) : null}
            <ChevronDown
              aria-hidden="true"
              className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
            />
          </button>
          <span aria-hidden="true" className="h-px flex-1 bg-[linear-gradient(90deg,var(--line),transparent)]" />
        </div>
      </div>
    </section>
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
        <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed [overflow-wrap:anywhere] text-fg-muted">
          {item.excerpt}
        </p>
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
