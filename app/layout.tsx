import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "ainew.ca";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = `${origin}/og.png`;
  return {
    metadataBase: new URL(origin),
    title: { default: "AI New Canada", template: "%s" },
    description: "The signal in artificial intelligence: Canadian AI news, global model releases, policy, products and research without the hype.",
    keywords: ["AI news", "artificial intelligence", "Canada AI", "AI models", "AI policy", "AI New Canada"],
    openGraph: {
      type: "website",
      siteName: "AI New Canada",
      title: "AI New Canada — The signal in artificial intelligence",
      description: "Canadian AI news, global model releases and practical analysis without the hype.",
      images: [{ url: socialImage, width: 1200, height: 630, alt: "AI New Canada — The signal in artificial intelligence" }],
    },
    twitter: { card: "summary_large_image", title: "AI New Canada", description: "The signal in artificial intelligence.", images: [socialImage] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <body>{children}</body>
    </html>
  );
}
