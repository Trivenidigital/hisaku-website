"use client";

/**
 * Spotlight — large radial glow that follows the cursor.
 *
 * Intended for hero sections. 800px radius, very low opacity lime,
 * mix-blend-mode: plus-lighter so it brightens rather than tints.
 *
 * Writes CSS vars on the wrapping element. Returns a pointer-events:none
 * layer — place it inside a positioned parent.
 */

import { useEffect, useRef } from "react";

export function Spotlight({
  size = 800,
  color = "rgba(232,255,71,0.08)",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    function onMove(e: MouseEvent) {
      const rect = parent!.getBoundingClientRect();
      el!.style.setProperty("--sx", `${e.clientX - rect.left}px`);
      el!.style.setProperty("--sy", `${e.clientY - rect.top}px`);
    }

    parent.addEventListener("mousemove", onMove);
    return () => parent.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        background: `radial-gradient(${size}px circle at var(--sx, 50%) var(--sy, 30%), ${color}, transparent 60%)`,
        mixBlendMode: "plus-lighter",
      }}
    />
  );
}
