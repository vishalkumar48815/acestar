import type { Metadata } from "next";
import Image from "next/image";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { RelatedSolutions } from "@/components/solutions/blocks";
import { PageHero } from "@/components/solutions/page-hero";
import { Section, SectionHead, spotlight, toneCard, toneStyle, type Tone } from "@/components/solutions/primitives";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import { ButtonLink } from "@/components/ui/button";
import { ArrowUpRight } from "@/components/ui/icons";
import { site } from "@/content/site";
import { closing, hero, packages, whatIs } from "@/content/solutions/techcare";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "TechCare",
  description:
    "TechCare is IT as a Service: computers for your workforce at a predictable monthly fee, for SMEs and enterprises. Essential, Essential+ and Elite plans.",
  alternates: { canonical: "/techcare" },
};

const packageTones: Tone[] = ["peach", "violet", "sky"];

export default function TechCarePage() {
  return (
    <>
      <PageHero hero={hero} />

      <Section labelledBy="what-title" className="pt-4 lg:pt-6">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {whatIs.image ? (
            <Image
              src={whatIs.image.src}
              width={whatIs.image.width}
              height={whatIs.image.height}
              alt={whatIs.image.alt}
              sizes="(min-width: 1024px) 560px, 92vw"
              data-reveal
              suppressHydrationWarning
              className="w-full rounded-[1.75rem] object-cover"
            />
          ) : null}
          <div>
            <SectionHead eyebrow={whatIs.eyebrow} title={whatIs.title} body={whatIs.body} id="what-title" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {whatIs.points.map((p) => (
                <li
                  key={p.title}
                  data-reveal
                  suppressHydrationWarning
                  className="rounded-2xl border border-line bg-white/60 p-4 dark:bg-white/[0.03]"
                >
                  <h3 className="font-semibold text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-fg-muted">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

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
        <div className="mt-10 flex justify-center">
          <ButtonLink href={site.externalLinks.techcare} variant="glass" className="rounded-full px-7">
            Compare plans on techcareasia.com <ArrowUpRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        </div>
      </Section>

      <RelatedSolutions current="techcare" />
      <ClosingCta content={{ ...closing, cta: { label: "Talk to us", href: "/contact" } }} />
    </>
  );
}
