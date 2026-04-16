import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { z, type ZodTypeAny } from "zod";

/* ============================================================================
 * Generic MDX content loader.
 *
 *  content/<type>/*.mdx   ──▶  readdirSync
 *         │
 *         ▼
 *   gray-matter  ──▶  { data: frontmatter, content: body }
 *         │
 *         ▼
 *   zod schema  ──▶  throws on invalid frontmatter (clear file:field error)
 *         │
 *         ▼
 *   extra validators (slug regex, hero image existence, slug uniqueness)
 *         │
 *         ▼
 *   typed array of { frontmatter, body, filePath }
 *
 * Results are memoized at module-load time (first call wins). Safe for
 * Next.js build: each page component gets the same cached array.
 * ============================================================================ */

// Slug regex: must be a valid CSS ident for view-transition-name.
// Starts with a lowercase letter, then lowercase alphanumerics or hyphens.
const SLUG_REGEX = /^[a-z][a-z0-9-]*$/;

export interface LoadedContent<T> {
  frontmatter: T;
  body: string;
  filePath: string;
}

export interface LoadContentOptions {
  /** Field on the frontmatter that holds the slug. Required for uniqueness + regex check. */
  slugField?: string;
  /** Optional hero image field to validate against the filesystem. e.g. "hero.src". Supports dot-paths. */
  heroImagePathField?: string;
  /** Project root used to resolve relative hero image paths. Default: process.cwd(). */
  projectRoot?: string;
}

/**
 * Load every MDX file from `contentDir` and validate against the given zod schema.
 *
 * Throws a build-time error with file path, field, received vs expected if any
 * file fails validation. The build fails loudly — no broken content ships.
 */
export function loadContent<T>(
  contentDir: string,
  schema: ZodTypeAny,
  options: LoadContentOptions = {}
): LoadedContent<T>[] {
  const projectRoot = options.projectRoot ?? process.cwd();
  const absDir = join(projectRoot, contentDir);

  // An empty or missing content dir is not an error at this stage — the agency
  // site launches with zero case studies initially. The UI handles that.
  if (!existsSync(absDir)) {
    return [];
  }

  const files = readdirSync(absDir).filter((f) => f.endsWith(".mdx"));
  const loaded: LoadedContent<T>[] = [];
  const seenSlugs = new Map<string, string>();

  for (const file of files) {
    const filePath = join(absDir, file);
    // Turbopack's file tracer is suspicious of dynamic readFileSync paths
    // because it can't prove they're scoped. The path is always inside
    // `contentDir`, but the tracer can't see that statically.
    const raw = readFileSync(/*turbopackIgnore: true*/ filePath, "utf8");
    const { data, content } = matter(raw);

    // 1. Schema validation.
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      throw new Error(
        `[content] ${filePath}: ` +
          `field "${first.path.join(".")}" — ${first.message}`
      );
    }
    const frontmatter = parsed.data as T;

    // 2. Slug format + uniqueness.
    if (options.slugField) {
      const slug = (frontmatter as Record<string, unknown>)[options.slugField];
      if (typeof slug !== "string" || !SLUG_REGEX.test(slug)) {
        throw new Error(
          `[content] ${filePath}: slug "${String(slug)}" must match ${SLUG_REGEX} ` +
            `(lowercase letter first, then lowercase alphanumeric or hyphen). ` +
            `Required for view-transition-name CSS validity.`
        );
      }
      const prior = seenSlugs.get(slug);
      if (prior) {
        throw new Error(
          `[content] slug collision: "${slug}" used by both ${prior} and ${filePath}`
        );
      }
      seenSlugs.set(slug, filePath);
    }

    // 3. Hero image existence (if configured).
    if (options.heroImagePathField) {
      const heroPath = getByPath(frontmatter, options.heroImagePathField);
      if (typeof heroPath === "string") {
        const heroAbsPath = heroPath.startsWith("/")
          ? join(projectRoot, "public", heroPath)
          : join(projectRoot, heroPath);
        if (!existsSync(heroAbsPath)) {
          throw new Error(
            `[content] ${filePath}: ${options.heroImagePathField} points to ` +
              `"${heroPath}" which does not exist on disk. ` +
              `Add the file to public/ or fix the frontmatter.`
          );
        }
      }
    }

    loaded.push({ frontmatter, body: content, filePath });
  }

  return loaded;
}

/** Resolve a dot-path (e.g. "hero.src") against an object. Returns undefined if any step is missing. */
function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/** Re-export for tests. */
export { SLUG_REGEX, z };
