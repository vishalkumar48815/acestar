import { ChevronDown, Lock, ShieldCheck, SlidersH } from "@/components/ui/icons";

/* Minimal, low-chrome sections for the AI Solutions page. */

/** Four reasons in one row, divided by hairlines (no cards). */
export function AiReasons({ items }: { items: { title: string; body: string }[] }) {
  return (
    <dl className="grid gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
      {items.map((r, i) => (
        <div
          key={r.title}
          data-reveal
          suppressHydrationWarning
          style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
          className="flex flex-col lg:px-8 lg:first:pl-0 lg:last:pr-0"
        >
          <dt className="text-gradient font-display text-[1.625rem] leading-tight font-bold tracking-[-0.03em]">
            {r.title}
          </dt>
          <dd className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{r.body}</dd>
        </div>
      ))}
    </dl>
  );
}

const safetyIcons = { data: Lock, controls: SlidersH, safe: ShieldCheck } as const;

/** Dark band: responsible AI in three short lines. */
export function AiSafety({ items }: { items: { key: string; title: string; body: string }[] }) {
  return (
    <div
      data-reveal
      suppressHydrationWarning
      className="relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0f1438,#22216a_55%,#5a36c0)] px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14"
    >
      {/* neural grid + glow */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 [background-image:radial-gradient(rgb(255_255_255/0.18)_1px,transparent_1px)] [mask-image:radial-gradient(70%_90%_at_85%_10%,black,transparent)] [background-size:22px_22px]"
      />
      <span
        aria-hidden="true"
        className="absolute -top-24 -right-16 -z-10 size-80 rounded-full bg-[radial-gradient(closest-side,rgb(160_120_255/0.45),transparent)] blur-2xl"
      />
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:items-center lg:gap-14">
        <div>
          <p className="text-[0.6875rem] font-semibold tracking-[0.34em] text-white/60 uppercase">Responsible AI</p>
          <h2
            id="safety-title"
            className="mt-3 font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] leading-tight font-bold tracking-[-0.03em]"
          >
            Secure by default.
          </h2>
        </div>
        <ul className="grid gap-6 sm:grid-cols-3">
          {items.map((s) => {
            const Icon = safetyIcons[s.key as keyof typeof safetyIcons] ?? ShieldCheck;
            return (
              <li key={s.key}>
                <span className="grid size-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                  <Icon aria-hidden="true" className="size-5 text-[#c8b6ff]" />
                </span>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-white/70">{s.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/** Accordion FAQ using native <details> (no JavaScript), with matching FAQPage JSON-LD. */
export function AiFaq({ items }: { items: { q: string; a: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <div className="divide-y divide-line border-y border-line">
        {items.map((f) => (
          <details key={f.q} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-[1.0625rem] font-semibold text-ink transition-colors hover:text-brand-ink">
              {f.q}
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-open:rotate-180 group-open:border-transparent group-open:bg-[image:var(--btn-gradient)] group-open:text-white">
                <ChevronDown aria-hidden="true" className="size-4" />
              </span>
            </summary>
            <p className="max-w-3xl pb-6 leading-relaxed text-fg-muted">{f.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
