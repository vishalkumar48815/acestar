/**
 * Single source of truth for company details used across the site.
 *
 * TODO(client): confirm which phone / WhatsApp / emails are public.
 * The old site lists 4 emails and 4 WhatsApp numbers; the values below are the
 * ones shown most prominently in the old header/footer.
 */
export const site = {
  name: "Acestar",
  legalName: "Acestar Sdn Bhd",
  registrationNo: "811773-K",
  url: "https://acestar.my",
  foundedYear: 2008,
  tagline: "IT that lets Malaysia create.",
  description:
    "Acestar is Malaysia's Adobe Platinum Partner, delivering creative software, high-performance workstations and digital workflow solutions to enterprises, universities and government since 2008.",

  contact: {
    phone: { display: "03-2201 7688", href: "tel:+60322017688" },
    whatsapp: { display: "+60 19-477 3202", number: "60194773202" },
    email: {
      sales: "isr@acestar.my",
      support: "icare@acestar.my",
      careers: "hrd@acestar.my",
      media: "branding@acestar.my",
    },
    address: {
      lines: [
        "Unit A-10-6, Tower A, Vertical Business Suite",
        "Avenue 3, Bangsar South, No. 8 Jalan Kerinchi",
        "59200 Kuala Lumpur, Malaysia",
      ],
      mapUrl: "https://maps.google.com/?q=Vertical+Business+Suite+Bangsar+South+Kuala+Lumpur",
    },
    hours: "Mon–Fri, 9am–6pm", // TODO(client): confirm office hours
  },

  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/acestar.my" },
    { label: "Instagram", href: "https://www.instagram.com/acestarmy" },
    { label: "Facebook", href: "https://www.facebook.com/acestar.my" },
  ],

  whatsappGreeting: "Hi Acestar, I'd like to talk about IT solutions for my team.",
} as const;

/** Evaluated once at build time; the site is statically generated. */
export const COPYRIGHT_YEAR = 2026;
