import Image from "next/image";
import Link from "next/link";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import { ArrowRight } from "@/components/ui/icons";
import { solutions } from "@/content/home";
import { cn } from "@/lib/utils";

/** Pastel tint per card (top → bottom of the card gradient), as in the design. */
const tones: Record<(typeof solutions.items)[number]["key"], [string, string]> = {
  ai: ["#f1edff", "#e9e4fd"],
  creative: ["#fff0f6", "#fce6ef"],
  computers: ["#ecf4ff", "#e3eefd"],
  workflow: ["#ebf8f5", "#e2f4ef"],
  techcare: ["#fff4ea", "#fdede0"],
};

const card = cn(
  "group/card relative isolate flex h-full min-h-[23rem] flex-col overflow-hidden rounded-[1.25rem] p-6 pb-5",
  "border border-white/90 bg-[linear-gradient(170deg,var(--tone-a),var(--tone-b))]",
  "shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_1px_2px_rgb(30_40_90/0.05)]",
  "transition-[transform,box-shadow] duration-500 ease-out-expo",
  "hover:-translate-y-1.5 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_24px_44px_-22px_rgb(70_70_180/0.35)]",
  "focus-visible:-translate-y-1.5",
  "dark:border-white/[0.08] dark:bg-[linear-gradient(170deg,color-mix(in_oklab,var(--tone-a)_9%,#0d1426),#0b1222)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.05)]",
);

/* Cursor spotlight (fill) + gradient rim (masked ::after), both following --sx/--sy */
const glow = cn(
  "pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500",
  "group-hover/card:opacity-100 group-focus-visible/card:opacity-100",
  "bg-[radial-gradient(260px_circle_at_var(--sx,50%)_var(--sy,30%),color-mix(in_oklab,var(--accent-from)_16%,transparent),transparent_70%)]",
  "after:absolute after:inset-0 after:rounded-[inherit] after:p-px after:content-['']",
  "after:bg-[radial-gradient(220px_circle_at_var(--sx,50%)_var(--sy,30%),var(--accent-from),var(--accent-to)_45%,transparent_80%)]",
  "after:[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]",
);

const arrow = cn(
  "grid size-10 place-items-center rounded-full transition-all duration-300",
  "bg-white text-ink shadow-[0_4px_12px_-4px_rgb(30_40_90/0.18)]",
  "group-hover/card:bg-[image:var(--btn-gradient)] group-hover/card:text-white group-hover/card:shadow-[var(--btn-gradient-shadow)]",
  "group-focus-visible/card:bg-[image:var(--btn-gradient)] group-focus-visible/card:text-white",
  "dark:bg-white/[0.08] dark:text-fg dark:shadow-none",
);

export function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="scroll-mt-24 pt-8 pb-20 lg:pt-12 lg:pb-24">
      <div className="container-page">
        <div data-reveal suppressHydrationWarning className="flex flex-col items-center text-center">
          <p className="text-gradient text-[0.6875rem] font-semibold tracking-[0.34em] uppercase sm:text-xs">
            {solutions.eyebrow}
          </p>
          <h2
            id="solutions-title"
            className="mt-4 font-display text-[clamp(1.875rem,1.15rem+2.3vw,2.875rem)] leading-[1.1] font-bold tracking-[-0.035em] text-ink"
          >
            {solutions.title}
          </h2>
        </div>
      </div>

      {/* Below lg: swipeable row that bleeds to the screen edge. lg+: five-column grid. */}
      <CardSpotlight className="container-page mt-10 max-lg:max-w-none max-lg:px-0 lg:mt-12">
        <ul className="flex snap-x snap-mandatory scroll-px-5 [scrollbar-width:none] gap-4 overflow-x-auto px-5 pt-2 pb-6 md:scroll-px-8 md:px-8 lg:grid lg:grid-cols-5 lg:overflow-visible lg:p-0 [&::-webkit-scrollbar]:hidden">
          {solutions.items.map((item, i) => (
            <li
              key={item.key}
              data-reveal
              suppressHydrationWarning
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className="w-[74%] shrink-0 snap-start sm:w-[44%] md:w-[31%] lg:w-auto"
            >
              <Link
                href={item.href}
                data-spotlight
                className={card}
                style={{ "--tone-a": tones[item.key][0], "--tone-b": tones[item.key][1] } as React.CSSProperties}
              >
                {/* Cursor spotlight + gradient rim on hover */}
                <span aria-hidden="true" className={glow} />

                <div className="relative h-36 xl:h-40">
                  <Image
                    src={item.image.src}
                    width={item.image.width}
                    height={item.image.height}
                    alt=""
                    sizes="(min-width: 1024px) 220px, 60vw"
                    className="absolute inset-0 m-auto h-full w-full object-contain drop-shadow-[0_18px_22px_rgb(60_60_140/0.16)] transition-transform duration-700 ease-out-expo group-hover/card:-translate-y-1.5 group-hover/card:scale-[1.06]"
                  />
                </div>

                <h3 className="mt-6 text-[1.0625rem] leading-snug font-semibold tracking-[-0.015em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-fg-muted">{item.body}</p>

                <span className="mt-auto pt-6">
                  <span className={arrow}>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover/card:translate-x-0.5"
                    />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CardSpotlight>
    </section>
  );
}
