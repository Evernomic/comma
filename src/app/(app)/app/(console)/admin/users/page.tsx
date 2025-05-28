import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import type { Metadata } from "next";
import Client from "./client";
import QueryProvider from "./query-provider";

export const metadata: Metadata = {
  title: "Users",
};

export default function Users() {
  return (
    <AppShell>
      <AppHeader title="Users" />
      <QueryProvider>
        <Client />
      </QueryProvider>
    </AppShell>
  );
}
