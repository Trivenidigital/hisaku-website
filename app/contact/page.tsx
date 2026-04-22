import type { Metadata } from "next";
import { ContactForm, ContactSideMark } from "@/components/sections/ContactForm";
import { buildMetadata } from "@/lib/metadata";
import { colors, fonts } from "@/lib/design";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Start a project with Hisaku. Email hello@hisaku.com, message us on WhatsApp, or fill the form.",
  canonicalPath: "/contact",
});

const FALLBACK_EMAIL = "hello@hisaku.com";

function buildWhatsAppUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!raw) return null;
  const digits = raw.replace(/[^0-9]/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}

export default function ContactPage() {
  const whatsApp = buildWhatsAppUrl();
  return (
    <main
      id="main"
      style={{
        backgroundColor: colors.bg,
        color: colors.white,
        minHeight: "100vh",
      }}
    >
      <div
        className="contact-split"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          minHeight: "100vh",
        }}
      >
        {/* Left — intro + contact + dashed mark */}
        <section
          style={{
            backgroundColor: colors.bg,
            padding: "120px 48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: colors.dim,
              margin: "0 0 32px",
            }}
          >
            Start a Project
          </p>
          <h1
            style={{
              fontFamily: fonts.display,
              fontWeight: 510,
              fontSize: "clamp(36px, 5vw, 64px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: colors.white,
              margin: "0 0 40px",
            }}
          >
            Let&apos;s build
            <br />
            something.
          </h1>

          <div
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <a
              href={`mailto:${FALLBACK_EMAIL}`}
              style={{
                fontFamily: fonts.body,
                fontWeight: 400,
                fontSize: 18,
                color: colors.white,
                textDecoration: "none",
                transition: "color 200ms ease",
              }}
            >
              {FALLBACK_EMAIL}
            </a>
            <p
              style={{
                fontFamily: fonts.body,
                fontWeight: 400,
                fontSize: 14,
                color: colors.muted,
                margin: 0,
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
              style={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: colors.accent,
                color: "#ffffff",
                padding: "14px 28px",
                borderRadius: 8,
                fontFamily: fonts.body,
                fontWeight: 510,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              {whatsApp ? "WhatsApp us" : "Email us"}
              <span aria-hidden="true" style={{ marginLeft: 10 }}>
                →
              </span>
            </a>
          </div>

          <div style={{ marginTop: 48, display: "flex", gap: 20 }}>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: fonts.body,
                fontWeight: 400,
                fontSize: 14,
                color: colors.muted,
                textDecoration: "none",
              }}
            >
              LinkedIn
            </a>
            <span style={{ color: colors.dim }}>·</span>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: fonts.body,
                fontWeight: 400,
                fontSize: 14,
                color: colors.muted,
                textDecoration: "none",
              }}
            >
              Twitter / X
            </a>
          </div>

          <div style={{ marginTop: 56 }}>
            <ContactSideMark />
          </div>
        </section>

        {/* Right — form on same dark bg; split by left border only. */}
        <section
          style={{
            backgroundColor: colors.bg,
            padding: "120px 48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
