import { ButtonLink } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { testimonials, testimonialsHead, whyAcestar } from "@/content/home";
import { TestimonialSlider } from "./testimonial-slider";

const eyebrow = "text-eyebrow-ink text-[0.75rem] font-bold tracking-[0.22em] uppercase sm:text-[0.8125rem]";
const h2 =
  "mt-4 font-display text-[clamp(1.75rem,1.1rem+2.1vw,2.625rem)] leading-[1.1] font-bold tracking-[-0.035em] text-ink";

/** "Why Acestar" with the proof band, then customer testimonials. */
export function WhyAcestar() {
  return (
    <>
      <section aria-labelledby="why-title" className="relative isolate overflow-hidden py-16 lg:py-24">
        {/* Soft lavender waves behind the band, as in the design */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70 dark:opacity-25"
        >
          <defs>
            <linearGradient id="why-wave" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#c9c2f7" stopOpacity="0.55" />
              <stop offset="1" stopColor="#c7d6fb" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path d="M760 0 C 980 40, 1160 120, 1440 110 L 1440 0 Z" fill="url(#why-wave)" opacity="0.6" />
          <path d="M0 520 C 260 470, 420 600, 700 600 L 0 600 Z" fill="url(#why-wave)" />
          <path d="M1100 600 C 1250 520, 1350 470, 1440 470 L 1440 600 Z" fill="url(#why-wave)" opacity="0.8" />
        </svg>
        <div className="container-page">
          <div data-reveal suppressHydrationWarning className="max-w-[46rem]">
            <p className={eyebrow}>{whyAcestar.eyebrow}</p>
            <h2
              id="why-title"
              className="mt-3 font-display text-[clamp(1.5rem,1.2rem+1.1vw,2.125rem)] leading-tight font-semibold tracking-[-0.025em] text-ink"
            >
              {whyAcestar.title}
            </h2>
            <p className="mt-4 text-[clamp(1.0625rem,0.98rem+0.35vw,1.25rem)] leading-relaxed text-fg">
              {whyAcestar.lead}
            </p>
          </div>

          <div
            data-reveal
            suppressHydrationWarning
            className="mt-10 rounded-[1.5rem] border border-white/80 bg-[#f4f2fd]/85 px-6 py-7 shadow-[0_1px_2px_rgb(60_40_160/0.04)] backdrop-blur-sm sm:px-8 lg:mt-12 lg:px-10 lg:py-8 dark:border-white/[0.08] dark:bg-white/[0.04]"
          >
            <p className="text-[1.0625rem] font-medium text-ink lg:text-[1.125rem]">{whyAcestar.bandTitle}</p>
            <dl className="mt-6 grid grid-cols-2 gap-y-8 lg:grid-cols-4">
              {whyAcestar.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={
                    "flex flex-col-reverse items-center px-3 text-center " +
                    (i % 2 ? "border-l border-[#d9d3f3] dark:border-white/10 " : "") +
                    (i === 2 ? "lg:border-l lg:border-[#d9d3f3] lg:dark:border-white/10" : "")
                  }
                >
                  <dt className="mt-2 text-[0.9375rem] font-medium text-eyebrow-ink sm:text-[1.0625rem]">{s.label}</dt>
                  <dd className="text-[clamp(1.75rem,1.3rem+1.4vw,2.375rem)] leading-none font-medium tracking-[-0.02em] text-ink">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="voices-title" className="py-16 lg:py-24">
        <div className="container-page">
          <div
            data-reveal
            suppressHydrationWarning
            className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
          >
            <div>
              <p className={eyebrow}>{testimonialsHead.eyebrow}</p>
              <h2 id="voices-title" className={h2}>
                {testimonialsHead.title}
              </h2>
            </div>
            <ButtonLink
              href={testimonialsHead.cta.href}
              variant="glass"
              className="min-h-12 shrink-0 self-start rounded-full px-6 text-[0.9375rem] lg:self-auto"
            >
              {testimonialsHead.cta.label}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
            </ButtonLink>
          </div>
          <div className="mt-10">
            <TestimonialSlider items={testimonials} />
          </div>
        </div>
      </section>
    </>
  );
}
