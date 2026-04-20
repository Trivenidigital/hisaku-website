"use client";

import { useEffect, useRef } from "react";

/**
 * CustomCursor — 8px lime dot tracks exactly, 40px circle follower lags
 * with a 150ms spring. The follower uses mix-blend-mode: difference so
 * it inverts against any section color.
 *
 * Mounts imperatively on pointer: fine + non-reduced-motion only.
 * Otherwise renders nothing and the native cursor is used.
 *
 * Scales up the follower when hovering [data-cursor="hover"] (set on
 * any interactive element we want to highlight) or any anchor/button.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const follower = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    // Gate: only set up on pointer: fine + non-reduced-motion.
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.setAttribute("data-cursor-ready", "true");

    function onMove(e: MouseEvent) {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    }

    function onEnter(e: Event) {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const interactive =
        el.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']") !==
        null;
      if (followerRef.current) {
        followerRef.current.setAttribute(
          "data-active",
          interactive ? "true" : "false"
        );
      }
    }

    function tick() {
      // Spring lerp toward the current mouse target.
      follower.current.x += (target.current.x - follower.current.x) * 0.15;
      follower.current.y += (target.current.y - follower.current.y) * 0.15;
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${follower.current.x}px, ${follower.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.removeAttribute("data-cursor-ready");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={followerRef} className="cursor-follower" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
