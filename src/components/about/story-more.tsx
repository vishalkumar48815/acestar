"use client";

import { useId, useState } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** The rest of "Our Story", opened by the "Our Journey" button. */
export function StoryMore({ paragraphs }: { paragraphs: readonly string[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <>
      <div
        id={id}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-700 ease-out-expo",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 pt-4">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="group mx-auto mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-[var(--accent-from)] px-7 text-[0.9375rem] font-semibold text-brand-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-[image:var(--btn-gradient)] hover:text-white"
      >
        {open ? "Show less" : "Our Journey"}
        <ArrowRight
          aria-hidden="true"
          className={cn(
            "size-4 transition-transform duration-300",
            open ? "-rotate-90" : "group-hover:translate-x-0.5",
          )}
        />
      </button>
    </>
  );
}
