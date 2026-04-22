"use client";

/**
 * Marquee — infinite horizontal scroll. CSS-driven via .marquee-track
 * keyframe in globals.css. Two copies of the children are rendered so
 * the translate(-50%) produces a seamless loop.
 */

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className = "",
  pauseOnHover = true,
}: {
  children: ReactNode;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      style={{ background: "#0f1011" }}
    >
      <div
        className={cn(
          "marquee-track flex w-max items-center gap-16 whitespace-nowrap will-change-transform",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        <div className="flex shrink-0 items-center gap-16">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-16">
          {children}
        </div>
      </div>
      {/* Edge fades for polish. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24"
        style={{
          background:
            "linear-gradient(to right, #0f1011, rgba(15,16,17,0))",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24"
        style={{
          background:
            "linear-gradient(to left, #0f1011, rgba(15,16,17,0))",
        }}
      />
    </div>
  );
}
