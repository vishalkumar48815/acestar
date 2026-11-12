import "server-only";
import { randomBytes } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp, { type OutputInfo } from "sharp";

/**
 * Image storage for admin uploads.
 *
 *  - BLOB_READ_WRITE_TOKEN set → Vercel Blob (production).
 *  - otherwise                → public/uploads (local development only; Vercel's filesystem is read-only).
 *
 * Every upload is normalised with sharp: EXIF rotation applied, metadata stripped,
 * longest side capped at 2400px, re-encoded as WebP. Width/height are stored so pages never shift.
 */

export type StoredImage = {
  url: string;
  storage: "local" | "blob";
  storageKey: string;
  width: number;
  height: number;
  bytes: number;
  mimeType: "image/webp";
};

export type UploadFolder = "news" | "blog" | "gallery";

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const ACCEPTED = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);
const MAX_EDGE = 2560;

export const storageDriver = () => (process.env.BLOB_READ_WRITE_TOKEN ? "blob" : "local");

export class UploadError extends Error {}

export async function storeImage(file: File, folder: UploadFolder): Promise<StoredImage> {
  if (!ACCEPTED.has(file.type)) throw new UploadError("Use a JPG, PNG, WebP, AVIF or GIF image.");
  if (file.size > MAX_UPLOAD_BYTES) throw new UploadError("Images must be 8 MB or smaller.");
  if (storageDriver() === "local" && process.env.VERCEL) {
    throw new UploadError("Uploads need a Vercel Blob store on this deployment (BLOB_READ_WRITE_TOKEN).");
  }

  let output: { data: Buffer; info: OutputInfo };
  try {
    output = await sharp(Buffer.from(await file.arrayBuffer()), { limitInputPixels: 80_000_000 })
      .rotate()
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 90, effort: 4 })
      .toBuffer({ resolveWithObject: true });
  } catch {
    throw new UploadError("That file could not be read as an image.");
  }

  const key = `${folder}/${new Date().getUTCFullYear()}/${randomBytes(6).toString("hex")}-${baseName(file.name)}.webp`;
  const meta = {
    width: output.info.width,
    height: output.info.height,
    bytes: output.data.length,
    mimeType: "image/webp" as const,
  };

  if (storageDriver() === "blob") {
    const { put } = await import("@vercel/blob");
    const blob = await put(`uploads/${key}`, output.data, {
      access: "public",
      contentType: "image/webp",
      addRandomSuffix: false,
      cacheControlMaxAge: 60 * 60 * 24 * 365,
    });
    return { url: blob.url, storage: "blob", storageKey: blob.pathname, ...meta };
  }

  const target = path.join(process.cwd(), "public", "uploads", key);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, output.data);
  return { url: `/uploads/${key}`, storage: "local", storageKey: key, ...meta };
}

/** Best effort: a missing file is not an error. Static (committed) images are never deleted. */
export async function deleteStoredImage(asset: { storage: string; storageKey: string | null; url: string }) {
  try {
    if (asset.storage === "blob") {
      const { del } = await import("@vercel/blob");
      await del(asset.url);
    } else if (asset.storage === "local" && asset.storageKey) {
      const root = path.join(process.cwd(), "public", "uploads");
      const target = path.join(root, asset.storageKey);
      if (target.startsWith(root + path.sep)) await unlink(target);
    }
  } catch (error) {
    console.warn("[storage] could not delete", asset.url, error);
  }
}

function baseName(name: string) {
  return (
    name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "image"
  );
}
