import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Acestar Admin" },
  robots: { index: false, follow: false, nocache: true },
};

/** Admin area: request-time pages behind a login, so instant-navigation validation is not useful here. */
export const instant = false;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-svh flex-1 flex-col">{children}</div>;
}
