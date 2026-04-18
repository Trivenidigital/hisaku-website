import Link from "next/link";

export default function ServiceNotFound() {
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
        That capability page doesn&apos;t exist. Try the capabilities list
        on our home page.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
          style={{
            background: "var(--color-accent-primary)",
            color: "var(--color-base)",
          }}
        >
          Back home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border"
          style={{
            borderColor: "var(--color-hairline)",
            color: "var(--color-text-primary)",
          }}
        >
          Start a project
        </Link>
      </div>
    </main>
  );
}
