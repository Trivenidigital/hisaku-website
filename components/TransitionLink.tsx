"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent, ReactElement } from "react";
import { useRef } from "react";

/* ============================================================================
 * TransitionLink — the tile-to-case-study morph.
 *
 * On click:
 *   1. Finds an <img data-morph-origin> inside the link's subtree.
 *   2. Sets element.style.viewTransitionName = transitionName on it.
 *      Dynamic attach prevents duplicate-name conflicts when multiple
 *      tiles render on the same page.
 *   3. Calls document.startViewTransition(() => router.push(href))
 *      if the API is available; falls back to standard navigation.
 *   4. After the transition finishes (or fails), clears the inline style.
 *
 * The destination page has view-transition-name set statically on the hero
 * image. Browser matches old + new elements with the same name and animates.
 * ============================================================================ */

type ViewTransitionDocument = Document & {
  startViewTransition?: (cb: () => void) => {
    finished: Promise<void>;
    ready: Promise<void>;
  };
};

export interface TransitionLinkProps
  extends Omit<ComponentProps<typeof Link>, "href"> {
  href: string;
  /** view-transition-name to apply to the first [data-morph-origin] img inside. */
  transitionName?: string;
  children: React.ReactNode;
}

export function TransitionLink({
  href,
  transitionName,
  children,
  onClick,
  ...rest
}: TransitionLinkProps): ReactElement {
  const router = useRouter();
  const anchorRef = useRef<HTMLAnchorElement>(null);

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;

    // Only intercept modifier-free left clicks to same-origin paths.
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    ) {
      return;
    }

    const doc = document as ViewTransitionDocument;
    if (!doc.startViewTransition || !transitionName) {
      // No API support, or no name to apply — use default client-side nav.
      return;
    }

    e.preventDefault();

    const originEl = anchorRef.current?.querySelector<HTMLElement>(
      "[data-morph-origin]"
    );
    if (originEl) {
      originEl.style.viewTransitionName = transitionName;
    }

    const transition = doc.startViewTransition(() => {
      router.push(href);
    });

    // Clear the inline style once the transition completes (success or fail).
    // Leaving view-transition-name on the element after navigation would
    // participate in the next transition unexpectedly.
    const cleanup = () => {
      if (originEl) originEl.style.viewTransitionName = "";
    };
    transition.finished.then(cleanup, cleanup);
  }

  return (
    <Link href={href} onClick={handleClick} ref={anchorRef} {...rest}>
      {children}
    </Link>
  );
}
