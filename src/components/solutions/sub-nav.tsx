"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string };

/** Sticky in-page navigation that highlights the section currently in view. */
export function SubNav({ items, label = "On this page" }: { items: Item[]; label?: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => el !== null);
    if (!sections.length || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  // Keep the active pill visible in the horizontally scrolling row (phones).
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    const list = listRef.current;
    if (!el || !list) return;
    list.scrollTo({ left: el.offsetLeft - list.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label={label} className="sticky top-[calc(env(safe-area-inset-top,0px)+0.75rem)] z-30 py-2">
      <div className="container-page">
        <ul
          ref={listRef}
          className="mx-auto flex w-fit max-w-full [scrollbar-width:none] gap-1 overflow-x-auto rounded-full p-1.5 glass-strong [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <li key={item.id} data-id={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "inline-flex min-h-10 items-center rounded-full px-4 text-[0.875rem] font-medium whitespace-nowrap transition-all duration-300",
                  active === item.id
                    ? "bg-[image:var(--btn-gradient)] text-white shadow-[var(--btn-gradient-shadow)]"
                    : "text-fg-muted hover:text-fg",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
