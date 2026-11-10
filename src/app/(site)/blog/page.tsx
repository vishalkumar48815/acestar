import type { Metadata } from "next";
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
          image: { src: "/images/media/hero-blog-hd.webp", width: 5376, height: 1400, alt: "" },
          imageFit: "backdrop",
          imageScrim: true,
        }}
      />

      <Section id="posts" labelledBy="posts-title" className="pt-0 lg:pt-4">
        <SectionHead
          eyebrow="Browse the blog"
          title="Guides, tips and stories."
          body="Filter by topic or search for a product, a tip or a name."
          id="posts-title"
          className="mb-8"
        />
        <BlogIndex posts={blogPosts} categories={blogCategories} />
      </Section>

      <ClosingCta />
    </>
  );
}
