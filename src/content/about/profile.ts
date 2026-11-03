/** Company Profile — content from acestar.my/company-profile (text lightly tidied). */
import type { PageHero, Stat } from "@/content/solutions/types";
import { aboutAsset } from "./assets";

export const hero: PageHero = {
  eyebrow: "Company Profile",
  title: "Your holistic IT partner, since 2008.",
  accent: "since 2008.",
  lead: "Acestar Sdn. Bhd. is a leading holistic IT solutions provider in the region, specialising in Creative Software, High Performance Computers and Digital Workflow Management.",
  primary: { label: "Talk to us", href: "/contact" },
  secondary: { label: "Our awards", href: "/about/awards" },
  image: aboutAsset(
    "2025/12/WhatsApp-Image-2025-12-26-at-6.05.38-PM.jpeg",
    "The Acestar office wall: Do It Differently",
  ),
  imageFit: "cover",
  crumbs: [{ label: "Home", href: "/" }, { label: "About Us" }, { label: "Company Profile" }],
  chips: ["Adobe's only Platinum Partner in Malaysia", "Certiport Sole Distributor", "Est. 2008"],
};

export const stats: Stat[] = [
  { value: "5,000+", label: "Clients across education, enterprise, SME and the public sector" },
  { value: "70%+", label: "Of higher-education institutions in Malaysia covered" },
  { value: "150,000+", label: "Adobe Creative Cloud licences deployed to date" },
];

export const ambition = [
  "We will be even more focused and elite in delivering our services and specialisation.",
  "We will take the IT industry by storm, in a class of its own.",
];

export const vision = {
  title: "Our Vision",
  body: "To impact business growth every day, and power the workforce to be a happy, productive community.",
};

export const mission = {
  title: "Our Mission",
  body: "To help every workforce achieve more by taking care of their IT needs.",
};

export const story = {
  title: "A partner to the world's leading technology brands.",
  paragraphs: [
    "Acestar is Adobe's only Platinum Partner in Malaysia, and a prominent partner to multinational brands such as HP (Hewlett Packard), Lenovo, Apple and Microsoft, to name a few.",
    "We have served more than 5,000 clients across the education, enterprise, SME and public sector markets, covering more than 70% of higher-education institutions in Malaysia. More than 150,000 Adobe Creative Cloud licences have been deployed to date. As one of the first to advocate cloud licensing, we provide best-in-class Adobe Creative Cloud implementation and workshops as a value-added service to our clients.",
    "Setting ourselves apart from the conventional, Acestar empowers your workforce and operating procedures with automation and digitisation through frictionless digital tools, helping companies build a super-efficient working ecosystem that improves operational performance, maximises resources and lets you scale rapidly. Expect carefree, hassle-free and always in control, meeting your company's immediate needs and future expectations.",
  ],
  image: aboutAsset("2026/07/web-08.jpg", "The Acestar team with partners at an industry event"),
};

export const training = {
  eyebrow: "Training & community",
  title: "Building Malaysia's creative and digital talent.",
  body: "For professional training and certification, Acestar is the appointed Certiport Sole Distributor in Malaysia, providing some of the certifications most in demand by employers, such as Adobe Certified Professional and Microsoft Office Specialist. Acestar has also paved the way for the country's creative multimedia industry, spearheading notable creative workshops and events.",
  highlights: [
    {
      title: "Certiport Sole Distributor",
      body: "Adobe Certified Professional, Microsoft Office Specialist and more, across Malaysia.",
    },
    {
      title: "ACP Championship Malaysia",
      body: "The national Adobe Certified Professional championship for students.",
    },
    { title: "SEA Connect Creative Conference", body: "Bringing the region's creative community together." },
  ],
  photos: [
    aboutAsset("2026/07/web-11.jpg", "Micro-Credentials Education Summit, stage celebration with confetti"),
    aboutAsset("2026/07/web-12.jpg", "Malaysia National Championship 2024 Grand Finale"),
    aboutAsset(
      "2022/09/acp-432-1.webp",
      "Adobe Certified Professional and Microsoft Office Specialist Championship Malaysia 2022",
    ),
    aboutAsset("2026/07/web-24.jpg", "Winners on stage at the Micro-Credentials Education Summit"),
    aboutAsset("2026/07/web-20-1.jpg", "Participants at the Micro-Credentials Education Summit"),
  ].filter((p) => p !== undefined),
};

export const leadership = {
  eyebrow: "Leadership",
  name: "Natalie Sit",
  role: "Group CEO",
  body: "Natalie Sit continues to foresee new heights and great expansion, adding TechCare and Saleslive to the business as new ventures: an IT-as-a-Service model and an advanced CRM tool respectively. Built on Acestar's formidable relationships with partners and combined expertise across cloud licensing, managed services, business software and high-performance workstations, these homegrown innovations each set themselves in a class of their own.",
  ventures: [
    { label: "TechCare", body: "IT as a Service", href: "/techcare" },
    { label: "Saleslive", body: "Advanced CRM", href: "https://www.sales.live/", external: true },
  ],
};

/** "The next chapter of Acestar encapsulates…" */
export const pillars = ["Simplicity.", "Scalability.", "Sustainability.", "Supportive."];
