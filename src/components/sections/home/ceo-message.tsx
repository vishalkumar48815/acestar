import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award } from "@/components/ui/icons";
import { ceoMessage, recognition } from "@/content/home";
import { media } from "@/content/media";

/** Group CEO message + headline awards (from the old homepage's CEO block and Awards page). */
export function CeoMessage() {
  return (
    <section aria-labelledby="ceo-title" className="relative py-14 md:py-20">
      <div className="container-page">
        <div data-reveal className="relative isolate overflow-hidden rounded-[2.25rem] p-7 glass sm:p-12 lg:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-24 -z-10 size-[28rem] rounded-full bg-[var(--aurora-2)] blur-[90px]"
          />
          <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-14">
            <figure className="flex flex-col gap-8">
              <span className="text-eyebrow text-brand-ink">A message from our CEO</span>
              <blockquote>
                <p id="ceo-title" className="text-title">
                  &ldquo;{ceoMessage.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center gap-5">
                {media.ceoSignature ? (
                  <Image
                    src={media.ceoSignature.src}
                    alt=""
                    width={media.ceoSignature.width}
                    height={media.ceoSignature.height}
                    className="h-14 w-auto dark:invert"
                  />
                ) : null}
                <span className="flex flex-col">
                  <span className="font-semibold">{ceoMessage.name}</span>
                  <span className="text-sm text-fg-muted">{ceoMessage.role}</span>
                </span>
              </figcaption>
            </figure>

            <div className="flex flex-col gap-6 border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
              {media.ceoAwards.length ? (
                <ul className="flex flex-wrap items-center gap-3" aria-label="Selected awards">
                  {media.ceoAwards.map((img) => (
                    <li key={img.src} className="grid h-14 w-[5.5rem] place-items-center rounded-xl bg-white p-1.5">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        className="max-h-full w-auto object-contain"
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="flex items-center gap-2 font-semibold">
                <Award className="size-5 text-brand-ink" />
                {recognition.headline}
              </p>
              <ul className="flex flex-col gap-2 text-fg-muted">
                {recognition.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-28 shrink-0 place-items-center rounded-2xl bg-white p-2">
                  <Image
                    src={media.digitalStatusBadge.src}
                    alt={media.digitalStatusBadge.alt}
                    width={media.digitalStatusBadge.width}
                    height={media.digitalStatusBadge.height}
                    sizes="112px"
                    className="max-h-full w-auto object-contain"
                  />
                </span>
                <p className="text-sm text-fg-muted">{ceoMessage.badge}</p>
              </div>
              <Link
                href="/about#awards"
                className="group/link inline-flex min-h-11 w-max items-center gap-1.5 font-semibold"
              >
                View more achievements
                <ArrowUpRight className="size-4 text-brand-ink transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
