"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * HeroSection — full-viewport terminal-industries-inspired hero.
 *
 *   ┌───────────────────────────────────────────────────────────┐
 *   │                  [drifting dot grid]                      │
 *   │                                                           │
 *   │     WE BUILD                                              │
 *   │     WHAT MOVES.        ← Syne 800, staggered word reveal  │
 *   │                                                           │
 *   │     Marketing · Web · AI Automation                       │
 *   │                                                           │
 *   │     [See Our Work →]   [Start a Project]                  │
 *   │                                                           │
 *   │                                                           │
 *   │   VIZORA · HELLO2INDIA · TRIVENI EXPRESS · WEB DESIGN…   │  ← marquee
 *   └───────────────────────────────────────────────────────────┘
 *
 * All animation: framer-motion for word reveal + subhead fade; CSS for
 * dot-grid drift and marquee. Respects prefers-reduced-motion globally.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const WORDS = ["We", "Build", "What", "Moves."];

// Marquee items — duplicated in JSX for seamless infinite scroll.
const MARQUEE = [
  "Vizora",
  "Hello2India",
  "Triveni Express",
  "Web Design",
  "AI Automation",
  "Marketing",
  "SEO",
  "Hisaku",
];

export function HeroSection() {
  return (
    <section
      aria-label="Hero"
      data-grain
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      style={{ background: "var(--color-base)" }}
    >
      {/* Background: drifting dot grid */}
      <div className="hero-dotgrid" aria-hidden="true" />

      {/* Foreground content */}
      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-6 pt-24 pb-12">
        <h1
          className="text-[56px] sm:text-[80px] md:text-[104px] lg:text-[120px] leading-[0.95] tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            color: "var(--color-text-primary)",
          }}
        >
          <span className="flex flex-wrap gap-x-[0.25em]">
            {WORDS.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.6,
                  ease: EASE,
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
          className="mt-8 text-base sm:text-lg"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            color: "var(--color-text-secondary)",
          }}
        >
          Marketing{" "}
          <span style={{ color: "var(--color-accent-primary)" }}>·</span> Web{" "}
          <span style={{ color: "var(--color-accent-primary)" }}>·</span> AI
          Automation
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
          className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <Link
            href="/work"
            className="group inline-flex items-center self-start py-2 text-base transition-colors"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-primary)",
              borderBottom: "1px solid var(--color-accent-primary)",
            }}
          >
            <span className="transition-colors group-hover:text-[color:var(--color-accent-primary)]">
              See Our Work
            </span>
            <span
              aria-hidden="true"
              className="ml-2 transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center self-start px-8 py-3 text-base transition-colors"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              background: "var(--color-text-primary)",
              color: "var(--color-base)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "var(--color-accent-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "var(--color-text-primary)")
            }
          >
            Start a Project
          </Link>
        </motion.div>
      </div>

      {/* Bottom marquee — pure CSS infinite scroll */}
      <div
        className="relative border-t"
        style={{ borderColor: "var(--color-hairline)" }}
        aria-hidden="true"
      >
        <div className="overflow-hidden py-5">
          <div className="marquee-track flex whitespace-nowrap w-max">
            {/* Duplicated 2x for seamless looping — transform: translateX(-50%) */}
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center px-6 text-xs sm:text-sm uppercase"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  letterSpacing: "0.15em",
                  color: "var(--color-text-secondary)",
                }}
              >
                {item}
                <span
                  className="ml-6"
                  style={{ color: "var(--color-accent-primary)" }}
                >
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
