import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Flash } from "@/components/admin/flash";
import { PageHeader, StatusBadge } from "@/components/admin/ui";
import { getPressForEdit } from "@/server/admin/queries";
import { PressForm } from "../press-form";

export const instant = false;
export const metadata: Metadata = { title: "Edit news" };

export default async function EditPressPage({ params }: PageProps<"/admin/news/[id]">) {
  const item = await getPressForEdit((await params).id);
  if (!item) notFound();
  return (
    <>
      <PageHeader
        title="Edit news story"
        description={<StatusBadge status={item.status} />}
        back={{ href: "/admin/news", label: "All news" }}
      />
      <Flash />
      <PressForm
        values={{
          id: item.id,
          title: item.title,
          publisher: item.publisher,
          language: item.language,
          publishedOn: item.publishedOn,
          url: item.url,
          excerpt: item.excerpt,
          featured: item.featured,
          status: item.status,
          image: item.image,
        }}
      />
    </>
  );
}
