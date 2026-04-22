import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import {
  getServices,
  getServiceBySlug,
  serviceSlugEnum,
} from "@/lib/content/services";
import { getRelatedCaseStudies } from "@/lib/content/case-studies";

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!(serviceSlugEnum as readonly string[]).includes(slug)) return {};
  const service = getServiceBySlug(slug as (typeof serviceSlugEnum)[number]);
  if (!service) return {};
  return {
    title: service.frontmatter.title,
    description: service.frontmatter.description.slice(0, 160),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(serviceSlugEnum as readonly string[]).includes(slug)) notFound();
  const typedSlug = slug as (typeof serviceSlugEnum)[number];

  const service = getServiceBySlug(typedSlug);
  if (!service) notFound();

  const related = getRelatedCaseStudies(typedSlug);
  return <ServiceDetail service={service} related={related} />;
}
