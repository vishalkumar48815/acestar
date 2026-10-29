import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import { ArrowRight } from "@/components/ui/icons";
import { solutionTree } from "@/content/solutions";
import type { CompareTable as Table, Feature, Img, Stat, Step } from "@/content/solutions/types";
import { cn } from "@/lib/utils";
import { AppIcon, Mark, SectionHead, panel, spotlight, toneCard, toneCycle, toneStyle, type Tone } from "./primitives";

const delay = (i: number) => ({ "--reveal-delay": `${i * 70}ms` }) as CSSProperties;

/* ---------------------------------------------------------------- Stats */

export function StatStrip({ stats, className }: { stats: Stat[]; className?: string }) {
  return (
    <dl className={cn(panel, "grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0", className)}>
      {stats.map((s, i) => (
        <div
          key={s.label}
          data-reveal
          suppressHydrationWarning
          style={delay(i)}
          className="flex flex-col gap-1.5 p-6 lg:p-8"
        >
          <dt className="order-2 text-[0.9375rem] leading-snug text-fg-muted">{s.label}</dt>
          <dd className="order-1 text-gradient font-display text-[clamp(1.375rem,1.05rem+1.1vw,2rem)] leading-tight font-extrabold tracking-[-0.035em]">
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------------------------------------------------------------- Feature cards */

type GridProps = {
  items: Feature[];
  columns?: 2 | 3 | 4;
  /** "icon" = small icon top-left; "image" = artwork band on top; "plain" = number badge. */
  variant?: "icon" | "image" | "plain";
  tone?: Tone | "cycle";
};

export function FeatureGrid({ items, columns = 3, variant = "plain", tone = "cycle" }: GridProps) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <CardSpotlight>
      <ul className={cn("grid gap-4", cols)}>
        {items.map((item, i) => {
          const t = tone === "cycle" ? toneCycle[i % toneCycle.length] : tone;
          return (
            <li key={item.title} data-reveal suppressHydrationWarning style={delay(i)}>
              <article
                data-spotlight
                className={cn(toneCard, "group/card flex h-full flex-col p-6")}
                style={toneStyle(t)}
              >
                <span aria-hidden="true" className={spotlight} />
                {variant === "image" && item.image ? (
                  <div className="-mx-6 -mt-6 mb-5 overflow-hidden">
                    <Image
                      src={item.image.src}
                      width={item.image.width}
                      height={item.image.height}
                      alt={item.image.alt}
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.04]"
                    />
                  </div>
                ) : null}
                {variant === "icon" ? <AppIcon icon={item.icon} name={item.title} className="mb-5" /> : null}
                {variant === "plain" ? (
                  <span className="mb-5 font-mono text-xs font-medium tracking-widest text-brand-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ) : null}
                <h3 className="text-[1.0625rem] leading-snug font-semibold tracking-[-0.015em] text-ink">
                  {item.title}
                </h3>
                {item.body ? (
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-fg-muted">{item.body}</p>
                ) : null}
              </article>
            </li>
          );
        })}
      </ul>
    </CardSpotlight>
  );
}

/* ---------------------------------------------------------------- Alternating image rows */

export function SplitRows({ items }: { items: Feature[] }) {
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {items.map((item, i) => (
        <article
          key={item.title}
          data-reveal
          suppressHydrationWarning
          className={cn(panel, "grid items-center gap-6 overflow-hidden p-4 sm:p-6 md:grid-cols-2 lg:gap-12 lg:p-8")}
        >
          {item.image ? (
            <div className={cn("overflow-hidden rounded-[1.125rem]", i % 2 === 1 && "md:order-2")}>
              <Image
                src={item.image.src}
                width={item.image.width}
                height={item.image.height}
                alt={item.image.alt}
                sizes="(min-width: 768px) 520px, 92vw"
                className="w-full object-cover"
              />
            </div>
          ) : null}
          <div className="px-2 pb-2 sm:px-0 sm:pb-0">
            <span className="font-mono text-xs tracking-widest text-brand-ink">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] leading-tight font-bold tracking-[-0.03em] text-balance text-ink">
              {item.title}
            </h3>
            <p className="mt-3 leading-relaxed text-fg-muted">{item.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- Steps */

export function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Connecting line on wide screens */}
      <span
        aria-hidden="true"
        className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-[linear-gradient(90deg,transparent,var(--accent-from),var(--accent-to),transparent)] opacity-40 lg:block"
      />
      {steps.map((s, i) => (
        <li
          key={s.title}
          data-reveal
          suppressHydrationWarning
          style={delay(i)}
          className="relative flex flex-col items-start lg:items-center lg:text-center"
        >
          <span className="grid size-14 place-items-center rounded-full bg-[image:var(--btn-gradient)] font-display text-lg font-bold text-white shadow-[var(--btn-gradient-shadow)]">
            {i + 1}
          </span>
          <h3 className="mt-5 text-[1.125rem] font-semibold tracking-[-0.015em] text-ink">{s.title}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- Comparison table */

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") return <Mark on={value} />;
  return <span className="text-[0.875rem] leading-snug font-medium text-fg">{value}</span>;
}

export function CompareTable({ table }: { table: Table }) {
  return (
    <div data-reveal suppressHydrationWarning className={cn(panel, "overflow-hidden")}>
      <div className="[scrollbar-width:thin] overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <caption className="sr-only">{table.caption}</caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky left-0 z-10 w-[34%] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] p-4 backdrop-blur-xl sm:p-5"
              >
                <span className="sr-only">Feature</span>
              </th>
              {table.columns.map((c, i) => (
                <th key={c} scope="col" className="p-4 align-bottom sm:p-5">
                  <span
                    className={cn(
                      "block text-[0.9375rem] leading-snug font-semibold text-ink",
                      i === 0 && "text-gradient",
                    )}
                  >
                    {c}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          {table.groups.map((g, gi) => (
            <tbody key={g.title ?? gi}>
              {g.title ? (
                <tr>
                  <th
                    colSpan={table.columns.length + 1}
                    scope="colgroup"
                    className="border-t border-line bg-brand-soft/60 px-4 py-2.5 text-eyebrow text-brand-ink sm:px-5"
                  >
                    {g.title}
                  </th>
                </tr>
              ) : null}
              {g.rows.map((r) => (
                <tr key={r.label} className="border-t border-line transition-colors hover:bg-brand-soft/40">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] p-4 text-[0.875rem] leading-snug font-normal text-fg-muted backdrop-blur-xl sm:p-5"
                  >
                    {r.label}
                  </th>
                  {r.cells.map((c, ci) => (
                    <td key={ci} className="p-4 align-middle sm:p-5">
                      <Cell value={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      {table.note ? <p className="border-t border-line p-4 text-sm text-fg-subtle sm:p-5">{table.note}</p> : null}
    </div>
  );
}

/* ---------------------------------------------------------------- Image marquee */

export function Marquee({ images }: { images: Img[] }) {
  const row = [...images, ...images];
  return (
    <div className="group/marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <ul className="flex w-max [animation:marquee_60s_linear_infinite] group-hover/marquee:[animation-play-state:paused] motion-reduce:[animation:none]">
        {row.map((img, i) => (
          <li key={`${img.src}-${i}`} aria-hidden={i >= images.length ? true : undefined} className="shrink-0 pr-4">
            <Image
              src={img.src}
              width={img.width}
              height={img.height}
              alt={i >= images.length ? "" : img.alt}
              sizes="320px"
              className="h-52 w-auto rounded-[1.25rem] object-cover sm:h-64"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------------- Related solutions */

/** "Explore more" cards linking to the other solution pages (and inner pages). */
export function RelatedSolutions({ current }: { current: string }) {
  const items = solutionTree.filter((n) => n.key !== current);
  return (
    <section aria-labelledby="related-title" className="py-12 lg:py-16">
      <div className="container-page">
        <SectionHead eyebrow="Explore more" title="More from Acestar" id="related-title" />
        <CardSpotlight className="mt-8">
          <ul className="grid gap-4 sm:grid-cols-3">
            {items.map((n, i) => (
              <li key={n.key} data-reveal suppressHydrationWarning style={delay(i)}>
                <div
                  data-spotlight
                  className={cn(toneCard, "group/card flex h-full flex-col p-6")}
                  style={toneStyle(toneCycle[(i + 1) % toneCycle.length])}
                >
                  <span aria-hidden="true" className={spotlight} />
                  <Link href={n.href} className="after:absolute after:inset-0 after:content-['']">
                    <h3 className="text-[1.125rem] font-semibold tracking-[-0.015em] text-ink">{n.label}</h3>
                  </Link>
                  <p className="mt-2 text-[0.9375rem] text-fg-muted">{n.description}</p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                    {n.children?.[0] ? (
                      <Link
                        href={n.children[0].href}
                        className="relative z-10 rounded-full border border-line bg-white/70 px-3 py-1.5 text-[0.8125rem] font-medium text-fg-muted transition-colors hover:text-fg dark:bg-white/[0.04]"
                      >
                        {n.children[0].label}
                      </Link>
                    ) : (
                      <span />
                    )}
                    <span className="grid size-10 place-items-center rounded-full bg-white text-ink shadow-[0_4px_12px_-4px_rgb(30_40_90/0.18)] transition-all duration-300 group-hover/card:bg-[image:var(--btn-gradient)] group-hover/card:text-white dark:bg-white/[0.08] dark:text-fg">
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardSpotlight>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Promo card for an inner page */

export function InnerPagePromo({
  eyebrow,
  title,
  body,
  href,
  label,
  image,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  label: string;
  image?: Img;
}) {
  return (
    <Link
      href={href}
      data-reveal
      suppressHydrationWarning
      className="group/promo relative isolate grid items-center gap-6 overflow-hidden rounded-[1.75rem] bg-[linear-gradient(120deg,#1b1f4a,#2b2a7a_55%,#5b3cc4)] p-6 text-white sm:p-10 md:grid-cols-[1.2fr_1fr] lg:p-12"
    >
      <span
        aria-hidden="true"
        className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-[radial-gradient(circle,rgb(180_140_255/0.55),transparent_70%)] transition-transform duration-700 group-hover/promo:scale-125"
      />
      <div>
        <p className="text-[0.6875rem] font-semibold tracking-[0.34em] text-white/70 uppercase sm:text-xs">{eyebrow}</p>
        <h2 className="mt-3 font-display text-[clamp(1.625rem,1.1rem+1.8vw,2.5rem)] leading-[1.1] font-bold tracking-[-0.035em] text-balance">
          {title}
        </h2>
        <p className="mt-3 max-w-lg leading-relaxed text-white/75">{body}</p>
        <span className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-[#1b1f4a] transition-transform duration-300 group-hover/promo:-translate-y-0.5">
          {label}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover/promo:translate-x-1"
          />
        </span>
      </div>
      {image ? (
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          sizes="(min-width: 768px) 420px, 90vw"
          className="w-full rounded-2xl object-cover shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] transition-transform duration-700 ease-out-expo group-hover/promo:scale-[1.03]"
        />
      ) : null}
    </Link>
  );
}
