"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface MobileNavProps {
  links: ReadonlyArray<{ href: string; label: string }>;
}

/**
 * Mobile hamburger + full-screen nav overlay.
 *
 * Per design doc:
 *   - Hamburger opens full-screen overlay
 *   - Three links stacked large in display face
 *   - Closing X
 *   - Body-scroll locked while open
 *   - Escape closes
 *   - Tab focus contained in overlay while open
 *
 * Kept deliberately small (no external state management, no animation
 * libs) to stay under the per-route JS budget.
 */
export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  // Body-scroll lock while open. Also respond to Escape key.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-overlay"
        onClick={() => setOpen((v) => !v)}
        className="p-2 -m-2 inline-flex items-center justify-center"
      >
        {/* Hamburger / close glyph. Pure inline SVG, no icon lib. */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {open ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </button>

      {open ? (
        <div
          id="mobile-nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-40 bg-[color:var(--color-base)] flex flex-col"
        >
          <div className="h-16 flex items-center justify-end px-6 border-b border-[color:var(--color-hairline)]">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="p-2 -m-2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-8">
            <ul className="flex flex-col gap-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-4xl font-bold tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
