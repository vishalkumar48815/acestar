"use client";

import { Monitor, Moon, Sun } from "@/components/ui/icons";
import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type ThemePreference } from "@/lib/theme";
import { cn } from "@/lib/utils";

const ORDER: ThemePreference[] = ["system", "light", "dark"];
const LABEL: Record<ThemePreference, string> = { system: "System", light: "Light", dark: "Dark" };
const listeners = new Set<() => void>();

function readPreference(): ThemePreference {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : "system";
  } catch {
    return "light";
  }
}

function applyPreference(pref: ThemePreference) {
  try {
    if (pref === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, pref);
  } catch {
    /* Storage blocked (private mode): the choice still applies for this page view. */
  }
  const resolved =
    pref === "system" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : pref;
  const root = document.documentElement;
  root.setAttribute("data-theme", resolved);
  root.style.colorScheme = resolved;
  listeners.forEach((notify) => notify());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function useThemePreference() {
  const preference = useSyncExternalStore(subscribe, readPreference, () => "system" as ThemePreference);
  return { preference, setPreference: applyPreference };
}

const ICON = { system: Monitor, light: Sun, dark: Moon } as const;

/** Compact header button: cycles System → Light → Dark. */
export function ThemeToggle({ className }: { className?: string }) {
  const { preference, setPreference } = useThemePreference();
  const next = ORDER[(ORDER.indexOf(preference) + 1) % ORDER.length];
  const Icon = ICON[preference];

  return (
    <button
      type="button"
      onClick={() => setPreference(next)}
      aria-label={`Theme: ${LABEL[preference]}. Switch to ${LABEL[next]}`}
      title={`Theme: ${LABEL[preference]}`}
      className={cn(
        "grid size-11 place-items-center rounded-full text-fg-muted transition-colors hover:bg-brand-soft hover:text-fg",
        className,
      )}
    >
      <Icon className="size-[1.15rem]" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}

/** Full segmented control, used in the mobile menu where space allows clear labels. */
export function ThemeSegmented() {
  const { preference, setPreference } = useThemePreference();
  return (
    <div role="radiogroup" aria-label="Colour theme" className="inline-flex rounded-full p-1 glass">
      {ORDER.map((pref) => {
        const Icon = ICON[pref];
        const active = pref === preference;
        return (
          <button
            key={pref}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setPreference(pref)}
            className={cn(
              "inline-flex min-h-10 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold transition-colors",
              active ? "bg-fg text-bg" : "text-fg-muted hover:text-fg",
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
            {LABEL[pref]}
          </button>
        );
      })}
    </div>
  );
}
