import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { Steps } from "@/components/solutions/blocks";
import { AiReasons, AiFaq, AiSafety } from "@/components/solutions/ai-sections";
import { AiTools } from "@/components/solutions/ai-tools";
import { AiUseCases } from "@/components/solutions/ai-use-cases";
import { BriefOverview } from "@/components/solutions/brief-sections";
import { EnterpriseEnquiry } from "@/components/solutions/enterprise-enquiry";
import { PageHero } from "@/components/solutions/page-hero";
import { Section, SectionHead } from "@/components/solutions/primitives";
import { brief, faqs, hero, reasons, safety, steps, tools, useCases } from "@/content/solutions/ai";

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

      <BriefOverview overview={brief.overview} />

      <Section id="tools" labelledBy="tools-title" className="pt-0 lg:pt-0">
        <SectionHead
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

      <Section id="why" labelledBy="why-title">
        <SectionHead
          eyebrow="Why Acestar"
          title={brief.why.title}
          body={brief.why.paragraphs.map((p, i) => (
            <span key={p.slice(0, 24)} className={i ? "mt-3 block" : "block"}>
              {p}
            </span>
          ))}
          id="why-title"
          className="mb-10"
        />
        <AiReasons items={reasons} />
      </Section>

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

      <Section labelledBy="enquiry-heading" className="pt-0 lg:pt-0">
        <h2 id="enquiry-heading" className="sr-only">
          Enterprise enquiry
        </h2>
        <div className="mx-auto max-w-4xl">
          <EnterpriseEnquiry />
        </div>
      </Section>

      <Section id="faq" labelledBy="faq-title">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.6fr] lg:gap-14">
          <SectionHead eyebrow="FAQ" title="Questions, answered." id="faq-title" />
          <AiFaq items={faqs} />
        </div>
      </Section>

      <ClosingCta content={{ ...brief.closing, cta: { ...brief.closing.cta, href: "#enquiry" } }} />
    </>
  );
}
