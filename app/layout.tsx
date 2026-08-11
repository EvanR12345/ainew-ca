import type { Metadata } from "next";
import "./globals.css";
import { ScrollToTop } from "./scroll-to-top";

export const metadata: Metadata = {
    metadataBase: new URL("https://ainew.ca"),
    title: { default: "AI New Canada", template: "%s" },
    description: "The signal in artificial intelligence: Canadian AI news, global model releases, policy, products and research without the hype.",
    keywords: ["AI news", "artificial intelligence", "Canada AI", "AI models", "AI policy", "AI New Canada"],
    icons: {
      icon: [{ url: "/icon.png", type: "image/png" }],
      shortcut: "/icon.png",
      apple: [{ url: "/apple-icon.png", type: "image/png" }],
    },
    openGraph: {
      type: "website",
      siteName: "AI New Canada",
      title: "AI New Canada — The signal in artificial intelligence",
      description: "Canadian AI news, global model releases and practical analysis without the hype.",
      images: [{ url: "https://ainew.ca/og.png", width: 1200, height: 630, alt: "AI New Canada — The signal in artificial intelligence" }],
    },
    twitter: { card: "summary_large_image", title: "AI New Canada", description: "The signal in artificial intelligence.", images: ["https://ainew.ca/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <head>
        <link rel="preconnect" href="https://armsbroodelusive.com" />
        <link rel="dns-prefetch" href="//armsbroodelusive.com" />
      </head>
      <body><ScrollToTop />{children}</body>
    </html>
  );
}
