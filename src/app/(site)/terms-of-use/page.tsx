import type { Metadata } from "next";
import { LegalPageView } from "@/components/legal/legal-page";
import { getLegalPage } from "@/content/legal";
import { pageMeta } from "@/lib/seo";

const page = getLegalPage("terms");

export const metadata: Metadata = pageMeta({ title: page.metaTitle, path: `/${page.slug}/` });

export default function Page() {
  return <LegalPageView page={page} />;
}
