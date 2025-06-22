import { getUser } from "@/lib/fetchers/users";
import type { Metadata } from "next";
import EditAboutClient from "./page-client";

export const metadata: Metadata = {
  title: "Edit about",
};

export default async function EditHomePage() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return <EditAboutClient content={user.about} />;
}
