"use client";

import { useState } from "react";

/**
 * Contact — 40/60 split. Numbered form steps (01/02/03) run down
 * the left; the form itself is on the right. Inputs are
 * borderless with hairline bottom rules (like Superhuman's auth).
 * Focus state: violet underline.
 */
const FIELDS: {
  name: "name" | "email" | "budget" | "message";
  label: string;
  type?: string;
  textarea?: boolean;
  step: string;
  placeholder: string;
}[] = [
  {
    name: "name",
    step: "01",
    label: "What should we call you?",
    placeholder: "Your name",
  },
  {
    name: "email",
    step: "02",
    label: "Where should we reply?",
    type: "email",
    placeholder: "you@company.com",
  },
  {
    name: "budget",
    step: "03",
    label: "Rough budget?",
    placeholder: "₹1L / $5K / not sure",
  },
  {
    name: "message",
    step: "04",
    label: "What's the project?",
    textarea: true,
    placeholder: "A few sentences is fine. More is better.",
  },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    // Placeholder submit — wire to /api/contact when ready.
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    setSent(true);
  }

  return (
    <main
      id="main"
      style={{
        backgroundColor: "#0a0a0f",
        paddingTop: 160,
        paddingBottom: 160,
        minHeight: "100vh",
      }}
    >
      <section style={{ padding: "0 48px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          <div style={{ position: "sticky", top: 120 }}>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#8a8f98",
              }}
            >
              Contact
            </p>
            <h1
              style={{
                margin: "16px 0 0",
                fontSize: "clamp(40px, 5vw, 64px)",
                fontWeight: 500,
                letterSpacing: "-0.035em",
                color: "#f7f8f8",
                lineHeight: 1.04,
              }}
            >
              Tell us about
              <br />
              <span style={{ fontStyle: "italic", fontWeight: 400, color: "#d0d6e0" }}>
                the project.
              </span>
            </h1>
            <p
              style={{
                margin: "32px 0 0",
                fontSize: 16,
                lineHeight: 1.7,
                color: "#8a8f98",
                maxWidth: 360,
              }}
            >
              We reply within one business day. If you'd rather talk first,
              email{" "}
              <a
                href="mailto:hello@hisaku.com"
                style={{ color: "#f7f8f8", textDecoration: "none" }}
              >
                hello@hisaku.com
              </a>{" "}
              or message us on WhatsApp.
            </p>
          </div>

          <div>
            {sent ? (
              <div
                style={{
                  padding: "80px 0",
                  fontSize: 24,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  color: "#f7f8f8",
                }}
              >
                Got it. We'll reply within one business day —{" "}
                <span style={{ color: "#8a8f98" }}>usually sooner.</span>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 48,
                  }}
                >
                  {FIELDS.map((f) => (
                    <Field key={f.name} field={f} />
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    marginTop: 48,
                    backgroundColor: sending ? "#4b2d91" : "#8B5CF6",
                    color: "#ffffff",
                    padding: "14px 28px",
                    borderRadius: 8,
                    fontWeight: 510,
                    fontSize: 15,
                    border: "none",
                    cursor: sending ? "not-allowed" : "pointer",
                    transition:
                      "background-color 200ms ease, box-shadow 200ms ease",
                    boxShadow: "0 0 0 rgba(139,92,246,0)",
                  }}
                  onMouseEnter={(e) => {
                    if (sending) return;
                    e.currentTarget.style.backgroundColor = "#7C3AED";
                    e.currentTarget.style.boxShadow =
                      "0 0 32px rgba(139,92,246,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    if (sending) return;
                    e.currentTarget.style.backgroundColor = "#8B5CF6";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 rgba(139,92,246,0)";
                  }}
                >
                  {sending ? "Sending…" : "Send →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  field,
}: {
  field: (typeof FIELDS)[number];
}) {
  const [focus, setFocus] = useState(false);
  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    color: "#f7f8f8",
    fontSize: 18,
    fontWeight: 400,
    padding: "12px 0",
    borderBottom: `1px solid ${
      focus ? "#8B5CF6" : "rgba(255,255,255,0.08)"
    }`,
    transition: "border-color 200ms ease",
    fontFamily: "inherit",
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "#62666d",
            letterSpacing: "0.1em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {field.step}
        </span>
        <label
          htmlFor={field.name}
          style={{
            fontSize: 14,
            color: "#8a8f98",
            fontWeight: 400,
          }}
        >
          {field.label}
        </label>
      </div>
      <div style={{ marginTop: 12 }}>
        {field.textarea ? (
          <textarea
            id={field.name}
            name={field.name}
            rows={4}
            required
            placeholder={field.placeholder}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        ) : (
          <input
            id={field.name}
            name={field.name}
            type={field.type ?? "text"}
            required={field.name !== "budget"}
            placeholder={field.placeholder}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            style={inputStyle}
          />
        )}
      </div>
    </div>
  );
}
