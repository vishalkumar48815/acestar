import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { site } from "@/content/site";
import { organizationJsonLd, toJsonLd } from "@/lib/seo";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

/* Self-hosted variable fonts (SIL Open Font License) — no runtime request to Google. */
const display = localFont({
  src: "../fonts/bricolage-grotesque-latin-wght.woff2",
  weight: "200 800",
  variable: "--font-bricolage",
  display: "swap",
});

const body = localFont({
  src: "../fonts/manrope-latin-wght.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
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
  title: {
    default: "Acestar Group | IT Solutions Provider in Malaysia",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
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
    <html lang="en-MY" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        {/* Runs before first paint: applies saved/system theme, no flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(organizationJsonLd()) }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[70] -translate-y-24 rounded-full px-4 py-2 font-semibold glass-strong transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <SmoothScroll />
      </body>
    </html>
  );
}
