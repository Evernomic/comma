import AppShell from "@/components/layout/app-shell";
import { getArticlesByAuthor } from "@/lib/fetchers/articles";
import { getBookmarksByAuthor } from "@/lib/fetchers/bookmarks";
import { getProjectsByAuthor } from "@/lib/fetchers/projects";
import { getAllUserDomains, getUserByDomain } from "@/lib/fetchers/users";
import { notFound } from "next/navigation";
import About from "./components/about";
import Articles from "./components/articles";
import Bookmarks from "./components/bookmarks";
import Connect from "./components/connect";
import Intro from "./components/intro";
import { NothingPlaceholder } from "./components/nothing-placeholder";
import Projects from "./components/projects";
import Newsletter from "./articles/components/newsletter";

export const revalidate = 60;

interface PageProps {
  params: Promise<{
    domain: string;
  }>;
}

export async function generateStaticParams() {
  const allDomains = await getAllUserDomains();

  const domains = allDomains
    .flatMap(({ username, domain }) => [
      domain
        ? {
            domain,
          }
        : {
            domain: username,
          },
    ])
    .filter(Boolean);

  return domains;
}

export default async function Home({ params }: PageProps) {
  const domain = decodeURIComponent((await params).domain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }
  const [articles, projects, bookmarks] = await Promise.all([
    getArticlesByAuthor(user.id, 5),
    getProjectsByAuthor(user.id, 5),
    getBookmarksByAuthor(user.id, 5),
  ]);
  return (
    <AppShell>
      <Intro user={user} />
      {!user?.about?.trim().length && !articles.length && !projects.length && (
        <NothingPlaceholder name={user.name || user.username} />
      )}
      <div className="flex flex-col gap-6">
        <About content={user.about as string} />
        {user.newsletter && <Newsletter user={user} />}
        <Articles articles={articles} />
        <Projects projects={projects} />
        <Bookmarks bookmarks={bookmarks} />
        <Connect user={user} />
      </div>
    </AppShell>
  );
}
