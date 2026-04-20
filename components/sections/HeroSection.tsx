"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * HeroSection — full viewport. Dark bg with grain + drifting dot grid.
 * Headline pins to bottom-left. Small "Hyderabad · India" text rotates
 * 90deg in the top-right corner.
 *
 *   ┌──────────────────────────────────────────────────┐
 *   │                                      Hyderabad·  │ ← rotated
 *   │                                         India    │
 *   │  (dot grid drifts behind)                        │
 *   │                                                  │
 *   │                                                  │
 *   │  We Build                                        │ ← Syne 800
 *   │  What Moves.                                     │
 *   │                                                  │
 *   │  Marketing · Web · AI Automation                 │
 *   │  [See Our Work →]  [Start a Project]             │
 *   └──────────────────────────────────────────────────┘
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section
      data-theme="dark"
      data-grain
      aria-label="Hero"
      className="relative min-h-[100dvh] overflow-hidden"
      style={{ background: "var(--color-bg-dark)" }}
    >
      <div className="hero-dotgrid" aria-hidden="true" />

      {/* Top-right rotated location text */}
      <div
        className="absolute top-24 right-6 md:right-10 z-10 select-none"
        aria-hidden="true"
      >
        <p
          className="uppercase whitespace-nowrap"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: 11,
            letterSpacing: "0.2em",
            color: "color-mix(in srgb, var(--color-text-primary) 45%, transparent)",
            writingMode: "vertical-rl",
            transform: "rotate(0deg)",
          }}
        >
          Hyderabad{" "}
          <span style={{ color: "var(--color-accent-primary)" }}>·</span> India
        </p>
      </div>

      {/* Bottom-left headline block */}
      <div className="absolute inset-x-0 bottom-8 sm:bottom-14 md:bottom-20 px-6 md:pl-14 md:pr-10">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.9, ease: EASE }}
            className="leading-[0.95] tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(44px, 8vw, 120px)",
              color: "var(--color-text-primary)",
            }}
          >
            We Build
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
            className="leading-[0.95] tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(44px, 8vw, 120px)",
              color: "var(--color-text-primary)",
            }}
          >
            What{" "}
            <span style={{ color: "var(--color-accent-primary)" }}>
              Moves.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9, ease: EASE }}
            className="mt-8"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: 18,
              color:
                "color-mix(in srgb, var(--color-text-primary) 50%, transparent)",
            }}
          >
            Marketing{" "}
            <span style={{ color: "var(--color-accent-primary)" }}>·</span> Web{" "}
            <span style={{ color: "var(--color-accent-primary)" }}>·</span> AI
            Automation
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease: EASE }}
            className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            <Link
              href="/work"
              className="group inline-flex items-center self-start py-2 text-base"
              data-cursor="hover"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-primary)",
                borderBottom: "2px solid var(--color-accent-primary)",
              }}
            >
              <span>See Our Work</span>
              <span
                aria-hidden="true"
                className="ml-2 transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center self-start text-base transition-colors hover:bg-[color:var(--color-bg-white)]"
              data-cursor="hover"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                background: "var(--color-accent-primary)",
                color: "var(--color-bg-dark)",
                padding: "16px 36px",
              }}
            >
              Start a Project
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
