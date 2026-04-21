"use client";

import Link from "next/link";

/**
 * CtaSection — rounded bordered card with a dark green gradient and
 * a thin lime edge. Centered content, single primary CTA.
 */
export function CtaSection() {
  return (
    <section
      aria-label="Call to action"
      style={{
        backgroundColor: "#0a0a0a",
        padding: "0 48px 120px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          background: "linear-gradient(135deg, #0a1a0a 0%, #0a0a0a 100%)",
          border: "1px solid rgba(232,255,71,0.15)",
          borderRadius: 16,
          padding: "80px 48px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontWeight: 700,
            fontSize: "clamp(40px, 6vw, 72px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "#ffffff",
            margin: "0 0 20px",
          }}
        >
          Ready to build
          <br />
          something great?
        </h2>
        <p
          style={{
            fontWeight: 400,
            fontSize: 17,
            color: "rgba(255,255,255,0.5)",
            margin: "0 0 40px",
          }}
        >
          Let&apos;s talk about your project.
        </p>
        <Link
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "#e8ff47",
            color: "#0a0a0a",
            padding: "14px 28px",
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 15,
            textDecoration: "none",
            transition: "background-color 200ms ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#ffffff")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#e8ff47")
          }
        >
          Start a Project →
        </Link>
      </div>
    </section>
  );
}
