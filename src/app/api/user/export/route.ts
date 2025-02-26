import { guard } from "@/lib/auth";
import { getArticlesExport } from "@/lib/fetchers/articles";
import { getBookmarksExport } from "@/lib/fetchers/bookmarks";
import { getProjectsExport } from "@/lib/fetchers/projects";
import { getSubscibersExport } from "@/lib/fetchers/subscribers";
import JSZip from "jszip";

export const GET = guard(async ({ user }) => {
  try {
    const [articles, projects, ...rest] = await Promise.all([
      getArticlesExport(user.id),
      getProjectsExport(user.id),
      getBookmarksExport(user.id),
      getSubscibersExport(user.id),
    ]);

    const zip = new JSZip();

    const [articlesFolder, projectsFolder] = [
      zip.folder("articles"),
      zip.folder("projects"),
    ];
    articles.map((article) =>
      articlesFolder?.file(article.filename, article.content),
    );
    projects.map((project) =>
      projectsFolder?.file(project.filename, project.content),
    );

    rest.map((item) => zip.file(item.filename, item.content));

    const buffer = await zip.generateAsync({ type: "nodebuffer" });

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=comma_export.zip",
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return new Response(JSON.stringify(err.message), { status: 500 });
    }

    return new Response(JSON.stringify(err), { status: 500 });
  }
});
