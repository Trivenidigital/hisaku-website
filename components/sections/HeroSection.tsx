"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BackgroundPaths } from "@/components/ui/BackgroundPaths";
import { Spotlight } from "@/components/ui/Spotlight";
import { WordRotate } from "@/components/ui/WordRotate";

/**
 * HeroSection — centered premium layout with:
 *   - Video background + dark overlay
 *   - Mouse-following spotlight (radial gradient, pointer-based x/y)
 *   - Floating badge (subtle 2s y-bob)
 *   - Shimmer button on "Start a Project →"
 *   - Scroll indicator
 *
 * Spotlight is driven imperatively (ref + requestAnimationFrame) to
 * avoid a setState every mousemove — cheap and smooth.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section
      aria-label="Hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#08090a",
        overflow: "hidden",
      }}
    >
      {/* Ambient animated paths — z-0, sits behind video + overlay. */}
      <BackgroundPaths />
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.35,
          zIndex: 0,
        }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(8,9,10,0.72)",
          zIndex: 1,
        }}
      />
      {/* Mouse-following spotlight — z-2, sits above overlay, below content. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <Spotlight size={800} color="rgba(232,255,71,0.08)" />
      </div>

      {/* Content — left-aligned editorial, anchored near bottom. */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          padding: "0 48px",
          zIndex: 3,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            textAlign: "left",
          }}
        >
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          style={{
            fontWeight: 510,
            fontSize: "clamp(48px, 7vw, 88px)",
            letterSpacing: "-0.022em",
            lineHeight: 1.0,
            color: "#f7f8f8",
            margin: 0,
          }}
        >
          We build digital
          <br />
          experiences that{" "}
          <WordRotate words={["move.", "grow.", "convert.", "scale."]} />
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          style={{
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.6,
            letterSpacing: "-0.165px",
            color: "#8a8f98",
            maxWidth: 560,
            margin: "24px 0 0",
          }}
        >
          A Hyderabad studio building websites, marketing systems, and AI
          automation for businesses that want to grow.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          style={{
            marginTop: 40,
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "flex-start",
          }}
        >
          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#e8ff47",
              color: "#08090a",
              padding: "12px 22px",
              borderRadius: 8,
              fontWeight: 510,
              fontSize: 15,
              letterSpacing: "-0.165px",
              textDecoration: "none",
              transition: "background-color 200ms ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0ff6e")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#e8ff47")
            }
          >
            See Our Work
          </Link>
          <Link
            href="/contact"
            className="shimmer-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#f7f8f8",
              padding: "12px 22px",
              borderRadius: 8,
              fontWeight: 510,
              fontSize: 15,
              letterSpacing: "-0.165px",
              textDecoration: "none",
              transition: "border-color 200ms ease, color 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "#f7f8f8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "#f7f8f8";
            }}
          >
            Start a Project →
          </Link>
        </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="hero-scroll-indicator"
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontWeight: 510,
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#62666d",
          }}
        >
          scroll
        </span>
        <span
          style={{
            width: 1,
            height: 32,
            backgroundColor: "rgba(255,255,255,0.15)",
          }}
        />
      </div>
    </section>
  );
}
