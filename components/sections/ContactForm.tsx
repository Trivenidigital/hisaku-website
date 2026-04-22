"use client";

import { useState } from "react";

/**
 * ContactSide — small rotating dashed circle + Hyderabad coordinates.
 * Export alongside the form so the contact page can render it on the
 * left column without introducing another file.
 */
export function ContactSideMark() {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 16,
      }}
    >
      <svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        style={{ animation: "spin 24s linear infinite" }}
      >
        <circle
          cx="36"
          cy="36"
          r="34"
          fill="none"
          stroke="rgba(139,92,246,0.35)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle cx="36" cy="36" r="3" fill="#8B5CF6" />
      </svg>
      <p
        style={{
          fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
          fontSize: 12,
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.4)",
          margin: 0,
        }}
      >
        17.3850° N · 78.4867° E
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

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
  fontFamily: "var(--font-jakarta, sans-serif)",
  fontWeight: 400,
  fontSize: 16,
  color: "#f7f8f8",
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
    e.currentTarget.style.borderBottomColor = "#8B5CF6";
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
        style={{
          marginTop: 40,
          width: "100%",
          padding: "18px 48px",
          border: "none",
          borderRadius: 6,
          backgroundColor: sent ? "#7C3AED" : "#8B5CF6",
          color: "#0a0a0f",
          fontFamily: "var(--font-jakarta, sans-serif)",
          fontWeight: 510,
          fontSize: 15,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "all 200ms ease",
        }}
        onMouseEnter={(e) => {
          if (sent) return;
          e.currentTarget.style.backgroundColor = "#7C3AED";
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.filter = "brightness(1.05)";
        }}
        onMouseLeave={(e) => {
          if (sent) return;
          e.currentTarget.style.backgroundColor = "#8B5CF6";
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.filter = "none";
        }}
      >
        {sent ? "Opening mail client…" : "Send Message →"}
      </button>

      <p
        style={{
          marginTop: 16,
          textAlign: "center",
          fontFamily: "var(--font-jakarta, sans-serif)",
          fontWeight: 400,
          fontSize: 13,
          color: "rgba(255,255,255,0.4)",
        }}
      >
        We typically respond within 24 hours.
      </p>

      <p
        style={{
          marginTop: 12,
          textAlign: "center",
          fontFamily: "var(--font-jakarta, sans-serif)",
          fontSize: 12,
          color: "rgba(255,255,255,0.3)",
        }}
      >
        Prefer email? Write directly to{" "}
        <a
          href="mailto:hello@hisaku.com"
          style={{
            color: "rgba(255,255,255,0.55)",
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
