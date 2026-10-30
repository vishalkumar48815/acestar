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
 * Zoho Desk web form ("zsWebToCase") used by the old site. Field names and option values must
 * match Zoho exactly, including the "Hardware - Levono" spelling, or tickets will not map.
 */
export const zoho = {
  action: "https://ticket.acestar.my/support/WebToCase",
  hidden: {
    xnQsjsdp: "edbsnc636ba9e67ecba5131c972409c704922",
    xmIwtLD: "edbsn14d07518f3e1e49d30c1d4e07b364d367ad807769197f2c670b93178f2cf2413",
    xJdfEaS: "",
    actionType: "Q2FzZXM=",
    returnURL: "*",
  },
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
