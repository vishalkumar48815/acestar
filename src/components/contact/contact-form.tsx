"use client";

import { useId, useState, type FormEvent } from "react";
import { FormNotice, TextArea, TextField } from "@/components/forms/fields";
import { Button } from "@/components/ui/button";
import { Send } from "@/components/ui/icons";
import { EMAIL_RE, PHONE_RE, deliverForm, formEndpoints } from "@/lib/forms";

type Key = "name" | "phone" | "email" | "company" | "subject" | "message";
type Errors = Partial<Record<Key, string>>;

/** The six fields from the old Contact page, with inline validation and a working fallback. */
export function ContactForm({ to }: { to: string }) {
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ tone: "success" | "error" | "info"; text: string } | null>(null);
  const [pending, setPending] = useState(false);

  const validate = (d: FormData): Errors => {
    const v = (k: Key) => String(d.get(k) ?? "").trim();
    const e: Errors = {};
    if (v("name").length < 2) e.name = "Please enter your name.";
    if (!PHONE_RE.test(v("phone"))) e.phone = "Please enter a valid phone number, e.g. 012-345 6789.";
    if (!EMAIL_RE.test(v("email"))) e.email = "Please enter a valid email address, e.g. name@company.com.";
    if (v("subject").length < 3) e.subject = "Please add a short subject.";
    if (v("message").length < 10) e.message = "Please tell us a little more (at least 10 characters).";
    return e;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const d = new FormData(form);
    const found = validate(d);
    setErrors(found);
    setStatus(null);
    const first = Object.keys(found)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name=${first}]`)?.focus();
      return;
    }
    setPending(true);
    const v = (k: Key) => String(d.get(k) ?? "").trim();
    const result = await deliverForm("contact", d, {
      to,
      subject: v("subject"),
      fields: [
        ["Name", v("name")],
        ["Company", v("company")],
        ["Contact no.", v("phone")],
        ["Email", v("email")],
        ["", ""],
        ["Message", v("message")],
      ],
    });
    setPending(false);
    if (!result.ok) setStatus({ tone: "error", text: `${result.message} You can also email us at ${to}.` });
    else if (result.via === "email")
      setStatus({
        tone: "info",
        text: `Your email app should now be open with your message ready. Press send to reach us. If nothing opened, email ${to}.`,
      });
    else {
      setStatus({
        tone: "success",
        text: "Thank you! Your message has been sent. Our team will get back to you soon.",
      });
      form.reset();
    }
  };

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="grid gap-4"
      aria-describedby={formEndpoints.contact ? undefined : `${uid}-note`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id={`${uid}-name`}
          name="name"
          label="Name"
          required
          autoComplete="name"
          placeholder="Your full name"
          error={errors.name}
        />
        <TextField
          id={`${uid}-company`}
          name="company"
          label="Company name"
          autoComplete="organization"
          placeholder="e.g. Acme Sdn Bhd"
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
        <TextField
          id={`${uid}-email`}
          name="email"
          type="email"
          label="Email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          error={errors.email}
        />
      </div>
      <TextField
        id={`${uid}-subject`}
        name="subject"
        label="Subject"
        required
        placeholder="e.g. Adobe licence renewal for 25 users"
        error={errors.subject}
      />
      <TextArea
        id={`${uid}-message`}
        name="message"
        label="Message"
        required
        rows={5}
        placeholder="Tell us what you need: products, number of users, timeline…"
        error={errors.message}
      />
      {!formEndpoints.contact ? (
        <p id={`${uid}-note`} className="text-[0.8125rem] text-fg-subtle">
          Sending opens your email app with your message ready to go.
        </p>
      ) : null}
      {status ? <FormNotice tone={status.tone}>{status.text}</FormNotice> : null}
      <Button
        type="submit"
        variant="gradient"
        className="w-full sm:w-auto sm:justify-self-start sm:px-9"
        disabled={pending}
      >
        {pending ? "Sending…" : "Send message"}
        <Send className="size-4" />
      </Button>
    </form>
  );
}
