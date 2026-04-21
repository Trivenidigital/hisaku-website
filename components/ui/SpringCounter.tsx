"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface SpringCounterProps {
  /** Target integer to count to. */
  to: number;
  /** Any optional suffix, e.g. "+" for "2,500+". */
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SpringCounter — animates 0 → `to` using framer-motion's useSpring so
 * the count has real bounce physics instead of a linear ease-out.
 * Fires once when scrolled into view.
 *
 * On reduced-motion, renders the final value immediately.
 */
export function SpringCounter({
  to,
  suffix = "",
  className,
  style,
}: SpringCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const spring = useSpring(0, {
    stiffness: 70,
    damping: 14,
    restDelta: 0.01,
  });
  const display = useTransform(spring, (v) => Math.round(v).toString() + suffix);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      spring.jump(to);
      return;
    }
    if (inView) spring.set(to);
  }, [inView, to, spring]);

  return (
    <motion.span ref={ref} className={className} style={style}>
      {display}
    </motion.span>
  );
}
