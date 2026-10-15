import Image from "next/image";
import type { ImageAsset } from "@/content/media";
import { cn } from "@/lib/utils";

/**
 * Infinite logo strip (CSS only). The list is rendered twice for a seamless loop; the
 * second copy is hidden from assistive tech. Pauses on hover; static for reduced motion.
 */
export function LogoMarquee({
  logos,
  label,
  reverse = false,
  speed = 45,
}: {
  logos: ImageAsset[];
  label: string;
  reverse?: boolean;
  speed?: number;
}) {
  return (
    <div
      className="marquee relative overflow-hidden"
      style={{ maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)" }}
    >
      <div
        className="marquee-track flex w-max"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-label={copy === 0 ? label : undefined}
            aria-hidden={copy === 1 ? true : undefined}
            className="flex shrink-0 items-center gap-4 pr-4 md:gap-6 md:pr-6"
          >
            {logos.map((logo) => (
              <li
                key={logo.src}
                className={cn(
                  "grid h-20 w-40 shrink-0 place-items-center rounded-2xl bg-white px-4 shadow-[0_8px_24px_-14px_rgb(16_60_120/0.35)] md:h-24 md:w-48",
                  "dark:bg-white/95",
                )}
              >
                <Image
                  src={logo.src}
                  alt={copy === 0 ? logo.alt : ""}
                  width={logo.width}
                  height={logo.height}
                  sizes="192px"
                  className="max-h-[78%] w-auto object-contain"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
