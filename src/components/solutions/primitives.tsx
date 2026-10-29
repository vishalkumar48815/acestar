import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Img } from "@/content/solutions/types";
import { cn } from "@/lib/utils";

/** Pastel tints shared with the homepage solution cards (top → bottom of the card gradient). */
export const tones = {
  violet: ["#f1edff", "#e9e4fd"],
  rose: ["#fff0f6", "#fce6ef"],
  sky: ["#ecf4ff", "#e3eefd"],
  mint: ["#ebf8f5", "#e2f4ef"],
  peach: ["#fff4ea", "#fdede0"],
} as const;
export type Tone = keyof typeof tones;
export const toneCycle: Tone[] = ["violet", "sky", "mint", "rose", "peach"];

export const toneStyle = (tone: Tone) => ({ "--tone-a": tones[tone][0], "--tone-b": tones[tone][1] }) as CSSProperties;

/** Soft pastel card surface (light) / deep glass (dark), as used on the homepage. */
export const toneCard = cn(
  "relative isolate overflow-hidden rounded-[1.25rem] border border-white/90",
  "bg-[linear-gradient(170deg,var(--tone-a),var(--tone-b))]",
  "shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_1px_2px_rgb(30_40_90/0.05)]",
  "dark:border-white/[0.08] dark:bg-[linear-gradient(170deg,color-mix(in_oklab,var(--tone-a)_9%,#0d1426),#0b1222)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.05)]",
);

/** Plain glass panel used for tables, catalogues and dialogs. */
export const panel = cn(
  "rounded-[1.5rem] border border-white/80 bg-white/60 shadow-[0_1px_2px_rgb(30_40_90/0.05),0_24px_48px_-32px_rgb(40_50_120/0.25)] backdrop-blur-xl",
  "dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-none",
);

/** Cursor spotlight + gradient rim; place inside a `group/card` element with `data-spotlight`. */
export const spotlight = cn(
  "pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500",
  "group-hover/card:opacity-100",
  "bg-[radial-gradient(260px_circle_at_var(--sx,50%)_var(--sy,30%),color-mix(in_oklab,var(--accent-from)_14%,transparent),transparent_70%)]",
  "after:absolute after:inset-0 after:rounded-[inherit] after:p-px after:content-['']",
  "after:bg-[radial-gradient(220px_circle_at_var(--sx,50%)_var(--sy,30%),var(--accent-from),var(--accent-to)_45%,transparent_80%)]",
  "after:[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]",
);

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-gradient text-[0.6875rem] font-semibold tracking-[0.34em] uppercase sm:text-xs", className)}>
      {children}
    </p>
  );
}

type HeadProps = {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "start" | "center";
  id?: string;
  className?: string;
};

/** Section heading in the homepage style: gradient eyebrow, bold ink title, muted lead. */
export function SectionHead({ eyebrow, title, body, align = "start", id, className }: HeadProps) {
  return (
    <div
      data-reveal
      suppressHydrationWarning
      className={cn("flex max-w-2xl flex-col", align === "center" && "mx-auto items-center text-center", className)}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        id={id}
        className={cn(
          "font-display text-[clamp(1.75rem,1.15rem+2vw,2.625rem)] leading-[1.1] font-bold tracking-[-0.035em] text-balance text-ink",
          eyebrow && "mt-4",
        )}
      >
        {title}
      </h2>
      {body ? (
        <p className="mt-4 text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] leading-relaxed text-pretty text-fg-muted">
          {body}
        </p>
      ) : null}
    </div>
  );
}

/** Vertical rhythm for page sections (kept compact on purpose). */
export function Section({
  id,
  labelledBy,
  className,
  children,
}: {
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("scroll-mt-28 py-12 lg:py-16", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

/** Square app/product icon; falls back to a lettered tile when the image is missing. */
export function AppIcon({ icon, name, className }: { icon?: Img; name: string; className?: string }) {
  if (icon) {
    return (
      <Image
        src={icon.src}
        width={icon.width}
        height={icon.height}
        alt=""
        sizes="64px"
        className={cn("size-12 shrink-0 object-contain", className)}
      />
    );
  }
  const letters = name
    .replace(/^(Adobe|Autodesk|Boris FX|Acrobat)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-12 shrink-0 place-items-center rounded-xl bg-[image:var(--btn-gradient)] text-sm font-bold tracking-tight text-white",
        className,
      )}
    >
      {letters || name[0]}
    </span>
  );
}

/** Tick / cross used in comparison tables. */
export function Mark({ on }: { on: boolean }) {
  return on ? (
    <span className="inline-grid size-6 place-items-center rounded-full bg-[image:var(--btn-gradient)] text-white">
      <svg
        viewBox="0 0 24 24"
        className="size-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <span className="sr-only">Included</span>
    </span>
  ) : (
    <span className="inline-grid size-6 place-items-center rounded-full bg-fg/[0.06] text-fg-subtle">
      <svg
        viewBox="0 0 24 24"
        className="size-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        aria-hidden="true"
      >
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
      <span className="sr-only">Not included</span>
    </span>
  );
}

/**
 * Ultra-wide brand artwork from the old site (≈5:1, logo on the right) shown as a strip,
 * with the brand name over a dark scrim on the left.
 */
export function BannerStrip({
  banner,
  title,
  logo,
  kicker,
  as: Tag = "h3",
  id,
}: {
  banner?: Img;
  title: string;
  logo?: Img;
  kicker?: string;
  as?: "h2" | "h3";
  id?: string;
}) {
  return (
    <div className="relative isolate flex aspect-[2.6/1] items-end overflow-hidden bg-[linear-gradient(120deg,#1b1f4a,#2b2a7a_55%,#5b3cc4)] sm:aspect-[4/1] lg:aspect-[5/1]">
      {banner ? (
        <Image
          src={banner.src}
          alt=""
          fill
          sizes="(min-width: 1216px) 1152px, 100vw"
          className="-z-10 object-cover object-right"
        />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(8_10_30/0.72),rgb(8_10_30/0.25)_55%,transparent)]"
      />
      <div className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:p-7 lg:p-9">
        {logo ? (
          <span className="grid h-11 min-w-11 place-items-center rounded-xl bg-white px-2.5 shadow-[0_8px_20px_-10px_rgb(0_0_0/0.5)]">
            <Image
              src={logo.src}
              width={logo.width}
              height={logo.height}
              alt=""
              sizes="120px"
              className="h-6 w-auto max-w-[6.5rem] object-contain"
            />
          </span>
        ) : null}
        <div>
          {kicker ? <p className="font-mono text-xs tracking-widest text-white/70">{kicker}</p> : null}
          <Tag
            id={id}
            className="font-display text-[clamp(1.375rem,1.05rem+1.3vw,2.25rem)] leading-tight font-bold tracking-[-0.03em] text-white"
          >
            {title}
          </Tag>
        </div>
      </div>
    </div>
  );
}
