import ThemeProvider from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { generateSEO } from "@/lib/utils";
import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { Viewport } from "next";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={ubuntu.className}>
        <ThemeProvider attribute="class">
          {children}
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-TLL6FWBZ83" />
    </html>
  );
}
