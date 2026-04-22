"use client";

import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { DotPattern } from "@/components/ui/DotPattern";

/**
 * Capabilities — BentoGrid layout with intentionally mixed cell sizes.
 *
 * 6-column grid:
 *   [  Design    (cols 1-3)  ][  Development (cols 4-6)  ]
 *   [  Marketing (cols 1-4, wide)  ][ AI (cols 5-6, tall) ]
 *
 * Different from the 2x2 homepage grid — this page is asymmetric on
 * purpose so the eye knows it's a different page.
 */
interface CapabilityCell {
  slug: string;
  title: string;
  summary: string;
  features: { name: string; description: string }[];
  span: { cols: number; area?: string };
}

export function Capabilities({ services }: { services: CapabilityCell[] }) {
  return (
    <main
      id="main"
      style={{
        backgroundColor: "#0a0a0f",
        position: "relative",
        paddingTop: 160,
        paddingBottom: 160,
        overflow: "hidden",
      }}
    >
      <DotPattern size={32} color="rgba(255,255,255,0.03)" />

      <section
        style={{
          position: "relative",
          padding: "0 48px 80px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
          <h1
            style={{
              margin: "16px 0 0",
              fontSize: "clamp(48px, 7vw, 88px)",
              fontWeight: 500,
              letterSpacing: "-0.035em",
              color: "#f7f8f8",
              lineHeight: 0.98,
              maxWidth: 1000,
            }}
          >
            Four disciplines.
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "#d0d6e0" }}>
              One team.
            </span>
          </h1>
          <p
            style={{
              margin: "32px 0 0",
              fontSize: 18,
              lineHeight: 1.6,
              color: "#8a8f98",
              maxWidth: 620,
            }}
          >
            We don't subcontract. Design, engineering, marketing, and automation
            all live inside the studio. Fewer handoffs, tighter feedback loops,
            better work.
          </p>
        </div>
      </section>

      <section style={{ position: "relative", padding: "0 48px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 16,
          }}
        >
          {services.map((s, i) => {
            // Asymmetric layout:
            //  i=0 → cols 1-3 (span 3)
            //  i=1 → cols 4-6 (span 3)
            //  i=2 → cols 1-4 (span 4, wide)
            //  i=3 → cols 5-6 (span 2, narrow)
            const span = [3, 3, 4, 2][i] ?? 3;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                style={{
                  gridColumn: `span ${span}`,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <GlassCard
                  interactive
                  radius={16}
                  style={{ padding: 40, height: "100%", minHeight: 280 }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 12,
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#62666d",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2
                      style={{
                        margin: "16px 0 0",
                        fontSize: 28,
                        fontWeight: 510,
                        letterSpacing: "-0.02em",
                        color: "#f7f8f8",
                      }}
                    >
                      {s.title}
                    </h2>
                    <p
                      style={{
                        margin: "16px 0 0",
                        fontSize: 15,
                        lineHeight: 1.7,
                        color: "#8a8f98",
                        flex: 1,
                      }}
                    >
                      {s.summary}
                    </p>
                    <div
                      style={{
                        marginTop: 28,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      {s.features.slice(0, 3).map((f, j) => (
                        <span
                          key={j}
                          style={{
                            fontSize: 12,
                            fontWeight: 400,
                            color: "#d0d6e0",
                            border: "1px solid rgba(255,255,255,0.08)",
                            padding: "4px 10px",
                            borderRadius: 999,
                            letterSpacing: "0.01em",
                          }}
                        >
                          {f.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
