/** Awards — from acestar.my/awards ("Success Highlights"). Titles tidied; issuer added for context. */
import type { Img, PageHero } from "@/content/solutions/types";
import { aboutAsset } from "./assets";

export type AwardKind = "partner" | "business";
export type Award = { title: string; issuer: string; kind: AwardKind; image?: Img };
export type AwardYear = { year: number; awards: Award[] };

const a = (title: string, issuer: string, kind: AwardKind, legacy: string): Award => ({
  title,
  issuer,
  kind,
  image: aboutAsset(legacy, `${issuer}: ${title}`),
});

export const awardYears: AwardYear[] = [
  {
    year: 2026,
    awards: [
      a("Best Marketing Initiative of the Year", "Adobe", "partner", "2026/07/adobe-awards-logo.png"),
      a("SEA Top Platinum Partner of the Year", "Adobe", "partner", "2026/07/adobe-awards-logo.png"),
    ],
  },
  {
    year: 2025,
    awards: [
      a("Top Growth R&I Partner", "Lenovo", "partner", "2026/07/lenovo-awards-logo.png"),
      a("Top Volume Business Contributor Award", "Autodesk", "partner", "2026/07/autodesk-awards-logo.png"),
    ],
  },
  {
    year: 2024,
    awards: [
      a("SME Achievement, CNY Dinner 2024", "SME Malaysia", "business", "2026/07/sme-awards-logo.png"),
      a("Most Active Supplier", "MCMC", "partner", "2026/07/mcmc-awards-logo.png"),
    ],
  },
  {
    year: 2023,
    awards: [
      a("Training Recognition Partner Award 2023", "PIKOM Academy", "partner", "2026/07/pikom-awards-logo.png"),
      a("Innovate to Elevate", "ASUS", "partner", "2026/07/asus-awards-logo.png"),
      a("Top Partner for Gross New Revenue", "Adobe", "partner", "2026/07/adobe-awards-logo.png"),
      a("Marketing Campaign of the Year", "Certiport", "partner", "2026/07/certiport-awards-logo.png"),
    ],
  },
  {
    year: 2022,
    awards: [
      a("Women of Excellence Awards 2022", "MCWEA", "business", "2026/07/mcwea-awards-logo.png"),
      a("Adobe Platinum Reseller", "Adobe", "partner", "2026/07/adobe-awards-logo.png"),
      a("Top Partner for Gross New Revenue", "Adobe", "partner", "2026/07/adobe-awards-logo.png"),
      a("Creativity is the Future Award", "Certiport", "partner", "2026/07/certiport-awards-logo.png"),
    ],
  },
  {
    year: 2021,
    awards: [a("Top Seller FY20 (Gross New Revenue)", "Adobe", "partner", "2021/11/Adobe-top-seller-FY20.png")],
  },
  {
    year: 2020,
    awards: [
      a("Entrepreneur of the Year 2020, Top Nominee", "EY", "business", "2021/11/EY-Entrepreneur-of-the-year-2020.png"),
    ],
  },
  {
    year: 2019,
    awards: [
      a(
        "Malaysia System Integration Company of the Year",
        "Frost & Sullivan Best Practices Awards",
        "business",
        "2021/11/Frost-Sullivan.png",
      ),
      a("Enterprise 50 (E50) Award 2019", "Enterprise 50", "business", "2021/11/e50-2019.png"),
      a(
        "Certificate of Recognition: Growth Excellence",
        "Star Outstanding Business Awards (SOBA)",
        "business",
        "2021/11/Soba.png",
      ),
      a(
        "Certificate of Recognition: Most Awards Won",
        "Star Outstanding Business Awards (SOBA)",
        "business",
        "2021/11/SOBA-10-years-most-award-won.png",
      ),
    ],
  },
  {
    year: 2018,
    awards: [
      a("Entrepreneur of the Year 2018, Top Nominee", "EY", "business", "2021/11/EY-Enterpreneur-of-the-year-2018.png"),
      a("McMillan Woods Global Awards 2018", "McMillan Woods", "business", "2021/11/MMC-Millan-woods-global-award.png"),
      a(
        "Employer Excellence Award",
        "SME Platinum Business Awards 2018",
        "business",
        "2021/11/Platinum-business-award-2018.png",
      ),
    ],
  },
  {
    year: 2017,
    awards: [
      a(
        "SME & Entrepreneurship Business Award 2017",
        "SME & Entrepreneurship Business Awards",
        "business",
        "2021/11/SME-enterpreneurship-business-award.png",
      ),
    ],
  },
  {
    year: 2016,
    awards: [
      a(
        "Digital and Technology",
        "Sin Chew Business Excellence Awards 2016",
        "business",
        "2021/11/Business-Excellent-Awards-2016.png",
      ),
      a(
        "Services Excellence Award",
        "Platinum Business Awards 2016",
        "business",
        "2021/11/Platinum-business-award-2016.png",
      ),
      a(
        "Female Entrepreneur, Grand Winner",
        "Star SOBA 2016",
        "business",
        "2021/11/SOBA-2016-grand-winner-female-entrepreneur-of-the-year.png",
      ),
      a("Best Employer, Silver Award", "Star SOBA 2016", "business", "2021/11/SOBA-2016-winnar-best-employer.png"),
    ],
  },
  {
    year: 2015,
    awards: [
      a("APAC Partner of the Year Award", "Adobe", "partner", "2021/11/Adobe-award.png"),
      a("Most Promising Award", "Star SOBA 2015", "business", "2021/11/SOBA-most-promising-award-2015.png"),
      a(
        "Young Entrepreneur Award",
        "SME Recognition Awards 2015",
        "business",
        "2021/11/SME-Recognition-Award-2015.png",
      ),
    ],
  },
  {
    year: 2014,
    awards: [
      a("Partner of the Year Award", "Adobe", "partner", "2021/11/Adobe-Partner-of-the-year-award.png"),
      a("Top Creative Partner", "Adobe", "partner", "2021/11/Adobe-Top-Creative-Partner.png"),
      a("Top Partner in Malaysia", "Adobe", "partner", "2021/11/Adobe-1.png"),
      a("Women Entrepreneur", "SME Recognition Award", "business", "2021/11/SME-Recognition-Award-2014.png"),
    ],
  },
  {
    year: 2013,
    awards: [a("Rising Star", "SME Recognition Award", "business", "2021/11/SME-Recognition-Award-2013.png")],
  },
];

