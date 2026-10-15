import { cn } from "@/lib/utils";

/**
 * Slow-drifting blurred colour fields. Pure CSS (transform-only animation, GPU-composited),
 * so it costs no JavaScript. Colours come from theme tokens: soft in light, glowing in dark.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div
        className="aurora-blob top-[-22%] right-[-12%] aspect-square w-[62%] min-w-[22rem] bg-[var(--aurora-1)]"
        style={{ animation: "aurora-drift-a 18s ease-in-out infinite" }}
      />
      <div
        className="aurora-blob bottom-[-18%] left-[14%] aspect-square w-[44%] min-w-[16rem] bg-[var(--aurora-2)]"
        style={{ animation: "aurora-drift-b 22s ease-in-out infinite" }}
      />
      <div
        className="aurora-blob top-[28%] left-[-10%] aspect-square w-[34%] min-w-[14rem] bg-[var(--aurora-3)]"
        style={{ animation: "aurora-drift-a 26s ease-in-out infinite reverse" }}
      />
      <div className="grid-lines absolute inset-0" />
    </div>
  );
}
