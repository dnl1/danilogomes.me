import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");

  return {
    metadataBase: new URL(siteConfig.url),
    manifest: "/manifest.webmanifest",
    title: {
      default: t("siteTitle"),
      template: "%s | Danilo Gomes"
    },
    description: t("siteDescription"),
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
      title: t("siteTitle"),
      description: t("siteDescription"),
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
      title: t("siteTitle"),
      description: t("siteDescription"),
      images: ["/images/og-default.svg"]
    }
  };
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations("Layout");

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body className={`${headingFont.variable} ${monoFont.variable} font-sans antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{const t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light');document.documentElement.classList.remove('dark')}}catch(e){}"
          }}
        />
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
        <NextIntlClientProvider messages={messages}>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand focus:px-3 focus:py-2 focus:text-black"
          >
            {t("skipToContent")}
          </a>
          <Navbar />
          <main id="content">{children}</main>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
