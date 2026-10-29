"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { CardSpotlight } from "@/components/motion/card-spotlight";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "@/components/ui/icons";
import { site } from "@/content/site";
import type { Brand, BrandProduct } from "@/content/solutions/types";
import { cn, whatsappLink } from "@/lib/utils";
import { AppIcon, BannerStrip, panel, spotlight } from "./primitives";
import { ProductDialog } from "./product-dialog";

/** Arrow-key navigation for a WAI-ARIA tab list. */
export function useTabKeys(count: number, index: number, select: (i: number) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = (event: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: (index + 1) % count,
      ArrowDown: (index + 1) % count,
      ArrowLeft: (index - 1 + count) % count,
      ArrowUp: (index - 1 + count) % count,
      Home: 0,
      End: count - 1,
    };
    const next = keys[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next);
    refs.current[next]?.focus();
  };
  return { refs, onKeyDown };
}

/** Brand tabs → banner, story and an app grid; each app opens a detail dialog. */
export function BrandExplorer({ brands }: { brands: Brand[] }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [product, setProduct] = useState<BrandProduct | null>(null);
  const uid = useId();
  const brand = brands[index];
  const { refs, onKeyDown } = useTabKeys(brands.length, index, (i) => {
    setIndex(i);
    setExpanded(false);
  });
  const total = brand.groups.reduce((n, g) => n + g.products.length, 0);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Software brands"
        onKeyDown={onKeyDown}
        className="-mx-5 flex [scrollbar-width:none] gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:justify-center md:px-0 [&::-webkit-scrollbar]:hidden"
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
            onClick={() => {
              setIndex(i);
              setExpanded(false);
            }}
            className={cn(
              "inline-flex min-h-12 shrink-0 items-center gap-2.5 rounded-full border px-4 pr-5 text-[0.9375rem] font-semibold transition-all duration-300",
              i === index
                ? "border-transparent bg-[image:var(--btn-gradient)] text-white shadow-[var(--btn-gradient-shadow)]"
                : "border-line bg-white/60 text-fg-muted hover:text-fg dark:bg-white/[0.03]",
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
        className={cn(panel, "mt-6 [animation:fade-up_0.5s_var(--ease-out)_both] overflow-hidden")}
      >
        <BannerStrip
          banner={brand.banner}
          title={brand.name}
          logo={brand.logo}
          kicker={total > 0 ? `${total} products` : undefined}
        />
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12 lg:p-10">
          <div>
            <p className={cn("max-w-3xl leading-relaxed text-fg-muted", !expanded && "line-clamp-3")}>
              {brand.description}
            </p>
            {brand.description.length > 240 && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="mt-2 text-sm font-semibold text-brand-ink hover:underline"
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            {brand.link ? (
              <ButtonLink href={brand.link.href} variant="gradient" size="md" className="px-6">
                {brand.link.label}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-1" />
              </ButtonLink>
            ) : null}
            <ButtonLink
              href={whatsappLink(site.contact.whatsapp.number, `Hi Acestar, I'd like to enquire about ${brand.name}.`)}
              variant="glass"
              size="md"
              className="rounded-full px-6"
            >
              <MessageCircle aria-hidden="true" className="size-4" /> Enquire on WhatsApp
            </ButtonLink>
          </div>
        </div>

        {total > 0 && (
          <CardSpotlight className="border-t border-line bg-white/30 p-4 sm:p-6 lg:p-8 dark:bg-transparent">
            {brand.groups.map((group, gi) => (
              <div key={group.title ?? gi} className={cn(gi > 0 && "mt-8")}>
                {group.title ? <h4 className="mb-3 text-eyebrow text-fg-subtle">{group.title}</h4> : null}
                <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {group.products.map((p, pi) => (
                    <li
                      key={p.id}
                      style={{ animation: `fade-up 0.5s var(--ease-out) ${Math.min(pi, 12) * 30}ms both` }}
                    >
                      <button
                        type="button"
                        data-spotlight
                        onClick={() => setProduct(p)}
                        aria-haspopup="dialog"
                        className="group/card relative isolate flex h-full w-full items-center gap-3 rounded-2xl border border-line bg-white/70 p-3 text-left transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-18px_rgb(60_60_160/0.35)] dark:bg-white/[0.03]"
                      >
                        <span aria-hidden="true" className={spotlight} />
                        <AppIcon icon={p.icon} name={p.name} className="size-10" />
                        <span className="min-w-0 text-[0.875rem] leading-snug font-semibold text-ink">{p.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardSpotlight>
        )}

        {brand.feature ? (
          <div className="grid items-center gap-6 border-t border-line p-6 sm:p-8 md:grid-cols-[1.1fr_1fr] lg:p-10">
            {brand.feature.image ? (
              <Image
                src={brand.feature.image.src}
                width={brand.feature.image.width}
                height={brand.feature.image.height}
                alt={brand.feature.image.alt}
                sizes="(min-width: 768px) 520px, 100vw"
                className="w-full rounded-2xl object-cover"
              />
            ) : null}
            <div>
              <p className="leading-relaxed text-fg-muted">{brand.feature.caption}</p>
              {brand.link ? (
                <Link
                  href={brand.link.href}
                  className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand-ink hover:underline"
                >
                  See Creative Cloud Pro plans <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      <ProductDialog open={product !== null} onClose={() => setProduct(null)} labelledBy={`${uid}-dialog-title`}>
        {product ? (
          <>
            <div className="flex items-center gap-4 pr-10">
              <AppIcon icon={product.icon} name={product.name} className="size-14" />
              <div>
                <p className="text-sm text-fg-subtle">{brand.name}</p>
                <h3
                  id={`${uid}-dialog-title`}
                  className="text-[1.5rem] leading-tight font-bold tracking-[-0.02em] text-ink"
                >
                  {product.name}
                </h3>
              </div>
            </div>
            <p className="mt-5 leading-relaxed text-fg-muted">{product.desc}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={whatsappLink(site.contact.whatsapp.number, `Hi Acestar, I'd like a quote for ${product.name}.`)}
                variant="gradient"
                size="md"
                className="px-6"
              >
                <MessageCircle aria-hidden="true" className="size-4" /> Get a quote
              </ButtonLink>
              <ButtonLink href="/contact" variant="glass" size="md" className="rounded-full px-6">
                Contact us
              </ButtonLink>
            </div>
          </>
        ) : null}
      </ProductDialog>
    </div>
  );
}
