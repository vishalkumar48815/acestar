/** Adobe Creative Cloud Pro — content from acestar.my/creative-cloud (text tidied). */
import { asset } from "./assets";
import type { CompareTable, Feature, PageHero } from "./types";

export const hero: PageHero = {
  eyebrow: "Top Adobe Reseller & Platinum Partner in Malaysia",
  title: "Where creativity meets intelligence.",
  accent: "meets intelligence.",
  lead: "Acestar is Malaysia's top Adobe partner and Platinum Reseller since 2008, with more than 150,000 Adobe licences deployed nationwide for businesses, educational institutions and the public sector, with genuine software and Adobe expert consultation.",
  primary: { label: "Talk to us", href: "/contact" },
  secondary: { label: "See plans", href: "#plans" },
  image: asset("2025/10/2.png", "Hand drawing with a stylus on a tablet as colour flows from the screen"),
  imageFit: "backdrop",
  crumbs: [
    { label: "Home", href: "/" },
    { label: "Creative Software", href: "/solutions/creative-software" },
    { label: "Adobe Creative Cloud Pro" },
  ],
  chips: ["Adobe Top Seller FY20", "Only Adobe Platinum Partner", "Since 2008"],
};

export const trust = {
  body: "Recognised as Adobe Top Seller FY20 and the only Adobe Platinum Partner, Acestar is the trusted Adobe reseller in Malaysia to buy, renew or manage Adobe licences with confidence, including Creative Cloud migration and deployment.",
  stats: [
    { value: "150,000+", label: "Adobe licences deployed" },
    { value: "17+", label: "Years of Adobe expertise" },
    { value: "#1", label: "Adobe Platinum Partner in Malaysia" },
  ],
};

export const apps: Feature[] = [
  {
    title: "Acrobat Pro",
    body: "Create, edit, review and sign PDFs.",
    icon: asset("2025/10/Adobe_Acrobat_DC_logo_2020.svg.png", ""),
  },
  { title: "Photoshop", body: "Edit photos and create stunning images.", icon: asset("2025/10/ALL-LOGO-17.png", "") },
  { title: "Premiere Pro", body: "Edit, trim and craft your videos.", icon: asset("2025/10/ALL-LOGO-21.png", "") },
  {
    title: "Illustrator",
    body: "Create logos, designs, graphics and more.",
    icon: asset("2025/10/ALL-LOGO-18.png", ""),
  },
  {
    title: "Adobe Express",
    body: "Your all-in-one AI content creation app.",
    icon: asset("2025/10/Adobe_Express_logo_RGB_1024px.png", ""),
  },
  {
    title: "Adobe Firefly",
    body: "Create beautiful images in just a few words.",
    icon: asset("2025/10/Adobe_Firefly_Logo.svg.png", ""),
  },
];

export const upgrade = {
  eyebrow: "Teams before, Pro now",
  title: "Creative Cloud Teams is now Creative Cloud Pro.",
  body: "From September 2025, Adobe Creative Cloud for Teams (CC Teams) upgrades to the new Adobe Creative Cloud Pro (CC Pro).",
  points: [
    "Enhance branding through the unlimited possibilities of Adobe AI (Adobe Firefly)",
    "Complete control over licence assignment and removal",
    "The full Creative Cloud app collection plus advanced AI features, at a better price",
  ],
};

export const compare: CompareTable = {
  caption: "Compare Creative Cloud plans",
  columns: [
    "Creative Cloud Pro for teams",
    "Creative Cloud Pro Plus for teams",
    "Creative Cloud for enterprise, Edition 4",
  ],
  groups: [
    {
      title: "Creative features",
      rows: [
        { label: "Creative apps and services", cells: [true, true, true] },
        {
          label: "Adobe Firefly standard generative AI features (image and vector)",
          cells: ["Unlimited", "Unlimited", "Unlimited + Object Composites, Style Kits"],
        },
        { label: "4,000 generative credits for premium generative AI (video and audio)", cells: [true, true, true] },
        { label: "Adobe Stock: unlimited standard photos, 3D and design assets", cells: [false, true, true] },
        { label: "Adobe Stock licence type", cells: [false, "Enhanced", "Extended"] },
        { label: "Sessions with Adobe product experts", cells: ["2 per user/year", "2 per user/year", "Unlimited"] },
        {
          label: "IP indemnification (Adobe Stock and Firefly)",
          cells: [false, "$10k/asset", "VIP: $10k/asset · ETLA: greater of $3M or 2× fees"],
        },
      ],
    },
    {
      title: "Admin features",
      rows: [
        { label: "Enterprise-grade security and support", cells: ["Limited", "Limited", "Unlimited"] },
        {
          label: "Admin roles",
          cells: [
            "System Admin only",
            "System Admin only",
            "System, Product, Product Profile, User Group, Deployment, Support",
          ],
        },
        { label: "Single sign-on (SSO)", cells: [false, false, true] },
        { label: "Control access to services by group", cells: [false, false, true] },
        { label: "Personalised onboarding and deployment", cells: [false, false, true] },
      ],
    },
  ],
};

export const whatsNew: Feature[] = [
  {
    title: "Adobe Firefly",
    body: "Create images, video, audio and vector graphics. Ideate, create and collaborate with Firefly Boards, and work with the latest commercially safe Firefly generative AI models.",
    image: asset(
      "2025/10/Firefly-white-cat-cute-and-fat-happy-skydive-34230.jpg",
      "A happy white cat skydiving, generated with Adobe Firefly",
    ),
  },
  {
    title: "Adobe Express",
    body: "Create videos, posters, flyers, ads and more within minutes, no download needed. AI generative tools, AI-powered templates and commercially safe assets keep you consistent across every platform.",
    image: asset("2025/10/owl.png", "Vivid illustrated owl created with Adobe Express"),
  },
];

export const plans = {
  eyebrow: "Pick a plan",
  title: "Pick a plan to start creating.",
  body: "Start with just one app or save big with Creative Cloud Pro.",
  items: [
    {
      name: "VIP Marketplace",
      audience: "Business · Education · Government",
      points: [
        "Choose an annual or extended subscription with a 3-year commitment",
        "Predictable costs with auto-renewal unless opted out",
      ],
    },
    {
      name: "Enterprise Term Licence Agreement (ETLA)",
      audience: "Enterprise",
      points: ["Annual subscription with a 3-year term", "Annual renewal and true-up order"],
    },
  ],
};

export const discounts = {
  eyebrow: "Volume pricing",
  title: "Adobe Creative Cloud licensing discount levels.",
  rows: [
    { level: "1", quantity: "1–9" },
    { level: "2", quantity: "10–49" },
    { level: "3", quantity: "50–99" },
    { level: "4", quantity: "100+" },
  ],
  note: "Discount level is based on the qualifying number of named-user licences.",
};
