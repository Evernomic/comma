import { getUser } from "@/lib/fetchers/users";
import type { Metadata } from "next";
import EditHomePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Customize home",
};

export default async function EditHomePage() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return <EditHomePageClient content={user.customHomePageContent} />;
}
