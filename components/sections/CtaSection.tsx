"use client";

import Link from "next/link";

/**
 * CtaSection — gradient card. Static render (no motion wrapper).
 * Button keeps the shimmer-btn class and hover scale.
 */
export function CtaSection() {
  return (
    <section
      aria-label="Call to action"
      style={{
        backgroundColor: "#08090a",
        color: "#f7f8f8",
        padding: "0 48px 120px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          background: "linear-gradient(135deg, #0a1a0a 0%, #08090a 100%)",
          border: "1px solid rgba(232,255,71,0.15)",
          borderRadius: 16,
          padding: "80px 48px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontWeight: 510,
            fontSize: "clamp(40px, 6vw, 72px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "#f7f8f8",
            margin: "0 0 40px",
            textAlign: "center",
          }}
        >
          Ready to build
          <br />
          <span style={{ color: "#e8ff47" }}>something great?</span>
        </h2>
        <p
          style={{
            fontWeight: 400,
            fontSize: 17,
            color: "rgba(255,255,255,0.55)",
            margin: "0 0 40px",
          }}
        >
          Let&apos;s talk about your project.
        </p>
        <Link
          href="/contact"
          className="shimmer-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "#e8ff47",
            color: "#08090a",
            padding: "14px 28px",
            borderRadius: 6,
            fontWeight: 510,
            fontSize: 15,
            textDecoration: "none",
            transition: "all 200ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f0ff6e";
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#e8ff47";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Start a Project →
        </Link>
      </div>
    </section>
  );
}
