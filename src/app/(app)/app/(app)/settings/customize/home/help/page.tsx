import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import MDX from "@/components/markdown/mdx";
import { readMarkdownFile } from "@/lib/md";
import type { Metadata } from "next";
import BackButton from "./back";

export const metadata: Metadata = {
  title: "Help",
};

export default function HelpPage() {
  const source = readMarkdownFile("docs/help/customize.md");

  return (
    <AppShell>
      <AppHeader className="flex-row-reverse justify-end gap-2">
        <BackButton />
      </AppHeader>
      <MDX source={source} />
    </AppShell>
  );
}
