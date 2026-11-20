/**
 * AI Solutions. New page (no equivalent on the old acestar.my).
 * Product descriptions are general; Acestar's role is consultation, licensing, deployment,
 * training and support, as on the other solution pages. Review the copy with the business team.
 * Icons are the vendors' marks (public/images/partners/ai).
 */
import type { Img, PageHero, SolutionBrief, Step } from "./types";

const icon = (file: string, alt: string): Img => ({ src: `/images/partners/ai/${file}`, width: 96, height: 96, alt });

export const hero: PageHero = {
  eyebrow: "AI Solutions",
  title: "Enterprise AI Solutions in Malaysia.",
  accent: "in Malaysia.",
  lead: "Enterprise AI, automation and digital workforce solutions. Helping businesses work smarter, automate faster and grow with AI.",
  primary: { label: "Talk to Our AI Experts", href: "#enquiry" },
  secondary: { label: "Explore our AI portfolio", href: "#tools" },
  // Hummingbird artwork from the acestar.my Adobe Firefly banner (logo removed)
  image: { src: "/images/solutions/ai/ai-hero.webp", width: 3010, height: 845, alt: "" },
  imageFit: "backdrop",
  // The bird sits low in the original banner; lift it level with the headline on desktop
  imageShiftY: "-16%",
  crumbs: [{ label: "Home", href: "/" }, { label: "Solutions" }, { label: "AI Solutions" }],
  // Acestar 3.0 core services
  chips: [
    "Enterprise Licensing",
    "AI Consulting",
    "System Integration",
    "AI Agent Development",
    "Deployment",
    "Training",
    "Managed Services",
  ],
};

export type AiTool = {
  name: string;
  vendor?: string;
  tag: string;
  body: string;
  icon: Img;
  /** Short names used in the use-case tabs. */
  aliases?: string[];
  /** Second mark for integrations (e.g. Copilot + Acrobat Sign). */
  icon2?: Img;
  href?: string;
};

/** Acestar 3.0 Enterprise AI Solutions Portfolio (client brief). */
export const tools: AiTool[] = [
  {
    name: "OpenAI Enterprise",
    tag: "AI agents",
    body: "Empower workplace productivity and automate business processes with AI agents and intelligent workflows.",
    icon: { ...icon("openai.svg", "OpenAI"), darkInvert: true },
    aliases: ["ChatGPT"],
  },
  {
    name: "Anthropic Enterprise",
    tag: "Claude",
    body: "Enable enterprise intelligence, knowledge automation and AI digital workforce solutions with Claude.",
    icon: icon("claude.svg", "Claude"),
    aliases: ["Claude"],
  },
  {
    name: "Microsoft Copilot",
    tag: "Productivity",
    body: "Enhance workplace productivity with AI-powered assistance, automation and Microsoft 365 integration.",
    icon: icon("microsoft-copilot.svg", "Microsoft Copilot"),
    aliases: ["Copilot"],
  },
  {
    name: "Adobe Acrobat AI Assistant & Studio",
    tag: "Document AI",
    body: "Transform document intelligence with AI-powered analysis, insights, content creation and collaboration.",
    icon: icon("adobe-acrobat.webp", "Adobe Acrobat"),
    aliases: ["Acrobat Studio"],
    href: "/adobe-acrobat/",
  },
  {
    name: "Microsoft Copilot + Adobe Acrobat Sign",
    tag: "Integration",
    body: "Streamline document workflows, approvals and e-signatures through Microsoft 365 and Adobe integration.",
    icon: icon("microsoft-copilot.svg", "Microsoft Copilot"),
    icon2: icon("adobe-acrobat.webp", "Adobe Acrobat Sign"),
  },
  // {
  //   name: "Figma Enterprise",
  //   tag: "Product design",
  //   body: "Accelerate digital product design, AI-powered prototyping and team collaboration.",
  //   icon: icon("figma.svg", "Figma"),
  //   aliases: ["Figma"],
  // },
  {
    name: "Twilio Enterprise",
    tag: "Customer engagement",
    body: "Transform customer engagement with AI voice agents, WhatsApp automation and omnichannel communication.",
    icon: icon("twilio.svg", "Twilio"),
    aliases: ["Twilio"],
  },
  {
    name: "GitLab Enterprise",
    tag: "DevSecOps",
    body: "Accelerate secure software development with AI-powered DevSecOps, automation and collaboration.",
    icon: icon("gitlab.svg", "GitLab"),
    aliases: ["GitLab"],
  },
  {
    name: "AI Digital Workforce Solutions",
    tag: "Custom agents",
    body: "Design, build and deploy custom AI agents to automate business processes and operations.",
    icon: icon("ai-workforce.svg", "AI Digital Workforce"),
  },
];

