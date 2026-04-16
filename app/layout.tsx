import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

// Display face: Syne (variable, Google Fonts, free for commercial use).
// Chosen for distinctive character vs the over-exposed Satoshi/Inter-Display stack.
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Body face: Inter Variable.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Root metadata. Per-route pages override title + description via their own exports.
// Keeping canonical URL resolution via metadataBase so `openGraph.images` paths stay relative-safe.
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://hisaku.com"
  ),
  title: {
    default: "Hisaku — The work is the pitch.",
    template: "%s · Hisaku",
  },
  description:
    "Design, development, and AI marketing for startups and growing companies.",
  openGraph: {
    type: "website",
    siteName: "Hisaku",
    locale: "en_US",
    // Images are picked up automatically from app/opengraph-image.tsx
    // (Next.js file convention). Per-page routes can override via their own
    // opengraph-image.tsx file or via generateMetadata's openGraph.images.
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable}`}
      // color-scheme: dark set in CSS so first paint is branded, never white.
    >
      <body className="min-h-dvh flex flex-col">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
