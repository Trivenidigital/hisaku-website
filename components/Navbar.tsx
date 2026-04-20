"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

/**
 * Navbar — transparent at top, dark blurred bar after 80px scroll.
 * Hides on scroll down past 120px, reveals on scroll up.
 *
 * The dark blurred bar + mix-blend-mode text means the nav works over
 * any section color including the white work/studio sections.
 */
const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services/design", label: "Capabilities" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Start a project" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 80);
        if (y > 120 && y > lastY) {
          setHidden(true);
        } else if (y < lastY) {
          setHidden(false);
        }
        lastY = y;
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-30 transition-transform duration-300 ease-out"
      style={{
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        background: scrolled ? "rgba(5,5,7,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
      }}
    >
      <nav
        aria-label="Primary"
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        style={{
          // mix-blend-mode: difference inverts the nav text against
          // whatever is immediately behind — useful when the nav is
          // transparent and a white section has scrolled under it.
          mixBlendMode: scrolled ? "normal" : "difference",
          color: scrolled ? "var(--color-bg-white)" : "#fff",
        }}
      >
        <Link
          href="/"
          aria-label="Hisaku home"
          className="flex items-center gap-3 group"
        >
          <Logo size={28} label="" />
          <span
            className="text-base font-semibold tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Hisaku
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="md:hidden">
          <MobileNav links={LINKS} />
        </div>
      </nav>
    </header>
  );
}
