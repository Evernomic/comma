import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";

import type { Metadata } from "next";
import Stats from "./components/dashboard/stats";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  return (
    <AppShell>
      <AppHeader title="Dashboard" />
      <div>
        <Stats />
      </div>
    </AppShell>
  );
}
