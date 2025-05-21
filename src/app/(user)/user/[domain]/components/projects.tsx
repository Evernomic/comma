import Project from "@/components/projects/project";
import { Icons } from "@/components/shared/icons";
import { cn } from "@/lib/utils";
import type { Project as ProjectPrisma } from "@prisma/client";
import Link from "next/link";

type ProjectType = Omit<ProjectPrisma, "password"> & { isProtected: boolean };

export default function Projects({
  title,
  projects,
}: {
  title: string;
  projects: ProjectType[];
}) {
  if (!projects.length) {
    return null;
  }
  const hasMore = projects.length > 5;

  return (
    <dl className="section-container not-prose">
      <dt className={cn("section-title group", hasMore && "link")}>
        {hasMore ? (
          <Link
            href="/projects"
            className="absolute w-full h-full "
            aria-label="View All Projects"
          />
        ) : null}
        <h3>{title}</h3>
        <Icons.arrowRight
          size={16}
          className={cn(
            "text-gray-4 group-hover:text-secondary hidden",
            hasMore && "block",
          )}
        />
      </dt>
      <dd className="section-content">
        {projects
          .slice(0, 5)
          .sort((a, b) => Number(b.isPinned) - Number(a.isPinned))
          .map((project) => (
            <Project project={project} key={project.id} />
          ))}
      </dd>
    </dl>
  );
}
