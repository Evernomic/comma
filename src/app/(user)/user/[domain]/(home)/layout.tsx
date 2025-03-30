import { getUserByDomain } from "@/lib/fetchers/users";
import { notFound } from "next/navigation";
import type React from "react";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    domain: string;
  }>;
}

export default async function UserHomePageLayout({
  children,
  params,
}: LayoutProps) {
  const domain = decodeURIComponent((await params).domain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }
  return <div>{children}</div>;
}
