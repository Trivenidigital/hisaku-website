import { ImageResponse } from "next/og";
import { OgLayout, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/layout";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/content/case-studies";

export const alt = "Hisaku case study";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const SERVICE_LABEL: Record<string, string> = {
  design: "Design",
  development: "Development",
  "digital-marketing": "Digital Marketing",
  "ai-marketing": "AI Marketing",
};

export async function generateStaticParams() {
  return getCaseStudies().map((cs) => ({ slug: cs.frontmatter.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  const title = cs?.frontmatter.title ?? "Hisaku";
  const subtitle = cs?.frontmatter.client ?? "We Build What Moves.";
  const tags = cs?.frontmatter.services.map((s) => SERVICE_LABEL[s]) ?? [];

  return new ImageResponse(
    <OgLayout title={title} subtitle={subtitle} tagList={tags} />,
    { ...size }
  );
}
