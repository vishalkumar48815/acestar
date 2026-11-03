import Image from "next/image";
import Link from "next/link";
import { spotlight } from "@/components/solutions/primitives";
import { ArrowRight } from "@/components/ui/icons";
import { formatDate, type BlogPost } from "@/content/newsroom";
import { cn } from "@/lib/utils";

const card = cn(
  "group/card relative isolate flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-white/90 bg-white/80 shadow-[0_1px_2px_rgb(30_40_90/0.05)] transition-[transform,box-shadow] duration-500 ease-out-expo",
  "hover:-translate-y-1 hover:shadow-[0_24px_44px_-24px_rgb(70_70_180/0.35)] dark:border-white/[0.08] dark:bg-white/[0.03]",
);

export function PostMeta({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-fg-subtle", className)}>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readingMinutes} min read</span>
    </p>
  );
}

export function CategoryPill({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "z-10 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#1468c4] shadow-[0_4px_12px_-4px_rgb(0_0_0/0.35)] dark:bg-[#0b1222] dark:text-[#9fb8ff]",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Standard post card used on the index and as "related posts". */
export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} data-spotlight className={card}>
      <span aria-hidden="true" className={spotlight} />
      <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,#1b1f4a,#2b2a7a_55%,#5b3cc4)]">
        {post.cover ? (
          <Image
            src={post.cover.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 92vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.05]"
          />
        ) : null}
        <CategoryPill className="absolute top-3 left-3">{post.category}</CategoryPill>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <PostMeta post={post} />
        <h3 className="mt-2 line-clamp-2 text-[1.0625rem] leading-snug font-semibold tracking-[-0.01em] text-ink">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-fg-muted">{post.excerpt}</p>
        <span className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="truncate text-[0.8125rem] font-medium text-fg-muted">{post.author}</span>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-ink shadow-[0_4px_12px_-4px_rgb(30_40_90/0.18)] transition-all duration-300 group-hover/card:bg-[image:var(--btn-gradient)] group-hover/card:text-white dark:bg-white/[0.08] dark:text-fg">
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>
        </span>
      </div>
    </Link>
  );
}

/** Wide card for the newest post. */
export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} data-spotlight className={cn(card, "grid md:grid-cols-[1.15fr_1fr]")}>
      <span aria-hidden="true" className={spotlight} />
      <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,#1b1f4a,#2b2a7a_55%,#5b3cc4)] md:aspect-auto md:min-h-[22rem]">
        {post.cover ? (
          <Image
            src={post.cover.src}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 620px, 92vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.04]"
          />
        ) : null}
        <CategoryPill className="absolute top-4 left-4">Latest</CategoryPill>
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <p className="text-gradient text-[0.6875rem] font-semibold tracking-[0.34em] uppercase sm:text-xs">
          {post.category}
        </p>
        <h2 className="mt-3 font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] leading-[1.12] font-bold tracking-[-0.035em] text-balance text-ink">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-4 leading-relaxed text-fg-muted">{post.excerpt}</p>
        <div className="mt-6 flex items-center justify-between gap-4">
          <span>
            <span className="block text-sm font-semibold text-ink">{post.author}</span>
            <PostMeta post={post} />
          </span>
          <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[image:var(--btn-gradient)] px-5 text-sm font-semibold text-white shadow-[var(--btn-gradient-shadow)]">
            Read
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/card:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
