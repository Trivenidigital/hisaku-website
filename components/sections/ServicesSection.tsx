import Link from "next/link";

/**
 * ServicesSection — editorial list. Four rows, CSS hover reveal.
 *
 *   ── WHAT WE DO
 *   ┌──────────────────────────────────────────────────────────┐
 *   │ 01  Web Design         Beautiful. Precise. Memorable.  → │
 *   ├──────────────────────────────────────────────────────────┤
 *   │ 02  Web Development    Fast. Scalable. Yours.          → │
 *   ├──────────────────────────────────────────────────────────┤
 *   │ 03  Marketing & SEO    Found. Clicked. Converted.      → │
 *   ├──────────────────────────────────────────────────────────┤
 *   │ 04  AI Automation      Automated. Intelligent...       → │
 *   └──────────────────────────────────────────────────────────┘
 *
 * Hover: row background becomes elevated surface, description fades in,
 * arrow appears. All CSS, no JS.
 */

const SERVICES = [
  {
    slug: "design",
    number: "01",
    name: "Web Design",
    description: "Beautiful. Precise. Memorable.",
  },
  {
    slug: "development",
    number: "02",
    name: "Web Development",
    description: "Fast. Scalable. Yours.",
  },
  {
    slug: "digital-marketing",
    number: "03",
    name: "Marketing & SEO",
    description: "Found. Clicked. Converted.",
  },
  {
    slug: "ai-marketing",
    number: "04",
    name: "AI Automation",
    description: "Automated. Intelligent. Unstoppable.",
  },
] as const;

export function ServicesSection() {
  return (
    <section
      aria-label="What we do"
      className="relative py-24 md:py-32"
      style={{ background: "var(--color-base)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <p
          className="text-xs uppercase tracking-[0.3em] mb-12"
          style={{ color: "var(--color-accent-primary)" }}
        >
          What We Do
        </p>

        <ul className="flex flex-col">
          {SERVICES.map((service) => (
            <li
              key={service.slug}
              className="border-t"
              style={{ borderColor: "var(--color-hairline)" }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-10 py-8 px-0 md:px-6 transition-colors duration-300 ease-out hover:bg-[color:var(--color-elevated)]"
                style={{
                  fontFamily: "var(--font-body)",
                }}
              >
                <span
                  className="text-sm tabular-nums"
                  style={{
                    fontWeight: 300,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {service.number}
                </span>

                <span className="flex items-baseline gap-4 min-w-0">
                  <span
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {service.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-base"
                    style={{
                      fontWeight: 300,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {service.description}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-2xl"
                  style={{ color: "var(--color-accent-primary)" }}
                >
                  →
                </span>
              </Link>
              {/* Mobile: show description below, since hover doesn't exist on touch */}
              <p
                className="md:hidden pb-6 text-sm"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  color: "var(--color-text-secondary)",
                }}
              >
                {service.description}
              </p>
            </li>
          ))}
          <li
            className="border-t"
            style={{ borderColor: "var(--color-hairline)" }}
          />
        </ul>
      </div>
    </section>
  );
}
