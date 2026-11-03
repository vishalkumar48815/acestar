import "server-only";
import { eq, sql } from "drizzle-orm";
import { getDb, schema } from "@/server/db";
import { deleteStoredImage } from "@/server/storage";

/**
 * Deletes an uploaded image (row + file) once nothing points at it any more.
 * Seed images (`static`) are never deleted. Call after a replace/remove/delete has been committed.
 */
export async function releaseAsset(assetId: string | null | undefined) {
  if (!assetId) return;
  const db = getDb();
  const [asset] = await db.select().from(schema.mediaAssets).where(eq(schema.mediaAssets.id, assetId));
  if (!asset || asset.storage === "static") return;

  const [{ used }] = await db.execute<{ used: boolean }>(sql`
    select exists (select 1 from press_items where image_id = ${assetId})
        or exists (select 1 from blog_posts where cover_id = ${assetId})
        or exists (select 1 from gallery_photos where asset_id = ${assetId})
        or exists (select 1 from blog_posts where position(${asset.url} in body) > 0) as used
  `);
  if (used) return;

  await db.delete(schema.mediaAssets).where(eq(schema.mediaAssets.id, assetId));
  await deleteStoredImage(asset);
}

/** Postgres error code (unwraps Drizzle's query error). 23505 = unique violation, 23503 = FK violation. */
export function pgCode(error: unknown): string | undefined {
  const e = error as { code?: string; cause?: { code?: string } };
  return e?.code ?? e?.cause?.code;
}
