import DeleteForm from "@/components/forms/delete-form";
import ExportButton from "@/components/forms/export-button";
import Form from "@/components/forms/form";
import UploadImage from "@/components/forms/upload-image";
import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import NavButton from "@/components/layout/nav-button";
import { getProjectById } from "@/lib/fetchers/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProjectSettingsProps {
  params: Promise<{
    projectId: string;
  }>;
}
export const metadata: Metadata = {
  title: "Settings",
};

export default async function ProjectSettings({
  params,
}: ProjectSettingsProps) {
  const project = await getProjectById((await params).projectId);

  if (!project) {
    return notFound();
  }
  const endpoint = `projects/${project.id}`;
  return (
    <AppShell>
      <AppHeader asChild className="justify-start text-lg font-medium">
        <NavButton
          href={`/${endpoint}`}
          icon="arrowLeft"
          className="mr-2"
          size="icon"
          aria-label="Back to Project"
        />
        Project settings
      </AppHeader>
      <div className="flex flex-col gap-2">
        <Form
          title="Project slug"
          description="This is the URL slug for this project."
          endpoint={endpoint}
          inputData={{
            name: "slug",
            placeholder: "my-project",
            defaultValue: project.slug,
          }}
        />

        <Form
          type="textarea"
          title="Project description"
          description="This is the description for this project."
          helpText="Please use 60 characters at maximum."
          endpoint={endpoint}
          textareaData={{
            name: "description",
            placeholder: "My new project",
            defaultValue: project.description || "",
            maxLength: 60,
          }}
          required={false}
        />

        <Form
          title="Project year"
          description="This will be the year of the project"
          endpoint={endpoint}
          inputData={{
            type: "number",
            max: new Date().getFullYear() + 20,
            min: 2000,
            name: "year",
            placeholder: "2024",
            defaultValue: project.year || "",
          }}
        />
        <Form
          title="Project URL"
          description="This is the url for this project."
          helpText="Optional"
          endpoint={endpoint}
          inputData={{
            type: "url",
            name: "url",
            placeholder: "https://example.com",
            defaultValue: project.url || "",
          }}
          required={false}
        />
        <UploadImage
          title="Project icon"
          description="This icon will be displayed next to the title"
          helpText="Up to 4MB"
          endpoint={endpoint}
          defaultValue={project.image}
          name="image"
          previewImageSize={64}
          folder="editor-uploads"
        />
        <Form
          title="SEO title"
          description="This title will be used for SEO. It's best to keep it between 50-60 characters."
          helpText="Please use 60 characters at maximum."
          endpoint={endpoint}
          method="PATCH"
          inputData={{
            name: "seoTitle",
            placeholder: "My new project",
            defaultValue: project.seoTitle || "",
            maxLength: 60,
          }}
          required={false}
        />
        <Form
          type="textarea"
          title="SEO description"
          description="This description will be used for SEO. It's best to keep it between 150-160 characters."
          helpText="Please use 160 characters at maximum."
          endpoint={endpoint}
          textareaData={{
            name: "seoDescription",
            placeholder: "My new project",
            defaultValue: project.seoDescription || "",
            maxLength: 160,
          }}
          required={false}
        />
        <UploadImage
          title="Open graph image"
          description="Open graph image for this project. It's best to keep it around 1200x630."
          helpText="Up to 4MB"
          endpoint={endpoint}
          defaultValue={project.ogImage}
          name="ogImage"
          folder="og-images"
        />
        <Form
          title="Password protection"
          description="This is password for your project. "
          endpoint={endpoint}
          required={false}
          inputData={{
            type: "password",
            name: "password",
            placeholder: "password",
            defaultValue: project.password || "",
          }}
        />
        <Form title="Export" endpoint={`${endpoint}/export`} asChild>
          <ExportButton
            text="Export project"
            icon="download"
            endpoint={`${endpoint}/export`}
          />
        </Form>
        <DeleteForm
          title="Delete project"
          description="Enter your project slug"
          keyword={project.slug}
          endpoint={`/${endpoint}`}
          redirectPath="/projects"
        />
      </div>
    </AppShell>
  );
}
