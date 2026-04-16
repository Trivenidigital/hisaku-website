import { getCaseStudies } from "@/lib/content/case-studies";
import { getServices } from "@/lib/content/services";

/**
 * Home page — foundation placeholder.
 *
 * The real home page (hero, featured work tiles, capabilities statement,
 * testimonial, CTA) lands in a later step once brand identity + content are
 * ready. This placeholder exists so the foundation wires up end-to-end:
 * the content pipeline loads, next/font works, layout renders, no client JS.
 */
export default async function HomePage() {
  const caseStudies = getCaseStudies();
  const services = getServices();

  return (
    <main
      id="main"
      className="flex-1 max-w-3xl mx-auto px-6 py-24 flex flex-col gap-12"
    >
      <section>
        <p
          className="text-sm uppercase tracking-widest"
          style={{ color: "var(--color-accent-primary)" }}
        >
          Hisaku
        </p>
        <h1
          className="mt-6 text-5xl md:text-7xl font-bold tracking-tight leading-[1.02]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The work is the pitch.
        </h1>
        <p
          className="mt-6 max-w-xl text-lg"
          style={{ color: "var(--color-text-secondary)" }}
        >
          We don&apos;t sell slides. We show you what we&apos;ve built, and you
          decide. Design, development, and AI marketing for startups and
          growing companies.
        </p>
      </section>

      <section aria-label="Foundation check">
        <h2
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Foundation check
        </h2>
        <ul className="text-sm space-y-1 font-mono">
          <li>Case studies loaded: {caseStudies.length}</li>
          <li>Services loaded: {services.length}</li>
        </ul>
      </section>
    </main>
  );
}
