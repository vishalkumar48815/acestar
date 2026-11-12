"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "@/components/ui/icons";
import type { Album, Photo } from "@/content/newsroom";
import { cn } from "@/lib/utils";

type Item = Photo & { album: Album };

type Span = { cols: 1 | 2 | 4; rows: 1 | 2 };

/**
 * Bento spans for n photos that always close cleanly (no holes):
 * phones (2 columns) use wide/small/small; md+ (4 columns) chains bento blocks that each
 * fill complete rows, so the grid can never leave a gap.
 */
function bento(n: number): string[] {
  // Phones
  const mobile: (1 | 2)[] = Array.from({ length: n }, (_, i) => (i % 3 === 0 ? 2 : 1));
  if (mobile.reduce<number>((a, b) => a + b, 0) % 2) mobile[n - 1] = 2;

  // md+: a sequence of self-contained blocks, each filling whole rows of the 4-column grid.
  const big: Span = { cols: 2, rows: 2 };
  const tall: Span = { cols: 1, rows: 2 };
  const wide: Span = { cols: 2, rows: 1 };
  const sm: Span = { cols: 1, rows: 1 };
  const BLOCKS: Record<number, Span[][]> = {
    7: [
      [big, sm, tall, sm, wide, sm, sm], // feature on the left
      [tall, sm, big, sm, sm, sm, wide], // mirrored: feature on the right
    ],
    6: [[big, sm, sm, sm, sm, { cols: 4, rows: 1 }]],
    5: [[big, sm, sm, sm, sm]],
    4: [[big, sm, sm, wide]],
    3: [[big, tall, tall]],
    2: [[big, big]],
    1: [[{ cols: 4, rows: 2 }]],
  };
  const desk: Span[] = [];
  let left = n;
  let k = 0;
  while (left > 0) {
    const size = left >= 7 ? 7 : left;
    const variants = BLOCKS[size];
    desk.push(...variants[k++ % variants.length]);
    left -= size;
  }

  const md = { 1: "md:col-span-1", 2: "md:col-span-2", 4: "md:col-span-4" } as const;
  return desk.map((d, i) =>
    cn(mobile[i] === 2 ? "col-span-2" : "col-span-1", md[d.cols], d.rows === 2 ? "md:row-span-2" : "md:row-span-1"),
  );
}
const PREVIEW = 7; // photos per album in the "all" view

/**
 * Gallery: album cover cards (filter) → per-album bento grids with 3D tilt, light-scan hover
 * and glass captions → full-screen lightbox with thumbnails, keyboard and swipe.
 */
