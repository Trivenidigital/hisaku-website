import type { Metadata } from "next";
import { CalEmbedButton } from "@/components/CalEmbedButton";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Start a project",
  description:
    "Book a call with Hisaku, or email hello@hisaku.com. We respond same day, Monday through Friday.",
  canonicalPath: "/contact",
});

const FALLBACK_EMAIL = "hello@hisaku.com";

/**
 * Contact page. Static render. Cal.com embed mounts lazily on click
 * (zero Cal.com JS in the page bundle until the user asks for it).
 *
 * NEXT_PUBLIC_CAL_USERNAME env var controls the embed. If unset, the
 * button skips the embed attempt and goes straight to the email fallback.
 * This lets us ship the page before the Cal.com account is configured.
 */
export default function ContactPage() {
  const calLink = process.env.NEXT_PUBLIC_CAL_USERNAME;

  return (
    <main id="main" className="flex-1">
      <section
        aria-label="Contact intro"
        className="max-w-4xl mx-auto px-6 pt-20 md:pt-28 pb-8"
      >
        <p
          className="text-xs uppercase tracking-[0.3em] mb-6"
          style={{ color: "var(--color-accent-primary)" }}
        >
          Start a project
        </p>
        <h1
          className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Let&apos;s talk.
        </h1>
        <p
          className="mt-6 max-w-xl text-lg md:text-xl"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Book a 30-minute call. Tell us what you&apos;re building, what&apos;s
          stuck, and what good would look like. If we&apos;re a fit, we&apos;ll
          send a proposal within the week. If we&apos;re not, we&apos;ll tell
          you straight and point you at someone who is.
        </p>
      </section>

      <section
        aria-label="Book"
        className="max-w-4xl mx-auto px-6 py-8 md:py-12"
      >
        <div className="flex flex-col gap-6">
          <CalEmbedButton calLink={calLink} fallbackEmail={FALLBACK_EMAIL} />
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Prefer email? Write to{" "}
            <a
              href={`mailto:${FALLBACK_EMAIL}`}
              className="underline underline-offset-4 hover:text-[color:var(--color-accent-primary)] transition-colors"
              style={{ color: "var(--color-text-primary)" }}
            >
              {FALLBACK_EMAIL}
            </a>
            . Same-day response Monday through Friday.
          </p>
        </div>
      </section>

      {/* What to expect — calm editorial, not a card grid */}
      <section
        aria-label="What to expect"
        className="max-w-4xl mx-auto px-6 py-16 md:py-20 border-t border-[color:var(--color-hairline)] mt-16"
      >
        <h2
          className="text-xs uppercase tracking-[0.3em] mb-10"
          style={{ color: "var(--color-text-secondary)" }}
        >
          What to expect on the call
        </h2>
        <ol className="flex flex-col">
          {[
            "We ask what you're trying to do and why. No sales deck.",
            "We tell you if we can help, straight. If not, we point you at someone who can.",
            "If we're a fit, you get a proposal within the week with scope, price, and timeline.",
          ].map((line, i) => (
            <li
              key={line}
              className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10 py-6 md:py-8 border-t border-[color:var(--color-hairline)] last:border-b"
            >
              <span
                className="text-2xl md:text-4xl font-bold leading-none tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-secondary)",
                }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className="text-base md:text-lg max-w-2xl self-center"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {line}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
