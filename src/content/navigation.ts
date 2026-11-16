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
    description: "OpenAI, Claude, Copilot & AI agents",
  },
  {
    label: "Creative software",
    href: "/creative-software/",
    description: "Adobe, Autodesk, Resolume & Boris FX",
    sub: [{ label: "Adobe Creative Cloud Pro", href: "/creative-cloud/" }],
  },
  {
    label: "High-performance computing",
    href: "/high-performance-computer/",
    description: "Apple, HP, Lenovo, Dell & Asus",
    sub: [{ label: "Apple Solution", href: "/solution/apple/" }],
  },
  {
    label: "Digital workflow",
    href: "/digital-workflow/",
    description: "Document Cloud, Microsoft 365 & Zoom",
    sub: [{ label: "Adobe Acrobat", href: "/adobe-acrobat/" }],
  },
  {
    label: "Training & certification",
    href: "/solutions/training-certification",
    description: "ACP, MOS, ACU, Swift, ESB & AI skills",
  },
  {
    label: "TechCare",
    href: "/techcare",
    description: "IT as a Service subscription",
  },
];

export const mainNav: NavItem[] = [
  { label: "Solutions", href: "/creative-software/", children: solutionLinks },
  { label: "Partners", href: "/clients-partners/" },
  // { label: "TechCare", href: "/techcare" },
  { label: "About Us", href: "/company-profile/", children: aboutNavLinks },
  { label: "Media", href: "/news", children: mediaNavLinks },
  { label: "Careers", href: "/career/" },
  { label: "Tech Support", href: "/techsupport/" },
];

/** Footer columns in the new design. */
export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Solutions",
    links: [
      { label: "AI Solutions", href: "/solutions/ai" },
      { label: "Creative Software", href: "/creative-software/" },
      { label: "High-Performance Computing", href: "/high-performance-computer/" },
      { label: "Digital Workflow", href: "/digital-workflow/" },
      { label: "Training & Certification", href: "/solutions/training-certification" },
      { label: "TechCare", href: "/techcare" },
    ],
  },
  { title: "Media", links: mediaNavLinks.map(({ label, href }) => ({ label, href })) },
  {
    title: "Company",
    links: [
      { label: "Company Profile", href: "/company-profile/" },
      { label: "Awards", href: "/awards/" },
      { label: "Clients & Partners", href: "/clients-partners/" },
      { label: "Careers", href: "/career/" },
      { label: "Contact Us", href: "/contact-acestarian/" },
      { label: "Tech Support", href: "/techsupport/" },
    ],
  },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  { title: "Solutions", links: solutionLinks },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company-profile/" },
      { label: "Awards", href: "/awards/" },
      { label: "News", href: "/news" },
      { label: "Careers", href: "/career/" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact", href: "/contact-acestarian/" },
      { label: "Tech support", href: "/techsupport/" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/acestar-privacy-policies/" },
  { label: "Terms", href: "/terms-of-use/" },
  { label: "Refunds", href: "/return-and-refund-policy/" },
  { label: "Delivery", href: "/delivery-policy/" },
];
