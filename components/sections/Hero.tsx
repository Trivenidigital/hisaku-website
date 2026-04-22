"use client";

import Link from "next/link";
import { RadialVignette } from "@/components/ui/RadialVignette";

/**
 * Homepage Hero — still, composed, Superhuman-restrained.
 *
 * Single radial violet bloom (8% opacity) centered horizontally,
 * lower-third vertically. No motion, no aurora, no video.
 * Content is left-aligned editorial: eyebrow, headline, sub, CTAs.
 *
 * Vertically anchored at 55% (slightly lower than centre) so the
 * violet CTA lands near the vignette's peak brightness.
 */
export function Hero() {
  return (
    <section
      aria-label="Hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#0a0a0f",
        overflow: "hidden",
      }}
    >
      <RadialVignette color="#8B5CF6" opacity={0.08} x={50} y={65} size={55} />

      <div
        style={{
          position: "absolute",
          top: "55%",
          left: 0,
          right: 0,
          transform: "translateY(-50%)",
          padding: "0 48px",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p
            style={{
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#8a8f98",
              margin: "0 0 32px",
            }}
          >
            Web Design · Development · AI Automation
          </p>

          <h1
            style={{
              fontWeight: 500,
              fontSize: "clamp(48px, 7vw, 96px)",
              letterSpacing: "-0.035em",
              lineHeight: 0.96,
              color: "#f7f8f8",
              margin: 0,
              maxWidth: 1100,
            }}
          >
            We build digital
            <br />
            experiences that{" "}
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>move.</span>
          </h1>

          <p
            style={{
              fontWeight: 400,
              fontSize: 18,
              lineHeight: 1.6,
              color: "#8a8f98",
              maxWidth: 560,
              margin: "32px 0 0",
            }}
          >
            A Hyderabad studio building websites, marketing systems, and AI
            automation for businesses that want to grow.
          </p>

          <div
            style={{
              marginTop: 48,
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
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
            <Link
              href="/work"
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
                e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              See Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
