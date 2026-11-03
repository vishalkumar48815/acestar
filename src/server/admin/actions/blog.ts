"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { estimateReadingMinutes } from "@/content/newsroom";
import type { FormState } from "@/lib/admin-form";
import { pgCode, releaseAsset } from "@/server/admin/assets";
import { isUuid } from "@/server/admin/queries";
import { blogSchema, formObject, invalid } from "@/server/admin/validation";
import { requireAdmin } from "@/server/auth/session";
import { contentTags } from "@/server/content/media";
import { getDb, schema } from "@/server/db";

const { blogPosts } = schema;

export async function saveBlogPost(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id && !isUuid(id)) return { status: "error", message: "Unknown post." };

  const parsed = blogSchema.safeParse(formObject(formData));
  if (!parsed.success) return invalid(parsed.error);
  const data = { ...parsed.data, readingMinutes: estimateReadingMinutes(parsed.data.body || parsed.data.excerpt) };

  const db = getDb();
  let savedId = id;
  let previousCoverId: string | null = null;
  try {
    if (id) {
      const [before] = await db.select({ coverId: blogPosts.coverId }).from(blogPosts).where(eq(blogPosts.id, id));
      if (!before) return { status: "error", message: "This post no longer exists." };
      previousCoverId = before.coverId;
      await db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
    } else {
      const [row] = await db.insert(blogPosts).values(data).returning({ id: blogPosts.id });
      savedId = row.id;
    }
  } catch (error) {
    if (pgCode(error) === "23505") {
      return {
        status: "error",
        message: "Please fix the highlighted fields.",
        fieldErrors: { slug: ["Another post already uses this slug."] },
      };
    }
    console.error("[admin] saveBlogPost", error);
    return { status: "error", message: "Couldn't save the post. Please try again." };
  }

  if (previousCoverId && previousCoverId !== data.coverId) await releaseAsset(previousCoverId);
  updateTag(contentTags.blog);
  if (!id) redirect(`/admin/blog/${savedId}?created=1`);
  return { status: "success", message: data.status === "published" ? "Post saved and live." : "Draft saved." };
}

export async function deleteBlogPost(id: string) {
  await requireAdmin();
  if (!isUuid(id)) return;
  const [row] = await getDb().delete(blogPosts).where(eq(blogPosts.id, id)).returning({ coverId: blogPosts.coverId });
  await releaseAsset(row?.coverId);
  updateTag(contentTags.blog);
  redirect("/admin/blog?deleted=1");
}
