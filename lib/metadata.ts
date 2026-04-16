import type { Metadata } from "next";

interface BuildMetadataInput {
  title: string;
  description: string;
  /** Path segment, e.g. "/work/fintech-dashboard". Resolved against metadataBase. */
  canonicalPath: string;
}

/**
 * Shared metadata builder. Use from any `generateMetadata` or metadata export
 * to prevent divergence across pages. One change here, every page updates.
 *
 * OG images: Next.js file convention (`opengraph-image.tsx` co-located with
 * the route) handles images automatically. Pages don't need to specify images
 * here — Next.js picks up the nearest opengraph-image.tsx in the segment tree.
 */
export function buildMetadata({
  title,
  description,
  canonicalPath,
}: BuildMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url: canonicalPath,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
