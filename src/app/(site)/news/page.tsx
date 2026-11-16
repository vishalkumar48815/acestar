import type { Metadata } from "next";
import { PressFeed } from "@/components/media/press-feed";
import { PageHero } from "@/components/solutions/page-hero";
import { Section } from "@/components/solutions/primitives";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, Newspaper } from "@/components/ui/icons";
import { site } from "@/content/site";
import { getPressItems } from "@/server/content/media";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "News - Acestar", path: "/news/" });

export default async function NewsPage() {
  const pressItems = await getPressItems();

  return (
    <>
      <PageHero
        hero={{
          eyebrow: "Media Coverage",
          title: "News and Highlights.",
          accent: "Highlights.",
          lead: "Discover what's new at Acestar, from industry news and events to key milestones and announcements.",
          primary: { label: "Latest stories", href: "#stories" },
          secondary: { label: "Read our blog", href: "/blogs/" },
          crumbs: [{ label: "Home", href: "/" }, { label: "Media" }, { label: "News" }],
          // Newspaper artwork from the client mock (public/images/news/hero-bg.png, cut out), on the right
          image: { src: "/images/news/hero-art3.webp", width: 3300, height: 1300, alt: "" },
          // Dark mode: a dark redesign of the same artwork (scripts/hero-art/news-dark)
          imageDark: { src: "/images/news/hero-art3-dark.webp", width: 3300, height: 1300, alt: "" },
          imageFit: "backdrop",
        }}
      />

      <Section id="stories" labelledBy="stories-title" className="pt-0 lg:pt-4">
        <h2 id="stories-title" className="sr-only">
          Media coverage by year
        </h2>
        <PressFeed items={pressItems} />
      </Section>

      {/* Media enquiries */}
      <Section labelledBy="media-title" className="pt-0 lg:pt-0">
        <div
          data-reveal
          suppressHydrationWarning
          className="flex flex-col gap-6 rounded-[1.75rem] border border-white/90 bg-[linear-gradient(110deg,#eef3ff,#f5eeff)] p-6 sm:flex-row sm:items-center sm:p-8 lg:p-10 dark:border-white/[0.08] dark:bg-[linear-gradient(110deg,rgb(124_155_255/0.1),rgb(200_141_255/0.08))]"
        >
          <span className="grid size-16 shrink-0 place-items-center text-brand-ink sm:border-r sm:border-line sm:pr-6">
            <Newspaper aria-hidden="true" className="size-11" strokeWidth={1.5} />
          </span>
          <div className="flex-1">
            <h2
              id="media-title"
              className="font-display text-[clamp(1.5rem,1.1rem+1.2vw,2.125rem)] font-semibold tracking-[-0.03em] text-ink"
            >
              Media Enquiries
            </h2>
            <p className="mt-1 text-fg-muted">For media interviews, information or collaboration, please contact us.</p>
          </div>
          <ButtonLink
            href={`mailto:${site.contact.email.media}`}
            variant="glass"
            className="min-h-13 shrink-0 rounded-full px-7 text-[0.9375rem]"
          >
            Contact Media Team
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-1" />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
