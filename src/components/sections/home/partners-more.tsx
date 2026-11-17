"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** wide: very long wordmarks (about 6:1) get almost the full tile width so they don't look tiny. */
type Logo = { name: string; src: string; width: number; height: number; wide?: boolean };

/** "Show more" under the partner cards: reveals the hardware and software brands as a logo wall. */
export function PartnersMore({ logos }: { logos: readonly Logo[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <>
      <div
        id={id}
        className={cn(
          "grid transition-[grid-template-rows,opacity,margin] duration-500 ease-out-expo",
          open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <ul
          aria-label="More technology partners"
          className="grid grid-cols-3 gap-3 overflow-hidden sm:gap-4 lg:grid-cols-9"
        >
          {logos.map((logo, i) => (
            <li
              key={logo.name}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              className={cn(
                "grid h-20 place-items-center rounded-2xl border border-white/90 bg-white/80 shadow-[0_1px_2px_rgb(30_40_90/0.05)] transition-[opacity,transform] duration-500",
                logo.wide ? "px-1.5" : "px-4",
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                "dark:border-white/[0.08] dark:bg-white/90",
              )}
            >
              <Image
                src={logo.src}
                width={logo.width}
                height={logo.height}
                alt={logo.name}
                sizes="140px"
                className={cn(
                  "max-h-8 w-auto object-contain sm:max-h-9",
                  logo.wide ? "max-w-full" : "max-w-[88%]",
                )}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="group inline-flex min-h-13 items-center gap-3 rounded-full border-[1.5px] border-[#8b5cf6] bg-white px-10 text-[1rem] font-bold text-eyebrow-ink shadow-[0_8px_24px_-16px_rgb(91_33_214/0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f5f0ff] dark:border-[#a78bfa] dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
        >
          {open ? "Show Less" : "Show More"}
          <ArrowRight
            aria-hidden="true"
            className={cn(
              "size-4 transition-transform duration-300",
              open ? "-rotate-90" : "group-hover:translate-x-0.5",
            )}
          />
        </button>
      </div>
    </>
  );
}
