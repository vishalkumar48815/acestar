import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Flash } from "@/components/admin/flash";
import { PhotoManager } from "@/components/admin/photo-manager";
import { PageHeader, StatusBadge } from "@/components/admin/ui";
import { getAlbumForEdit } from "@/server/admin/queries";
import { AlbumForm } from "../album-form";

export const instant = false;
export const metadata: Metadata = { title: "Edit album" };

export default async function EditAlbumPage({ params }: PageProps<"/admin/gallery/[id]">) {
  const album = await getAlbumForEdit((await params).id);
  if (!album) notFound();
  return (
    <>
      <PageHeader
        title={album.title}
        description={
          <span className="flex items-center gap-2">
            <StatusBadge status={album.status} /> {album.photos.length} photos
          </span>
        }
        back={{ href: "/admin/gallery", label: "All albums" }}
      />
      <Flash />
      <PhotoManager
        albumId={album.id}
        coverPhotoId={album.coverPhotoId}
        photos={album.photos.map((p) => ({
          id: p.id,
          alt: p.alt,
          url: p.asset.url,
          width: p.asset.width,
          height: p.asset.height,
        }))}
      />
      <h2 className="mt-12 mb-4 text-lg font-semibold text-ink">Album details</h2>
      <AlbumForm
        values={{
          id: album.id,
          title: album.title,
          slug: album.slug,
          period: album.period,
          description: album.description,
          status: album.status,
        }}
      />
    </>
  );
}
