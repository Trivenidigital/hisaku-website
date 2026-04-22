"use client";

import Link from "next/link";
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Meteors } from "@/components/ui/Meteors";

/**
 * WorkGrid — 3-column grid of recent case studies.
 *
 * Each card is a GlassCard. Meteors activate on hover (and only then)
 * so the grid is still by default. Metric numbers are in WHITE, not
 * violet — violet is reserved for CTAs. Category in muted grey.
 *
 * Tile anatomy:
 *   [ 220px media thumb              ]
 *   Category · Year
 *   Title (20px, 510 weight)
 *   Metric row: +320% Conversions
 */
interface WorkItem {
  slug: string;
  title: string;
  category: string;
  year: string | number;
  thumbnail?: string | null;
  metric?: { label: string; value: string } | null;
}

function WorkTile({ item }: { item: WorkItem }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={`/work/${item.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <GlassCard interactive radius={16}>
        <div
          style={{
            position: "relative",
            height: 220,
            overflow: "hidden",
            backgroundColor: "#12121a",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {item.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.thumbnail}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 600ms ease, filter 400ms ease",
                transform: hover ? "scale(1.04)" : "scale(1)",
                filter: hover ? "saturate(1.1)" : "saturate(0.92)",
              }}
            />
          ) : (
            <div
              aria-hidden
              style={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, #12121a 0%, #1a1a24 100%)",
              }}
            />
          )}
          <Meteors active={hover} count={6} />
        </div>

        <div style={{ padding: 28 }}>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#8a8f98",
            }}
          >
            {item.category} · {item.year}
          </p>
          <h3
            style={{
              margin: "12px 0 0",
              fontSize: 20,
              fontWeight: 510,
              letterSpacing: "-0.01em",
              color: "#f7f8f8",
              lineHeight: 1.3,
            }}
          >
            {item.title}
          </h3>
          {item.metric ? (
            <p
              style={{
                margin: "20px 0 0",
                fontSize: 14,
                color: "#8a8f98",
                fontWeight: 400,
              }}
            >
              <span
                style={{
                  color: "#f7f8f8",
                  fontWeight: 510,
                  fontSize: 15,
                  letterSpacing: "-0.01em",
                }}
              >
                {item.metric.value}
              </span>{" "}
              {item.metric.label}
            </p>
          ) : null}
        </div>
      </GlassCard>
    </Link>
  );
}

export function WorkGrid({ items }: { items: WorkItem[] }) {
  return (
    <section
      aria-label="Recent work"
      style={{
        backgroundColor: "#0a0a0f",
        padding: "120px 48px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 64,
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
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
              Selected Work
            </p>
            <h2
              style={{
                margin: "16px 0 0",
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: "#f7f8f8",
                lineHeight: 1.05,
              }}
            >
              Proof, not promises.
            </h2>
          </div>
          <Link
            href="/work"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#d0d6e0",
              textDecoration: "none",
              transition: "color 200ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f7f8f8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#d0d6e0")}
          >
            View all →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {items.map((item) => (
            <WorkTile key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
