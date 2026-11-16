import type { Metadata } from "next";
import { BlogIndex } from "@/components/media/blog-index";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { Section, SectionHead } from "@/components/solutions/primitives";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { getBlogPosts } from "@/server/content/media";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Blogs - Acestar", path: "/blogs/" });

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const blogCategories = [...new Set(blogPosts.map((p) => p.category))];
  const latest = blogPosts[0];
  return (
    <>
      {/* Hero, in the same style as the client's Careers mock (no artwork for now) */}
      <section aria-labelledby="blog-title" className="relative isolate overflow-hidden">
        <div className="container-page pt-32 pb-10 lg:pt-40 lg:pb-16">
          <div className="max-w-[44rem]" style={{ animation: "fade-up 0.9s var(--ease-out) both" }}>
            <p className="flex items-center gap-3 text-[0.6875rem] font-bold tracking-[0.3em] text-eyebrow-ink uppercase sm:text-xs">
              <span aria-hidden="true" className="h-px w-8 bg-[var(--accent-from)]" />
              Media · Blog
            </p>
            <h1 id="blog-title" className="mt-5 text-ink">
              <span className="block font-display text-[clamp(2.5rem,1.6rem+2.6vw,4rem)] leading-[1.02] font-medium tracking-[-0.035em] lg:whitespace-nowrap">
                Ideas, guides
              </span>
              <span className="relative mt-1 inline-block pb-4">
                <span className="block bg-[linear-gradient(95deg,#3aa0f5_0%,#3b5bf0_38%,#7b3df0_68%,#c13ff2_100%)] bg-clip-text pr-2 font-marker text-[clamp(2.75rem,1.6rem+3.6vw,5.25rem)] leading-[1.05] font-bold whitespace-nowrap text-transparent">
                  and stories.
                </span>
                {/* Brush underline */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 400 24"
                  preserveAspectRatio="none"
                  className="absolute bottom-0 left-[18%] h-4 w-[82%]"
                >
                  <defs>
                    <linearGradient id="blog-line" x1="0" x2="1">
                      <stop offset="0" stopColor="#3b5bf0" />
                      <stop offset="0.7" stopColor="#8b3df0" />
                      <stop offset="1" stopColor="#c13ff2" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M4 18 C 120 6, 260 4, 396 8"
                    fill="none"
                    stroke="url(#blog-line)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-fg">
              Product guides for Adobe, Autodesk and more, quick design tips, and first-hand stories from life at
              Acestar.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={`/blog/${latest?.slug ?? ""}/`}
                variant="gradient"
                className="min-h-14 px-8 text-[0.9375rem]"
              >
                Read the latest
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-1" />
              </ButtonLink>
              <ButtonLink href="#posts" variant="glass" className="min-h-14 rounded-full px-8 text-[0.9375rem]">
                Browse all posts
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

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
