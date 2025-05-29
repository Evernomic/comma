import AppCommand from "@/components/layout/app-command";
import AppNav from "@/components/layout/app-nav";
import SubNav from "@/components/layout/sub-nav";
import ThemeProvider from "@/components/providers/theme-provider";
import Onboarding from "@/components/shared/onboarding";
import OnboardingChecklist from "@/components/shared/onboarding-checklist";
import { appConfig } from "@/config/app";
import { getAdminConfig } from "@/lib/fetchers/admin";
import { getUser } from "@/lib/fetchers/users";
import { generateSEO } from "@/lib/utils";
import Announcement from "@/user/components/announcement";
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

  const config = await getAdminConfig();

  return (
    <div className="mx-auto relative flex min-h-screen w-[700px] flex-col  max-md:px-4  pb-20 max-md:w-full">
      <ThemeProvider>
        <header className="w-full py-4">
          <AppNav links={appConfig.mainNav} user={user} />
        </header>
        <main className="w-full space-y-4 mt-1">
          <SubNav links={appConfig.subNav} />
          {config?.announcementText && (
            <Announcement
              text={config.announcementText}
              className="mt-0 mb-4.4"
              hideIcon
              showHideButton
            />
          )}
          <div>{children}</div>
        </main>
        <AppCommand user={user} />
        <OnboardingChecklist user={user} />
      </ThemeProvider>
    </div>
  );
}
