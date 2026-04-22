import type { Metadata } from "next";
import { WorkIndex } from "@/components/work/WorkIndex";
import { getCaseStudies } from "@/lib/content/case-studies";

const SERVICE_LABEL: Record<string, string> = {
  design: "Design",
  development: "Development",
  "digital-marketing": "Marketing",
  "ai-marketing": "AI Automation",
};

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies from Hisaku — websites, marketing systems, and AI automations we've shipped for clients.",
};

export default function WorkPage() {
  const items = getCaseStudies().map((c) => {
    const fm = c.frontmatter;
    return {
      slug: fm.slug,
      title: fm.title,
      client: fm.client,
      category: SERVICE_LABEL[fm.services[0]] ?? fm.services[0],
      year: fm.publishedAt.slice(0, 4),
      thumbnail: fm.hero.src,
      results: fm.results.map((r) => ({ metric: r.metric, label: r.label })),
    };
  });

  return <WorkIndex items={items} />;
}
