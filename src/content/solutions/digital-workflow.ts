/** Digital Workflow Management — content from acestar.my/digital-workflow (text tidied). */
import { asset } from "./assets";
import type { Cta, Feature, Img, PageHero, SolutionBrief } from "./types";

export const hero: PageHero = {
  eyebrow: "Simplify Work. Accelerate Business.",
  title: "Digital Workflow Solutions in Malaysia.",
  accent: "in Malaysia.",
  lead: "Modern businesses need faster collaboration, smarter document management and secure digital workflows. Acestar modernizes everyday processes with Adobe Acrobat, Acrobat Studio, AI-powered documents, e-signatures and Microsoft 365.",
  primary: { label: "Talk to Our Workflow Experts", href: "/contact-acestarian/" },
  secondary: { label: "Adobe Acrobat", href: "/adobe-acrobat/" },
  image: asset(
    "2021/12/Digital-Workflow-Background.png",
    "Illustration of a team collaborating around a digital dashboard",
  ),
  imageFit: "backdrop",
  crumbs: [{ label: "Home", href: "/" }, { label: "Solutions" }, { label: "Digital Workflow" }],
  chips: ["Adobe Document Cloud", "Microsoft 365", "Faronics", "Video Conferencing"],
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
    link: { label: "Explore Adobe Acrobat", href: "/adobe-acrobat/" },
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

/** Acestar 3.0 brief: SEO copy, offerings and "Why Acestar". */
export const brief: SolutionBrief = {
  meta: {
    title: "Adobe Acrobat Sign, Acrobat Studio and Microsoft 365 Malaysia",
    description:
      "Streamline business workflows with Adobe Acrobat Sign, Acrobat Studio, AI Assistant and Microsoft 365. Discover digital productivity solutions from Acestar Malaysia.",
    keywords: [
      "Adobe Acrobat Sign Malaysia",
      "Adobe Acrobat Studio Malaysia",
      "Acrobat AI Assistant Malaysia",
      "Microsoft 365 reseller Malaysia",
      "e-signature solutions Malaysia",
      "digital workflow automation Malaysia",
      "document management solutions Malaysia",
    ],
  },
  overview: {
    eyebrow: "Simplify work",
    title: "Smarter documents. Faster approvals. Connected teams.",
    paragraphs: [
      "Modern businesses need faster collaboration, smarter document management and secure digital workflows.",
      "Acestar helps organizations modernize everyday business processes through Adobe Acrobat, Acrobat Studio, AI-powered document productivity, electronic signatures and Microsoft 365.",
      "Our solutions reduce manual processes, simplify collaboration and help employees work more efficiently.",
    ],
    offeringsTitle: "Our Digital Workflow Solutions",
    offerings: [
      {
        title: "Adobe Acrobat Studio",
        body: "Bring PDF productivity, AI-powered document experiences and creative tools together in a connected workspace.",
      },
      {
        title: "Adobe Acrobat AI Assistant",
        body: "Help employees understand, summarize and work with document information more efficiently using AI-powered assistance.",
      },
      {
        title: "Adobe Acrobat Sign",
        body: "Digitize approval and signature processes to reduce paperwork, accelerate document turnaround and support more efficient business operations.",
      },
      {
        title: "Microsoft 365",
        body: "Enable connected productivity through Microsoft Teams, Outlook, Word, Excel, PowerPoint, SharePoint and other Microsoft 365 services.",
      },
      {
        title: "Intelligent Document Workflows",
        body: "Improve document preparation, review, sharing, approvals and collaboration across teams.",
      },
      {
        title: "Digital Workflow Consultation",
        body: "Identify opportunities to replace manual processes with more efficient digital workflows and connected productivity tools.",
      },
    ],
  },
  why: {
    title: "Why Choose Acestar?",
    paragraphs: [
      "As an established technology solutions provider and Adobe Platinum Partner in Malaysia, Acestar helps organizations select and implement digital workflow solutions suited to their business needs.",
      "We support organizations seeking to modernize document processes, improve collaboration and make better use of their software investments.",
    ],
    highlights: [
      { title: "Platinum Partner", body: "Adobe Platinum Partner in Malaysia." },
      { title: "Acrobat & Sign", body: "AI-powered documents and e-signatures." },
      { title: "Microsoft 365", body: "Connected productivity for every team." },
      { title: "Consult first", body: "We map your processes before we recommend." },
    ],
  },
  closing: {
    eyebrow: "Work smarter",
    title: "Transform the Way Your Business Works",
    body: "Discover smarter document management, AI-powered productivity and digital collaboration with Acestar.",
    cta: { label: "Explore Digital Workflow Solutions", href: "/contact-acestarian/" },
  },
};
