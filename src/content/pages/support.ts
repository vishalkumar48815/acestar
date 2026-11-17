/** Tech Support — copy and ticket form from acestar.my/techsupport (Zoho Desk web-to-case). */
import { site } from "@/content/site";
import type { PageHero } from "@/content/solutions/types";

export const hero: PageHero = {
  eyebrow: "TechSupport",
  title: "Let us take care of your IT needs.",
  accent: "your IT needs.",
  lead: "Because you have better things to do. Submit a ticket and our support team will pick it up. Count on us, in a class of its own.",
  primary: { label: "Submit a ticket", href: "#ticket" },
  secondary: {
    label: "WhatsApp support",
    href: `https://wa.me/${site.contact.whatsappCare.number}`,
    external: true,
  },
  crumbs: [{ label: "Home", href: "/" }, { label: "Tech Support" }],
};

export const help = [
  {
    key: "ticket",
    title: "Submit a ticket",
    body: "The fastest way to get help. Every ticket is tracked until it's resolved.",
  },
  {
    key: "care",
    title: "Client Experience Team",
    body: `${site.contact.email.support} · WhatsApp ${site.contact.whatsappCare.display}`,
  },
  {
    key: "files",
    title: "Attach screenshots or logs",
    body: "Up to 5 files, 20 MB each, to help us solve it faster.",
  },
];

/**
 * Zoho Desk "Advanced Web Form" (web-to-case), from the embed code in Zoho Desk → Setup →
 * Channels → Web Forms. Field names and option values must match Zoho exactly, including the
 * "Hardware - Levono" spelling and "First Name" (which holds the Adobe VIP number), or the ticket
 * fields won't map. If the form is regenerated in Zoho, copy the new hidden values here.
 */
export const zoho = {
  action: "https://ticket.acestar.my/support/WebToCase",
  hidden: {
    xnQsjsdp: "edbsnc636ba9e67ecba5131c972409c704922",
    xmIwtLD: "edbsn3904faed6b9df9d6cb3019e54793e446ae5c9272100c90d63b939ae301747ae8",
    actionType: "Q2FzZXM=",
  },
  /** Zoho's captcha (required by the web form): returns { captchaUrl, captchaDigest }. */
  captchaEndpoint: "https://desk.zoho.com/support/GenerateCaptcha?action=getNewCaptcha",
  /** Same-origin page Zoho redirects to after a successful ticket (lets the form confirm success). */
  returnPath: "/zoho/return.html",
  /** Field that carries the Adobe VIP number in Zoho. */
  vipField: "First Name",
  placeholder: "Please Choose One",
  products: [
    {
      group: "Software",
      options: [
        { value: "Software - ADOBE", label: "Adobe" },
        { value: "Software - MICROSOFT", label: "Microsoft" },
        { value: "Software - MAXON", label: "Maxon" },
        { value: "Software - Other", label: "Other software" },
      ],
    },
    {
      group: "Hardware",
      options: [
        { value: "Hardware - Apple", label: "Apple" },
        { value: "Hardware - Levono", label: "Lenovo" },
        { value: "Hardware - Asus", label: "Asus" },
        { value: "Hardware - HP", label: "HP" },
        { value: "Hardware - Other", label: "Other hardware" },
      ],
    },
  ],
  sectors: ["Government", "Commercial", "Education"],
  maxFiles: 5,
  maxFileBytes: 20 * 1024 * 1024,
};
