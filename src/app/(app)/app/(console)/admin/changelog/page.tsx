import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import PostsFilter from "@/components/layout/posts-filter";
import { getChangelog } from "@/lib/fetchers/admin";
import { sortChangelog } from "@/lib/utils";
import type { Metadata } from "next";
import Log from "./log";
import NewLog from "./log-create-button";
import NoLogsPlaceholder from "./no-log";

interface Props {
  searchParams: Promise<{
    published?: "true" | "false";
  }>;
}

export const metadata: Metadata = {
  title: "Changelog",
};

export default async function Changelog({ searchParams }: Props) {
  const [logs, { published }] = await Promise.all([
    getChangelog(),
    searchParams,
  ]);

  const sorted = sortChangelog(logs);

  return (
    <AppShell>
      <AppHeader title="Changelog">
        <NewLog />
      </AppHeader>
      <PostsFilter segment="admin/changelog" current={published} />

      <div>
        {sorted.map((log) => (
          <Log log={log} key={log.id} admin />
        ))}
        {!sorted.length && <NoLogsPlaceholder description />}
      </div>
    </AppShell>
  );
}
