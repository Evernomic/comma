import NoLogsPlaceholder from "@/app/(app)/app/(console)/admin/changelog/no-log";
import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import { getChangelog } from "@/lib/fetchers/admin";
import { generateSEO } from "@/lib/utils";
import Log from "./log";

export const metadata = generateSEO({
  title: "Changelog",
});

export default async function ChangelogPage() {
  const logs = await getChangelog({ published: true });
  return (
    <AppShell className="pt-10 gap-10 min-h-screen">
      <AppHeader
        title="Changelog"
        className="[&_.title]:multi-['text-3xl;font-semibold'] [&_.description]:text-base max-md:multi-['flex-col;items-start;gap-5']"
      />

      <div>
        {logs.map((log) => (
          <Log log={log} key={log.id} />
        ))}
        {!logs.length && <NoLogsPlaceholder />}
      </div>
    </AppShell>
  );
}
