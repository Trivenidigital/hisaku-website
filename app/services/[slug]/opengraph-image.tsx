import { ImageResponse } from "next/og";
import { OgLayout, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/layout";
import { getServices, getServiceBySlug, serviceSlugEnum } from "@/lib/content/services";

export const alt = "Hisaku capability";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.frontmatter.slug }));
}

function toServiceSlug(slug: string): (typeof serviceSlugEnum)[number] | null {
  return (serviceSlugEnum as readonly string[]).includes(slug)
    ? (slug as (typeof serviceSlugEnum)[number])
    : null;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const typedSlug = toServiceSlug(slug);
  const service = typedSlug ? getServiceBySlug(typedSlug) : null;
  const title = service?.frontmatter.title ?? "Capability";
  // Use first sentence of description as subtitle, truncated.
  const firstSentence =
    service?.frontmatter.description.split(/\.\s/)[0] ?? "We Build What Moves.";

  return new ImageResponse(
    <OgLayout title={title} subtitle={firstSentence + "."} />,
    { ...size }
  );
}
