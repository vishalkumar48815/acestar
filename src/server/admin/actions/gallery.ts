"use server";

import { and, asc, eq, max, sql } from "drizzle-orm";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import type { FormState } from "@/lib/admin-form";
import { pgCode, releaseAsset } from "@/server/admin/assets";
import { isUuid } from "@/server/admin/queries";
import { albumSchema, formObject, invalid } from "@/server/admin/validation";
import { requireAdmin } from "@/server/auth/session";
import { contentTags } from "@/server/content/media";
import { getDb, schema } from "@/server/db";
import { storeImage, UploadError } from "@/server/storage";

const { albums, galleryPhotos, mediaAssets } = schema;

export type ActionResult = { ok: true } | { ok: false; message: string };
const fail = (message: string): ActionResult => ({ ok: false, message });

/* ---------------------------------------------------------------- albums */

export async function saveAlbum(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id && !isUuid(id)) return { status: "error", message: "Unknown album." };

  const parsed = albumSchema.safeParse(formObject(formData));
  if (!parsed.success) return invalid(parsed.error);

  const db = getDb();
  let savedId = id;
  try {
    if (id) {
      const updated = await db.update(albums).set(parsed.data).where(eq(albums.id, id)).returning({ id: albums.id });
      if (!updated.length) return { status: "error", message: "This album no longer exists." };
    } else {
      const [{ last }] = await db.select({ last: max(albums.position) }).from(albums);
      const [row] = await db
        .insert(albums)
        .values({ ...parsed.data, position: (last ?? -1) + 1 })
        .returning({ id: albums.id });
      savedId = row.id;
    }
  } catch (error) {
    if (pgCode(error) === "23505") {
      return {
        status: "error",
        message: "Please fix the highlighted fields.",
        fieldErrors: { slug: ["Another album already uses this slug."] },
      };
    }
    console.error("[admin] saveAlbum", error);
    return { status: "error", message: "Couldn't save the album. Please try again." };
  }

  updateTag(contentTags.gallery);
  if (!id) redirect(`/admin/gallery/${savedId}?created=1`);
  return { status: "success", message: "Album saved." };
}

export async function deleteAlbum(id: string) {
  await requireAdmin();
  if (!isUuid(id)) return;
  const db = getDb();
  const assetIds = await db
    .select({ assetId: galleryPhotos.assetId })
    .from(galleryPhotos)
    .where(eq(galleryPhotos.albumId, id));
  await db.delete(albums).where(eq(albums.id, id)); // photos cascade
  for (const { assetId } of assetIds) await releaseAsset(assetId);
  updateTag(contentTags.gallery);
  redirect("/admin/gallery?deleted=1");
}

