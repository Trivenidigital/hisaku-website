import Link from "next/link";
import Image from "next/image";
import { getCaseStudies } from "@/lib/content/case-studies";
import { WorkTile } from "@/components/WorkTile";
import { CapabilitiesStatement } from "@/components/CapabilitiesStatement";
import { Testimonial } from "@/components/Testimonial";
import { TransitionLink } from "@/components/TransitionLink";

/**
 * Home page.
 *
 * Section order (per revised information architecture from design review):
 *   1. Hero — bold typographic statement + visual anchor (real work)
 *   2. Featured work — 60% of vertical real estate, asymmetric grid
 *   3. Capabilities — ONE typographic statement, not a card grid
 *   4. Testimonial — pull quote adjacent to work
 *   5. CTA — final "Start a project" block
 *
 * Navbar and footer come from the root layout.
 */
export default function HomePage() {
  const all = getCaseStudies();
  const featured = all.slice(0, 4);
  const heroTile = featured[0];
  const supporting = featured.slice(1);

  return (
    <main id="main" className="flex-1">
      {/* Hero */}
      <section
        aria-label="Hero"
        className="max-w-6xl mx-auto px-6 pt-20 md:pt-28 pb-16"
      >
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em] mb-6"
              style={{ color: "var(--color-accent-primary)" }}
            >
              Hisaku · Digital agency
            </p>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              We Build
              <br />
              What Moves.
            </h1>
            <p
              className="mt-8 max-w-xl text-lg md:text-xl"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Design, development, and AI marketing for startups and growing
              companies. We don&apos;t sell slides. We show you what we&apos;ve
              built, and you decide.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.02]"
                style={{
                  background: "var(--color-accent-primary)",
                  color: "var(--color-base)",
                }}
              >
                Start a project
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold border transition-colors hover:border-[color:var(--color-accent-primary)]"
                style={{
                  borderColor: "var(--color-hairline)",
                  color: "var(--color-text-primary)",
                }}
              >
                See our work
              </Link>
            </div>
          </div>

          {/* Visual anchor — latest published case study, links through with view transition. */}
          {heroTile ? (
            <TransitionLink
              href={`/work/${heroTile.frontmatter.slug}`}
              transitionName={`work-${heroTile.frontmatter.slug}`}
              className="group block relative"
            >
              <div className="relative aspect-[4/3] md:aspect-[5/4] rounded-2xl overflow-hidden ring-1 ring-[color:var(--color-hairline)]">
                <Image
                  src={heroTile.frontmatter.hero.src}
                  alt={heroTile.frontmatter.hero.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  priority
                  data-morph-origin=""
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p
                    className="text-xs uppercase tracking-widest"
                    style={{ color: "var(--color-accent-primary)" }}
                  >
                    Latest work
                  </p>
                  <p className="mt-1 font-semibold">
                    {heroTile.frontmatter.title}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="text-2xl transition-transform group-hover:translate-x-1"
                  style={{ color: "var(--color-accent-primary)" }}
                >
                  →
                </span>
              </div>
            </TransitionLink>
          ) : null}
        </div>
      </section>

      {/* Featured work — work-first info architecture */}
      {supporting.length > 0 ? (
        <section
          aria-label="Featured work"
          className="max-w-6xl mx-auto px-6 py-12"
        >
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <h2
              className="text-2xl md:text-3xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Selected work
            </h2>
            <Link
              href="/work"
              className="text-sm hover:text-[color:var(--color-accent-primary)] transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
            >
              See all &rarr;
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supporting.map((cs) => (
              <WorkTile
                key={cs.frontmatter.slug}
                caseStudy={cs}
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* Capabilities — typographic statement, not a card grid */}
      <CapabilitiesStatement />

      {/* Testimonial — inline, not a separate walled section */}
      <Testimonial
        quote="They shipped what we'd been trying to build for a year in 12 weeks. Design, engineering, AI integration — one team, one invoice, zero drama."
        author="Vizora team"
        attribution="On the Vizora launch"
      />

      {/* Editorial interruption + final CTA */}
      <section
        aria-label="Call to action"
        className="max-w-6xl mx-auto px-6 py-20 md:py-28"
      >
        <div className="border-t border-[color:var(--color-hairline)] pt-16 md:pt-20 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <h2
            className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Got something
            <br />
            worth building?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-[1.02] self-start md:self-end"
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
