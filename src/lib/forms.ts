/**
 * Form delivery.
 *
 * Contact, Careers and the enterprise enquiry are POSTed (multipart/form-data, so CV uploads
 * work) to the site's own API, src/app/api/forms/[kind]/route.ts, which emails them to the
 * team through the Twilio Email API. Until it is configured, the API answers "not configured"
 * and the visitor's email app opens with everything pre-filled instead, so a form never
 * silently fails. Tech Support is separate (Zoho Desk, later).
 */
export const formEndpoints = {
  contact: "/api/forms/contact/",
  careers: "/api/forms/careers/",
  enquiry: "/api/forms/enquiry/",
};

/** CV upload limit: under Vercel's 4.5 MB request limit and Twilio's 5 MB attachment limit. */
export const MAX_CV_BYTES = 4 * 1024 * 1024;

export type FormKind = keyof typeof formEndpoints;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Malaysian and international numbers: digits, spaces, dashes, brackets and a leading +. */
export const PHONE_RE = /^\+?[\d\s\-()]{7,20}$/;

export type SubmitResult = { ok: true; via: "endpoint" | "email" } | { ok: false; message: string };

/** Build a mailto: link with a subject and a plain-text body of label: value lines. */
export function mailtoLink(to: string, subject: string, fields: [label: string, value: string][]) {
  const body = fields
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** POST to the configured endpoint, or fall back to opening the visitor's email app. */
export async function deliverForm(
  kind: FormKind,
  data: FormData,
  fallback: { to: string; subject: string; fields: [string, string][] },
): Promise<SubmitResult> {
  const openEmailApp = (): SubmitResult => {
    window.location.href = mailtoLink(fallback.to, fallback.subject, fallback.fields);
    return { ok: true, via: "email" };
  };
  try {
    const res = await fetch(formEndpoints[kind], {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    const body = (await res.json().catch(() => ({}))) as { fallback?: boolean; message?: string };
    if (res.status === 503 && body.fallback) return openEmailApp();
    if (!res.ok)
      return { ok: false, message: body.message ?? `Something went wrong (${res.status}). Please try again.` };
    return { ok: true, via: "endpoint" };
  } catch {
    return { ok: false, message: "We couldn't reach the server. Check your connection and try again." };
  }
}
