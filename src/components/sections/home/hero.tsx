import { ArrowRight } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/button";
import { hero } from "@/content/home";

/** Staggered entrance driven by CSS only, so the hero paints without waiting for JavaScript. */
const enter = (delay: number) => ({ animation: `fade-up 0.9s var(--ease-out) ${delay}ms both` });

const accentWords = new Set(hero.accent.split(" "));

/** Splits a headline line into plain text and its gradient (accent) tail. */
function splitLine(line: string) {
  const words = line.split(" ");
  let cut = words.length;
  while (cut > 0 && accentWords.has(words[cut - 1])) cut--;
  return { plain: words.slice(0, cut).join(" "), accent: words.slice(cut).join(" ") };
}

export function Hero() {
  const lastLine = hero.titleLines.length - 1;

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Rendered glass-ribbon artwork (light/dark × wide/portrait, see .hero-art in globals.css) */}
      <div
        aria-hidden="true"
        className="hero-art absolute inset-0 -z-20"
        style={{ animation: "hero-art-in 1.6s var(--ease-out) both" }}
      />
      {/* Melt the artwork into the page background */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-b from-transparent to-bg"
      />

      <div className="relative container-page flex min-h-[min(100svh,54rem)] items-center pt-[min(80vw,34rem)] pb-16 lg:min-h-[min(100svh,50rem)] lg:pt-32 lg:pb-24">
        <div className="flex max-w-[48rem] flex-col items-start">
          <p
            className="text-gradient text-[0.6875rem] font-semibold tracking-[0.34em] uppercase sm:text-xs"
            style={enter(0)}
          >
            {hero.eyebrow.map((item, i) => (
              <span key={item}>
                {i > 0 && (
                  <span aria-hidden="true" className="mx-[0.7em]">
                    •
                  </span>
                )}
                {item}
              </span>
            ))}
          </p>

          <h1
            id="hero-title"
            className="mt-5 font-display text-[clamp(2.375rem,1rem+3.85vw,4.625rem)] leading-[1.03] font-extrabold tracking-[-0.042em] text-ink"
          >
            {hero.titleLines.map((line, i) => {
              const { plain, accent } = splitLine(line);
              return (
                <span key={line} className="block overflow-hidden pb-[0.1em] lg:whitespace-nowrap">
                  <span className="block" style={{ animation: `line-up 1s var(--ease-out) ${120 + i * 100}ms both` }}>
                    {plain}
                    {plain && accent && " "}
                    {accent && (
                      <span
                        className="text-gradient"
                        style={
                          i === lastLine
                            ? undefined
                            : {
                                backgroundImage:
                                  "linear-gradient(95deg, var(--accent-from), color-mix(in oklab, var(--accent-from) 72%, var(--accent-to)))",
                              }
                        }
                      >
                        {accent}
                      </span>
                    )}
                  </span>
                </span>
              );
            })}
          </h1>

          <p
            className="mt-6 max-w-[36rem] text-[clamp(1.0625rem,0.95rem+0.45vw,1.3125rem)] leading-[1.55] text-fg-muted"
            style={enter(480)}
          >
            {hero.lead}
          </p>

          <div className="mt-9 w-full sm:w-auto" style={enter(600)}>
            <ButtonLink
              href={hero.primaryCta.href}
              variant="gradient"
              className="min-h-14 w-full px-9 text-[0.9375rem] sm:w-auto"
            >
              {hero.primaryCta.label}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </ButtonLink>
          </div>
        </div>

        {/* Handwritten tagline, as in the brand artwork */}
        <p
          className="pointer-events-none absolute right-[max(1.25rem,2.5%)] bottom-[11%] hidden -rotate-[14deg] font-script text-[clamp(2.25rem,0.6rem+2.6vw,3.5rem)] leading-[0.92] text-ink lg:block"
          style={enter(900)}
        >
          {hero.tagline.map((word, i) => (
            <span key={word} className="block" style={{ marginLeft: `${i * 0.55}em` }}>
              {word}
            </span>
          ))}
          <svg
            aria-hidden="true"
            viewBox="0 0 120 12"
            className="mt-1 ml-[1.6em] h-[0.22em] w-[2.4em] overflow-visible text-ink/80"
          >
            <path
              d="M2 9 C 30 6, 70 3, 118 2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              style={{ animation: "ink-draw 1.1s var(--ease-out) 1.5s both" }}
            />
          </svg>
        </p>
      </div>
    </section>
  );
}
