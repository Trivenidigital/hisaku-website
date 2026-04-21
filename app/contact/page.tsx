import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Start a project with Hisaku. Email hello@hisaku.com, message us on WhatsApp, or send a note below.",
  canonicalPath: "/contact",
});

const FALLBACK_EMAIL = "hello@hisaku.com";

/**
 * Contact page — 50/50 split.
 *
 * Left (sticky on desktop): big headline, email, location, WhatsApp button.
 * Right: contact form on elevated surface.
 */
export default function ContactPage() {
  const whatsApp = buildWhatsAppUrl();
  return (
    <main
      id="main"
      style={{
        backgroundColor: "#050507",
        color: "#f4f3ef",
        minHeight: "100vh",
      }}
    >
      <div
        data-theme="dark"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          minHeight: "100vh",
        }}
        className="contact-split"
      >
        {/* Left side — intro + contact details */}
        <section
          style={{
            padding: "160px 60px 80px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#e8ff47",
              marginBottom: 24,
            }}
          >
            Start a Project
          </p>
          <h1
            style={{
              fontFamily: "var(--font-syne, sans-serif)",
              fontWeight: 800,
              fontSize: "clamp(48px, 6vw, 80px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              color: "#f4f3ef",
              marginBottom: 40,
            }}
          >
            Let&apos;s build
            <br />
            something.
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <a
              href={`mailto:${FALLBACK_EMAIL}`}
              data-cursor="hover"
              style={{
                fontFamily: "var(--font-sans, sans-serif)",
                fontWeight: 300,
                fontSize: 18,
                color: "#f4f3ef",
                textDecoration: "none",
                transition: "color 200ms ease",
              }}
            >
              {FALLBACK_EMAIL}
            </a>
            <p
              style={{
                fontFamily: "var(--font-sans, sans-serif)",
                fontWeight: 300,
                fontSize: 14,
                color: "rgba(244,243,239,0.45)",
              }}
            >
              Hyderabad, India
            </p>
          </div>

          <div style={{ marginTop: 40 }}>
            <a
              href={whatsApp ?? `mailto:${FALLBACK_EMAIL}`}
              target={whatsApp ? "_blank" : undefined}
              rel={whatsApp ? "noopener noreferrer" : undefined}
              data-cursor="hover"
              style={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "#e8ff47",
                color: "#050507",
                padding: "14px 32px",
                fontFamily: "var(--font-sans, sans-serif)",
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              {whatsApp ? "WhatsApp us" : "Email us"}
              <span aria-hidden="true" style={{ marginLeft: 12 }}>
                →
              </span>
            </a>
          </div>

          <div style={{ marginTop: 48, display: "flex", gap: 24 }}>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              style={{
                fontFamily: "var(--font-sans, sans-serif)",
                fontWeight: 300,
                fontSize: 14,
                color: "rgba(244,243,239,0.6)",
                textDecoration: "none",
              }}
            >
              LinkedIn
            </a>
            <span style={{ color: "#e8ff47" }}>·</span>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              style={{
                fontFamily: "var(--font-sans, sans-serif)",
                fontWeight: 300,
                fontSize: 14,
                color: "rgba(244,243,239,0.6)",
                textDecoration: "none",
              }}
            >
              Twitter / X
            </a>
          </div>
        </section>

        {/* Right side — form on elevated surface */}
        <section
          style={{
            backgroundColor: "#0d0d12",
            padding: "160px 60px 80px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <ContactForm />
        </section>
      </div>
    </main>
  );
}

function buildWhatsAppUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!raw) return null;
  const digits = raw.replace(/[^0-9]/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}
