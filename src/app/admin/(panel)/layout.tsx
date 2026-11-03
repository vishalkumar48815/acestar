import { Suspense } from "react";
import { AdminShell } from "@/components/admin/shell";
import { requireAdmin } from "@/server/auth/session";

/** Request-time, signed-in pages: opt out of instant-navigation validation (see admin/layout.tsx). */
export const instant = false;

/**
 * Everything under /admin except the login page. The session is checked here (inside Suspense,
 * as Cache Components requires for cookie reads) and again in every query and Server Action.
 */
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<ShellFallback />}>
      <Gate>{children}</Gate>
    </Suspense>
  );
}

async function Gate({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  return <AdminShell email={session.email}>{children}</AdminShell>;
}

function ShellFallback() {
  return (
    <div className="flex min-h-svh flex-1" aria-busy="true">
      <div className="hidden w-64 border-r border-line lg:block" />
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 pt-10 sm:px-8">
        <div className="h-9 w-56 animate-pulse rounded-xl bg-brand-soft" />
        <div className="mt-8 h-64 animate-pulse rounded-2xl bg-brand-soft" />
      </div>
    </div>
  );
}
