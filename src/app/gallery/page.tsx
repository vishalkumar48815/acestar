import type { Metadata } from "next";
import { FloatingCollage } from "@/components/media/floating-collage";
import { GalleryBrowser } from "@/components/media/gallery-browser";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { StatStrip } from "@/components/solutions/blocks";
import { PageHero } from "@/components/solutions/page-hero";
import { Section } from "@/components/solutions/primitives";
import { albums, photoCount } from "@/content/newsroom";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from the Micro-Credentials Education Summit, ACP championships, SEA Connect and Acestar's award nights.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const tiles = albums
    .map((a) => a.photos.find((p) => p.id === a.cover) ?? a.photos[0])
    .filter((p) => p !== undefined)
    .map((p) => ({ src: p.src, width: p.width, height: p.height }));

  return (
    <>
      <PageHero
        hero={{
          eyebrow: "Media · Gallery",
          title: "Moments that made us.",
          accent: "made us.",
          lead: "Summits, championships, conferences and award nights: a look at the people and events behind Acestar.",
          primary: { label: "Browse photos", href: "#photos" },
          secondary: { label: "Latest news", href: "/news" },
          crumbs: [{ label: "Home", href: "/" }, { label: "Media" }, { label: "Gallery" }],
        }}
        visual={<FloatingCollage tiles={tiles} />}
      />

      <Section className="pt-0 lg:pt-4">
        <StatStrip
          stats={[
            { value: `${photoCount}`, label: "Photos from our events and milestones" },
            { value: `${albums.length}`, label: "Albums, from MCES to SEA Connect" },
            { value: "2015–2025", label: "A decade of moments" },
          ]}
        />
      </Section>

      <Section id="photos" labelledBy="photos-title" className="pt-0 lg:pt-0">
        <h2 id="photos-title" className="sr-only">
          Photos
        </h2>
        <GalleryBrowser albums={albums} />
      </Section>

      <ClosingCta />
    </>
  );
}
