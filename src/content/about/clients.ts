/** Clients & Partners — from acestar.my/clients-partners (logos) and company-profile (facts). */
import type { PageHero, Stat } from "@/content/solutions/types";
import { media } from "@/content/media";

export const hero: PageHero = {
  eyebrow: "Clients & Partners",
  title: "Trusted by leading organisations.",
  accent: "leading organisations.",
  lead: "More than 5,000 clients across education, enterprise, SME and the public sector, supported by long-standing partnerships with the world's leading technology brands.",
  primary: { label: "Work with us", href: "/contact" },
  secondary: { label: "Our awards", href: "/about/awards" },
  // The original Clients page photo (2021/12/Clients-Background.jpg), recoloured in the site palette.
  image: { src: "/images/pages/about/clients-hero-art3.webp", width: 1190, height: 777, alt: "" },
  imageScrim: true,
  imageFit: "backdrop",
  crumbs: [{ label: "Home", href: "/" }, { label: "About Us" }, { label: "Clients & Partners" }],
};

export const stats: Stat[] = [
  { value: "5,000+", label: "Clients served across Malaysia and the region" },
  { value: "70%+", label: "Of Malaysian higher-education institutions covered" },
  { value: "Platinum", label: "Adobe's only Platinum Partner in Malaysia" },
];

const [petronas, bnm, tng, mrl, sarawak, mindvalley, lemonSky] = media.clientLogos;

/** "Some of our clients" — sector labels added for context. */
export const clients = [
  { logo: petronas, name: "Petronas", sector: "Energy" },
  { logo: bnm, name: "Bank Negara Malaysia", sector: "Public sector" },
  { logo: tng, name: "Touch 'n Go", sector: "Fintech" },
  { logo: mrl, name: "Malaysia Rail Link", sector: "Infrastructure" },
  { logo: sarawak, name: "Sarawak Energy", sector: "Utilities" },
  { logo: mindvalley, name: "Mindvalley", sector: "Education" },
  { logo: lemonSky, name: "Lemon Sky Studios", sector: "Creative studio" },
];

const [adobe, apple, hp, microsoft, certiport, autodesk, lenovo] = media.partnerLogos;

/** "Our key partners" — what each partnership means for clients, and where to read more. */
export const partners = [
  {
    logo: adobe,
    name: "Adobe",
    badge: "Platinum Reseller",
    body: "Adobe's only Platinum Partner in Malaysia: Creative Cloud, Document Cloud and Acrobat Sign licensing, deployment and workshops.",
    href: "/solutions/creative-software",
  },
  {
    logo: apple,
    name: "Apple",
    badge: "Authorised Reseller",
    body: "Mac, iPad and iPhone for business and education, with deployment, device management and AppleCare.",
    href: "/solutions/workstations/apple",
  },
  {
    logo: microsoft,
    name: "Microsoft",
    badge: "Microsoft 365",
    body: "Microsoft 365 for productivity, collaboration and secure hybrid work.",
    href: "/solutions/digital-workflow",
  },
  {
    logo: hp,
    name: "HP",
    badge: "Workstations",
    body: "HP ZBook and EliteBook workstations and notebooks, configured for professional work.",
    href: "/solutions/workstations",
  },
  {
    logo: lenovo,
    name: "Lenovo",
    badge: "Workstations",
    body: "ThinkPad P-series and X1 workstations and notebooks for creative and enterprise teams.",
    href: "/solutions/workstations",
  },
  {
    logo: autodesk,
    name: "Autodesk",
    badge: "Design software",
    body: "Autodesk design, engineering and media software for studios, architects and education.",
    href: "/solutions/creative-software",
  },
  {
    logo: certiport,
    name: "Certiport",
    badge: "Sole Distributor in Malaysia",
    body: "Industry certifications such as Adobe Certified Professional and Microsoft Office Specialist.",
    href: "/about#training",
  },
];
