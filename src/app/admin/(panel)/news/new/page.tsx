import type { Metadata } from "next";
import { connection } from "next/server";
import { NoDatabase, PageHeader } from "@/components/admin/ui";
import { hasDatabase } from "@/server/db";
import { PressForm } from "../press-form";

export const instant = false;
export const metadata: Metadata = { title: "Add news" };

export default async function NewPressPage() {
  await connection(); // "today" must be computed per request, not at build time
  const today = new Date().toISOString().slice(0, 10);
  return (
    <>
      <PageHeader
        title="Add a news story"
        description="A press article or feature about Acestar."
        back={{ href: "/admin/news", label: "All news" }}
      />
      {hasDatabase ? (
        <PressForm
          values={{
            title: "",
            publisher: "",
            language: "en",
            publishedOn: today,
            url: null,
            excerpt: "",
            featured: false,
            status: "published",
            image: null,
          }}
        />
      ) : (
        <NoDatabase />
      )}
    </>
  );
}
