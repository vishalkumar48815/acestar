import Image from "next/image";
import { cn } from "@/lib/utils";

type Tile = { src: string; width: number; height: number; label?: string };

/** Fixed bento layout on a 6×6 grid: big, top-right, tall right, two bottom-left. */
const AREAS = [
  { gridColumn: "1 / 5", gridRow: "1 / 4" },
  { gridColumn: "5 / 7", gridRow: "1 / 3" },
  { gridColumn: "5 / 7", gridRow: "3 / 7" },
  { gridColumn: "1 / 3", gridRow: "4 / 7" },
  { gridColumn: "3 / 5", gridRow: "4 / 7" },
];

/**
 * Hero visual: photos on glass tiles, staggered and gently floating over a brand glow.
 * Pure CSS motion (respects reduced motion via the global rule).
 */
export function FloatingCollage({ tiles, className }: { tiles: Tile[]; className?: string }) {
  const t = tiles.slice(0, 5);
  return (
    <div aria-hidden="true" className={cn("relative mx-auto w-full max-w-[34rem]", className)}>
      <div className="absolute inset-[6%] -z-10 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent-to)_32%,transparent),color-mix(in_oklab,var(--accent-from)_16%,transparent)_45%,transparent_72%)] blur-2xl" />
      <div
        className="grid grid-cols-6 grid-rows-[repeat(6,minmax(0,1fr))] gap-3 sm:gap-4"
        style={{ aspectRatio: "6 / 5" }}
      >
        {t.map((tile, i) => (
          <div
            key={tile.src}
            className="relative"
            style={{ ...AREAS[i], animation: `fade-up 0.9s var(--ease-out) ${200 + i * 90}ms both` }}
          >
            <div
              className="relative h-full overflow-hidden rounded-[1.25rem] border border-white/80 shadow-[0_24px_50px_-24px_rgb(40_40_120/0.55)] dark:border-white/10"
              style={{ animation: `float-y ${6 + (i % 3)}s ease-in-out ${i * 0.5}s infinite` }}
            >
              <Image src={tile.src} alt="" fill sizes="(min-width: 1024px) 360px, 60vw" className="object-cover" />
              {tile.label ? (
                <span className="absolute bottom-2 left-2 z-10 max-w-[85%] truncate rounded-full bg-white px-2.5 py-1 text-[0.6875rem] font-semibold text-[#0b1020] shadow-[0_4px_12px_-4px_rgb(0_0_0/0.35)] dark:bg-[#0b1222] dark:text-white">
                  {tile.label}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
