"use client";

import { useState, useCallback } from "react";

interface CalEmbedButtonProps {
  /**
   * Cal.com namespace / username slug (e.g. "hisaku"). When undefined,
   * the button skips the embed entirely and shows the fallback UI
   * immediately on click. This lets us ship the component before the
   * Cal.com account is configured.
   */
  calLink?: string;
  /** Fallback email address shown if the embed isn't available or fails. */
  fallbackEmail: string;
}

type Status = "idle" | "loading" | "ready" | "fallback";

/**
 * Book-a-call trigger with a graceful lazy-mount of the Cal.com embed.
 *
 * Flow:
 *   idle    → user clicks "Book a call"
 *           → if no calLink configured, go directly to "fallback"
 *           → otherwise dynamic-import('@calcom/embed-react') with a
 *             5-second timeout race
 *   loading → button shows "Opening…"; cancels to fallback on timeout/error
 *   ready   → Cal.com embed mounted inline
 *   fallback→ "Booking widget didn't load. Email us at… or visit cal.com/…"
 *
 * NO Cal.com JS is loaded before the click. Per the plan: "Before the
 * click, zero Cal.com JS on the page."
 */
export function CalEmbedButton({ calLink, fallbackEmail }: CalEmbedButtonProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [EmbedComp, setEmbedComp] = useState<React.ComponentType<{
    calLink: string;
    style?: React.CSSProperties;
  }> | null>(null);

  const openEmbed = useCallback(async () => {
    if (!calLink) {
      setStatus("fallback");
      return;
    }
    setStatus("loading");

    const timeoutMs = 5000;
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("cal-timeout")), timeoutMs)
    );

    try {
      const mod = await Promise.race([
        import("@calcom/embed-react"),
        timeoutPromise,
      ]);
      // Cal.com's default export is the embed component.
      setEmbedComp(() => mod.default as typeof EmbedComp);
      setStatus("ready");
    } catch {
      setStatus("fallback");
    }
  }, [calLink]);

  if (status === "ready" && EmbedComp && calLink) {
    return (
      <div
        role="region"
        aria-label="Booking"
        className="w-full rounded-2xl overflow-hidden ring-1 ring-[color:var(--color-hairline)]"
        style={{ minHeight: 560 }}
      >
        {/* Error boundary would ideally wrap here; kept minimal for v1. */}
        <EmbedComp calLink={calLink} style={{ width: "100%", height: 560 }} />
      </div>
    );
  }

  if (status === "fallback") {
    return (
      <div
        role="region"
        aria-label="Booking fallback"
        className="rounded-2xl p-6 ring-1 ring-[color:var(--color-hairline)] bg-[color:var(--color-elevated)] flex flex-col gap-3"
      >
        <p className="font-semibold">
          Booking widget didn&apos;t load.
        </p>
        <p style={{ color: "var(--color-text-secondary)" }}>
          No problem. Email us at{" "}
          <a
            href={`mailto:${fallbackEmail}`}
            className="underline underline-offset-4 hover:text-[color:var(--color-accent-primary)] transition-colors"
          >
            {fallbackEmail}
          </a>
          {calLink ? (
            <>
              {" "}or visit{" "}
              <a
                href={`https://cal.com/${calLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-[color:var(--color-accent-primary)] transition-colors"
              >
                cal.com/{calLink}
              </a>
              {" "}directly.
            </>
          ) : (
            " and we'll get back the same day."
          )}
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={openEmbed}
      disabled={status === "loading"}
      className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-[1.02] active:scale-[0.99] disabled:opacity-60"
      style={{
        background: "var(--color-accent-primary)",
        color: "var(--color-base)",
      }}
    >
      {status === "loading" ? "Opening…" : "Book a call"}
    </button>
  );
}
