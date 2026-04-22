"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Meteors — 21st.dev-style streaks for hover delight on Work cards.
 *
 * Renders N absolutely-positioned diagonals that translate + fade in
 * a staggered loop. Zero deps, pure CSS animation via inline style.
 * Controlled via the `active` prop so the parent decides when they
 * animate (hover only — not on every card at all times, which would
 * be noisy).
 */
interface MeteorsProps {
  /** Number of meteors to render. Default 8. */
  count?: number;
  /** Whether the meteors are currently animating. */
  active?: boolean;
  /** Stroke color. Default violet. */
  color?: string;
}

export function Meteors({
  count = 8,
  active = true,
  color = "#8B5CF6",
}: MeteorsProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Precompute random positions/durations once per mount so rerenders
  // don't re-seed. Without this the meteors jump every parent update.
  const meteors = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        top: `${Math.random() * -20}%`,
        left: `${Math.random() * 100}%`,
        duration: `${4 + Math.random() * 4}s`,
        delay: `${Math.random() * 2}s`,
        key: i,
      })),
    [count]
  );

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: active ? 1 : 0,
        transition: "opacity 400ms ease",
      }}
    >
      {meteors.map((m) => (
        <span
          key={m.key}
          style={{
            position: "absolute",
            top: m.top,
            left: m.left,
            width: 1,
            height: 60,
            background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
            transform: "rotate(215deg)",
            transformOrigin: "top left",
            animation: active
              ? `meteor-fall ${m.duration} linear ${m.delay} infinite`
              : "none",
            opacity: 0,
          }}
        />
      ))}
      <style>{`
        @keyframes meteor-fall {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(600px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
