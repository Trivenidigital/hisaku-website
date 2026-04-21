"use client";

import Link from "next/link";

/**
 * ServicesSection — static 2x2 card grid.
 *
 * Per user spec: no motion wrappers. Plain divs with inline styles
 * and onMouseEnter/Leave for the hover state. Cards wrapped in Link
 * so clicking still routes to the service detail page.
 */

const SERVICES = [
  {
    num: "01",
    slug: "design",
    name: "Web Design",
    desc: "Beautiful, precise websites that convert visitors into clients.",
  },
  {
    num: "02",
    slug: "development",
    name: "Development",
    desc: "Fast, scalable builds on Next.js. Yours to own completely.",
  },
  {
    num: "03",
    slug: "digital-marketing",
    name: "Marketing & SEO",
    desc: "Found by the right people at exactly the right moment.",
  },
  {
    num: "04",
    slug: "ai-marketing",
    name: "AI Automation",
    desc: "Manual tasks automated. WhatsApp, workflows, reporting.",
  },
];

export function ServicesSection() {
  return (
    <section
      aria-label="What we do"
      style={{ backgroundColor: "#111111", padding: "120px 48px" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p
          style={{
            color: "#e8ff47",
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 64,
            fontWeight: 500,
            margin: "0 0 64px",
          }}
        >
          What We Do
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {SERVICES.map((s) => (
            <Link
              key={s.num}
              href={`/services/${s.slug}`}
              style={{
                display: "block",
                backgroundColor: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                padding: 32,
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 300ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(232,255,71,0.4)";
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <p
                style={{
                  color: "#e8ff47",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  margin: 0,
                }}
              >
                {s.num}
              </p>
              <h3
                style={{
                  color: "#ffffff",
                  fontSize: 22,
                  fontWeight: 700,
                  margin: "12px 0 8px",
                  letterSpacing: "-0.01em",
                }}
              >
                {s.name}
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {s.desc}
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 18,
                  marginTop: 16,
                  marginBottom: 0,
                }}
              >
                →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
