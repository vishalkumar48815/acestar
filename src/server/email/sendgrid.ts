import "server-only";

/**
 * Sends email through Twilio SendGrid's v3 Mail Send API (no SDK needed).
 *
 * Environment (.env.local and Vercel → Settings → Environment Variables):
 *   SENDGRID_API_KEY   API key with "Mail Send" permission
 *   FORMS_EMAIL_FROM   A sender verified in SendGrid, e.g. "Acestar Website <website@acestar.my>"
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

export const emailConfigured = () => Boolean(process.env.SENDGRID_API_KEY && process.env.FORMS_EMAIL_FROM);

/** "Name <email@x.com>" or "email@x.com" → { email, name } */
function parseAddress(value: string) {
  const m = value.trim().match(/^(.*)<([^>]+)>$/);
  return m ? { email: m[2].trim(), name: m[1].trim().replace(/^"|"$/g, "") || undefined } : { email: value.trim() };
}

export async function sendMail(mail: Mail) {
  const key = process.env.SENDGRID_API_KEY;
  const from = process.env.FORMS_EMAIL_FROM;
  if (!key || !from) throw new Error("Email is not configured (SENDGRID_API_KEY / FORMS_EMAIL_FROM).");
  const to = (process.env.FORMS_EMAIL_TO || "icare@acestar.my")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(parseAddress);

  // SENDGRID_API_URL only exists for local testing against a mock server.
  const res = await fetch(process.env.SENDGRID_API_URL || "https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to }],
      from: parseAddress(from),
      reply_to: mail.replyTo,
      subject: mail.subject,
      content: [
        { type: "text/plain", value: mail.text },
        { type: "text/html", value: mail.html },
      ],
      attachments: mail.attachments?.map((a) => ({
        filename: a.filename,
        type: a.type,
        content: a.content.toString("base64"),
        disposition: "attachment",
      })),
      // Internal notifications: no click/open tracking rewriting the links.
      tracking_settings: { click_tracking: { enable: false }, open_tracking: { enable: false } },
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`SendGrid responded ${res.status}: ${detail.slice(0, 300)}`);
  }
}
