import Link from "next/link";

/**
 * Capabilities statement — replaces the 4-card services grid with one
 * typographic statement per the plan. Each discipline name is a link to
 * its service detail page.
 *
 * Renders inline (wraps naturally on narrow viewports).
 */
const CAPABILITIES = [
  { slug: "design", label: "Design" },
  { slug: "development", label: "Development" },
  { slug: "digital-marketing", label: "Digital Marketing" },
  { slug: "ai-marketing", label: "AI Marketing" },
] as const;

export function CapabilitiesStatement() {
  return (
    <section
      aria-label="Capabilities"
      className="max-w-6xl mx-auto px-6 py-20 md:py-28"
    >
      <p
        className="text-xs uppercase tracking-[0.3em] mb-6"
        style={{ color: "var(--color-accent-primary)" }}
      >
        What we do
      </p>
      <h2
        className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {CAPABILITIES.map((c, i) => (
          <span key={c.slug}>
            <Link
              href={`/services/${c.slug}`}
              className="hover:text-[color:var(--color-accent-primary)] transition-colors underline-offset-8 decoration-[color:var(--color-hairline)] hover:decoration-[color:var(--color-accent-primary)] decoration-2 underline"
            >
              {c.label}
            </Link>
            {i < CAPABILITIES.length - 1 ? (
              <span
                aria-hidden="true"
                style={{ color: "var(--color-text-secondary)" }}
              >
                .{" "}
              </span>
            ) : (
              <span aria-hidden="true">.</span>
            )}
          </span>
        ))}
      </h2>
      <p
        className="mt-8 max-w-2xl text-base md:text-lg"
        style={{ color: "var(--color-text-secondary)" }}
      >
        One team. End-to-end. From the brand that sells to the code that
        ships to the growth engine that keeps it going.
      </p>
    </section>
  );
}
