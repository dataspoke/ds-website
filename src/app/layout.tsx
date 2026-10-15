import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SiteChrome } from "@/components/lp/site-chrome";
import { GA_MEASUREMENT_ID } from "@/lib/constants";
import { defaultMetadata } from "@/lib/metadata";
import "./globals.css";

// One variable file per family, preloaded, with a size-adjusted fallback so text
// doesn't jump when the webfont arrives. `swap` keeps text visible while it loads.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jakarta.variable} font-sans antialiased`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}
