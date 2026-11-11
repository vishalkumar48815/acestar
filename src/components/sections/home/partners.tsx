import Image from "next/image";
import { cn } from "@/lib/utils";
import { partners, testimonials } from "@/content/home";
import { TestimonialSlider } from "./testimonial-slider";

export function Partners() {
  return (
    <section aria-labelledby="partners-title">
      <div className="bg-[linear-gradient(180deg,#f5f6fd,#f2f4fc)] py-16 lg:py-20 dark:bg-[linear-gradient(180deg,rgb(255_255_255/0.025),rgb(255_255_255/0.01))]">
        <div className="container-page">
          <div
            data-reveal
            suppressHydrationWarning
            className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
          >
            <div>
              <p className="text-gradient text-[0.6875rem] font-semibold tracking-[0.34em] uppercase sm:text-xs">
                {partners.eyebrow}
              </p>
              <h2
                id="partners-title"
                className="mt-4 font-display text-[clamp(1.875rem,1.15rem+2.3vw,2.75rem)] leading-[1.08] font-bold tracking-[-0.035em] text-ink"
              >
                {partners.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </div>
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-fg-muted lg:mb-2">{partners.lead}</p>
          </div>

          <ul
            aria-label="Technology partners"
            className="mt-10 grid grid-cols-2 gap-3 border-t border-line pt-10 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6"
          >
            {partners.logos.map((logo, i) => {
              const name = logo.vendor ? `${logo.vendor} ${logo.product}` : logo.product;
              return (
                <li
                  key={name}
                  data-reveal
                  suppressHydrationWarning
                  style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                >
                  <div className="group flex h-full items-center gap-3 rounded-2xl border border-white/90 bg-white/75 px-3.5 py-3 shadow-[0_1px_2px_rgb(30_40_90/0.05)] transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgb(70_70_180/0.4)] sm:px-4 sm:py-3.5 dark:border-white/[0.08] dark:bg-white/[0.04]">
                    <span className="grid size-10 shrink-0 place-items-center sm:size-11">
                      <Image
                        src={logo.icon}
                        alt=""
                        width={44}
                        height={44}
                        unoptimized={logo.icon.endsWith(".svg")}
                        className={cn(
                          "size-full object-contain transition-transform duration-500 ease-out-expo group-hover:scale-110",
                          "invertInDark" in logo && logo.invertInDark && "p-0.5 dark:invert",
                        )}
                      />
                    </span>
                    <span className="min-w-0 leading-tight">
                      {logo.vendor ? (
                        <span className="block text-[0.6875rem] font-medium tracking-wide text-fg-subtle uppercase">
                          {logo.vendor}
                        </span>
                      ) : null}
                      <span className="block text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink sm:text-base">
                        {logo.product}
                      </span>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="container-page py-10 lg:py-12">
        <TestimonialSlider items={testimonials} />
      </div>
    </section>
  );
}
