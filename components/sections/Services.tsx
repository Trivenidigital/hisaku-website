"use client";

import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { DotPattern } from "@/components/ui/DotPattern";

/**
 * Services — 2x2 glass cell grid over a DotPattern background.
 *
 * Numbers are in dim grey #62666d — not violet. Each cell is a
 * GlassCard; hover lifts and brightens the border. No glow, no violet
 * inside the cells.
 */
const SERVICES = [
  {
    num: "01",
    title: "Web Design",
    desc: "Editorial, conversion-focused websites. Not templates — not from a builder.",
    href: "/services/design",
  },
  {
    num: "02",
    title: "Development",
    desc: "Next.js apps, headless commerce, custom integrations. Type-safe, tested, fast.",
    href: "/services/development",
  },
  {
    num: "03",
    title: "Marketing & SEO",
    desc: "Technical SEO, content systems, paid acquisition. Compounding traffic, not rented.",
    href: "/services/digital-marketing",
  },
  {
    num: "04",
    title: "AI Automation",
    desc: "Workflow agents, data pipelines, AI-first internal tools. Hours back per week.",
    href: "/services/ai-marketing",
  },
];

export function Services() {
  return (
    <section
      aria-label="Services"
      style={{
        position: "relative",
        backgroundColor: "#0a0a0f",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "120px 48px",
        overflow: "hidden",
      }}
    >
      <DotPattern
        size={28}
        color="rgba(255,255,255,0.04)"
      />
      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 64 }}>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#8a8f98",
            }}
          >
            Capabilities
          </p>
          <h2
            style={{
              margin: "16px 0 0",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              color: "#f7f8f8",
              lineHeight: 1.05,
              maxWidth: 720,
            }}
          >
            Four disciplines.{" "}
            <span style={{ color: "#8a8f98" }}>One team.</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 16,
          }}
        >
          {SERVICES.map((s) => (
            <Link
              key={s.num}
              href={s.href}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <GlassCard interactive radius={14} style={{ padding: 36 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 16,
                    marginBottom: 20,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#62666d",
                      letterSpacing: "0.08em",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {s.num}
                  </span>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 22,
                      fontWeight: 510,
                      letterSpacing: "-0.02em",
                      color: "#f7f8f8",
                    }}
                  >
                    {s.title}
                  </h3>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "#8a8f98",
                    maxWidth: 420,
                  }}
                >
                  {s.desc}
                </p>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 28,
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#d0d6e0",
                  }}
                >
                  Explore →
                </span>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
