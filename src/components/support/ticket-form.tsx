"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { FormNotice, SelectField, TextArea, TextField } from "@/components/forms/fields";
import { Button } from "@/components/ui/button";
import { Check, Paperclip, Send, X } from "@/components/ui/icons";
import type { zoho as ZohoConfig } from "@/content/pages/support";
import { EMAIL_RE, PHONE_RE } from "@/lib/forms";
import { cn } from "@/lib/utils";

type Key = "Company" | "Contact Name" | "Email" | "Phone" | "Product" | "Subject" | "Customer Sector";
type Errors = Partial<Record<Key | "files", string>>;

const formatSize = (b: number) =>
  b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(b / 1024)} KB`;

/**
 * Tech-support ticket form. Posts straight to the existing Zoho Desk web-to-case endpoint, with the
 * same field names, into a hidden iframe so the visitor stays on the page and sees a confirmation.
 */
export function TicketForm({ zoho }: { zoho: typeof ZohoConfig }) {
  const uid = useId();
  const frameName = `zs-frame-${uid.replace(/[^a-z0-9]/gi, "")}`;
  const formRef = useRef<HTMLFormElement>(null);
  const submitted = useRef(false);
  const [errors, setErrors] = useState<Errors>({});
  const [product, setProduct] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  const isSoftware = product.startsWith("Software - ADOBE");
  const isHardware = product.startsWith("Hardware");

  const syncFiles = (next: File[]) => {
    // Mirror the chosen files into Zoho's attachment_1..5 inputs.
    const form = formRef.current;
    if (!form) return;
    for (let i = 1; i <= zoho.maxFiles; i++) {
      const input = form.elements.namedItem(`attachment_${i}`) as HTMLInputElement | null;
      if (!input) continue;
      const dt = new DataTransfer();
      if (next[i - 1]) dt.items.add(next[i - 1]);
      input.files = dt.files;
    }
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    const tooBig = incoming.find((f) => f.size > zoho.maxFileBytes);
    const merged = [...files, ...incoming.filter((f) => f.size <= zoho.maxFileBytes)].slice(0, zoho.maxFiles);
    setErrors((e) => ({
      ...e,
      files: tooBig
        ? `${tooBig.name} is larger than 20 MB.`
        : files.length + incoming.length > zoho.maxFiles
          ? `You can attach up to ${zoho.maxFiles} files.`
          : undefined,
    }));
    setFiles(merged);
    syncFiles(merged);
  };

  const removeFile = (i: number) => {
    const next = files.filter((_, idx) => idx !== i);
    setFiles(next);
    syncFiles(next);
  };

  const validate = (d: FormData): Errors => {
    const v = (k: string) => String(d.get(k) ?? "").trim();
    const e: Errors = {};
    if (!v("Company")) e.Company = "Please enter your company name.";
    if (v("Contact Name").length < 2) e["Contact Name"] = "Please enter your name.";
    if (!EMAIL_RE.test(v("Email"))) e.Email = "Please enter a valid email address, e.g. name@company.com.";
    if (!PHONE_RE.test(v("Phone"))) e.Phone = "Please enter a valid phone number, e.g. 012-345 6789.";
    if (!v("Product") || v("Product") === zoho.placeholder) e.Product = "Please choose the product you need help with.";
    if (v("Subject").length < 3) e.Subject = "Please add a short subject.";
    if (!v("Customer Sector") || v("Customer Sector") === zoho.placeholder)
      e["Customer Sector"] = "Please choose your sector.";
    return e;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const found = validate(new FormData(form));
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      event.preventDefault();
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // Let the browser post the form into the hidden iframe.
    submitted.current = true;
    setState("sending");
  };

  const onFrameLoad = () => {
    if (!submitted.current) return;
    submitted.current = false;
    setState("done");
    formRef.current?.reset();
    setProduct("");
    setFiles([]);
  };

  if (state === "done") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-6">
        <span className="grid size-14 place-items-center rounded-full bg-[image:var(--btn-gradient)] text-white shadow-[var(--btn-gradient-shadow)]">
          <Check className="size-7" />
        </span>
        <h3 className="font-display text-[1.625rem] font-bold tracking-[-0.03em] text-ink">Ticket submitted.</h3>
        <p className="max-w-md leading-relaxed text-fg-muted">
          Thank you. Our support team has your request and will contact you by email. Keep an eye on your inbox for your
          ticket number.
        </p>
        <Button variant="glass" className="rounded-full" onClick={() => setState("idle")}>
          Submit another ticket
        </Button>
      </div>
    );
  }

  return (
    <>
      <form
        ref={formRef}
        name={`zsWebToCase-${uid}`}
        action={zoho.action}
        method="POST"
        encType="multipart/form-data"
        target={frameName}
        acceptCharset="UTF-8"
        noValidate
        onSubmit={onSubmit}
        className="grid gap-4"
      >
        {Object.entries(zoho.hidden).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            id={`${uid}-co`}
            name="Company"
            label="Company"
            required
            maxLength={120}
            autoComplete="organization"
            placeholder="Your company name"
            error={errors.Company}
          />
          <TextField
            id={`${uid}-name`}
            name="Contact Name"
            label="Name"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Your full name"
            error={errors["Contact Name"]}
          />
          <TextField
            id={`${uid}-email`}
            name="Email"
            type="email"
            label="Email"
            required
            maxLength={120}
            autoComplete="email"
            inputMode="email"
            placeholder="you@company.com"
            error={errors.Email}
          />
          <TextField
            id={`${uid}-phone`}
            name="Phone"
            type="tel"
            label="Phone"
            required
            maxLength={120}
            autoComplete="tel"
            inputMode="tel"
            placeholder="012-345 6789"
            error={errors.Phone}
          />
          <SelectField
            id={`${uid}-product`}
            name="Product"
            label="Product"
            required
            value={product || zoho.placeholder}
            onChange={(e) => setProduct(e.target.value)}
            error={errors.Product}
          >
            <option value={zoho.placeholder} disabled>
              Choose a product
            </option>
            {zoho.products.map((g) => (
              <optgroup key={g.group} label={g.group}>
                {g.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </SelectField>
          <SelectField
            id={`${uid}-sector`}
            name="Customer Sector"
            label="Customer sector"
            required
            defaultValue={zoho.placeholder}
            error={errors["Customer Sector"]}
          >
            <option value={zoho.placeholder} disabled>
              Choose your sector
            </option>
            {zoho.sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </SelectField>
        </div>

        {/* Shown when relevant; both are always sent so Zoho gets every field. */}
        <div className={cn("grid gap-4 sm:grid-cols-2", !isSoftware && !isHardware && "hidden")}>
          <TextField
            id={`${uid}-vip`}
            name="Adobe VIP Number"
            label="Adobe VIP number"
            maxLength={120}
            placeholder="Found in your Adobe Admin Console"
            className={cn(!isSoftware && "hidden")}
          />
          <TextField
            id={`${uid}-serial`}
            name="Serial Number"
            label="Serial number"
            maxLength={120}
            placeholder="On the device or its box"
            className={cn(!isHardware && "hidden")}
          />
        </div>

        <TextField
          id={`${uid}-subject`}
          name="Subject"
          label="Subject"
          required
          maxLength={255}
          placeholder="e.g. Photoshop won't launch after update"
          error={errors.Subject}
        />
        <TextArea
          id={`${uid}-desc`}
          name="Description"
          label="Description"
          maxLength={3000}
          rows={5}
          placeholder="What happened, what you expected, and any error messages you saw"
          hint="Up to 3,000 characters."
        />

        {/* Attachments: one visible picker feeds Zoho's five attachment inputs */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[0.875rem] font-semibold text-ink">
            Attachments <span className="font-normal text-fg-subtle">(optional)</span>
          </span>
          <label
            htmlFor={`${uid}-files`}
            className={cn(
              "flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border border-dashed px-4 transition-colors focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent-from)_16%,transparent)] hover:bg-brand-soft/50",
              errors.files ? "border-danger" : "border-[color-mix(in_oklab,var(--accent-from)_40%,var(--line))]",
              files.length >= zoho.maxFiles && "pointer-events-none opacity-60",
            )}
          >
            <Paperclip className="size-5 shrink-0 text-brand-ink" />
            <span className="text-[0.9375rem] text-fg-muted">Attach files · up to {zoho.maxFiles}, 20 MB each</span>
            <input
              id={`${uid}-files`}
              type="file"
              multiple
              className="sr-only"
              disabled={files.length >= zoho.maxFiles}
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </label>
          {errors.files ? (
            <p role="alert" className="text-[0.8125rem] font-medium text-danger">
              {errors.files}
            </p>
          ) : null}
          {files.length ? (
            <ul className="mt-1 flex flex-col gap-2">
              {files.map((f, i) => (
                <li
                  key={`${f.name}-${i}`}
                  className="flex items-center gap-3 rounded-xl bg-brand-soft/60 px-3 py-2 text-sm"
                >
                  <Paperclip className="size-4 shrink-0 text-brand-ink" />
                  <span className="min-w-0 flex-1 truncate text-fg">{f.name}</span>
                  <span className="shrink-0 text-fg-subtle">{formatSize(f.size)}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    aria-label={`Remove ${f.name}`}
                    className="grid size-8 place-items-center rounded-full text-fg-subtle hover:bg-white hover:text-fg dark:hover:bg-white/10"
                  >
                    <X className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {/* Zoho's own attachment fields (filled from the picker above) */}
          {Array.from({ length: zoho.maxFiles }, (_, i) => (
            <input
              key={i}
              type="file"
              name={`attachment_${i + 1}`}
              className="hidden"
              tabIndex={-1}
              aria-hidden="true"
            />
          ))}
        </div>

        {Object.keys(errors).some((k) => k !== "files" && errors[k as Key]) ? (
          <FormNotice tone="error">Please check the highlighted fields.</FormNotice>
        ) : null}

        <Button
          type="submit"
          variant="gradient"
          className="w-full sm:w-auto sm:justify-self-start sm:px-9"
          disabled={state === "sending"}
        >
          {state === "sending" ? "Submitting…" : "Submit ticket"}
          <Send className="size-4" />
        </Button>
      </form>
      <iframe name={frameName} title="Ticket submission" className="hidden" onLoad={onFrameLoad} />
    </>
  );
}
