import type { Metadata } from "next";
import { NoDatabase, PageHeader } from "@/components/admin/ui";
import { getBlogCategories } from "@/server/admin/queries";
import { hasDatabase } from "@/server/db";
import { BlogForm } from "../blog-form";

export const instant = false;
export const metadata: Metadata = { title: "New blog post" };

export default async function NewBlogPostPage() {
  if (!hasDatabase) return <NoDatabase />;
  const categories = await getBlogCategories();
  return (
    <>
      <PageHeader title="New blog post" back={{ href: "/admin/blog", label: "All posts" }} />
      <BlogForm
        categories={categories}
        values={{
          title: "",
          slug: "",
          category: "",
          author: "Acestar",
          publishedOn: new Date().toISOString().slice(0, 10),
          excerpt: "",
          body: "",
          status: "draft",
          cover: null,
        }}
      />
    </>
  );
}
