import type { Metadata } from "next";
import { GalleryBrowser } from "@/components/media/gallery-browser";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { StatStrip } from "@/components/solutions/blocks";
import { PageHero } from "@/components/solutions/page-hero";
import { Section } from "@/components/solutions/primitives";
import { getAlbums } from "@/server/content/media";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from the Micro-Credentials Education Summit, ACP championships, SEA Connect and Acestar's award nights.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const albums = await getAlbums();
  const photoCount = albums.reduce((n, a) => n + a.photos.length, 0);

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
          // One framed photo: the Micro-Credentials Education Summit finale (acestar.my gallery)
          image: {
            src: "/images/media/gallery/mces/web-11.webp",
            width: 1800,
            height: 1013,
            alt: "Confetti on stage at the Micro-Credentials Education Summit finale",
          },
          imageFit: "cover",
        }}
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
