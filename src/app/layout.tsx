import { Ubuntu } from "next/font/google";
import "@/styles/globals.css";
import ThemeProvider from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { generateSEO } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = generateSEO();

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
    </html>
  );
}
