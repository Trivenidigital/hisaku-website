"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

/**
 * Navbar — clean, minimal, premium-agency-style.
 *
 *   HISAKU               Work · Capabilities · About · Contact    [Start a Project →]
 *
 * Fixed 64px bar with backdrop blur. Simple hover states. No
 * IntersectionObserver theme flipping — the new site is dark-dominant
 * and the nav reads cleanly on every section.
 */
const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        zIndex: 100,
        backgroundColor: "rgba(10,10,10,0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
        transition: "border-color 200ms ease",
      }}
    >
      <nav
        aria-label="Primary"
        style={{
          maxWidth: 1200,
          height: "100%",
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          aria-label="Hisaku home"
          style={{
            fontWeight: 700,
            fontSize: 18,
            color: "#ffffff",
            letterSpacing: "0.05em",
            textDecoration: "none",
          }}
        >
          HISAKU
        </Link>

        {/* Center — desktop only */}
        <ul
          className="hidden md:flex"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            gap: 32,
            alignItems: "center",
          }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{
                  fontWeight: 400,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right CTA — desktop only */}
        <Link
          href="/contact"
          className="hidden md:inline-flex"
          style={{
            alignItems: "center",
            backgroundColor: "#e8ff47",
            color: "#0a0a0a",
            padding: "10px 20px",
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 13,
            textDecoration: "none",
            transition: "background-color 200ms ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#ffffff")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#e8ff47")
          }
        >
          Start a Project →
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
