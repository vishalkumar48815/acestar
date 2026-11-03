"use client";

import { useState } from "react";
import { AdminForm, Field, SaveBar, StatusField, TextAreaField, TextField } from "@/components/admin/form";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { Card, inputClass } from "@/components/admin/ui";
import { slugify } from "@/content/newsroom";
import { deleteAlbum, saveAlbum } from "@/server/admin/actions/gallery";

export type AlbumFormValues = {
  id?: string;
  title: string;
  slug: string;
  period: string;
  description: string;
  status: "draft" | "published";
};

export function AlbumForm({ values }: { values: AlbumFormValues }) {
  const [slug, setSlug] = useState(values.slug);
  const [touched, setTouched] = useState(Boolean(values.id));

  return (
    <AdminForm action={saveAlbum}>
      {values.id ? <input type="hidden" name="id" value={values.id} /> : null}
      <Card>
        <div className="grid gap-5 lg:grid-cols-[1fr_18rem]">
          <div className="flex flex-col gap-5">
            <TextField
              name="title"
              label="Album title"
              defaultValue={values.title}
              required
              maxLength={160}
              onChange={(e) => !touched && setSlug(slugify(e.currentTarget.value))}
            />
            <TextAreaField
              name="description"
              label="Description"
              defaultValue={values.description}
              rows={3}
              maxLength={600}
            />
          </div>
          <div className="flex flex-col gap-5">
            <StatusField defaultValue={values.status} />
            <TextField
              name="period"
              label="Years"
              defaultValue={values.period}
              placeholder="2023–2025"
              maxLength={40}
            />
            <Field name="slug" label="Short name" hint="Used in the gallery filter. Lowercase and hyphens.">
              {(p) => (
                <input
                  {...p}
                  value={slug}
                  onChange={(e) => {
                    setTouched(true);
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
                  }}
                  className={`${inputClass} font-mono text-sm`}
                />
              )}
            </Field>
          </div>
        </div>
      </Card>
      <SaveBar
        label={values.id ? "Save album" : "Create album"}
        extra={
          values.id ? (
            <ConfirmButton
              onConfirm={() => deleteAlbum(values.id!)}
              label="Delete album"
              confirmLabel="Delete album and all its photos?"
            />
          ) : null
        }
      />
    </AdminForm>
  );
}