export function GalleryBrowser({ albums }: { albums: Album[] }) {
  const [active, setActive] = useState<string>("all");
  const [open, setOpen] = useState<{ items: Item[]; index: number } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const shown = active === "all" ? albums : albums.filter((a) => a.id === active);
  const total = albums.reduce((n, a) => n + a.photos.length, 0);

  const select = (id: string) => {
    setActive((cur) => (cur === id ? "all" : id));
    requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div>
      {/* Album covers */}
      <ul
        aria-label="Albums"
        className="-mx-5 flex snap-x [scrollbar-width:none] gap-3 overflow-x-auto px-5 pb-2 sm:gap-4 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {albums.map((a, i) => {
          const cover = a.photos.find((p) => p.id === a.cover) ?? a.photos[0];
          const on = active === a.id;
          return (
            <li key={a.id} className="w-[62%] shrink-0 snap-start sm:w-[38%] lg:w-auto">
              <button
                type="button"
                aria-pressed={on}
                onClick={() => select(a.id)}
                className={cn(
                  "group/album relative block aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] text-left transition-[transform,box-shadow] duration-500 ease-out-expo",
                  "hover:-translate-y-1 focus-visible:-translate-y-1",
                  on
                    ? "shadow-[0_0_0_2px_var(--accent-from),0_24px_50px_-20px_color-mix(in_oklab,var(--accent-to)_70%,transparent)]"
                    : "shadow-[0_18px_40px_-24px_rgb(30_30_90/0.45)]",
                )}
                style={{ animation: `fade-up 0.7s var(--ease-out) ${i * 70}ms both` }}
              >
                {cover ? (
                  <Image
                    src={cover.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 230px, 60vw"
                    quality={90}
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover/album:scale-[1.06]"
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_10_30/0)_35%,rgb(8_10_30/0.85))]"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 bg-[linear-gradient(140deg,color-mix(in_oklab,var(--accent-from)_45%,transparent),color-mix(in_oklab,var(--accent-to)_35%,transparent))] mix-blend-soft-light transition-opacity duration-500",
                    on ? "opacity-100" : "opacity-0 group-hover/album:opacity-70",
                  )}
                />
                <span className="absolute top-3 left-3 rounded-full bg-[#0b1020]/70 px-2.5 py-1 font-mono text-[0.6875rem] font-medium tracking-wider text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="block text-[0.75rem] font-medium text-white/70">
                    {a.year} · {a.photos.length} photos
                  </span>
                  <span className="mt-1 block text-[1rem] leading-snug font-semibold text-white">{a.title}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div ref={sectionRef} className="mt-8 flex scroll-mt-28 items-center justify-between gap-4">
        <p className="text-sm text-fg-subtle" aria-live="polite">
          {active === "all"
            ? `All moments · ${total} photos in ${albums.length} albums`
            : `${shown[0]?.title} · ${shown[0]?.photos.length} photos`}
        </p>
        {active !== "all" ? (
          <button
            type="button"
            onClick={() => setActive("all")}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-white/70 px-4 text-sm font-medium text-fg-muted transition-colors hover:text-fg dark:bg-white/[0.04]"
          >
            <X aria-hidden="true" className="size-3.5" />
            Show all albums
          </button>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-16">
        {shown.map((album) => (
          <AlbumBlock
            key={`${active}-${album.id}`}
            album={album}
            index={albums.indexOf(album)}
            preview={active === "all"}
            onOpen={(items, index) => setOpen({ items, index })}
            onMore={() => select(album.id)}
          />
        ))}
      </div>

      {open ? (
        <Lightbox
          items={open.items}
          index={open.index}
          onIndex={(index) => setOpen((o) => (o ? { ...o, index } : o))}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </div>
  );
}

function AlbumBlock({
  album,
  index,
  preview,
  onOpen,
  onMore,
}: {
  album: Album;
  index: number;
  preview: boolean;
  onOpen: (items: Item[], index: number) => void;
  onMore: () => void;
}) {
  const items: Item[] = useMemo(() => album.photos.map((p) => ({ ...p, album })), [album]);
  const visible = preview ? items.slice(0, PREVIEW) : items;
  const more = items.length - visible.length;
  const spans = useMemo(() => bento(visible.length), [visible.length]);

  // 3D tilt toward the cursor (fine pointers, motion allowed).
  const last = useRef<HTMLElement | null>(null);
  const tiltOk = useRef(false);
  useEffect(() => {
    tiltOk.current =
      window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  const onMove = (e: ReactPointerEvent<HTMLUListElement>) => {
    if (!tiltOk.current) return;
    const tile = (e.target as HTMLElement).closest<HTMLElement>("[data-tilt]");
    if (last.current && last.current !== tile) {
      last.current.style.setProperty("--rx", "0deg");
      last.current.style.setProperty("--ry", "0deg");
    }
    last.current = tile;
    if (!tile) return;
    const r = tile.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tile.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
    tile.style.setProperty("--ry", `${(x * 9).toFixed(2)}deg`);
    tile.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
    tile.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    last.current?.style.setProperty("--rx", "0deg");
    last.current?.style.setProperty("--ry", "0deg");
    last.current = null;
  };

  return (
    <section aria-labelledby={`album-${album.id}`}>
      <div className="mb-6 grid gap-3 lg:grid-cols-[auto_1fr_auto] lg:items-end lg:gap-8">
        <span
          aria-hidden="true"
          className="text-gradient font-display text-[3rem] leading-none font-extrabold tracking-[-0.05em] tabular-nums lg:text-[3.75rem]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <p className="text-[0.75rem] font-semibold tracking-[0.2em] text-fg-subtle uppercase">
            {album.year} · {album.photos.length} photos
          </p>
          <h3
            id={`album-${album.id}`}
            className="mt-1 font-display text-[clamp(1.5rem,1.1rem+1.3vw,2.125rem)] leading-tight font-bold tracking-[-0.03em] text-ink"
          >
            {album.title}
          </h3>
          <p className="mt-1.5 max-w-2xl text-[0.9375rem] leading-relaxed text-fg-muted">{album.description}</p>
        </div>
        {preview && more > 0 ? (
          <button
            type="button"
            onClick={onMore}
            className="group/more inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-line bg-white/70 px-5 text-[0.9375rem] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-transparent hover:bg-[image:var(--btn-gradient)] hover:text-white lg:self-end dark:bg-white/[0.04] dark:text-fg"
          >
            View album
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/more:translate-x-0.5" />
          </button>
        ) : null}
      </div>

      <ul
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="grid grid-flow-dense auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:gap-4 md:grid-cols-4 lg:auto-rows-[12.5rem]"
      >
        {visible.map((photo, i) => {
          const isMore = preview && more > 0 && i === visible.length - 1;
          return (
            <li
              key={photo.id}
              className={cn(spans[i], "[perspective:1000px]")}
              style={{ animation: `fade-up 0.7s var(--ease-out) ${Math.min(i, 9) * 55}ms both` }}
            >
              <button
                type="button"
                data-tilt
                onClick={() => (isMore ? onMore() : onOpen(items, i))}
                aria-label={isMore ? `View all ${items.length} photos in ${album.title}` : `Open photo: ${photo.alt}`}
                className={cn(
                  "group/photo relative block h-full w-full overflow-hidden rounded-[1.25rem] bg-[#11152e] text-left",
                  "[transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] transition-[transform,box-shadow] duration-300 ease-out [transform-style:preserve-3d]",
                  "shadow-[0_16px_36px_-24px_rgb(30_30_90/0.55)] hover:shadow-[0_30px_60px_-28px_color-mix(in_oklab,var(--accent-to)_65%,transparent)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-from)]",
                )}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={
                    spans[i].includes("md:col-span-2") || spans[i].includes("md:col-span-4")
                      ? "(min-width: 768px) 50vw, 100vw"
                      : "(min-width: 768px) 25vw, 50vw"
                  }
                  quality={90}
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover/photo:scale-[1.07]"
                />
                {/* Cursor-following sheen */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/photo:opacity-100"
                  style={{
                    background:
                      "radial-gradient(420px circle at var(--gx,50%) var(--gy,30%), rgb(255 255 255 / 0.18), transparent 55%)",
                  }}
                />
                {/* AI "scan" light sweep */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -top-1/3 h-1/3 bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--accent-to)_35%,transparent)_50%,transparent)] opacity-0 group-hover/photo:animate-[photo-scan_1.4s_var(--ease-out)_both] group-hover/photo:opacity-100"
                />
                {/* Gradient rim */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity duration-300 [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)] group-hover/photo:opacity-100"
                  style={{ background: "linear-gradient(135deg, var(--accent-from), var(--accent-to))" }}
                />
                {isMore ? (
                  <span className="absolute inset-0 grid place-items-center bg-[rgb(11_16_32/0.62)] text-center text-white">
                    <span>
                      <span className="block font-display text-[2.25rem] leading-none font-extrabold tracking-[-0.04em]">
                        +{more + 1}
                      </span>
                      <span className="mt-1 block text-sm font-medium text-white/80">View album</span>
                    </span>
                  </span>
                ) : (
                  <span className="pointer-events-none absolute inset-x-2 bottom-2 translate-y-3 rounded-xl bg-[rgb(11_16_32/0.72)] px-3 py-2 text-[0.8125rem] leading-snug font-medium text-white opacity-0 transition-[opacity,transform] duration-300 ease-out-expo group-hover/photo:translate-y-0 group-hover/photo:opacity-100 group-focus-visible/photo:translate-y-0 group-focus-visible/photo:opacity-100">
                    {photo.alt}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: Item[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const photo = items[index];
  const go = useCallback(
    (d: number) => onIndex((index + d + items.length) % items.length),
    [index, items.length, onIndex],
  );

  // Lock scroll, focus the dialog, restore focus on close.
  useEffect(() => {
    const previously = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = "";
      previously?.focus();
    };
  }, []);

  // Keep the current thumbnail in view.
  useEffect(() => {
    stripRef.current
      ?.querySelector<HTMLElement>(`[data-i="${index}"]`)
      ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button");
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.album.title}: photo ${index + 1} of ${items.length}`}
      className="fixed inset-0 z-[80] flex flex-col bg-[rgb(6_8_22/0.96)]"
      style={{ animation: "fade-up 0.35s var(--ease-out) both" }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 text-white sm:px-6">
        <p className="min-w-0 truncate text-sm">
          <span className="font-semibold">{photo.album.title}</span>
          <span className="ml-2 text-white/60 tabular-nums">
            {index + 1} / {items.length}
          </span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>

      <div
        className="relative min-h-0 flex-1 touch-pan-y select-none"
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          priority
          quality={90}
          className="object-contain p-2 sm:p-6"
          style={{ animation: "hero-art-in 0.5s var(--ease-out) both" }}
        />
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute top-1/2 left-2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-[image:var(--btn-gradient)] sm:left-6"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute top-1/2 right-2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-[image:var(--btn-gradient)] sm:right-6"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>

      <p className="px-4 pt-3 text-center text-[0.9375rem] text-white/85 sm:px-6">{photo.alt}</p>

      {/* Thumbnails */}
      <div
        ref={stripRef}
        className="flex [scrollbar-width:none] gap-2 overflow-x-auto px-4 py-4 sm:justify-center sm:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((p, i) => (
          <button
            key={p.id}
            type="button"
            data-i={i}
            onClick={() => onIndex(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-all duration-300",
              i === index ? "opacity-100 shadow-[0_0_0_2px_var(--accent-to)]" : "opacity-45 hover:opacity-80",
            )}
          >
            <Image src={p.src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
