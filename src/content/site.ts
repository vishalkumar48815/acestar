/**
 * Single source of truth for company details used across the site.
 *
 * All values are taken from the live acestar.my site (header, footer and contact page).
 */
export const site = {
  name: "Acestar",
  legalName: "Acestar Sdn Bhd",
  registrationNo: "811773-K",
  url: "https://acestar.my",
  externalLinks: {
    techcare: "https://www.techcareasia.com/",
    community: "https://www.creativecc.pro/",
    saleslive: "https://www.sales.live/",
  },
  foundedYear: 2008,
  tagline: "Simplicity. Scalability. Sustainability. Supportive.",
  description:
    "IT solutions provider in the region since 2008, specialising in creative software, high-performance computers and digital workflow management.",

  contact: {
    phone: { display: "03-2201 7688", href: "tel:+60322017688" },
    whatsapp: { display: "019-477 3202", number: "60194773202" },
    /** Client Experience Team (the floating WhatsApp button on the old site). */
    whatsappCare: { display: "011-5508 0113", number: "601155080113" },
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
      mapUrl: "https://goo.gl/maps/gAX5Zoocbn67h5qa8",
    },
    hours: null as string | null, // not published on the old site
  },

  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/acestar.my" },
    { label: "Instagram", href: "https://www.instagram.com/acestarmy/" },
    { label: "Facebook", href: "https://www.facebook.com/acestar.my" },
  ],

  whatsappGreeting: "Hi Acestar, I'd like to talk about IT solutions for my team.",
} as const;

/** Evaluated once at build time; the site is statically generated. */
export const COPYRIGHT_YEAR = 2026;
