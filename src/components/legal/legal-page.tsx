import Link from "next/link";
import { ChevronRight } from "@/components/ui/icons";
import { type LegalPage, legalPages } from "@/content/legal";
import { cn } from "@/lib/utils";

const enter = (delay: number) => ({ animation: `fade-up 0.9s var(--ease-out) ${delay}ms both` });

/** Policy page: title, the old site's wording section by section, and links to the other policies. */
export function LegalPageView({ page }: { page: LegalPage }) {
  return (
    <article className="relative isolate pb-20 lg:pb-28">
      <div
        aria-hidden="true"
        className="art-frame -z-10 h-[30rem] bg-[radial-gradient(60%_70%_at_85%_10%,color-mix(in_oklab,var(--accent-to)_14%,transparent),transparent_70%),radial-gradient(50%_60%_at_5%_0%,color-mix(in_oklab,var(--accent-from)_10%,transparent),transparent_70%)]"
      />
      <header className="container-page pt-28 lg:pt-36">
        <nav aria-label="Breadcrumb" style={enter(0)}>
          <ol className="flex flex-wrap items-center gap-1 text-[0.8125rem] text-fg-subtle">
            <li>
              <Link href="/" className="hover:text-fg">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight aria-hidden="true" className="size-3.5 opacity-60" />
              <span aria-current="page">{page.title}</span>
            </li>
          </ol>
        </nav>
        <p
          className="mt-6 text-[0.6875rem] font-bold tracking-[0.34em] text-eyebrow-ink uppercase sm:text-xs"
          style={enter(60)}
        >
          Policies
        </p>
        <h1
          className="mt-4 font-display text-[clamp(1.75rem,1.2rem+2.8vw,3.5rem)] leading-[1.06] font-extrabold tracking-[-0.04em] text-balance text-ink"
          style={enter(140)}
        >
          {page.title}
        </h1>
      </header>

      <div className="container-page mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[14rem_1fr] lg:gap-16">
        <nav aria-label="Policies" className="lg:sticky lg:top-28 lg:self-start">
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {legalPages.map((p) => {
              const current = p.key === page.key;
              return (
                <li key={p.key}>
                  <Link
                    href={`/${p.slug}/`}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "block rounded-full border px-4 py-2 text-[0.875rem] font-medium transition-colors lg:rounded-xl lg:border-transparent",
                      current
                        ? "border-transparent bg-[color-mix(in_oklab,var(--eyebrow)_10%,transparent)] text-eyebrow-ink"
                        : "border-line text-fg-muted hover:text-fg",
                    )}
                  >
                    {p.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="max-w-[46rem] text-[1rem] leading-[1.75] text-fg-muted">
          {page.sections.map((s, i) => (
            <section key={s.heading ?? i} className={cn(i > 0 && "mt-9")}>
              {s.heading ? (
                <h2 className="mb-3 font-display text-[1.1875rem] leading-snug font-bold tracking-[-0.01em] text-ink">
                  {s.heading}
                </h2>
              ) : null}
              {s.body.map((p) => (
                <p key={p.slice(0, 40)} className="mt-3 first:mt-0">
                  {p}
                </p>
              ))}
              {s.list?.length ? (
                <ul className="mt-3 flex list-disc flex-col gap-3 pl-5 marker:text-eyebrow-ink">
                  {s.list.map((item) =>
                    typeof item === "string" ? (
                      <li key={item.slice(0, 40)}>{item}</li>
                    ) : (
                      <li key={item.text.slice(0, 40)}>
                        {item.text}
                        <ul className="mt-2 flex list-[lower-alpha] flex-col gap-2 pl-5">
                          {item.sub.map((x) => (
                            <li key={x.slice(0, 40)}>{x}</li>
                          ))}
                        </ul>
                      </li>
                    ),
                  )}
                </ul>
              ) : null}
              {s.link ? (
                <p className="mt-3">
                  <Link
                    href={s.link.href}
                    className="font-semibold text-eyebrow-ink underline-offset-4 hover:underline"
                  >
                    {s.link.label}
                  </Link>
                </p>
              ) : null}
            </section>
          ))}
          <p className="mt-12 border-t border-line pt-6 text-[0.875rem] text-fg-subtle">
            Acestar Sdn. Bhd. (Registration Number: 811773-K). All rights reserved.
          </p>
        </div>
      </div>
    </article>
  );
}
