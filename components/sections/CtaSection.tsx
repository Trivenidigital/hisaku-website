"use client";

import Link from "next/link";

/**
 * CtaSection — full-width, no inner card, no gradient.
 * Just large typography and a single violet CTA.
 */
export function CtaSection() {
  return (
    <section
      aria-label="Call to action"
      style={{
        backgroundColor: "#0a0a0f",
        color: "#f7f8f8",
        padding: "120px 48px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        textAlign: "left",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2
          style={{
            fontWeight: 510,
            fontSize: "clamp(44px, 7vw, 88px)",
            letterSpacing: "-0.03em",
            lineHeight: 0.98,
            color: "#f7f8f8",
            margin: 0,
            maxWidth: 900,
          }}
        >
          Ready to build
          <br />
          something great?
        </h2>
        <p
          style={{
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.6,
            color: "#8a8f98",
            margin: "32px 0 0",
            maxWidth: 560,
          }}
        >
          Let&apos;s talk about your project.
        </p>
        <Link
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginTop: 48,
            backgroundColor: "#8B5CF6",
            color: "#ffffff",
            padding: "14px 28px",
            borderRadius: 8,
            fontWeight: 510,
            fontSize: 15,
            textDecoration: "none",
            transition: "background-color 200ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#7C3AED";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#8B5CF6";
          }}
        >
          Start a Project →
        </Link>
      </div>
    </section>
  );
}
