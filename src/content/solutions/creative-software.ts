/** Creative Software — content from acestar.my/creative-software (text tidied). */
import { asset } from "./assets";
import { creativeBrandData } from "./creative-brands.data";
import type { Brand, PageHero, SolutionBrief } from "./types";

export const hero: PageHero = {
  eyebrow: "Empower Creativity at Every Level",
  title: "Creative Software Solutions in Malaysia.",
  accent: "in Malaysia.",
  lead: "Great creative work begins with the right technology. Acestar is an award-winning Adobe Platinum Partner and Top Adobe Authorized Reseller in Malaysia, helping businesses, agencies, schools and government access industry-leading creative tools.",
  primary: { label: "Talk to Our Creative Software Experts", href: "/contact-acestarian/" },
  secondary: { label: "Adobe Creative Cloud Pro", href: "/creative-cloud/" },
  image: asset("2026/03/Banner-3.png", "Luminous violet jaguar made of light"),
  imageFit: "backdrop",
  crumbs: [{ label: "Home", href: "/" }, { label: "Solutions" }, { label: "Creative Software" }],
  chips: ["Adobe", "Autodesk", "Video Copilot", "Resolume", "Boris FX"],
};

export const intro = {
  eyebrow: "Who we serve",
  title: "Best service and competitive pricing, for every kind of organisation.",
  body: "As a leading ICT company in Malaysia, Acestar supports enterprises, SMEs, education institutions and government agencies. Our strategic partners include Adobe, Autodesk, Video Copilot, Resolume and Boris FX.",
  segments: ["Enterprises", "SMEs", "Education", "Government"],
};

const links: Record<string, Brand["link"]> = {
  adobe: { label: "Explore Adobe Creative Cloud Pro", href: "/creative-cloud/" },
};

export const brands: Brand[] = creativeBrandData.map((b) => ({
  key: b.key,
  name: b.name,
  banner: asset(b.banner, `${b.name} artwork`),
  logo: asset(b.logo, `${b.name} logo`),
  description: b.description,
  groups: b.groups.map((g) => ({
    title: g.title,
    products: g.products.map((p) => ({ id: p.id, name: p.name, desc: p.desc, icon: asset(p.icon, `${p.name} icon`) })),
  })),
  feature: b.video
    ? { image: asset(b.video.poster, "Adobe Creative Cloud: the ultimate creative toolkit"), caption: b.video.caption }
    : undefined,
  link: links[b.key],
}));

export const closing = {
  eyebrow: "Let's create",
  title: "Take your business creativity further with Acestar.",
  body: "Licensing, deployment, training and support for the tools your creative teams rely on.",
};

/** Acestar 3.0 brief: SEO copy, offerings and "Why Acestar". */
export const brief: SolutionBrief = {
  meta: {
    title: "Adobe Platinum Partner and Creative Software Reseller Malaysia",
    description:
      "Buy and manage Adobe Creative Cloud and professional creative software in Malaysia with Acestar, an award-winning Adobe Platinum Partner.",
    keywords: [
      "Adobe reseller Malaysia",
      "Adobe Platinum Partner Malaysia",
      "Adobe Creative Cloud Malaysia",
      "buy Adobe licenses Malaysia",
      "Adobe enterprise licensing",
      "creative software supplier Malaysia",
      "Adobe Firefly Malaysia",
    ],
  },
  overview: {
    eyebrow: "Creative software, simplified",
    title: "Empower creativity at every level.",
    paragraphs: [
      "Acestar is an award-winning Adobe Platinum Partner, Top Adobe Authorized Reseller in Malaysia, and established creative software reseller, helping businesses, creative agencies, educational institutions and government organizations access industry-leading creative technologies.",
      "From software licensing and deployment to renewal management and technical consultation, we simplify creative technology adoption for organizations of every size.",
    ],
    offeringsTitle: "Our Creative Software Solutions",
    offerings: [
      {
        title: "Adobe Creative Cloud",
        body: "Access professional creative applications including Adobe Photoshop, Illustrator, Premiere Pro, InDesign, After Effects and other Adobe Creative Cloud solutions.",
      },
      {
        title: "Adobe Firefly and Creative AI",
        body: "Bring generative AI into creative workflows to accelerate content creation, visual exploration and production.",
      },
      {
        title: "Creative Software Licensing",
        body: "Purchase, renew and manage genuine creative software subscriptions with expert guidance on suitable licensing plans.",
      },
      {
        title: "Enterprise Creative Deployment",
        body: "Simplify software provisioning, license administration and deployment across creative teams and organizations.",
      },
      {
        title: "Creative Technology Consultation",
        body: "Equip design, marketing, media and production teams with the right applications and technology for their work.",
      },
    ],
  },
  why: {
    title: "Why Choose Acestar for Adobe?",
    paragraphs: [
      "Acestar is recognized as a Top Adobe Reseller and Adobe Platinum Partner in Malaysia, with extensive experience supporting creative software licensing and enterprise deployment.",
      "Our award-winning Adobe partnership reflects our commitment to product expertise, customer service and long-term client relationships.",
      "Whether you are purchasing new Adobe licenses, renewing existing subscriptions or managing enterprise-wide deployments, Acestar provides the consultation and support your organization needs.",
    ],
    highlights: [
      { title: "Platinum Partner", body: "Adobe Platinum Partner in Malaysia." },
      { title: "Top Reseller", body: "A Top Adobe Authorized Reseller." },
      { title: "Award-winning", body: "Recognised for expertise and service." },
      { title: "End to end", body: "Licensing, renewals and enterprise deployment." },
    ],
  },
  closing: {
    eyebrow: "Let’s create",
    title: "Your Trusted Adobe Partner in Malaysia",
    body: "Empower your creative teams with genuine software, expert consultation and dependable support.",
    cta: { label: "Talk to Our Creative Software Experts", href: "/contact-acestarian/" },
  },
};
