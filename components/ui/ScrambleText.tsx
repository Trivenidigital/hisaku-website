"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=<>?/";

interface ScrambleTextProps {
  text: string;
  /** Trigger: "inView" (default) or "mount" to fire as soon as rendered. */
  trigger?: "inView" | "mount";
  /** Delay before the scramble starts (ms). */
  delay?: number;
  /** Total duration (ms). Default 1200. */
  duration?: number;
  /** Preserve whitespace — spaces don't scramble. Default true. */
  preserveSpaces?: boolean;
  className?: string;
  style?: React.CSSProperties;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

/**
 * ScrambleText — letters cycle random chars and resolve left-to-right.
 *
 * SSR renders the final text directly (accessible + no flash of random
 * characters for users with JS disabled). After mount, an effect taps
 * the span imperatively and walks it through the scramble sequence.
 * No setState cascades per frame.
 *
 * A11y: the scrambling mirror is aria-hidden; the final text lives in
 * a visually-hidden sr-only span so assistive tech always reads the
 * intended word.
 */
export function ScrambleText({
  text,
  trigger = "inView",
  delay = 0,
  duration = 1200,
  preserveSpaces = true,
  className,
  style,
  as = "span",
}: ScrambleTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const visibleRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(rootRef, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });

  useEffect(() => {
    if (trigger === "inView" && !inView) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const el = visibleRef.current;
    if (!el) return;

    if (reduced) {
      el.textContent = text;
      return;
    }

    const start = performance.now() + delay;
    const letters = text.split("");
    let raf = 0;

    function frame(now: number) {
      const t = Math.max(0, Math.min(1, (now - start) / duration));
      const resolvedUntil = Math.floor(t * letters.length);
      const next = letters
        .map((ch, i) => {
          if (preserveSpaces && /\s/.test(ch)) return ch;
          if (i < resolvedUntil) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      if (el) el.textContent = next;
      if (t < 1) {
        raf = requestAnimationFrame(frame);
      } else if (el) {
        el.textContent = text;
      }
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, delay, duration, trigger, preserveSpaces]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={rootRef} className={className} style={style}>
      <span ref={visibleRef} aria-hidden="true">
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
