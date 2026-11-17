import Link from "next/link";
import type { CSSProperties } from "react";
import { Section, SectionHead } from "@/components/solutions/primitives";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Check,
  GraduationCap,
  Heart,
  ListFilter,
  MonitorCheck,
  Star,
  UserRound,
} from "@/components/ui/icons";
import type {
  audiences as Audiences,
  badges as Badges,
  pathway as Pathway,
  value as Value,
} from "@/content/solutions/training";
import { cn } from "@/lib/utils";

/*
 * Training & Certification sections, modelled on certiport.pearsonvue.com (audiences, badges,
 * pathway) and acestarsolution.com (value of certification), using the client brief's content.
 */

const card =
  "rounded-[1.375rem] border border-white bg-white shadow-[0_1px_2px_rgb(30_40_90/0.05),0_30px_60px_-40px_rgb(40_50_120/0.45)] dark:border-white/[0.08] dark:bg-white/[0.04]";
const hex = "[clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]";
const delay = (i: number) => ({ "--reveal-delay": `${i * 70}ms` }) as CSSProperties;

/* ---------- C · Who it's for ---------- */
const audienceStyle = {
  corporate: {
    icon: Briefcase,
    ink: "text-[#3b63f3] dark:text-[#8fa7ff]",
    bg: "bg-[linear-gradient(160deg,#e7efff,#f1f5ff)] dark:bg-[linear-gradient(160deg,rgb(59_99_243/0.14),rgb(59_99_243/0.04))]",
  },
  education: {
    icon: GraduationCap,
    ink: "text-[#7b3df0] dark:text-[#c3a6ff]",
    bg: "bg-[linear-gradient(160deg,#f3e9ff,#faf5ff)] dark:bg-[linear-gradient(160deg,rgb(123_61_240/0.16),rgb(123_61_240/0.04))]",
  },
  individual: {
    icon: UserRound,
    ink: "text-[#d6458c] dark:text-[#ff9cc9]",
    bg: "bg-[linear-gradient(160deg,#ffeef3,#fff6ef)] dark:bg-[linear-gradient(160deg,rgb(226_88_157/0.14),rgb(226_88_157/0.04))]",
  },
} as const;

