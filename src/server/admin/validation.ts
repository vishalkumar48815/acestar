import { z } from "zod";
import type { FieldErrors, FormState } from "@/lib/admin-form";

/** Validation for admin forms. Shared shapes keep server checks and error messages consistent. */

const trimmed = (max: number, label: string) =>
  z.string().trim().min(1, `${label} is required.`).max(max, `${label} must be ${max} characters or fewer.`);
/** Browsers submit textarea line breaks as CRLF; store plain \n. */
const lf = (v: string) => v.replace(/\r\n?/g, "\n");
const optionalText = (max: number) => z.string().trim().max(max).default("").transform(lf);
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date.");
const status = z.enum(["draft", "published"]);
const uuidOrEmpty = z
  .string()
  .trim()
  .transform((v) => v || null)
  .pipe(z.uuid().nullable());
const slug = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Slug is required.")
  .max(80)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers and single hyphens only.");
const checkbox = z
  .union([z.literal("on"), z.literal("true"), z.literal("")])
  .optional()
  .transform((v) => v === "on" || v === "true");

export const pressSchema = z.object({
  title: trimmed(300, "Headline"),
  publisher: trimmed(120, "Publisher"),
  language: z.enum(["en", "ms", "zh"]),
  publishedOn: isoDate,
  url: z
    .string()
    .trim()
    .max(1000)
    .refine(
      (v) => !v || /^https?:\/\/\S+$/.test(v) || /^\/[\w\-/]*$/.test(v),
      "Use a full https:// link or a site path like /blog/…",
    )
    .transform((v) => v || null),
  excerpt: optionalText(2000),
  imageId: uuidOrEmpty,
  featured: checkbox,
  status,
});

export const blogSchema = z.object({
  title: trimmed(200, "Title"),
  slug,
  category: trimmed(60, "Category"),
  author: trimmed(80, "Author"),
  publishedOn: isoDate,
  excerpt: optionalText(1200),
  body: z
    .string()
    .max(200_000, "The article is too long.")
    .transform((v) => lf(v).trim()),
  coverId: uuidOrEmpty,
  status,
});

export const albumSchema = z.object({
  title: trimmed(160, "Title"),
  slug,
  period: optionalText(40),
  description: optionalText(600),
  status,
});

export function invalid(error: z.ZodError): FormState {
  return {
    status: "error",
    message: "Please fix the highlighted fields.",
    fieldErrors: z.flattenError(error).fieldErrors as FieldErrors,
  };
}

/** FormData → plain object for zod (checkboxes that are unchecked are simply absent). */
export const formObject = (formData: FormData) =>
  Object.fromEntries([...formData.entries()].filter(([, v]) => typeof v === "string")) as Record<string, string>;
