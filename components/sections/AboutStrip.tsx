"use client";

import { motion } from "framer-motion";

/**
 * AboutStrip — 2-column about + stats row with fadeUp on scroll.
 */

const STATS = [
  { value: "8", label: "clients" },
  { value: "3", label: "countries" },
  { value: "0", label: "missed deadlines" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function AboutStrip() {
  return (
    <section
      aria-label="About"
      style={{ backgroundColor: "#0a0a0a", padding: "120px 48px" }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 64,
          alignItems: "start",
        }}
      >
        <div>
          <p
            style={{
              fontWeight: 600,
              fontSize: 13,
              color: "#e8ff47",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              margin: "0 0 24px",
            }}
          >
            About
          </p>
          <h2
            style={{
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 56px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#ffffff",
              margin: 0,
            }}
          >
            A 2-person studio.
            <br />
            Thinking like an agency.
          </h2>
        </div>

        <div>
          <p
            style={{
              fontWeight: 400,
              fontSize: 17,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 48px",
            }}
          >
            We are Srini and a small team of collaborators in Hyderabad. We
            work with startups and growing businesses to build their digital
            presence — from the first wireframe to the live product.
          </p>

          <dl
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 32,
              margin: 0,
            }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <dt
                  style={{
                    fontWeight: 700,
                    fontSize: 36,
                    color: "#e8ff47",
                    margin: 0,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </dt>
                <dd
                  style={{
                    margin: "8px 0 0",
                    fontWeight: 400,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}
