"use client";

import Link from "next/link";
import type { Service } from "@/lib/content/services";
import type { CaseStudy } from "@/lib/content/case-studies";
import { GlassCard } from "@/components/ui/GlassCard";

/**
 * ServiceDetail — editorial scroll page for a single capability.
 *
 * Oversized service name at the top, then a numbered feature list
 * (not a grid — a narrative sequence), then related case studies.
 */
interface ServiceDetailProps {
  service: Service;
  related: CaseStudy[];
}

const SERVICE_LABEL: Record<string, string> = {
  design: "Design",
  development: "Development",
  "digital-marketing": "Marketing",
  "ai-marketing": "AI Automation",
};

export function ServiceDetail({ service, related }: ServiceDetailProps) {
  const fm = service.frontmatter;
  return (
    <main
      id="main"
      style={{
        backgroundColor: "#0a0a0f",
        paddingTop: 160,
      }}
    >
      <section style={{ padding: "0 48px 80px" }}>
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
            Capability
          </p>
          <h1
            style={{
              margin: "16px 0 0",
              fontSize: "clamp(56px, 9vw, 128px)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              color: "#f7f8f8",
              lineHeight: 0.95,
            }}
          >
            {fm.title}
          </h1>
          <p
            style={{
              margin: "48px 0 0",
              fontSize: 20,
              lineHeight: 1.7,
              color: "#d0d6e0",
              maxWidth: 720,
              fontWeight: 400,
            }}
          >
            {fm.description}
          </p>
        </div>
      </section>

      <section
        style={{
          padding: "80px 48px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
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
            What's included
          </p>
          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: "48px 0 0",
              display: "flex",
              flexDirection: "column",
              gap: 48,
            }}
          >
            {fm.features.map((f, i) => (
              <li
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: 40,
                  paddingBottom: 48,
                  borderBottom:
                    i < fm.features.length - 1
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "none",
                }}
              >
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 500,
                    color: "#62666d",
                    letterSpacing: "-0.02em",
                    fontVariantNumeric: "tabular-nums",
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: 26,
                      fontWeight: 510,
                      letterSpacing: "-0.02em",
                      color: "#f7f8f8",
                      lineHeight: 1.2,
                    }}
                  >
                    {f.name}
                  </h2>
                  <p
                    style={{
                      margin: "16px 0 0",
                      fontSize: 16,
                      lineHeight: 1.7,
                      color: "#8a8f98",
                      maxWidth: 640,
                    }}
                  >
                    {f.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {related.length > 0 ? (
        <section
          style={{
            padding: "80px 48px 160px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
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
              Related work
            </p>
            <div
              style={{
                marginTop: 48,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 16,
              }}
            >
              {related.slice(0, 3).map((c) => {
                const r = c.frontmatter;
                return (
                  <Link
                    key={r.slug}
                    href={`/work/${r.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <GlassCard
                      interactive
                      radius={14}
                      style={{ padding: 28 }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: 12,
                          fontWeight: 500,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#8a8f98",
                        }}
                      >
                        {SERVICE_LABEL[r.services[0]] ?? r.services[0]} ·{" "}
                        {r.publishedAt.slice(0, 4)}
                      </p>
                      <h3
                        style={{
                          margin: "16px 0 0",
                          fontSize: 18,
                          fontWeight: 510,
                          letterSpacing: "-0.01em",
                          color: "#f7f8f8",
                          lineHeight: 1.3,
                        }}
                      >
                        {r.title}
                      </h3>
                    </GlassCard>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