/** Swaps an album with its neighbour in the display order. */
export async function moveAlbum(id: string, direction: "up" | "down"): Promise<ActionResult> {
  await requireAdmin();
  if (!isUuid(id)) return fail("Unknown album.");
  const db = getDb();
  await db.transaction(async (tx) => {
    const list = await tx.select({ id: albums.id }).from(albums).orderBy(asc(albums.position), asc(albums.createdAt));
    const i = list.findIndex((a) => a.id === id);
    const j = direction === "up" ? i - 1 : i + 1;
    if (i < 0 || j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
    // Rewrite positions 0..n-1 in one statement (also repairs gaps or duplicates).
    await tx.execute(sql`
      update albums a set position = x.ord - 1
      from unnest(${toUuidArray(list.map((a) => a.id))}) with ordinality as x(id, ord)
      where a.id = x.id
    `);
  });
  updateTag(contentTags.gallery);
  return { ok: true };
}

/* ---------------------------------------------------------------- photos */

/** Uploads one photo to the end of an album. The client calls this once per file (keeps requests small). */
export async function addPhoto(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const albumId = String(formData.get("albumId") ?? "");
  const file = formData.get("file");
  if (!isUuid(albumId)) return fail("Unknown album.");
  if (!(file instanceof File) || file.size === 0) return fail("Choose an image.");

  const db = getDb();
  const [album] = await db.select({ coverPhotoId: albums.coverPhotoId }).from(albums).where(eq(albums.id, albumId));
  if (!album) return fail("This album no longer exists.");

  let stored;
  try {
    stored = await storeImage(file, "gallery");
  } catch (error) {
    if (error instanceof UploadError) return fail(`${file.name}: ${error.message}`);
    console.error("[admin] addPhoto", error);
    return fail(`${file.name}: upload failed.`);
  }

  await db.transaction(async (tx) => {
    const [asset] = await tx.insert(mediaAssets).values(stored).returning({ id: mediaAssets.id });
    const [{ last }] = await tx
      .select({ last: max(galleryPhotos.position) })
      .from(galleryPhotos)
      .where(eq(galleryPhotos.albumId, albumId));
    const alt = String(formData.get("alt") ?? "")
      .trim()
      .slice(0, 300);
    const [photo] = await tx
      .insert(galleryPhotos)
      .values({ albumId, assetId: asset.id, alt, position: (last ?? -1) + 1 })
      .returning({ id: galleryPhotos.id });
    if (!album.coverPhotoId) await tx.update(albums).set({ coverPhotoId: photo.id }).where(eq(albums.id, albumId));
  });
  updateTag(contentTags.gallery);
  return { ok: true };
}

export async function updatePhotoAlt(photoId: string, alt: string): Promise<ActionResult> {
  await requireAdmin();
  if (!isUuid(photoId)) return fail("Unknown photo.");
  await getDb()
    .update(galleryPhotos)
    .set({ alt: alt.trim().slice(0, 300) })
    .where(eq(galleryPhotos.id, photoId));
  updateTag(contentTags.gallery);
  return { ok: true };
}

export async function reorderPhotos(albumId: string, orderedIds: string[]): Promise<ActionResult> {
  await requireAdmin();
  if (!isUuid(albumId) || !orderedIds.every(isUuid)) return fail("Invalid order.");
  await getDb().execute(sql`
    update gallery_photos g set position = x.ord - 1
    from unnest(${toUuidArray(orderedIds)}) with ordinality as x(id, ord)
    where g.id = x.id and g.album_id = ${albumId}
  `);
  updateTag(contentTags.gallery);
  return { ok: true };
}

export async function setAlbumCover(albumId: string, photoId: string): Promise<ActionResult> {
  await requireAdmin();
  if (!isUuid(albumId) || !isUuid(photoId)) return fail("Invalid photo.");
  const db = getDb();
  const [photo] = await db
    .select({ id: galleryPhotos.id })
    .from(galleryPhotos)
    .where(and(eq(galleryPhotos.id, photoId), eq(galleryPhotos.albumId, albumId)));
  if (!photo) return fail("That photo isn't in this album.");
  await db.update(albums).set({ coverPhotoId: photoId }).where(eq(albums.id, albumId));
  updateTag(contentTags.gallery);
  return { ok: true };
}

export async function deletePhoto(photoId: string): Promise<ActionResult> {
  await requireAdmin();
  if (!isUuid(photoId)) return fail("Unknown photo.");
  const db = getDb();
  const [row] = await db.delete(galleryPhotos).where(eq(galleryPhotos.id, photoId)).returning({
    albumId: galleryPhotos.albumId,
    assetId: galleryPhotos.assetId,
  });
  if (!row) return { ok: true };
  // If it was the cover (FK set it to null), promote the album's first remaining photo.
  await db.execute(sql`
    update albums set cover_photo_id = (
      select id from gallery_photos where album_id = ${row.albumId} order by position, created_at limit 1
    ) where id = ${row.albumId} and cover_photo_id is null
  `);
  await releaseAsset(row.assetId);
  updateTag(contentTags.gallery);
  return { ok: true };
}

const toUuidArray = (ids: string[]) =>
  ids.length
    ? sql`array[${sql.join(
        ids.map((id) => sql`${id}`),
        sql`, `,
      )}]::uuid[]`
    : sql`'{}'::uuid[]`;
