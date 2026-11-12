"use client";

import Image from "next/image";
import { useState } from "react";
import type { AiTool, UseCase } from "@/content/solutions/ai";
import { cn } from "@/lib/utils";

/** "What AI does for your team": pick a team, see three everyday tasks and the tool for each. */
export function AiUseCases({ groups, tools }: { groups: { team: string; items: UseCase[] }[]; tools: AiTool[] }) {
  const [active, setActive] = useState(0);
  const iconFor = (name: string) => tools.find((t) => t.name === name)?.icon;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Choose a team"
        className="-mx-1 flex [scrollbar-width:none] gap-1 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden"
      >
        {groups.map((g, i) => (
          <button
            key={g.team}
            id={`uc-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls="uc-panel"
            onClick={() => setActive(i)}
            className={cn(
              "relative min-h-11 shrink-0 rounded-full px-5 text-[0.9375rem] font-medium whitespace-nowrap transition-all duration-300",
              active === i
                ? "bg-[image:var(--btn-gradient)] text-white shadow-[var(--btn-gradient-shadow)]"
                : "text-fg-muted hover:bg-brand-soft hover:text-fg",
            )}
          >
            {g.team}
          </button>
        ))}
      </div>

      <ol
        id="uc-panel"
        role="tabpanel"
        aria-labelledby={`uc-tab-${active}`}
        key={active}
        className="mt-8 divide-y divide-line border-y border-line"
      >
        {groups[active].items.map((u, i) => {
          const icon = iconFor(u.tool);
          return (
            <li
              key={u.task}
              className="group flex items-center gap-4 py-5 sm:gap-6 sm:py-6"
              style={{ animation: `fade-up 0.5s var(--ease-out) ${i * 70}ms both` }}
            >
              <span className="w-8 shrink-0 font-display text-sm font-semibold text-fg-subtle tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="min-w-0 flex-1 font-display text-[clamp(1.125rem,0.95rem+0.7vw,1.5rem)] leading-snug font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-brand-ink">
                {u.task}
              </p>
              <span className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-white/70 py-1.5 pr-3.5 pl-1.5 text-sm font-medium text-fg-muted dark:bg-white/[0.04]">
                {icon ? (
                  <Image
                    src={icon.src}
                    alt=""
                    width={22}
                    height={22}
                    unoptimized={icon.src.endsWith(".svg")}
                    className={cn("size-[1.375rem] object-contain", icon.darkInvert && "dark:invert")}
                  />
                ) : null}
                <span className="hidden sm:inline">{u.tool}</span>
                <span className="sr-only sm:hidden">{u.tool}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
