import Link from "next/link";

export default function CaseStudyNotFound() {
  return (
    <main
      id="main"
      className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center"
    >
      <p
        className="text-xs uppercase tracking-[0.3em] mb-8"
        style={{ color: "var(--color-accent-primary)" }}
      >
        Not found
      </p>
      <h1
        className="text-[7rem] md:text-[9rem] leading-none font-extrabold tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        404
      </h1>
      <p
        className="mt-6 text-lg max-w-md"
        style={{ color: "var(--color-text-secondary)" }}
      >
        We couldn&apos;t find that case study. It may have moved, or the
        URL might be a typo.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link
          href="/work"
          className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
          style={{
            background: "var(--color-accent-primary)",
            color: "var(--color-base)",
          }}
        >
          Back to work
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border"
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
