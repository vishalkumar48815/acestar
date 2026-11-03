"use client";

import { AdminForm, SaveBar, SelectField, StatusField, TextAreaField, TextField } from "@/components/admin/form";
import { ImageField } from "@/components/admin/image-field";
import { Card } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { deletePress, savePress } from "@/server/admin/actions/press";
import type { UploadedAsset } from "@/server/admin/actions/media";

export type PressFormValues = {
  id?: string;
  title: string;
  publisher: string;
  language: "en" | "ms" | "zh";
  publishedOn: string;
  url: string | null;
  excerpt: string;
  featured: boolean;
  status: "draft" | "published";
  image: UploadedAsset | null;
};

const languages = [
  { value: "en", label: "English" },
  { value: "ms", label: "Bahasa Malaysia" },
  { value: "zh", label: "中文 (Chinese)" },
] as const;

export function PressForm({ values }: { values: PressFormValues }) {
  return (
    <AdminForm action={savePress}>
      {values.id ? <input type="hidden" name="id" value={values.id} /> : null}
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <Card>
          <div className="flex flex-col gap-5">
            <TextField name="title" label="Headline" defaultValue={values.title} required maxLength={300} />
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                name="publisher"
                label="Publisher"
                defaultValue={values.publisher}
                placeholder="The Star"
                required
                list="publishers"
              />
              <SelectField name="language" label="Language" defaultValue={values.language} options={languages} />
            </div>
            <TextField
              name="url"
              label="Article link"
              type="url"
              inputMode="url"
              defaultValue={values.url ?? ""}
              placeholder="https://www.thestar.com.my/…"
              hint="Where the card links to. Leave empty for a card without a link."
            />
            <TextAreaField
              name="excerpt"
              label="Summary"
              defaultValue={values.excerpt}
              rows={5}
              maxLength={2000}
              hint="Two or three sentences shown on the card."
            />
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <div className="flex flex-col gap-5">
              <StatusField defaultValue={values.status} />
              <TextField
                name="publishedOn"
                label="Publication date"
                type="date"
                defaultValue={values.publishedOn}
                required
              />
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-3">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={values.featured}
                  className="mt-0.5 size-4 accent-[var(--accent-from)]"
                />
                <span>
                  <span className="block text-sm font-medium text-ink">Top story</span>
                  <span className="block text-xs text-fg-subtle">
                    Highlighted at the top of /news. Replaces the current one.
                  </span>
                </span>
              </label>
            </div>
          </Card>
          <Card>
            <ImageField name="imageId" label="Image" folder="news" defaultValue={values.image} />
          </Card>
        </div>
      </div>
      <SaveBar
        label={values.id ? "Save changes" : "Create story"}
        extra={values.id ? <ConfirmButton onConfirm={() => deletePress(values.id!)} /> : null}
      />
    </AdminForm>
  );
}
