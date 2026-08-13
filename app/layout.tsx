import type { Metadata } from "next";
import "./globals.css";
import { ScrollToTop } from "./scroll-to-top";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./lib/seo";
import { SITE_FEATURES } from "./lib/site-features";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: { default: "AI New Canada — Canadian AI News & Practical Guides", template: "%s" },
    description: SITE_DESCRIPTION,
    keywords: ["AI news", "artificial intelligence", "Canada AI", "AI models", "AI policy", "AI New Canada"],
    authors: [{ name: "AI New Desk", url: `${SITE_URL}/authors/ai-new-desk/` }],
    creator: "AI New Desk",
    publisher: SITE_NAME,
    category: "technology",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: { telephone: false },
    icons: {
      icon: [{ url: "/icon.png", type: "image/png" }],
      shortcut: "/icon.png",
      apple: [{ url: "/apple-icon.png", type: "image/png" }],
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: "AI New Canada — The signal in artificial intelligence",
      description: SITE_DESCRIPTION,
      url: `${SITE_URL}/`,
      locale: "en_CA",
      images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: "AI New Canada — The signal in artificial intelligence" }],
    },
    twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESCRIPTION, images: [`${SITE_URL}/og.png`] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <head>
        {SITE_FEATURES.ads && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4610762209559364"
            crossOrigin="anonymous"
          />
        )}
        <link rel="alternate" type="application/rss+xml" title={`${SITE_NAME} RSS feed`} href="/feed.xml" />
        {SITE_FEATURES.ads && <link rel="preconnect" href="https://armsbroodelusive.com" />}
        {SITE_FEATURES.ads && <link rel="dns-prefetch" href="//armsbroodelusive.com" />}
      </head>
      <body><ScrollToTop />{children}</body>
    </html>
  );
}
