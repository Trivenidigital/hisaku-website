"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface ClipRevealProps {
  children: ReactNode;
  /** Delay in seconds before the clip reveal begins. */
  delay?: number;
  /** Duration in seconds. Defaults to 0.7s. */
  duration?: number;
  /** Direction — "up" (default) reveals from bottom to top, "down" reveals top to bottom. */
  direction?: "up" | "down";
  className?: string;
}

/**
 * ClipReveal — wraps its children in a motion element that uses a
 * clip-path animation from fully-clipped to fully-visible. Triggers
 * when the element enters the viewport (whileInView).
 *
 * Honors prefers-reduced-motion by skipping the animation.
 */
export function ClipReveal({
  children,
  delay = 0,
  duration = 0.7,
  direction = "up",
  className,
}: ClipRevealProps) {
  const reduced = useReducedMotion();

  const initial =
    direction === "up"
      ? { clipPath: "inset(100% 0 0 0)" }
      : { clipPath: "inset(0 0 100% 0)" };
  const whileInView = { clipPath: "inset(0% 0 0 0)" };

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
