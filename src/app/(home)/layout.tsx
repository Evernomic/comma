import ThemeToggle from "@/components/layout/theme-toggle";
import ThemeProvider from "@/components/providers/theme-provider";
import { generateSEO } from "@/lib/utils";
import { NuqsAdapter } from "nuqs/adapters/next";
import Footer from "./components/footer";
export const metadata = generateSEO({
  template: "Comma",
});

export default async function MarketingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-[700px] pt-4 max-md:px-8 max-md:w-full font-(family-name:--font-ubuntu)!">
      <ThemeProvider>
        <main className="pb-10">
          <NuqsAdapter>{children}</NuqsAdapter>
        </main>
        <ThemeToggle
          compact
          iconSize={20}
          className="fixed right-5 top-5 size-5"
        />
        <Footer />
      </ThemeProvider>
    </div>
  );
}
