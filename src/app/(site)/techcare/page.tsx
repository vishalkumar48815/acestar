import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { RelatedSolutions } from "@/components/solutions/blocks";
import { Section, SectionHead, spotlight, toneCard, toneStyle, type Tone } from "@/components/solutions/primitives";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, ChevronRight } from "@/components/ui/icons";
import { site } from "@/content/site";
import { closing, higherView, outcomes, packages, subscription } from "@/content/solutions/techcare";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "TechCare IT Subscription for Business",
  description:
    "TechCare is IT as a Service: computers, software and maintenance for your workforce at a predictable monthly fee, for SMEs and enterprises. Essential, Essential+ and Elite plans.",
  keywords: ["IT subscription Malaysia", "laptop subscription for business", "IT as a Service Malaysia", "TechCare"],
  alternates: { canonical: "/techcare/" },
};

const packageTones: Tone[] = ["mint", "sky", "violet"];
const h2 =
  "font-display text-[clamp(1.75rem,1.15rem+2vw,2.625rem)] leading-[1.1] font-bold tracking-[-0.035em] text-ink";

export default function TechCarePage() {
  return (
    <div className="theme-techcare">
      {/* Hero: escalator artwork on the left (from the TechCare banner), copy on the right */}
      <section aria-labelledby="tc-title" className="relative isolate overflow-hidden">
        <div className="container-page grid items-center gap-8 pt-28 pb-12 lg:min-h-[44rem] lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:pt-32 lg:pb-16">
          <div
            className="relative -mx-5 h-72 sm:h-96 lg:mx-0 lg:h-full lg:min-h-[36rem]"
            style={{ animation: "hero-art-in 1.2s var(--ease-out) both" }}
          >
            <Image
              src="/images/techcare/higher-view3.webp"
              alt="An escalator rising towards a snow-capped mountain peak"
              fill
              priority
              sizes="(min-width: 1024px) 520px, 100vw"
              className="[mask-image:linear-gradient(180deg,black_70%,transparent)] object-cover object-[50%_40%] lg:[mask-image:none] lg:object-contain lg:object-left"
            />
          </div>
          <div style={{ animation: "fade-up 0.9s var(--ease-out) 120ms both" }}>
            <Image
              src="/images/techcare/techcare-logo.webp"
              alt="TechCare"
              width={1065}
              height={216}
              priority
              className="h-11 w-auto sm:h-14 dark:hidden"
            />
            <Image
              src="/images/techcare/techcare-logo-dark.webp"
              alt="TechCare"
              width={1065}
              height={216}
              className="hidden h-11 w-auto sm:h-14 dark:block"
            />
            <h1
              id="tc-title"
              className="mt-6 font-display text-[clamp(2.5rem,1.4rem+4vw,4.75rem)] leading-[1.02] font-extrabold tracking-[-0.045em] text-ink"
            >
              {higherView.title}{" "}
              <span className="relative inline-block">
                {higherView.accent}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 18"
                  preserveAspectRatio="none"
                  className="absolute -bottom-3 left-[8%] h-3.5 w-[92%] text-[#f9d423]"
                >
                  <path
                    d="M3 13 C 60 3, 140 3, 197 11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-7 text-[clamp(1.125rem,1rem+0.5vw,1.5rem)] font-semibold tracking-[-0.015em] text-fg">
              {higherView.subtitle}
            </p>
            <p className="mt-4 max-w-[36rem] text-[1.0625rem] leading-relaxed text-fg-muted">{higherView.body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={site.externalLinks.techcare}
                external
                variant="gradient"
                className="min-h-14 px-8 text-[0.9375rem]"
              >
                Explore TechCare
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-1" />
              </ButtonLink>
              <ButtonLink
                href="/contact-acestarian/"
                variant="glass"
                className="min-h-14 rounded-full px-8 text-[0.9375rem]"
              >
                Talk to Our Experts
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* IT subscription */}
      <Section id="subscription" labelledBy="sub-title" className="pt-0 lg:pt-0">
        <div
          data-reveal
          suppressHydrationWarning
          className="relative isolate overflow-hidden rounded-[1.75rem] border border-white/90 bg-[linear-gradient(160deg,#f3fbfb,#eef3f8)] p-6 sm:p-10 lg:p-12 dark:border-white/[0.08] dark:bg-[linear-gradient(160deg,rgb(63_208_216/0.07),rgb(255_255_255/0.02))]"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="border-l-4 border-[var(--accent-from)] pl-5 sm:pl-6">
              <h2 id="sub-title" className={h2}>
                {subscription.title}
              </h2>
              <span aria-hidden="true" className="mt-4 block h-1.5 w-20 rounded-full bg-[#f9d423]" />
              <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-fg-muted">{subscription.body}</p>
            </div>
            {subscription.image ? (
              <Image
                src={subscription.image.src}
                width={subscription.image.width}
                height={subscription.image.height}
                alt={subscription.image.alt}
                sizes="(min-width: 1024px) 560px, 92vw"
                className="w-full rounded-[1.25rem] object-cover"
              />
            ) : null}
          </div>
          <ul className="mt-8 grid gap-3 md:grid-cols-3">
            {subscription.links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="group/l flex min-h-16 items-center justify-between gap-4 rounded-full border border-white/90 bg-white/90 px-7 py-4 font-semibold text-ink shadow-[0_10px_28px_-18px_rgb(20_80_100/0.4)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent-from)] dark:border-white/[0.08] dark:bg-white/[0.05]"
                >
                  {l.label}
                  <ChevronRight
                    aria-hidden="true"
                    className="size-5 shrink-0 text-brand-ink transition-transform group-hover/l:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Packages */}
      <Section id="packages" labelledBy="pkg-title">
        <SectionHead
          eyebrow={packages.eyebrow}
          title={packages.title}
          align="center"
          id="pkg-title"
          className="mb-10"
        />
        <CardSpotlight>
          <ul className="grid gap-4 md:grid-cols-3">
            {packages.items.map((pkg, i) => (
              <li key={pkg.name} data-reveal suppressHydrationWarning>
                <article
                  data-spotlight
                  className={cn(toneCard, "group/card flex h-full flex-col p-6 lg:p-7")}
                  style={toneStyle(packageTones[i])}
                >
                  <span aria-hidden="true" className={spotlight} />
                  <div className="relative mx-auto h-36 w-36">
                    {pkg.image ? (
                      <Image
                        src={pkg.image.src}
                        width={pkg.image.width}
                        height={pkg.image.height}
                        alt={pkg.image.alt}
                        sizes="144px"
                        className="h-full w-full object-contain transition-transform duration-700 ease-out-expo group-hover/card:scale-105 group-hover/card:-rotate-3"
                      />
                    ) : null}
                  </div>
                  <h3 className="mt-6 font-display text-[1.75rem] font-extrabold tracking-[-0.03em] text-ink">
                    {pkg.name}
                  </h3>
                  <p className="text-gradient font-semibold">{pkg.tagline}</p>
                  <p className="mt-4 text-[0.9375rem] font-medium text-fg">{pkg.audience}</p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{pkg.body}</p>
                  <a
                    href={site.externalLinks.techcare}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand-ink hover:underline"
                  >
                    Know more <ArrowUpRight aria-hidden="true" className="size-4" />
                    <span className="sr-only"> about {pkg.name} on techcareasia.com</span>
                  </a>
                </article>
              </li>
            ))}
          </ul>
        </CardSpotlight>
      </Section>

      {/* Outcomes */}
      <Section id="outcomes" labelledBy="outcomes-title" className="pt-0 lg:pt-0">
        <div className="border-l-4 border-[var(--accent-from)] pl-5 sm:pl-6">
          <h2 id="outcomes-title" className={h2}>
            {outcomes.title}
          </h2>
          <p className="mt-2 text-[clamp(1.125rem,1rem+0.5vw,1.5rem)] text-fg-muted">{outcomes.subtitle}</p>
        </div>
        <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-0">
          {outcomes.items.map((o, i) => (
            <li
              key={o.title}
              data-reveal
              suppressHydrationWarning
              className={cn("md:px-8", i === 0 && "md:pl-0", i > 0 && "md:border-l md:border-line")}
            >
              <h3 className="font-display text-[clamp(1.375rem,1.1rem+0.9vw,1.875rem)] leading-[1.15] font-bold tracking-[-0.03em] text-ink">
                {o.title}
              </h3>
              <p className="mt-3 text-[1rem] leading-relaxed text-fg-muted">{o.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <RelatedSolutions current="techcare" />
      <ClosingCta content={{ ...closing, cta: { label: "Talk to Our Experts", href: "/contact-acestarian/" } }} />
    </div>
  );
}
