"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

/**
 * Navbar — fixed top, 64px height.
 *
 * Scroll behavior:
 *   - Transparent at top.
 *   - After 80px scroll: dark translucent bar + blur.
 *   - Hide on scroll down, reveal on scroll up.
 *
 * Theme behavior (auto-invert over white sections):
 *   - IntersectionObserver watches every [data-theme="light"] section.
 *   - When a light section is crossing the navbar zone, sets data-over-light
 *     on the <header>, which swaps text color to dark.
 *
 * CTA:
 *   - Right-side "Start a Project" button, lime on dark, white on hover.
 */
const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [overLight, setOverLight] = useState(false);

  // Hide/show + scrolled state
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

  // IntersectionObserver: detect when a [data-theme="light"] section is
  // crossing the top 64px of the viewport (where the navbar sits).
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      '[data-theme="light"]'
    );
    if (sections.length === 0) return;

    // rootMargin shifts the detection band to the navbar's 64px strip.
    // When any light section intersects that band, the nav is "over light".
    const observer = new IntersectionObserver(
      () => {
        // When any section crosses the top band, recheck ALL observed
        // sections by their current bounding rect so the nav correctly
        // flips back to dark once the light section scrolls past.
        let someLightAtTop = false;
        for (const el of sections) {
          const rect = el.getBoundingClientRect();
          if (rect.top < 64 && rect.bottom > 0) {
            someLightAtTop = true;
            break;
          }
        }
        setOverLight(someLightAtTop);
      },
      {
        // The detection band: from 0 to 64px from the top of the viewport.
        // Anything further down is below the navbar so we don't care.
        rootMargin: "0px 0px -100% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));

    // Also re-check on scroll — the IO only fires on cross-boundary, but
    // we want the state accurate on every frame where sections slide past.
    function recheck() {
      let anyLightAtTop = false;
      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        if (rect.top < 64 && rect.bottom > 0) {
          anyLightAtTop = true;
          break;
        }
      }
      setOverLight(anyLightAtTop);
    }
    window.addEventListener("scroll", recheck, { passive: true });
    recheck();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", recheck);
    };
  }, []);

  const textColor = overLight && !scrolled ? "#050507" : "#f4f3ef";
  const hoverColor = "#e8ff47";

  return (
    <header
      data-over-light={overLight}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        zIndex: 100,
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 300ms ease, background-color 350ms ease, backdrop-filter 350ms ease, border-color 350ms ease",
        backgroundColor: scrolled ? "rgba(5,5,7,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
      }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto h-full flex items-center justify-between"
        style={{ maxWidth: 1280, padding: "0 32px" }}
      >
        {/* Brand */}
        <Link href="/" aria-label="Hisaku home" className="flex items-center">
          <span
            style={{
              fontFamily: "var(--font-syne, sans-serif)",
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: "-0.03em",
              color: textColor,
              transition: "color 300ms ease",
            }}
          >
            HISAKU
          </span>
        </Link>

        {/* Center nav — hidden on mobile */}
        <ul
          className="hidden md:flex items-center"
          style={{ gap: 40, listStyle: "none" }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                data-cursor="hover"
                style={{
                  fontFamily: "var(--font-sans, sans-serif)",
                  fontWeight: 400,
                  fontSize: 14,
                  letterSpacing: "0.02em",
                  color: textColor,
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right CTA — hidden on mobile */}
        <Link
          href="/contact"
          data-cursor="hover"
          className="hidden md:inline-flex items-center"
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontWeight: 600,
            fontSize: 13,
            backgroundColor: "#e8ff47",
            color: "#050507",
            padding: "10px 24px",
            transition: "background-color 200ms ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#f4f3ef")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#e8ff47")
          }
        >
          Start a Project
        </Link>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <MobileNav
            links={[
              ...NAV_LINKS,
              { href: "/contact", label: "Start a Project" },
            ]}
          />
        </div>
      </nav>
    </header>
  );
}
