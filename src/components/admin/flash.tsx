"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const messages: Record<string, string> = {
  created: "Created. You can keep editing below.",
  deleted: "Deleted.",
};

/** One-off confirmation from a redirect (?created=1 / ?deleted=1); cleans the URL afterwards. */
export function Flash() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const key = Object.keys(messages).find((k) => params.has(k));
  const [text] = useState(() => (key ? messages[key] : null));

  useEffect(() => {
    if (!key) return;
    const next = new URLSearchParams(params);
    next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [key, params, pathname, router]);

  if (!text) return null;
  return (
    <p
      role="status"
      className="mb-6 rounded-xl border border-[color-mix(in_oklab,var(--success)_30%,transparent)] bg-[color-mix(in_oklab,var(--success)_10%,transparent)] px-4 py-3 text-sm font-medium text-success"
      style={{ animation: "fade-up 0.4s var(--ease-out) both" }}
    >
      ✓ {text}
    </p>
  );
}
