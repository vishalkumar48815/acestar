import type { Metadata } from "next";
import Link from "next/link";
import { button, Card, formatDay, NoDatabase, PageHeader, StatusBadge } from "@/components/admin/ui";
import { ArrowRight, Images, Newspaper, PenLine, Plus } from "@/components/ui/icons";
import { getDashboard } from "@/server/admin/queries";
import { hasDatabase } from "@/server/db";
import { storageDriver } from "@/server/storage";

export const instant = false;
export const metadata: Metadata = { title: "Dashboard" };

const sections = {
  news: { label: "News", href: "/admin/news", icon: Newspaper, unit: "stories" },
  blog: { label: "Blog", href: "/admin/blog", icon: PenLine, unit: "posts" },
  gallery: { label: "Gallery", href: "/admin/gallery", icon: Images, unit: "albums" },
} as const;

export default async function DashboardPage() {
  if (!hasDatabase) {
    return (
      <>
        <PageHeader title="Dashboard" />
        <NoDatabase />
      </>
    );
  }
  const data = await getDashboard();
  const counts = { news: data.press, blog: data.blog, gallery: data.gallery };

  return (
    <>
      <PageHeader
        title={
          <>
            Welcome <span className="text-gradient">back</span>
          </>
        }
        description="Everything you publish here appears on acestar.my within seconds."
        actions={
          <>
            <Link href="/admin/blog/new" className={button("primary")}>
              <Plus aria-hidden="true" className="size-4" /> New blog post
            </Link>
            <Link href="/admin/news/new" className={button("secondary")}>
              <Plus aria-hidden="true" className="size-4" /> Add news
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {(Object.keys(sections) as Array<keyof typeof sections>).map((key) => {
          const s = sections[key];
          const c = counts[key];
          return (
            <Link
              key={key}
              href={s.href}
              className="group relative overflow-hidden rounded-2xl border border-line bg-white/85 p-5 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-24px_rgb(70_70_180/0.45)] dark:bg-white/[0.03]"
            >
              <span
                aria-hidden="true"
                className="absolute -top-10 -right-10 size-32 rounded-full bg-[image:var(--btn-gradient)] opacity-[0.08] blur-xl transition-opacity group-hover:opacity-20"
              />
              <span className="grid size-10 place-items-center rounded-xl bg-[image:var(--btn-gradient)] text-white shadow-[var(--btn-gradient-shadow)]">
                <s.icon className="size-5" />
              </span>
              <p className="mt-4 text-sm text-fg-muted">{s.label}</p>
              <p className="mt-0.5 font-display text-3xl font-bold tracking-[-0.03em] text-ink tabular-nums">
                {c.published}
              </p>
              <p className="mt-1 text-xs text-fg-subtle">
                published {s.unit}
                {c.draft ? ` · ${c.draft} draft${c.draft === 1 ? "" : "s"}` : ""}
                {key === "gallery" ? ` · ${data.photos} photos` : ""}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card title="Recently edited" className="min-w-0">
          {data.recent.length ? (
            <ul className="-mx-2 divide-y divide-line">
              {data.recent.map((r) => (
                <li key={`${r.kind}-${r.id}`}>
                  <Link
                    href={`/admin/${r.kind}/${r.id}`}
                    className="flex items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-brand-soft"
                  >
                    <span className="w-16 shrink-0 text-xs font-semibold tracking-wide text-fg-subtle uppercase">
                      {sections[r.kind].label}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[0.9375rem] font-medium text-ink">{r.title}</span>
                    <StatusBadge status={r.status} />
                    <span className="hidden w-24 shrink-0 text-right text-xs text-fg-subtle sm:block">
                      {formatDay(new Date(r.updated_at).toISOString())}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-fg-muted">Nothing yet.</p>
          )}
        </Card>

        <Card title="Quick tips">
          <ul className="flex flex-col gap-3 text-sm text-fg-muted">
            <li>
              <strong className="text-ink">Drafts</strong> stay private until you switch them to Published.
            </li>
            <li>
              <strong className="text-ink">One top story</strong>: marking a news item as featured replaces the current
              one.
            </li>
            <li>
              <strong className="text-ink">Gallery</strong>: drag photos to reorder, and pick the cover with the star.
            </li>
            <li>
              <strong className="text-ink">Images</strong> are resized and optimised automatically.
            </li>
          </ul>
          <p className="mt-5 border-t border-line pt-4 text-xs text-fg-subtle">
            Image storage: {storageDriver() === "blob" ? "Vercel Blob" : "local folder (development)"}
          </p>
          <Link
            href="/"
            target="_blank"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink"
          >
            Open the website <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Card>
      </div>
    </>
  );
}
