"use client";

import { useEffect, useState } from "react";
import { SocialIcon } from "@/components/ui/social-icons";
import { site } from "@/content/site";
import { cn, whatsappLink } from "@/lib/utils";

/**
 * Floating WhatsApp chat button (bottom right), like the original site's.
 * Hides itself while the mobile menu or the gallery lightbox has locked page scroll.
 */
export function WhatsAppFloat() {
  const [hidden, setHidden] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setHidden(root.style.overflow === "hidden");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["style"] });
    // Let the hero settle before the button pops in.
    const t = window.setTimeout(() => setReady(true), 900);
    return () => {
      observer.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  const { number } = site.contact.whatsappCare;

  return (
    <a
      href={whatsappLink(number, site.whatsappGreeting)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Acestar on WhatsApp (opens in a new tab)"
      tabIndex={hidden ? -1 : undefined}
      aria-hidden={hidden || undefined}
      className={cn(
        "wa-float group fixed right-4 z-[55] flex items-center sm:right-6",
        "bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]",
        "transition-[opacity,transform] duration-500 ease-out-expo",
        ready && !hidden ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      {/* Label slides out on hover / focus (desktop) */}
      <span
        aria-hidden="true"
        className="pointer-events-none mr-3 hidden translate-x-2 rounded-full border border-white/80 bg-white px-4 py-2 text-sm font-semibold whitespace-nowrap text-ink opacity-0 shadow-[0_12px_30px_-14px_rgb(40_40_120/0.45)] transition-all duration-300 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block dark:border-white/10 dark:bg-[#0b1222] dark:text-white"
      >
        Chat with us
      </span>

      <span className="relative grid size-14 place-items-center">
        {/* Pulse rings */}
        <span aria-hidden="true" className="wa-ring absolute inset-0 rounded-full bg-[#25D366]" />
        <span aria-hidden="true" className="wa-ring wa-ring-delay absolute inset-0 rounded-full bg-[#25D366]" />
        {/* Brand gradient halo, matching the site's accent */}
        <span
          aria-hidden="true"
          className="absolute -inset-[3px] rounded-full opacity-80 blur-[1px] wa-spin"
        />
        <span className="relative grid size-14 place-items-center rounded-full bg-[linear-gradient(145deg,#2fe07a,#1ebe5b_55%,#128c4a)] text-white shadow-[0_14px_30px_-10px_rgb(18_140_74/0.65),inset_0_1px_0_rgb(255_255_255/0.35)] transition-transform duration-300 ease-out-expo group-hover:scale-105 group-active:scale-95">
          <SocialIcon network="whatsapp" className="size-8 drop-shadow-[0_1px_1px_rgb(0_0_0/0.15)]" />
        </span>
      </span>
    </a>
  );
}
