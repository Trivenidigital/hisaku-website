import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCaseStudies,
  getCaseStudyBySlug,
  getNextCaseStudy,
} from "@/lib/content/case-studies";
import { ResultStats } from "@/components/ResultStats";
import { CaseStudyNarrative } from "@/components/CaseStudyNarrative";
import { buildMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Next.js 16: params is a Promise<...>. Must await.
 */

export async function generateStaticParams() {
  return getCaseStudies().map((cs) => ({ slug: cs.frontmatter.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return { title: "Not found" };
  return buildMetadata({
    title: cs.frontmatter.title,
    description: `${cs.frontmatter.client} · ${cs.frontmatter.services.length} service${cs.frontmatter.services.length === 1 ? "" : "s"} · ${cs.frontmatter.timeline}`,
    canonicalPath: `/work/${cs.frontmatter.slug}`,
  });
}

const SERVICE_LABEL: Record<string, string> = {
  design: "Design",
  development: "Development",
  "digital-marketing": "Digital Marketing",
  "ai-marketing": "AI Marketing",
};

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const next = getNextCaseStudy(slug);
  const { title, client, services, timeline, hero, results } = cs.frontmatter;

  // JSON-LD for SEO + AI citation. CreativeWork schema per plan.
  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    about: client,
    author: { "@type": "Organization", name: "Hisaku" },
    datePublished: cs.frontmatter.publishedAt,
    image: hero.src,
  };

  return (
    <main id="main" className="flex-1">
      <script
        type="application/ld+json"
        // Safe here: ld is built from typed content we control, no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      {/* Hero — title + meta over the hero image. Image is the view-transition target. */}
      <section
        aria-label="Case study hero"
        className="max-w-6xl mx-auto px-6 pt-12 md:pt-16"
      >
        <p className="text-sm mb-4">
          <Link
            href="/work"
            className="hover:text-[color:var(--color-accent-primary)] transition-colors"
            style={{ color: "var(--color-text-secondary)" }}
          >
            ← Back to work
          </Link>
        </p>
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em] mb-4"
              style={{ color: "var(--color-accent-primary)" }}
            >
              Case study
            </p>
            <h1
              className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h1>
            <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm max-w-md">
              <dt style={{ color: "var(--color-text-secondary)" }}>Client</dt>
              <dd>{client}</dd>
              <dt style={{ color: "var(--color-text-secondary)" }}>Services</dt>
              <dd>
                {services.map((s) => SERVICE_LABEL[s]).join(" · ")}
              </dd>
              <dt style={{ color: "var(--color-text-secondary)" }}>Timeline</dt>
              <dd>{timeline}</dd>
            </dl>
          </div>
          <div className="relative aspect-[4/3] md:aspect-[5/4] rounded-2xl overflow-hidden ring-1 ring-[color:var(--color-hairline)]">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 60vw"
              // Static view-transition-name on the destination hero. Matches
              // whatever TransitionLink set dynamically on the origin tile.
              style={{ viewTransitionName: `work-${slug}` }}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats row */}
      <ResultStats results={results} />

      {/* Narrative (Challenge / Approach / Outcome) */}
      <section
        aria-label="Narrative"
        className="max-w-6xl mx-auto px-6 py-12 md:py-20"
      >
        <CaseStudyNarrative source={cs.body} />
      </section>

      {/* Next case study */}
      {next && next.frontmatter.slug !== slug ? (
        <section
          aria-label="Next case study"
          className="max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-[color:var(--color-hairline)]"
        >
          <p
            className="text-xs uppercase tracking-[0.3em] mb-4"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Next
          </p>
          <Link
            href={`/work/${next.frontmatter.slug}`}
            className="group flex items-baseline justify-between gap-6"
          >
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight hover:text-[color:var(--color-accent-primary)] transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {next.frontmatter.title}
            </h2>
            <span
              aria-hidden="true"
              className="text-3xl md:text-5xl transition-transform group-hover:translate-x-2"
              style={{ color: "var(--color-accent-primary)" }}
            >
              →
            </span>
          </Link>
        </section>
      ) : null}
    </main>
  );
}
