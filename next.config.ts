import type { NextConfig } from "next";

/**
 * Old WordPress URLs → new routes. Permanent (308) so search rankings carry over.
 * Keep this list in sync with the sitemap when pages are added.
 */
/**
 * The site keeps the old acestar.my URLs (client requirement, so search rankings carry over).
 * These are only the working paths used during the rebuild, sent on to the live URL.
 */
const legacyRedirects: Array<[string, string]> = [
  ["/about", "/company-profile/"],
  ["/about/awards", "/awards/"],
  ["/about/clients-partners", "/clients-partners/"],
  ["/solutions/creative-software", "/creative-software/"],
  ["/solutions/creative-software/adobe-creative-cloud-pro", "/creative-cloud/"],
  ["/solutions/workstations", "/high-performance-computer/"],
  ["/solutions/workstations/apple", "/solution/apple/"],
  ["/solutions/digital-workflow", "/digital-workflow/"],
  ["/solutions/digital-workflow/adobe-acrobat", "/adobe-acrobat/"],
  ["/blog", "/blogs/"],
  ["/stories", "/news/"],
  ["/careers", "/career/"],
  ["/contact", "/contact-acestarian/"],
  ["/support", "/techsupport/"],
  ["/legal/privacy", "/acestar-privacy-policies/"],
  ["/legal/terms", "/terms-of-use/"],
  ["/legal/refunds", "/return-and-refund-policy/"],
  ["/legal/delivery", "/delivery-policy/"],
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
  // Old acestar.my URLs all end in "/" (WordPress), so the new site does too.
  trailingSlash: true,
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
    return legacyRedirects.map(([from, to]) => ({ source: from, destination: to, permanent: true }));
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
