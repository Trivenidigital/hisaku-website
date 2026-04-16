import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { z } from "zod";
import { loadContent, SLUG_REGEX } from "./load";

/**
 * These tests exercise the loader against a temp content dir so we don't
 * mutate the real `content/` directory. Each test creates its own fixture
 * tree and cleans up in afterEach.
 */

let fixtureRoot: string;

beforeEach(() => {
  fixtureRoot = mkdtempSync(join(tmpdir(), "hisaku-content-"));
});

afterEach(() => {
  rmSync(fixtureRoot, { recursive: true, force: true });
});

const schema = z.object({
  title: z.string(),
  slug: z.string(),
  hero: z.object({ src: z.string(), alt: z.string() }).optional(),
});

function writeMdx(relativeDir: string, filename: string, body: string) {
  const dir = join(fixtureRoot, relativeDir);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, filename), body);
}

function writeAsset(relativePath: string) {
  const abs = join(fixtureRoot, "public", relativePath);
  mkdirSync(join(abs, ".."), { recursive: true });
  writeFileSync(abs, "placeholder");
}

describe("SLUG_REGEX", () => {
  it("accepts lowercase letter start + alphanumeric/hyphen", () => {
    expect(SLUG_REGEX.test("valid-slug")).toBe(true);
    expect(SLUG_REGEX.test("a")).toBe(true);
    expect(SLUG_REGEX.test("a1-b2-c3")).toBe(true);
  });

  it("rejects invalid CSS ident shapes", () => {
    expect(SLUG_REGEX.test("1leading-digit")).toBe(false);
    expect(SLUG_REGEX.test("-leading-hyphen")).toBe(false);
    expect(SLUG_REGEX.test("UPPERCASE")).toBe(false);
    expect(SLUG_REGEX.test("has_underscore")).toBe(false);
    expect(SLUG_REGEX.test("has space")).toBe(false);
    expect(SLUG_REGEX.test("")).toBe(false);
  });
});

describe("loadContent — happy path", () => {
  it("returns typed array from valid MDX files", () => {
    writeMdx(
      "content/case-studies",
      "a.mdx",
      `---
title: "Project A"
slug: "project-a"
---
body`
    );
    writeMdx(
      "content/case-studies",
      "b.mdx",
      `---
title: "Project B"
slug: "project-b"
---
body`
    );

    const result = loadContent("content/case-studies", schema, {
      slugField: "slug",
      projectRoot: fixtureRoot,
    });

    expect(result).toHaveLength(2);
    expect(
      result.map((r) => (r.frontmatter as { slug: string }).slug).sort()
    ).toEqual(["project-a", "project-b"]);
  });

  it("returns empty array when content dir does not exist (launch-day scenario)", () => {
    const result = loadContent("content/case-studies", schema, {
      slugField: "slug",
      projectRoot: fixtureRoot,
    });
    expect(result).toEqual([]);
  });
});

describe("loadContent — frontmatter validation", () => {
  it("throws with file + field when schema fails", () => {
    writeMdx(
      "content/case-studies",
      "bad.mdx",
      `---
title: 42
slug: "project"
---
`
    );

    expect(() =>
      loadContent("content/case-studies", schema, {
        slugField: "slug",
        projectRoot: fixtureRoot,
      })
    ).toThrow(/bad\.mdx/);
  });

  it("error message includes the failing field path", () => {
    writeMdx(
      "content/case-studies",
      "missing-title.mdx",
      `---
slug: "project"
---
`
    );

    expect(() =>
      loadContent("content/case-studies", schema, {
        slugField: "slug",
        projectRoot: fixtureRoot,
      })
    ).toThrow(/title/);
  });
});

describe("loadContent — slug validation", () => {
  it("rejects invalid slug format", () => {
    writeMdx(
      "content/case-studies",
      "bad.mdx",
      `---
title: "Project"
slug: "Invalid_Slug"
---
`
    );

    expect(() =>
      loadContent("content/case-studies", schema, {
        slugField: "slug",
        projectRoot: fixtureRoot,
      })
    ).toThrow(/slug.*Invalid_Slug/);
  });

  it("rejects leading-digit slugs (view-transition-name would fail)", () => {
    writeMdx(
      "content/case-studies",
      "bad.mdx",
      `---
title: "Project"
slug: "1-oops"
---
`
    );

    expect(() =>
      loadContent("content/case-studies", schema, {
        slugField: "slug",
        projectRoot: fixtureRoot,
      })
    ).toThrow(/slug/);
  });

  it("detects slug collisions across files", () => {
    writeMdx(
      "content/case-studies",
      "one.mdx",
      `---
title: "One"
slug: "duplicate"
---
`
    );
    writeMdx(
      "content/case-studies",
      "two.mdx",
      `---
title: "Two"
slug: "duplicate"
---
`
    );

    expect(() =>
      loadContent("content/case-studies", schema, {
        slugField: "slug",
        projectRoot: fixtureRoot,
      })
    ).toThrow(/slug collision.*duplicate/);
  });
});

describe("loadContent — hero image existence", () => {
  it("throws when hero.src does not exist on disk", () => {
    writeMdx(
      "content/case-studies",
      "missing-hero.mdx",
      `---
title: "Project"
slug: "project"
hero:
  src: "/nonexistent/path.png"
  alt: "alt"
---
`
    );

    expect(() =>
      loadContent("content/case-studies", schema, {
        slugField: "slug",
        heroImagePathField: "hero.src",
        projectRoot: fixtureRoot,
      })
    ).toThrow(/nonexistent\/path\.png/);
  });

  it("passes when hero.src resolves to an existing file under public/", () => {
    writeAsset("work/project/hero.png");
    writeMdx(
      "content/case-studies",
      "good.mdx",
      `---
title: "Project"
slug: "project"
hero:
  src: "/work/project/hero.png"
  alt: "alt"
---
`
    );

    const result = loadContent("content/case-studies", schema, {
      slugField: "slug",
      heroImagePathField: "hero.src",
      projectRoot: fixtureRoot,
    });

    expect(result).toHaveLength(1);
  });
});
