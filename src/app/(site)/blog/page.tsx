import type { Metadata } from "next";
import { BlogSpotlight } from "@/components/media/blog-spotlight";
import { FloatingCollage } from "@/components/media/floating-collage";
import { BlogIndex } from "@/components/media/blog-index";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { PageHero } from "@/components/solutions/page-hero";
import { Section, SectionHead } from "@/components/solutions/primitives";
import { getBlogPosts } from "@/server/content/media";

export const metadata: Metadata = {
  title: "Blog",
  description: "Adobe and Autodesk product guides, design tips and shortcuts, and stories from interns at Acestar.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const blogCategories = [...new Set(blogPosts.map((p) => p.category))];
  const latest = blogPosts[0];
  const spotlight = blogPosts.slice(0, 3);
  // Hero collage: one cover per category first, then the newest others.
  const covers = [
    ...blogCategories.map((c) => blogPosts.find((p) => p.category === c && p.cover)),
    ...blogPosts.filter((p) => p.cover),
  ]
    .filter((p, i, all) => p !== undefined && all.indexOf(p) === i)
    .slice(0, 5)
    .map((p) => ({ ...p!.cover!, label: p!.category }));
  return (
    <>
      <PageHero
        hero={{
          eyebrow: "Media · Blog",
          title: "Ideas, guides and stories.",
          accent: "stories.",
          lead: "Product guides for Adobe, Autodesk and more, quick design tips, and first-hand stories from life at Acestar.",
          primary: { label: "Read the latest", href: `/blog/${latest?.slug ?? ""}` },
          secondary: { label: "Browse all posts", href: "#posts" },
          crumbs: [{ label: "Home", href: "/" }, { label: "Media" }, { label: "Blog" }],
        }}
        visual={<FloatingCollage tiles={covers} />}
      />

      {latest ? (
        <Section labelledBy="latest-title" className="pt-0 lg:pt-0">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHead eyebrow="Fresh from the team" title="Latest stories." id="latest-title" />
          </div>
          <div data-reveal suppressHydrationWarning>
            <BlogSpotlight posts={spotlight} />
          </div>
        </Section>
      ) : null}

      <Section id="posts" labelledBy="posts-title" className="pt-0 lg:pt-0">
        <SectionHead
          eyebrow="Browse the blog"
          title="Guides, tips and stories."
          body="Filter by topic or search for a product, a tip or a name."
          id="posts-title"
          className="mb-8"
        />
        <BlogIndex posts={blogPosts} categories={blogCategories} featured={spotlight.map((p) => p.slug)} />
      </Section>

      <ClosingCta />
    </>
  );
}
