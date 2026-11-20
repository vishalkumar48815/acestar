/**
 * Professional Training & Certification (new page, Acestar 3.0 brief).
 * Note from the brief: Copilot training and generative AI are presented as training offerings,
 * not as certifications, unless the exact credential and awarding body are confirmed.
 */
import type { PageHero, SolutionBrief } from "./types";

export const hero: PageHero = {
  eyebrow: "Upskill Professionals. Build Future-Ready Teams.",
  title: "Professional Training & Certification in Malaysia.",
  accent: "in Malaysia.",
  lead: "Technology is evolving rapidly, and workforce skills must evolve with it. Acestar helps working adults, corporate teams, educators and emerging professionals build practical skills and validate them with recognized credentials.",
  primary: { label: "Explore Training and Certification", href: "/contact-acestarian/" },
  secondary: { label: "Our certifications", href: "#certifications" },
  image: { src: "/images/solutions/training-certification-hero-img.webp", width: 1703, height: 923, alt: "" },
  imageFit: "backdrop",
  imageBelowHeader: true,
  crumbs: [{ label: "Home", href: "/" }, { label: "Solutions" }, { label: "Training & Certification" }],
  chips: ["Certiport", "ACP", "MOS", "ACU", "App Development with Swift", "ESB"],
};

export const brief: SolutionBrief = {
  meta: {
    title: "Professional IT Training and Certiport Certification Malaysia",
    description:
      "Industry-recognized training and certification in Malaysia: Adobe Certified Professional, Microsoft Office Specialist, Autodesk Certified User, Swift, ESB, Copilot and generative AI training from Acestar, a Certiport solution provider.",
    keywords: [
      "Certiport Malaysia",
      "professional IT certification Malaysia",
      "corporate IT training Malaysia",
      "Adobe Certified Professional Malaysia",
      "Microsoft Office Specialist Malaysia",
      "Autodesk Certified User Malaysia",
      "Microsoft Copilot training Malaysia",
      "generative AI training Malaysia",
      "Swift certification Malaysia",
      "Entrepreneurship and Small Business certification",
      "Certiport Authorized Testing Center Malaysia",
      "CATC setup Malaysia",
      "industry certification for universities Malaysia",
      "graduate employability certification",
      "professional micro-credentials Malaysia",
      "HRD Corp claimable IT training Malaysia",
    ],
  },
  overview: {
    eyebrow: "What we do",
    title: "Skills that matter, credentials that count.",
    paragraphs: [
      "Acestar provides professional technology training and industry-recognized certification pathways to help working adults, corporate teams, educators and emerging professionals develop practical skills and validate their competencies.",
      "As an established Certiport solution provider in Malaysia, we support organizations seeking structured professional development and globally recognized technology credentials.",
    ],
    offeringsTitle: "Our Professional Certification Portfolio",
    offerings: [
      {
        title: "Adobe Certified Professional (ACP)",
        body: "Validate professional skills in Adobe creative applications, including Photoshop, Illustrator, Premiere Pro and other eligible certification pathways.",
      },
      {
        title: "Microsoft Office Specialist (MOS)",
        body: "Demonstrate workplace proficiency in Microsoft productivity applications such as Word, Excel and PowerPoint.",
      },
      {
        title: "Autodesk Certified User (ACU)",
        body: "Develop and validate foundational skills in Autodesk design and engineering applications.",
      },
      {
        title: "Microsoft Copilot and AI Productivity Training",
        body: "Equip professionals with practical AI skills to improve workplace productivity, collaboration and everyday business processes.",
      },
      {
        title: "Generative AI Training and Certification",
        body: "Build knowledge of generative AI concepts, applications and responsible use through suitable training and available certification pathways.",
      },
      {
        title: "App Development with Swift",
        body: "Develop coding and application development skills through Apple's Swift programming ecosystem and related certification pathways.",
      },
      {
        title: "Entrepreneurship and Small Business (ESB)",
        body: "Build and validate essential business knowledge, entrepreneurial thinking and small business management competencies.",
      },
    ],
  },
  why: {
    title: "Why Choose Acestar?",
    paragraphs: [
      "Acestar combines enterprise technology expertise with professional training and industry-recognized certification programs.",
      "Through our Certiport portfolio and experience in workforce development, we help organizations connect technology learning with practical workplace competencies.",
    ],
    highlights: [
      { title: "Certiport", body: "An established Certiport solution provider." },
      { title: "Workplace-ready", body: "Training tied to real job competencies." },
      { title: "Measurable", body: "Skills and credentials, not just attendance." },
    ],
  },
  closing: {
    eyebrow: "Invest in your people",
    title: "Invest in Skills That Matter",
    body: "Equip your workforce with practical technology competencies and industry-recognized professional certification.",
    cta: { label: "Explore Training and Certification", href: "/contact-acestarian/" },
  },
};

