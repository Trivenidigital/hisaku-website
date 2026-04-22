import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";

// Inter Variable — Linear's typographic signature. cv01 + ss03
// feature flags applied globally in globals.css.
const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://hisaku.com"
  ),
  title: {
    default: "Hisaku — We build digital experiences that move.",
    template: "%s · Hisaku",
  },
  description:
    "A Hyderabad studio building websites, marketing systems, and AI automation for businesses that want to grow.",
  openGraph: {
    type: "website",
    siteName: "Hisaku",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-dvh flex flex-col">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
