import Link from "next/link";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

/**
 * Main navigation.
 *
 * Desktop (≥ md):  Brand mark left, links inline right.
 * Mobile (< md):   Brand mark left, hamburger button right (client component
 *                  that opens a full-screen overlay).
 *
 * Both render — CSS hides/shows based on viewport. The MobileNav client
 * component is the only piece that ships JS to the browser.
 */
const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services/design", label: "Capabilities" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Start a project" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-[rgba(10,10,10,0.7)] border-b border-[color:var(--color-hairline)]">
      <nav
        aria-label="Primary"
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
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

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile: hamburger + overlay. Client component. */}
        <div className="md:hidden">
          <MobileNav links={LINKS} />
        </div>
      </nav>
    </header>
  );
}
