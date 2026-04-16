import { ImageResponse } from "next/og";
import { OgLayout, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/layout";

// Route-level metadata Next.js picks up for the file convention.
export const alt = "Hisaku — The work is the pitch.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * Default OG image for the root + any page that doesn't override.
 * Statically optimized at build time by Next.js 16 default.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <OgLayout
        title="The work is the pitch."
        subtitle="Design, development, and AI marketing for startups and growing companies."
      />
    ),
    { ...size }
  );
}
