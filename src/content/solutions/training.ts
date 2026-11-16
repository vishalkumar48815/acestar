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
  secondary: { label: "Our certifications", href: "#overview" },
  image: { src: "/images/solutions/certificate-hero.webp", width: 1252, height: 939, alt: "" },
  imageFit: "contain",
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
    eyebrow: "Upskill professionals",
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
      "Our focus goes beyond training attendance. We help individuals and teams develop measurable skills and pursue recognized credentials.",
    ],
    highlights: [
      { title: "Certiport", body: "An established Certiport solution provider." },
      { title: "7 pathways", body: "ACP, MOS, ACU, Swift, ESB and AI skills." },
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
