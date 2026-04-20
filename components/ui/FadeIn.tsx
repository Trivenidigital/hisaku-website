"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  /** Delay before the fade/rise starts (seconds). */
  delay?: number;
  /** Duration (seconds). Default 0.7s. */
  duration?: number;
  /** Y-offset to rise from (px). Default 30. */
  y?: number;
  /** Only fire once when scrolled into view. Default true. */
  once?: boolean;
  className?: string;
}

/**
 * FadeIn — simple scroll-triggered opacity + y-rise.
 *
 *   initial:  { opacity: 0, y: 30 }
 *   animate:  { opacity: 1, y: 0 }
 *   transition: 0.7s, [0.16, 1, 0.3, 1]
 *
 * Reused across all section headlines, case study blocks, testimonial
 * quote, studio stats. Honors prefers-reduced-motion by rendering the
 * children directly with no animation.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  y = 30,
  once = true,
  className,
}: FadeInProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ delay, duration, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
