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
  secondary: { label: "Talk to us", href: "/contact" },
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

export const packages = {
  eyebrow: "Our packages",
  title: "A plan for every role.",
  items: [
    {
      name: "Essential",
      tagline: "Your everyday work partner",
      audience: "Core solutions for operational employees",
      body: "Ensuring your workforce is equipped to perform daily operations productively and efficiently.",
      image: asset("2025/07/Asset-42x.png", "Latte with leaf art"),
    },
    {
      name: "Essential+",
      tagline: "Do the presentation with confidence",
      audience: "Enhanced performance for first- and middle-line management",
      body: "Enhanced processing capabilities for outcome-driven results and efficient workflows.",
      image: asset("2025/07/Asset-52x.png", "Black coffee in a white cup"),
    },
    {
      name: "Elite",
      tagline: "Take your business to new heights",
      audience: "Strategic solutions for senior executives",
      body: "Exceptional performance and security to support critical decision-making.",
      image: asset("2025/07/Asset-62x.png", "Espresso in a small white cup"),
    },
  ],
};

export const closing = {
  eyebrow: "Get started",
  title: "Ready to simplify your IT?",
  body: "See plans, devices and how TechCare works for your team.",
};
