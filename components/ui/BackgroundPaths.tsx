"use client";

/**
 * BackgroundPaths — animated flowing SVG paths on #08090a.
 *
 * Generates two sets of quasi-random bezier curves that slowly drift
 * their stroke-dashoffset. Very low-opacity lime so the motion reads
 * as ambient atmosphere rather than as a foreground element.
 *
 * Drop this behind a hero or page header. It's purely decorative and
 * sits at z-0 with pointer-events: none.
 */

import { motion } from "framer-motion";

function makePath(i: number, offset: number) {
  // Deterministic but varied — based on index only, so SSR & hydration match.
  const y1 = 40 + ((i * 37) % 200);
  const y2 = 120 + ((i * 53) % 260);
  const cp1x = 200 + ((i * 71) % 400);
  const cp2x = 600 + ((i * 43) % 400);
  return `M -100 ${y1 + offset} C ${cp1x} ${y1 - 40 + offset}, ${cp2x} ${y2 + 40 + offset}, 1540 ${y2 + offset}`;
}

export function BackgroundPaths({ className = "" }: { className?: string }) {
  const paths = Array.from({ length: 14 }, (_, i) => ({
    d: makePath(i, 0),
    delay: (i % 7) * 0.8,
    duration: 18 + (i % 5) * 3,
  }));

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        fill="none"
      >
        {paths.map((p, i) => (
          <motion.path
            key={i}
            d={p.d}
            stroke="rgba(232,255,71,0.07)"
            strokeWidth={1}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
