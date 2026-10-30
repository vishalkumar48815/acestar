/**
 * Form delivery for a statically hosted site.
 *
 * Set an endpoint (e.g. Formspree, Basin, a Zoho/HubSpot webhook or your own API) in `.env.local`:
 *   NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=https://...
 *   NEXT_PUBLIC_CAREERS_FORM_ENDPOINT=https://...
 * The form is POSTed there as multipart/form-data (so CV uploads work).
 * Without an endpoint, the visitor's email app opens with everything pre-filled instead,
 * so the form never silently fails.
 */
export const formEndpoints = {
  contact: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ?? "",
  careers: process.env.NEXT_PUBLIC_CAREERS_FORM_ENDPOINT ?? "",
};

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
  const endpoint = formEndpoints[kind];
  if (!endpoint) {
    window.location.href = mailtoLink(fallback.to, fallback.subject, fallback.fields);
    return { ok: true, via: "email" };
  }
  try {
    const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
    if (!res.ok) return { ok: false, message: `The server responded with ${res.status}.` };
    return { ok: true, via: "endpoint" };
  } catch {
    return { ok: false, message: "We couldn't reach the server. Check your connection and try again." };
  }
}
