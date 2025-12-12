import NavButton from "@/components/layout/nav-button";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { db } from "@/lib/db";
import Balancer from "react-wrap-balancer";
import type { ExplorePageUser } from "../explore/client";
import PopularUsers from "./popular-users";

// async function getPopularUsers(): Promise<Array<ExplorePageUser> | null> {
//   const allUsers = await db.user.findMany({
//     select: {
//       showOnExplore: true,
//       name: true,
//       title: true,
//       username: true,
//       category: true,
//       location: true,
//       image: true,
//       domain: true,
//       articles: {
//         select: {
//           views: true,
//         },
//       },
//       projects: {
//         select: {
//           views: true,
//         },
//       },
//       bookmarks: {
//         select: {
//           clicks: true,
//         },
//       },
//     },
//   });
//   let usersWithPopularity = allUsers.map((user) => {
//     const articleViews = user.articles.reduce(
//       (sum, article) => sum + article.views,
//       0,
//     );
//     const projectViews = user.projects.reduce(
//       (sum, project) => sum + project.views,
//       0,
//     );
//     const bookmarkClicks = user.bookmarks.reduce(
//       (sum, bookmark) => sum + bookmark.clicks,
//       0,
//     );

//     const popularityScore = Math.floor(
//       (articleViews + projectViews + bookmarkClicks) / 3,
//     );
//     const { articles, projects, bookmarks, ...rest } = user;
//     return {
//       ...rest,
//       popularityScore,
//     };
//   });

//   const mergedPopularityUsers = process.env.MERGED_POPULARITY_USERS!;

//   if (
//     mergedPopularityUsers &&
//     Array.isArray(JSON.parse(mergedPopularityUsers))
//   ) {
//     const pairs = JSON.parse(mergedPopularityUsers) as Array<{
//       from: string;
//       to: string;
//     }>;

//     pairs.forEach((pair) => {
//       const from = usersWithPopularity.find((u) => u.username === pair.from);
//       const to = usersWithPopularity.find((u) => u.username === pair.to);

//       if (from && to) {
//         const mergedScore = from.popularityScore + to.popularityScore;
//         usersWithPopularity = usersWithPopularity.map((u) =>
//           u.username === to.username
//             ? { ...u, popularityScore: mergedScore }
//             : u,
//         );
//       }
//     });
//   }

//   const sortUsersByPopularity = usersWithPopularity
//     .sort((a, b) => b.popularityScore - a.popularityScore)
//     .slice(0, 40);

//   return sortUsersByPopularity;
// }

export default async function Hero() {
  // const users = await getPopularUsers();

  return (
    <section className="section-container   h-[90vh] flex flex-col gap-20 pt-20">
      <div className="flex flex-col items-center gap-1 ">
        <div className="w-[900px] max-[1000px]:w-full  max-md:w-full max-md:text-4xl max-md:leading-12 text-6xl leading-15 font-medium text-center whitespace-pre-line">
          <Balancer>{marketingConfig.headline}</Balancer>
        </div>
        <div className="grid grid-cols-2 *:w-full mt-5 mb-2 gap-3 ">
          <NavButton
            href={siteConfig.links.signup}
            size="wide"
            buttonVariant="primary"
            icon="login"
            direction="ltr"
            buttonClassname="gap-2"
            aria-label="Sign up to Comma"
          >
            Sign up
          </NavButton>
          <NavButton
            href="/explore"
            size="wide"
            buttonClassname="gap-2"
            icon="search"
            direction="ltr"
            aria-label="Go Explore page"
          >
            Explore
          </NavButton>
        </div>
        <NavButton
          href={siteConfig.links.demo}
          size="wide"
          icon="arrowUpRight"
          buttonVariant="ghost"
          target="_blank"
          aria-label="See a sample website"
        >
          See a sample website
        </NavButton>
      </div>
      {/* <PopularUsers users={users} /> */}
    </section>
  );
}
