import Image from "next/image";
import Link from "next/link";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import { spotlight, toneCard, toneCycle, toneStyle } from "@/components/solutions/primitives";
import { ArrowUpRight } from "@/components/ui/icons";
import type { AiTool } from "@/content/solutions/ai";
import { cn } from "@/lib/utils";

/** Compact grid of the AI tools Acestar delivers: icon, name, use-case tag and one line. */
export function AiTools({ tools }: { tools: AiTool[] }) {
  return (
    <CardSpotlight>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t, i) => {
          const title = t.vendor ? `${t.vendor} ${t.name}` : t.name;
          return (
            <li
              key={title}
              data-reveal
              suppressHydrationWarning
              style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
            >
              <article
                data-spotlight
                className={cn(
                  toneCard,
                  "group/card flex h-full flex-col p-6 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_24px_44px_-28px_rgb(70_70_180/0.45)]",
                )}
                style={toneStyle(toneCycle[i % toneCycle.length])}
              >
                <span aria-hidden="true" className={spotlight} />
                <div className="flex items-start justify-between gap-3">
                  <span className="relative grid size-14 place-items-center rounded-2xl bg-white shadow-[0_10px_24px_-14px_rgb(40_40_120/0.45)] ring-1 ring-white/80 dark:bg-white/[0.08] dark:ring-white/10">
                    {/* soft AI glow behind the icon */}
                    <span
                      aria-hidden="true"
                      className="absolute -inset-2 -z-10 rounded-[1.25rem] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent-to)_30%,transparent),transparent)] opacity-0 blur-md transition-opacity duration-500 group-hover/card:opacity-100"
                    />
                    <Image
                      src={t.icon.src}
                      alt=""
                      width={36}
                      height={36}
                      unoptimized={t.icon.src.endsWith(".svg")}
                      className={cn(
                        "size-9 object-contain transition-transform duration-500 ease-out-expo group-hover/card:scale-110",
                        t.icon.darkInvert && "dark:invert",
                      )}
                    />
                  </span>
                  <span className="rounded-full bg-white/80 px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide text-brand-ink dark:bg-white/[0.06]">
                    {t.tag}
                  </span>
                </div>
                <h3 className="mt-5 leading-tight">
                  {t.vendor ? (
                    <span className="block text-[0.6875rem] font-medium tracking-[0.14em] text-fg-subtle uppercase">
                      {t.vendor}
                    </span>
                  ) : null}
                  <span className="block text-[1.1875rem] font-semibold tracking-[-0.015em] text-ink">{t.name}</span>
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{t.body}</p>
                {t.href ? (
                  <Link
                    href={t.href}
                    className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-ink after:absolute after:inset-0 after:content-['']"
                  >
                    Learn more
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                    />
                    <span className="sr-only">about {title}</span>
                  </Link>
                ) : null}
              </article>
            </li>
          );
        })}
      </ul>
    </CardSpotlight>
  );
}
