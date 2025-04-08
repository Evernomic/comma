"use client";

import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      disableTransitionOnChange
      defaultTheme="dark"
      attribute="class"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
