import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Flash } from "@/components/admin/flash";
import { PageHeader, StatusBadge } from "@/components/admin/ui";
import { getBlogCategories, getBlogForEdit } from "@/server/admin/queries";
import { BlogForm } from "../blog-form";

export const instant = false;
export const metadata: Metadata = { title: "Edit blog post" };

export default async function EditBlogPostPage({ params }: PageProps<"/admin/blog/[id]">) {
  const { id } = await params;
  const [post, categories] = await Promise.all([getBlogForEdit(id), getBlogCategories()]);
  if (!post) notFound();
  return (
    <>
      <PageHeader
        title="Edit blog post"
        description={<StatusBadge status={post.status} />}
        back={{ href: "/admin/blog", label: "All posts" }}
      />
      <Flash />
      <BlogForm
        categories={categories}
        values={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          category: post.category,
          author: post.author,
          publishedOn: post.publishedOn,
          excerpt: post.excerpt,
          body: post.body,
          status: post.status,
          cover: post.cover,
        }}
      />
    </>
  );
}
