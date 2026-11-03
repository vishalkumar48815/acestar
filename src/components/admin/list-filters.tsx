"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Search } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Spinner } from "./form";
import { inputClass } from "./ui";

/** Search box + status filter, synced to the URL (?q=&status=) so lists are linkable. */
export function ListFilters({ placeholder }: { placeholder: string }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, start] = useTransition();
  const [q, setQ] = useState(params.get("q") ?? "");
  const status = params.get("status") ?? "";

  const push = (patch: Record<string, string>) => {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    next.delete("page");
    start(() => router.replace(`${pathname}?${next}`, { scroll: false }));
  };

  // Debounced search.
  useEffect(() => {
    if (q === (params.get("q") ?? "")) return;
    const t = setTimeout(() => push({ q: q.trim() }), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
      <label className={cn(inputClass, "flex items-center gap-2.5 sm:max-w-sm")}>
        {pending ? (
          <Spinner className="size-4 text-fg-subtle" />
        ) : (
          <Search aria-hidden="true" className="size-4 shrink-0 text-fg-subtle" />
        )}
        <span className="sr-only">Search</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 outline-none [&::-webkit-search-cancel-button]:appearance-none"
        />
      </label>
      <div
        role="group"
        aria-label="Filter by status"
        className="flex gap-1 rounded-xl border border-line bg-white p-1 dark:bg-white/[0.04]"
      >
        {[
          ["", "All"],
          ["published", "Published"],
          ["draft", "Drafts"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={status === value}
            onClick={() => push({ status: value })}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              status === value ? "bg-[image:var(--btn-gradient)] text-white" : "text-fg-muted hover:text-fg",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
