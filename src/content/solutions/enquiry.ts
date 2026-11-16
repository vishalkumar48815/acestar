/**
 * "Talk to Our Enterprise Solutions Team": one dynamic form whose questions change with the
 * selected solution (Acestar 3.0 brief). Keys match the AI portfolio card names (slugified).
 */
export type EnquiryField = { name: string; label: string; type?: "text" | "number"; placeholder?: string };
export type EnquirySolution = { key: string; label: string; fields: EnquiryField[] };

const users: EnquiryField = { name: "users", label: "Number of users", type: "number", placeholder: "e.g. 50" };

export const enquirySolutions: EnquirySolution[] = [
  {
    key: "openai-enterprise",
    label: "OpenAI Enterprise",
    fields: [
      { name: "orgSize", label: "Organisation size", placeholder: "e.g. 200 employees" },
      users,
      { name: "useCase", label: "Primary AI use case", placeholder: "e.g. sales proposals, HR policy Q&A" },
      { name: "integration", label: "Integration requirements", placeholder: "Systems you'd like to connect" },
    ],
  },
  {
    key: "anthropic-enterprise",
    label: "Anthropic Enterprise (Claude)",
    fields: [
      users,
      { name: "useCase", label: "Use case", placeholder: "e.g. research, knowledge assistant" },
      {
        name: "docsCoding",
        label: "Document or coding requirements",
        placeholder: "e.g. contract analysis, Claude Code",
      },
      { name: "integration", label: "Integration needs", placeholder: "Systems you'd like to connect" },
    ],
  },
  {
    key: "microsoft-copilot",
    label: "Microsoft Copilot",
    fields: [
      { name: "m365", label: "Microsoft 365 subscription", placeholder: "e.g. Business Standard, E3" },
      users,
      { name: "apps", label: "Applications used", placeholder: "e.g. Outlook, Teams, Excel" },
      { name: "automation", label: "Automation objectives", placeholder: "What would you like to automate?" },
    ],
  },
  {
    key: "adobe-acrobat-ai-assistant-studio",
    label: "Adobe Acrobat AI Assistant & Studio",
    fields: [
      users,
      { name: "docTypes", label: "Document types", placeholder: "e.g. contracts, reports, proposals" },
      { name: "adobeSub", label: "Current Adobe subscription", placeholder: "e.g. Acrobat Pro, none" },
      { name: "challenges", label: "Primary workflow challenges" },
    ],
  },
  {
    key: "microsoft-copilot-adobe-acrobat-sign",
    label: "Microsoft Copilot + Adobe Acrobat Sign",
    fields: [
      { name: "m365", label: "Microsoft 365 environment", placeholder: "e.g. E3 with SharePoint" },
      { name: "docVolume", label: "Monthly document volume", type: "number", placeholder: "e.g. 300" },
      { name: "approvals", label: "Approval stages", placeholder: "e.g. manager, finance, director" },
      { name: "esign", label: "E-signature requirements" },
    ],
  },
  {
    key: "figma-enterprise",
    label: "Figma Enterprise",
    fields: [
      { name: "designers", label: "Number of designers / developers", type: "number", placeholder: "e.g. 15" },
      { name: "tools", label: "Current design tools", placeholder: "e.g. Adobe XD, Sketch" },
      { name: "teamSize", label: "Team size", placeholder: "e.g. 3 product teams" },
      { name: "aiDesign", label: "AI design requirements", placeholder: "e.g. Figma Make, prototyping" },
    ],
  },
  {
    key: "twilio-enterprise",
    label: "Twilio Enterprise",
    fields: [
      { name: "channels", label: "Preferred channels", placeholder: "e.g. WhatsApp, voice, SMS" },
      { name: "volume", label: "Monthly call / message volume", placeholder: "e.g. 20,000 messages" },
      { name: "crm", label: "CRM platform", placeholder: "e.g. Saleslive, Salesforce" },
      { name: "automation", label: "AI automation requirements" },
    ],
  },
  {
    key: "gitlab-enterprise",
    label: "GitLab Enterprise",
    fields: [
      { name: "developers", label: "Number of developers", type: "number", placeholder: "e.g. 40" },
      { name: "platform", label: "Current development platform", placeholder: "e.g. GitHub, Bitbucket" },
      { name: "hosting", label: "Cloud or self-managed preference" },
      { name: "security", label: "Security requirements" },
    ],
  },
  {
    key: "ai-digital-workforce-solutions",
    label: "AI Digital Workforce Solutions",
    fields: [
      { name: "department", label: "Department", placeholder: "e.g. Sales, HR, Finance" },
      { name: "processes", label: "Processes to automate" },
      { name: "systems", label: "Current systems", placeholder: "e.g. CRM, ERP" },
      { name: "volume", label: "Estimated transaction volume", placeholder: "e.g. 1,000 per month" },
    ],
  },
];

export const enquiryTimelines = ["Immediately", "Within 3 months", "3–6 months", "Exploring options"];

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
