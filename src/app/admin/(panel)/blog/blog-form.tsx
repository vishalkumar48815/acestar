"use client";

import { useState } from "react";
import { AdminForm, Field, SaveBar, StatusField, TextAreaField, TextField } from "@/components/admin/form";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { ImageField } from "@/components/admin/image-field";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { Card, inputClass } from "@/components/admin/ui";
import { slugify } from "@/content/newsroom";
import { deleteBlogPost, saveBlogPost } from "@/server/admin/actions/blog";
import type { UploadedAsset } from "@/server/admin/actions/media";

export type BlogFormValues = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  publishedOn: string;
  excerpt: string;
  body: string;
  status: "draft" | "published";
  cover: UploadedAsset | null;
};

export function BlogForm({ values, categories }: { values: BlogFormValues; categories: string[] }) {
  const [title, setTitle] = useState(values.title);
  const [slug, setSlug] = useState(values.slug);
  // New posts follow the title until the slug is edited by hand; existing URLs never change by accident.
  const [slugTouched, setSlugTouched] = useState(Boolean(values.id));

  return (
    <AdminForm action={saveBlogPost}>
      {values.id ? <input type="hidden" name="id" value={values.id} /> : null}
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="flex min-w-0 flex-col gap-6">
          <Card>
            <div className="flex flex-col gap-5">
              <Field name="title" label="Title">
                {(p) => (
                  <input
                    {...p}
                    value={title}
                    required
                    maxLength={200}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!slugTouched) setSlug(slugify(e.target.value));
                    }}
                    className={`${inputClass} text-lg font-semibold`}
                  />
                )}
              </Field>
              <Field
                name="slug"
                label="URL"
                hint={
                  values.id
                    ? "Changing the URL breaks links that were already shared."
                    : "Filled in from the title. You can edit it."
                }
              >
                {(p) => (
                  <div className="flex items-stretch overflow-hidden rounded-xl border border-line focus-within:border-[color-mix(in_oklab,var(--accent-from)_60%,transparent)]">
                    <span className="flex items-center bg-[color-mix(in_oklab,var(--bg)_70%,transparent)] px-3 text-sm text-fg-subtle">
                      /blog/
                    </span>
                    <input
                      {...p}
                      value={slug}
                      onChange={(e) => {
                        setSlugTouched(true);
                        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
                      }}
                      className="min-h-11 min-w-0 flex-1 bg-white px-3 font-mono text-sm text-fg outline-none dark:bg-white/[0.04]"
                    />
                  </div>
                )}
              </Field>
              <TextAreaField
                name="excerpt"
                label="Summary"
                defaultValue={values.excerpt}
                rows={3}
                maxLength={1200}
                hint="Shown on blog cards and in search results. One or two sentences works best."
              />
            </div>
          </Card>
          <Card>
            <MarkdownEditor name="body" defaultValue={values.body} />
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <div className="flex flex-col gap-5">
              <StatusField defaultValue={values.status} />
              <TextField
                name="publishedOn"
                label="Publish date"
                type="date"
                defaultValue={values.publishedOn}
                required
              />
              <TextField
                name="category"
                label="Category"
                defaultValue={values.category}
                list="blog-categories"
                required
                placeholder="Adobe"
              />
              <datalist id="blog-categories">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              <TextField name="author" label="Author" defaultValue={values.author} required />
            </div>
          </Card>
          <Card>
            <ImageField
              name="coverId"
              label="Cover image"
              folder="blog"
              defaultValue={values.cover}
              aspect="aspect-[4/3]"
            />
          </Card>
          {values.id && values.status === "published" ? (
            <a
              href={`/blog/${values.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-sm font-semibold text-brand-ink"
            >
              View on the website ↗
            </a>
          ) : null}
        </div>
      </div>
      <SaveBar
        label={values.id ? "Save changes" : "Create post"}
        extra={values.id ? <ConfirmButton onConfirm={() => deleteBlogPost(values.id!)} /> : null}
      />
    </AdminForm>
  );
}
