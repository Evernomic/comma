import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import PostsFilter from "@/components/layout/posts-filter";
import NoPagesPlaceholder from "@/components/pages/no-pages-placeholder";
import NewPage from "@/components/pages/page-create-button";
import PageItem from "@/components/pages/page-item";
import { getPages } from "@/lib/fetchers/pages";
import { sortPages } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  searchParams: Promise<{
    published?: "true" | "false";
  }>;
}
export const metadata: Metadata = {
  title: "Pages",
};

export default async function Pages({ searchParams }: Props) {
  const [pages, { published }] = await Promise.all([getPages(), searchParams]);
  const sortedPages = sortPages(pages, published);
  return (
    <AppShell>
      <AppHeader title="Pages">
        <NewPage />
      </AppHeader>
      <PostsFilter segment="pages" current={published} />
      <div>
        {sortedPages.map((page) => (
          <PageItem page={page} key={page.id} admin />
        ))}
        {!sortedPages.length && <NoPagesPlaceholder description />}
      </div>
    </AppShell>
  );
}
