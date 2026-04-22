"use client";

import { useEffect, useRef, useState } from "react";

/**
 * NumberTicker — 21st.dev-style count-up animation.
 *
 * Animates from `from` to `value` over `duration` ms, starting when
 * the element enters the viewport. Uses requestAnimationFrame + an
 * ease-out curve. Honors prefers-reduced-motion by jumping straight
 * to the target value.
 */
interface NumberTickerProps {
  value: number;
  from?: number;
  duration?: number;
  /** Decimals to preserve in the tween. Default 0. */
  decimals?: number;
}

export function NumberTicker({
  value,
  from = 0,
  duration = 1400,
  decimals = 0,
}: NumberTickerProps) {
  const [display, setDisplay] = useState(from);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            runTween();
            io.disconnect();
          }
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    // Safety fallback: some browsers/environments never fire the
    // IntersectionObserver (e.g. offscreen above the fold on load).
    const safety = window.setTimeout(() => {
      if (!started.current) {
        started.current = true;
        runTween();
        io.disconnect();
      }
    }, 1200);

    function runTween() {
      const start = performance.now();
      function frame(now: number) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        const current = from + (value - from) * eased;
        setDisplay(current);
        if (t < 1) requestAnimationFrame(frame);
        else setDisplay(value);
      }
      requestAnimationFrame(frame);
    }

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [value, from, duration]);

  return <span ref={ref}>{display.toFixed(decimals)}</span>;
}
