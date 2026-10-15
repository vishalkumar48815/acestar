import { CountUp } from "@/components/motion/count-up";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { stats } from "@/content/home";
import { media } from "@/content/media";

/** Clients & key partners (logos from the old Clients & Partners page) + headline numbers. */
export function Proof() {
  return (
    <section aria-labelledby="proof-title" className="relative py-16 md:py-24">
      <div className="container-page">
        <h2 id="proof-title" className="text-center text-eyebrow text-fg-subtle" data-reveal>
          Some of our clients &amp; key partners
        </h2>
      </div>

      <div className="mt-8 flex flex-col gap-4 md:gap-6">
        <LogoMarquee logos={media.clientLogos} label="Some of our clients" />
        <LogoMarquee logos={media.partnerLogos} label="Our key partners" reverse speed={50} />
      </div>

      <div className="container-page mt-16 md:mt-20">
        <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              className="flex flex-col-reverse gap-2 border-line px-4 text-center first:border-l-0 sm:px-6 lg:border-l"
            >
              <dt className="text-sm text-fg-muted">{stat.label}</dt>
              <dd className="font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] leading-none font-extrabold tracking-[-0.035em]">
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
