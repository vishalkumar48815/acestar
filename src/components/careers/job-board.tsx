"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { FormNotice, SelectField, TextArea, TextField } from "@/components/forms/fields";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Briefcase, ChevronDown, Clock, Paperclip, Send } from "@/components/ui/icons";
import type { Job } from "@/content/pages/careers";
import { EMAIL_RE, PHONE_RE, deliverForm, formEndpoints } from "@/lib/forms";
import { cn } from "@/lib/utils";

const GENERAL = "General application";
const MAX_CV_BYTES = 5 * 1024 * 1024;
const CV_TYPES = ".pdf,.doc,.docx";

type Errors = Partial<Record<"name" | "email" | "phone" | "role" | "cv", string>>;
type Status = { tone: "success" | "error" | "info"; text: string } | null;

/** Open roles (expandable) beside an application form; "Apply" pre-selects the role. */
export function JobBoard({ jobs, to }: { jobs: Job[]; to: string }) {
  const uid = useId();
  const [open, setOpen] = useState<string | null>(jobs[0]?.slug ?? null);
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>(null);
  const [pending, setPending] = useState(false);
  const [cvName, setCvName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const uploads = Boolean(formEndpoints.careers);

  const applyFor = (title: string) => {
    setRole(title);
    setErrors((e) => ({ ...e, role: undefined }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => formRef.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus(), 450);
  };

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    if (name.length < 2) next.name = "Please enter your full name.";
    if (!EMAIL_RE.test(email)) next.email = "Please enter a valid email address, e.g. name@company.com.";
    if (!PHONE_RE.test(phone)) next.phone = "Please enter a valid phone number, e.g. 012-345 6789.";
    if (!String(data.get("role") ?? "")) next.role = "Please choose a role.";
    const cv = data.get("cv");
    if (uploads) {
      if (!(cv instanceof File) || cv.size === 0) next.cv = "Please attach your CV (PDF or Word).";
      else if (cv.size > MAX_CV_BYTES) next.cv = "Your CV must be 5 MB or smaller.";
    }
    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    setStatus(null);
    const first = Object.keys(found)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name=${first}]`)?.focus();
      return;
    }
    setPending(true);
    const r = String(data.get("role"));
    const result = await deliverForm("careers", data, {
      to,
      subject: `Job application: ${r}`,
      fields: [
        ["Role", r],
        ["Name", String(data.get("name"))],
        ["Email", String(data.get("email"))],
        ["Contact no.", String(data.get("phone"))],
        ["Message", String(data.get("message") ?? "")],
        ["", "(Please attach your CV to this email.)"],
      ],
    });
    setPending(false);
    if (!result.ok) {
      setStatus({ tone: "error", text: `${result.message} You can also email your CV to ${to}.` });
      return;
    }
    if (result.via === "email") {
      setStatus({
        tone: "info",
        text: `Your email app should now be open with your details filled in. Attach your CV and press send. If nothing opened, email ${to}.`,
      });
    } else {
      setStatus({ tone: "success", text: "Thank you! Your application has been sent. Our team will be in touch." });
      form.reset();
      setRole("");
      setCvName("");
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
      {/* ---------------------------------------------------------------- Roles */}
      <div>
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2
            id="roles-title"
            className="font-display text-[clamp(1.5rem,1.15rem+1.2vw,2.125rem)] font-bold tracking-[-0.03em] text-ink"
          >
            Open roles
          </h2>
          <span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand-ink">
            {jobs.length} positions
          </span>
        </div>
        <ul className="flex flex-col gap-3">
          {jobs.map((job) => {
            const expanded = open === job.slug;
            const panelId = `${uid}-${job.slug}`;
            return (
              <li
                key={job.slug}
                className={cn(
                  "overflow-hidden rounded-[1.25rem] border transition-[border-color,box-shadow,background-color] duration-300",
                  expanded
                    ? "border-[color-mix(in_oklab,var(--accent-from)_40%,var(--line))] bg-white/80 shadow-[0_24px_48px_-30px_rgb(40_50_140/0.45)] dark:bg-white/[0.05]"
                    : "border-line bg-white/50 hover:border-[color-mix(in_oklab,var(--accent-from)_30%,var(--line))] dark:bg-white/[0.02]",
                )}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : job.slug)}
                    className="flex w-full items-start gap-4 p-5 text-left"
                  >
                    <span
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-xl transition-colors",
                        expanded ? "bg-[image:var(--btn-gradient)] text-white" : "bg-brand-soft text-brand-ink",
                      )}
                    >
                      <Briefcase className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[1.0625rem] leading-snug font-semibold text-ink">{job.title}</span>
                      <span className="mt-1 block text-sm text-fg-subtle">{job.team}</span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "mt-3 size-5 shrink-0 text-fg-subtle transition-transform duration-300",
                        expanded && "rotate-180",
                      )}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-500 ease-out-expo",
                    expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden" inert={!expanded}>
                    <div className="px-5 pb-5 sm:pl-[4.75rem]">
                      <p className="flex items-start gap-2 text-[0.9375rem] text-fg">
                        <Clock className="mt-0.5 size-4 shrink-0 text-brand-ink" />
                        {job.experience}
                      </p>
                      <ul className="mt-3 flex flex-col gap-2">
                        {job.skills.map((s) => (
                          <li key={s} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-fg-muted">
                            <span
                              aria-hidden="true"
                              className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[image:var(--btn-gradient)]"
                            />
                            {s}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <Button variant="gradient" size="md" className="px-6" onClick={() => applyFor(job.title)}>
                          Apply for this role
                        </Button>
                        <a
                          href={job.legacyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-ink hover:underline"
                        >
                          Full job description <ArrowUpRight className="size-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ---------------------------------------------------------------- Form */}
      <form
        ref={formRef}
        id="apply"
        noValidate
        onSubmit={onSubmit}
        aria-labelledby="apply-title"
        className="scroll-mt-28 self-start rounded-[1.75rem] border border-white/80 bg-white/70 p-6 shadow-[0_40px_80px_-50px_rgb(40_50_140/0.5)] backdrop-blur-xl sm:p-8 lg:sticky lg:top-24 dark:border-white/[0.08] dark:bg-white/[0.03]"
      >
        <p className="text-gradient text-[0.6875rem] font-semibold tracking-[0.34em] uppercase">Apply now</p>
        <h2
          id="apply-title"
          className="mt-3 font-display text-[1.625rem] leading-tight font-bold tracking-[-0.03em] text-ink"
        >
          Send us your application.
        </h2>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">
          We read every application. Prefer email? Send your CV to{" "}
          <a href={`mailto:${to}`} className="font-semibold text-brand-ink hover:underline">
            {to}
          </a>
          .
        </p>

        <div className="mt-6 grid gap-4">
          <SelectField
            id={`${uid}-role`}
            name="role"
            label="Role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            error={errors.role}
          >
            <option value="" disabled>
              Choose a role
            </option>
            {jobs.map((j) => (
              <option key={j.slug} value={j.title}>
                {j.title}
              </option>
            ))}
            <option value={GENERAL}>{GENERAL}</option>
          </SelectField>
          <TextField
            id={`${uid}-name`}
            name="name"
            label="Full name"
            required
            autoComplete="name"
            placeholder="e.g. Aisha Rahman"
            error={errors.name}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id={`${uid}-email`}
              name="email"
              type="email"
              label="Email"
              required
              autoComplete="email"
              inputMode="email"
              placeholder="you@email.com"
              error={errors.email}
            />
            <TextField
              id={`${uid}-phone`}
              name="phone"
              type="tel"
              label="Contact no."
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="012-345 6789"
              error={errors.phone}
            />
          </div>

          {uploads ? (
            <div className="flex flex-col gap-1.5">
              <span className="text-[0.875rem] font-semibold text-ink">
                Resume / CV
                <span aria-hidden="true" className="ml-0.5 text-brand-ink">
                  *
                </span>
              </span>
              <label
                htmlFor={`${uid}-cv`}
                className={cn(
                  "flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border border-dashed px-4 transition-colors focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent-from)_16%,transparent)] hover:bg-brand-soft/50",
                  errors.cv ? "border-danger" : "border-[color-mix(in_oklab,var(--accent-from)_40%,var(--line))]",
                )}
              >
                <Paperclip className="size-5 shrink-0 text-brand-ink" />
                <span className="min-w-0 truncate text-[0.9375rem] text-fg-muted">
                  {cvName || "Attach PDF or Word, up to 5 MB"}
                </span>
                <input
                  id={`${uid}-cv`}
                  name="cv"
                  type="file"
                  accept={CV_TYPES}
                  className="sr-only"
                  aria-invalid={errors.cv ? true : undefined}
                  aria-describedby={errors.cv ? `${uid}-cv-error` : undefined}
                  onChange={(e) => setCvName(e.target.files?.[0]?.name ?? "")}
                />
              </label>
              {errors.cv ? (
                <p id={`${uid}-cv-error`} role="alert" className="text-[0.8125rem] font-medium text-danger">
                  {errors.cv}
                </p>
              ) : null}
            </div>
          ) : null}

          <TextArea
            id={`${uid}-message`}
            name="message"
            label="Anything you'd like us to know?"
            placeholder="A short note about you, your notice period or a portfolio link"
            rows={3}
          />

          {!uploads ? (
            <FormNotice tone="info">
              When you press send, your email app opens with your details filled in. Just attach your CV.
            </FormNotice>
          ) : null}
          {status ? <FormNotice tone={status.tone}>{status.text}</FormNotice> : null}

          <Button type="submit" variant="gradient" className="w-full" disabled={pending}>
            {pending ? "Sending…" : "Send application"}
            <Send className="size-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
