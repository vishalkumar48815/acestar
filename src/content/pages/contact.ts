/** Contact — details and form fields from acestar.my/contact-acestarian. */
import { site } from "@/content/site";
import type { PageHero } from "@/content/solutions/types";

export const hero: PageHero = {
  eyebrow: "Contact Acestar",
  title: "Let's talk about what's next.",
  accent: "what's next.",
  lead: "Focused on delivering our services and specialisation in a class of its own. Tell us what you're working on and the right team will get back to you.",
  primary: { label: "Send a message", href: "#message" },
  secondary: { label: `Call ${site.contact.phone.display}`, href: site.contact.phone.href },
  crumbs: [{ label: "Home", href: "/" }, { label: "Contact" }],
};

/** WhatsApp number published on the old Contact page (sales). */
export const salesWhatsapp = { display: "+60 19-610 9688", number: "60196109688" };

export type Channel = {
  key: string;
  title: string;
  body: string;
  links: { label: string; href: string; kind: "phone" | "whatsapp" | "email" | "map" }[];
};

export const channels: Channel[] = [
  {
    key: "sales",
    title: "Sales & general enquiries",
    body: "Licensing, hardware, solutions and quotes.",
    links: [
      { label: site.contact.phone.display, href: site.contact.phone.href, kind: "phone" },
      { label: salesWhatsapp.display, href: `https://wa.me/${salesWhatsapp.number}`, kind: "whatsapp" },
      { label: site.contact.email.sales, href: `mailto:${site.contact.email.sales}`, kind: "email" },
    ],
  },
  {
    key: "care",
    title: "Client Experience Team",
    body: "Help with an existing order, licence or account.",
    links: [
      {
        label: site.contact.whatsappCare.display,
        href: `https://wa.me/${site.contact.whatsappCare.number}`,
        kind: "whatsapp",
      },
      { label: site.contact.email.support, href: `mailto:${site.contact.email.support}`, kind: "email" },
    ],
  },
  {
    key: "media",
    title: "Media & partnership enquiries",
    body: "Press, events, sponsorships and partnerships.",
    links: [{ label: site.contact.email.media, href: `mailto:${site.contact.email.media}`, kind: "email" }],
  },
];

export const visit = {
  title: "Visit us",
  lines: site.contact.address.lines,
  mapUrl: site.contact.address.mapUrl,
};

export const form = {
  eyebrow: "Send a message",
  title: "How can we help?",
  body: "Fill in the form and our team will reply as soon as possible.",
  to: site.contact.email.sales,
};
