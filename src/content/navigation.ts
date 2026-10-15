import type { NavItem, NavLink } from "@/types/content";

export const solutionLinks: NavLink[] = [
  {
    label: "Creative software",
    href: "/solutions/creative-software",
    description: "Adobe Creative Cloud & Autodesk",
  },
  {
    label: "Workstations",
    href: "/solutions/workstations",
    description: "Apple, HP, Lenovo & Dell",
  },
  {
    label: "Digital workflow",
    href: "/solutions/digital-workflow",
    description: "Acrobat Sign, Microsoft 365 & Zoom",
  },
];

export const mainNav: NavItem[] = [
  { label: "Solutions", href: "/solutions/creative-software", children: solutionLinks },
  { label: "TechCare", href: "/techcare" },
  { label: "About", href: "/about" },
  { label: "Stories", href: "/stories" },
  { label: "Careers", href: "/careers" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  { title: "Solutions", links: [...solutionLinks, { label: "TechCare", href: "/techcare" }] },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Awards", href: "/about#awards" },
      { label: "Stories", href: "/stories" },
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
