import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
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
      <AppHeader
        title={title}
        className="[&_.title]:multi-['text-2xl;font-semibold']"
      />
      <MDX source={source} />
    </AppShell>
  );
}