/** Acestar 3.0 brief: SEO copy, overview and "Why Acestar". */
export const brief: SolutionBrief = {
  meta: {
    title: "Enterprise AI Solutions Malaysia",
    description:
      "Enterprise AI solutions in Malaysia: OpenAI, Claude, Microsoft Copilot, Acrobat AI, Figma, Twilio, GitLab and custom AI agents. Consultation, licensing, deployment and training from Acestar.",
    keywords: [
      "enterprise AI solutions Malaysia",
      "AI solutions provider Malaysia",
      "business AI solutions",
      "Microsoft Copilot Malaysia",
      "enterprise generative AI",
      "AI adoption consulting Malaysia",
    ],
  },
  overview: {
    eyebrow: "Empowering enterprises with trusted AI",
    title: "From AI exploration to real business value.",
    paragraphs: [
      "AI is transforming how businesses operate, collaborate and compete. Acestar helps organizations adopt enterprise-ready AI technologies that improve productivity, automate workflows and support business growth.",
      "As an established IT solutions provider in Malaysia, we bring together trusted global AI technologies, practical implementation expertise and business-focused consultation.",
    ],
    offeringsTitle: "Our Enterprise AI Solutions",
    offerings: [
      {
        title: "Enterprise AI Platforms",
        body: "Explore enterprise AI solutions from leading technology providers, including OpenAI, Microsoft and other global innovators, with a focus on productivity, security and responsible adoption.",
      },
      {
        title: "Microsoft Copilot and AI Productivity",
        body: "Empower employees with AI-powered assistance for everyday tasks, document creation, collaboration and knowledge work.",
      },
      {
        title: "AI Automation and Intelligent Workflows",
        body: "Identify opportunities to streamline repetitive processes, improve response times and enable teams to work more efficiently.",
      },
      {
        title: "AI for Developers and Technical Teams",
        body: "Support software development, code collaboration and technical productivity with enterprise-ready AI development solutions.",
      },
      {
        title: "AI Consultation and Adoption",
        body: "From solution selection to deployment planning and user enablement, Acestar helps businesses adopt AI technologies with greater confidence.",
      },
    ],
  },
  why: {
    title: "Why Choose Acestar?",
    paragraphs: [
      "With 18 years of technology experience and more than 5,000 organizations served, Acestar understands the importance of selecting solutions that are practical, scalable and aligned with business needs.",
      "We combine trusted technologies, enterprise consultation and professional training to support your AI adoption journey.",
    ],
    // The AI page shows `reasons` below this text instead.
    highlights: [],
  },
  closing: {
    eyebrow: "Get started",
    title: "Make AI Practical for Your Business",
    body: "Discover how Acestar can help your organization implement the right AI solutions for your workforce and business objectives.",
    cta: { label: "Talk to Our AI Experts", href: "/contact-acestarian/" },
  },
};

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
/** Tools in the use cases that are not in the AI portfolio grid. */
export const extraToolIcons: Record<string, Img> = { Firefly: icon("adobe-firefly.webp", "Adobe Firefly") };
export const useCases: { team: string; items: UseCase[] }[] = [
  {
    team: "Marketing",
    items: [
      { task: "Generate campaign visuals in minutes", tool: "Firefly" },
      { task: "Prototype campaign pages with AI", tool: "Figma" },
      { task: "Draft social posts and email copy", tool: "ChatGPT" },
    ],
  },
  {
    team: "Finance",
    items: [
      { task: "Analyse long reports and contracts", tool: "Claude" },
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
      { task: "Write scripts and documentation", tool: "Claude" },
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
  { title: "18 years", body: "Of technology experience, since 2008." },
  { title: "5,000+", body: "Organizations served across Malaysia." },
  { title: "Trusted tech", body: "Enterprise AI from global leaders." },
  { title: "Consult & train", body: "Consultation and training for real adoption." },
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
