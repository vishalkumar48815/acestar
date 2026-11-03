/**
 * Media section data: News (press coverage), Blog and Gallery.
 *
 * The content lives in plain JSON files so it can be edited without touching code
 * (and, later, by the /admin area):
 *   src/data/news.json     → press coverage
 *   src/data/blog.json     → blog posts (Markdown bodies)
 *   src/data/gallery.json  → photo albums
 * Images live in public/images/media/. Seeded from the old site by `npm run media:seed`.
 */
import blogData from "@/data/blog.json";
import galleryData from "@/data/gallery.json";
import newsData from "@/data/news.json";

export type MediaImage = { src: string; width: number; height: number };

export type PressLanguage = "en" | "ms" | "zh";
export type PressItem = {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  publisher: string;
  language: PressLanguage;
  excerpt: string;
  /** External article (opens in a new tab) or an internal path like /blog/… */
  url?: string;
  image?: MediaImage;
  featured?: boolean;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  author: string;
  excerpt: string;
  cover?: MediaImage;
  readingMinutes: number;
  /** Markdown. Empty until the full article has been imported. */
  body: string;
};

export type Photo = MediaImage & { id: string; alt: string };
export type Album = { id: string; title: string; year: string; description: string; cover?: string; photos: Photo[] };

/* ---------------------------------------------------------------- formatting */

const fmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
/** "2024-08-05" → "5 Aug 2024" (fixed locale + UTC, so server and client always agree). */
export const formatDate = (iso: string) => fmt.format(new Date(`${iso}T00:00:00Z`));

export const languageLabel: Record<PressLanguage, string> = { en: "English", ms: "Bahasa Malaysia", zh: "中文" };

export const isExternal = (url?: string) => Boolean(url && /^https?:\/\//.test(url));

/* ---------------------------------------------------------------- data */

const byDateDesc = <T extends { date: string }>(a: T, b: T) => b.date.localeCompare(a.date);

export const pressItems: PressItem[] = [...(newsData.items as PressItem[])].sort(byDateDesc);
export const featuredPress = pressItems.find((p) => p.featured) ?? pressItems[0];

export const blogPosts: BlogPost[] = [...(blogData.posts as BlogPost[])].sort(byDateDesc);
export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
export const blogCategories = [...new Set(blogPosts.map((p) => p.category))];

export const albums: Album[] = galleryData.albums as Album[];
export const photoCount = albums.reduce((n, a) => n + a.photos.length, 0);

/* ---------------------------------------------------------------- navigation */

export const mediaLinks = [
  { key: "news", label: "News", href: "/news", description: "Acestar in the press" },
  { key: "blog", label: "Blog", href: "/blog", description: "Guides, tips & intern stories" },
  { key: "gallery", label: "Gallery", href: "/gallery", description: "Events & milestones" },
] as const;

export const mediaRoutes = [...mediaLinks.map((l) => l.href), ...blogPosts.map((p) => `/blog/${p.slug}`)];
