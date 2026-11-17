import "server-only";
import { logoPng } from "./logo";

/**
 * Sends the website's notification emails through the Twilio Email API.
 * Used by the Contact, Careers and Enterprise enquiry forms (Tech Support goes to Zoho Desk).
 *
 *   POST https://comms.twilio.com/v1/Emails  ·  HTTP Basic auth  ·  202 Accepted on success
 *
 * Environment:
 *   TWILIO_API_KEY_SID / TWILIO_API_KEY_SECRET   API key ("SK…") + secret
 *     (or TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN)
 *   FORMS_EMAIL_FROM   Address on a sender domain verified in Twilio, e.g. "Acestar Website <website@acestar.my>"
 *   FORMS_EMAIL_TO     Where submissions go (default icare@acestar.my). Comma-separate for several.
 *
 * Twilio does not allow a Reply-To header, so each template carries a "Reply to <visitor>" button instead.
 * The whole request must stay under 5 MB (attachments are base64), hence MAX_CV_BYTES in lib/forms.
 */

export type Attachment = { filename: string; type: string; content: Buffer };

export type Mail = {
  subject: string;
  text: string;
  html: string;
  attachments?: Attachment[];
};

type Address = { email: string; name?: string };

const TWILIO_EMAIL_URL = "https://comms.twilio.com/v1/Emails";

function twilioAuth() {
  const user = process.env.TWILIO_API_KEY_SID || process.env.TWILIO_ACCOUNT_SID;
  const pass = process.env.TWILIO_API_KEY_SECRET || process.env.TWILIO_AUTH_TOKEN;
  return user && pass ? `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}` : null;
}

export const emailConfigured = () => Boolean(process.env.FORMS_EMAIL_FROM && twilioAuth());

/** "Name <email@x.com>" or "email@x.com" → { email, name } */
function parseAddress(value: string): Address {
  const m = value.trim().match(/^(.*)<([^>]+)>$/);
  return m ? { email: m[2].trim(), name: m[1].trim().replace(/^"|"$/g, "") || undefined } : { email: value.trim() };
}

export async function sendMail(mail: Mail) {
  const auth = twilioAuth();
  const fromValue = process.env.FORMS_EMAIL_FROM;
  if (!auth || !fromValue) throw new Error("Email is not configured.");

  const from = parseAddress(fromValue);
  const to = (process.env.FORMS_EMAIL_TO || "icare@acestar.my")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(parseAddress);

  // TWILIO_EMAIL_API_URL only exists for local testing against a mock server.
  const res = await fetch(process.env.TWILIO_EMAIL_API_URL || TWILIO_EMAIL_URL, {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json" },
    body: JSON.stringify({
      // Twilio requires a sender name.
      from: { address: from.email, name: from.name ?? "Acestar Website" },
      to: to.map((t) => ({ address: t.email, ...(t.name ? { name: t.name } : {}) })),
      content: {
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        attachments: [
          { filename: logoPng.filename, contentType: logoPng.type, content: logoPng.base64, cid: logoPng.cid },
          ...(mail.attachments ?? []).map((a) => ({
            filename: a.filename,
            contentType: a.type,
            content: a.content.toString("base64"),
          })),
        ],
      },
      tags: { source: "website-form" },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Twilio Email responded ${res.status}: ${detail.slice(0, 300)}`);
  }
}
