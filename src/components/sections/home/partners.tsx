import Image from "next/image";
import { partners, testimonials } from "@/content/home";
import { cn } from "@/lib/utils";
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
            className="mt-10 grid grid-cols-2 items-center gap-x-6 gap-y-8 border-t border-line pt-10 sm:grid-cols-3 lg:grid-cols-5"
          >
            {partners.logos.map((logo, i) => (
              <li
                key={logo.name}
                data-reveal
                suppressHydrationWarning
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="flex justify-center max-sm:last:col-span-2"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={400}
                  height={177}
                  sizes="180px"
                  className={cn(
                    "h-14 w-auto object-contain transition-transform duration-500 ease-out-expo hover:scale-105 lg:h-16",
                    logo.mono && "dark:[filter:brightness(0)_invert(1)]",
                  )}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page py-10 lg:py-12">
        <TestimonialSlider items={testimonials} />
      </div>
    </section>
  );
}
