import type { Metadata } from "next";
import { FeaturedPost } from "@/components/media/blog-card";
import { FloatingCollage } from "@/components/media/floating-collage";
import { BlogIndex } from "@/components/media/blog-index";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { PageHero } from "@/components/solutions/page-hero";
import { Section } from "@/components/solutions/primitives";
import { getBlogPosts } from "@/server/content/media";

export const metadata: Metadata = {
  title: "Blog",
  description: "Adobe and Autodesk product guides, design tips and shortcuts, and stories from interns at Acestar.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const blogCategories = [...new Set(blogPosts.map((p) => p.category))];
  const [latest, ...rest] = blogPosts;
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
          <h2 id="latest-title" className="sr-only">
            Latest post
          </h2>
          <div data-reveal suppressHydrationWarning>
            <FeaturedPost post={latest} />
          </div>
        </Section>
      ) : null}

      <Section id="posts" labelledBy="posts-title" className="pt-0 lg:pt-0">
        <h2 id="posts-title" className="sr-only">
          All posts
        </h2>
        <BlogIndex posts={rest} categories={blogCategories} />
      </Section>

      <ClosingCta />
    </>
  );
}
