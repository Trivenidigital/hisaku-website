"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * HeroSection — full viewport, dark.
 *
 * Layout (terminal-industries-style):
 *   - section: position: relative, min-height 100dvh
 *   - content block: position: absolute, bottom: 80px, left: 60px
 *   - scroll indicator: position: absolute, bottom: 32px, left: 50%, translateX(-50%)
 *   - rotated "Hyderabad · India" top-right
 *
 * The explicit bottom-left anchor is non-negotiable — pinning headline
 * to the bottom is the terminal-industries signature. Left: 60px on
 * desktop, clamps down to 24px on mobile.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section
      data-theme="dark"
      data-grain
      aria-label="Hero"
      className="overflow-hidden"
      style={{
        position: "relative",
        minHeight: "100dvh",
        background: "var(--color-bg-dark)",
      }}
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
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            fontSize: 11,
            letterSpacing: "0.2em",
            color: "color-mix(in srgb, var(--color-text-primary) 45%, transparent)",
            writingMode: "vertical-rl",
          }}
        >
          Hyderabad{" "}
          <span style={{ color: "var(--color-accent-primary)" }}>·</span> India
        </p>
      </div>

      {/* Bottom-left headline block — explicit pixel anchor per design spec. */}
      <div
        className="px-6 sm:px-10 md:px-0"
        style={{
          position: "absolute",
          // On mobile keep a safer offset; desktop uses the exact 80px/60px anchor.
          bottom: "clamp(40px, 8vw, 80px)",
          left: 0,
          right: 0,
        }}
      >
        <div
          className="max-w-6xl mx-auto"
          style={{ paddingLeft: "clamp(24px, 5vw, 60px)" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.9, ease: EASE }}
            className="font-syne leading-[0.95] tracking-tight"
            style={{
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
            className="font-syne leading-[0.95] tracking-tight"
            style={{
              fontWeight: 800,
              fontSize: "clamp(44px, 8vw, 120px)",
              color: "var(--color-text-primary)",
            }}
          >
            What{" "}
            <span style={{ color: "var(--color-accent-primary)" }}>Moves.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9, ease: EASE }}
            className="font-sans mt-8"
            style={{
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
              className="font-sans group inline-flex items-center self-start py-2 text-base"
              data-cursor="hover"
              style={{
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
              className="font-syne inline-flex items-center self-start text-base transition-colors hover:bg-[color:var(--color-bg-white)]"
              data-cursor="hover"
              style={{
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

      {/* Scroll indicator — bottom-center, bouncing arrow */}
      <div
        aria-hidden="true"
        className="hero-scroll-indicator"
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "color-mix(in srgb, var(--color-text-primary) 55%, transparent)",
          fontSize: "22px",
          lineHeight: 1,
          pointerEvents: "none",
        }}
      >
        ↓
      </div>
    </section>
  );
}
