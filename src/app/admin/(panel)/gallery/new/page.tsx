import type { Metadata } from "next";
import { connection } from "next/server";
import { NoDatabase, PageHeader } from "@/components/admin/ui";
import { hasDatabase } from "@/server/db";
import { AlbumForm } from "../album-form";

export const instant = false;
export const metadata: Metadata = { title: "New album" };

export default async function NewAlbumPage() {
  await connection(); // current year per request, not at build time
  return (
    <>
      <PageHeader
        title="New album"
        description="Create the album first, then add photos."
        back={{ href: "/admin/gallery", label: "All albums" }}
      />
      {hasDatabase ? (
        <AlbumForm
          values={{ title: "", slug: "", period: String(new Date().getFullYear()), description: "", status: "draft" }}
        />
      ) : (
        <NoDatabase />
      )}
    </>
  );
}
