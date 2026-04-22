"use client";

import Link from "next/link";

/**
 * Footer — 4-column grid. Brand + links. Pure dark, hairline
 * separators. Hover is grey → white; no violet in the footer.
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
  fontWeight: 500,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "#62666d",
  margin: "0 0 20px",
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

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        backgroundColor: "#0a0a0f",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "80px 48px 40px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(240px, 2fr) repeat(3, 1fr)",
            gap: 48,
          }}
          className="footer-top"
        >
          <div>
            <Link
              href="/"
              aria-label="Hisaku home"
              style={{
                fontWeight: 600,
                fontSize: 15,
                color: "#f7f8f8",
                letterSpacing: "0.08em",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              HISAKU
            </Link>
            <p
              style={{
                margin: "20px 0 0",
                fontWeight: 400,
                fontSize: 14,
                color: "#8a8f98",
                maxWidth: 340,
                lineHeight: 1.7,
              }}
            >
              The work is the pitch. A 2-person studio in Hyderabad, building
              for startups and growing companies worldwide.
            </p>
            <a
              href="mailto:hello@hisaku.com"
              style={{
                display: "inline-block",
                marginTop: 24,
                fontWeight: 400,
                fontSize: 14,
                color: "#d0d6e0",
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "color 200ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f7f8f8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#d0d6e0")}
            >
              hello@hisaku.com
            </a>
          </div>

          <nav aria-label="Explore">
            <h2 style={labelStyle}>Explore</h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li><FooterLink href="/work">Work</FooterLink></li>
              <li><FooterLink href="/capabilities">Capabilities</FooterLink></li>
              <li><FooterLink href="/about">About</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
            </ul>
          </nav>

          <nav aria-label="Capabilities">
            <h2 style={labelStyle}>Capabilities</h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li><FooterLink href="/services/design">Web Design</FooterLink></li>
              <li><FooterLink href="/services/development">Development</FooterLink></li>
              <li><FooterLink href="/services/digital-marketing">Marketing &amp; SEO</FooterLink></li>
              <li><FooterLink href="/services/ai-marketing">AI Automation</FooterLink></li>
            </ul>
          </nav>

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

        <div
          style={{
            marginTop: 64,
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
              fontWeight: 400,
              fontSize: 13,
              color: "#62666d",
            }}
          >
            © {year} Hisaku. All rights reserved.
          </p>
          <p
            style={{
              margin: 0,
              fontWeight: 400,
              fontSize: 13,
              color: "#62666d",
            }}
          >
            Hyderabad · India
          </p>
        </div>
      </div>
    </footer>
  );
}
