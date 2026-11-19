import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import { RelatedSolutions } from "@/components/solutions/blocks";
import { Section, SectionHead, spotlight, toneCard, toneStyle, type Tone } from "@/components/solutions/primitives";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, ChevronRight } from "@/components/ui/icons";
import { site } from "@/content/site";
import { closing, higherView, outcomes, subscription } from "@/content/solutions/techcare";
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
  "font-display text-[clamp(1.5rem,1.2rem+2.1vw,2.875rem)] leading-[1.12] font-bold tracking-[-0.02em] text-[#4a4857] dark:text-ink";

/** Artwork from public/images/pages/techcare. */
const art = {
  giraffe: {
    // Lossless WebP of upside-gown-giraffe-img.png, full 969×1622 (served as-is, not resized)
    src: "/images/pages/techcare/upside-gown-giraffe-img.webp",
    width: 969,
    height: 1622,
    alt: "A giraffe bending its long neck over to look at you upside down",
  },
  computers: {
    src: "/images/pages/techcare/computers.webp",
    width: 1761,
    height: 871,
    alt: "Laptop, monitor, headphones and desktop computer available on TechCare subscription",
  },
};

export default function TechCarePage() {
  return (
    <div className="theme-techcare bg-white dark:bg-transparent">
      {/* Hero (client mock): upside-down giraffe on the left, standing on the subscription card; copy on the right */}
      <section aria-labelledby="tc-title" className="relative isolate">
        <div className="container-page grid gap-8 pt-28 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10 lg:pt-24">
          <div
            className="relative order-2 mx-auto h-[26rem] w-full max-w-[22rem] sm:h-[32rem] lg:order-none lg:mx-0 lg:h-[40rem] lg:max-w-none"
            style={{ animation: "hero-art-in 1.2s var(--ease-out) both" }}
          >
            <Image
              src={art.giraffe.src}
              width={art.giraffe.width}
              height={art.giraffe.height}
              alt={art.giraffe.alt}
              priority
              unoptimized
              className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-[46%] lg:left-[8%] lg:translate-x-0"
            />
          </div>
          <div className="self-center pb-4 lg:pb-24" style={{ animation: "fade-up 0.9s var(--ease-out) 120ms both" }}>
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
              className="mt-6 font-display text-[clamp(2.5rem,1.5rem+3.4vw,4.25rem)] leading-[1.05] font-bold tracking-[-0.03em] text-[#5b5966] dark:text-ink"
            >
              {higherView.title}{" "}
              <span className="relative inline-block">
                {higherView.accent}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 18"
                  preserveAspectRatio="none"
                  className="absolute -bottom-3 left-[-4%] h-3.5 w-[108%] text-[var(--tc-yellow)]"
                >
                  <path
                    d="M4 12 C 60 5, 140 4, 196 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-9 text-[clamp(1.125rem,1rem+0.55vw,1.5rem)] font-semibold tracking-[-0.01em] text-[#59576a] dark:text-fg">
              {higherView.subtitle}
            </p>
            <p className="mt-8 max-w-[44rem] text-[1.0625rem] leading-[1.65] text-[#2f3038] dark:text-fg-muted">
              {higherView.body}
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink
                href={site.externalLinks.techcare}
                external
                variant="gradient"
                className="min-h-14 px-9 text-[1.0625rem] font-semibold"
              >
                Explore TechCare
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-1" />
              </ButtonLink>
              <Link
                href="/contact-acestarian/"
                className="inline-flex min-h-14 items-center justify-center rounded-full border-[1.5px] border-[#3d3b4f] px-11 text-[1.0625rem] font-semibold text-[#3d3b4f] transition-colors hover:bg-[#3d3b4f] hover:text-white dark:border-white/40 dark:text-white dark:hover:bg-white dark:hover:text-[#0b1020]"
              >
                Talk to Our Experts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* IT subscription: the giraffe's feet rest on the top edge of this card */}
      <section id="subscription" aria-labelledby="sub-title" className="relative z-10 scroll-mt-28 pb-12 lg:pb-16">
        <div className="container-page">
          <div className="-mt-[17px] rounded-[2rem] bg-[#f5f6f8] p-6 sm:p-10 lg:-mt-[21px] lg:p-12 dark:bg-white/[0.04]">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-6">
              <div>
                <div className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="mt-1 w-2 shrink-0 self-stretch rounded-full bg-[var(--tc-teal)]"
                  />
                  <h2 id="sub-title" className={`${h2} xl:whitespace-nowrap`}>
                    IT Subscription
                    <br />
                    for Your Workforce
                  </h2>
                </div>
                <div className="pl-7">
                  <span aria-hidden="true" className="mt-5 block h-2 w-24 rounded-full bg-[var(--tc-yellow)]" />
                  <p className="mt-5 max-w-[22rem] text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)] leading-[1.5] font-medium text-[#3f3f48] dark:text-fg-muted">
                    {subscription.body}
                  </p>
                </div>
              </div>
              <Image
                src={art.computers.src}
                width={art.computers.width}
                height={art.computers.height}
                alt={art.computers.alt}
                quality={90}
                sizes="(min-width: 1024px) 680px, 92vw"
                className="h-auto w-full"
              />
            </div>
            <ul className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-6">
              {subscription.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group/l flex min-h-[5.5rem] items-center justify-between gap-4 rounded-full bg-white px-8 py-4 text-[1.1rem] leading-[1.3] font-bold text-[#4a4857] shadow-[0_14px_34px_-22px_rgb(40_60_80/0.45)] transition-transform hover:-translate-y-0.5 dark:bg-white/[0.06] dark:text-ink"
                  >
                    <span>
                      {/* Two lines, as in the mock: the last word drops to the second line */}
                      {l.label.split(/ (?=\S+$)/).map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                    <ChevronRight
                      aria-hidden="true"
                      className="size-6 shrink-0 text-[#3d3b4f] transition-transform group-hover/l:translate-x-1 dark:text-white"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Outcomes (client mock) */}
      <Section id="outcomes" labelledBy="outcomes-title" className="pt-0 lg:pt-0">
        <div className="flex gap-5">
          <span aria-hidden="true" className="w-2 shrink-0 rounded-full bg-[var(--tc-teal)]" />
          <div>
            <h2 id="outcomes-title" className={h2}>
              {outcomes.title}
            </h2>
            <p className="mt-1 text-[clamp(1.25rem,1.05rem+0.7vw,1.75rem)] text-[#4a4857] dark:text-fg-muted">
              {outcomes.subtitle}
            </p>
          </div>
        </div>
        <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-0">
          {outcomes.items.map((o, i) => (
            <li
              key={o.title}
              data-reveal
              suppressHydrationWarning
              className={cn(
                "md:px-10",
                i === 0 && "md:pl-0",
                i > 0 && "md:border-l md:border-[#e2e3e8] dark:md:border-line",
              )}
            >
              <h3 className="max-w-[21rem] font-display text-[clamp(1.5rem,1.15rem+1vw,2rem)] leading-[1.18] font-bold tracking-[-0.02em] text-[#4a4857] dark:text-ink">
                {o.title}
              </h3>
              <p className="mt-4 max-w-[19rem] text-[clamp(1rem,0.96rem+0.2vw,1.125rem)] leading-[1.55] text-[#3f3f48] dark:text-fg-muted">
                {o.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Closing banner (client mock) */}
      <section aria-labelledby="tc-cta-title" className="pb-16 lg:pb-24">
        <div className="container-page">
          <div className="flex flex-col gap-6 rounded-[2rem] bg-[linear-gradient(100deg,#55b6ae_0%,#4a9fa0_45%,#3a858b_100%)] px-7 py-8 text-white shadow-[0_30px_60px_-40px_rgb(30_110_110/0.8)] sm:px-10 lg:flex-row lg:items-center lg:gap-10 lg:px-12 lg:py-9">
            <div className="flex gap-5">
              <span aria-hidden="true" className="w-1.5 shrink-0 rounded-full bg-[#86ddd4]" />
              <h2
                id="tc-cta-title"
                className="max-w-[20rem] font-display text-[clamp(1.625rem,1.25rem+1.2vw,2.25rem)] leading-[1.15] font-bold tracking-[-0.02em]"
              >
                {closing.title}
              </h2>
            </div>
            <span aria-hidden="true" className="hidden w-px self-stretch bg-white/25 lg:block" />
            <p className="flex-1 text-[1.0625rem] leading-relaxed text-white/90">{closing.body}</p>
            <Link
              href="/contact-acestarian/"
              className="group/c inline-flex min-h-14 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-white px-6 md:px-8 text-[0.9rem] md:text-[1.0625rem] font-semibold text-[#2c2b3a] shadow-[0_12px_30px_-16px_rgb(0_0_0/0.4)] transition-transform hover:-translate-y-0.5 lg:self-center"
            >
              Talk to Our Experts
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/c:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* <RelatedSolutions current="techcare" /> */}
    </div>
  );
}
