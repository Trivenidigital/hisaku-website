"use client";

import Link from "next/link";
import { LineReveal } from "@/components/ui/LineReveal";
import { FadeIn } from "@/components/ui/FadeIn";

/**
 * ServicesSection — dark bg, four rows separated by a line that draws
 * left-to-right on scroll. CSS-only hover reveal (tagline fade + arrow
 * + row bg swap to #0d0d12).
 */

const SERVICES = [
  {
    slug: "design",
    number: "01",
    name: "Web Design",
    tagline: "Beautiful. Precise. Memorable.",
  },
  {
    slug: "development",
    number: "02",
    name: "Development",
    tagline: "Fast. Scalable. Yours.",
  },
  {
    slug: "digital-marketing",
    number: "03",
    name: "Marketing",
    tagline: "Found. Clicked. Converted.",
  },
  {
    slug: "ai-marketing",
    number: "04",
    name: "AI Automation",
    tagline: "Automated. Intelligent. Unstoppable.",
  },
] as const;

export function ServicesSection() {
  return (
    <section
      data-theme="dark"
      aria-label="What we do"
      className="py-24 md:py-32"
      style={{ background: "var(--color-bg-dark)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <p
            className="uppercase mb-14"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: "0.2em",
              color:
                "color-mix(in srgb, var(--color-text-primary) 30%, transparent)",
            }}
          >
            What We Do
          </p>
        </FadeIn>

        <ul className="flex flex-col">
          {SERVICES.map((service, i) => (
            <li key={service.slug}>
              {/* Line draws left-to-right on scroll, staggered 80ms per row
                  so the whole list unfurls as you enter the section. */}
              <LineReveal
                className={`h-px ${i === 0 ? "bg-[rgba(255,255,255,0.06)]" : "bg-[color:var(--color-accent-primary)]"}`}
                duration={0.8}
                delay={i * 0.08}
              />
              <Link
                href={`/services/${service.slug}`}
                data-cursor="hover"
                className="group grid grid-cols-[48px_1fr_auto] items-center gap-4 md:gap-8 py-7 md:py-8 px-0 md:px-6 transition-colors duration-300 ease-out hover:bg-[color:var(--color-bg-mid)] cursor-pointer"
              >
                <span
                  className="tabular-nums"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: 13,
                    color:
                      "color-mix(in srgb, var(--color-text-primary) 25%, transparent)",
                  }}
                >
                  {service.number}
                </span>

                <span
                  className="leading-[1.1] tracking-tight transition-colors group-hover:text-[color:var(--color-accent-primary)]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(28px, 5vw, 72px)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {service.name}
                </span>

                <span className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 300,
                      fontSize: 16,
                      color:
                        "color-mix(in srgb, var(--color-text-primary) 50%, transparent)",
                    }}
                  >
                    {service.tagline}
                  </span>
                  <span
                    aria-hidden="true"
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-2xl"
                    style={{ color: "var(--color-accent-primary)" }}
                  >
                    →
                  </span>
                </span>
              </Link>

              {/* Mobile tagline */}
              <p
                className="md:hidden pb-6 pl-12"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: 13,
                  color:
                    "color-mix(in srgb, var(--color-text-primary) 50%, transparent)",
                }}
              >
                {service.tagline}
              </p>
            </li>
          ))}
          {/* Closing hairline — staggered after the last row. */}
          <li>
            <LineReveal
              className="h-px bg-[rgba(255,255,255,0.06)]"
              duration={0.8}
              delay={SERVICES.length * 0.08}
            />
          </li>
        </ul>
      </div>
    </section>
  );
}
