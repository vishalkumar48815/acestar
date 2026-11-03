/**
 * Deletes uploaded images that nothing references any more (for example an image uploaded
 * in /admin and then replaced, or a form that was abandoned after uploading).
 *
 *   npm run db:cleanup-media            → dry run, lists what would be deleted
 *   npm run db:cleanup-media -- --apply → deletes rows and files
 *
 * Only `local` and `blob` assets older than 24 hours are considered; `static` seed images are never touched.
 */
import { unlink } from "node:fs/promises";
import path from "node:path";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../../src/server/db/schema";

for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {}
}
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set.");

const apply = process.argv.includes("--apply");
const client = postgres(process.env.DATABASE_URL, { max: 1, prepare: false });
const db = drizzle(client, { schema, casing: "snake_case" });

async function main() {
  const orphans = await db.execute<{ id: string; url: string; storage: string; storage_key: string | null }>(sql`
    select a.id, a.url, a.storage, a.storage_key
    from media_assets a
    where a.storage <> 'static'
      and a.created_at < now() - interval '24 hours'
      and not exists (select 1 from press_items p where p.image_id = a.id)
      and not exists (select 1 from blog_posts b where b.cover_id = a.id)
      and not exists (select 1 from gallery_photos g where g.asset_id = a.id)
      and not exists (select 1 from blog_posts b where position(a.url in b.body) > 0)
  `);
  console.log(`${orphans.length} unused image(s)${apply ? "" : " (dry run, add -- --apply to delete)"}`);
  for (const a of orphans) {
    console.log(" ", a.url);
    if (!apply) continue;
    if (a.storage === "blob") {
      const { del } = await import("@vercel/blob");
      await del(a.url).catch((e) => console.warn("   could not delete blob:", e.message));
    } else if (a.storage_key) {
      await unlink(path.join(process.cwd(), "public", "uploads", a.storage_key)).catch(() => {});
    }
    await db.execute(sql`delete from media_assets where id = ${a.id}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => client.end());
