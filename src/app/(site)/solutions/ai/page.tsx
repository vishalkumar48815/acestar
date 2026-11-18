import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { Steps } from "@/components/solutions/blocks";
import { AiFaq, AiSafety } from "@/components/solutions/ai-sections";
import { AiTools } from "@/components/solutions/ai-tools";
import { AiUseCases } from "@/components/solutions/ai-use-cases";
import { BriefOverview } from "@/components/solutions/brief-sections";
import { EnterpriseEnquiry } from "@/components/solutions/enterprise-enquiry";
import { PageHero } from "@/components/solutions/page-hero";
import { Section, SectionHead } from "@/components/solutions/primitives";
import { brief, faqs, hero, safety, steps, tools, useCases } from "@/content/solutions/ai";

export const metadata: Metadata = {
  title: brief.meta.title,
  description: brief.meta.description,
  keywords: brief.meta.keywords,
  alternates: { canonical: "/solutions/ai/" },
};

export default function AiSolutionsPage() {
  return (
    <>
      <PageHero hero={hero} />

      <BriefOverview overview={brief.overview} showOfferings={false} align="center" />

      <Section id="tools" labelledBy="tools-title" className="pt-12 lg:pt-16 bg-olive-600/5">
        <SectionHead
          // align="center"
          eyebrow="Acestar 3.0 · Enterprise AI portfolio"
          title="Enterprise solutions, and what we do with them."
          id="tools-title"
          className="mb-10"
        />
        <AiTools tools={tools} />
      </Section>

      {/* <Section id="use-cases" labelledBy="uc-title">
        <SectionHead eyebrow="Use cases" title="What AI does for your team." id="uc-title" className="mb-8" />
        <AiUseCases groups={useCases} tools={tools} />
      </Section> */}

      {/* <Section id="how-we-deliver" labelledBy="deliver-title">
        <SectionHead
          eyebrow="How we deliver"
          title="From first idea to everyday habit."
          id="deliver-title"
          className="mb-10"
        />
        <Steps steps={steps} />
      </Section> */}

      <section aria-labelledby="safety-title" className="py-12 lg:py-16">
        <div className="container-page">
          <AiSafety items={safety} />
        </div>
      </section>

      {/* Hidden until "Talk to Our AI Experts" or an "Enquire" link is clicked */}
      <EnterpriseEnquiry />

      <Section id="faq" labelledBy="faq-title">
        <SectionHead eyebrow="FAQ" title="Questions, answered." id="faq-title" align="center" className="mb-8" />
        <div className="mx-auto max-w-3xl">
          <AiFaq items={faqs} />
        </div>
      </Section>

      <ClosingCta content={{ ...brief.closing, cta: { ...brief.closing.cta, href: "#enquiry" } }} />
    </>
  );
}
