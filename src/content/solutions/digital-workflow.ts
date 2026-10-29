/** Digital Workflow Management — content from acestar.my/digital-workflow (text tidied). */
import { site } from "@/content/site";
import { asset } from "./assets";
import type { Cta, Feature, Img, PageHero } from "./types";

export const hero: PageHero = {
  eyebrow: "Digital Workflow Management",
  title: "Absolute efficiency for the hybrid way we work.",
  accent: "the hybrid way we work.",
  lead: "Utilising technology to drive absolute efficiency for today's hybrid working style, with best-in-class consultation and implementation.",
  primary: { label: "Talk to a specialist", href: "/contact" },
  secondary: { label: "Adobe Acrobat", href: "/solutions/digital-workflow/adobe-acrobat" },
  image: asset(
    "2021/12/Digital-Workflow-Background.png",
    "Illustration of a team collaborating around a digital dashboard",
  ),
  imageFit: "backdrop",
  crumbs: [{ label: "Home", href: "/" }, { label: "Solutions" }, { label: "Digital Workflow Management" }],
  chips: ["Adobe Document Cloud", "Microsoft 365", "Faronics", "Saleslive", "Video Conferencing"],
};

export type WorkflowSection = {
  id: string;
  name: string;
  banner?: Img;
  intro: string;
  story?: string;
  highlights?: Feature[];
  icons?: Img[];
  stats?: { value: string; label: string }[];
  partners?: { logo?: Img; name: string; body: string }[];
  link?: Cta;
};

export const sections: WorkflowSection[] = [
  {
    id: "document-cloud",
    name: "Adobe Document Cloud",
    banner: asset("2022/09/Baneer-adobe-document.jpg", "Adobe Document Cloud banner"),
    intro:
      "A whole new document experience. Get important integrations and turn manual document processes into efficient digital ones.",
    story:
      "Review, edit and share on the go, or perform electronic signatures and much more. Your team can take quick action on documents, workflows and tasks across multiple screens and devices, anywhere, any time, on any enterprise app platform. Make Adobe Document Cloud part of your digital transformation strategy.",
    highlights: [
      {
        title: "Adobe Acrobat Sign",
        body: "A cloud-based e-signature service to send, sign, track and manage the signing process from a browser or mobile device, replacing paper and ink with fully automated workflows.",
        icon: asset("2021/11/adobe_sign.png", "Adobe Acrobat Sign icon"),
      },
    ],
    link: { label: "Explore Adobe Acrobat", href: "/solutions/digital-workflow/adobe-acrobat" },
  },
  {
    id: "microsoft-365",
    name: "Microsoft 365",
    banner: asset("2021/12/Microsoft365-Background.png", "Microsoft 365 banner"),
    intro: "The most powerful Microsoft tools in one suite, to help you work, learn, organise, connect and create.",
    story:
      "Collaborate and bring ideas to life with teammates and partners across all your devices, and access and share files wherever you are. Comprehensive, intelligent, enterprise-grade security is built in, so you're protected on any device, from the office to the frontline.",
    icons: [
      asset("2021/11/Microsoft_Word.png", "Word"),
      asset("2021/11/Microsoft_Excel.png", "Excel"),
      asset("2021/11/Microsoft_Powerpoint.png", "PowerPoint"),
      asset("2021/11/Microsoft_Outlook.png", "Outlook"),
      asset("2021/11/Microsoft_Teams.png", "Teams"),
      asset("2021/11/Microsoft_Onedrive.png", "OneDrive"),
      asset("2021/11/Microsoft_Sharepoint.png", "SharePoint"),
    ].filter((x): x is Img => !!x),
  },
  {
    id: "faronics",
    name: "Faronics",
    banner: asset("2021/12/Faronics-Background.png", "Faronics banner"),
    intro: "Remote machine management that makes computers indestructible by eliminating unwanted system changes.",
    story:
      "Faronics Deep Freeze Cloud simplifies the deployment, configuration and administration of computers across locations from a single interface: automatic Windows updates, scheduled maintenance, OS deployment, usage analytics, remote troubleshooting and patented Reboot-to-Restore technology.",
    highlights: [
      {
        title: "Deep Freeze",
        body: "Reboot-to-Restore protection.",
        icon: asset("2021/11/deep_freezw-removebg-preview-1.png", ""),
      },
      { title: "Deploy", body: "OS and software deployment.", icon: asset("2021/11/deploy.png", "") },
      { title: "MDM", body: "Mobile device management.", icon: asset("2021/11/mdm-RB.png", "") },
      { title: "Anti-Virus", body: "Endpoint protection.", icon: asset("2021/11/antivirus-RB.png", "") },
      { title: "Power Save", body: "Energy management.", icon: asset("2021/11/PowerSaveLogo.png", "") },
    ],
    stats: [
      { value: "63%", label: "fewer IT helpdesk tickets" },
      { value: "10M", label: "licences sold" },
      { value: "30,000", label: "customers" },
      { value: "150", label: "countries" },
    ],
  },
  {
    id: "saleslive",
    name: "Saleslive",
    banner: asset("2021/12/Saleslive-Background.png", "Saleslive banner"),
    intro: "A powerful app developed to help your business get more business.",
    story:
      "Saleslive is a cloud-based CRM platform that helps organisations streamline sales processes and operations, from leads to campaigns.",
    link: { label: "Visit sales.live", href: site.externalLinks.saleslive, external: true },
  },
  {
    id: "video-conferencing",
    name: "Video Conferencing",
    banner: asset(
      "2021/12/Video-Conferencing-Solution-Background.jpg",
      "Meeting room with a video conferencing screen",
    ),
    intro: "Meeting rooms and remote setups that make every call feel like you're in the same room.",
    partners: [
      {
        name: "Zoom",
        logo: asset("2021/12/zoom.png", "Zoom"),
        body: "Video meetings, webinars and rooms that keep hybrid teams connected.",
      },
      {
        name: "Jabra",
        logo: asset("2022/09/Jabra_Logo.png", "Jabra"),
        body: "World-leading headsets and communication tools that empower seamless meetings and collaboration, anywhere, any time.",
      },
      {
        name: "Logitech",
        logo: asset("2021/12/Logitech_logo.svg_.png", "Logitech"),
        body: "Conference cameras, webcams and audio-conferencing headsets that make the modern workplace more seamless, productive and fun.",
      },
    ],
  },
];
