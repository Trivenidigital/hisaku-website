"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * MobileNav — hamburger → full-screen drawer on small viewports.
 *
 * Dark overlay drawer. Links stacked, large tap targets (48px min).
 * Esc to close. Body scroll locked while open.
 */
interface NavLink {
  href: string;
  label: string;
}

export function MobileNav({ links }: { links: readonly NavLink[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{
          background: "transparent",
          border: "none",
          color: "#f7f8f8",
          cursor: "pointer",
          padding: 8,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            display: "block",
            width: 22,
            height: 2,
            backgroundColor: "currentColor",
            position: "relative",
            transition: "transform 200ms ease",
            transform: open ? "rotate(45deg)" : "none",
          }}
        />
        <span
          style={{
            display: "block",
            width: 22,
            height: 2,
            backgroundColor: "currentColor",
            marginLeft: -22,
            transition: "opacity 200ms ease, transform 200ms ease",
            opacity: open ? 0 : 1,
            transform: open ? "translateY(-100%)" : "none",
            marginTop: 6,
          }}
        />
        <span
          style={{
            display: "block",
            width: 22,
            height: 2,
            backgroundColor: "currentColor",
            marginLeft: -22,
            marginTop: 6,
            transition: "transform 200ms ease",
            transform: open ? "rotate(-45deg) translateY(-8px)" : "none",
          }}
        />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            top: 60,
            backgroundColor: "rgba(10,10,15,0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            zIndex: 99,
            padding: "40px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontSize: 28,
                fontWeight: 510,
                color: "#f7f8f8",
                textDecoration: "none",
                letterSpacing: "-0.02em",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
}
