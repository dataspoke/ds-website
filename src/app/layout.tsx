import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SiteChrome } from "@/components/lp/site-chrome";
import { JsonLd } from "@/components/shared/json-ld";
import { defaultMetadata } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
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
        <JsonLd />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
