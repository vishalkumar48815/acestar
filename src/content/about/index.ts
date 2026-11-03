/**
 * "About Us" menu, mirroring the old acestar.my About menu:
 * Company Profile · Awards · Clients & Partners.
 * Used by the header dropdown, mobile menu, footer, sitemap and the "explore" cards.
 */
export const aboutLinks = [
  {
    key: "profile",
    label: "Company Profile",
    href: "/about",
    description: "Who we are, our vision & mission",
  },
  {
    key: "awards",
    label: "Awards",
    href: "/about/awards",
    description: "Success highlights since 2013",
  },
  {
    key: "clients",
    label: "Clients & Partners",
    href: "/about/clients-partners",
    description: "Who we serve and work with",
  },
] as const;

export const aboutRoutes = aboutLinks.map((l) => l.href);
