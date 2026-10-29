/** Adobe Acrobat — content from acestar.my/adobe-acrobat (text tidied). */
import { asset } from "./assets";
import type { CompareTable, Feature, PageHero } from "./types";

export const hero: PageHero = {
  eyebrow: "Powered by Acestar",
  title: "Reimagine PDF with Adobe Acrobat Studio.",
  accent: "Adobe Acrobat Studio.",
  lead: "The new Adobe Acrobat Studio brings together Acrobat, Express and e-sign to help you work smarter, all in one connected workspace.",
  primary: { label: "Buy Adobe", href: "/contact" },
  secondary: { label: "Book a demo", href: "/contact?topic=acrobat-demo" },
  image: asset(
    "2025/10/20250586_ADO_Acro_Studio_Channel_Collage_1200x960.png",
    "Collage of Acrobat Studio, PDF Spaces and AI Assistant screens",
  ),
  imageFit: "contain",
  crumbs: [
    { label: "Home", href: "/" },
    { label: "Digital Workflow", href: "/solutions/digital-workflow" },
    { label: "Adobe Acrobat" },
  ],
};

export const intro =
  "As Adobe's top partner and only Platinum Partner in Malaysia, Acestar leads the way in helping businesses unlock the full power of the expanded PDF ecosystem. Simplify complex processes, enhance productivity and experience how the modern PDF has evolved: more connected, more intelligent and more creative than ever.";

export const apps: Feature[] = [
  {
    title: "Acrobat Studio",
    body: "The complete set of PDF tools, PDF Spaces, Acrobat AI Assistant and Adobe Express Premium.",
    icon: asset("2025/10/Adobe_Acrobat_DC_logo_2020.svg.png", ""),
  },
  {
    title: "Acrobat Pro",
    body: "The highly secure PDF and e-signature solution with advanced tools.",
    icon: asset("2025/10/Adobe_Acrobat_DC_logo_2020.svg.png", ""),
  },
  {
    title: "Acrobat Reader",
    body: "View, print, share and comment on PDFs.",
    icon: asset("2025/10/Adobe_Acrobat_DC_logo_2020.svg.png", ""),
  },
];

export const whatsNew: Feature[] = [
  {
    title: "Trusted PDF tools, now smarter and faster.",
    body: "Create, edit and sign your documents with a complete set of PDF tools, now with AI summaries and insights.",
    image: asset("2025/10/BG-1-01.png", "Acrobat editing tools with AI summary panel"),
  },
  {
    title: "Unlock insights and next steps with PDF Spaces.",
    body: "Transform files and links into a conversational knowledge hub. Chat with your documents for faster insights, with precise citations.",
    image: asset("2025/10/BG-1-02.png", "PDF Spaces with AI Assistant conversation"),
  },
  {
    title: "Easily create standout content with Adobe Express.",
    body: "Jump-start flyers, infographics or social posts with professionally designed templates, then polish them with simple tools and customised AI images.",
    image: asset("2025/10/BG-1-04.png", "Adobe Express templates inside Acrobat"),
  },
];

export const features: Feature[] = [
  {
    title: "Edit text and images",
    body: "Add text, fix typos, drop in new pages and edit images without switching apps.",
    image: asset("2025/10/BG-1-05.png", ""),
  },
  {
    title: "Create standout content",
    body: "Jump-start flyers, infographics or social posts with easy tools and professional templates.",
    image: asset("2025/10/BG-1-06.png", ""),
  },
  {
    title: "Organise and reorder pages",
    body: "Add and reorder pages by dragging and dropping, and delete any you don't need.",
    image: asset("2025/10/BG-1-07.png", ""),
  },
  {
    title: "Merge and split PDFs",
    body: "Combine PDFs into a single file, or turn one PDF into as many separate files as you want.",
    image: asset("2025/10/BG-1-08.png", ""),
  },
  {
    title: "Comment and mark up",
    body: "Type comments, highlight and underline text, or leave handwritten notes anywhere in your document.",
    image: asset("2025/10/BG-1-09.png", ""),
  },
  {
    title: "Rotate and crop",
    body: "Align pages horizontally or vertically, adjust margins, resize pages and crop out what you don't need.",
    image: asset("2025/10/BG-1-10.png", ""),
  },
];

export const compare: CompareTable = {
  caption: "Compare Acrobat",
  columns: ["Acrobat Studio for teams", "Acrobat Pro for teams", "Acrobat Reader"],
  groups: [
    {
      rows: [
        { label: "Available on", cells: ["Desktop, web & mobile", "Desktop, web & mobile", "Desktop & mobile"] },
        { label: "View, print, share and comment", cells: [true, true, true] },
        { label: "Edit text and images, plus export, protect and organise documents", cells: [true, true, false] },
        { label: "Create web forms, redact, compare and access 70+ features", cells: [true, true, false] },
        {
          label: "Summarise, get insights and ask questions with PDF Spaces and a prebuilt AI Assistant",
          cells: [true, false, false],
        },
        {
          label: "Create standout content with easy design tools and templates in Adobe Express",
          cells: [true, false, false],
        },
      ],
    },
  ],
};

export const perks: Feature[] = [
  { title: "Desktop apps for Mac and Windows", body: "", icon: asset("2025/10/bg-4.png", "") },
  { title: "Works with Microsoft 365 and Dropbox", body: "", icon: asset("2025/10/bg-1.png", "") },
  { title: "SSL security to work and share with confidence", body: "", icon: asset("2025/10/bg-1-03.png", "") },
  { title: "Integrates with Creative Cloud and Adobe Express", body: "", icon: asset("2025/10/bg-3.png", "") },
  { title: "Binding, compliant and secure e-signatures", body: "", icon: asset("2025/10/bg-2.png", "") },
];

export const stories: Feature[] = [
  {
    title: "Strengthening relationships, one contract at a time.",
    body: "How a sales representative uses AI Assistant to understand key terms in contracts and strengthen customer relationships.",
    image: asset("2025/10/adobe-acrobat-studio.png", "Adobe Acrobat Studio"),
  },
  {
    title: "Finding a place to call home is easier with AI.",
    body: "How a real estate agent confidently manages contracts with AI Assistant, so she can focus on her customers.",
    image: asset("2025/10/adobe-ai.png", "Acrobat AI Assistant in a PDF space"),
  },
];

export const closing = {
  eyebrow: "Smarter, faster, safer",
  title: "Subscribe to Adobe Acrobat with Acestar.",
  body: "Unlock your business potential with licensing, deployment and onboarding from Malaysia's only Adobe Platinum Partner.",
};
