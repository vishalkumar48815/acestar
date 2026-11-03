import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Flash } from "@/components/admin/flash";
import { ListFilters } from "@/components/admin/list-filters";
import { button, EmptyState, formatDay, NoDatabase, PageHeader, Pagination, StatusBadge } from "@/components/admin/ui";
import { Plus, Star } from "@/components/ui/icons";
import { languageLabel } from "@/content/newsroom";
import { listPress } from "@/server/admin/queries";
import { hasDatabase } from "@/server/db";

export const instant = false;
export const metadata: Metadata = { title: "News" };

export default async function PressListPage({ searchParams }: PageProps<"/admin/news">) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const add = (
    <Link href="/admin/news/new" className={button("primary")}>
      <Plus aria-hidden="true" className="size-4" /> Add news
    </Link>
  );
  if (!hasDatabase)
    return (
      <>
        <PageHeader title="News" />
        <NoDatabase />
      </>
    );

  const { rows, total, page, pages } = await listPress({
    q: one(sp.q),
    status: one(sp.status),
    page: Number(one(sp.page)),
  });
  const href = (p: number) => {
    const next = new URLSearchParams(Object.entries(sp).flatMap(([k, v]) => (typeof v === "string" ? [[k, v]] : [])));
    next.set("page", String(p));
    return `/admin/news?${next}`;
  };

  return (
    <>
      <PageHeader
        title="News"
        description={`${total} ${total === 1 ? "story" : "stories"} · press coverage shown on /news`}
        actions={add}
      />
      <Flash />
      <ListFilters placeholder="Search headlines or publishers…" />
      {rows.length === 0 ? (
        <EmptyState title="No stories found" body="Try a different search, or add the first story." action={add} />
      ) : (
        <ul className="overflow-hidden rounded-2xl border border-line bg-white/85 dark:bg-white/[0.03]">
          {rows.map((r) => (
            <li key={r.id} className="border-b border-line last:border-0">
              <Link
                href={`/admin/news/${r.id}`}
                className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-brand-soft"
              >
                <span className="relative hidden h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-[linear-gradient(135deg,#1b1f4a,#5b3cc4)] sm:block">
                  {r.imageUrl ? <Image src={r.imageUrl} alt="" fill sizes="80px" className="object-cover" /> : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 truncate text-[0.9375rem] font-medium text-ink">
                    {r.featured ? (
                      <Star aria-label="Top story" className="size-4 shrink-0 fill-amber-400 text-amber-500" />
                    ) : null}
                    <span className="truncate">{r.title}</span>
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-fg-subtle">
                    {r.publisher} · {formatDay(r.publishedOn)}
                    {r.language !== "en" ? ` · ${languageLabel[r.language]}` : ""}
                  </span>
                </span>
                <StatusBadge status={r.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Pagination page={page} pages={pages} href={href} />
    </>
  );
}
