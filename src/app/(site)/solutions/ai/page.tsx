import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { Steps } from "@/components/solutions/blocks";
import { AiReasons, AiFaq, AiSafety } from "@/components/solutions/ai-sections";
import { AiTools } from "@/components/solutions/ai-tools";
import { AiUseCases } from "@/components/solutions/ai-use-cases";
import { PageHero } from "@/components/solutions/page-hero";
import { Section, SectionHead } from "@/components/solutions/primitives";
import { faqs, hero, reasons, safety, steps, tools, useCases } from "@/content/solutions/ai";

export const metadata: Metadata = {
  title: "AI Solutions",
  description:
    "Microsoft Copilot, ChatGPT, Adobe Acrobat Studio, Adobe Firefly, GitLab and Twilio: Acestar helps Malaysian businesses choose, deploy and adopt practical AI.",
  alternates: { canonical: "/solutions/ai" },
};

export default function AiSolutionsPage() {
  return (
    <>
      <PageHero hero={hero} />

      <Section id="tools" labelledBy="tools-title">
        <SectionHead
          eyebrow="Our AI tools"
          title="The AI your teams will actually use."
          id="tools-title"
          className="mb-10"
        />
        <AiTools tools={tools} />
      </Section>

      <Section id="use-cases" labelledBy="uc-title">
        <SectionHead eyebrow="Use cases" title="What AI does for your team." id="uc-title" className="mb-8" />
        <AiUseCases groups={useCases} tools={tools} />
      </Section>

      <Section id="why" labelledBy="why-title">
        <SectionHead eyebrow="Why Acestar" title="AI, delivered properly." id="why-title" className="mb-10" />
        <AiReasons items={reasons} />
      </Section>

      <Section id="how-we-deliver" labelledBy="deliver-title">
        <SectionHead
          eyebrow="How we deliver"
          title="From first idea to everyday habit."
          id="deliver-title"
          className="mb-10"
        />
        <Steps steps={steps} />
      </Section>

      <section aria-labelledby="safety-title" className="py-12 lg:py-16">
        <div className="container-page">
          <AiSafety items={safety} />
        </div>
      </section>

      <Section id="faq" labelledBy="faq-title">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.6fr] lg:gap-14">
          <SectionHead eyebrow="FAQ" title="Questions, answered." id="faq-title" />
          <AiFaq items={faqs} />
        </div>
      </Section>

      <ClosingCta
        content={{
          eyebrow: "Make AI practical",
          title: "Ready to put AI to work?",
          body: "Talk to our team about the right AI tools for your organisation.",
          cta: { label: "Talk to us", href: "/contact" },
        }}
      />
    </>
  );
}
