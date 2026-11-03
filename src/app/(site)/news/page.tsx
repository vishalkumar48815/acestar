import type { Metadata } from "next";
import { FloatingCollage } from "@/components/media/floating-collage";
import { PressCard, PressFeed } from "@/components/media/press-feed";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { StatStrip } from "@/components/solutions/blocks";
import { PageHero } from "@/components/solutions/page-hero";
import { Section, SectionHead } from "@/components/solutions/primitives";
import { getPressItems } from "@/server/content/media";

export const metadata: Metadata = {
  title: "News",
  description:
    "Acestar in the press: Adobe Certified Professional world champions, MCES, awards and leadership stories, from The Star, Bernama, Astro Awani and more.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const pressItems = await getPressItems();
  const featuredPress = pressItems.find((p) => p.featured) ?? pressItems[0];
  const publishers = new Set(pressItems.map((p) => p.publisher)).size;
  const years = pressItems.map((p) => Number(p.date.slice(0, 4)));
  const collage = pressItems
    .filter((p) => p.image)
    .slice(0, 12)
    .filter((p, i, all) => all.findIndex((q) => q.image!.src === p.image!.src) === i)
    .slice(0, 5)
    .map((p) => ({ ...p.image!, label: p.publisher }));

  return (
    <>
      <PageHero
        hero={{
          eyebrow: "Media · News",
          title: "Acestar in the news.",
          accent: "in the news.",
          lead: "Champions, summits, awards and leadership: how Malaysia's media has covered Acestar and the talent we champion.",
          primary: { label: "Latest stories", href: "#stories" },
          secondary: { label: "Read our blog", href: "/blog" },
          crumbs: [{ label: "Home", href: "/" }, { label: "Media" }, { label: "News" }],
        }}
        visual={<FloatingCollage tiles={collage} />}
      />

      <Section labelledBy="featured-title" className="pt-0 lg:pt-4">
        <StatStrip
          stats={[
            { value: `${pressItems.length}`, label: "Stories about Acestar and our community" },
            { value: `${publishers}`, label: "Publications, from The Star to Bernama and Astro Awani" },
            ...(years.length
              ? [{ value: `${Math.min(...years)}–${Math.max(...years)}`, label: "A decade of headlines" }]
              : []),
          ]}
        />
        {featuredPress ? (
          <div className="mt-14 grid items-center gap-8 lg:mt-16 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
            <SectionHead
              eyebrow="Top story"
              title={featuredPress.title}
              body={featuredPress.excerpt}
              id="featured-title"
            />
            <div data-reveal suppressHydrationWarning>
              <PressCard item={featuredPress} />
            </div>
          </div>
        ) : null}
      </Section>

      <Section id="stories" labelledBy="stories-title" className="pt-4 lg:pt-6">
        <SectionHead eyebrow="All coverage" title="Every story, newest first." id="stories-title" className="mb-8" />
        <PressFeed items={pressItems} />
      </Section>

      <ClosingCta
        content={{
          eyebrow: "Media enquiries",
          title: "Writing about Acestar?",
          body: "For interviews, press materials and event information, get in touch with our team.",
          cta: { label: "Contact Us", href: "/contact" },
        }}
      />
    </>
  );
}
