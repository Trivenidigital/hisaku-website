import type { Metadata } from "next";
import { getCaseStudies } from "@/lib/content/case-studies";
import { WorkRows } from "@/components/sections/WorkRows";
import { buildMetadata } from "@/lib/metadata";
import PageHero from "@/components/layout/PageHero";
import { colors } from "@/lib/design";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Selected case studies from Hisaku. Design, development, and marketing projects we've shipped for startups and growing companies.",
  canonicalPath: "/work",
});

export default function WorkIndexPage() {
  const all = getCaseStudies();
  return (
    <main id="main" style={{ backgroundColor: colors.bg }}>
      <PageHero
        label="Selected Work"
        title="Things we've built."
        accentWord="built."
        subtitle={`${all.length} case studies · Hyderabad, India`}
      />
      <WorkRows caseStudies={all} />
    </main>
  );
}
