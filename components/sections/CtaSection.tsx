import Link from "next/link";

/**
 * CtaSection — final conversion block.
 *
 *   ┌──────────────────────────────┐
 *   │                              │
 *   │       Ready to               │
 *   │       move?                  │  ← "move?" in lime
 *   │                              │
 *   │   [ Start a Project → ]      │  ← lime background button
 *   │                              │
 *   │   Or WhatsApp us directly →  │  ← mutedlink + WhatsApp glyph
 *   │                              │
 *   └──────────────────────────────┘
 *
 * WhatsApp number is driven by NEXT_PUBLIC_WHATSAPP_NUMBER env var. If
 * unset, the secondary CTA falls back to a mailto link so the surface is
 * never a dead button.
 */

function buildWhatsAppUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!raw) return null;
  // wa.me requires a number with country code, no + or spaces.
  const digits = raw.replace(/[^0-9]/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}`;
}

function WhatsAppGlyph() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="inline-block align-[-0.15em] ml-2"
    >
      <path d="M20.52 3.48A11.84 11.84 0 0012.06 0C5.49 0 .14 5.35.14 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.29-1.65a11.9 11.9 0 005.76 1.47h.01c6.57 0 11.92-5.35 11.92-11.92 0-3.18-1.24-6.17-3.46-8.42zM12.06 21.78h-.01a9.86 9.86 0 01-5.02-1.38l-.36-.21-3.73.98.99-3.64-.23-.37a9.84 9.84 0 01-1.51-5.24c0-5.45 4.44-9.88 9.88-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 012.9 6.99c-.01 5.44-4.44 9.85-9.9 9.85zm5.42-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
    </svg>
  );
}

export function CtaSection() {
  const whatsApp = buildWhatsAppUrl();
  return (
    <section
      aria-label="Call to action"
      className="px-6 py-28 md:py-40 text-center"
      style={{ background: "var(--color-base)" }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="leading-[1.02] tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(56px, 10vw, 96px)",
            color: "var(--color-text-primary)",
          }}
        >
          Ready to
          <br />
          <span style={{ color: "var(--color-accent-primary)" }}>move?</span>
        </h2>

        <div className="mt-12 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center text-base transition-colors bg-[color:var(--color-accent-primary)] hover:bg-[color:var(--color-text-primary)]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 18,
              color: "var(--color-base)",
              padding: "20px 48px",
            }}
          >
            Start a Project
            <span aria-hidden="true" className="ml-3">
              →
            </span>
          </Link>
        </div>

        {whatsApp ? (
          <a
            href={whatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center text-sm transition-colors hover:text-[color:var(--color-accent-primary)]"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              color: "var(--color-text-secondary)",
            }}
          >
            Or WhatsApp us directly
            <WhatsAppGlyph />
            <span aria-hidden="true" className="ml-1">
              →
            </span>
          </a>
        ) : (
          <a
            href="mailto:hello@hisaku.com"
            className="mt-8 inline-flex items-center text-sm transition-colors hover:text-[color:var(--color-accent-primary)]"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              color: "var(--color-text-secondary)",
            }}
          >
            Or email us directly
            <span aria-hidden="true" className="ml-1">
              →
            </span>
          </a>
        )}
      </div>
    </section>
  );
}
