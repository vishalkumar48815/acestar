"use client";

import { MessageCircle, Phone, X } from "@/components/ui/icons";
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

  // TechCare sits in the Solutions group and in the top bar; list it once here.
  const links = mainNav
    .flatMap((item) => (item.children ? item.children : [item]))
    .filter((link, i, all) => all.findIndex((l) => l.href === link.href) === i);

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
      <div className="container-page flex items-center justify-between py-2">
        <span className="text-eyebrow text-fg-subtle">Menu</span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid size-11 place-items-center rounded-full text-fg hover:bg-brand-soft"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-page mt-6 flex-1">
        <ul className="flex flex-col">
          {[...links, { label: "Contact", href: "/contact" } as NavLink].map((link, index) => (
            <li
              key={link.href}
              className={cn(
                "border-b border-line transition-all duration-700 ease-out-expo",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
              style={{ transitionDelay: open ? `${80 + index * 45}ms` : "0ms" }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                aria-current={pathname === link.href ? "page" : undefined}
                className="flex min-h-14 items-center justify-between py-3 font-display text-[1.75rem] font-bold tracking-[-0.02em] text-fg"
              >
                {link.label}
                <span aria-hidden="true" className="text-lg text-brand-ink">
                  →
                </span>
              </Link>
              {link.sub?.length ? (
                <ul className="-mt-1 flex flex-wrap gap-2 pb-4">
                  {link.sub.map((sub) => (
                    <li key={sub.href}>
                      <Link
                        href={sub.href}
                        onClick={onClose}
                        aria-current={pathname === sub.href ? "page" : undefined}
                        className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[0.9375rem] font-medium text-fg-muted glass"
                      >
                        <span aria-hidden="true" className="text-brand-ink">
                          ↳
                        </span>
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-page mt-8 flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <a
            href={whatsappLink(site.contact.whatsapp.number, site.whatsappGreeting)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-13 items-center justify-center gap-2 rounded-2xl font-semibold glass"
          >
            <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
          </a>
          <a
            href={site.contact.phone.href}
            className="flex min-h-13 items-center justify-center gap-2 rounded-2xl font-semibold glass"
          >
            <Phone className="size-4" aria-hidden="true" /> Call
          </a>
        </div>
        <ThemeSegmented />
      </div>
    </div>
  );
}
