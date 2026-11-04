"use client";

import { ChevronRight, MessageCircle, Phone, X } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { mainNav } from "@/content/navigation";
import type { NavLink } from "@/types/content";
import { site } from "@/content/site";
import { cn, whatsappLink } from "@/lib/utils";
import { ThemeSegmented } from "./theme-toggle";

type Props = { open: boolean; onClose: () => void };

/** Full-screen frosted menu for phones and tablets. */
export function MobileNav({ open, onClose }: Props) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastPath = useRef(pathname);

  // Close when the route changes.
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Lock page scroll, move focus in, trap Tab, close on Escape, restore focus on close.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") return onClose();
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  // Dropdown items become labelled groups; TechCare (in Solutions and the top bar) is listed once.
  const seen = new Set<string>();
  const groups = [...mainNav, { label: "Contact", href: "/contact" } as NavLink & { children?: NavLink[] }]
    .map((item) => ({
      title: item.children ? item.label : undefined,
      links: (item.children ?? [item])
        .filter((l) => !seen.has(l.href) && seen.add(l.href))
        .map((link, index) => ({ link, index })),
    }))
    .filter((g) => g.links.length > 0)
    // Single links (TechCare, Careers, Support, Contact) share one card instead of one each.
    .reduce<Array<{ title?: string; links: Array<{ link: NavLink; index: number }> }>>((acc, g) => {
      const prev = acc[acc.length - 1];
      if (!g.title && prev && !prev.title) prev.links.push(...g.links);
      else acc.push({ ...g, links: [...g.links] });
      return acc;
    }, []);

  return (
    <div
      id="mobile-nav"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={cn(
        "fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-[color-mix(in_srgb,var(--bg)_97%,transparent)] backdrop-blur-2xl transition-[opacity,visibility] duration-500 ease-out-expo lg:hidden",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
      style={{
        paddingTop: "max(1rem, env(safe-area-inset-top, 0px))",
        paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="container-page flex items-center justify-between py-1.5">
        <Logo />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid size-11 place-items-center rounded-full border border-line bg-white/70 text-fg transition-colors hover:bg-brand-soft dark:bg-white/[0.05]"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-page mt-4 flex-1">
        <ul className="flex flex-col gap-5">
          {groups.map((group, g) => (
            <li
              key={group.title ?? `links-${g}`}
              className={cn(
                "transition-all duration-700 ease-out-expo",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
              style={{ transitionDelay: open ? `${60 + g * 70}ms` : "0ms" }}
            >
              {group.title ? (
                <p className="mb-2 px-1 text-[0.6875rem] font-semibold tracking-[0.22em] text-fg-subtle uppercase">
                  {group.title}
                </p>
              ) : null}
              <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-white/80 bg-white/70 shadow-[0_1px_2px_rgb(30_40_90/0.05)] dark:border-white/[0.08] dark:bg-white/[0.03]">
                {group.links.map(({ link }) => {
                  const active = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-[3.25rem] items-center justify-between gap-3 px-4 py-2.5 text-[1.0625rem] leading-snug font-semibold tracking-[-0.01em] transition-colors",
                          active ? "text-brand-ink" : "text-ink hover:bg-brand-soft",
                        )}
                      >
                        <span className="min-w-0">{link.label}</span>
                        <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-fg-subtle" />
                      </Link>
                      {link.sub?.length ? (
                        <ul className="-mt-1 flex flex-wrap gap-1.5 px-4 pb-3">
                          {link.sub.map((sub) => (
                            <li key={sub.href} className="min-w-0">
                              <Link
                                href={sub.href}
                                onClick={onClose}
                                aria-current={pathname === sub.href ? "page" : undefined}
                                className="inline-flex min-h-9 max-w-full items-center gap-1.5 rounded-full bg-brand-soft px-3 text-[0.8125rem] font-medium text-brand-ink"
                              >
                                <span aria-hidden="true">↳</span>
                                <span className="truncate">{sub.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-page mt-6 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <a
            href={whatsappLink(site.contact.whatsapp.number, site.whatsappGreeting)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[image:var(--btn-gradient)] font-semibold text-white shadow-[var(--btn-gradient-shadow)]"
          >
            <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
          </a>
          <a
            href={site.contact.phone.href}
            className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-line bg-white/70 font-semibold text-ink dark:bg-white/[0.04]"
          >
            <Phone className="size-4" aria-hidden="true" /> Call
          </a>
        </div>
        <ThemeSegmented />
      </div>
    </div>
  );
}
