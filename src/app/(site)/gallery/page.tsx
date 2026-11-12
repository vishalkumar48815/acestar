import type { Metadata } from "next";
import { GalleryBrowser } from "@/components/media/gallery-browser";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { PageHero } from "@/components/solutions/page-hero";
import { Section, SectionHead } from "@/components/solutions/primitives";
import { getAlbums } from "@/server/content/media";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from the Micro-Credentials Education Summit, ACP championships, SEA Connect and Acestar's award nights.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const albums = await getAlbums();

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
          // Photo-frames artwork (scripts/hero-art/render-gallery-art.html), blended into the page
          image: { src: "/images/media/gallery-hero-frames2.webp", width: 2880, height: 1100, alt: "" },
          imageDark: { src: "/images/media/gallery-hero-frames2-dark.webp", width: 2880, height: 1100, alt: "" },
          imageFit: "backdrop",
        }}
      />

      <Section id="photos" labelledBy="photos-title" className="pt-0 lg:pt-4">
        <SectionHead
          eyebrow="Memories with Acestar"
          title="Every milestone, shared together."
          body="Since 2008, the moments with our customers, partners, students and team that keep us moving forward."
          id="photos-title"
          className="mb-10"
        />
        <GalleryBrowser albums={albums} />
      </Section>

      <ClosingCta />
    </>
  );
}
