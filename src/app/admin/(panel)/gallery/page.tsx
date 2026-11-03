import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AlbumOrder } from "@/components/admin/album-order";
import { Flash } from "@/components/admin/flash";
import { button, EmptyState, NoDatabase, PageHeader, StatusBadge } from "@/components/admin/ui";
import { Plus } from "@/components/ui/icons";
import { listAlbums } from "@/server/admin/queries";
import { hasDatabase } from "@/server/db";

export const instant = false;
export const metadata: Metadata = { title: "Gallery" };

export default async function GalleryAdminPage() {
  const add = (
    <Link href="/admin/gallery/new" className={button("primary")}>
      <Plus aria-hidden="true" className="size-4" /> New album
    </Link>
  );
  if (!hasDatabase)
    return (
      <>
        <PageHeader title="Gallery" />
        <NoDatabase />
      </>
    );
  const rows = await listAlbums();

  return (
    <>
      <PageHeader
        title="Gallery"
        description="Albums appear on /gallery in this order. Albums without photos are hidden."
        actions={add}
      />
      <Flash />
      {rows.length === 0 ? (
        <EmptyState title="No albums yet" body="Create an album, then upload its photos." action={add} />
      ) : (
        <ol className="flex flex-col gap-3">
          {rows.map((a, i) => (
            <li
              key={a.id}
              className="flex items-center gap-4 rounded-2xl border border-line bg-white/85 p-3 pr-4 transition-shadow hover:shadow-[0_16px_32px_-24px_rgb(70_70_180/0.45)] dark:bg-white/[0.03]"
            >
              <AlbumOrder id={a.id} first={i === 0} last={i === rows.length - 1} />
              <Link href={`/admin/gallery/${a.id}`} className="flex min-w-0 flex-1 items-center gap-4">
                <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-[linear-gradient(135deg,#1b1f4a,#5b3cc4)]">
                  {a.coverUrl ? <Image src={a.coverUrl} alt="" fill sizes="96px" className="object-cover" /> : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-ink">{a.title}</span>
                  <span className="mt-0.5 block text-xs text-fg-subtle">
                    {a.period ? `${a.period} · ` : ""}
                    {a.photos} {a.photos === 1 ? "photo" : "photos"}
                  </span>
                </span>
                <StatusBadge status={a.status} />
              </Link>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
