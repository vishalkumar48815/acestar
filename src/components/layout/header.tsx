"use client";

import { ChevronDown, Menu } from "@/components/ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { mainNav } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const lastY = useRef(0);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Compact + frosted after scrolling; slide away when scrolling down, return when scrolling up.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 480 && y > lastY.current + 4);
        if (y < lastY.current - 4 || y < 480) setHidden(false);
        lastY.current = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Close the dropdown on outside click or Escape.
  useEffect(() => {
    if (!openDropdown) return;
    const onPointer = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setOpenDropdown(null);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpenDropdown(null);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [openDropdown]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 z-50 transition-transform duration-500 ease-out-expo",
          hidden && !menuOpen && "-translate-y-[130%]",
        )}
        style={{ top: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="container-page pt-3 md:pt-4">
          <nav
            aria-label="Main"
            className={cn(
              "flex items-center justify-between gap-4 rounded-full py-2 pr-2 pl-5 transition-all duration-500 ease-out-expo",
              scrolled ? "glass-strong" : "border border-transparent bg-transparent",
            )}
          >
            <Logo priority />

            <ul className="hidden items-center gap-1 lg:flex">
              {mainNav.map((item) =>
                item.children ? (
                  <li
                    key={item.label}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={openDropdown === item.label}
                      aria-controls="nav-solutions"
                      onClick={() => setOpenDropdown((v) => (v === item.label ? null : item.label))}
                      className={cn(
                        "inline-flex min-h-11 items-center gap-1 rounded-full px-4 text-[0.9375rem] font-medium transition-colors hover:text-fg",
                        pathname.startsWith("/solutions") ? "text-fg" : "text-fg-muted",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "size-4 transition-transform duration-300",
                          openDropdown === item.label && "rotate-180",
                        )}
                      />
                    </button>
                    <div
                      id="nav-solutions"
                      className={cn(
                        "absolute top-full left-1/2 w-80 -translate-x-1/2 pt-3 transition-all duration-300 ease-out-expo",
                        openDropdown === item.label
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-2 opacity-0",
                      )}
                    >
                      <ul className="flex flex-col gap-1 rounded-3xl p-2 glass-strong">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setOpenDropdown(null)}
                              className="flex flex-col rounded-2xl px-4 py-3 transition-colors hover:bg-brand-soft"
                            >
                              <span className="font-semibold text-fg">{child.label}</span>
                              <span className="text-sm text-fg-subtle">{child.description}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors hover:text-fg",
                        isActive(item.href) ? "text-fg" : "text-fg-muted",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>

            <div className="flex items-center gap-1">
              <ThemeToggle />
              <ButtonLink href="/contact" size="md" className="hidden rounded-full sm:inline-flex">
                Talk to us
              </ButtonLink>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                className="grid size-11 place-items-center rounded-full text-fg transition-colors hover:bg-brand-soft lg:hidden"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </div>
          </nav>
        </div>
      </header>
      <MobileNav open={menuOpen} onClose={closeMenu} />
    </>
  );
}
