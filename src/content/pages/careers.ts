/** Careers — roles and form fields from acestar.my/career. */
import { site } from "@/content/site";
import type { PageHero } from "@/content/solutions/types";

export const hero: PageHero = {
  eyebrow: "Careers at Acestar",
  title: "Grow your career with a team in a class of its own.",
  accent: "a class of its own.",
  lead: "We've helped organisations across the region create, compute and collaborate since 2008. Find an open role below and apply in a couple of minutes.",
  primary: { label: "See open roles", href: "#roles" },
  secondary: { label: `Email ${site.contact.email.careers}`, href: `mailto:${site.contact.email.careers}` },
  crumbs: [{ label: "Home", href: "/" }, { label: "Careers" }],
};

export type Job = {
  slug: string;
  title: string;
  team: string;
  experience: string;
  skills: string[];
  /** Full job post on the old site. */
  legacyUrl: string;
};

export const jobs: Job[] = [
  {
    slug: "product-manager-business-development-manager",
    title: "Product Manager / Business Development Manager",
    team: "Sales & Product",
    experience: "5+ years in business development or a related role.",
    skills: [
      "Strong communication and interpersonal skills (you're a people person!)",
      "A sense of humour is highly valued",
      "Excellent leadership and communication skills",
    ],
    legacyUrl: "https://acestar.my/job/product-manager-business-development-manager/",
  },
  {
    slug: "senior-executive-event-branding",
    title: "Senior Executive, Event & Branding",
    team: "Marketing",
    experience: "At least 2–3 years managing marketing and communication activities.",
    skills: ["Good Microsoft Office skills", "A creative and strategic thinker who can offer new ideas"],
    legacyUrl: "https://acestar.my/job/senior-executive-event-branding/",
  },
  {
    slug: "senior-legal-executive",
    title: "Senior Legal Executive",
    team: "Legal",
    experience: "At least 2–3 years of legal experience in a corporate environment.",
    skills: [
      "Excellent communication and stakeholder management, building relationships across all levels",
      "Self-motivated and proactive",
      "A high level of integrity and individual responsibility",
    ],
    legacyUrl: "https://acestar.my/job/senior-legal-executive/",
  },
  {
    slug: "accounts-executive-inventory-logistics",
    title: "Accounts Executive, Inventory & Logistics",
    team: "Finance",
    experience: "At least 3 years in a financial or accounting field.",
    skills: [
      "Knowledge of the AutoCount system preferred",
      "Good knowledge of Microsoft Excel, PowerPoint and Word",
      "Good interpersonal and problem-solving skills, with a strong sense of urgency",
    ],
    legacyUrl: "https://acestar.my/job/accounts-executive-inventory-logistics/",
  },
  {
    slug: "inside-sales-representative",
    title: "Inside Sales Representative",
    team: "Sales",
    experience: "3 years of working experience in a related field.",
    skills: [
      "Fluency in English",
      "Strong communication and interpersonal skills",
      "Able to build good relationships with current and potential clients",
    ],
    legacyUrl: "https://acestar.my/job/inside-sales-representative/",
  },
];

export const apply = {
  eyebrow: "Apply now",
  title: "Send us your application.",
  body: `Pick a role (or send a general application) and we'll be in touch. You can also email your CV to ${site.contact.email.careers}.`,
  to: site.contact.email.support,
};

/* ------------------------------------------------------------------ Redesign (client mock, Acestar 3.0) */

export const careersHero = {
  eyebrow: "Careers at Acestar",
  title: "Build Your Career.",
  script: "Make an Impact.",
  lead: "Join a team of passionate people, work on meaningful projects and grow your skills with the latest technology. At Acestar, your ideas matter and your career matters.",
  // Artwork includes the "Great People Greater Together" script and the sticky notes
  image: {
    // Same image with the white area outside the cyan curve faded out (left side only)
    src: "/images/pages/careers/careers-hero-curve.webp",
    width: 1549,
    height: 1015,
    alt: "A smiling Acestar team member surrounded by colourful sticky notes, with the words Great People Greater Together",
  },
};

/** Short one-liners for the role cards (full details stay in the role list below). */
export const roleSummaries: Record<string, string> = {
  "product-manager-business-development-manager": "Lead products and partnerships that create real business value.",
  "senior-executive-event-branding": "Plan and run impactful events, campaigns and brand content.",
  "senior-legal-executive": "Guide contracts, compliance and corporate legal matters.",
  "accounts-executive-inventory-logistics": "Keep accounts, inventory and logistics running smoothly.",
  "inside-sales-representative": "Help customers find the right technology, from first call to close.",
};

export const internship = {
  eyebrow: "Internship and fresh graduates",
  title: "Start Your First Career with Us",
  cta: "Apply for Internship",
};

export const whyJoin = {
  eyebrow: "Why work with us",
  title: "More Than Just a Job",
  body: "We invest in people, because great technology starts with great teams.",
  perks: [
    { key: "learning", label: "Continuous Learning & Certification" },
    { key: "team", label: "Supportive Team Culture" },
    { key: "growth", label: "Structured Career Growth & Progression" },
    { key: "rewards", label: "Rewards & Recognition" },
  ],
  image: {
    src: "/images/pages/careers/why-work-with-us.webp",
    width: 1717,
    height: 916,
    alt: "The Acestar office lounge with the Acestar logo and the words Grow and Give on the wall",
  },
};

export const nextChapter = {
  line1: "Your Next",
  line2a: "Chapter",
  line2b: "Starts Here.",
  body: "If you're ready to learn, grow, and make a real impact, we'd love to hear from you.",
  cta: "Explore Open Roles",
};
