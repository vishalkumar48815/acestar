/**
 * The "Our Products & Solutions" tree, mirroring the old acestar.my menu (plus AI Solutions):
 * AI Solutions
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
    key: "ai",
    label: "AI Solutions",
    href: "/solutions/ai",
    description: "OpenAI, Claude, Copilot & AI agents",
  },
  {
    key: "creative",
    label: "Creative Software",
    href: "/creative-software/",
    description: "Adobe, Autodesk, Resolume & Boris FX",
    children: [
      {
        label: "Adobe Creative Cloud Pro",
        href: "/creative-cloud/",
        description: "Plans, licensing & discount levels",
      },
    ],
  },
  {
    key: "computers",
    label: "High-Performance Computing & TechCare",
    href: "/high-performance-computer/",
    description: "Apple, HP, Lenovo, Dell & Asus",
    children: [
      {
        label: "Apple Solution",
        href: "/solution/apple/",
        description: "Apple Authorised Reseller, end to end",
      },
    ],
  },
  {
    key: "workflow",
    label: "Digital Workflow",
    href: "/digital-workflow/",
    description: "Document Cloud, Microsoft 365 & more",
    children: [
      {
        label: "Adobe Acrobat",
        href: "/adobe-acrobat/",
        description: "Acrobat Studio, Pro & Reader",
      },
    ],
  },
  {
    key: "training",
    label: "Training & Certification",
    href: "/solutions/training-certification",
    description: "ACP, MOS, ACU, Swift, ESB & AI skills",
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
