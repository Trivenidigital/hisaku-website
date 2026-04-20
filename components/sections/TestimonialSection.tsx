"use client";

import { motion } from "framer-motion";

/**
 * TestimonialSection — dark bg, oversized decorative open-quote mark
 * at 15% lime in the top-left. Quote animates in (opacity + y:30→0)
 * when it enters the viewport.
 */
export function TestimonialSection() {
  return (
    <section
      data-theme="dark"
      aria-label="Testimonial"
      className="relative px-6 py-24 md:py-36 overflow-hidden"
      style={{ background: "var(--color-bg-dark)" }}
    >
      <span
        aria-hidden="true"
        className="absolute select-none pointer-events-none leading-none"
        style={{
          top: "2.5rem",
          left: "1rem",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(100px, 16vw, 160px)",
          color: "var(--color-accent-primary)",
          opacity: 0.15,
        }}
      >
        &ldquo;
      </span>

      <div className="relative max-w-3xl mx-auto">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-center italic"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "clamp(20px, 2.8vw, 26px)",
              lineHeight: 1.7,
              color:
                "color-mix(in srgb, var(--color-text-primary) 85%, transparent)",
            }}
          >
            Hisaku understood our business from day one. They didn&apos;t just
            build a website — they understood what our customers needed to
            find us.
          </p>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 text-right"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: 14,
            color:
              "color-mix(in srgb, var(--color-text-primary) 45%, transparent)",
          }}
        >
          — Owner, Hello2India{" "}
          <span
            aria-hidden="true"
            style={{ color: "var(--color-accent-primary)" }}
          >
            ·
          </span>{" "}
          Herndon, Virginia
        </motion.p>
      </div>
    </section>
  );
}
