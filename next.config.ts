import type { NextConfig } from "next";

/**
 * Old WordPress URLs → new routes. Permanent (308) so search rankings carry over.
 * Keep this list in sync with the sitemap when pages are added.
 */
const legacyRedirects: Array<[string, string]> = [
  ["/company-profile", "/about"],
  ["/awards", "/about#awards"],
  ["/clients-partners", "/about#clients"],
  ["/creative-software", "/solutions/creative-software"],
  ["/creative-cloud", "/solutions/creative-software"],
  ["/high-performance-computer", "/solutions/workstations"],
  ["/solution/apple", "/solutions/workstations"],
  ["/digital-workflow", "/solutions/digital-workflow"],
  ["/adobe-acrobat", "/solutions/digital-workflow"],
  ["/news", "/stories"],
  ["/blogs", "/stories"],
  ["/gallery", "/stories"],
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
