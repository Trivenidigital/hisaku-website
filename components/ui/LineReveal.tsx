"use client";

import { motion, useReducedMotion } from "framer-motion";

interface LineRevealProps {
  /** Tailwind classes for height/color. Default: 1px line, current accent. */
  className?: string;
  /** Delay in seconds. */
  delay?: number;
  /** Duration in seconds. Defaults to 1s. */
  duration?: number;
}

/**
 * LineReveal — thin horizontal line that draws left-to-right (scaleX 0→1
 * with left transform-origin) when it enters view. Used as the
 * section-divider that animates on the Services rows.
 */
export function LineReveal({
  className = "h-px bg-[color:var(--color-accent-primary)]",
  delay = 0,
  duration = 1,
}: LineRevealProps) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={className} />;
  }
  return (
    <motion.div
      className={className}
      style={{ originX: 0 }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
