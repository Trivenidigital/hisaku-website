"use client";

/**
 * GlowCard — dark panel with a lime spotlight that follows the cursor.
 *
 * Structure:
 *   - Outer wrapper captures pointer position and writes CSS vars.
 *   - ::before pseudo (via inline style) renders the radial glow.
 *   - Inner content sits on rgba(255,255,255,0.02) with a 1px hairline.
 *
 * Linear's own dark cards use this exact pattern — subtle, directional,
 * never a full border glow.
 */

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlowCard({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  const Component = Tag as "div";

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={handleMove}
      className={cn(
        "group relative overflow-hidden rounded-xl border transition-colors duration-300",
        className
      )}
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      {/* Cursor spotlight — lime, 320px radius, very low opacity. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(232,255,71,0.08), transparent 60%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
