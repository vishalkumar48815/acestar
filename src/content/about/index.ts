/**
 * "About Us" menu, mirroring the old acestar.my About menu:
 * Company Profile · Awards · Clients & Partners.
 * Used by the header dropdown, mobile menu, footer, sitemap and the "explore" cards.
 */
export const aboutLinks = [
  {
    key: "profile",
    label: "Company Profile",
    href: "/company-profile/",
    description: "Who we are, our vision & mission",
  },
  {
    key: "awards",
    label: "Awards",
    href: "/awards/",
    description: "Success highlights",
  },
  {
    key: "clients",
    label: "Clients & Partners",
    href: "/clients-partners/",
    description: "Who we serve and work with",
  },
] as const;

export const aboutRoutes = aboutLinks.map((l) => l.href);
