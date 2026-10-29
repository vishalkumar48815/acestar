/** Apple Solution — content from acestar.my/solution/apple. */
import { asset } from "./assets";
import type { Feature, PageHero, Stat, Step } from "./types";

export const hero: PageHero = {
  eyebrow: "Apple Authorised Reseller in Malaysia",
  title: "Apple, delivered the right way, start to finish.",
  accent: "start to finish.",
  lead: "From the first readiness check to the device that's still running smoothly three years later, we handle the full Apple lifecycle, not just the sale.",
  primary: { label: "Talk to an Apple specialist", href: "/contact" },
  secondary: { label: "Call 03-2201 7688", href: "tel:+60322017688" },
  image: asset("2026/09/apple-banner-image.png", "iPad, iPhone and MacBook showing creative and business apps"),
  imageFit: "contain",
  crumbs: [
    { label: "Home", href: "/" },
    { label: "High Performance Computers", href: "/solutions/workstations" },
    { label: "Apple Solution" },
  ],
};

export const stats: Stat[] = [
  { value: "18+ years", label: "as an Apple Authorised Reseller in Malaysia" },
  { value: "Education to enterprise", label: "deployments across schools, universities, government and business" },
  { value: "One partner, full lifecycle", label: "from readiness assessment to ongoing device support" },
];

export const gallery = [
  asset("2026/09/apple-hero-1.webp", "MacBook Air and MacBook Pro deployed by Acestar"),
  asset("2026/09/apple-hero-2.webp", "iPad Pro with Apple Pencil for education and creative teams"),
  asset("2026/09/apple-hero-3.webp", "MacBook Air with M-series chip running creative apps"),
  asset("2026/09/apple-hero-4.webp", "Mac Studio with Studio Display and iPad"),
  asset("2026/09/apple-hero-5.webp", "iPhone 16 Pro for enterprise device management"),
  asset("2026/09/apple-hero-6.webp", "iPhone 16 for business and government deployment"),
  asset("2026/09/apple-hero-7.webp", "MacBook Pro running Final Cut Pro for video production"),
  asset("2026/09/apple-hero-8.webp", "iMac range in multiple colours for schools and offices"),
].filter((x) => x !== undefined);

export const capabilities = {
  eyebrow: "Capabilities",
  title: "Everything an Apple rollout needs, under one roof.",
  items: [
    {
      title: "Device Deployment & Procurement",
      body: "Mac, iPad and iPhone sourcing, configuration and rollout, planned around how your teams and classrooms actually work.",
    },
    {
      title: "Enterprise Mobility Management",
      body: "Fleet enrolment through Apple Business Manager and Apple School Manager, with JAMF and Mosyle for zero-touch setup at scale.",
    },
    {
      title: "AppleCare for Enterprise",
      body: "Priority support, on-site service options and predictable coverage that scale with your device fleet as it grows.",
    },
    {
      title: "Flexible Acquisition",
      body: "Apple Financial Services leasing options that turn a hardware refresh into predictable, manageable operating spend.",
    },
    {
      title: "Creative & Pro Workflows",
      body: "Apple silicon paired with Adobe Creative Cloud, Final Cut Pro and Logic Pro, built for studios that can't afford downtime.",
    },
    {
      title: "Managed IT & Ongoing Care",
      body: "Acestar TechCare keeps devices, updates and support running smoothly, long after the deployment is done.",
    },
  ] satisfies Feature[],
};

export const industries = {
  eyebrow: "Industries",
  title: "Built for how your sector actually works.",
  body: "The right Apple deployment looks different in a classroom, a ministry and a creative studio. We tailor ours to fit.",
  items: [
    {
      title: "Education",
      body: "K-12 and higher-education iPad and Mac programmes, Apple School Manager integration and Apple Teacher enablement, plus bundled Pearson VUE and Certiport testing.",
      image: asset("2026/09/apple-hero-8.webp", ""),
    },
    {
      title: "Government & Public Sector",
      body: "Large-scale device rollouts, secure provisioning and digital-literacy training aligned with national education and digital-skills initiatives.",
      image: asset("2026/09/apple-hero-6.webp", ""),
    },
    {
      title: "Enterprise & Commercial",
      body: "Mac fleets for teams that value security and uptime, backed by mobility management, leasing and support built around business continuity.",
      image: asset("2026/09/apple-hero-1.webp", ""),
    },
    {
      title: "Creative & Media",
      body: "Mac Studio, MacBook Pro and Pro Display XDR environments tuned for video, design and post-production teams running Adobe and Apple's pro apps.",
      image: asset("2026/09/apple-hero-7.webp", ""),
    },
  ] satisfies Feature[],
};

export const process = {
  eyebrow: "How we work",
  title: "A clear path, from first conversation to ongoing support.",
  steps: [
    {
      title: "Assess",
      body: "A readiness review of your network, security and workflows, so the deployment fits your environment from day one.",
    },
    {
      title: "Deploy",
      body: "Zero-touch provisioning through Apple Business Manager or Apple School Manager, configured and ready out of the box.",
    },
    {
      title: "Support",
      body: "AppleCare for Enterprise and Acestar TechCare keep devices, users and updates running without disruption.",
    },
    {
      title: "Grow",
      body: "Ongoing refresh planning, plus certification pathways like Apple Teacher and Certiport for your people.",
    },
  ] satisfies Step[],
};

export const why = {
  eyebrow: "Why Acestar",
  title: "A partner who stays past the delivery date.",
  body: "Most resellers stop at the invoice. We stay for the readiness check, the rollout, the support ticket and the next refresh cycle.",
  items: [
    {
      title: "Apple-certified specialists",
      body: "Apple Certified Technical Coordinators and Apple Teacher-certified trainers on staff, not just account managers.",
    },
    {
      title: "One team, start to finish",
      body: "Assessment, procurement, deployment and support are handled by the same people, not handed between vendors.",
    },
    {
      title: "Local support, real people",
      body: "Service desk coverage from our Kuala Lumpur and Penang teams, not an overseas call queue.",
    },
    {
      title: "Beyond hardware",
      body: "Testing centres, certification pathways and creative-software expertise most Apple resellers simply don't offer.",
    },
  ] satisfies Feature[],
};

export const glance = [
  { label: "Founded", value: "2008 · Kuala Lumpur" },
  { label: "Apple status", value: "Authorised Reseller" },
  { label: "Sectors served", value: "Education, Government, Enterprise, Creative" },
  { label: "Testing centres", value: "Sole MY distributor · Pearson VUE & Certiport" },
  { label: "Service desks", value: "Kuala Lumpur & Penang" },
  { label: "Also a partner for", value: "Adobe Creative Cloud, Autodesk, Microsoft 365" },
];

export const trustedBy = [
  "Lemon Sky Studios",
  "Mindvalley",
  "Media Prima Berhad",
  "TE Asia Healthcare",
  "Law Partnership",
];

export const closing = {
  eyebrow: "Get in touch",
  title: "Let's bring Apple into your organisation, properly.",
  body: "Tell us what you're trying to deploy, whether a classroom, a fleet or a creative studio, and we'll walk you through how it works.",
};
