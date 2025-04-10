import EditorPage from "@/components/editor/page";
import EditorSkeleton from "@/components/editor/skeleton";
import AppShell from "@/components/layout/app-shell";
import { getPageById } from "@/lib/fetchers/pages";
import { getUser } from "@/lib/fetchers/users";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageEditorPageProps {
  params: Promise<{ pageId: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: PageEditorPageProps["params"];
}) {
  const page = await getPageById((await params).pageId);

  if (!page) {
    return notFound();
  }

  return {
    title: page.title,
  };
}

export default async function PageEditorPage({ params }: PageEditorPageProps) {
  const [user, page] = await Promise.all([
    getUser(),
    getPageById((await params).pageId),
  ]);

  if (!page || !user) {
    return notFound();
  }

  return (
    <AppShell>
      <Suspense fallback={<EditorSkeleton />}>
        <EditorPage type="pages" post={page} user={user} />
      </Suspense>
    </AppShell>
  );
}
