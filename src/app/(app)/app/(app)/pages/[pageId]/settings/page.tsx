import DeleteForm from "@/components/forms/delete-form";
import ExportButton from "@/components/forms/export-button";
import Form from "@/components/forms/form";
import UploadImage from "@/components/forms/upload-image";
import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import NavButton from "@/components/layout/nav-button";
import { pageVisibilityOptions } from "@/lib/constants";
import { getPageById } from "@/lib/fetchers/pages";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageSettingsProps {
  params: Promise<{
    pageId: string;
  }>;
}
export const metadata: Metadata = {
  title: "Settings",
};

export default async function PageSettings({ params }: PageSettingsProps) {
  const page = await getPageById((await params).pageId);

  if (!page) {
    return notFound();
  }
  const endpoint = `pages/${page.id}`;
  return (
    <AppShell>
      <AppHeader asChild className="justify-start text-lg font-medium">
        <NavButton
          href={`/${endpoint}`}
          icon="arrowLeft"
          className="mr-2"
          size="icon"
          aria-label="Back to Page"
        />
        Page settings
      </AppHeader>
      <div className="flex flex-col gap-2">
        <Form
          title="Page slug"
          description="This is the URL slug for this page."
          endpoint={endpoint}
          inputData={{
            name: "slug",
            placeholder: "my-page",
            defaultValue: page.slug,
          }}
        />
        <Form
          endpoint={endpoint}
          title="Page visibility"
          description="Change the visibility of this page."
          selectOptions={pageVisibilityOptions}
          inputData={{
            placeholder: "Select visibility",
            name: "visibility",
            defaultValue: page.visibility ?? undefined,
          }}
          required
        />
        <Form
          title="SEO title"
          description="This title will be used for SEO. It's best to keep it between 50-60 characters."
          helpText="Please use 60 characters at maximum."
          endpoint={endpoint}
          method="PATCH"
          inputData={{
            name: "seoTitle",
            placeholder: "My new page",
            defaultValue: page.seoTitle || "",
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
            placeholder: "My new page",
            defaultValue: page.seoDescription || "",
            maxLength: 160,
          }}
          required={false}
        />
        <UploadImage
          title="Open graph image"
          description="Open graph image for this page. It's best to keep it around 1200x630."
          helpText="Up to 4MB"
          endpoint={endpoint}
          defaultValue={page.ogImage}
          name="ogImage"
          folder="og-images"
        />
        <Form
          title="Password protection"
          description="This is password for your page."
          endpoint={endpoint}
          required={false}
          inputData={{
            type: "password",
            name: "password",
            placeholder: "password",
            defaultValue: page.password || "",
          }}
        />
        <Form title="Export" endpoint={`${endpoint}/export`} asChild>
          <ExportButton
            text="Export page"
            icon="download"
            endpoint={`${endpoint}/export`}
          />
        </Form>
        <DeleteForm
          title="Delete page"
          description="Enter your page slug"
          keyword={page.slug}
          endpoint={`/${endpoint}`}
          redirectPath="/pages"
        />
      </div>
    </AppShell>
  );
}
