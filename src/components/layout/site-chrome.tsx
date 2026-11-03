import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

/** Public-site frame: header, footer and the site-wide helpers. Not used by /admin. */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
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
      <WhatsAppFloat />
      <RevealObserver />
      <SmoothScroll />
    </>
  );
}
