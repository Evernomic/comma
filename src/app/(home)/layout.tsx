import ThemeProvider from "@/components/providers/theme-provider";
import { JSONLDFAQ, JSONLDHomePage, JSONLDHowTo } from "@/lib/constants";
import { getJSONLDScript } from "@/lib/json-ld";
import { generateSEO, getJSONLD } from "@/lib/utils";
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
    <div className="mx-auto min-h-screen flex flex-col   pt-4 w-[900px] max-[960px]:multi-['w-full;px-8']">
      <ThemeProvider>
        <NuqsAdapter>
          <Header />
          <main className="py-10 flex flex-col flex-1">{children}</main>
          <Footer />
        </NuqsAdapter>
      </ThemeProvider>
      {getJSONLDScript(
        getJSONLD({
          type: "graph",
          data: {
            "@context": "https://schema.org",
            "@graph": [JSONLDHomePage, JSONLDHowTo, JSONLDFAQ],
          },
        }),
      )}
    </div>
  );
}
