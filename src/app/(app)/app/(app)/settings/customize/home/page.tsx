import { getUser } from "@/lib/fetchers/users";
import EditHomePageClient from "./page-client";
import type { Metadata } from "next";

export const metadata:Metadata = {
  title: "Customize home page"
}

export default async function EditHomePage() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return <EditHomePageClient content={user.customHomePageContent} />;
}
