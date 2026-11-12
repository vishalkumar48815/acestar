import type { NextConfig } from "next";

/**
 * Old WordPress URLs → new routes. Permanent (308) so search rankings carry over.
 * Keep this list in sync with the sitemap when pages are added.
 */
const legacyRedirects: Array<[string, string]> = [
  ["/company-profile", "/about"],
  ["/awards", "/about/awards"],
  ["/clients-partners", "/about/clients-partners"],
  ["/creative-software", "/solutions/creative-software"],
  ["/creative-cloud", "/solutions/creative-software/adobe-creative-cloud-pro"],
  ["/high-performance-computer", "/solutions/workstations"],
  ["/solution/apple", "/solutions/workstations/apple"],
  ["/digital-workflow", "/solutions/digital-workflow"],
  ["/adobe-acrobat", "/solutions/digital-workflow/adobe-acrobat"],
  ["/blogs", "/blog"],
  ["/stories", "/news"],
  ["/career", "/careers"],
  ["/contact-acestarian", "/contact"],
  ["/techsupport", "/support"],
  ["/acestar-privacy-policies", "/legal/privacy"],
  ["/terms-of-use", "/legal/terms"],
  ["/return-and-refund-policy", "/legal/refunds"],
  ["/delivery-policy", "/legal/delivery"],
];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // One high quality for every image: next/image snaps any other value to the closest
    // allowed one, so photos and artwork are never re-compressed below 90.
    qualities: [90],
    // Images uploaded from /admin in production (Vercel Blob).
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  experimental: {
    // Admin image uploads (browsers shrink photos first; the server caps files at 8 MB).
    serverActions: { bodySizeLimit: "9mb" },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return legacyRedirects.flatMap(([from, to]) => [
      { source: from, destination: to, permanent: true },
      { source: `${from}/`, destination: to, permanent: true },
    ]);
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