export const awardCount = awardYears.reduce((n, y) => n + y.awards.length, 0);
const adobeCount = awardYears.reduce((n, y) => n + y.awards.filter((x) => x.issuer === "Adobe").length, 0);
const firstYear = awardYears[awardYears.length - 1].year;

export const hero: PageHero = {
  eyebrow: "Awards & Recognition",
  title: "Success highlights.",
  accent: "highlights.",
  lead: `${awardCount} awards and recognitions since ${firstYear}, from our technology partners and Malaysia's leading business awards.`,
  primary: { label: "See the timeline", href: "#timeline" },
  secondary: { label: "Company Profile", href: "/about" },
  crumbs: [{ label: "Home", href: "/" }, { label: "About Us" }, { label: "Awards" }],
};

export const quote = {
  text: "Success isn't magic or hocus-pocus. It's simply learning how to focus!",
  author: "Ray Dalio",
};

export const stats = [
  { value: `${awardCount}`, label: "Awards and recognitions" },
  { value: `${adobeCount}`, label: "Awards from Adobe, including SEA Top Platinum Partner of the Year" },
  { value: `${firstYear}–${awardYears[0].year}`, label: "Recognised every year for over a decade" },
];

/** Logos shown on the hero wall (distinct issuers, newest first). */
export const heroWall = [
  "2026/07/adobe-awards-logo.png",
  "2026/07/lenovo-awards-logo.png",
  "2026/07/autodesk-awards-logo.png",
  "2021/11/EY-Entrepreneur-of-the-year-2020.png",
  "2021/11/e50-2019.png",
  "2021/11/SOBA-10-years-most-award-won.png",
  "2026/07/certiport-awards-logo.png",
  "2021/11/Adobe-Partner-of-the-year-award.png",
  "2026/07/asus-awards-logo.png",
]
  .map((p) => aboutAsset(p, ""))
  .filter((p) => p !== undefined);
