import Image from "next/image";
import Link from "next/link";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import { spotlight } from "@/components/solutions/primitives";
import { ArrowRight, Sparkles } from "@/components/ui/icons";
import type { BlogPost } from "@/content/newsroom";
import { cn } from "@/lib/utils";
import { CategoryPill, PostMeta } from "./blog-card";

/** Editorial top of /blog: the newest post large, the next two stacked beside it. */
export function BlogSpotlight({ posts }: { posts: BlogPost[] }) {
  const [lead, ...side] = posts;
  if (!lead) return null;
  return (
    <CardSpotlight className="grid gap-5 lg:grid-cols-[1.5fr_1fr] lg:gap-6">
      <LeadPost post={lead} />
      {side.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
          {side.map((p) => (
            <SidePost key={p.slug} post={p} />
          ))}
        </div>
      ) : null}
    </CardSpotlight>
  );
}

function LeadPost({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-spotlight
      className="group/card relative isolate flex min-h-[28rem] overflow-hidden rounded-[1.75rem] bg-[#0b1020] shadow-[0_40px_80px_-40px_rgb(40_40_120/0.55)] ring-1 ring-white/70 sm:min-h-[32rem] lg:min-h-[36rem] dark:ring-white/10"
    >
      <span aria-hidden="true" className={spotlight} />
      {post.cover ? (
        <Image
          src={post.cover.src}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 760px, 94vw"
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover/card:scale-[1.04]"
        />
      ) : (
        <span className="absolute inset-0 bg-[linear-gradient(135deg,#1b1f4a,#2b2a7a_55%,#5b3cc4)]" />
      )}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_10_30/0)_0%,rgb(8_10_30/0.15)_30%,rgb(8_10_30/0.7)_62%,rgb(8_10_30/0.94)_100%)]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_100%_100%,color-mix(in_oklab,var(--accent-to)_45%,transparent),transparent_70%)] mix-blend-screen"
      />

      <span className="absolute top-4 left-4 flex flex-wrap gap-2 sm:top-5 sm:left-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[image:var(--btn-gradient)] px-3 py-1 text-xs font-semibold text-white shadow-[0_6px_16px_-6px_rgb(0_0_0/0.45)]">
          <Sparkles aria-hidden="true" className="size-3.5" />
          Latest
        </span>
        <CategoryPill>{post.category}</CategoryPill>
      </span>

      <span className="relative mt-auto block w-full p-5 text-white sm:p-7 lg:p-9">
        <span className="flex flex-wrap items-center gap-x-2 text-[0.8125rem] text-white/75">
          <span className="font-semibold text-white">{post.author}</span>
          <span aria-hidden="true">·</span>
          <PostMeta as="span" post={post} className="text-white/75" />
        </span>
        <span className="mt-2 block max-w-[38rem] font-display text-[clamp(1.5rem,1.05rem+1.6vw,2.4rem)] leading-[1.1] font-bold tracking-[-0.035em] text-balance">
          {post.title}
        </span>
        <span className="mt-3 hidden max-w-[36rem] text-[0.9375rem] leading-relaxed text-white/80 sm:line-clamp-2">
          {post.excerpt}
        </span>
        <span className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#0b1020] shadow-[0_12px_30px_-12px_rgb(0_0_0/0.6)] transition-transform group-hover/card:-translate-y-0.5">
          Read the story
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/card:translate-x-0.5" />
        </span>
      </span>
    </Link>
  );
}

function SidePost({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-spotlight
      className={cn(
        "group/card relative isolate flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/90 bg-white/80 shadow-[0_1px_2px_rgb(30_40_90/0.05)] transition-[transform,box-shadow] duration-500 ease-out-expo",
        "hover:-translate-y-1 hover:shadow-[0_24px_44px_-24px_rgb(70_70_180/0.35)] dark:border-white/[0.08] dark:bg-white/[0.03]",
      )}
    >
      <span aria-hidden="true" className={spotlight} />
      <span className="relative block aspect-[16/8] overflow-hidden bg-[linear-gradient(135deg,#1b1f4a,#2b2a7a_55%,#5b3cc4)] lg:aspect-auto lg:min-h-0 lg:flex-1">
        {post.cover ? (
          <Image
            src={post.cover.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 480px, (min-width: 640px) 46vw, 94vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.05]"
          />
        ) : null}
        <CategoryPill className="absolute top-3 left-3">{post.category}</CategoryPill>
      </span>
      <span className="flex items-end gap-4 p-5">
        <span className="min-w-0 flex-1">
          <PostMeta as="span" post={post} />
          <span className="mt-1.5 line-clamp-2 block text-[1.0625rem] leading-snug font-semibold tracking-[-0.01em] text-ink">
            {post.title}
          </span>
        </span>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-ink shadow-[0_4px_12px_-4px_rgb(30_40_90/0.18)] transition-all duration-300 group-hover/card:bg-[image:var(--btn-gradient)] group-hover/card:text-white dark:bg-white/[0.08] dark:text-fg">
          <ArrowRight aria-hidden="true" className="size-4" />
        </span>
      </span>
    </Link>
  );
}
