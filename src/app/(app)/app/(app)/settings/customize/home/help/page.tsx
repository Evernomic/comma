import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import NavButton from "@/components/layout/nav-button";
import MDX from "@/components/markdown/mdx";
import { readMarkdownFile } from "@/lib/md";
import { Metadata } from "next";



export const metadata:Metadata = {
    title: "Help"
}

export default function TOS() {
  const source = readMarkdownFile("docs/help/customize-home-page.md");
  return (
    <AppShell>
      <AppHeader className="flex-row-reverse justify-end gap-2">
        <NavButton
          href="/settings/customize/home"
          icon="arrowLeft"
          size="sm"
          direction="ltr"
          aria-label="Back to customize"
        >
            Back to editor
        </NavButton>
      </AppHeader>
      <MDX source={source} />
    </AppShell>
  );
}