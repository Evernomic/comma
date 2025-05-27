import { userPageConfig } from "@/config/user-page";
import { cn, getSectionTitle } from "@/lib/utils";
import "@/styles/prose.css";
import type {
  BookmarkWithCollection as _Bookmark,
  User,
  UserPageSection,
} from "@/types";
import Newsletter from "@/user/articles/components/newsletter";
import About from "@/user/components/about";
import Articles from "@/user/components/articles";
import Bookmarks from "@/user/components/bookmarks";
import Connect from "@/user/components/connect";
import WorkExperiences from "@/user/components/experience";
import Intro from "@/user/components/intro";
import NavTabs from "@/user/components/nav-tabs";
import Projects from "@/user/components/projects";
import type {
  Article as _Article,
  WorkExperience as _WorkExperience,
  Project,
} from "@prisma/client";
import "katex/dist/katex.min.css";
import type { MDXComponents } from "next-mdx-remote-client/rsc";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import Image from "next/image";
import Link from "next/link";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import sectionParser from "./section-parser";

type _Project = Omit<Project, "password"> & { isProtected: boolean };

const mdxComponents: MDXComponents = {
  img: async (props) => {
    const src = new URL(props.src);

    const isInline = src.searchParams.get("inline") === "true";
    const [width, height] = [
      src.searchParams.get("width"),
      src.searchParams.get("height"),
    ];

    return (
      <Image
        src={props.src!}
        alt={props.alt!}
        width={width ?? 0}
        height={height ?? 0}
        sizes="100vw"
        className={cn(
          isInline && "size-[22px]! m-1! mb-1.5! inline-block border-0!",
          !width && !height && "size-auto",
        )}
        quality={80}
        priority
        unoptimized
        {...props}
      />
    );
  },
  a: ({ href, children, ...props }) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
};

type BaseProps = {
  source: any;
  className?: string;
};

interface WithSections extends BaseProps {
  allData: {
    user: User;
    articles: _Article[];
    projects: _Project[];
    bookmarks: _Bookmark[];
    experiences: _WorkExperience[];
  };
  withSections: true;
}

interface WithoutSections extends BaseProps {
  allData?: {
    user?: User;
    articles?: _Article[];
    projects?: _Project[];
    bookmarks?: _Bookmark[];
    experiences?: _WorkExperience[];
  };
  withSections?: false;
}

type MDXProps = WithSections | WithoutSections;

export default async function MDX({
  source,
  className,
  withSections,
  allData,
}: MDXProps) {
  const sections = allData?.user?.sections as UserPageSection[];
  return (
    <div className={cn("prose dark:prose-invert", className)}>
      <MDXRemote
        source={source}
        components={{
          ...mdxComponents,
          ...(withSections && {
            Intro: () => <Intro user={allData.user} />,
            Navigation: () => (
              <NavTabs user={allData.user} pages={userPageConfig.pages} />
            ),
            About: () => (
              <About title={getSectionTitle(1, sections)} user={allData.user} />
            ),
            Articles: () => (
              <Articles
                title={getSectionTitle(3, sections)}
                articles={allData.articles}
              />
            ),
            Projects: () => (
              <Projects
                title={getSectionTitle(4, sections)}
                projects={allData.projects}
              />
            ),
            Bookmarks: () => (
              <Bookmarks
                title={getSectionTitle(5, sections)}
                bookmarks={allData.bookmarks}
              />
            ),
            WorkExperiences: () => (
              <WorkExperiences
                title={getSectionTitle(2, sections)}
                experiences={allData.experiences}
              />
            ),
            Newsletter: () => (
              <Newsletter
                title={getSectionTitle(0, sections)}
                user={allData.user}
              />
            ),
            Connect: () => (
              <Connect
                title={getSectionTitle(6, sections)}
                user={allData.user}
              />
            ),
          }),
        }}
        options={{
          mdxOptions: {
            remarkPlugins: [
              remarkGfm,
              remarkMath,
              ...(withSections ? [sectionParser] : []),
            ],
            rehypePlugins: [rehypeKatex],
          },
        }}
        onError={ErrorComponent}
      />
    </div>
  );
}

const ErrorComponent = ({ error }: { error: Error }) => {
  return <MDX source={error.message} />;
};
