"use server";

import { and, eq, ne } from "drizzle-orm";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import type { FormState } from "@/lib/admin-form";
import { releaseAsset } from "@/server/admin/assets";
import { isUuid } from "@/server/admin/queries";
import { formObject, invalid, pressSchema } from "@/server/admin/validation";
import { requireAdmin } from "@/server/auth/session";
import { contentTags } from "@/server/content/media";
import { getDb, schema } from "@/server/db";

const { pressItems } = schema;

export async function savePress(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id && !isUuid(id)) return { status: "error", message: "Unknown story." };

  const parsed = pressSchema.safeParse(formObject(formData));
  if (!parsed.success) return invalid(parsed.error);
  const data = parsed.data;

  let savedId: string;
  let previousImageId: string | null = null;
  try {
    savedId = await getDb().transaction(async (tx) => {
      // Only one top story: clear the flag elsewhere first (a partial unique index enforces it).
      if (data.featured) {
        await tx
          .update(pressItems)
          .set({ featured: false })
          .where(id ? and(eq(pressItems.featured, true), ne(pressItems.id, id)) : eq(pressItems.featured, true));
      }
      if (id) {
        const [before] = await tx.select({ imageId: pressItems.imageId }).from(pressItems).where(eq(pressItems.id, id));
        if (!before) throw new Error("not-found");
        previousImageId = before.imageId;
        await tx.update(pressItems).set(data).where(eq(pressItems.id, id));
        return id;
      }
      const [row] = await tx.insert(pressItems).values(data).returning({ id: pressItems.id });
      return row.id;
    });
  } catch (error) {
    if ((error as Error).message === "not-found") return { status: "error", message: "This story no longer exists." };
    console.error("[admin] savePress", error);
    return { status: "error", message: "Couldn't save the story. Please try again." };
  }

  if (previousImageId && previousImageId !== data.imageId) await releaseAsset(previousImageId);
  updateTag(contentTags.press);
  if (!id) redirect(`/admin/news/${savedId}?created=1`);
  return { status: "success", message: "Story saved." };
}

export async function deletePress(id: string) {
  await requireAdmin();
  if (!isUuid(id)) return;
  const [row] = await getDb()
    .delete(pressItems)
    .where(eq(pressItems.id, id))
    .returning({ imageId: pressItems.imageId });
  await releaseAsset(row?.imageId);
  updateTag(contentTags.press);
  redirect("/admin/news?deleted=1");
}
