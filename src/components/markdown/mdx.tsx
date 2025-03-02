import { cn } from "@/lib/utils";
import "@/styles/prose.css";
import "katex/dist/katex.min.css"
import type {
  MDXComponents,
  MDXRemoteOptions,
} from "next-mdx-remote-client/rsc";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const mdxRemoteOptions: MDXRemoteOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex]
  },
};

const mdxComponents: MDXComponents = {
  img: async (props) => {
    return (
      <Image
        src={props.src!}
        alt={props.alt!}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto"
        quality={80}
        priority
        unoptimized
      />
    );
  },
  a: (props) => {
    return (
      <a target="_blank" {...props}>
        {props.children}
      </a>
    );
  },
};

const ErrorComponent = ({ error }: { error: Error }) => {
  return <MDX source={error.message} />;
};

export default async function MDX({
  source,
  className,
}: {
  source: any;
  className?: string;
}) {
  return (
    <div className={cn("prose dark:prose-invert", className)}>
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={mdxRemoteOptions}
        onError={ErrorComponent}
      />
    </div>
  );
}
