"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "@/components/ui/icons";

type Props = { open: boolean; onClose: () => void; labelledBy: string; children: ReactNode };

/** Native <dialog> (focus trap, Escape and inert background for free), styled as frosted glass. */
export function ProductDialog({ open, onClose, labelledBy, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto max-h-[min(40rem,calc(100svh-2rem))] w-[min(34rem,calc(100vw-2rem))] overflow-y-auto rounded-[1.5rem] border border-white/80 bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] p-0 text-fg shadow-[0_40px_90px_-30px_rgb(30_30_90/0.5)] backdrop-blur-2xl backdrop:bg-[rgb(10_14_30/0.45)] backdrop:backdrop-blur-sm open:[animation:fade-up_0.4s_var(--ease-out)_both] dark:border-white/10"
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 grid size-11 place-items-center rounded-full text-fg-muted transition-colors hover:bg-brand-soft hover:text-fg"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
        {children}
      </div>
    </dialog>
  );
}
