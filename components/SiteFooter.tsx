"use client";

import Link from "next/link";

/**
 * SiteFooter — 4 columns on desktop.
 *
 *   ┌──────────────┬──────────┬──────────────┬──────────┐
 *   │ HISAKU       │ EXPLORE  │ CAPABILITIES │ CONNECT  │
 *   │ tagline      │ Work     │ Web Design   │ LinkedIn │
 *   │ location +   │ Capab.   │ Development  │ Twitter  │
 *   │ email        │ About    │ Marketing    │ WhatsApp │
 *   │              │ Contact  │ AI Auto.     │          │
 *   ├──────────────┴──────────┴──────────────┴──────────┤
 *   │ © 2026 …                            Hyderabad · IN │
 *   └──────────────────────────────────────────────────────┘
 */

const linkStyle: React.CSSProperties = {
  fontWeight: 400,
  fontSize: 14,
  color: "#8a8f98",
  textDecoration: "none",
  display: "inline-block",
  lineHeight: 2,
  transition: "color 200ms ease",
};

const labelStyle: React.CSSProperties = {
  fontWeight: 400,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "rgba(255,255,255,0.4)",
  margin: "0 0 16px",
};

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const handlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) =>
      (e.currentTarget.style.color = "#f7f8f8"),
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) =>
      (e.currentTarget.style.color = "#8a8f98"),
  };
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={linkStyle}
        {...handlers}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} style={linkStyle} {...handlers}>
      {children}
    </Link>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        backgroundColor: "#0a0a0f",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "64px 48px 40px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* 4-column top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(240px, 2fr) repeat(3, 1fr)",
            gap: 40,
          }}
          className="footer-top"
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="Hisaku home"
              style={{
                fontWeight: 510,
                fontSize: 24,
                color: "#f7f8f8",
                letterSpacing: "0.05em",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              HISAKU
            </Link>
            <p
              style={{
                margin: "16px 0 0",
                fontWeight: 300,
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                maxWidth: 320,
                lineHeight: 1.7,
              }}
            >
              The work is the pitch. Based in Hyderabad, working with startups
              and growing businesses.
            </p>
            <a
              href="mailto:hello@hisaku.com"
              style={{
                display: "inline-block",
                marginTop: 20,
                fontWeight: 400,
                fontSize: 13,
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
            >
              Hyderabad, India · hello@hisaku.com
            </a>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h2 style={labelStyle}>Explore</h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li><FooterLink href="/work">Work</FooterLink></li>
              <li><FooterLink href="/capabilities">Capabilities</FooterLink></li>
              <li><FooterLink href="/about">About</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
            </ul>
          </nav>

          {/* Capabilities */}
          <nav aria-label="Capabilities">
            <h2 style={labelStyle}>Capabilities</h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li><FooterLink href="/services/design">Web Design</FooterLink></li>
              <li><FooterLink href="/services/development">Development</FooterLink></li>
              <li><FooterLink href="/services/digital-marketing">Marketing &amp; SEO</FooterLink></li>
              <li><FooterLink href="/services/ai-marketing">AI Automation</FooterLink></li>
            </ul>
          </nav>

          {/* Connect */}
          <nav aria-label="Connect">
            <h2 style={labelStyle}>Connect</h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li>
                <FooterLink href="https://linkedin.com/" external>
                  LinkedIn
                </FooterLink>
              </li>
              <li>
                <FooterLink href="https://twitter.com/" external>
                  Twitter / X
                </FooterLink>
              </li>
              <li>
                <FooterLink
                  href={
                    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
                      ? `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}`
                      : "mailto:hello@hisaku.com"
                  }
                  external
                >
                  WhatsApp
                </FooterLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom row */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p
            style={{
              margin: 0,
              fontWeight: 300,
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
            }}
          >
            © {year} Hisaku. All rights reserved.
          </p>
          <p
            style={{
              margin: 0,
              fontWeight: 300,
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Hyderabad · India
          </p>
        </div>
      </div>
    </footer>
  );
}
