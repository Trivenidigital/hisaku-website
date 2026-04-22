"use client";

import Link from "next/link";

/**
 * CTA — full-width closing section. No card, no glass. Oversized
 * editorial headline, single violet primary, single ghost secondary.
 */
export function CTA() {
  return (
    <section
      aria-label="Start a project"
      style={{
        backgroundColor: "#0a0a0f",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "160px 48px",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
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
          Let's build
        </p>
        <h2
          style={{
            margin: "20px 0 0",
            fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 500,
            letterSpacing: "-0.035em",
            color: "#f7f8f8",
            lineHeight: 1.02,
          }}
        >
          Have a project in mind?
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 400, color: "#d0d6e0" }}>
            Let's talk.
          </span>
        </h2>
        <p
          style={{
            margin: "28px auto 0",
            fontSize: 18,
            lineHeight: 1.6,
            color: "#8a8f98",
            maxWidth: 560,
          }}
        >
          We reply within one business day. Expect a real conversation, not a
          sales pitch.
        </p>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#8B5CF6",
              color: "#ffffff",
              padding: "14px 28px",
              borderRadius: 8,
              fontWeight: 510,
              fontSize: 15,
              textDecoration: "none",
              transition: "background-color 200ms ease, box-shadow 200ms ease",
              boxShadow: "0 0 0 rgba(139,92,246,0)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#7C3AED";
              e.currentTarget.style.boxShadow =
                "0 0 32px rgba(139,92,246,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#8B5CF6";
              e.currentTarget.style.boxShadow = "0 0 0 rgba(139,92,246,0)";
            }}
          >
            Start a Project →
          </Link>
          <a
            href="mailto:hello@hisaku.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#f7f8f8",
              padding: "14px 28px",
              borderRadius: 8,
              fontWeight: 510,
              fontSize: 15,
              textDecoration: "none",
              transition:
                "border-color 200ms ease, background-color 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            hello@hisaku.com
          </a>
        </div>
      </div>
    </section>
  );
}
