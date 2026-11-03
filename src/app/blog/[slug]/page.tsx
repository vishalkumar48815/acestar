import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BlogCard, CategoryPill, PostMeta } from "@/components/media/blog-card";
import { Markdown } from "@/components/media/markdown";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { ArrowLeft, ChevronRight } from "@/components/ui/icons";
import { blogPosts, getPost } from "@/content/newsroom";
import { site } from "@/content/site";
import { toJsonLd } from "@/lib/seo";

/** Editorial content from src/data/blog.json: every post is fully prerendered at build time. */
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt.slice(0, 160),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt.slice(0, 200),
      publishedTime: post.date,
      images: post.cover ? [{ url: post.cover.src, width: post.cover.width, height: post.cover.height }] : undefined,
    },
  };
}

const enter = (delay: number) => ({ animation: `fade-up 0.9s var(--ease-out) ${delay}ms both` });

export default function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[60svh]" />}>
      <Article params={params} />
    </Suspense>
  );
}

async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const related = [
    ...blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...blogPosts.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: site.legalName, url: site.url },
    image: post.cover ? `${site.url}${post.cover.src}` : undefined,
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    description: post.excerpt,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }} />
      <article className="relative isolate">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(60%_70%_at_85%_10%,color-mix(in_oklab,var(--accent-to)_16%,transparent),transparent_70%),radial-gradient(50%_60%_at_5%_0%,color-mix(in_oklab,var(--accent-from)_12%,transparent),transparent_70%)]"
        />
        <header className="container-page max-w-[52rem] pt-28 lg:pt-36">
          <nav aria-label="Breadcrumb" style={enter(0)}>
            <ol className="flex flex-wrap items-center gap-1 text-[0.8125rem] text-fg-subtle">
              <li>
                <Link href="/" className="hover:text-fg">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <ChevronRight aria-hidden="true" className="size-3.5 opacity-60" />
                <Link href="/blog" className="hover:text-fg">
                  Blog
                </Link>
              </li>
              <li className="flex min-w-0 items-center gap-1">
                <ChevronRight aria-hidden="true" className="size-3.5 opacity-60" />
                <span aria-current="page" className="truncate">
                  {post.category}
                </span>
              </li>
            </ol>
          </nav>
          <div className="mt-6" style={enter(60)}>
            <CategoryPill className="border border-line">{post.category}</CategoryPill>
          </div>
          <h1
            className="mt-5 font-display text-[clamp(2rem,1.2rem+2.8vw,3.5rem)] leading-[1.06] font-extrabold tracking-[-0.04em] text-balance text-ink"
            style={enter(140)}
          >
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-3" style={enter(240)}>
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-full bg-[image:var(--btn-gradient)] text-sm font-bold text-white"
            >
              {post.author.charAt(0)}
            </span>
            <span>
              <span className="block text-[0.9375rem] font-semibold text-ink">{post.author}</span>
              <PostMeta post={post} />
            </span>
          </div>
        </header>

        {post.cover ? (
          <div
            className="container-page mt-10 max-w-[62rem]"
            style={{ animation: "hero-art-in 1.1s var(--ease-out) 200ms both" }}
          >
            <Image
              src={post.cover.src}
              width={post.cover.width}
              height={post.cover.height}
              alt=""
              priority
              sizes="(min-width: 1024px) 960px, 92vw"
              className="max-h-[34rem] w-full rounded-[1.75rem] object-cover shadow-[0_40px_80px_-40px_rgb(40_40_120/0.45)] ring-1 ring-white/70 dark:ring-white/10"
            />
          </div>
        ) : null}

        <div className="container-page max-w-[46rem] py-12 lg:py-16">
          {post.body ? (
            <Markdown source={post.body} />
          ) : (
            <div className="prose-acestar">
              <p>{post.excerpt}</p>
            </div>
          )}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white/60 px-5 text-[0.9375rem] font-medium text-fg-muted transition-colors hover:text-fg dark:bg-white/[0.03]"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              All posts
            </Link>
            <PostMeta post={post} />
          </div>
        </div>
      </article>

      {related.length ? (
        <section aria-labelledby="related-title" className="pb-12 lg:pb-16">
          <div className="container-page">
            <p className="text-gradient text-[0.6875rem] font-semibold tracking-[0.34em] uppercase sm:text-xs">
              Keep reading
            </p>
            <h2
              id="related-title"
              className="mt-3 font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] font-bold tracking-[-0.035em] text-ink"
            >
              More from the blog
            </h2>
            <CardSpotlight className="mt-8">
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <li key={p.slug}>
                    <BlogCard post={p} />
                  </li>
                ))}
              </ul>
            </CardSpotlight>
          </div>
        </section>
      ) : null}

      <ClosingCta />
    </>
  );
}
