"use client";

import { useState } from "react";

/**
 * ValueCard — dark card with lime number. Hover lifts the card
 * and raises its border to lime.
 */
export function ValueCard({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: "#111111",
        border: `1px solid ${hover ? "rgba(232,255,71,0.4)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 12,
        padding: 32,
        transition: "all 300ms ease",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hover ? "0 20px 40px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <p
        style={{
          fontWeight: 500,
          fontSize: 13,
          color: "#e8ff47",
          letterSpacing: "0.08em",
          margin: 0,
        }}
      >
        {number}
      </p>
      <h3
        style={{
          fontWeight: 700,
          fontSize: 24,
          letterSpacing: "-0.01em",
          color: "#ffffff",
          margin: "12px 0 12px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontWeight: 400,
          fontSize: 15,
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}
