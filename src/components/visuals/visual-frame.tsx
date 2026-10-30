import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import "./visuals.css";

/** Glass "AI panel" that holds each page's hero visual: soft aurora inside, grid, rim light. */
export function VisualFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "vis-anim relative isolate aspect-[5/4] w-full overflow-hidden rounded-[2rem] border border-white/80",
        "bg-[radial-gradient(120%_90%_at_80%_0%,color-mix(in_oklab,var(--accent-to)_22%,transparent),transparent_60%),radial-gradient(90%_80%_at_0%_100%,color-mix(in_oklab,var(--accent-from)_20%,transparent),transparent_60%),linear-gradient(160deg,rgb(255_255_255/0.75),rgb(240_243_255/0.5))]",
        "shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_40px_80px_-40px_rgb(40_40_120/0.45)]",
        "dark:border-white/[0.08] dark:bg-[radial-gradient(120%_90%_at_80%_0%,color-mix(in_oklab,var(--accent-to)_26%,transparent),transparent_60%),radial-gradient(90%_80%_at_0%_100%,color-mix(in_oklab,var(--accent-from)_24%,transparent),transparent_60%),linear-gradient(160deg,#0d1430,#0a1022)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]",
        className,
      )}
      style={{ animation: "hero-art-in 1.1s var(--ease-out) 200ms both" }}
    >
      {/* Faint technical grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgb(90_100_200/0.07)_1px,transparent_1px),linear-gradient(90deg,rgb(90_100_200/0.07)_1px,transparent_1px)] [mask-image:radial-gradient(80%_80%_at_50%_50%,#000,transparent)] bg-[size:32px_32px]" />
      {children}
    </div>
  );
}

/** Small frosted label used inside the visuals. */
export function GlassChip({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "absolute flex items-center gap-2 rounded-2xl border border-white/80 bg-white/75 px-3.5 py-2.5 text-[0.8125rem] font-semibold text-ink shadow-[0_14px_30px_-16px_rgb(40_40_120/0.5)] backdrop-blur-xl",
        "dark:border-white/10 dark:bg-white/[0.07]",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
