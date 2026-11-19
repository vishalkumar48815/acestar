"use client";

import { useEffect, useRef } from "react";

/**
 * Zoho Desk ticket form (public/zoho/support-ticket-embed.html) in an iframe that:
 * - always grows to the form's full height, so the page scrolls normally and the frame never shows its
 *   own scrollbar (the captcha and fonts load after the form, so the height is kept in sync, not set once);
 * - follows the site's light/dark theme (the embed's ACESTAR THEME styles read <html data-theme>).
 * Both work because the embed is served from our own domain (same origin).
 */
export function ZohoTicketFrame({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    let cleanupDoc: (() => void) | undefined;

    const setup = () => {
      const win = frame.contentWindow as (Window & typeof globalThis) | null;
      const doc = frame.contentDocument;
      // Skip the initial about:blank document; the real one triggers "load" again.
      if (!win || !doc?.body || doc.URL === "about:blank") return;
      cleanupDoc?.();

      // The page scrolls, not the frame.
      doc.documentElement.style.overflow = "hidden";

      const fit = () => {
        const h = Math.ceil(doc.body.getBoundingClientRect().height);
        if (h > 0) frame.style.height = `${h}px`;
      };
      const syncTheme = () => {
        doc.documentElement.dataset.theme = document.documentElement.dataset.theme ?? "light";
      };
      syncTheme();
      fit();

      // Observers must come from the iframe's own window: a parent-page ResizeObserver
      // does not get size changes for elements inside another document.
      const resize = new win.ResizeObserver(fit);
      resize.observe(doc.body);
      const content = new win.MutationObserver(fit); // e.g. captcha shown, files attached
      content.observe(doc.body, { subtree: true, childList: true, attributes: true });
      doc.fonts?.ready.then(fit).catch(() => {});
      doc.querySelectorAll("img").forEach((img) => img.addEventListener("load", fit));

      const theme = new MutationObserver(syncTheme);
      theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

      cleanupDoc = () => {
        resize.disconnect();
        content.disconnect();
        theme.disconnect();
      };
    };

    // The iframe may already have loaded before hydration.
    if (frame.contentDocument?.readyState === "complete") setup();
    frame.addEventListener("load", setup);
    return () => {
      frame.removeEventListener("load", setup);
      cleanupDoc?.();
    };
  }, []);

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      scrolling="no"
      // 64rem until the form reports its real height
      className="block h-[64rem] w-full overflow-hidden border-0 bg-transparent"
    />
  );
}
