import { NextResponse, type NextRequest } from "next/server";
import { enquirySolutions } from "@/content/solutions/enquiry";
import { EMAIL_RE, MAX_CV_BYTES, PHONE_RE } from "@/lib/forms";
import { type Attachment, emailConfigured, sendMail } from "@/server/email/sendgrid";
import { careersEmail, contactEmail, enquiryEmail } from "@/server/email/templates";

/*
 * POST /api/forms/<kind>/  (contact | careers | enquiry)
 * Receives the website forms as multipart/form-data and emails them to the team via SendGrid.
 * Tech Support is not handled here (it will go to Zoho Desk).
 */

const CV_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

/** Best-effort limit per server instance: 5 submissions per IP per form every 10 minutes. */
const hits = new Map<string, number[]>();
function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > 5;
}

const fail = (status: number, message: string, extra?: object) =>
  NextResponse.json({ ok: false, message, ...extra }, { status });

/** Trims and caps a text field so a single field can't flood the email. */
const field = (data: FormData, name: string, max = 200) =>
  String(data.get(name) ?? "")
    .trim()
    .slice(0, max);

export async function POST(request: NextRequest, { params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (kind !== "contact" && kind !== "careers" && kind !== "enquiry") return fail(404, "Unknown form.");

  // Only accept posts from this site.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) return fail(403, "Not allowed.");

  // Not set up yet: tell the browser to fall back to opening the visitor's email app.
  if (!emailConfigured()) return fail(503, "Email is not configured yet.", { fallback: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(`${kind}:${ip}`)) return fail(429, "Too many submissions. Please try again in a few minutes.");

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return fail(400, "We couldn't read the form. Please try again.");
  }

  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (field(data, "website")) return NextResponse.json({ ok: true });

  const email = field(data, "email");
  const phone = field(data, "phone", 40);
  if (!EMAIL_RE.test(email)) return fail(400, "Please enter a valid email address.");
  if (!PHONE_RE.test(phone)) return fail(400, "Please enter a valid phone number.");

  try {
    if (kind === "contact") {
      const name = field(data, "name", 120);
      const subject = field(data, "subject", 160);
      const message = field(data, "message", 5000);
      if (name.length < 2 || subject.length < 3 || message.length < 2)
        return fail(400, "Please fill in all required fields.");
      const mail = contactEmail({ name, company: field(data, "company", 160), phone, email, subject, message });
      await sendMail({ ...mail, replyTo: { email, name } });
    }

    if (kind === "careers") {
      const name = field(data, "name", 120);
      const role = field(data, "role", 160);
      const join = field(data, "join", 80);
      if (name.length < 2 || !role || !join) return fail(400, "Please fill in all required fields.");

      const attachments: Attachment[] = [];
      const cv = data.get("cv");
      if (!(cv instanceof File) || cv.size === 0) return fail(400, "Please attach your CV.");
      const ext = cv.name.split(".").pop()?.toLowerCase() ?? "";
      if (!CV_TYPES[ext]) return fail(400, "Your CV must be a PDF or Word file.");
      if (cv.size > MAX_CV_BYTES) return fail(400, "Your CV is too large.");
      const safeName = `CV - ${name.replace(/[^\p{L}\p{N} .-]/gu, "").slice(0, 60)}.${ext}`;
      attachments.push({ filename: safeName, type: CV_TYPES[ext], content: Buffer.from(await cv.arrayBuffer()) });

      const mail = careersEmail({
        role,
        name,
        email,
        phone,
        join,
        message: field(data, "message", 5000),
        cvName: safeName,
      });
      await sendMail({ ...mail, replyTo: { email, name }, attachments });
    }

    if (kind === "enquiry") {
      const solution = enquirySolutions.find((s) => s.key === field(data, "solution")) ?? enquirySolutions[0];
      const company = field(data, "company", 160);
      const contact = field(data, "contact", 120);
      if (company.length < 2 || contact.length < 2) return fail(400, "Please fill in all required fields.");
      const mail = enquiryEmail({
        solution: solution.label,
        company,
        contact,
        email,
        phone,
        details: solution.fields.map((f) => [f.label, field(data, f.name, 500)]),
        timeline: field(data, "timeline", 80),
        message: field(data, "message", 5000),
      });
      await sendMail({ ...mail, replyTo: { email, name: contact } });
    }
  } catch (error) {
    console.error(`[forms/${kind}]`, error);
    return fail(502, "We couldn't send your message right now.");
  }

  return NextResponse.json({ ok: true });
}
