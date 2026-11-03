"use client";

import { useMemo, useState } from "react";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import type { BlogPost } from "@/content/newsroom";
import { cn } from "@/lib/utils";
import { BlogCard } from "./blog-card";

/** Category filter + post grid. */
export function BlogIndex({ posts, categories }: { posts: BlogPost[]; categories: string[] }) {
  const [cat, setCat] = useState<string>("all");
  const visible = useMemo(() => posts.filter((p) => cat === "all" || p.category === cat), [posts, cat]);
  const count = (c: string) => posts.filter((p) => p.category === c).length;

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {["all", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[0.9375rem] font-medium transition-all duration-300",
              cat === c
                ? "bg-[image:var(--btn-gradient)] text-white shadow-[var(--btn-gradient-shadow)]"
                : "border border-line bg-white/60 text-fg-muted hover:text-fg dark:bg-white/[0.03]",
            )}
          >
            {c === "all" ? "All posts" : c}
            <span className={cn("text-xs tabular-nums", cat === c ? "text-white/80" : "text-fg-subtle")}>
              {c === "all" ? posts.length : count(c)}
            </span>
          </button>
        ))}
      </div>
      <CardSpotlight className="mt-8">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post, i) => (
            <li key={post.slug} style={{ animation: `fade-up 0.6s var(--ease-out) ${Math.min(i, 6) * 60}ms both` }}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </CardSpotlight>
    </div>
  );
}