export const upskilling = {
  eyebrow: "Corporate Upskilling and Workforce Development",
  title: "Stronger teams, built skill by skill.",
  body: "Acestar supports professional development for organizations seeking to strengthen employee capabilities. Our training and certification solutions can support:",
  items: [
    "Corporate learning initiatives",
    "Professional competency development",
    "Digital transformation programs",
    "Structured workforce upskilling",
  ],
};

/* ----------------------------------------------------------------------------------------------
 * Extra sections. Layout ideas from the client's reference sites (acestarsolution.com,
 * certiport.pearsonvue.com); all wording is from the client's Acestar 3.0 brief.
 * --------------------------------------------------------------------------------------------- */

/** "Who we support" (the brief's audiences and corporate upskilling text). Hidden on the page for now. */
export const audiences = {
  eyebrow: "Who we support",
  title: "For working adults, corporate teams and educators.",
  items: [
    {
      key: "corporate",
      title: "Corporate teams",
      body: "Strengthen employee capabilities through structured professional development.",
      points: ["Corporate learning initiatives", "Digital transformation programs", "Structured workforce upskilling"],
      cta: { label: "Talk to us", href: "#upskilling" },
    },
    {
      key: "education",
      title: "Educators",
      body: "Industry-recognized certification pathways for your learners.",
      points: ["Adobe Certified Professional", "Autodesk Certified User", "App Development with Swift"],
      cta: { label: "Talk to us", href: "/contact-acestarian/" },
    },
    {
      key: "individual",
      title: "Emerging professionals",
      body: "Develop practical skills and validate your competencies.",
      points: ["Microsoft Office Specialist", "Generative AI training", "Entrepreneurship and Small Business"],
      cta: { label: "Talk to us", href: "/contact-acestarian/" },
    },
  ],
} as const;

/** Certification portfolio as badge tiles (programmes and descriptions from the brief). */
export const badges = {
  eyebrow: "Our professional certification portfolio",
  title: "Globally recognized technology credentials.",
  body: "Industry-recognized certification pathways, plus practical AI training for professionals and teams.",
  items: [
    {
      code: "ACP",
      name: "Adobe Certified Professional",
      detail: "Photoshop, Illustrator, Premiere Pro and more",
      tag: "Certification",
      from: "#ff5f6d",
      to: "#c9184a",
    },
    {
      code: "MOS",
      name: "Microsoft Office Specialist",
      detail: "Word, Excel and PowerPoint",
      tag: "Certification",
      from: "#22b8e6",
      to: "#1468c4",
    },
    {
      code: "ACU",
      name: "Autodesk Certified User",
      detail: "Autodesk design and engineering applications",
      tag: "Certification",
      from: "#3ccfb0",
      to: "#0b7f92",
    },
    {
      code: "Swift",
      name: "App Development with Swift",
      detail: "Coding and app development with Swift",
      tag: "Certification",
      from: "#ffb35c",
      to: "#f0607d",
    },
    {
      code: "ESB",
      name: "Entrepreneurship and Small Business",
      detail: "Business knowledge and entrepreneurial thinking",
      tag: "Certification",
      from: "#7b5cf5",
      to: "#3b2bb5",
    },
    {
      code: "AI",
      name: "Microsoft Copilot and AI Productivity",
      detail: "Practical AI skills for workplace productivity",
      tag: "Training",
      from: "#3b63f3",
      to: "#a24df0",
    },
    {
      code: "GenAI",
      name: "Generative AI",
      detail: "Concepts, applications and responsible use",
      tag: "Training",
      from: "#e2589d",
      to: "#a24df0",
    },
  ],
  helper: {
    title: "Not sure which pathway fits?",
    body: "Talk to our training team.",
    cta: { label: "Talk to us", href: "/contact-acestarian/" },
  },
};

/** Four steps (hidden on the page for now). */
export const pathway = {
  eyebrow: "How it works",
  title: "From training to a recognized credential.",
  body: "Structured professional development, step by step.",
  steps: [
    { title: "Choose a pathway", body: "Pick the certification or training that fits the role." },
    { title: "Train with Acestar", body: "Practical, workplace-focused training." },
    { title: "Take the exam", body: "Validate your competencies with a certification exam." },
    { title: "Get certified", body: "Earn an industry-recognized credential." },
  ],
};

/** Shown next to the certificate illustration: the brief's "Why Choose Acestar?". */
export const value = {
  eyebrow: "Why Acestar",
  title: brief.why.title,
  body: brief.why.paragraphs,
  items: brief.why.highlights,
};
