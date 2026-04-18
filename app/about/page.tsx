import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Hisaku is a small digital agency. We design, build, and grow digital products for startups and growing companies. Based in Hyderabad, working worldwide.",
  canonicalPath: "/about",
});

/**
 * About page. Founder-driven narrative.
 *
 * Kept intentionally text-forward and personal. No team photo grid, no
 * "our values" icons — those are agency-site clichés. The page tells you
 * who we are, what we believe, and why we're worth talking to.
 */
export default function AboutPage() {
  return (
    <main id="main" className="flex-1">
      <section
        aria-label="About intro"
        className="max-w-4xl mx-auto px-6 pt-20 md:pt-28 pb-12"
      >
        <p
          className="text-xs uppercase tracking-[0.3em] mb-6"
          style={{ color: "var(--color-accent-primary)" }}
        >
          About
        </p>
        <h1
          className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          A small team
          <br />
          that ships like
          <br />
          a big one.
        </h1>
      </section>

      <section
        aria-label="Narrative"
        className="max-w-3xl mx-auto px-6 py-8 md:py-12 flex flex-col gap-6"
      >
        <p
          className="text-lg md:text-xl leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Hisaku is a digital agency based in Hyderabad. We take on design,
          development, and marketing end-to-end for startups and growing
          companies. One team, one decision-maker, one invoice.
        </p>
        <p
          className="text-lg md:text-xl leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          We started because the old agency model is broken for modern
          businesses. Handoffs between separate design, dev, and marketing
          vendors cost weeks. Retainers full of dashboards nobody reads cost
          money. You just want the thing built well, launched, and growing.
          That&apos;s what we do.
        </p>
        <p
          className="text-lg md:text-xl leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Every client we&apos;ve worked with has come through a referral.
          We&apos;re happy about that and also suspicious of it, which is
          why this site exists: to make it easy for new people to see what
          we&apos;ve done and decide for themselves.
        </p>
      </section>

      {/* How we work — 3 principles, editorial, not cards */}
      <section
        aria-label="How we work"
        className="max-w-4xl mx-auto px-6 py-16 md:py-20 border-t border-[color:var(--color-hairline)] mt-16"
      >
        <h2
          className="text-xs uppercase tracking-[0.3em] mb-10"
          style={{ color: "var(--color-text-secondary)" }}
        >
          How we work
        </h2>
        <ol className="flex flex-col">
          {[
            {
              title: "Ship first, polish second.",
              body: "We prefer a working thing you can use over a beautiful deck you can present. Revisions happen on live code, not in the abstract.",
            },
            {
              title: "Craft matters.",
              body: "The site IS the portfolio, the codebase IS the case study. We care about typography, performance, accessibility, and the edge cases nobody notices until they break.",
            },
            {
              title: "Honest about AI.",
              body: "We use AI where it measurably beats the manual alternative. Where it doesn't, we tell you. No hype-driven recommendations.",
            },
          ].map((item, i) => (
            <li
              key={item.title}
              className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10 py-8 md:py-10 border-t border-[color:var(--color-hairline)] last:border-b"
            >
              <span
                className="text-3xl md:text-5xl font-bold leading-none tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-secondary)",
                }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-3">
                <h3
                  className="text-2xl md:text-3xl font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-base md:text-lg max-w-2xl"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section
        aria-label="CTA"
        className="max-w-6xl mx-auto px-6 py-20 md:py-28"
      >
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <h2
            className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let&apos;s make
            <br />
            something.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold self-start md:self-end"
            style={{
              background: "var(--color-accent-primary)",
              color: "var(--color-base)",
            }}
          >
            Start a project
          </Link>
        </div>
      </section>
    </main>
  );
}
