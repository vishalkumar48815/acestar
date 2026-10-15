import { ArrowRight, MessageCircle } from "@/components/ui/icons";
import { PointerGlow } from "@/components/motion/pointer-glow";
import { Aurora } from "@/components/ui/aurora";
import { ButtonLink } from "@/components/ui/button";
import { hero, heroCards } from "@/content/home";
import { site } from "@/content/site";
import { whatsappLink } from "@/lib/utils";

/** Staggered entrance driven by CSS only, so the hero paints without waiting for JavaScript. */
const enter = (delay: number) => ({ animation: `fade-up 0.9s var(--ease-out) ${delay}ms both` });

export function Hero() {
  return (
    <PointerGlow className="isolate overflow-hidden">
      <section
        aria-labelledby="hero-title"
        className="relative flex min-h-[min(88svh,46rem)] items-center pt-28 pb-12 md:pt-32"
      >
        <Aurora />
        {/* Cursor-following light, visible on mouse devices only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover/glow:opacity-100"
          style={{
            background:
              "radial-gradient(520px circle at var(--mx, 50%) var(--my, 40%), var(--cursor-glow), transparent 65%)",
          }}
        />

        <div className="container-page grid items-center gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">
          <div className="flex flex-col items-start">
            <span
              className="inline-flex max-w-full items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.8125rem] font-semibold text-brand-ink glass"
              style={enter(0)}
            >
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
              {hero.badge}
            </span>

            <h1 id="hero-title" className="mt-6 text-display">
              {hero.titleLines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <span className="block" style={{ animation: `line-up 1s var(--ease-out) ${120 + i * 110}ms both` }}>
                    {line.endsWith(hero.accentWord) ? (
                      <>
                        {line.slice(0, -hero.accentWord.length)}
                        <span className="text-gradient">{hero.accentWord}</span>
                      </>
                    ) : (
                      line
                    )}
                  </span>
                </span>
              ))}
            </h1>

            <p className="mt-6 max-w-[34rem] text-lead text-fg-muted" style={enter(380)}>
              {hero.lead}
            </p>

            <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row" style={enter(500)}>
              <ButtonLink href={hero.primaryCta.href} className="w-full sm:w-auto">
                {hero.primaryCta.label}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </ButtonLink>
              <ButtonLink
                href={whatsappLink(site.contact.whatsapp.number, site.whatsappGreeting)}
                variant="glass"
                className="w-full sm:w-auto"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                {hero.secondaryCtaLabel}
              </ButtonLink>
            </div>
          </div>

          <ul aria-label="Acestar at a glance" className="relative grid gap-4">
            {heroCards.map((card, i) => (
              <li
                key={card.label}
                className="rounded-3xl p-5 glass sm:p-6"
                style={{
                  ...enter(520 + i * 120),
                  marginLeft: i === 1 ? "clamp(0px, 8%, 3rem)" : undefined,
                }}
              >
                <div style={{ animation: `float-y ${7 + i}s ease-in-out ${i * 0.8}s infinite` }}>
                  {i === 0 ? (
                    <>
                      <p className="font-display text-[2.5rem] leading-none font-extrabold tracking-[-0.03em] tabular-nums">
                        {card.value}
                      </p>
                      <p className="mt-2 text-sm text-fg-muted">{card.label}</p>
                    </>
                  ) : (
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 min-w-16 shrink-0 place-items-center rounded-2xl bg-brand px-2.5 font-display text-[0.95rem] font-extrabold text-white tabular-nums">
                        {card.value}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold">{card.label}</span>
                        <span className="block text-sm text-fg-muted">{card.sub}</span>
                      </span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PointerGlow>
  );
}
