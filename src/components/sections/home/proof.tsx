import { CountUp } from "@/components/motion/count-up";
import { clients, stats } from "@/content/home";

export function Proof() {
  return (
    <section aria-labelledby="proof-title" className="relative py-16 md:py-24">
      <div className="container-page">
        <h2 id="proof-title" className="text-center text-eyebrow text-fg-subtle" data-reveal>
          Trusted by teams at
        </h2>
      </div>

      {/* Client names as a slow marquee; pauses on hover. Second copy is decorative. */}
      <div
        className="marquee relative mt-8 overflow-hidden"
        style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}
      >
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0 items-center">
              {clients.map((name) => (
                <li
                  key={name}
                  className="px-6 font-display text-[1.375rem] font-bold tracking-[-0.02em] whitespace-nowrap text-fg-subtle md:px-10 md:text-[1.625rem]"
                >
                  {name}
                </li>
              ))}
            </ul>
          ))}
        </div>
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
