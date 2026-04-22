import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CaseStudy } from "@/components/work/CaseStudy";
import {
  getCaseStudies,
  getCaseStudyBySlug,
  getNextCaseStudy,
} from "@/lib/content/case-studies";

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  return {
    title: study.frontmatter.title,
    description: `${study.frontmatter.client} — ${study.frontmatter.timeline}`,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const nextStudy = getNextCaseStudy(slug);
  const next = nextStudy
    ? { slug: nextStudy.frontmatter.slug, title: nextStudy.frontmatter.title }
    : null;

  return (
    <CaseStudy
      study={study}
      compiledBody={<MDXRemote source={study.body} />}
      next={next}
    />
  );
}