export function AudienceCards({ content, id = "audiences" }: { content: typeof Audiences; id?: string }) {
  return (
    <Section id={id} labelledBy={`${id}-title`}>
      <SectionHead eyebrow={content.eyebrow} title={content.title} id={`${id}-title`} className="mb-10" />
      <ul className="grid gap-5 md:grid-cols-3">
        {content.items.map((a, i) => {
          const s = audienceStyle[a.key];
          const Icon = s.icon;
          return (
            <li
              key={a.key}
              data-reveal
              suppressHydrationWarning
              style={delay(i)}
              className={cn("flex flex-col rounded-[1.625rem] p-7 lg:p-8", s.bg)}
            >
              <span className="grid size-14 place-items-center rounded-2xl bg-white shadow-[0_12px_26px_-16px_rgb(60_50_160/0.6)] dark:bg-white/10">
                <Icon aria-hidden="true" className={cn("size-7", s.ink)} />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.02em] text-ink">{a.title}</h3>
              <p className="mt-2 leading-relaxed text-fg-muted">{a.body}</p>
              <ul className="mt-5 mb-7 flex flex-col gap-3">
                {a.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 font-semibold text-ink">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white dark:bg-white/10">
                      <Check aria-hidden="true" className={cn("size-3.5", s.ink)} strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href={a.cta.href}
                className={cn(
                  "group/a mt-auto inline-flex min-h-12 items-center gap-2 self-start rounded-full bg-white px-6 font-semibold shadow-[0_10px_24px_-16px_rgb(60_50_160/0.5)] transition-transform hover:-translate-y-0.5 dark:bg-white/10",
                  s.ink,
                )}
              >
                {a.cta.label}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/a:translate-x-1" />
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

/* ---------- A · Certification badge wall ---------- */
export function CertBadges({ content, id = "certifications" }: { content: typeof Badges; id?: string }) {
  return (
    <Section id={id} labelledBy={`${id}-title`}>
      <SectionHead
        eyebrow={content.eyebrow}
        title={content.title}
        body={content.body}
        id={`${id}-title`}
        className="mb-10"
      />
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {content.items.map((b, i) => (
          <li
            key={b.code}
            data-reveal
            suppressHydrationWarning
            style={delay(i)}
            className={cn(card, "group/b flex flex-col items-center px-4 py-7 text-center sm:px-5")}
          >
            <span
              aria-hidden="true"
              className={cn(
                "relative grid h-[6.5rem] w-[5.875rem] place-items-center text-[1.375rem] font-black tracking-[-0.02em] text-white transition-transform duration-500 group-hover/b:-translate-y-1 group-hover/b:rotate-3",
                hex,
              )}
              style={{ backgroundImage: `linear-gradient(150deg, ${b.from}, ${b.to})` }}
            >
              <span className={cn("absolute inset-[6px] bg-white/[0.14]", hex)} />
              <span className="relative">{b.code}</span>
            </span>
            <h3 className="mt-5 text-[1.0625rem] leading-snug font-bold text-ink">{b.name}</h3>
            <p className="mt-1.5 text-[0.875rem] leading-snug text-fg-muted">{b.detail}</p>
            <span className="mt-3 rounded-full bg-brand-soft px-3 py-1 text-[0.6875rem] font-bold tracking-[0.12em] text-eyebrow-ink uppercase">
              {b.tag}
            </span>
          </li>
        ))}
        <li
          data-reveal
          suppressHydrationWarning
          style={delay(content.items.length)}
          className="col-span-2 flex flex-col items-center justify-center rounded-[1.375rem] bg-[linear-gradient(150deg,#eef2ff,#f4ecff)] p-7 text-center md:col-span-1 dark:bg-[linear-gradient(150deg,rgb(59_99_243/0.14),rgb(162_77_240/0.12))]"
        >
          <p className="font-display text-xl font-bold tracking-[-0.02em] text-ink">{content.helper.title}</p>
          <p className="mt-2 text-[0.9375rem] text-fg-muted">{content.helper.body}</p>
          <Link
            href={content.helper.cta.href}
            className="group/h mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[image:var(--btn-gradient)] px-6 font-semibold text-white shadow-[var(--btn-gradient-shadow)] transition-transform hover:-translate-y-0.5"
          >
            {content.helper.cta.label}
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/h:translate-x-1" />
          </Link>
        </li>
      </ul>
    </Section>
  );
}

/* ---------- B · Certification pathway ---------- */
const stepIcons = [ListFilter, GraduationCap, MonitorCheck, Award];

export function CertPathway({ content, id = "pathway" }: { content: typeof Pathway; id?: string }) {
  return (
    <Section id={id} labelledBy={`${id}-title`}>
      <SectionHead
        eyebrow={content.eyebrow}
        title={content.title}
        body={content.body}
        align="center"
        id={`${id}-title`}
        className="mb-12"
      />
      <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <span
          aria-hidden="true"
          className="absolute top-[2.875rem] right-[12%] left-[12%] hidden border-t-[3px] border-dashed border-[#c9c2ff] lg:block dark:border-white/15"
        />
        {content.steps.map((s, i) => {
          const Icon = stepIcons[i];
          return (
            <li
              key={s.title}
              data-reveal
              suppressHydrationWarning
              style={delay(i)}
              className="relative flex flex-col items-center px-2 text-center"
            >
              <span className="relative grid size-[5.75rem] place-items-center rounded-full bg-white shadow-[0_20px_40px_-22px_rgb(60_50_160/0.6)] dark:bg-[#141a33]">
                <Icon aria-hidden="true" className="size-9 text-eyebrow-ink" />
                <span className="absolute -top-1.5 -right-1.5 grid size-8 place-items-center rounded-full bg-[image:var(--btn-gradient)] text-sm font-extrabold text-white">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-6 text-xl font-bold tracking-[-0.015em] text-ink">{s.title}</h3>
              <p className="mt-2 max-w-[16rem] text-[0.9375rem] leading-relaxed text-fg-muted">{s.body}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

/* ---------- D · Value of certification ---------- */
const valueIcons = [
  { icon: Check, bg: "bg-[linear-gradient(135deg,#3b63f3,#6a5cf4)]" },
  { icon: ArrowUpRight, bg: "bg-[linear-gradient(135deg,#a24df0,#e2589d)]" },
  { icon: Star, bg: "bg-[linear-gradient(135deg,#22b8e6,#3b63f3)]" },
  { icon: Heart, bg: "bg-[linear-gradient(135deg,#ffb35c,#f0607d)]" },
];

export function CertValue({ content, id = "value" }: { content: typeof Value; id?: string }) {
  return (
    <Section id={id} labelledBy={`${id}-title`}>
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
        {/* Illustrated certificate with a verified badge */}
        <div
          aria-hidden="true"
          data-reveal
          suppressHydrationWarning
          className="relative mx-auto h-[19rem] w-full max-w-[30rem] sm:h-[22rem]"
        >
          <div
            className={cn(
              card,
              "absolute top-6 left-1 w-[88%] -rotate-[5deg] bg-[linear-gradient(160deg,#fff,#f7f5ff)] p-6 sm:p-8 dark:bg-[linear-gradient(160deg,#1b2140,#151a33)]",
            )}
          >
            <p className="text-[0.6875rem] font-extrabold tracking-[0.3em] text-[#7b3df0] uppercase dark:text-[#c3a6ff]">
              Certificate of achievement
            </p>
            <p className="mt-6 text-sm text-fg-muted">This certifies that</p>
            <p className="mt-1 font-display text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-[1.75rem]">
              Your Name
            </p>
            <p className="mt-2 text-sm text-fg-muted">has earned the credential</p>
            <p className="mt-1 text-gradient text-lg font-bold sm:text-xl">Adobe Certified Professional</p>
            <div className="mt-8 flex justify-between">
              <span className="w-24 border-t-2 border-[#d7d3ee] dark:border-white/15" />
              <span className="w-24 border-t-2 border-[#d7d3ee] dark:border-white/15" />
            </div>
          </div>
          <span
            className={cn(
              "absolute right-2 bottom-0 grid h-32 w-28 place-items-center bg-[image:var(--btn-gradient)] text-center text-sm leading-tight font-black tracking-wide text-white drop-shadow-[0_20px_30px_rgb(60_50_160/0.5)] sm:h-36 sm:w-32",
              hex,
            )}
          >
            VERIFIED
            <br />
            BADGE
          </span>
        </div>
        <div>
          <SectionHead eyebrow={content.eyebrow} title={content.title} body={content.body} id={`${id}-title`} />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {content.items.map((v, i) => {
              const { icon: Icon, bg } = valueIcons[i];
              return (
                <li
                  key={v.title}
                  data-reveal
                  suppressHydrationWarning
                  style={delay(i)}
                  className={cn(card, "flex items-start gap-4 p-5")}
                >
                  <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl text-white", bg)}>
                    <Icon aria-hidden="true" className="size-5" strokeWidth={2.4} />
                  </span>
                  <span>
                    <span className="block font-bold text-ink">{v.title}</span>
                    <span className="mt-1 block text-sm leading-snug text-fg-muted">{v.body}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
