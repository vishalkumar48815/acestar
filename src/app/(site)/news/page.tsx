import type { Metadata } from "next";
import { NewsSpotlight } from "@/components/media/news-spotlight";
import { PressFeed } from "@/components/media/press-feed";
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
  const headlines = pressItems.filter((p) => p !== featuredPress).slice(0, 4);
  const publishers = new Set(pressItems.map((p) => p.publisher)).size;
  const years = pressItems.map((p) => Number(p.date.slice(0, 4)));

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
          // Illustration from acestar.my (2025/08), placed on the right
          image: { src: "/images/media/hero-news-art2.webp", width: 3609, height: 1024, alt: "" },
          imageFit: "backdrop",
        }}
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
          <div className="mt-12 lg:mt-16" data-reveal suppressHydrationWarning>
            <NewsSpotlight top={featuredPress} headlines={headlines} />
          </div>
        ) : null}
      </Section>

      <Section id="stories" labelledBy="stories-title" className="pt-4 lg:pt-6">
        <SectionHead
          eyebrow="All coverage"
          title="A decade of headlines, year by year."
          body="Filter by language, search a name or publisher, or open any year to see every story."
          id="stories-title"
          className="mb-8"
        />
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
