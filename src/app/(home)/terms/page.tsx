import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import NavButton from "@/components/layout/nav-button";
import MDX from "@/components/markdown/mdx";
import { readMarkdownFile } from "@/lib/md";
import { generateSEO } from "@/lib/utils";

const title = "Terms of Service";

export const metadata = generateSEO({
  title,
});

export default function TOS() {
  const source = readMarkdownFile("docs/legal/terms.md");
  return (
    <AppShell>
      <AppHeader title={title} className="flex-row-reverse justify-end gap-2">
        <NavButton
          href="/home"
          icon="arrowLeft"
          size="icon"
          aria-label="Back to home"
        />
      </AppHeader>
      <MDX source={source} />
    </AppShell>
  );
}
