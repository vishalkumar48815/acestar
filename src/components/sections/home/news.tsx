import Image from "next/image";
import { ArrowUpRight } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { news } from "@/content/home";
import { media } from "@/content/media";

/** "Latest News Updates" from the old homepage: press coverage, opens the source site. */
export function News() {
  return (
    <section aria-labelledby="news-title" className="relative py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          id="news-title"
          eyebrow="Latest news"
          title="In the news."
          lead="Acestar has been a name of trust for years, built little by little by a superb team."
        />
        <ul className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3">
          {news.map((item, i) => {
            const img = media.news[i];
            return (
              <li key={item.href} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  lang={item.lang}
                  className="group/card flex h-full flex-col overflow-hidden rounded-[1.75rem] glass transition-transform duration-500 ease-out-expo hover:-translate-y-1"
                >
                  {img ? (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.04]"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <span className="text-eyebrow text-brand-ink">{item.source}</span>
                    <h3 className="text-lg leading-snug font-bold">{item.title}</h3>
                    <p className="text-sm text-fg-muted">{item.excerpt}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold">
                      Read full story
                      <ArrowUpRight className="size-4 text-brand-ink transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                      <span className="sr-only">(opens {item.source} in a new tab)</span>
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
