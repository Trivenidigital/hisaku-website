"use client";

import { useState } from "react";

/**
 * ContactForm — minimal inquiry form.
 *
 * No <form> tag per spec — uses div + button so the submit flow is
 * entirely handled in JS. For now we open a mailto: with the composed
 * body; once a backend endpoint exists (Resend, Formspree, or a
 * Vercel route), swap the onSubmit to POST there.
 */

interface FormState {
  name: string;
  email: string;
  company: string;
  needs: string;
  budget: string;
}

const INITIAL: FormState = {
  name: "",
  email: "",
  company: "",
  needs: "",
  budget: "",
};

const fieldStyle = {
  display: "block",
  width: "100%",
  border: "none",
  borderBottom: "1px solid rgba(255,255,255,0.12)",
  background: "transparent",
  padding: "16px 0",
  fontFamily: "var(--font-sans, sans-serif)",
  fontWeight: 300,
  fontSize: 16,
  color: "#f4f3ef",
  outline: "none",
  transition: "border-color 200ms ease",
} as const;

export function ContactForm() {
  const [state, setState] = useState<FormState>(INITIAL);
  const [sent, setSent] = useState(false);

  function update<K extends keyof FormState>(key: K, value: string) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function submit() {
    // Compose a mailto body until a proper backend endpoint ships.
    const subject = encodeURIComponent(
      `Project inquiry from ${state.name || "website"}`
    );
    const bodyLines = [
      `Name: ${state.name}`,
      `Email: ${state.email}`,
      `Company: ${state.company || "—"}`,
      "",
      "What do you need?",
      state.needs,
      "",
      `Budget range: ${state.budget || "—"}`,
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:hello@hisaku.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderBottomColor = "#e8ff47";
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.12)";
  }

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <input
          type="text"
          placeholder="Your name"
          value={state.name}
          onChange={(e) => update("name", e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={fieldStyle}
        />
        <input
          type="email"
          placeholder="Your email"
          value={state.email}
          onChange={(e) => update("email", e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={fieldStyle}
        />
        <input
          type="text"
          placeholder="Company (optional)"
          value={state.company}
          onChange={(e) => update("company", e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={fieldStyle}
        />
        <textarea
          placeholder="What do you need?"
          value={state.needs}
          onChange={(e) => update("needs", e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{ ...fieldStyle, minHeight: 120, resize: "vertical" }}
        />
        <input
          type="text"
          placeholder="Budget range (optional)"
          value={state.budget}
          onChange={(e) => update("budget", e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={fieldStyle}
        />
      </div>

      <button
        type="button"
        onClick={submit}
        disabled={sent}
        data-cursor="hover"
        style={{
          marginTop: 40,
          width: "100%",
          padding: "18px 48px",
          border: "none",
          backgroundColor: sent ? "#f4f3ef" : "#e8ff47",
          color: "#050507",
          fontFamily: "var(--font-sans, sans-serif)",
          fontWeight: 600,
          fontSize: 15,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "background-color 200ms ease",
        }}
        onMouseEnter={(e) =>
          !sent && (e.currentTarget.style.backgroundColor = "#f4f3ef")
        }
        onMouseLeave={(e) =>
          !sent && (e.currentTarget.style.backgroundColor = "#e8ff47")
        }
      >
        {sent ? "Opening mail client…" : "Send Message →"}
      </button>

      <p
        style={{
          marginTop: 16,
          fontFamily: "var(--font-sans, sans-serif)",
          fontSize: 12,
          color: "rgba(244,243,239,0.35)",
        }}
      >
        Prefer email? Write directly to{" "}
        <a
          href="mailto:hello@hisaku.com"
          style={{
            color: "rgba(244,243,239,0.55)",
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          hello@hisaku.com
        </a>
        .
      </p>
    </div>
  );
}
