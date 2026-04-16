import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page got lost. Let's get you back.",
};

/**
 * Custom 404 page.
 *
 * Design spec (from plan, Route-Level Requirements):
 *   brand mark, oversized "404" in display face, one-line message,
 *   two CTAs. Same dark theme and typography as the rest of the site.
 */
export default function NotFound() {
  return (
    <main
      id="main"
      className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center"
    >
      <p
        className="text-xs uppercase tracking-[0.3em] mb-8"
        style={{ color: "var(--color-accent-primary)" }}
      >
        Hisaku
      </p>
      <h1
        className="text-[9rem] leading-none font-extrabold tracking-tight"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-text-primary)",
        }}
      >
        404
      </h1>
      <p
        className="mt-6 text-lg max-w-md"
        style={{ color: "var(--color-text-secondary)" }}
      >
        This page got lost. Let&apos;s get you back.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link
          href="/work"
          className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors"
          style={{
            background: "var(--color-accent-primary)",
            color: "var(--color-base)",
          }}
        >
          Back to work
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border transition-colors"
          style={{
            borderColor: "var(--color-hairline)",
            color: "var(--color-text-primary)",
          }}
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
