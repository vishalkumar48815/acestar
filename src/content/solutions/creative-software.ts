/** Creative Software — content from acestar.my/creative-software (text tidied). */
import { asset } from "./assets";
import { creativeBrandData } from "./creative-brands.data";
import type { Brand, PageHero } from "./types";

export const hero: PageHero = {
  eyebrow: "Creative Software",
  title: "Creative software for teams that create.",
  accent: "teams that create.",
  lead: "Acestar is an Adobe Platinum Partner and a top IT services provider in Malaysia, with 18 years of experience in creative software and ICT solutions. We deliver Adobe Creative Cloud and other professional creative tools through consultation, licensing, deployment and workflow solutions.",
  primary: { label: "Talk to a specialist", href: "/contact" },
  secondary: { label: "Adobe Creative Cloud Pro", href: "/solutions/creative-software/adobe-creative-cloud-pro" },
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
  adobe: { label: "Explore Adobe Creative Cloud Pro", href: "/solutions/creative-software/adobe-creative-cloud-pro" },
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
