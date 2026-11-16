import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { RelatedSolutions } from "@/components/solutions/blocks";
import { BriefOverview, BriefWhy } from "@/components/solutions/brief-sections";
import { PageHero } from "@/components/solutions/page-hero";
import { SubNav } from "@/components/solutions/sub-nav";
import { WorkflowBlock } from "@/components/solutions/workflow-block";
import { brief, hero, sections } from "@/content/solutions/digital-workflow";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Digital Workflow - Acestar", path: "/digital-workflow/" });

export default function DigitalWorkflowPage() {
  return (
    <>
      <PageHero hero={hero} />
      <BriefOverview overview={brief.overview} />
      <SubNav items={sections.map((s) => ({ id: s.id, label: s.name }))} />
      <div className="py-4">
        {sections.map((s, i) => (
          <WorkflowBlock key={s.id} s={s} index={i} />
        ))}
      </div>
      <BriefWhy why={brief.why} />
      <RelatedSolutions current="workflow" />
      <ClosingCta content={brief.closing} />
    </>
  );
}
