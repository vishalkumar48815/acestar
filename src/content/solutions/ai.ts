/**
 * AI Solutions. New page (no equivalent on the old acestar.my).
 * Product descriptions are general; Acestar's role is consultation, licensing, deployment,
 * training and support, as on the other solution pages. Review the copy with the business team.
 * Icons are the vendors' marks (public/images/partners/ai).
 */
import type { Img, PageHero, Step } from "./types";

const icon = (file: string, alt: string): Img => ({ src: `/images/partners/ai/${file}`, width: 96, height: 96, alt });

export const hero: PageHero = {
  eyebrow: "AI Solutions",
  title: "Practical AI that makes your team better at work.",
  accent: "better at work.",
  lead: "We help you choose the right AI tools, roll them out safely and get your people using them every day.",
  primary: { label: "Talk to an AI specialist", href: "/contact" },
  secondary: { label: "Explore use cases", href: "#use-cases" },
  // Hummingbird artwork from the acestar.my Adobe Firefly banner (logo removed)
  image: { src: "/images/solutions/ai/ai-hero.webp", width: 3010, height: 845, alt: "" },
  imageFit: "backdrop",
  crumbs: [{ label: "Home", href: "/" }, { label: "Solutions" }, { label: "AI Solutions" }],
  chips: ["Microsoft Copilot", "OpenAI", "Adobe Acrobat Studio", "Adobe Firefly", "GitLab", "Twilio"],
};

export type AiTool = {
  name: string;
  vendor?: string;
  tag: string;
  body: string;
  icon: Img;
  href?: string;
};

/** The AI tools we deliver, shown as one compact grid. */
export const tools: AiTool[] = [
  {
    name: "Acrobat Studio",
    vendor: "Adobe",
    tag: "Documents",
    body: "Acrobat Pro with AI Assistant: summarise long PDFs, ask questions and get answers with citations.",
    icon: icon("adobe-acrobat.webp", "Adobe Acrobat"),
    href: "/solutions/digital-workflow/adobe-acrobat",
  },
  {
    name: "Copilot",
    vendor: "Microsoft",
    tag: "Everyday work",
    body: "AI in Word, Excel, PowerPoint, Outlook and Teams to draft, summarise meetings and analyse data.",
    icon: icon("microsoft-copilot.svg", "Microsoft Copilot"),
  },
  {
    name: "ChatGPT",
    vendor: "OpenAI",
    tag: "Everyday work",
    body: "OpenAI's assistant for teams, with admin controls, for research, writing, coding and custom GPTs.",
    icon: { ...icon("openai.svg", "OpenAI"), darkInvert: true },
  },
  {
    name: "GitLab",
    tag: "Software teams",
    body: "One DevSecOps platform with AI-assisted code suggestions, code review and vulnerability explanations.",
    icon: icon("gitlab.svg", "GitLab"),
  },
  {
    name: "Twilio",
    tag: "Customer conversations",
    body: "Messaging, voice and email APIs with AI assistants to automate conversations on SMS and WhatsApp.",
    icon: icon("twilio.svg", "Twilio"),
  },
  {
    name: "Firefly",
    vendor: "Adobe",
    tag: "Creative & marketing",
    body: "Commercially safe generative AI for images, Generative Fill and campaign variations in Creative Cloud.",
    icon: icon("adobe-firefly.webp", "Adobe Firefly"),
    href: "/solutions/creative-software/adobe-creative-cloud-pro",
  },
];

export const steps: Step[] = [
  {
    title: "Assess",
    body: "We map your workflows, data and goals to find where AI will make the biggest difference.",
  },
  {
    title: "Pilot",
    body: "Start small with a focused group, measure results and refine before scaling up.",
  },
  {
    title: "Roll out",
    body: "Licensing, setup and security policies handled end to end, for the whole organisation.",
  },
  {
    title: "Train & support",
    body: "Hands-on training so people use AI well, with ongoing support from our team.",
  },
];

/* ---------------------------------------------------------------- use cases by team */

export type UseCase = { task: string; tool: string };
export const useCases: { team: string; items: UseCase[] }[] = [
  {
    team: "Marketing",
    items: [
      { task: "Generate campaign visuals in minutes", tool: "Firefly" },
      { task: "Resize one design for every channel", tool: "Firefly" },
      { task: "Draft social posts and email copy", tool: "ChatGPT" },
    ],
  },
  {
    team: "Finance",
    items: [
      { task: "Summarise long reports and contracts", tool: "Acrobat Studio" },
      { task: "Spot trends in spreadsheets", tool: "Copilot" },
      { task: "Prepare board-ready slides from data", tool: "Copilot" },
    ],
  },
  {
    team: "HR",
    items: [
      { task: "Write job descriptions and policies", tool: "ChatGPT" },
      { task: "Answer questions from the staff handbook", tool: "Acrobat Studio" },
      { task: "Recap interviews and meetings", tool: "Copilot" },
    ],
  },
  {
    team: "Sales & service",
    items: [
      { task: "Reply to customers on WhatsApp, 24/7", tool: "Twilio" },
      { task: "Draft proposals from a short brief", tool: "ChatGPT" },
      { task: "Catch up on long email threads", tool: "Copilot" },
    ],
  },
  {
    team: "IT & developers",
    items: [
      { task: "Suggest and review code", tool: "GitLab" },
      { task: "Explain security vulnerabilities", tool: "GitLab" },
      { task: "Write scripts and documentation", tool: "ChatGPT" },
    ],
  },
  {
    team: "Education",
    items: [
      { task: "Turn notes into lesson slides", tool: "Copilot" },
      { task: "Create visuals for class projects", tool: "Firefly" },
      { task: "Summarise research papers", tool: "Acrobat Studio" },
    ],
  },
];

/* ---------------------------------------------------------------- why Acestar */

export const reasons = [
  { title: "Since 2008", body: "Adobe Platinum Partner with 18 years in software." },
  { title: "Done for you", body: "Licensing, setup and security, end to end." },
  { title: "Trained teams", body: "Hands-on sessions from Malaysia's Certiport distributor." },
  { title: "Local support", body: "A team in Kuala Lumpur when you need help." },
];

/* ---------------------------------------------------------------- responsible AI */

export const safety = [
  { key: "data", title: "Your data stays yours", body: "Business plans that keep company data out of model training." },
  { key: "controls", title: "Admin controls", body: "Decide who uses which AI, and how." },
  { key: "safe", title: "Commercially safe", body: "Firefly is trained on licensed content for business use." },
];

/* ---------------------------------------------------------------- FAQ */

export const faqs = [
  {
    q: "Which AI tool is right for us?",
    a: "It depends on your work. We start with a short assessment and recommend the tools that fit your teams and budget.",
  },
  {
    q: "Is our company data used to train AI?",
    a: "Business and enterprise plans of Copilot, ChatGPT and Acrobat AI Assistant do not use your data to train their models. We help you set this up correctly.",
  },
  {
    q: "Can we start small?",
    a: "Yes. Most customers begin with a pilot group, measure the results, then roll out to more people.",
  },
  {
    q: "Do you provide training?",
    a: "Yes. Every rollout includes hands-on training so your people know how to use AI in their daily work.",
  },
  {
    q: "How is licensing billed?",
    a: "Most AI tools are per user, monthly or yearly. We quote the plan that fits your headcount.",
  },
];
