import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/* Shared building blocks for the admin screens (server-safe, no client JS). */

export const inputClass =
  "block w-full min-h-11 rounded-xl border border-line bg-white px-3.5 text-[0.9375rem] text-fg shadow-[inset_0_1px_2px_rgb(14_26_43/0.04)] outline-none transition-[border-color,box-shadow] placeholder:text-fg-subtle focus:border-[color-mix(in_oklab,var(--accent-from)_60%,transparent)] focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent-from)_18%,transparent)] aria-[invalid=true]:border-danger dark:bg-white/[0.04]";

export const buttonBase =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,color,opacity] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

export const buttonVariants = {
  primary:
    "bg-[image:var(--btn-gradient)] text-white shadow-[0_10px_24px_-12px_rgb(91_84_240/0.8)] hover:shadow-[0_14px_30px_-12px_rgb(91_84_240/0.95)]",
  secondary:
    "border border-line bg-white text-fg hover:border-[color-mix(in_oklab,var(--accent-from)_40%,transparent)] dark:bg-white/[0.04]",
  ghost: "text-fg-muted hover:bg-brand-soft hover:text-fg",
  danger:
    "border border-[color-mix(in_oklab,var(--danger)_35%,transparent)] text-danger hover:bg-[color-mix(in_oklab,var(--danger)_10%,transparent)]",
} as const;

export const button = (variant: keyof typeof buttonVariants = "secondary", className?: string) =>
  cn(buttonBase, buttonVariants[variant], className);

export function PageHeader({
  title,
  description,
  actions,
  back,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  back?: { href: string; label: string };
}) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {back ? (
          <Link href={back.href} className="mb-3 inline-flex items-center gap-1.5 text-sm text-fg-subtle hover:text-fg">
            <ArrowLeft aria-hidden="true" className="size-4" />
            {back.label}
          </Link>
        ) : null}
        <h1 className="font-display text-[clamp(1.6rem,1.2rem+1.2vw,2.1rem)] leading-tight font-bold tracking-[-0.03em] text-ink">
          {title}
        </h1>
        {description ? <p className="mt-1.5 max-w-2xl text-[0.9375rem] text-fg-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}

export function Card({
  children,
  className,
  title,
  description,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-line bg-white/85 p-5 shadow-[0_1px_2px_rgb(30_40_90/0.04)] sm:p-6 dark:bg-white/[0.03]",
        className,
      )}
    >
      {title ? (
        <div className="mb-5">
          <h2 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink">{title}</h2>
          {description ? <p className="mt-1 text-sm text-fg-muted">{description}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function StatusBadge({ status }: { status: "draft" | "published" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        status === "published"
          ? "bg-[color-mix(in_oklab,var(--success)_14%,transparent)] text-success"
          : "bg-[color-mix(in_oklab,var(--fg-subtle)_14%,transparent)] text-fg-muted",
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 rounded-full", status === "published" ? "bg-success" : "bg-fg-subtle")}
      />
      {status === "published" ? "Published" : "Draft"}
    </span>
  );
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-line px-6 py-16 text-center">
      <div
        aria-hidden="true"
        className="mb-4 size-12 rounded-2xl bg-[image:var(--btn-gradient)] opacity-80 shadow-[var(--btn-gradient-shadow)]"
      />
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <p className="mt-1 max-w-sm text-sm text-fg-muted">{body}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function Pagination({ page, pages, href }: { page: number; pages: number; href: (page: number) => string }) {
  if (pages <= 1) return null;
  return (
    <nav aria-label="Pagination" className="mt-6 flex items-center justify-between gap-3 text-sm text-fg-muted">
      <span>
        Page {page} of {pages}
      </span>
      <div className="flex gap-2">
        {page > 1 ? (
          <Link href={href(page - 1)} className={button("secondary")}>
            <ChevronLeft aria-hidden="true" className="size-4" /> Previous
          </Link>
        ) : null}
        {page < pages ? (
          <Link href={href(page + 1)} className={button("secondary")}>
            Next <ChevronRight aria-hidden="true" className="size-4" />
          </Link>
        ) : null}
      </div>
    </nav>
  );
}

export function NoDatabase() {
  return (
    <Card title="Database not connected">
      <p className="text-[0.9375rem] text-fg-muted">
        The admin needs PostgreSQL. Set <code className="font-mono text-ink">DATABASE_URL</code> in{" "}
        <code className="font-mono text-ink">.env.local</code>, then run{" "}
        <code className="font-mono text-ink">npm run db:migrate</code> and{" "}
        <code className="font-mono text-ink">npm run db:seed</code>. The public site keeps working from the JSON files
        in the meantime. See <code className="font-mono text-ink">docs/BACKEND.md</code>.
      </p>
    </Card>
  );
}

export const formatDay = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso),
  );
