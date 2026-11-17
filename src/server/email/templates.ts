import "server-only";
import { logoPng } from "./logo";

/*
 * Internal notification emails for website forms. Short and plain on purpose: the team only
 * needs who, what and how to reply. Every email has an HTML and a plain-text version.
 */

export type Row = [label: string, value: string];

type Template = {
  /** Small grey label above the heading, e.g. "Contact form". */
  form: string;
  heading: string;
  intro: string;
  rows: Row[];
  /** Longer free text (message, notes), shown in its own block. */
  note?: { label: string; value: string };
  /** Closing line, e.g. how to reply. */
  footer: string;
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const sentAt = () =>
  new Intl.DateTimeFormat("en-MY", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kuala_Lumpur",
  }).format(new Date());

export function render(t: Template) {
  const rows = t.rows.filter(([, v]) => v.trim());
  const when = sentAt();

  const text = [
    t.intro,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    ...(t.note?.value.trim() ? ["", `${t.note.label}:`, t.note.value.trim()] : []),
    "",
    t.footer,
    "",
    `Sent from the ${t.form.toLowerCase()} on acestar.my, ${when} (MYT)`,
  ].join("\n");

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px 12px;background:#f4f6fa;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#30364b">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;border:1px solid #e6e9f2">
    <tr><td style="padding:24px 28px 18px;border-bottom:1px solid #eef0f5">
      <img src="cid:${logoPng.cid}" width="${Math.round(logoPng.width / 2.5)}" height="${Math.round(logoPng.height / 2.5)}" alt="Acestar" style="display:block;border:0;outline:none;height:auto">
    </td></tr>
    <tr><td style="padding:22px 28px 8px">
      <div style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#5b21d6">${esc(t.form)}</div>
      <h1 style="margin:8px 0 6px;font-size:20px;line-height:1.3;color:#30364b">${esc(t.heading)}</h1>
      <p style="margin:0;font-size:15px;line-height:1.55;color:#4b5468">${esc(t.intro)}</p>
    </td></tr>
    <tr><td style="padding:16px 28px 4px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5">
        ${rows
          .map(
            ([k, v]) => `<tr>
          <td style="padding:8px 12px 8px 0;border-top:1px solid #eef0f5;color:#6b7280;width:38%;vertical-align:top">${esc(k)}</td>
          <td style="padding:8px 0;border-top:1px solid #eef0f5;color:#30364b;font-weight:600;vertical-align:top">${esc(v)}</td>
        </tr>`,
          )
          .join("")}
      </table>
    </td></tr>
    ${
      t.note?.value.trim()
        ? `<tr><td style="padding:12px 28px 4px">
      <div style="font-size:13px;color:#6b7280;margin-bottom:6px">${esc(t.note.label)}</div>
      <div style="padding:14px 16px;background:#f6f7fb;border-radius:10px;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(t.note.value.trim())}</div>
    </td></tr>`
        : ""
    }
    <tr><td style="padding:18px 28px 26px">
      <p style="margin:0;font-size:14px;line-height:1.55;color:#4b5468">${esc(t.footer)}</p>
      <p style="margin:14px 0 0;font-size:12px;color:#9aa1b2">Sent from the ${esc(t.form.toLowerCase())} on acestar.my · ${esc(when)} (MYT)</p>
    </td></tr>
  </table>
</body></html>`;

  return { text, html };
}

/* ---------------------------------------------------------------- One template per form */

export function contactEmail(d: {
  name: string;
  company: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}) {
  return {
    subject: `Website enquiry: ${d.subject} (${d.name})`,
    ...render({
      form: "Contact form",
      heading: d.subject,
      intro: `${d.name}${d.company ? ` from ${d.company}` : ""} sent a message through the Contact page.`,
      rows: [
        ["Name", d.name],
        ["Company", d.company],
        ["Phone", d.phone],
        ["Email", d.email],
      ],
      note: { label: "Message", value: d.message },
      footer: `Hit reply to answer ${d.name} directly.`,
    }),
  };
}

export function careersEmail(d: {
  role: string;
  name: string;
  email: string;
  phone: string;
  join: string;
  message: string;
  cvName?: string;
}) {
  return {
    subject: `Job application: ${d.role} (${d.name})`,
    ...render({
      form: "Careers form",
      heading: `New application for ${d.role}`,
      intro: `${d.name} applied through the Careers page.${d.cvName ? " Their CV is attached." : ""}`,
      rows: [
        ["Role", d.role],
        ["Name", d.name],
        ["Email", d.email],
        ["Phone", d.phone],
        ["Can join", d.join],
        ["CV", d.cvName ?? ""],
      ],
      note: { label: "Additional note", value: d.message },
      footer: `Hit reply to get back to ${d.name}.`,
    }),
  };
}

export function enquiryEmail(d: {
  solution: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  details: Row[];
  timeline: string;
  message: string;
}) {
  return {
    subject: `Enterprise enquiry: ${d.solution} (${d.company})`,
    ...render({
      form: "Enterprise enquiry form",
      heading: `${d.company} is interested in ${d.solution}`,
      intro: `${d.contact} sent an enquiry from the AI Solutions page.`,
      rows: [
        ["Solution", d.solution],
        ["Company", d.company],
        ["Contact person", d.contact],
        ["Email", d.email],
        ["Phone", d.phone],
        ...d.details,
        ["Timeline", d.timeline],
      ],
      note: { label: "Additional requirements", value: d.message },
      footer: `Hit reply to reach ${d.contact} directly.`,
    }),
  };
}
