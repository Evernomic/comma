import AppShell from "@/components/layout/app-shell";
import NoProjectsPlaceholder from "@/components/projects/no-projects-placeholder";
import Project from "@/components/projects/project";
import { getProjectsByAuthor } from "@/lib/fetchers/projects";
import { getUserByDomain } from "@/lib/fetchers/users";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Projects",
};

interface ProjectPageProps {
  params: Promise<{
    domain: string;
  }>;
}

export default async function ProjectsPage({ params }: ProjectPageProps) {
  const domain = decodeURIComponent((await params).domain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }
  const projects = await getProjectsByAuthor(user.id);
  return (
    <AppShell>
      <div>
        {projects.map((project) => (
          <Project project={project} key={project.id} />
        ))}
        {!projects.length && <NoProjectsPlaceholder />}
      </div>
    </AppShell>
  );
}
