import { Building, GraduationCap, Landmark, Store } from "@/components/ui/icons";

const sectors = [
  { label: "Education", icon: GraduationCap },
  { label: "Enterprise", icon: Building },
  { label: "SME", icon: Store },
  { label: "Public sector", icon: Landmark },
] as const;

/**
 * Clients & Partners hero visual: a calm summary instead of a logo collage
 * (the client and partner logos are listed in full further down the page).
 */
export function ClientsShowcase({ partners, since }: { partners: string; since: number }) {
  return (
    <div className="relative grid gap-4 sm:grid-cols-2" aria-label="Clients and partners at a glance">
      <span
        aria-hidden="true"
        className="absolute -inset-10 -z-10 bg-[radial-gradient(50%_50%_at_60%_40%,color-mix(in_oklab,var(--accent-from)_20%,transparent),transparent_70%)] blur-2xl"
      />

      <article
        className="relative isolate overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,#141a44,#2b2a7a_55%,#6a3fd0)] p-6 text-white shadow-[0_40px_80px_-40px_rgb(40_40_120/0.7)] sm:col-span-2 sm:p-7"
        style={{ animation: "hero-art-in 1.1s var(--ease-out) 150ms both" }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 [background-image:linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] [mask-image:radial-gradient(70%_80%_at_80%_20%,black,transparent)] [background-size:28px_28px]"
        />
        <p className="text-[0.6875rem] font-semibold tracking-[0.22em] text-white/70 uppercase">Who we serve</p>
        <p className="mt-2 font-display text-[clamp(1.25rem,1rem+0.9vw,1.625rem)] leading-[1.15] font-bold tracking-[-0.025em] text-balance">
          One partner for every kind of organisation.
        </p>
        <ul className="mt-5 grid grid-cols-2 gap-2">
          {sectors.map(({ label, icon: Icon }, i) => (
            <li
              key={label}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 text-sm font-medium ring-1 ring-white/15"
              style={{ animation: `fade-up 0.6s var(--ease-out) ${450 + i * 80}ms both` }}
            >
              <Icon aria-hidden="true" className="size-4 shrink-0 text-[#c8b6ff]" />
              {label}
            </li>
          ))}
        </ul>
      </article>

      {[
        { value: partners, label: "Technology partners", delay: 300 },
        { value: `Since ${since}`, label: "Serving Malaysian organisations", delay: 420 },
      ].map((card) => (
        <article
          key={card.label}
          className="rounded-[1.5rem] border border-white/90 bg-white/80 p-5 shadow-[0_1px_2px_rgb(30_40_90/0.05),0_24px_48px_-32px_rgb(40_50_120/0.35)] dark:border-white/[0.08] dark:bg-white/[0.04]"
          style={{ animation: `hero-art-in 1.1s var(--ease-out) ${card.delay}ms both` }}
        >
          <p className="text-gradient font-display text-[2rem] leading-none font-extrabold tracking-[-0.04em]">
            {card.value}
          </p>
          <p className="mt-2 text-sm text-fg-muted">{card.label}</p>
        </article>
      ))}
    </div>
  );
}
