import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import { homeDescription, organizationJsonLd, toJsonLd } from "@/lib/seo";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

/* Self-hosted variable fonts (SIL Open Font License) — no runtime request to Google. */
const sans = localFont({
  src: "../fonts/inter-latin-wght.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

/* Handwritten accent used sparingly (hero tagline). */
const script = localFont({
  src: "../fonts/mrs-saint-delafield-latin-400.woff2",
  weight: "400",
  variable: "--font-script-face",
  display: "swap",
  preload: false,
});

/* Marker-style handwriting for short accents (Careers hero). Caveat, SIL Open Font License. */
const marker = localFont({
  src: "../fonts/caveat-latin-wght.woff2",
  weight: "400 700",
  variable: "--font-marker-face",
  display: "swap",
  preload: false,
});

/* Brush script for "Our Story" (Company Profile). Vujahday Script, SIL Open Font License. */
const brush = localFont({
  src: "../fonts/vujahday-script-latin-400.woff2",
  weight: "400",
  variable: "--font-brush-face",
  display: "swap",
  preload: false,
});

/* TechCare brand typeface, used only on the TechCare page (client mock). Montserrat, SIL Open Font License. */
const techcare = localFont({
  src: "../fonts/montserrat-latin-wght.woff2",
  weight: "100 900",
  variable: "--font-montserrat",
  display: "swap",
  preload: false,
});

const mono = localFont({
  src: "../fonts/jetbrains-mono-latin-500.woff2",
  weight: "500",
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Same title format and home description as the old acestar.my (see src/lib/seo.ts).
  title: {
    default: "Acestar Group",
    template: `%s - ${site.name}`,
  },
  description: homeDescription,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: site.url,
    siteName: site.name,
    title: "Acestar Group",
    description: homeDescription,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f8fd" },
    { media: "(prefers-color-scheme: dark)", color: "#060b16" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-MY"
      suppressHydrationWarning
      className={`${sans.variable} ${script.variable} ${marker.variable} ${brush.variable} ${techcare.variable} ${mono.variable}`}
    >
      <head>
        {/* Runs before first paint: applies saved/system theme, no flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(organizationJsonLd()) }} />
      </head>
      <body className="flex min-h-svh flex-col">{children}</body>
    </html>
  );
}
