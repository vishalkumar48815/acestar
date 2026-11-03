import Image from "next/image";
import type { Img } from "@/content/solutions/types";
import { cn } from "@/lib/utils";

/**
 * Hero visual: logos on white tiles in a gently floating 3×3 grid over a soft brand glow.
 * Pure CSS motion (respects reduced motion via the global rule).
 */
export function LogoWall({ logos, className }: { logos: Img[]; className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[34rem]", className)} aria-hidden="true">
      <div className="absolute inset-[8%] -z-10 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent-to)_30%,transparent),color-mix(in_oklab,var(--accent-from)_14%,transparent)_45%,transparent_72%)] blur-2xl" />
      <ul className="grid grid-cols-3 gap-3 sm:gap-4">
        {logos.slice(0, 9).map((logo, i) => (
          <li
            key={`${logo.src}-${i}`}
            className={cn(i % 3 === 1 && "translate-y-6 sm:translate-y-8")}
            style={{ animation: `fade-up 0.9s var(--ease-out) ${200 + i * 70}ms both` }}
          >
            <div
              className="relative aspect-[4/3] rounded-2xl border border-white/90 bg-white shadow-[0_18px_40px_-22px_rgb(40_40_120/0.45)] sm:rounded-[1.25rem] dark:border-white/10"
              style={{ animation: `float-y ${6 + (i % 3)}s ease-in-out ${i * 0.45}s infinite` }}
            >
              <Image
                src={logo.src}
                width={logo.width}
                height={logo.height}
                alt=""
                sizes="160px"
                className="absolute inset-0 h-full w-full object-contain p-3 sm:p-4"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
