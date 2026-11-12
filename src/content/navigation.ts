import { aboutLinks } from "@/content/about";
import { mediaLinks } from "@/content/newsroom";
import type { NavItem, NavLink } from "@/types/content";

/** Media dropdown: News, Blog, Gallery (as on the old site). */
export const mediaNavLinks: NavLink[] = mediaLinks.map(({ label, href, description }) => ({
  label,
  href,
  description,
}));

/** About Us dropdown: Company Profile, Awards, Clients & Partners. */
export const aboutNavLinks: NavLink[] = aboutLinks.map(({ label, href, description }) => ({
  label,
  href,
  description,
}));

export const solutionLinks: NavLink[] = [
  {
    label: "AI solutions",
    href: "/solutions/ai",
    description: "Copilot, ChatGPT, Acrobat Studio & Firefly",
  },
  {
    label: "Creative software",
    href: "/solutions/creative-software",
    description: "Adobe, Autodesk, Resolume & Boris FX",
    sub: [{ label: "Adobe Creative Cloud Pro", href: "/solutions/creative-software/adobe-creative-cloud-pro" }],
  },
  {
    label: "High performance computers",
    href: "/solutions/workstations",
    description: "Apple, HP, Lenovo, Dell & Asus",
    sub: [{ label: "Apple Solution", href: "/solutions/workstations/apple" }],
  },
  {
    label: "Digital workflow",
    href: "/solutions/digital-workflow",
    description: "Document Cloud, Microsoft 365 & Zoom",
    sub: [{ label: "Adobe Acrobat", href: "/solutions/digital-workflow/adobe-acrobat" }],
  },
  {
    label: "TechCare",
    href: "/techcare",
    description: "IT as a Service subscription",
  },
];

export const mainNav: NavItem[] = [
  { label: "Solutions", href: "/solutions/creative-software", children: solutionLinks },
  // { label: "TechCare", href: "/techcare" },
  { label: "About Us", href: "/about", children: aboutNavLinks },
  { label: "Media", href: "/news", children: mediaNavLinks },
  { label: "Careers", href: "/careers" },
  { label: "Tech Support", href: "/support" },
];

/** Footer columns in the new design. */
export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Solutions",
    links: [
      { label: "AI Solutions", href: "/solutions/ai" },
      { label: "Creative Software", href: "/solutions/creative-software" },
      { label: "High Performance Computers", href: "/solutions/workstations" },
      { label: "Digital Workflow", href: "/solutions/digital-workflow" },
      { label: "TechCare", href: "/techcare" },
    ],
  },
  { title: "Media", links: mediaNavLinks.map(({ label, href }) => ({ label, href })) },
  {
    title: "Company",
    links: [
      { label: "Company Profile", href: "/about" },
      { label: "Awards", href: "/about/awards" },
      { label: "Clients & Partners", href: "/about/clients-partners" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
      { label: "Tech Support", href: "/support" },
    ],
  },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  { title: "Solutions", links: solutionLinks },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Awards", href: "/about/awards" },
      { label: "News", href: "/news" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Tech support", href: "/support" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Refunds", href: "/legal/refunds" },
  { label: "Delivery", href: "/legal/delivery" },
];
