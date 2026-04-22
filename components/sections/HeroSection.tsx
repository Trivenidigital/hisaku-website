"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";

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
  const spotlightRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = spotlightRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Radial gradient centered on cursor, size 40vw, soft falloff.
    el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(232,255,71,0.10), transparent 40%)`;
  }

  function onMouseLeave() {
    if (spotlightRef.current) spotlightRef.current.style.background = "transparent";
  }

  return (
    <section
      aria-label="Hero"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#08090a",
        overflow: "hidden",
      }}
    >
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
      {/* Spotlight layer — repainted imperatively on every mousemove */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          transition: "background 200ms ease",
        }}
      />

      {/* Content — centered, anchored at ~45% from top */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: 900,
          padding: "0 24px",
          textAlign: "center",
          zIndex: 3,
        }}
      >
        {/* Floating badge — opacity fade-in then gentle y-bob forever */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            display: "inline-flex",
            marginBottom: 32,
          }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
              borderRadius: 20,
              padding: "6px 16px",
              fontWeight: 510,
              fontSize: 13,
              letterSpacing: "-0.13px",
              color: "#8a8f98",
            }}
          >
            <span style={{ color: "#e8ff47", marginRight: 8 }}>✦</span>
            Web Design · Development · AI Automation
          </motion.div>
        </motion.div>

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
          <span style={{ color: "#e8ff47" }}>move.</span>
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
            margin: "24px auto 0",
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
            justifyContent: "center",
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
