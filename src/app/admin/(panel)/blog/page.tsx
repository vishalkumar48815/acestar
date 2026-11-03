import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Flash } from "@/components/admin/flash";
import { ListFilters } from "@/components/admin/list-filters";
import { button, EmptyState, formatDay, NoDatabase, PageHeader, Pagination, StatusBadge } from "@/components/admin/ui";
import { Plus } from "@/components/ui/icons";
import { listBlog } from "@/server/admin/queries";
import { hasDatabase } from "@/server/db";

export const instant = false;
export const metadata: Metadata = { title: "Blog" };

export default async function BlogListPage({ searchParams }: PageProps<"/admin/blog">) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const add = (
    <Link href="/admin/blog/new" className={button("primary")}>
      <Plus aria-hidden="true" className="size-4" /> New post
    </Link>
  );
  if (!hasDatabase)
    return (
      <>
        <PageHeader title="Blog" />
        <NoDatabase />
      </>
    );

  const { rows, total, page, pages } = await listBlog({
    q: one(sp.q),
    status: one(sp.status),
    page: Number(one(sp.page)),
  });
  const href = (p: number) => {
    const next = new URLSearchParams(Object.entries(sp).flatMap(([k, v]) => (typeof v === "string" ? [[k, v]] : [])));
    next.set("page", String(p));
    return `/admin/blog?${next}`;
  };

  return (
    <>
      <PageHeader
        title="Blog"
        description={`${total} ${total === 1 ? "post" : "posts"} · articles shown on /blog`}
        actions={add}
      />
      <Flash />
      <ListFilters placeholder="Search titles, categories or URLs…" />
      {rows.length === 0 ? (
        <EmptyState title="No posts found" body="Try a different search, or write the first post." action={add} />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((r) => (
            <li key={r.id}>
              <Link
                href={`/admin/blog/${r.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white/85 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-24px_rgb(70_70_180/0.45)] dark:bg-white/[0.03]"
              >
                <span className="relative aspect-[16/9] bg-[linear-gradient(135deg,#1b1f4a,#2b2a7a_55%,#5b3cc4)]">
                  {r.coverUrl ? (
                    <Image
                      src={r.coverUrl}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 340px, (min-width: 640px) 45vw, 92vw"
                      className="object-cover"
                    />
                  ) : null}
                  <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 dark:bg-black/60">
                    <StatusBadge status={r.status} />
                  </span>
                </span>
                <span className="flex flex-1 flex-col p-4">
                  <span className="text-xs font-semibold text-brand-ink">{r.category}</span>
                  <span className="mt-1 line-clamp-2 font-semibold text-ink">{r.title}</span>
                  <span className="mt-auto pt-3 text-xs text-fg-subtle">
                    {formatDay(r.publishedOn)} · {r.readingMinutes} min read
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Pagination page={page} pages={pages} href={href} />
    </>
  );
}
