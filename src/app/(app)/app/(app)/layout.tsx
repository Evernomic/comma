import AppCommand from "@/components/layout/app-command";
import AppNav from "@/components/layout/app-nav";
import ThemeProvider from "@/components/providers/theme-provider";
import Onboarding from "@/components/shared/onboarding";
import { appConfig } from "@/config/app";
import { getUser } from "@/lib/fetchers/users";
import { generateSEO } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = generateSEO({
  template: "Comma",
  noIndex: true,
});

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    return notFound();
  }
  if (!user.name || !user.category || !user.location) {
    return <Onboarding user={user} />;
  }
  return (
    <div className="mx-auto flex min-h-screen w-[700px] flex-col  max-md:px-4  pb-10 max-md:w-full">
      <ThemeProvider>
        <header className="w-full py-4">
          <AppNav links={appConfig.mainNav} user={user} />
        </header>
        <main className="w-full">{children}</main>
        <AppCommand user={user} />
      </ThemeProvider>
    </div>
  );
}
