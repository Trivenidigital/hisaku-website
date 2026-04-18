import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";

/**
 * Renders a case study's MDX body as a React tree.
 *
 * Case study bodies use `## Challenge`, `## Approach`, `## Outcome`
 * headings as the editorial spine. The component map below styles those
 * as display-face section headings and normalizes paragraph typography.
 */

const components: ComponentProps<typeof MDXRemote>["components"] = {
  h2: (props) => (
    <h2
      className="text-3xl md:text-4xl font-bold tracking-tight mt-12 mb-6"
      style={{ fontFamily: "var(--font-display)" }}
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-2xl md:text-3xl font-bold tracking-tight mt-10 mb-4"
      style={{ fontFamily: "var(--font-display)" }}
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="text-base md:text-lg leading-relaxed my-5 max-w-2xl"
      style={{ color: "var(--color-text-secondary)" }}
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="underline underline-offset-4 hover:text-[color:var(--color-accent-primary)] transition-colors"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="list-disc pl-6 my-5 space-y-2" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-6 my-5 space-y-2" {...props} />
  ),
  li: (props) => (
    <li
      className="text-base md:text-lg leading-relaxed"
      style={{ color: "var(--color-text-secondary)" }}
      {...props}
    />
  ),
};

export function CaseStudyNarrative({ source }: { source: string }) {
  return (
    <div className="max-w-3xl">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
