import type { Offering, Pillar, Stat, Testimonial } from "@/types/content";

export const hero = {
  badge: "Adobe Platinum Partner · Malaysia",
  titleLines: ["IT that lets", "Malaysia create."],
  accentWord: "create.",
  lead: "Creative software, high-performance workstations and digital workflows, set up and supported by one team since 2008.",
  primaryCta: { label: "Talk to us", href: "/contact" },
  secondaryCtaLabel: "WhatsApp us",
};

export const heroCards = [
  { value: "150,000+", label: "Creative Cloud licences deployed" },
  { value: "70%", label: "Malaysian universities", sub: "run on Acestar-deployed Adobe" },
  { value: "5K+", label: "Organisations served", sub: "from start-ups to Bank Negara" },
];

export const stats: Stat[] = [
  { value: 5000, suffix: "+", label: "Organisations served" },
  { value: 150000, suffix: "+", label: "Creative Cloud licences" },
  { value: 70, suffix: "%", label: "Of Malaysian universities" },
  { value: 18, label: "Years in Malaysian IT" },
];

export const clients = [
  "Petronas",
  "Bank Negara Malaysia",
  "Touch 'n Go",
  "Malaysia Rail Link",
  "Sarawak Energy",
  "Media Prima",
  "Mindvalley",
  "Lemon Sky Studios",
];

export const pillars: Pillar[] = [
  {
    key: "create",
    eyebrow: "Create",
    title: "Creative software",
    summary:
      "Licensing, deployment and training for the tools Malaysia's studios, agencies and universities create with.",
    points: [
      "Adobe Creative Cloud for teams, enterprise and education",
      "Autodesk, Maxon and specialist plug-ins",
      "Licence management, onboarding and renewals",
    ],
    brands: ["Adobe Creative Cloud", "Firefly", "Autodesk", "Maxon"],
    fact: { value: "150,000+", label: "Creative Cloud licences deployed" },
    href: "/solutions/creative-software",
  },
  {
    key: "compute",
    eyebrow: "Compute",
    title: "Workstations",
    summary:
      "Machines specified for the work, from 3D render nodes to executive laptops, configured before they reach the desk.",
    points: [
      "Apple, HP, Lenovo, Dell and Asus",
      "ISV-certified mobile and desktop workstations",
      "Zero-touch deployment and device management",
    ],
    brands: ["Apple", "HP", "Lenovo", "Dell"],
    fact: { value: "5", label: "Hardware brands, one point of contact" },
    href: "/solutions/workstations",
  },
  {
    key: "collaborate",
    eyebrow: "Collaborate",
    title: "Digital workflow",
    summary: "Paperless approvals and connected teams, so hybrid work moves at the speed of the office.",
    points: [
      "Adobe Acrobat & Acrobat Sign e-signatures",
      "Microsoft 365 and Teams rollouts",
      "Zoom, Logitech and Jabra meeting rooms",
    ],
    brands: ["Acrobat Sign", "Microsoft 365", "Zoom", "Faronics"],
    fact: { value: "20%+", label: "Faster sign-offs at TE Asia Healthcare" },
    href: "/solutions/digital-workflow",
  },
];

export const offerings: Offering[] = [
  {
    key: "techcare",
    eyebrow: "TechCare",
    title: "IT as a subscription",
    body: "Laptops, software and support for one predictable monthly fee. No upfront hardware spend, and every machine stays current.",
    tags: ["Essential", "Essential+", "Elite"],
    cta: { label: "Explore TechCare", href: "/techcare" },
  },
  {
    key: "certify",
    eyebrow: "Certify",
    title: "Industry certifications",
    body: "Sole Certiport distributor in Malaysia for Adobe Certified Professional and Microsoft Office Specialist.",
    cta: { label: "About certification", href: "/about#certification" },
  },
  {
    key: "community",
    eyebrow: "Community",
    title: "Creative Cloud Community",
    body: "Home of Malaysia's ACP national championship and a summit for the next generation of creators.",
    cta: { label: "Visit the community", href: "https://creativecc.pro", external: true },
  },
];

/** Quotes from the existing site; only punctuation/spelling tidied. TODO(client): re-approve wording. */
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

export const recognition = {
  headline: "40+ industry awards since 2013",
  highlights: [
    "Adobe SEA Top Platinum Partner of the Year 2026",
    "Frost & Sullivan System Integration Company of the Year",
    "EY Entrepreneur of the Year, Top Nominee",
  ],
};
