import "server-only";
import { and, asc, desc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import type { Album, BlogPost, MediaImage, PressItem } from "@/content/newsroom";
import blogJson from "@/data/blog.json";
import galleryJson from "@/data/gallery.json";
import newsJson from "@/data/news.json";
import { getDb, hasDatabase, schema } from "@/server/db";

/**
 * Public read model for News, Blog and Gallery.
 *
 * Every getter is a `use cache` function: pages are prerendered at build time and served
 * statically. Admin Server Actions call `updateTag(contentTags.x)` after a change, so the
 * next visit regenerates only what changed. `cacheLife("hours")` is a safety net for edits
 * made outside /admin (for example in Drizzle Studio).
 *
 * Without DATABASE_URL the same functions read the seed JSON in src/data, so the site
 * builds and runs before a database exists.
 */

export const contentTags = { press: "press", blog: "blog", gallery: "gallery" } as const;

const { pressItems, blogPosts, albums, galleryPhotos } = schema;
const published = "published" as const;

const toImage = (a: { url: string; width: number; height: number } | null | undefined): MediaImage | undefined =>
  a ? { src: a.url, width: a.width, height: a.height } : undefined;

const byDateDesc = <T extends { date: string }>(a: T, b: T) => b.date.localeCompare(a.date);

/* ---------------------------------------------------------------- news */

export async function getPressItems(): Promise<PressItem[]> {
  "use cache";
  cacheTag(contentTags.press);
  cacheLife("hours");

  if (!hasDatabase) return [...(newsJson.items as PressItem[])].sort(byDateDesc);

  const rows = await getDb().query.pressItems.findMany({
    where: eq(pressItems.status, published),
    orderBy: [desc(pressItems.publishedOn), desc(pressItems.createdAt)],
    with: { image: { columns: { url: true, width: true, height: true } } },
  });
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    date: r.publishedOn,
    publisher: r.publisher,
    language: r.language,
    excerpt: r.excerpt,
    url: r.url ?? undefined,
    image: toImage(r.image),
    featured: r.featured,
  }));
}

/* ---------------------------------------------------------------- blog */

const blogListColumns = {
  slug: true,
  title: true,
  publishedOn: true,
  category: true,
  author: true,
  excerpt: true,
  readingMinutes: true,
} as const;

/** All published posts, newest first, without bodies (list pages don't need them). */
export async function getBlogPosts(): Promise<BlogPost[]> {
  "use cache";
  cacheTag(contentTags.blog);
  cacheLife("hours");

  if (!hasDatabase) return (blogJson.posts as BlogPost[]).map((p) => ({ ...p, body: "" })).sort(byDateDesc);

  const rows = await getDb().query.blogPosts.findMany({
    columns: blogListColumns,
    where: eq(blogPosts.status, published),
    orderBy: [desc(blogPosts.publishedOn), desc(blogPosts.createdAt)],
    with: { cover: { columns: { url: true, width: true, height: true } } },
  });
  return rows.map((r) => toBlogPost({ ...r, body: "" }));
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  "use cache";
  cacheTag(contentTags.blog);
  cacheLife("hours");

  if (!hasDatabase) return (blogJson.posts as BlogPost[]).find((p) => p.slug === slug);

  const row = await getDb().query.blogPosts.findFirst({
    columns: { ...blogListColumns, body: true },
    where: and(eq(blogPosts.slug, slug), eq(blogPosts.status, published)),
    with: { cover: { columns: { url: true, width: true, height: true } } },
  });
  return row ? toBlogPost(row) : undefined;
}

function toBlogPost(r: {
  slug: string;
  title: string;
  publishedOn: string;
  category: string;
  author: string;
  excerpt: string;
  readingMinutes: number;
  body: string;
  cover: { url: string; width: number; height: number } | null;
}): BlogPost {
  return {
    slug: r.slug,
    title: r.title,
    date: r.publishedOn,
    category: r.category,
    author: r.author,
    excerpt: r.excerpt,
    readingMinutes: r.readingMinutes,
    body: r.body,
    cover: toImage(r.cover),
  };
}

/* ---------------------------------------------------------------- gallery */

export async function getAlbums(): Promise<Album[]> {
  "use cache";
  cacheTag(contentTags.gallery);
  cacheLife("hours");

  if (!hasDatabase) return galleryJson.albums as Album[];

  const rows = await getDb().query.albums.findMany({
    where: eq(albums.status, published),
    orderBy: [asc(albums.position), asc(albums.createdAt)],
    with: {
      photos: {
        orderBy: [asc(galleryPhotos.position), asc(galleryPhotos.createdAt)],
        columns: { id: true, alt: true },
        with: { asset: { columns: { url: true, width: true, height: true } } },
      },
    },
  });
  return rows
    .filter((a) => a.photos.length > 0)
    .map((a) => ({
      id: a.slug,
      title: a.title,
      year: a.period,
      description: a.description,
      cover: a.coverPhotoId ?? undefined,
      photos: a.photos.map((p) => ({
        id: p.id,
        alt: p.alt,
        src: p.asset.url,
        width: p.asset.width,
        height: p.asset.height,
      })),
    }));
}

/* ---------------------------------------------------------------- derived */

export async function getMediaRoutes() {
  const posts = await getBlogPosts();
  return ["/news", "/blog", "/gallery", ...posts.map((p) => `/blog/${p.slug}`)];
}
