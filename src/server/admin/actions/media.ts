"use server";

import { requireAdmin } from "@/server/auth/session";
import { getDb, hasDatabase, schema } from "@/server/db";
import { storeImage, UploadError, type UploadFolder } from "@/server/storage";

export type UploadedAsset = { id: string; url: string; width: number; height: number };
export type UploadResult = { ok: true; asset: UploadedAsset } | { ok: false; message: string };

const folders = new Set<UploadFolder>(["news", "blog", "gallery"]);

/** Stores one image and registers it in media_assets. Used by image pickers and the Markdown editor. */
export async function uploadImage(formData: FormData): Promise<UploadResult> {
  await requireAdmin();
  if (!hasDatabase) return { ok: false, message: "Connect a database before uploading images." };

  const file = formData.get("file");
  const folder = String(formData.get("folder")) as UploadFolder;
  if (!(file instanceof File) || file.size === 0) return { ok: false, message: "Choose an image to upload." };
  if (!folders.has(folder)) return { ok: false, message: "Unknown upload folder." };

  try {
    const stored = await storeImage(file, folder);
    const [asset] = await getDb().insert(schema.mediaAssets).values(stored).returning({
      id: schema.mediaAssets.id,
      url: schema.mediaAssets.url,
      width: schema.mediaAssets.width,
      height: schema.mediaAssets.height,
    });
    return { ok: true, asset };
  } catch (error) {
    if (error instanceof UploadError) return { ok: false, message: error.message };
    console.error("[admin] upload failed", error);
    return { ok: false, message: "Upload failed. Please try again." };
  }
}
