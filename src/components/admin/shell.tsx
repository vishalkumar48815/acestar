"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ArrowUpRight, Images, LayoutGrid, LogOut, Menu, Newspaper, PenLine, X } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { logout } from "@/server/admin/actions/auth";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutGrid },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/blog", label: "Blog", icon: PenLine },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
] as const;

export function AdminShell({ email, children }: { email: string; children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Close the mobile drawer on navigation (derived from the path, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  const sidebar = (
    <div className="flex h-full flex-col gap-6 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Logo href="/admin" label="Admin dashboard" />
          <span className="rounded-md bg-[image:var(--btn-gradient)] px-1.5 py-0.5 text-[0.625rem] font-bold tracking-[0.14em] text-white uppercase">
            Admin
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="grid size-9 place-items-center rounded-lg text-fg-muted lg:hidden"
          aria-label="Close menu"
        >
          <X className="size-5" />
        </button>
      </div>

      <nav aria-label="Admin" className="flex flex-col gap-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex min-h-11 items-center gap-3 rounded-xl px-3 text-[0.9375rem] font-medium transition-colors",
                active
                  ? "bg-[linear-gradient(95deg,color-mix(in_oklab,var(--accent-from)_14%,transparent),color-mix(in_oklab,var(--accent-to)_12%,transparent))] text-ink"
                  : "text-fg-muted hover:bg-brand-soft hover:text-fg",
              )}
            >
              <span
                className={cn(
                  "grid size-8 place-items-center rounded-lg transition-colors",
                  active
                    ? "bg-[image:var(--btn-gradient)] text-white shadow-[0_8px_18px_-10px_rgb(91_84_240/0.9)]"
                    : "bg-white/70 text-fg-subtle dark:bg-white/[0.05]",
                )}
              >
                <Icon className="size-4" />
              </span>
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-10 items-center justify-between rounded-xl border border-line px-3 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          View website <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
        <div className="rounded-xl border border-line bg-white/70 p-3 dark:bg-white/[0.03]">
          <p className="text-xs text-fg-subtle">Signed in as</p>
          <p className="truncate text-sm font-medium text-ink" title={email}>
            {email}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <form action={logout}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted hover:text-danger"
              >
                <LogOut aria-hidden="true" className="size-4" /> Sign out
              </button>
            </form>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-shell relative isolate flex min-h-svh flex-1">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(50%_40%_at_100%_0%,color-mix(in_oklab,var(--accent-to)_10%,transparent),transparent_70%),radial-gradient(40%_40%_at_0%_100%,color-mix(in_oklab,var(--accent-from)_8%,transparent),transparent_70%)]"
      />
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 border-r border-line bg-white/60 lg:block dark:bg-white/[0.02]">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      <div className={cn("fixed inset-0 z-50 lg:hidden", open ? "" : "pointer-events-none")} inert={!open}>
        <div
          className={cn("absolute inset-0 bg-black/30 transition-opacity", open ? "opacity-100" : "opacity-0")}
          onClick={() => setOpen(false)}
        />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 w-72 bg-bg-elevated shadow-2xl transition-transform duration-300",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {sidebar}
        </aside>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-[color-mix(in_oklab,var(--bg)_85%,transparent)] px-4 py-3 backdrop-blur-md lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid size-10 place-items-center rounded-xl border border-line"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <Logo href="/admin" label="Admin dashboard" />
        </header>
        <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 pt-8 pb-0 sm:px-8 lg:pt-10">
          {children}
        </main>
      </div>
    </div>
  );
}
