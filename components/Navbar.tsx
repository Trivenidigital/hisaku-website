"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Active link match — /work/xyz should still highlight the "Work" nav item.
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

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
        backgroundColor: "rgba(8,9,10,0.85)",
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
            fontWeight: 590,
            fontSize: 15,
            color: "#f7f8f8",
            letterSpacing: "0.04em",
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
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            const baseColor = active ? "#e8ff47" : "#8a8f98";
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  style={{
                    fontWeight: 510,
                    fontSize: 13,
                    letterSpacing: "-0.13px",
                    color: baseColor,
                    textDecoration: "none",
                    transition: "color 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = "#f7f8f8";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = baseColor;
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right CTA — desktop only */}
        <Link
          href="/contact"
          className="hidden md:inline-flex shimmer-btn"
          style={{
            alignItems: "center",
            backgroundColor: "#e8ff47",
            color: "#08090a",
            padding: "8px 14px",
            borderRadius: 6,
            fontWeight: 510,
            fontSize: 13,
            letterSpacing: "-0.13px",
            textDecoration: "none",
            transition: "background-color 200ms ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#f0ff6e")
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
