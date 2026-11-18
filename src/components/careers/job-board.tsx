"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { FormNotice, Honeypot, SelectField, TextArea, TextField } from "@/components/forms/fields";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, X } from "@/components/ui/icons";
import type { Job } from "@/content/pages/careers";
import { EMAIL_RE, MAX_CV_BYTES, PHONE_RE, deliverForm } from "@/lib/forms";
import { cn } from "@/lib/utils";

const GENERAL = "General application";
const INTERNSHIP = "Internship / fresh graduate";
/** Last option in the role list: reveals a text box so applicants can type a role we haven't listed. */
const OTHER = "__other";
const CV_TYPES = ".pdf,.doc,.docx";
const JOIN_OPTIONS = ["Immediately", "Within 2 weeks", "Within 1 month", "Within 2 months", "3 months or more"];

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

type Errors = Partial<Record<"name" | "email" | "phone" | "role" | "join" | "cv", string>>;
type Status = { tone: "success" | "error" | "info"; text: string } | null;

/** The careers application form. Role cards on the page link here and pre-select their role. */
export function JobBoard({ jobs, to }: { jobs: Job[]; to: string }) {
  const uid = useId();
  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>(null);
  const [pending, setPending] = useState(false);
  const [cv, setCv] = useState<File | null>(null);
  const cvRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /** Keeps the chosen CV in state and in the (visually hidden) file input that the form submits. */
  const pickCv = (file: File | null) => {
    if (file && file.size > MAX_CV_BYTES) {
      setErrors((e) => ({ ...e, cv: "Your CV must be 3 MB or smaller." }));
      if (cvRef.current) cvRef.current.value = "";
      setCv(null);
      return;
    }
    setErrors((e) => ({ ...e, cv: undefined }));
    setCv(file);
    if (!file && cvRef.current) cvRef.current.value = "";
  };

  const applyFor = (title: string) => {
    setRole(title);
    setErrors((e) => ({ ...e, role: undefined }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => formRef.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus(), 450);
  };

  // Links elsewhere on the page: #role-<slug> and #apply-internship pre-select the role in the form.
  useEffect(() => {
    const onHash = () => {
      const h = decodeURIComponent(window.location.hash.slice(1));
      if (h.startsWith("role-")) {
        const job = jobs.find((j) => j.slug === h.slice(5));
        if (job) applyFor(job.title);
      } else if (h === "apply-internship") {
        applyFor(INTERNSHIP);
      }
    };
    const t = window.setTimeout(onHash, 0);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", onHash);
    };
  }, [jobs]);

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    if (name.length < 2) next.name = "Please enter your full name.";
    if (!EMAIL_RE.test(email)) next.email = "Please enter a valid email address, e.g. name@company.com.";
    if (!PHONE_RE.test(phone)) next.phone = "Please enter a valid phone number, e.g. 012-345 6789.";
    if (!String(data.get("role") ?? "").trim())
      next.role = role === OTHER ? "Please type the role you're interested in." : "Please choose a role.";
    if (!String(data.get("join") ?? "")) next.join = "Please tell us when you can join.";
    if (!cv) next.cv = "Please attach your CV (PDF or Word).";
    else if (cv.size > MAX_CV_BYTES) next.cv = "Your CV must be 3 MB or smaller.";
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
      (first === "cv" ? cvRef.current : form.querySelector<HTMLElement>(`[name=${first}]`))?.focus();
      return;
    }
    setPending(true);
    const r = String(data.get("role")).trim();
    const result = await deliverForm("careers", data, {
      to,
      subject: `Job application: ${r}`,
      fields: [
        ["Role", r],
        ["Name", String(data.get("name"))],
        ["Email", String(data.get("email"))],
        ["Contact no.", String(data.get("phone"))],
        ["Can join", String(data.get("join"))],
        ["Additional note", String(data.get("message") ?? "")],
        ["", `(Please attach your CV${cv ? `, ${cv.name},` : ""} to this email.)`],
      ],
    });
    setPending(false);
    if (!result.ok) {
      setStatus({ tone: "error", text: `${result.message}` });
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
      setCustomRole("");
      pickCv(null);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* ---------------------------------------------------------------- Form */}
      <form
        ref={formRef}
        id="apply"
        noValidate
        onSubmit={onSubmit}
        aria-labelledby="apply-title"
        className="relative scroll-mt-28 rounded-[1.75rem] border border-white/80 bg-white/70 p-6 shadow-[0_40px_80px_-50px_rgb(40_50_140/0.5)] backdrop-blur-xl sm:p-10 dark:border-white/[0.08] dark:bg-white/[0.03]"
      >
        <Honeypot />
        <p className="text-center text-[0.6875rem] font-bold tracking-[0.34em] text-eyebrow-ink uppercase sm:text-xs">
          Apply now
        </p>
        <h2
          id="apply-title"
          className="mt-3 text-center font-display text-[clamp(1.625rem,1.2rem+1.4vw,2.25rem)] leading-tight font-bold tracking-[-0.03em] text-ink"
        >
          Send us your application.
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-[0.9375rem] leading-relaxed text-fg-muted">
          We read every application. Prefer email? Send us your CV.
        </p>

        <div className="mt-6 grid gap-4">
          <SelectField
            id={`${uid}-role`}
            // With "Other" chosen, the text box below is what submits as "role".
            name={role === OTHER ? undefined : "role"}
            label="Role"
            required
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setErrors((er) => ({ ...er, role: undefined }));
            }}
            error={role === OTHER ? undefined : errors.role}
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
            <option value={INTERNSHIP}>{INTERNSHIP}</option>
            <option value={OTHER}>Other (type your own role)</option>
          </SelectField>
          {role === OTHER ? (
            <TextField
              id={`${uid}-role-other`}
              name="role"
              label="Your role"
              required
              autoFocus
              maxLength={160}
              value={customRole}
              onChange={(e) => {
                setCustomRole(e.target.value);
                setErrors((er) => ({ ...er, role: undefined }));
              }}
              placeholder="e.g. UI/UX Designer"
              error={errors.role}
            />
          ) : null}
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

          <SelectField
            id={`${uid}-join`}
            name="join"
            label="When can you join if selected?"
            required
            defaultValue=""
            error={errors.join}
          >
            <option value="" disabled>
              Choose your availability
            </option>
            {JOIN_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </SelectField>

          {/* Upload CV: same picker style as the Tech Support attachments */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[0.875rem] font-semibold text-ink">
              Upload CV
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
              <span className="text-[0.9375rem] text-fg-muted">
                {cv ? "Replace file" : "Attach your CV"} · PDF or Word, up to 3 MB
              </span>
              <input
                ref={cvRef}
                id={`${uid}-cv`}
                name="cv"
                type="file"
                accept={CV_TYPES}
                required
                className="sr-only"
                aria-invalid={errors.cv ? true : undefined}
                aria-describedby={errors.cv ? `${uid}-cv-error` : undefined}
                onChange={(e) => pickCv(e.target.files?.[0] ?? null)}
              />
            </label>
            {errors.cv ? (
              <p id={`${uid}-cv-error`} role="alert" className="text-[0.8125rem] font-medium text-danger">
                {errors.cv}
              </p>
            ) : null}
            {cv ? (
              <div className="mt-1 flex items-center gap-3 rounded-xl bg-brand-soft/60 px-3 py-2 text-sm">
                <Paperclip className="size-4 shrink-0 text-brand-ink" />
                <span className="min-w-0 flex-1 truncate text-fg">{cv.name}</span>
                <span className="shrink-0 text-fg-subtle">{formatSize(cv.size)}</span>
                <button
                  type="button"
                  onClick={() => pickCv(null)}
                  aria-label={`Remove ${cv.name}`}
                  className="grid size-8 place-items-center rounded-full text-fg-subtle hover:bg-white hover:text-fg dark:hover:bg-white/10"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : null}
          </div>

          <TextArea
            id={`${uid}-message`}
            name="message"
            label="Additional note"
            placeholder="A short note about you or a link to your portfolio"
            rows={3}
          />

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
