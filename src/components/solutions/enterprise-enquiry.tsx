"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { FormNotice, SelectField, TextArea, TextField } from "@/components/forms/fields";
import { Button } from "@/components/ui/button";
import { Send } from "@/components/ui/icons";
import { site } from "@/content/site";
import { enquirySolutions, enquiryTimelines } from "@/content/solutions/enquiry";
import { EMAIL_RE, PHONE_RE, deliverForm } from "@/lib/forms";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"company" | "contact" | "email" | "phone", string>>;
type Status = { tone: "success" | "error" | "info"; text: string } | null;

/**
 * "Talk to Our Enterprise Solutions Team": the questions change with the selected solution.
 * Links of the form #enquiry-<solution-key> pre-select a solution and scroll here.
 */
export function EnterpriseEnquiry({ id = "enquiry" }: { id?: string }) {
  const uid = useId();
  const [key, setKey] = useState(enquirySolutions[0].key);
  const [timeline, setTimeline] = useState(enquiryTimelines[1]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>(null);
  const [pending, setPending] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const solution = enquirySolutions.find((s) => s.key === key) ?? enquirySolutions[0];

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.slice(1);
      if (!h.startsWith(`${id}-`)) return;
      const match = enquirySolutions.find((s) => s.key === h.slice(id.length + 1));
      if (match) setKey(match.key);
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const t = window.setTimeout(onHash, 0);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", onHash);
    };
  }, [id]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (n: string) => String(data.get(n) ?? "").trim();
    const next: Errors = {};
    if (get("company").length < 2) next.company = "Please enter your company name.";
    if (get("contact").length < 2) next.contact = "Please enter the contact person's name.";
    if (!EMAIL_RE.test(get("email"))) next.email = "Please enter a valid business email.";
    if (!PHONE_RE.test(get("phone"))) next.phone = "Please enter a valid phone number.";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name=${first}]`)?.focus();
      return;
    }
    setPending(true);
    setStatus(null);
    const result = await deliverForm("contact", data, {
      to: site.contact.email.sales,
      subject: `Enterprise enquiry: ${solution.label} (${get("company")})`,
      fields: [
        ["Enterprise solution", solution.label],
        ["Company", get("company")],
        ["Contact person", get("contact")],
        ["Business email", get("email")],
        ["Phone", get("phone")],
        ...solution.fields.map((f) => [f.label, get(f.name)] as [string, string]),
        ["Expected timeline", timeline],
        ["Additional requirements", get("message")],
      ],
    });
    setPending(false);
    if (!result.ok) setStatus({ tone: "error", text: result.message });
    else if (result.via === "email")
      setStatus({ tone: "info", text: "Your email app should open with your enquiry filled in. Just press send." });
    else {
      setStatus({ tone: "success", text: "Thank you. Our enterprise solutions team will be in touch shortly." });
      form.reset();
    }
  }

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${uid}-title`}
      className="scroll-mt-24 rounded-[1.75rem] border border-white/90 bg-white/80 p-6 shadow-[0_1px_2px_rgb(30_40_90/0.05),0_40px_80px_-50px_rgb(40_50_120/0.45)] sm:p-8 lg:p-10 dark:border-white/[0.08] dark:bg-white/[0.03]"
    >
      <p className="text-[0.6875rem] font-bold tracking-[0.34em] text-eyebrow-ink uppercase sm:text-xs">
        Enterprise enquiry
      </p>
      <h2
        id={`${uid}-title`}
        className="mt-3 font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] leading-tight font-bold tracking-[-0.03em] text-ink"
      >
        Talk to Our Enterprise Solutions Team
      </h2>
      <p className="mt-2 text-fg-muted">Choose a solution and we&apos;ll ask only what matters for it.</p>

      <form noValidate onSubmit={onSubmit} className="mt-8 grid gap-5">
        <SelectField
          id={`${uid}-solution`}
          name="solution"
          label="Enterprise solution"
          required
          value={key}
          onChange={(e) => setKey(e.target.value)}
        >
          {enquirySolutions.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </SelectField>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id={`${uid}-company`}
            name="company"
            label="Company"
            required
            placeholder="Company name"
            autoComplete="organization"
            error={errors.company}
          />
          <TextField
            id={`${uid}-contact`}
            name="contact"
            label="Contact person"
            required
            placeholder="Full name"
            autoComplete="name"
            error={errors.contact}
          />
          <TextField
            id={`${uid}-email`}
            name="email"
            type="email"
            label="Business email"
            required
            placeholder="name@company.com"
            autoComplete="email"
            error={errors.email}
          />
          <TextField
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            label="Phone number"
            required
            placeholder="+60"
            autoComplete="tel"
            error={errors.phone}
          />
        </div>

        <fieldset
          key={solution.key}
          className="grid [animation:fade-up_0.45s_var(--ease-out)_both] gap-5 border-t border-line pt-6 sm:grid-cols-2"
        >
          <legend className="float-left mb-1 w-full text-[0.9375rem] font-semibold text-ink sm:col-span-2">
            Solution requirements · <span className="text-brand-ink">{solution.label}</span>
          </legend>
          {solution.fields.map((f) => (
            <TextField
              key={f.name}
              id={`${uid}-${f.name}`}
              name={f.name}
              label={f.label}
              type={f.type ?? "text"}
              min={f.type === "number" ? 1 : undefined}
              inputMode={f.type === "number" ? "numeric" : undefined}
              placeholder={f.placeholder ?? "Tell us briefly"}
            />
          ))}
        </fieldset>

        <fieldset>
          <legend className="text-[0.875rem] font-semibold text-ink">Expected timeline</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {enquiryTimelines.map((t) => (
              <label
                key={t}
                className={cn(
                  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-[0.9375rem] transition-colors has-[:focus-visible]:shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent-from)_30%,transparent)]",
                  timeline === t
                    ? "border-transparent bg-[image:var(--btn-gradient)] font-semibold text-white"
                    : "border-line bg-white/70 text-fg hover:border-[var(--accent-from)] dark:bg-white/[0.04]",
                )}
              >
                <input
                  type="radio"
                  name="timeline"
                  value={t}
                  checked={timeline === t}
                  onChange={() => setTimeline(t)}
                  className="sr-only"
                />
                {t}
              </label>
            ))}
          </div>
        </fieldset>

        <TextArea
          id={`${uid}-message`}
          name="message"
          label="Additional requirements"
          placeholder="Tell us more about your project…"
        />

        {status ? <FormNotice tone={status.tone}>{status.text}</FormNotice> : null}

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-fg-subtle">We use your details only to respond to this enquiry.</p>
          <Button type="submit" variant="gradient" size="lg" disabled={pending} className="px-8">
            {pending ? "Sending…" : "Send enquiry"}
            <Send aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </form>
    </section>
  );
}
