/**
 * Homepage content — taken from the live acestar.my site (homepage, company profile,
 * product pages and awards page). Only spelling/punctuation is tidied; numbers are the
 * site's own (the old counters had data-to-value 813000 / 5000 / 18 / 3 but rendered 0).
 */
import type { NewsItem, Offering, Pillar, Stat, Testimonial } from "@/types/content";

export const hero = {
  badge: "Adobe's only Platinum Partner in Malaysia",
  titleLines: ["Your best partner", "in ICT solutions."],
  accentWord: "ICT solutions.",
  lead: "An IT solutions provider in the region since 2008, specialising in creative software, high-performance computers and digital workflow management.",
  primaryCta: { label: "Book a one-on-one session", href: "/contact?topic=consultation" },
  secondaryCtaLabel: "WhatsApp us",
};

export const heroCards = [
  { value: "813,000+", label: "Cloud licences deployed" },
  { value: "70%+", label: "Malaysian higher-education institutions", sub: "served by Acestar" },
  { value: "5,000+", label: "Organisations", sub: "education, enterprise, SME & public sector" },
];

export const stats: Stat[] = [
  { value: 813000, suffix: "+", label: "Cloud licences" },
  { value: 5000, suffix: "+", label: "Organisations" },
  { value: 18, label: "Years of experience" },
  { value: 3, label: "Countries" },
];

/** From the "Clients & Partners" page. */
export const clients = [
  "Petronas",
  "Bank Negara Malaysia",
  "Touch 'n Go",
  "Malaysia Rail Link",
  "Sarawak Energy",
  "Mindvalley",
  "Lemon Sky Studios",
];

export const specializations = {
  eyebrow: "Our specializations",
  title: "Focused and elite in what we deliver.",
  lead: "Our key specializations shape us as your best partner in ICT solutions, and pave the way for your enterprise to be one of the most competitive and digitally advanced organisations in today's market.",
};

export const pillars: Pillar[] = [
  {
    key: "create",
    eyebrow: "Software",
    title: "Creative Software",
    summary:
      "The leading player in creative software licensing, especially Adobe Creative Cloud and Autodesk, providing best-in-class consultation and implementation.",
    points: [
      "Adobe Creative Cloud Pro for teams, enterprise and education",
      "Autodesk, Video Copilot, Resolume and Boris FX",
      "Consultation, licensing, deployment and workflow solutions",
    ],
    brands: ["Adobe", "Autodesk", "Video Copilot", "Resolume", "Boris FX"],
    fact: { value: "150,000+", label: "Adobe Creative Cloud licences deployed" },
    href: "/solutions/creative-software",
  },
  {
    key: "compute",
    eyebrow: "Hardware",
    title: "High Performance Computers",
    summary:
      "With over a decade of technical expertise, we provide workstation customisation for industries spanning creative, commercial and education.",
    points: [
      "Apple Mac Pro, iMac, MacBook Pro and MacBook Air",
      "HP ZBook & EliteBook, Lenovo ThinkPad P & X1, Dell Precision & XPS",
      "Mobile device management and zero-touch deployment",
    ],
    brands: ["Apple", "HP", "Lenovo", "Dell", "Asus"],
    fact: { value: "10+", label: "Years customising workstations" },
    href: "/solutions/workstations",
  },
  {
    key: "collaborate",
    eyebrow: "Workflow",
    title: "Digital Workflow Management",
    summary:
      "Utilising technology to drive absolute efficiency for today's hybrid working style, with best-in-class consultation and implementation.",
    points: [
      "Adobe Document Cloud, Acrobat and Acrobat Sign",
      "Microsoft 365, Faronics Deep Freeze and Saleslive CRM",
      "Video conferencing with Zoom, Jabra and Logitech",
    ],
    brands: ["Acrobat Sign", "Microsoft 365", "Faronics", "Saleslive", "Zoom"],
    fact: { value: "20%+", label: "Productivity gain with Adobe Sign at TE Asia Healthcare" },
    href: "/solutions/digital-workflow",
  },
];

