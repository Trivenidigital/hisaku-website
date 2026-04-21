"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/**
 * CtaSection — gradient card with "Ready to build / something great?"
 * where "something great?" is lime. fadeUp on scroll.
 */
export function CtaSection() {
  return (
    <section
      aria-label="Call to action"
      style={{ backgroundColor: "#0a0a0a", padding: "0 48px 120px" }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
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
            color: "rgba(255,255,255,0.5)",
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
            color: "#0a0a0a",
            padding: "14px 28px",
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 15,
            textDecoration: "none",
            transition: "all 200ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#ffffff";
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#e8ff47";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Start a Project →
        </Link>
      </motion.div>
    </section>
  );
}
