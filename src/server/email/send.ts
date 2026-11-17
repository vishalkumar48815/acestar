import "server-only";
import { logoPng } from "./logo";

/**
 * Sends the website's notification emails.
 *
 * Twilio Email API (default): POST https://comms.twilio.com/v1/Emails, HTTP Basic auth with a
 * Twilio API key SID + secret (or Account SID + Auth Token).
 *   TWILIO_API_KEY_SID / TWILIO_API_KEY_SECRET   (or TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN)
 * Twilio SendGrid (optional alternative, used only if SENDGRID_API_KEY is set and no Twilio keys are).
 *   SENDGRID_API_KEY
 * Both:
 *   FORMS_EMAIL_FROM   Address on a domain verified in Twilio, e.g. "Acestar Website <website@acestar.my>"
 *   FORMS_EMAIL_TO     Where form submissions go (default icare@acestar.my). Comma-separate for several.
 */

export type Attachment = { filename: string; type: string; content: Buffer };

export type Mail = {
  subject: string;
  text: string;
  html: string;
  /** The visitor's address, so the team can simply hit reply. */
  replyTo?: { email: string; name?: string };
  attachments?: Attachment[];
};

type Address = { email: string; name?: string };

function twilioAuth() {
  const user = process.env.TWILIO_API_KEY_SID || process.env.TWILIO_ACCOUNT_SID;
  const pass = process.env.TWILIO_API_KEY_SECRET || process.env.TWILIO_AUTH_TOKEN;
  return user && pass ? `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}` : null;
}

export const emailConfigured = () =>
  Boolean(process.env.FORMS_EMAIL_FROM && (twilioAuth() || process.env.SENDGRID_API_KEY));

/** "Name <email@x.com>" or "email@x.com" → { email, name } */
function parseAddress(value: string): Address {
  const m = value.trim().match(/^(.*)<([^>]+)>$/);
  return m ? { email: m[2].trim(), name: m[1].trim().replace(/^"|"$/g, "") || undefined } : { email: value.trim() };
}

/** For a Reply-To header: quotes the name so commas etc. don't break it. */
const formatAddress = (a: Address) => (a.name ? `"${a.name.replace(/["\\\r\n]/g, "")}" <${a.email}>` : a.email);

export async function sendMail(mail: Mail) {
  const fromValue = process.env.FORMS_EMAIL_FROM;
  if (!fromValue || !emailConfigured()) throw new Error("Email is not configured.");
  const from = parseAddress(fromValue);
  const to = (process.env.FORMS_EMAIL_TO || "icare@acestar.my")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(parseAddress);

  const auth = twilioAuth();
  const res = auth ? await viaTwilio(auth, from, to, mail) : await viaSendGrid(from, to, mail);
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`${auth ? "Twilio" : "SendGrid"} responded ${res.status}: ${detail.slice(0, 300)}`);
  }
}

function viaTwilio(auth: string, from: Address, to: Address[], mail: Mail) {
  // TWILIO_EMAIL_API_URL / SENDGRID_API_URL only exist for local testing against a mock server.
  return fetch(process.env.TWILIO_EMAIL_API_URL || "https://comms.twilio.com/v1/Emails", {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json" },
    body: JSON.stringify({
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
      headers: mail.replyTo ? { "Reply-To": formatAddress(mail.replyTo) } : undefined,
      tags: { source: "website-form" },
    }),
  });
}

function viaSendGrid(from: Address, to: Address[], mail: Mail) {
  return fetch(process.env.SENDGRID_API_URL || "https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to }],
      from,
      reply_to: mail.replyTo,
      subject: mail.subject,
      content: [
        { type: "text/plain", value: mail.text },
        { type: "text/html", value: mail.html },
      ],
      attachments: [
        {
          filename: logoPng.filename,
          type: logoPng.type,
          content: logoPng.base64,
          disposition: "inline",
          content_id: logoPng.cid,
        },
        ...(mail.attachments ?? []).map((a) => ({
          filename: a.filename,
          type: a.type,
          content: a.content.toString("base64"),
          disposition: "attachment",
        })),
      ],
      tracking_settings: { click_tracking: { enable: false }, open_tracking: { enable: false } },
    }),
  });
}
