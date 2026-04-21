"use client";

import { ClipReveal } from "@/components/ui/ClipReveal";
import { FadeIn } from "@/components/ui/FadeIn";

/**
 * StudioStatement — WHITE bg. Second contrast flip after services (dark).
 * Centered headline with italic-Syne emphasis (instead of lime, which
 * would fight readability on the warm white). Three inline stats below.
 */
export function StudioStatement() {
  return (
    <section
      data-theme="light"
      aria-label="Studio"
      className="text-center px-6"
      style={{
        backgroundColor: "#f4f3ef",
        color: "#050507",
        paddingTop: "clamp(120px, 14vw, 160px)",
        paddingBottom: "clamp(120px, 14vw, 160px)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-syne"
          style={{
            fontWeight: 800,
            fontSize: "clamp(40px, 6vw, 72px)",
            letterSpacing: "-0.03em",
            lineHeight: 0.92,
            color: "#050507",
          }}
        >
          <ClipReveal delay={0}>
            <span className="block">A 2-person studio</span>
          </ClipReveal>
          <ClipReveal delay={0.1}>
            <span className="block">
              that{" "}
              <em style={{ fontStyle: "italic", fontWeight: 800 }}>builds</em>{" "}
              like
            </span>
          </ClipReveal>
          <ClipReveal delay={0.2}>
            <span className="block">
              a{" "}
              <em style={{ fontStyle: "italic", fontWeight: 800 }}>
                20-person
              </em>{" "}
              agency.
            </span>
          </ClipReveal>
        </h2>

        <FadeIn delay={0.35}>
          <p
            className="mt-12 md:mt-16"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: 15,
              color:
                "color-mix(in srgb, var(--color-text-primary) 50%, transparent)",
            }}
          >
            3 countries{" "}
            <span
              aria-hidden="true"
              className="mx-3"
              style={{ color: "var(--color-accent-primary)" }}
            >
              ·
            </span>{" "}
            8 clients{" "}
            <span
              aria-hidden="true"
              className="mx-3"
              style={{ color: "var(--color-accent-primary)" }}
            >
              ·
            </span>{" "}
            0 missed deadlines
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
