"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "@/components/ui/icons";
import { site } from "@/content/site";
import type { DeviceBrand } from "@/content/solutions/types";
import { cn, whatsappLink } from "@/lib/utils";
import { useTabKeys } from "./brand-explorer";
import { BannerStrip, panel, spotlight, toneCard, toneCycle, toneStyle } from "./primitives";

/** Hardware brands as tabs: banner + story, then the product line-up with enquiry links. */
export function DeviceCatalog({ brands }: { brands: DeviceBrand[] }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const uid = useId();
  const brand = brands[index];
  const select = (i: number) => {
    setIndex(i);
    setExpanded(false);
  };
  const { refs, onKeyDown } = useTabKeys(brands.length, index, select);
  const tone = toneCycle[index % toneCycle.length];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Computer brands"
        onKeyDown={onKeyDown}
        className="mx-auto flex w-fit max-w-full [scrollbar-width:none] gap-1 overflow-x-auto rounded-full p-1.5 glass-strong [&::-webkit-scrollbar]:hidden"
      >
        {brands.map((b, i) => (
          <button
            key={b.key}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${b.key}`}
            aria-selected={i === index}
            aria-controls={`${uid}-panel`}
            tabIndex={i === index ? 0 : -1}
            onClick={() => select(i)}
            className={cn(
              "min-h-11 shrink-0 rounded-full px-5 text-[0.9375rem] font-semibold transition-all duration-300 sm:px-6",
              i === index
                ? "bg-[image:var(--btn-gradient)] text-white shadow-[var(--btn-gradient-shadow)]"
                : "text-fg-muted hover:text-fg",
            )}
          >
            {b.name}
          </button>
        ))}
      </div>

      <div
        key={brand.key}
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${brand.key}`}
        className="mt-8 [animation:fade-up_0.5s_var(--ease-out)_both]"
      >
        <div className={cn(panel, "overflow-hidden")}>
          <BannerStrip banner={brand.banner} title={brand.name} />
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12 lg:p-10">
            <div className="max-w-3xl">
              <p className="text-[1.0625rem] leading-relaxed text-fg">{brand.intro}</p>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-500 ease-out-expo",
                  expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden" inert={!expanded}>
                  {brand.story.map((para) => (
                    <p key={para.slice(0, 24)} className="mt-4 leading-relaxed text-fg-muted">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="mt-3 text-sm font-semibold text-brand-ink hover:underline"
              >
                {expanded ? "Show less" : `Why ${brand.name}?`}
              </button>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              {brand.link ? (
                <ButtonLink href={brand.link.href} variant="gradient" size="md" className="px-6">
                  {brand.link.label}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover/btn:translate-x-1"
                  />
                </ButtonLink>
              ) : null}
              <ButtonLink
                href={whatsappLink(
                  site.contact.whatsapp.number,
                  `Hi Acestar, I'd like to enquire about ${brand.name} computers.`,
                )}
                variant="glass"
                size="md"
                className="rounded-full px-6"
              >
                <MessageCircle aria-hidden="true" className="size-4" /> Talk to a specialist
              </ButtonLink>
            </div>
          </div>
        </div>

        {brand.products.length > 0 && (
          <CardSpotlight className="mt-5">
            <ul
              className={cn(
                "grid gap-4 sm:grid-cols-2",
                brand.products.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
              )}
            >
              {brand.products.map((p, i) => (
                <li key={p.name} style={{ animation: `fade-up 0.6s var(--ease-out) ${i * 60}ms both` }}>
                  <article
                    data-spotlight
                    className={cn(toneCard, "group/card flex h-full flex-col p-5")}
                    style={toneStyle(tone)}
                  >
                    <span aria-hidden="true" className={spotlight} />
                    <div className="relative h-40">
                      {p.image ? (
                        <Image
                          src={p.image.src}
                          width={p.image.width}
                          height={p.image.height}
                          alt={p.image.alt}
                          sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw"
                          className="absolute inset-0 m-auto h-full w-full object-contain drop-shadow-[0_18px_22px_rgb(60_60_140/0.16)] transition-transform duration-700 ease-out-expo group-hover/card:-translate-y-1 group-hover/card:scale-[1.04]"
                        />
                      ) : null}
                    </div>
                    <h4 className="mt-5 text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink">{p.name}</h4>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{p.desc}</p>
                    <a
                      href={whatsappLink(
                        site.contact.whatsapp.number,
                        `Hi Acestar, I'd like a quote for the ${p.name}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-ink hover:underline"
                    >
                      Enquire <ArrowRight aria-hidden="true" className="size-4" />
                      <span className="sr-only"> about {p.name} (opens WhatsApp)</span>
                    </a>
                  </article>
                </li>
              ))}
            </ul>
          </CardSpotlight>
        )}
      </div>
    </div>
  );
}
