import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import { cn, generateSEO } from "@/lib/utils";
import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";

const inter = localFont({
  src: "../../public/fonts/InterVariable.woff2",
  weight: "400 500 600 700",
  display: "swap",
});

export const metadata = generateSEO();

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#F9F9F9",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#0d0d0d",
    },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="_next-gtm-init" async src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gtmId}`} />
        <Script id="_next-gtm" dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${siteConfig.gtmId}');
          `}} />
      </head>
      <body className={cn("antialiased", inter.className)}>
        {children}
        <Analytics />
        <Toaster />
      </body>
      <GoogleAnalytics gaId="G-TLL6FWBZ83" />
    </html>
  );
}
