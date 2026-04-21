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
 * SpringCounter — 0 → target with framer-motion spring physics.
 *
 * Visibility guarantees:
 *   1. If prefers-reduced-motion is on, jumps straight to the final
 *      value on mount.
 *   2. If useInView fires, starts the spring animation.
 *   3. SAFETY NET: after 2 seconds, if neither of the above triggered
 *      the animation, forces the spring to the final value so the
 *      number always renders correctly.
 *
 * This means the number is always visible within at most 2s, even if
 * the viewport trigger silently fails on certain browsers / scroll
 * positions / hydration races.
 */
export function SpringCounter({
  to,
  suffix = "",
  className,
  style,
}: SpringCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const spring = useSpring(0, {
    stiffness: 70,
    damping: 14,
    restDelta: 0.01,
  });
  const display = useTransform(spring, (v) =>
    Math.round(v).toString() + suffix
  );

  // Honor reduced motion + viewport trigger.
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

  // Safety net: 2s after mount, force the final value if nothing else
  // has moved the spring. Prevents the counter getting stuck at 0 on
  // viewports where useInView never fires (hydration edge cases,
  // SSR/CSR mismatches, etc.).
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only force if the spring hasn't moved meaningfully yet.
      if (Math.round(spring.get()) < to) {
        spring.set(to);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [spring, to]);

  return (
    <motion.span ref={ref} className={className} style={style}>
      {display}
    </motion.span>
  );
}
