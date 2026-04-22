"use client";

import { useState } from "react";

/**
 * ValueCard — ghost card with muted number. Hover shifts
 * background and lifts slightly. No violet.
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
        backgroundColor: hover
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${
          hover ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"
        }`,
        borderRadius: 8,
        padding: 32,
        transition: "background-color 300ms ease, border-color 300ms ease, transform 300ms ease",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      <p
        style={{
          fontWeight: 500,
          fontSize: 13,
          color: "#62666d",
          letterSpacing: "0.08em",
          margin: 0,
        }}
      >
        {number}
      </p>
      <h3
        style={{
          fontWeight: 510,
          fontSize: 22,
          letterSpacing: "-0.01em",
          color: "#f7f8f8",
          margin: "12px 0 12px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontWeight: 400,
          fontSize: 15,
          color: "#8a8f98",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}
