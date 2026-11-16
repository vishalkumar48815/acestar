import type { Metadata } from "next";
import { site } from "@/content/site";

/*
 * SEO carried over from the old acestar.my (client requirement: same URLs, page titles and
 * meta descriptions, so the relaunch keeps its search rankings). Titles are used exactly as
 * they were, so they bypass the "%s - Acestar" template in the root layout.
 */

/** The meta description most pages on the old site shared, kept word for word. */
export const legacyDescription =
  "IT solutions provider specializes in Creative Softwares (Adobe), High Performance Computers(Apple, Dell, HP) and Digital Workflow Management(Zoom, Saleslive).";

/** The old home page description. */
export const homeDescription =
  "IT solutions provider in the region since 2008, specializes in Creative Softwares, High Performance Computers and Digital Workflow Management.";

/**
 * Metadata for a page: exact <title>, meta description, canonical URL and the matching
 * Open Graph tags. `path` is the public URL, with its trailing slash (e.g. "/company-profile/").
 */
export function pageMeta({
  title,
  path,
  description = legacyDescription,
}: {
  title: string;
  path: string;
  description?: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "en_MY", siteName: site.name, url: path, title, description },
  };
}

/** Organization + LocalBusiness structured data for Google rich results. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    description: site.description,
    foundingDate: String(site.foundedYear),
    telephone: site.contact.phone.href.replace("tel:", ""),
    email: site.contact.email.sales,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit A-10-6, Tower A, Vertical Business Suite, Avenue 3, Bangsar South, No. 8 Jalan Kerinchi",
      addressLocality: "Kuala Lumpur",
      postalCode: "59200",
      addressCountry: "MY",
    },
    sameAs: site.social.map((s) => s.href),
  };
}

/** Serialise JSON-LD safely for inline <script> (prevents `</script>` injection). */
export function toJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