export const offerings: Offering[] = [
  {
    key: "care",
    eyebrow: "We care",
    title: "IT As A Service",
    body: "Acestar takes pride as the first and only company that provides IT As A Service on a subscription basis, with standardised processes and simplified products and services custom-designed for progressive organisations.",
    tags: ["Essential", "Essential+", "Elite"],
    cta: { label: "Explore TechCare", href: "/techcare" },
  },
  {
    key: "train",
    eyebrow: "We train",
    title: "Training & certification",
    body: "As Malaysia's sole Certiport distributor, we help individuals and workforces build their skills through industry training and globally recognised certifications.",
    cta: { label: "About Certiport", href: "/about#certification" },
  },
  {
    key: "serve",
    eyebrow: "We serve",
    title: "Creative Cloud Community",
    body: "A creative ecosystem connecting creative users and businesses to nurture talent and create jobs, home of the Micro-Credentials Education Summit and the national ACP & MOS championships.",
    cta: { label: "Visit creativecc.pro", href: "https://www.creativecc.pro/", external: true },
  },
];

export const ceoMessage = {
  quote: "We are committed to your success in business.",
  name: "Natalie Sit",
  role: "Group CEO, Acestar Sdn. Bhd.",
  badge: "Proudly recognised as a Malaysia Digital Status company",
};

/** Quotes from the existing site; only punctuation/spelling tidied. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "As a creative studio that produces high-quality artwork for AAA games and world-class animated series, we need to work with an SI with top-notch customer support and an understanding of the software we require. Acestar is well up to date with Adobe Creative Cloud and its implementation for the creative industry.",
    name: "Ken Foong",
    role: "Director & Chief Creative Officer",
    company: "Lemon Sky Studios",
  },
  {
    quote:
      "By using Adobe Sign to fetch multiple signatories, productivity for this process seems to have increased by at least 20%. Credit to Acestar, as they have been very helpful with Adobe Sign onboarding.",
    name: "Ms. Chung",
    role: "",
    company: "TE Asia Healthcare",
  },
  {
    quote:
      "We are satisfied with Acestar's after-sales support. So far they have done great at meeting our business goals. We are happy to engage with them for the long term.",
    name: "Wayne",
    role: "Head of IT",
    company: "Mindvalley",
  },
  {
    quote:
      "Acestar is our preference when it comes to workstation consultation. I'd give it to them when it comes to sales service. So far they have exceeded my expectations.",
    name: "Hezrin",
    role: "",
    company: "Media Prima Berhad",
  },
  {
    quote:
      "The service level and experience are highly efficient. We have definitely benefited from Acestar's consultation when it comes to IT.",
    name: "Brian Law",
    role: "Managing Partner",
    company: "Law Partnership",
  },
];

/** From the Awards page. */
export const recognition = {
  headline: "40+ awards since 2013",
  highlights: [
    "Adobe SEA Top Platinum Partner of the Year, 2026",
    "Frost & Sullivan Malaysia System Integration Company of the Year, 2019",
    "EY Entrepreneur of the Year 2020, Top Nominee",
  ],
};

export const news: NewsItem[] = [
  {
    title: "Certiport names 2024 Adobe Certified Professional World Champion from Malaysia",
    excerpt:
      "Izzul Zafran Abd Razak from Malaysia won the top prize out of 47 finalists at the 11th annual competition in Anaheim, California.",
    source: "PRWeb",
    href: "https://www.prweb.com/releases/certiport-names-2024-adobe-certified-professional-world-champion-from-malaysia-302211520.html",
    lang: "en",
  },
  {
    title: "Pelajar Politeknik juara 'Adobe Certified Professional World Championship 2024'",
    excerpt:
      "Izzul Zafran Abd Razak menewaskan 47 peserta daripada 40 negara untuk membawa pulang hadiah US$8,000, sijil, medal dan trofi.",
    source: "Buletin TV3",
    href: "https://www.buletintv3.my/nasional/pelajar-politeknik-juara-adobe-certified-professional-world-championship-2024/",
    lang: "ms",
  },
  {
    title: "Pelajar Politeknik juara 'Adobe Certified Professional World Championship 2024'",
    excerpt:
      "Pelajar Politeknik Muadzam Shah, Pahang, menempa nama di peringkat antarabangsa dengan tempat pertama di California, Amerika Syarikat.",
    source: "Astro Awani",
    href: "https://www.astroawani.com/berita-malaysia/pelajar-politeknik-juara-adobe-certified-professional-world-championship-2024-481772",
    lang: "ms",
  },
];
