"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

/**
 * Navbar — 60px fixed bar. Backdrop-blurred glass at scroll > 20.
 *
 *   HISAKU            Work · Capabilities · About · Contact   [Start →]
 *
 * Logo: 13px, weight 600, letter-spacing 0.08em. Links: 14px
 * weight 400, grey → white on hover. CTA: violet fill, white text,
 * 8px 18px padding, subtle violet glow on hover.
 *
 * The only chromatic element in the nav is the CTA. Everything else
 * is white, grey, or transparent.
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
        height: 60,
        zIndex: 100,
        backgroundColor: scrolled
          ? "rgba(10,10,15,0.72)"
          : "rgba(10,10,15,0)",
        backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
        transition: "background-color 200ms ease, backdrop-filter 200ms ease, border-color 200ms ease",
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
        <Link
          href="/"
          aria-label="Hisaku home"
          style={{
            fontWeight: 600,
            fontSize: 13,
            color: "#f7f8f8",
            letterSpacing: "0.08em",
            textDecoration: "none",
          }}
        >
          HISAKU
        </Link>

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
            const baseColor = active ? "#f7f8f8" : "#8a8f98";
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  style={{
                    fontWeight: 400,
                    fontSize: 14,
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

        <Link
          href="/contact"
          className="hidden md:inline-flex"
          style={{
            alignItems: "center",
            backgroundColor: "#8B5CF6",
            color: "#ffffff",
            padding: "8px 18px",
            borderRadius: 6,
            fontWeight: 500,
            fontSize: 13,
            textDecoration: "none",
            transition: "background-color 200ms ease, box-shadow 200ms ease",
            boxShadow: "0 0 0 rgba(139,92,246,0)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#7C3AED";
            e.currentTarget.style.boxShadow = "0 0 24px rgba(139,92,246,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#8B5CF6";
            e.currentTarget.style.boxShadow = "0 0 0 rgba(139,92,246,0)";
          }}
        >
          Start a Project →
        </Link>

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
