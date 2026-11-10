"use client";

import { useDeferredValue, useMemo, useRef, useState } from "react";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import { ChevronDown } from "@/components/ui/icons";
import type { BlogPost } from "@/content/newsroom";
import { cn } from "@/lib/utils";
import { BlogCard } from "./blog-card";

const INITIAL = 6;

/**
 * Category filter + search + post grid with "Show more / Show less".
 * Posts already featured above the grid are skipped in the default view, but included
 * whenever a filter or search is active, so results are always complete.
 */
export function BlogIndex({
  posts,
  categories,
  featured = [],
}: {
  posts: BlogPost[];
  categories: string[];
  featured?: string[];
}) {
  const [cat, setCat] = useState<string>("all");
  const [query, setQuery] = useState("");
  const q = useDeferredValue(query.trim().toLowerCase());
  const filtering = cat !== "all" || Boolean(q);

  // Expanded state resets whenever the filter changes (derived key, no effect needed).
  const filterKey = `${cat}|${q}`;
  const [expanded, setExpanded] = useState({ key: filterKey, open: false });
  const open = expanded.key === filterKey && expanded.open;
  const top = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () =>
      posts.filter(
        (p) =>
          (filtering || !featured.includes(p.slug)) &&
          (cat === "all" || p.category === cat) &&
          (!q || `${p.title} ${p.excerpt} ${p.category} ${p.author}`.toLowerCase().includes(q)),
      ),
    [posts, featured, filtering, cat, q],
  );
  const count = (c: string) => posts.filter((p) => p.category === c).length;
  const shown = open ? visible : visible.slice(0, INITIAL);
  const hidden = visible.length - INITIAL;

  return (
    <div ref={top} className="scroll-mt-28">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-[1.5rem] border border-white/90 bg-white/70 p-2 shadow-[0_1px_2px_rgb(30_40_90/0.05),0_20px_40px_-32px_rgb(40_50_120/0.35)] lg:flex-row lg:items-center dark:border-white/[0.08] dark:bg-white/[0.03]">
        <div
          role="group"
          aria-label="Filter by category"
          className="-mx-1 flex [scrollbar-width:none] gap-1 overflow-x-auto px-1 [&::-webkit-scrollbar]:hidden"
        >
          {["all", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-2xl px-4 text-[0.9375rem] font-medium whitespace-nowrap transition-all duration-300",
                cat === c
                  ? "bg-[image:var(--btn-gradient)] text-white shadow-[var(--btn-gradient-shadow)]"
                  : "text-fg-muted hover:bg-brand-soft hover:text-fg",
              )}
            >
              {c === "all" ? "All posts" : c}
              <span className={cn("text-xs tabular-nums", cat === c ? "text-white/80" : "text-fg-subtle")}>
                {c === "all" ? posts.length : count(c)}
              </span>
            </button>
          ))}
        </div>
        <label className="flex min-h-11 w-full items-center gap-2.5 rounded-2xl border border-line bg-white px-4 transition-shadow focus-within:shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent-from)_25%,transparent)] lg:ml-auto lg:w-72 dark:bg-white/[0.04]">
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
          <span className="sr-only">Search posts</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-[0.9375rem] text-fg outline-none placeholder:text-fg-subtle [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
          />
        </label>
      </div>

      <p className="mt-6 text-sm text-fg-subtle" aria-live="polite">
        {filtering ? (
          <>
            <span className="font-semibold text-ink">{visible.length}</span> {visible.length === 1 ? "post" : "posts"}
            {cat !== "all" ? (
              <>
                {" "}
                in <span className="font-semibold text-ink">{cat}</span>
              </>
            ) : null}
            {q ? <> matching “{query.trim()}”</> : null}
          </>
        ) : (
          <>All {posts.length} posts, newest first</>
        )}
      </p>

      {visible.length === 0 ? (
        <div className="mt-4 grid place-items-center rounded-[1.5rem] border border-dashed border-line px-6 py-16 text-center">
          <p className="font-semibold text-ink">No posts match that.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCat("all");
            }}
            className="mt-3 text-sm font-semibold text-brand-ink"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <CardSpotlight className="mt-4">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {shown.map((post, i) => (
              <li
                key={post.slug}
                style={{ animation: `fade-up 0.55s var(--ease-out) ${Math.min(i % INITIAL, 5) * 50}ms both` }}
              >
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        </CardSpotlight>
      )}

      {hidden > 0 ? (
        <div className="mt-8 flex items-center gap-4">
          <span aria-hidden="true" className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--line))]" />
          <button
            type="button"
            aria-expanded={open}
            onClick={() => {
              if (open && (top.current?.getBoundingClientRect().top ?? 0) < 0) {
                top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }
              setExpanded({ key: filterKey, open: !open });
            }}
            className="group/more inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-white/80 px-6 text-sm font-semibold text-ink shadow-[0_8px_24px_-16px_rgb(40_40_120/0.45)] transition-all hover:-translate-y-0.5 hover:border-transparent hover:bg-[image:var(--btn-gradient)] hover:text-white dark:bg-white/[0.04] dark:text-fg"
          >
            {open ? "Show fewer posts" : "Show more posts"}
            {!open ? (
              <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-semibold text-brand-ink tabular-nums transition-colors group-hover/more:bg-white/20 group-hover/more:text-white">
                +{hidden}
              </span>
            ) : null}
            <ChevronDown
              aria-hidden="true"
              className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
            />
          </button>
          <span aria-hidden="true" className="h-px flex-1 bg-[linear-gradient(90deg,var(--line),transparent)]" />
        </div>
      ) : null}
    </div>
  );
}
