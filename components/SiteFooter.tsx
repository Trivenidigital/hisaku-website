import Link from "next/link";

/**
 * Site footer. Server-rendered.
 *
 * Contains brand, minimal link columns, thesis tagline ("The work is the pitch.")
 * and contact/socials. Kept editorial and minimal — this is an agency site,
 * not a product dashboard.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-[color:var(--color-hairline)]">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-[1fr_auto_auto_auto]">
        <div className="flex flex-col gap-3">
          <Link href="/" aria-label="Hisaku home" className="inline-flex items-center">
            <span
              style={{
                fontFamily: "var(--font-syne, sans-serif)",
                fontWeight: 800,
                fontSize: "18px",
                color: "#f4f3ef",
                letterSpacing: "-0.02em",
              }}
            >
              HISAKU
            </span>
          </Link>
          <p
            className="text-sm max-w-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            The work is the pitch. Based in Hyderabad, India. Working with
            startups and growing companies worldwide.
          </p>
        </div>

        <nav aria-label="Sitemap" className="text-sm">
          <h2
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Explore
          </h2>
          <ul className="space-y-2">
            <li>
              <Link href="/work" className="hover:text-[color:var(--color-accent-primary)] transition-colors">Work</Link>
            </li>
            <li>
              <Link href="/services/design" className="hover:text-[color:var(--color-accent-primary)] transition-colors">Capabilities</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[color:var(--color-accent-primary)] transition-colors">About</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[color:var(--color-accent-primary)] transition-colors">Start a project</Link>
            </li>
          </ul>
        </nav>

        <div className="text-sm">
          <h2
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Contact
          </h2>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:hello@hisaku.com"
                className="hover:text-[color:var(--color-accent-primary)] transition-colors"
              >
                hello@hisaku.com
              </a>
            </li>
            <li style={{ color: "var(--color-text-secondary)" }}>
              Hyderabad, IN
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <h2
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Social
          </h2>
          <ul className="space-y-2">
            <li>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--color-accent-primary)] transition-colors"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--color-accent-primary)] transition-colors"
              >
                Twitter / X
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-8">
        <p
          className="text-xs"
          style={{ color: "var(--color-text-secondary)" }}
        >
          © {year} Hisaku. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
