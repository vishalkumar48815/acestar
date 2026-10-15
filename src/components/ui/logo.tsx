import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Placeholder wordmark.
 * TODO(client): replace with the official Acestar SVG logo (light + dark versions).
 * The only logo on the old site is a 206×47 PNG, which is too low-resolution for retina screens.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Acestar home"
      className={cn(
        "inline-flex items-center gap-1.5 font-display text-[1.375rem] font-extrabold tracking-[-0.03em] text-fg",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-brand">
        <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z" />
      </svg>
      acestar
    </Link>
  );
}
