"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { ChevronLeft, ChevronRight, GripVertical, Star, Trash, Upload } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { addPhoto, deletePhoto, reorderPhotos, setAlbumCover, updatePhotoAlt } from "@/server/admin/actions/gallery";
import { compressImage } from "./compress-image";
import { Spinner } from "./form";
import { button } from "./ui";

type Photo = { id: string; alt: string; url: string; width: number; height: number };
type QueueItem = { name: string; state: "waiting" | "uploading" | "done" | "error"; message?: string };

/** Upload, caption, reorder (drag or arrows), pick the cover and delete photos in one album. */
export function PhotoManager({
  albumId,
  coverPhotoId,
  photos: initial,
}: {
  albumId: string;
  coverPhotoId: string | null;
  photos: Photo[];
}) {
  const router = useRouter();
  const [photos, setPhotos] = useState(initial);
  const [cover, setCover] = useState(coverPhotoId);
  // Server data wins whenever it changes (after uploads/refresh).
  const [source, setSource] = useState(initial);
  if (source !== initial) {
    setSource(initial);
    setPhotos(initial);
    setCover(coverPhotoId);
  }

  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [dragId, setDragId] = useState<string | null>(null);
  const [over, setOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, start] = useTransition();
  const fileInput = useRef<HTMLInputElement>(null);
  const uploading = queue.some((q) => q.state === "uploading" || q.state === "waiting");

  async function upload(files: FileList | File[]) {
    const list = [...files].filter((f) => f.type.startsWith("image/"));
    if (!list.length) return;
    setQueue(list.map((f) => ({ name: f.name, state: "waiting" })));
    // One request per photo: small requests, clear per-file progress, one failure doesn't sink the batch.
    for (const [i, file] of list.entries()) {
      setQueue((q) => q.map((item, j) => (j === i ? { ...item, state: "uploading" } : item)));
      const data = new FormData();
      data.set("albumId", albumId);
      data.set("file", await compressImage(file));
      data.set("alt", file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
      const result = await addPhoto(data);
      setQueue((q) =>
        q.map((item, j) =>
          j === i
            ? result.ok
              ? { ...item, state: "done" }
              : { ...item, state: "error", message: result.message }
            : item,
        ),
      );
    }
    if (fileInput.current) fileInput.current.value = "";
    router.refresh();
  }

  function persistOrder(next: Photo[]) {
    setPhotos(next);
    start(async () => {
      const r = await reorderPhotos(
        albumId,
        next.map((p) => p.id),
      );
      if (!r.ok) setError(r.message);
    });
  }

  function move(id: string, delta: number) {
    const i = photos.findIndex((p) => p.id === id);
    const j = i + delta;
    if (i < 0 || j < 0 || j >= photos.length) return;
    const next = [...photos];
    [next[i], next[j]] = [next[j], next[i]];
    persistOrder(next);
  }

  function dropOn(targetId: string) {
    if (!dragId || dragId === targetId) return;
    const next = photos.filter((p) => p.id !== dragId);
    next.splice(
      next.findIndex((p) => p.id === targetId) +
        (photos.findIndex((p) => p.id === dragId) < photos.findIndex((p) => p.id === targetId) ? 1 : 0),
      0,
      photos.find((p) => p.id === dragId)!,
    );
    setDragId(null);
    persistOrder(next);
  }

  return (
    <section aria-labelledby="photos-title">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="photos-title" className="text-lg font-semibold text-ink">
          Photos
        </h2>
        <button
          type="button"
          className={button("primary")}
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
        >
          <Upload aria-hidden="true" className="size-4" /> Upload photos
        </button>
        <input
          ref={fileInput}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => e.target.files && void upload(e.target.files)}
        />
      </div>

      {/* Drop zone + upload progress */}
      <div
        onDragOver={(e) => {
          if (dragId) return;
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          if (dragId) return;
          e.preventDefault();
          setOver(false);
          void upload(e.dataTransfer.files);
        }}
        className={cn(
          "mb-5 rounded-2xl border border-dashed border-line px-5 py-6 text-center text-sm text-fg-muted transition-colors",
          over && "border-[var(--accent-from)] bg-brand-soft",
        )}
      >
        {queue.length ? (
          <ul className="mx-auto flex max-w-lg flex-col gap-1.5 text-left">
            {queue.map((q, i) => (
              <li key={i} className="flex items-center gap-2">
                {q.state === "uploading" ? (
                  <Spinner className="size-3.5 text-brand-ink" />
                ) : (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "w-3.5 text-center",
                      q.state === "error" ? "text-danger" : q.state === "done" ? "text-success" : "text-fg-subtle",
                    )}
                  >
                    {q.state === "done" ? "✓" : q.state === "error" ? "!" : "·"}
                  </span>
                )}
                <span className="min-w-0 flex-1 truncate">{q.name}</span>
                {q.message ? <span className="text-xs text-danger">{q.message}</span> : null}
              </li>
            ))}
          </ul>
        ) : (
          <>
            <span className="font-semibold text-ink">Drop photos here</span> or use “Upload photos”. You can select many
            at once.
          </>
        )}
      </div>

      {error ? (
        <p role="alert" className="mb-4 text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}

      {photos.length === 0 ? (
        <p className="rounded-2xl border border-line bg-white/70 px-5 py-10 text-center text-sm text-fg-muted dark:bg-white/[0.03]">
          No photos yet. The album stays hidden on the website until it has at least one.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((p, i) => (
            <PhotoTile
              key={p.id}
              photo={p}
              isCover={cover === p.id}
              dragging={dragId === p.id}
              first={i === 0}
              last={i === photos.length - 1}
              onDragStart={() => setDragId(p.id)}
              onDragEnd={() => setDragId(null)}
              onDrop={() => dropOn(p.id)}
              onMove={(d) => move(p.id, d)}
              onCover={() => {
                setCover(p.id);
                start(async () => void (await setAlbumCover(albumId, p.id)));
              }}
              onDelete={async () => {
                const r = await deletePhoto(p.id);
                if (!r.ok) return setError(r.message);
                setPhotos((list) => list.filter((x) => x.id !== p.id));
                router.refresh();
              }}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

function PhotoTile({
  photo,
  isCover,
  dragging,
  first,
  last,
  onDragStart,
  onDragEnd,
  onDrop,
  onMove,
  onCover,
  onDelete,
}: {
  photo: Photo;
  isCover: boolean;
  dragging: boolean;
  first: boolean;
  last: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDrop: () => void;
  onMove: (delta: number) => void;
  onCover: () => void;
  onDelete: () => Promise<void>;
}) {
  const [alt, setAlt] = useState(photo.alt);
  const [saved, setSaved] = useState(photo.alt);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [armed, setArmed] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [hover, setHover] = useState(false);

  async function saveAlt() {
    if (alt.trim() === saved.trim()) return;
    setStatus("saving");
    const r = await updatePhotoAlt(photo.id, alt);
    if (r.ok) {
      setSaved(alt);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1500);
    } else setStatus("idle");
  }

  const iconBtn =
    "grid size-8 place-items-center rounded-lg bg-white/90 text-ink shadow-sm transition-colors hover:bg-white disabled:opacity-40 dark:bg-black/60 dark:text-white";

  return (
    <li
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        onDragStart();
      }}
      onDragEnd={onDragEnd}
      onDragOver={(e) => {
        e.preventDefault();
        setHover(true);
      }}
      onDragLeave={() => setHover(false)}
      onDrop={(e) => {
        e.preventDefault();
        setHover(false);
        onDrop();
      }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border bg-white/90 transition-[opacity,box-shadow,transform] dark:bg-white/[0.04]",
        isCover ? "border-transparent ring-2 ring-[var(--accent-from)]" : "border-line",
        dragging && "opacity-40",
        hover && !dragging && "scale-[1.02] shadow-[0_0_0_2px_var(--accent-to)]",
      )}
    >
      <div className="relative aspect-[4/3] cursor-grab bg-brand-soft active:cursor-grabbing">
        <Image
          src={photo.url}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 260px, (min-width: 640px) 30vw, 46vw"
          className="object-cover"
          draggable={false}
        />
        <span
          className="absolute top-2 left-2 grid size-8 place-items-center rounded-lg bg-white/90 text-ink shadow-sm dark:bg-black/60 dark:text-white"
          aria-hidden="true"
        >
          <GripVertical className="size-4" />
        </span>
        {isCover ? (
          <span className="absolute bottom-2 left-2 rounded-full bg-[image:var(--btn-gradient)] px-2.5 py-0.5 text-[0.6875rem] font-semibold text-white">
            Cover
          </span>
        ) : null}
        <div className="absolute top-2 right-2 flex gap-1.5">
          <button
            type="button"
            className={iconBtn}
            onClick={onCover}
            aria-label={isCover ? "Album cover" : "Use as album cover"}
            aria-pressed={isCover}
            title="Use as cover"
          >
            <Star className={cn("size-4", isCover && "fill-amber-400 text-amber-500")} />
          </button>
          <button
            type="button"
            className={cn(iconBtn, armed && "bg-danger text-white hover:bg-danger dark:bg-danger")}
            disabled={deleting}
            aria-label={armed ? "Click again to delete" : "Delete photo"}
            title={armed ? "Click again to delete" : "Delete"}
            onClick={async () => {
              if (!armed) {
                setArmed(true);
                setTimeout(() => setArmed(false), 3000);
                return;
              }
              setDeleting(true);
              await onDelete();
              setDeleting(false);
            }}
          >
            {deleting ? <Spinner className="size-3.5" /> : <Trash className="size-4" />}
          </button>
        </div>
      </div>
      <div className="flex items-center gap-1 p-2">
        <button
          type="button"
          onClick={() => onMove(-1)}
          disabled={first}
          className="grid size-8 shrink-0 place-items-center rounded-lg text-fg-subtle hover:bg-brand-soft disabled:opacity-30"
          aria-label="Move earlier"
        >
          <ChevronLeft className="size-4" />
        </button>
        <label className="min-w-0 flex-1">
          <span className="sr-only">Caption (alt text)</span>
          <input
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            onBlur={() => void saveAlt()}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), e.currentTarget.blur())}
            placeholder="Describe the photo"
            maxLength={300}
            className="w-full rounded-md bg-transparent px-1.5 py-1 text-xs text-fg outline-none placeholder:text-fg-subtle focus:bg-brand-soft"
          />
        </label>
        <span aria-live="polite" className="w-4 shrink-0 text-center text-xs">
          {status === "saving" ? (
            <Spinner className="size-3" />
          ) : status === "saved" ? (
            <span className="text-success">✓</span>
          ) : null}
        </span>
        <button
          type="button"
          onClick={() => onMove(1)}
          disabled={last}
          className="grid size-8 shrink-0 place-items-center rounded-lg text-fg-subtle hover:bg-brand-soft disabled:opacity-30"
          aria-label="Move later"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </li>
  );
}
