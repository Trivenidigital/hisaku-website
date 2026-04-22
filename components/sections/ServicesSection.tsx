"use client";

import Link from "next/link";

/**
 * ServicesSection — 2x2 card grid, Superhuman-restrained.
 * Single bg #0a0a0f. Numbers are muted grey, not violet.
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
      style={{
        backgroundColor: "#0a0a0f",
        padding: "100px 48px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p
          style={{
            color: "#62666d",
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 500,
            margin: "0 0 64px",
          }}
        >
          What We Do
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
          }}
        >
          {SERVICES.map((s) => (
            <Link
              key={s.num}
              href={`/services/${s.slug}`}
              style={{
                display: "block",
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 8,
                padding: 32,
                cursor: "pointer",
                textDecoration: "none",
                transition: "background-color 300ms ease, border-color 300ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              <p
                style={{
                  color: "#62666d",
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
                  color: "#f7f8f8",
                  fontSize: 22,
                  fontWeight: 510,
                  margin: "12px 0 8px",
                  letterSpacing: "-0.01em",
                }}
              >
                {s.name}
              </h3>
              <p
                style={{
                  color: "#8a8f98",
                  fontSize: 14,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {s.desc}
              </p>
              <p
                style={{
                  color: "#62666d",
                  fontSize: 14,
                  marginTop: 24,
                  marginBottom: 0,
                }}
              >
                Learn more →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
