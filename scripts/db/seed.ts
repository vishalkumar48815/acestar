/**
 * Seeds the database from the JSON files in src/data (the content migrated from the old site).
 *
 *   npm run db:seed          → fills tables that are still empty (safe to re-run)
 *   npm run db:reset         → wipes News, Blog and Gallery, then seeds again (asks no questions!)
 *
 * Images referenced by the JSON already live in /public, so they are registered as
 * `static` media assets (nothing is uploaded).
 */
import { stat } from "node:fs/promises";
import path from "node:path";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import blogJson from "../../src/data/blog.json" with { type: "json" };
import galleryJson from "../../src/data/gallery.json" with { type: "json" };
import newsJson from "../../src/data/news.json" with { type: "json" };
import * as schema from "../../src/server/db/schema";

for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {}
}

const force = process.argv.includes("--force");
const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set (copy .env.example to .env.local).");
  process.exit(1);
}
if (force && process.env.NODE_ENV === "production" && !process.argv.includes("--yes")) {
  console.error("Refusing to reset a production database without --yes.");
  process.exit(1);
}

const client = postgres(url, { max: 1, prepare: false, onnotice: () => {} });
const db = drizzle(client, { schema, casing: "snake_case" });
type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];

type Img = { src: string; width: number; height: number };

async function asset(tx: Tx, img: Img | undefined) {
  if (!img) return null;
  const bytes = await stat(path.join(process.cwd(), "public", img.src))
    .then((s) => s.size)
    .catch(() => null);
  const [row] = await tx
    .insert(schema.mediaAssets)
    .values({ url: img.src, storage: "static", width: img.width, height: img.height, bytes, mimeType: mime(img.src) })
    .onConflictDoUpdate({ target: schema.mediaAssets.url, set: { width: img.width, height: img.height } })
    .returning({ id: schema.mediaAssets.id });
  return row.id;
}

const mime = (src: string) =>
  src.endsWith(".webp")
    ? "image/webp"
    : src.endsWith(".png")
      ? "image/png"
      : src.endsWith(".avif")
        ? "image/avif"
        : "image/jpeg";

async function isEmpty(tx: Tx, table: typeof schema.pressItems | typeof schema.blogPosts | typeof schema.albums) {
  const [{ n }] = await tx.select({ n: sql<number>`count(*)::int` }).from(table);
  return n === 0;
}

async function main() {
  await db.transaction(async (tx) => {
    if (force) {
      console.log("Resetting News, Blog and Gallery tables…");
      await tx.execute(sql`truncate table gallery_photos, albums, blog_posts, press_items restart identity cascade`);
      await tx.execute(sql`delete from media_assets where storage = 'static'`);
    }

    /* News */
    if (await isEmpty(tx, schema.pressItems)) {
      let featuredTaken = false;
      for (const item of newsJson.items as Array<{
        title: string;
        date: string;
        publisher: string;
        language: "en" | "ms" | "zh";
        excerpt: string;
        url?: string;
        image?: Img;
        featured?: boolean;
      }>) {
        const featured: boolean = Boolean(item.featured) && !featuredTaken;
        featuredTaken ||= featured;
        await tx.insert(schema.pressItems).values({
          title: item.title,
          publisher: item.publisher,
          language: item.language,
          excerpt: item.excerpt,
          url: item.url ?? null,
          imageId: await asset(tx, item.image),
          featured,
          status: "published",
          publishedOn: item.date,
        });
      }
      console.log(`✓ News: ${newsJson.items.length} stories`);
    } else console.log("· News already has data, skipped");

    /* Blog */
    if (await isEmpty(tx, schema.blogPosts)) {
      for (const post of blogJson.posts as Array<{
        slug: string;
        title: string;
        date: string;
        category: string;
        author: string;
        excerpt: string;
        cover?: Img;
        readingMinutes: number;
        body: string;
      }>) {
        await tx.insert(schema.blogPosts).values({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          body: post.body,
          category: post.category,
          author: post.author,
          coverId: await asset(tx, post.cover),
          readingMinutes: post.readingMinutes,
          status: "published",
          publishedOn: post.date,
        });
      }
      console.log(`✓ Blog: ${blogJson.posts.length} posts`);
    } else console.log("· Blog already has data, skipped");

    /* Gallery */
    if (await isEmpty(tx, schema.albums)) {
      let photoTotal = 0;
      for (const [i, album] of galleryJson.albums.entries()) {
        const [row] = await tx
          .insert(schema.albums)
          .values({
            slug: album.id,
            title: album.title,
            period: album.year,
            description: album.description,
            position: i,
            status: "published",
          })
          .returning({ id: schema.albums.id });

        let coverPhotoId: string | null = null;
        for (const [j, photo] of album.photos.entries()) {
          const [p] = await tx
            .insert(schema.galleryPhotos)
            .values({ albumId: row.id, assetId: (await asset(tx, photo))!, alt: photo.alt, position: j })
            .returning({ id: schema.galleryPhotos.id });
          if (photo.id === album.cover) coverPhotoId = p.id;
          photoTotal++;
        }
        if (coverPhotoId) {
          await tx
            .update(schema.albums)
            .set({ coverPhotoId })
            .where(sql`${schema.albums.id} = ${row.id}`);
        }
      }
      console.log(`✓ Gallery: ${galleryJson.albums.length} albums, ${photoTotal} photos`);
    } else console.log("· Gallery already has data, skipped");
  });
}

main()
  .then(() => console.log("Done."))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => client.end());
