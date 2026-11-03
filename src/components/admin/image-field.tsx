"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { uploadImage, type UploadedAsset } from "@/server/admin/actions/media";
import { cn } from "@/lib/utils";
import { compressImage } from "./compress-image";
import { Spinner, useAdminForm } from "./form";
import { button } from "./ui";

/** Image picker: uploads immediately, keeps the new asset id in a hidden input for the form. */
export function ImageField({
  name,
  label,
  folder,
  defaultValue,
  hint,
  aspect = "aspect-[16/9]",
}: {
  name: string;
  label: string;
  folder: "news" | "blog" | "gallery";
  defaultValue?: UploadedAsset | null;
  hint?: string;
  aspect?: string;
}) {
  const [asset, setAsset] = useState<UploadedAsset | null>(defaultValue ?? null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [over, setOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const { markDirty } = useAdminForm();

  async function upload(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError(null);
    const data = new FormData();
    data.set("file", await compressImage(file));
    data.set("folder", folder);
    const result = await uploadImage(data);
    setBusy(false);
    if (result.ok) {
      setAsset(result.asset);
      markDirty();
    } else setError(result.message);
    if (input.current) input.current.value = "";
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input type="hidden" name={name} value={asset?.id ?? ""} />
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          void upload(e.dataTransfer.files[0]);
        }}
        className={cn(
          "relative overflow-hidden rounded-xl border border-dashed border-line bg-[linear-gradient(135deg,color-mix(in_oklab,var(--accent-from)_6%,transparent),color-mix(in_oklab,var(--accent-to)_8%,transparent))]",
          aspect,
          over && "border-[var(--accent-from)] ring-2 ring-[color-mix(in_oklab,var(--accent-from)_30%,transparent)]",
        )}
      >
        {asset ? (
          <Image src={asset.url} alt="" fill sizes="480px" className="object-cover" />
        ) : (
          <button
            type="button"
            onClick={() => input.current?.click()}
            className="absolute inset-0 grid place-items-center text-sm text-fg-muted"
          >
            <span className="flex flex-col items-center gap-1">
              <span className="font-semibold text-ink">Drop an image or click to upload</span>
              <span className="text-xs">JPG, PNG, WebP or AVIF · up to 8 MB</span>
            </span>
          </button>
        )}
        {busy ? (
          <div className="absolute inset-0 grid place-items-center bg-white/70 text-sm font-medium text-ink dark:bg-black/50">
            <span className="flex items-center gap-2">
              <Spinner /> Uploading…
            </span>
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={button("secondary", "min-h-9")}
          onClick={() => input.current?.click()}
          disabled={busy}
        >
          {asset ? "Replace" : "Upload"}
        </button>
        {asset ? (
          <button
            type="button"
            className={button("ghost", "min-h-9")}
            onClick={() => {
              setAsset(null);
              markDirty();
            }}
            disabled={busy}
          >
            Remove
          </button>
        ) : null}
      </div>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => void upload(e.target.files?.[0])}
      />
      {hint ? <p className="text-xs text-fg-subtle">{hint}</p> : null}
      {error ? (
        <p role="alert" className="text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
