/**
 * Database schema (PostgreSQL, Drizzle ORM). This file is the single source of truth:
 * `npm run db:generate` turns changes here into a SQL migration in /drizzle.
 *
 * Conventions
 *  - snake_case in SQL, camelCase in TypeScript (`casing: "snake_case"` in the client + drizzle.config).
 *  - uuid primary keys (safe to expose in admin URLs, no enumeration).
 *  - Every content table has `status` (draft | published) and created/updated timestamps.
 *  - Images are rows in `media_assets`; content references them by id.
 *  - Calendar dates (publish dates) are `date` columns read as "yyyy-mm-dd" strings, not timestamps.
 */
import { relations, sql } from "drizzle-orm";
import {
  type AnyPgColumn,
  bigserial,
  boolean,
  check,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  smallint,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

/* ---------------------------------------------------------------- enums */

export const publishStatus = pgEnum("publish_status", ["draft", "published"]);
export const pressLanguage = pgEnum("press_language", ["en", "ms", "zh"]);
/** Where an image file lives: `static` = committed in /public, `local` = public/uploads (dev), `blob` = Vercel Blob. */
export const storageDriver = pgEnum("storage_driver", ["static", "local", "blob"]);

const timestamps = {
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
};

const slugFormat = (column: AnyPgColumn) => sql`${column} ~ '^[a-z0-9]+(-[a-z0-9]+)*$'`;

/* ---------------------------------------------------------------- media */

export const mediaAssets = pgTable(
  "media_assets",
  {
    id: uuid().primaryKey().defaultRandom(),
    url: text().notNull(),
    storage: storageDriver().notNull(),
    /** Path inside the storage driver, used to delete the file. Null for `static`. */
    storageKey: text(),
    width: integer().notNull(),
    height: integer().notNull(),
    bytes: integer(),
    mimeType: text().notNull().default("image/webp"),
    createdAt: timestamps.createdAt,
  },
  (t) => [
    uniqueIndex("media_assets_url_key").on(t.url),
    check("media_assets_dimensions_positive", sql`${t.width} > 0 and ${t.height} > 0`),
  ],
);

/* ---------------------------------------------------------------- news (press coverage) */

export const pressItems = pgTable(
  "press_items",
  {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull(),
    publisher: text().notNull(),
    language: pressLanguage().notNull().default("en"),
    excerpt: text().notNull().default(""),
    /** External article URL, or an internal path such as /blog/… */
    url: text(),
    imageId: uuid().references(() => mediaAssets.id, { onDelete: "set null" }),
    featured: boolean().notNull().default(false),
    status: publishStatus().notNull().default("draft"),
    publishedOn: date({ mode: "string" }).notNull(),
    ...timestamps,
  },
  (t) => [
    index("press_items_status_published_on_idx").on(t.status, t.publishedOn.desc()),
    // At most one "top story" at a time.
    uniqueIndex("press_items_single_featured_key")
      .on(t.featured)
      .where(sql`${t.featured}`),
    index("press_items_image_id_idx").on(t.imageId),
  ],
);

/* ---------------------------------------------------------------- blog */

export const blogPosts = pgTable(
  "blog_posts",
  {
    id: uuid().primaryKey().defaultRandom(),
    slug: text().notNull(),
    title: text().notNull(),
    excerpt: text().notNull().default(""),
    /** Markdown (## headings, lists, > quotes, ![alt](url "WxH") images, **bold**, [links](url)). */
    body: text().notNull().default(""),
    category: text().notNull(),
    author: text().notNull().default("Acestar"),
    coverId: uuid().references(() => mediaAssets.id, { onDelete: "set null" }),
    readingMinutes: smallint().notNull().default(1),
    status: publishStatus().notNull().default("draft"),
    publishedOn: date({ mode: "string" }).notNull(),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("blog_posts_slug_key").on(t.slug),
    check("blog_posts_slug_format", slugFormat(t.slug)),
    index("blog_posts_status_published_on_idx").on(t.status, t.publishedOn.desc()),
    index("blog_posts_cover_id_idx").on(t.coverId),
  ],
);

/* ---------------------------------------------------------------- gallery */

export const albums = pgTable(
  "albums",
  {
    id: uuid().primaryKey().defaultRandom(),
    slug: text().notNull(),
    title: text().notNull(),
    /** Display label for the time span, e.g. "2023–2025". */
    period: text().notNull().default(""),
    description: text().notNull().default(""),
    /** One of the album's own photos. */
    coverPhotoId: uuid().references((): AnyPgColumn => galleryPhotos.id, { onDelete: "set null" }),
    /** Display order on /gallery (ascending). */
    position: integer().notNull().default(0),
    status: publishStatus().notNull().default("draft"),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("albums_slug_key").on(t.slug),
    check("albums_slug_format", slugFormat(t.slug)),
    index("albums_status_position_idx").on(t.status, t.position),
  ],
);

export const galleryPhotos = pgTable(
  "gallery_photos",
  {
    id: uuid().primaryKey().defaultRandom(),
    albumId: uuid()
      .notNull()
      .references(() => albums.id, { onDelete: "cascade" }),
    assetId: uuid()
      .notNull()
      .references(() => mediaAssets.id, { onDelete: "restrict" }),
    alt: text().notNull().default(""),
    position: integer().notNull().default(0),
    createdAt: timestamps.createdAt,
  },
  (t) => [
    index("gallery_photos_album_position_idx").on(t.albumId, t.position),
    index("gallery_photos_asset_id_idx").on(t.assetId),
  ],
);

/* ---------------------------------------------------------------- admin */

/** Login attempts, for brute-force throttling (per IP, rolling window). Safe to prune rows older than a day. */
export const adminLoginAttempts = pgTable(
  "admin_login_attempts",
  {
    id: bigserial({ mode: "number" }).primaryKey(),
    ip: text().notNull(),
    succeeded: boolean().notNull(),
    createdAt: timestamps.createdAt,
  },
  (t) => [index("admin_login_attempts_ip_created_at_idx").on(t.ip, t.createdAt.desc())],
);

/* ---------------------------------------------------------------- relations (for db.query.*) */

export const pressItemsRelations = relations(pressItems, ({ one }) => ({
  image: one(mediaAssets, { fields: [pressItems.imageId], references: [mediaAssets.id] }),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  cover: one(mediaAssets, { fields: [blogPosts.coverId], references: [mediaAssets.id] }),
}));

export const albumsRelations = relations(albums, ({ many, one }) => ({
  photos: many(galleryPhotos),
  coverPhoto: one(galleryPhotos, {
    fields: [albums.coverPhotoId],
    references: [galleryPhotos.id],
    relationName: "album_cover",
  }),
}));

export const galleryPhotosRelations = relations(galleryPhotos, ({ one }) => ({
  album: one(albums, { fields: [galleryPhotos.albumId], references: [albums.id] }),
  asset: one(mediaAssets, { fields: [galleryPhotos.assetId], references: [mediaAssets.id] }),
}));

export type MediaAssetRow = typeof mediaAssets.$inferSelect;
export type PressItemRow = typeof pressItems.$inferSelect;
export type BlogPostRow = typeof blogPosts.$inferSelect;
export type AlbumRow = typeof albums.$inferSelect;
export type GalleryPhotoRow = typeof galleryPhotos.$inferSelect;
