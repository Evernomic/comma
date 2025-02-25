import CustomDomain from "@/components/domain";
import DeleteForm from "@/components/forms/delete-form";
import ExportButton from "@/components/forms/export-button";
import Form from "@/components/forms/form";
import UploadAvatar from "@/components/forms/upload-avatar";
import { getUser } from "@/lib/fetchers/users";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function Settings() {
  const user = await getUser();
  const endpoint = "user";
  if (!user) {
    return notFound();
  }
  return (
    <div className="flex flex-col gap-2">
      <Form
        endpoint={endpoint}
        title="Your name"
        description="This name will be displayed publicly on the page."
        helpText="Please use 48 characters at maximum."
        inputData={{
          name: "name",
          placeholder: "Your Name",
          defaultValue: user.name ?? "",
          maxLength: 48,
        }}
      />
      <Form
        endpoint={endpoint}
        suffix=".nucelo.co"
        title="Your username"
        description="This username will be used for the subdomain."
        helpText="Please use 36 characters at maximum."
        inputData={{
          name: "username",
          placeholder: "Your username",
          defaultValue: user.username,
          maxLength: 36,
        }}
      />
      <Form
        endpoint={endpoint}
        title="What do you do?"
        description="This title will be displayed publicly on the page."
        helpText="Please use 32 characters at maximum."
        inputData={{
          name: "title",
          placeholder: "Design Engineer",
          defaultValue: user.title ?? "",
          maxLength: 32,
        }}
        required={false}
      />
      <Form
        title="About"
        type="textarea"
        endpoint={endpoint}
        description="This will be displayed publicy on the page."
        helpText="Markdown is supported"
        textareaData={{
          name: "about",
          placeholder: "About yourself",
          defaultValue: user?.about || "",
          maxLength: 400,
        }}
        required={false}
      />
      <UploadAvatar
        defaultValue={user?.image as string}
        name={user?.name as string}
      />
      <CustomDomain currentDomain={user?.domain || ""} />
      <Form
        endpoint={endpoint}
        title="Your email"
        description="You will log in with this email."
        inputData={{
          name: "email",
          type: "email",
          placeholder: "Your email",
          defaultValue: user.email ?? "",
        }}
      />
      <Form
        title="Password protection"
        description="If you want to protect your site with a password, enter the password."
        endpoint={endpoint}
        required={false}
        inputData={{
          type: "password",
          name: "password",
          placeholder: "password",
          defaultValue: user.password || "",
        }}
      />
      <Form title="Export" endpoint={`${endpoint}/export`} asChild>
        <ExportButton
          text="Export all data"
          icon="download"
          endpoint={`${endpoint}/export`}
        />
      </Form>
      <DeleteForm
        type={endpoint}
        title="Delete account"
        keyword={user.username}
        description="Enter your username"
        endpoint={`/${endpoint}`}
      />
    </div>
  );
}
