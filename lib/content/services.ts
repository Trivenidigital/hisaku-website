import { z } from "zod";
import { loadContent, type LoadedContent } from "./load";
import { serviceSlugEnum } from "./case-studies";

// Re-export so consumers can import from either module.
export { serviceSlugEnum };

export const serviceFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.enum(serviceSlugEnum),
  // 60-100 words of description. Enforced loosely (min/max word count).
  description: z.string().refine(
    (s) => {
      const words = s.trim().split(/\s+/).length;
      return words >= 40 && words <= 120;
    },
    { message: "description should be roughly 60-100 words (tolerant range 40-120)" }
  ),
  // 3-9 features. Renders as numbered editorial list, not a grid.
  features: z
    .array(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
      })
    )
    .min(3)
    .max(9),
});

export type ServiceFrontmatter = z.infer<typeof serviceFrontmatterSchema>;
export type Service = LoadedContent<ServiceFrontmatter>;

let _cache: Service[] | null = null;

export function getServices(): Service[] {
  if (_cache !== null) return _cache;
  _cache = loadContent<ServiceFrontmatter>(
    "content/services",
    serviceFrontmatterSchema,
    {
      slugField: "slug",
    }
  );
  return _cache;
}

export function getServiceBySlug(
  slug: (typeof serviceSlugEnum)[number]
): Service | null {
  return getServices().find((s) => s.frontmatter.slug === slug) ?? null;
}

/** Test-only reset. */
export function __resetServiceCacheForTests(): void {
  _cache = null;
}
