"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * ServicesSection — 2x2 card grid.
 *
 *   What We Do                                 4 services
 *
 *   ┌──────────────────────┬──────────────────────┐
 *   │ 01                   │ 02                   │
 *   │ Web Design           │ Development          │
 *   │ Beautiful, precise…  │ Fast, scalable…      │
 *   │                    → │                    → │
 *   ├──────────────────────┼──────────────────────┤
 *   │ 03                   │ 04                   │
 *   │ Marketing & SEO      │ AI Automation        │
 *   │ ...                  │ ...                  │
 *   └──────────────────────┴──────────────────────┘
 */

const SERVICES = [
  {
    number: "01",
    slug: "design",
    name: "Web Design",
    description:
      "Beautiful, precise websites that convert visitors into clients.",
  },
  {
    number: "02",
    slug: "development",
    name: "Development",
    description:
      "Fast, scalable builds on Next.js. Yours to own completely.",
  },
  {
    number: "03",
    slug: "digital-marketing",
    name: "Marketing & SEO",
    description:
      "Found by the right people at exactly the right moment.",
  },
  {
    number: "04",
    slug: "ai-marketing",
    name: "AI Automation",
    description:
      "Manual tasks automated. WhatsApp, workflows, reporting.",
  },
] as const;

export function ServicesSection() {
  return (
    <section
      aria-label="What we do"
      style={{
        backgroundColor: "#111111",
        padding: "120px 48px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              fontSize: "clamp(32px, 4vw, 40px)",
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            What We Do
          </h2>
          <p
            style={{
              fontWeight: 400,
              fontSize: 14,
              color: "rgba(255,255,255,0.5)",
              margin: 0,
            }}
          >
            4 services
          </p>
        </div>

        {/* 2x2 grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
}: {
  service: (typeof SERVICES)[number];
}) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={`/services/${service.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        backgroundColor: "#0a0a0a",
        border: `1px solid ${hover ? "#e8ff47" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 12,
        padding: 32,
        textDecoration: "none",
        transition: "all 300ms ease",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <p
        style={{
          fontWeight: 300,
          fontSize: 13,
          color: "#e8ff47",
          margin: 0,
          letterSpacing: "0.02em",
        }}
      >
        {service.number}
      </p>

      <h3
        style={{
          fontWeight: 700,
          fontSize: 22,
          color: "#ffffff",
          margin: "12px 0 8px",
          letterSpacing: "-0.01em",
        }}
      >
        {service.name}
      </h3>

      <p
        style={{
          fontWeight: 400,
          fontSize: 14,
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.6,
          margin: 0,
          minHeight: 44,
        }}
      >
        {service.description}
      </p>

      <p
        style={{
          margin: "24px 0 0",
          fontSize: 20,
          color: hover ? "#e8ff47" : "rgba(255,255,255,0.4)",
          transition: "color 200ms ease",
        }}
      >
        →
      </p>
    </Link>
  );
}
