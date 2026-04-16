import { z } from "zod";
import { loadContent, type LoadedContent } from "./load";

// Services a case study can be tagged with. Must match `serviceSlugSchema`.
export const serviceSlugEnum = [
  "design",
  "development",
  "digital-marketing",
  "ai-marketing",
] as const;

export const caseStudyFrontmatterSchema = z.object({
  title: z.string().min(1),
  client: z.string().min(1),
  slug: z.string().min(1),
  services: z.array(z.enum(serviceSlugEnum)).min(1),
  timeline: z.string().min(1),
  // ISO date string — determines "next case study" traversal order (desc).
  publishedAt: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  hero: z.object({
    src: z.string().min(1),
    alt: z.string().min(1),
  }),
  // 1-5 outcome metrics. Design renders up to 5; centered if fewer than 3.
  results: z
    .array(
      z.object({
        metric: z.string().min(1),
        label: z.string().min(1),
      })
    )
    .min(1)
    .max(5),
});

export type CaseStudyFrontmatter = z.infer<typeof caseStudyFrontmatterSchema>;
export type CaseStudy = LoadedContent<CaseStudyFrontmatter>;

// Module-level memoization — first call loads, subsequent calls return cache.
let _cache: CaseStudy[] | null = null;

export function getCaseStudies(): CaseStudy[] {
  if (_cache !== null) return _cache;
  const loaded = loadContent<CaseStudyFrontmatter>(
    "content/case-studies",
    caseStudyFrontmatterSchema,
    {
      slugField: "slug",
      heroImagePathField: "hero.src",
    }
  );
  // Sort by publishedAt desc. Determines featured ordering + "next case study" traversal.
  _cache = loaded.sort((a, b) =>
    b.frontmatter.publishedAt.localeCompare(a.frontmatter.publishedAt)
  );
  return _cache;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  return getCaseStudies().find((c) => c.frontmatter.slug === slug) ?? null;
}

/** Related case studies for a service page — filters by service tag. */
export function getRelatedCaseStudies(
  serviceSlug: (typeof serviceSlugEnum)[number]
): CaseStudy[] {
  return getCaseStudies().filter((c) =>
    c.frontmatter.services.includes(serviceSlug)
  );
}

/** Next case study after the given slug, per publishedAt desc. Wraps at end. */
export function getNextCaseStudy(currentSlug: string): CaseStudy | null {
  const all = getCaseStudies();
  const idx = all.findIndex((c) => c.frontmatter.slug === currentSlug);
  if (idx === -1 || all.length === 0) return null;
  return all[(idx + 1) % all.length];
}

/** Test-only reset. Never called in prod. */
export function __resetCaseStudyCacheForTests(): void {
  _cache = null;
}
