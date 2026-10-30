import { NeuralField } from "@/components/motion/neural-field";
import { Check, Headset, Ticket } from "@/components/ui/icons";
import { GlassChip, VisualFrame } from "./visual-frame";

/** A support ticket moving through its stages, over a quiet neural field. Loops every 6s. */
export function SupportVisual() {
  const steps = ["Received", "In progress", "Resolved"];
  return (
    <VisualFrame>
      <NeuralField className="absolute inset-0 h-full w-full opacity-60" />

      {/* Card stack */}
      <div className="absolute top-1/2 left-1/2 w-[78%] max-w-[22rem] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-x-6 -top-3 h-full rounded-3xl border border-white/70 bg-white/40 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03]" />
        <div className="absolute inset-x-3 -top-1.5 h-full rounded-3xl border border-white/70 bg-white/55 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.05]" />
        <div className="relative rounded-3xl border border-white/80 bg-white/85 p-5 shadow-[0_30px_60px_-30px_rgb(40_40_120/0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111a36]/90">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[image:var(--btn-gradient)] text-white">
              <Ticket className="size-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-ink">Your support ticket</p>
              <p className="text-xs text-fg-subtle">Hardware · Apple</p>
            </div>
          </div>

          {/* Progress bar refills on a loop */}
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-line">
            <div className="h-full origin-left [animation:vis-fill_6s_var(--ease-out)_infinite] rounded-full bg-[image:var(--btn-gradient)]" />
          </div>

          <ol className="mt-4 grid grid-cols-3 gap-2">
            {steps.map((s, i) => (
              <li key={s} className="flex flex-col items-center gap-1.5 text-center">
                <span
                  className="grid size-7 place-items-center rounded-full text-xs font-bold"
                  style={{ animation: `vis-step 6s linear ${i * 1.6}s infinite both` }}
                >
                  {i === steps.length - 1 ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span className="text-[0.6875rem] font-medium text-fg-muted">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <GlassChip className="top-[8%] right-[6%]" style={{ animation: "vis-float 7s ease-in-out infinite" }}>
        <Headset className="size-4 text-brand-ink" /> Support team
        <span className="flex gap-0.5">
          {[0, 1, 2].map((d) => (
            <span
              key={d}
              className="size-1.5 rounded-full bg-brand-ink"
              style={{ animation: `vis-blink 1.2s ease-in-out ${d * 0.2}s infinite` }}
            />
          ))}
        </span>
      </GlassChip>
    </VisualFrame>
  );
}
