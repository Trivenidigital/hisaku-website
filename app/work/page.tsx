import type { Metadata } from "next";
import Link from "next/link";
import { getCaseStudies } from "@/lib/content/case-studies";
import { WorkTile } from "@/components/WorkTile";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Selected case studies from Hisaku. Design, development, and marketing projects we've shipped for startups and growing companies.",
  canonicalPath: "/work",
});

/**
 * Work grid — every published case study, sorted newest first.
 *
 * Layout: single column mobile, 2-col tablet, 2-col desktop with one hero
 * tile at full width breaking the rhythm. Per plan's section rhythm rule.
 */
export default function WorkIndexPage() {
  const all = getCaseStudies();

  return (
    <main id="main" className="flex-1">
      <section
        aria-label="Work intro"
        className="max-w-6xl mx-auto px-6 pt-20 md:pt-28 pb-12"
      >
        <p
          className="text-xs uppercase tracking-[0.3em] mb-6"
          style={{ color: "var(--color-accent-primary)" }}
        >
          Selected work
        </p>
        <h1
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-3xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Things we&apos;ve
          <br />
          built and shipped.
        </h1>
        <p
          className="mt-6 max-w-xl text-lg"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Every project here launched and is running. No concept mockups, no
          &ldquo;coming soon.&rdquo;
        </p>
      </section>

      {all.length === 0 ? (
        <section
          aria-label="Empty state"
          className="max-w-6xl mx-auto px-6 py-24 text-center"
        >
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Case studies coming soon.
          </h2>
          <p
            className="mt-4 max-w-md mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            We&apos;ve shipped the work. Adding the stories.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold"
              style={{
                background: "var(--color-accent-primary)",
                color: "var(--color-base)",
              }}
            >
              Start a project
            </Link>
          </div>
        </section>
      ) : (
        <section
          aria-label="Case studies"
          className="max-w-6xl mx-auto px-6 pb-20"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {all.map((cs, i) => (
              <div key={cs.frontmatter.slug} className={i === 0 ? "md:col-span-2" : undefined}>
                <WorkTile
                  caseStudy={cs}
                  variant={i === 0 ? "hero" : "standard"}
                  sizes={
                    i === 0
                      ? "(max-width: 767px) 100vw, 100vw"
                      : "(max-width: 767px) 100vw, 50vw"
                  }
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
