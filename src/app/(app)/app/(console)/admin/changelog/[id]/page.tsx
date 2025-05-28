import EditorPage from "@/components/editor/page";
import EditorSkeleton from "@/components/editor/skeleton";
import AppShell from "@/components/layout/app-shell";
import { getLogById } from "@/lib/fetchers/admin";
import { getUser } from "@/lib/fetchers/users";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface EditorPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EditorPageProps) {
  const log = await getLogById((await params).id);

  if (!log) {
    return notFound();
  }

  return {
    title: log.title,
  };
}

export default async function LogEditorPage({ params }: EditorPageProps) {
  const [user, log] = await Promise.all([
    getUser(),
    getLogById((await params).id),
  ]);
  if (!log || !user) {
    return notFound();
  }

  return (
    <AppShell>
      <Suspense fallback={<EditorSkeleton />}>
        <EditorPage type="admin/changelog" post={log} user={user} />
      </Suspense>
    </AppShell>
  );
}
