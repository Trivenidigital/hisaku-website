import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getServiceBySlug,
  getServices,
  serviceSlugEnum,
} from "@/lib/content/services";
import { getRelatedCaseStudies } from "@/lib/content/case-studies";
import { ServiceFeatureList } from "@/components/ServiceFeatureList";
import { WorkTile } from "@/components/WorkTile";
import { buildMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.frontmatter.slug }));
}

function toServiceSlug(slug: string): (typeof serviceSlugEnum)[number] | null {
  return (serviceSlugEnum as readonly string[]).includes(slug)
    ? (slug as (typeof serviceSlugEnum)[number])
    : null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const typedSlug = toServiceSlug(slug);
  if (!typedSlug) return { title: "Not found" };
  const service = getServiceBySlug(typedSlug);
  if (!service) return { title: "Not found" };
  return buildMetadata({
    title: service.frontmatter.title,
    description: service.frontmatter.description,
    canonicalPath: `/services/${service.frontmatter.slug}`,
  });
}

/**
 * Service detail page — editorial scroll.
 *
 * Per plan: oversized service name hero, narrative paragraph, anchor moment,
 * features as a NUMBERED list (not a 3x2 grid), related case studies.
 * Deliberately non-card, non-grid in the service body.
 */
export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const typedSlug = toServiceSlug(slug);
  if (!typedSlug) notFound();
  const service = getServiceBySlug(typedSlug);
  if (!service) notFound();

  const related = getRelatedCaseStudies(typedSlug);
  const { title, description, features } = service.frontmatter;

  return (
    <main id="main" className="flex-1">
      {/* Oversized service name hero */}
      <section
        aria-label="Service header"
        className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-8"
      >
        <p className="text-sm mb-6">
          <Link
            href="/work"
            className="hover:text-[color:var(--color-accent-primary)] transition-colors"
            style={{ color: "var(--color-text-secondary)" }}
          >
            ← Back
          </Link>
        </p>
        <p
          className="text-xs uppercase tracking-[0.3em] mb-6"
          style={{ color: "var(--color-accent-primary)" }}
        >
          Capability
        </p>
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[1.02] tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}.
        </h1>
      </section>

      {/* Narrative */}
      <section
        aria-label="Overview"
        className="max-w-6xl mx-auto px-6 py-8 md:py-12"
      >
        <p
          className="text-xl md:text-2xl leading-relaxed max-w-3xl"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {description}
        </p>
      </section>

      {/* Numbered editorial feature list */}
      <section
        aria-label="What's included"
        className="max-w-6xl mx-auto px-6 py-12 md:py-16"
      >
        <h2
          className="text-xs uppercase tracking-[0.3em] mb-10"
          style={{ color: "var(--color-text-secondary)" }}
        >
          What&apos;s included
        </h2>
        <ServiceFeatureList features={features} />
      </section>

      {/* Related case studies */}
      {related.length > 0 ? (
        <section
          aria-label="Related case studies"
          className="max-w-6xl mx-auto px-6 py-16 md:py-20"
        >
          <h2
            className="text-2xl md:text-3xl font-bold tracking-tight mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Work in this capability
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 3).map((cs) => (
              <WorkTile
                key={cs.frontmatter.slug}
                caseStudy={cs}
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section
        aria-label="CTA"
        className="max-w-6xl mx-auto px-6 py-20 md:py-28"
      >
        <div className="border-t border-[color:var(--color-hairline)] pt-16 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <h2
            className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Want this
            <br />
            for your company?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold self-start md:self-end"
            style={{
              background: "var(--color-accent-primary)",
              color: "var(--color-base)",
            }}
          >
            Start a project
          </Link>
        </div>
      </section>
    </main>
  );
}
