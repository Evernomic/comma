import ThemeProvider from "@/components/providers/theme-provider";
import { isAdmin } from "@/lib/actions/admin";
import { generateSEO } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next";
import React from "react";
import Navigation from "./components/layout/navigation";

export const metadata: Metadata = generateSEO({
  template: "Comma Admin",
  noIndex: true,
});

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const admin = await isAdmin();
  if (!admin) {
    return notFound();
  }

  return (
    <div className="mx-auto relative flex min-h-screen w-[1000px] flex-col max-base:w-full max-base:px-4 pt-10 py-40">
      <ThemeProvider>
        <div className="flex flex-col flex-1">
          <NuqsAdapter>
            <div className="flex-1">{children}</div>
            <Navigation />
          </NuqsAdapter>
        </div>
      </ThemeProvider>
    </div>
  );
}
