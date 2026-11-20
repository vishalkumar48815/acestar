/** TechCare — content from acestar.my/techcare (text tidied). */
import { site } from "@/content/site";
import { asset } from "./assets";
import type { PageHero } from "./types";

export const hero: PageHero = {
  eyebrow: "TechCare · IT as a Service",
  title: "Take a higher view of IT.",
  accent: "higher view",
  lead: "A simplified version of IT outsourcing: computers for your workforce at a predictable monthly fee, so you can grow without heavy upfront hardware investment.",
  primary: { label: "Visit TechCare", href: site.externalLinks.techcare, external: true },
  secondary: { label: "Talk to us", href: "/contact-acestarian/" },
  image: asset(
    "2025/07/Untitled-1-02-1.jpg",
    "Take a higher view: an escalator rising towards a snow-capped mountain peak",
  ),
  imageFit: "cover",
  crumbs: [{ label: "Home", href: "/" }, { label: "Solutions" }, { label: "TechCare" }],
  chips: ["Predictable monthly fee", "No upfront hardware cost", "SMEs & enterprises", "Hybrid-ready"],
};

export const whatIs = {
  eyebrow: "What is TechCare",
  title: "IT outsourcing, simplified.",
  body: "TechCare is a subscription-based service that simplifies your IT workforce infrastructure by providing computers at a predictable monthly fee. Designed for both SMEs and enterprises, including hybrid setups, TechCare enables workforce expansion without heavy upfront hardware investment. It boosts productivity through standardised IT, letting you focus on growth while we handle the tech.",
  image: asset("2025/07/Asset-72x-optimized.png", "Laptop on a rock overlooking mountains at sunrise"),
  points: [
    { title: "Predictable cost", body: "One monthly fee instead of a large hardware outlay." },
    { title: "Standardised IT", body: "The right machine for every role, set up the same way." },
    { title: "Room to grow", body: "Add people and devices as your team expands." },
  ],
};

export const closing = {
  eyebrow: "Get started",
  title: "Ready to Simplify Your Business IT?",
  body: "Let's explore how TechCare can support your team and growth goals.",
};

/** Redesign from the client's TechCare mock (Acestar 3.0). */
export const higherView = {
  title: "Take A Higher",
  accent: "View",
  subtitle: "A Smarter, Simpler Way to Manage Your Business IT",
  body: "TechCare is a subscription-based service that simplifies your IT workforce infrastructure by providing computers with a predictable monthly fee. Designed for both SMEs and enterprises, including hybrid setups, TechCare enables workforce expansion without heavy upfront hardware investments.",
};

export const subscription = {
  title: "IT Subscription for Your Workforce",
  body: "Computers, software and maintenance in one monthly plan, ready for today's hybrid workforce.",
  image: asset("2025/07/Asset-72x-optimized.png", "Laptop on a rock overlooking mountains at sunrise"),
  links: [
    { label: "Business Computers", href: "/high-performance-computer/#brands" },
    { label: "Professional Workstations", href: "/high-performance-computer/#overview" },
    { label: "AI & High-Performance Computing", href: "/high-performance-computer/" },
  ],
};

export const outcomes = {
  title: "The Outcome for Your Business",
  subtitle: "Work smarter. Grow faster.",
  items: [
    {
      title: "Improve Profitability",
      body: "Lower upfront IT costs and manage your budget with predictable monthly payments.",
    },
    {
      title: "Boost Employee Productivity",
      body: "Give your team reliable, standardized technology to work more efficiently.",
    },
    {
      title: "Stay Operationally Efficient",
      body: "Simplify IT procurement, maintenance and technology refresh, so your team can focus on key priorities.",
    },
  ],
};
