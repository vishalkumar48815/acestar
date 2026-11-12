import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { RelatedSolutions } from "@/components/solutions/blocks";
import { PageHero } from "@/components/solutions/page-hero";
import { SubNav } from "@/components/solutions/sub-nav";
import { WorkflowBlock } from "@/components/solutions/workflow-block";
import { hero, sections } from "@/content/solutions/digital-workflow";

export const metadata: Metadata = {
  title: "Digital Workflow Management",
  description:
    "Adobe Document Cloud and Acrobat Sign, Microsoft 365, Faronics, Saleslive CRM and video conferencing from Zoom, Jabra and Logitech, implemented by Acestar.",
  alternates: { canonical: "/solutions/digital-workflow" },
};

export default function DigitalWorkflowPage() {
  return (
    <>
      <PageHero hero={hero} />
      <SubNav items={sections.map((s) => ({ id: s.id, label: s.name }))} />
      <div className="py-4">
        {sections.map((s, i) => (
          <WorkflowBlock key={s.id} s={s} index={i} />
        ))}
      </div>
      <RelatedSolutions current="workflow" />
      <ClosingCta
        content={{
          eyebrow: "Work smarter",
          title: "Ready to streamline how your team works?",
          body: "Consultation, licensing and implementation for document, collaboration and meeting-room workflows.",
          cta: { label: "Talk to us", href: "/contact" },
        }}
      />
    </>
  );
}
