import AppShell from "@/components/layout/app-shell";
import MDX from "@/components/markdown/mdx";
import { getArticlesByAuthor } from "@/lib/fetchers/articles";
import { getBookmarksByAuthor } from "@/lib/fetchers/bookmarks";
import { getProjectsByAuthor } from "@/lib/fetchers/projects";
import {
  getAllUserDomains,
  getUserByDomain,
  getWorkExperiencesByUser,
} from "@/lib/fetchers/users";
import { sortUserPageSections } from "@/lib/utils";
import { UserPageSection } from "@/types";
import { notFound } from "next/navigation";
import { NothingPlaceholder } from "./components/nothing-placeholder";
import sections from "./components/sections";

export const revalidate = 5;
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
  const [articles, projects, bookmarks, experiences] = await Promise.all([
    getArticlesByAuthor(user.id, 5),
    getProjectsByAuthor(user.id, 5),
    getBookmarksByAuthor(user.id, 5),
    getWorkExperiencesByUser(user.id),
  ]);

  const allData = { user, articles, projects, bookmarks, experiences };
  return (
    <AppShell>
      {user.showCustomHomePage ? (
        user.customHomePageContent?.length ? (
          <MDX
            source={user.customHomePageContent}
            allData={allData}
            withSections
          />
        ) : (
          <NothingPlaceholder name={user.name || user.username} />
        )
      ) : (
        <>
          {!user?.about?.trim().length &&
            !articles.length &&
            !projects.length &&
            !bookmarks.length &&
            !experiences.length && (
              <NothingPlaceholder name={user.name || user.username} />
            )}
          <div className="flex flex-col gap-16">
            {sortUserPageSections(
              sections,
              user.sections as UserPageSection[],
            ).map((section) => (
              <section.component
                title={section.title}
                user={user}
                articles={articles}
                projects={projects}
                bookmarks={bookmarks}
                experiences={experiences}
                key={`${section.title.toLowerCase()}--${section.position}`}
              />
            ))}
          </div>
        </>
      )}
    </AppShell>
  );
}
