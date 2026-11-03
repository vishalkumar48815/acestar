/**
 * Media section (News, Blog, Gallery): shared types, formatting helpers and navigation.
 *
 * The data itself is loaded on the server by src/server/content/media.ts:
 * from PostgreSQL when DATABASE_URL is set (managed in /admin), otherwise from the
 * JSON files in src/data (the original seed content). Images live in public/images/media
 * (seeded) or in Vercel Blob / public/uploads (uploaded from /admin).
 */

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
  /** Markdown. Not loaded on list pages (empty string there). */
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

/* ---------------------------------------------------------------- navigation */

export const mediaLinks = [
  { key: "news", label: "News", href: "/news", description: "Acestar in the press" },
  { key: "blog", label: "Blog", href: "/blog", description: "Guides, tips & intern stories" },
  { key: "gallery", label: "Gallery", href: "/gallery", description: "Events & milestones" },
] as const;

/* ---------------------------------------------------------------- helpers */

/** ~200 words per minute, at least 1. */
export const estimateReadingMinutes = (markdown: string) =>
  Math.max(1, Math.round(markdown.split(/\s+/).filter(Boolean).length / 200));

/** "Hello, World!" → "hello-world" */
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
