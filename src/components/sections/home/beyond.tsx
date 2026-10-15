import { ArrowUpRight } from "@/components/ui/icons";
import { PointerGlow } from "@/components/motion/pointer-glow";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { offerings } from "@/content/home";
import { cn } from "@/lib/utils";

/** TechCare, certification and community. TechCare leads as the larger card. */
export function Beyond() {
  return (
    <section aria-labelledby="beyond-title" className="relative py-14 md:py-20">
      <div className="container-page">
        <SectionHeading
          id="beyond-title"
          eyebrow="Beyond the box"
          title="We train, we care, we serve."
          lead="Hardware and licences are the start. These are the programmes that keep teams productive after go-live."
        />

        <div className="mt-8 grid gap-5 md:mt-10 lg:grid-cols-[1.25fr_1fr] lg:grid-rows-2">
          {offerings.map((item, i) => {
            const featured = i === 0;
            return (
              <PointerGlow
                key={item.key}
                className={cn("overflow-hidden rounded-[1.75rem] glass", featured && "lg:row-span-2")}
              >
                <article
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
                  className={cn("relative flex h-full flex-col gap-4 p-7 sm:p-9", featured && "lg:justify-end lg:p-11")}
                >
                  {/* Spotlight that follows the cursor */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/glow:opacity-100"
                    style={{
                      background:
                        "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), var(--cursor-glow), transparent 70%)",
                    }}
                  />
                  {featured ? (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-[var(--aurora-1)] blur-[70px]"
                    />
                  ) : null}

                  <span className="relative text-eyebrow text-brand-ink">{item.eyebrow}</span>
                  <h3
                    className={cn(
                      "relative font-display font-bold tracking-[-0.03em]",
                      featured ? "text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-[1.02]" : "text-heading",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className={cn("relative max-w-[30rem] text-fg-muted", featured && "text-lead")}>{item.body}</p>

                  {item.tags ? (
                    <ul className="relative mt-2 flex flex-wrap gap-2" aria-label="TechCare plans">
                      {item.tags.map((tag) => (
                        <li key={tag} className="rounded-full px-4 py-1.5 text-sm font-semibold glass-strong">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className={cn("relative pt-4", !featured && "mt-auto")}>
                    {featured ? (
                      <ButtonLink href={item.cta.href} external={item.cta.external} size="md">
                        {item.cta.label}
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                      </ButtonLink>
                    ) : (
                      <a
                        href={item.cta.href}
                        {...(item.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group/link inline-flex min-h-11 items-center gap-1.5 font-semibold"
                      >
                        {item.cta.label}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 text-brand-ink transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        />
                        {item.cta.external ? <span className="sr-only">(opens in a new tab)</span> : null}
                      </a>
                    )}
                  </div>
                </article>
              </PointerGlow>
            );
          })}
        </div>
      </div>
    </section>
  );
}
