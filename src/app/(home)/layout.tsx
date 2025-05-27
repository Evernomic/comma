import ThemeProvider from "@/components/providers/theme-provider";
import { generateSEO } from "@/lib/utils";
import { NuqsAdapter } from "nuqs/adapters/next";
import Footer from "./components/footer";
import Header from "./components/header";
export const metadata = generateSEO({
  template: "Comma",
});

export default async function MarketingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen flex flex-col  w-[1000px] pt-4 max-base:px-8 max-base:w-full">
      <ThemeProvider>
        <NuqsAdapter>
          <Header />
          <main className="py-10 flex flex-col flex-1">{children}</main>
          <Footer />
        </NuqsAdapter>
      </ThemeProvider>
    </div>
  );
}
