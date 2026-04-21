import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";

// Single face for the entire site. Plus Jakarta Sans handles 300-800
// across headlines and body. One font family, multiple weights.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
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
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jakarta.variable}>
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
