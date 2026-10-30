import type { Metadata } from "next";
import { JobBoard } from "@/components/careers/job-board";
import { PageHero } from "@/components/solutions/page-hero";
import { CareersVisual } from "@/components/visuals/careers-visual";
import { apply, hero, jobs } from "@/content/pages/careers";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Acestar in Kuala Lumpur. Open roles in sales, product, marketing, legal and finance. Apply online or email hrd@acestar.my.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  const teams = Array.from(new Set(jobs.map((j) => j.team)));
  return (
    <>
      <PageHero hero={hero} visual={<CareersVisual teams={teams} />} />
      <section id="roles" aria-labelledby="roles-title" className="scroll-mt-24 pt-4 pb-16 lg:pb-24">
        <div className="container-page">
          <JobBoard jobs={jobs} to={apply.to} />
        </div>
      </section>
    </>
  );
}
