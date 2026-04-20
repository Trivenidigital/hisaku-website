"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  /** Numeric target. Pass `fallbackText` when the metric isn't a number
   *  (e.g. "#1 Local", "Live"). */
  to?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  /** Verbatim render for non-numeric metrics. */
  fallbackText?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * CountUp — animates a number from 0 to `to` using an ease-out curve
 * once it enters the viewport. Imperative DOM mutation (no setState
 * cascade per frame). SSR renders the final value so the number is
 * correct without JS.
 */
export function CountUp({
  to,
  duration = 1600,
  prefix = "",
  suffix = "",
  fallbackText,
  className,
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  useEffect(() => {
    if (fallbackText !== undefined) return;
    if (to === undefined) return;
    if (!inView) return;
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      el.textContent = `${prefix}${to.toLocaleString()}${suffix}`;
      return;
    }

    // Animation: start at 0, cubic ease-out toward `to`.
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(eased * (to as number));
      if (el) el.textContent = `${prefix}${v.toLocaleString()}${suffix}`;
      if (t < 1) raf = requestAnimationFrame(tick);
    }

    // Start frame: render 0 immediately so the ease-in isn't a jump.
    el.textContent = `${prefix}0${suffix}`;
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, prefix, suffix, fallbackText]);

  const initial =
    fallbackText !== undefined
      ? fallbackText
      : to !== undefined
        ? `${prefix}${to.toLocaleString()}${suffix}`
        : "";

  return (
    <span ref={ref} className={className} style={style}>
      {initial}
    </span>
  );
}
