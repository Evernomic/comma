import MDX from "@/components/markdown/mdx";
import { formatDate } from "@/lib/utils";
import type { Changelog } from "@prisma/client";

export default function Log({ log }: { log: Changelog }) {
  return (
    <article className="w-full flex max-md:flex-col max-md:gap-10 border-b border-gray-2 py-16  last:border-0">
      <div className="w-1/4 max-md:w-full font-medium text-gray-4">
        {formatDate(log.publishedAt)}
      </div>
      <div className="flex-1 space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">{log.title}</h2>
        </div>
        <MDX source={log.content} />
      </div>
    </article>
  );
}
