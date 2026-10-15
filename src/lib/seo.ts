import { site } from "@/content/site";

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
