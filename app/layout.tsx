import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";

// Display face: Syne (Google Fonts, free).
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Body face: DM Sans. Swapped from Inter during the homepage redesign
// to match the terminal-industries-inspired visual direction.
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Root metadata. Per-route pages override title + description via their own exports.
// Keeping canonical URL resolution via metadataBase so `openGraph.images` paths stay relative-safe.
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://hisaku.com"
  ),
  title: {
    default: "Hisaku — We Build What Moves.",
    template: "%s · Hisaku",
  },
  description:
    "Design, development, and AI marketing for startups and growing companies. We don't sell slides. We show you what we've built, and you decide.",
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
      className={`${syne.variable} ${dmSans.variable}`}
      // color-scheme: dark set in CSS so first paint is branded, never white.
    >
      <body className="min-h-dvh flex flex-col">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
