import { NeuralField } from "@/components/motion/neural-field";
import { Sparkles } from "@/components/ui/icons";
import { GlassChip, VisualFrame } from "./visual-frame";

/** Teams as a living network: the homepage neural field, with open teams floating as nodes. */
export function CareersVisual({ teams }: { teams: string[] }) {
  const spots = [
    "top-[12%] left-[8%]",
    "top-[20%] right-[8%]",
    "bottom-[30%] left-[4%]",
    "bottom-[14%] right-[10%]",
    "top-[46%] right-[2%]",
  ];
  return (
    <VisualFrame>
      <NeuralField className="absolute inset-0 h-full w-full" />

      {/* "You" at the centre of the network */}
      <div className="absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center">
        <span className="absolute size-24 [animation:vis-ping_2.8s_ease-out_infinite] rounded-full bg-[color-mix(in_oklab,var(--accent-from)_30%,transparent)]" />
        <span className="absolute size-24 [animation:vis-ping_2.8s_ease-out_1.4s_infinite] rounded-full bg-[color-mix(in_oklab,var(--accent-to)_25%,transparent)]" />
        <span className="relative grid size-20 place-items-center rounded-full bg-[image:var(--btn-gradient)] text-white shadow-[var(--btn-gradient-shadow)]">
          <span className="flex flex-col items-center leading-none">
            <Sparkles className="mb-1 size-5" />
            <span className="text-sm font-bold">You</span>
          </span>
        </span>
      </div>

      {teams.slice(0, spots.length).map((team, i) => (
        <GlassChip
          key={team}
          className={spots[i]}
          style={{ animation: `vis-float ${6 + i}s ease-in-out ${i * -1.3}s infinite` }}
        >
          <span className="size-2 rounded-full bg-[image:var(--btn-gradient)]" />
          {team}
        </GlassChip>
      ))}
    </VisualFrame>
  );
}
