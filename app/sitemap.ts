import type { MetadataRoute } from "next";
import { getCaseStudies } from "@/lib/content/case-studies";
import { getServices } from "@/lib/content/services";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hisaku.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE_URL}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const services = getServices().map((s) => ({
    url: `${SITE_URL}/services/${s.frontmatter.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const caseStudies = getCaseStudies().map((c) => ({
    url: `${SITE_URL}/work/${c.frontmatter.slug}`,
    lastModified: new Date(c.frontmatter.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...services, ...caseStudies];
}
