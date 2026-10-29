/**
 * The "Our Products & Solutions" tree, mirroring the old acestar.my menu:
 * Creative Software → Adobe Creative Cloud Pro
 * High Performance Computers → Apple Solution
 * Digital Workflow Management → Adobe Acrobat
 * TechCare
 * Used by the header dropdown, mobile menu, footer, sitemap and "explore more" links.
 */
export type SolutionNode = {
  key: string;
  label: string;
  href: string;
  description: string;
  children?: { label: string; href: string; description: string }[];
};

export const solutionTree: SolutionNode[] = [
  {
    key: "creative",
    label: "Creative Software",
    href: "/solutions/creative-software",
    description: "Adobe, Autodesk, Resolume & Boris FX",
    children: [
      {
        label: "Adobe Creative Cloud Pro",
        href: "/solutions/creative-software/adobe-creative-cloud-pro",
        description: "Plans, licensing & discount levels",
      },
    ],
  },
  {
    key: "computers",
    label: "High Performance Computers",
    href: "/solutions/workstations",
    description: "Apple, HP, Lenovo, Dell & Asus",
    children: [
      {
        label: "Apple Solution",
        href: "/solutions/workstations/apple",
        description: "Apple Authorised Reseller, end to end",
      },
    ],
  },
  {
    key: "workflow",
    label: "Digital Workflow Management",
    href: "/solutions/digital-workflow",
    description: "Document Cloud, Microsoft 365 & more",
    children: [
      {
        label: "Adobe Acrobat",
        href: "/solutions/digital-workflow/adobe-acrobat",
        description: "Acrobat Studio, Pro & Reader",
      },
    ],
  },
  {
    key: "techcare",
    label: "TechCare",
    href: "/techcare",
    description: "IT as a Service subscription",
  },
];

/** Every solution route (for the sitemap). */
export const solutionRoutes = solutionTree.flatMap((n) => [n.href, ...(n.children ?? []).map((c) => c.href)]);
