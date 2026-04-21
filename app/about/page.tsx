import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "A 2-person studio based in Hyderabad. We design, build, and grow digital products for startups and growing companies across 3 countries.",
  canonicalPath: "/about",
});

/**
 * About page — 4-section layout.
 *
 *   1. Hero (60vh, dark, centered): "We Build What Moves."
 *   2. Big statement (white): founder thesis
 *   3. Values as 3 large rows (dark): craft / outcomes / simplicity
 *   4. Location strip (white): Hyderabad + 3 countries
 *   5. CTA (teal): Ready to move?
 */

const VALUES = [
  {
    number: "01",
    title: "Craft over speed",
    body: "We'd rather ship one thing that's tight than five things that are sloppy. Speed matters, but not at the expense of what we'd put our name on.",
  },
  {
    number: "02",
    title: "Outcomes over outputs",
    body: "Deliverables aren't the point. The point is your revenue going up, your customers booking faster, your team stopping manual work. We design backwards from that.",
  },
  {
    number: "03",
    title: "Simple over clever",
    body: "If it takes a 40-minute explainer to understand, it's wrong. The work we're proud of is the work you can point at and immediately understand why it's there.",
  },
];

export default function AboutPage() {
  return (
    <main id="main" style={{ backgroundColor: "#050507" }}>
      {/* Section 1 — Hero */}
      <section
        data-theme="dark"
        style={{
          backgroundColor: "#050507",
          minHeight: "60vh",
          paddingTop: 160,
          paddingBottom: 80,
          paddingLeft: 60,
          paddingRight: 60,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontWeight: 300,
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#e8ff47",
            marginBottom: 24,
          }}
        >
          About Hisaku
        </p>
        <h1
          style={{
            fontFamily: "var(--font-syne, sans-serif)",
            fontWeight: 800,
            fontSize: "clamp(64px, 9vw, 120px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            color: "#f4f3ef",
          }}
        >
          We Build What Moves.
        </h1>
      </section>

      {/* Section 2 — Big statement (white) */}
      <section
        data-theme="light"
        style={{
          backgroundColor: "#f4f3ef",
          color: "#050507",
          padding: "160px 60px",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-syne, sans-serif)",
              fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 60px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#050507",
            }}
          >
            We are a 2-person studio that builds digital products, websites,
            and AI systems for businesses that want to grow.
          </h2>
        </div>
      </section>

      {/* Section 3 — Values as 3 large rows (dark) */}
      <section
        data-theme="dark"
        style={{
          backgroundColor: "#050507",
          color: "#f4f3ef",
          padding: "120px 0",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 60px" }}>
          <p
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(244,243,239,0.3)",
              marginBottom: 56,
            }}
          >
            How We Work
          </p>
        </div>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {VALUES.map((v) => (
            <li
              key={v.number}
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                padding: "48px 60px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr 1fr",
                  alignItems: "start",
                  gap: 40,
                  maxWidth: 1280,
                  margin: "0 auto",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontWeight: 300,
                    fontSize: 13,
                    color: "rgba(244,243,239,0.25)",
                  }}
                >
                  {v.number}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-syne, sans-serif)",
                    fontWeight: 700,
                    fontSize: "clamp(32px, 5vw, 64px)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    color: "#f4f3ef",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontWeight: 300,
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: "rgba(244,243,239,0.6)",
                  }}
                >
                  {v.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 4 — Location strip (white) */}
      <section
        data-theme="light"
        style={{
          backgroundColor: "#f4f3ef",
          color: "#050507",
          padding: "160px 60px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-syne, sans-serif)",
            fontWeight: 800,
            fontSize: "clamp(36px, 5vw, 64px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "#050507",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          Based in Hyderabad, India.
          <br />
          Working with clients across 3 countries.
        </h2>
      </section>

      {/* Section 5 — CTA (teal) */}
      <section
        data-theme="dark"
        style={{
          backgroundColor: "#0a3d2e",
          color: "#f4f3ef",
          padding: "160px 60px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="teal-grid" aria-hidden="true" />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2
            style={{
              fontFamily: "var(--font-syne, sans-serif)",
              fontWeight: 800,
              fontSize: "clamp(64px, 10vw, 120px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.88,
              color: "#f4f3ef",
              marginBottom: 56,
            }}
          >
            Ready to
            <br />
            <span style={{ color: "#e8ff47" }}>move?</span>
          </h2>
          <Link
            href="/contact"
            data-cursor="hover"
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#e8ff47",
              color: "#0a3d2e",
              padding: "20px 56px",
              fontFamily: "var(--font-syne, sans-serif)",
              fontWeight: 600,
              fontSize: 18,
            }}
          >
            Start a Project
            <span aria-hidden="true" style={{ marginLeft: 12 }}>
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
