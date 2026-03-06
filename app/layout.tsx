import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import enMessages from "@/messages/en.json";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading"
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono"
});

const metadataMessages = enMessages.Metadata;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  manifest: "/manifest.webmanifest",
  title: {
    default: metadataMessages.siteTitle,
    template: "%s | Danilo Gomes"
  },
  description: metadataMessages.siteDescription,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ title: "Blog RSS feed", url: "/feed.xml" }]
    }
  },
  category: "technology",
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: metadataMessages.siteTitle,
    description: metadataMessages.siteDescription,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/og-default.svg",
        width: 1200,
        height: 630,
        alt: "Danilo Gomes portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: metadataMessages.siteTitle,
    description: metadataMessages.siteDescription,
    images: ["/images/og-default.svg"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${headingFont.variable} ${monoFont.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: siteConfig.name,
              url: siteConfig.url,
              email: siteConfig.email,
              sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.spotify],
              jobTitle: "Software Engineer"
            })
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
