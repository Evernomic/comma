import type { User } from "@prisma/client";
import CommandMenuToggle from "./toggle";
import Feed from "../articles/components/feed";

export default function Intro({
  user,
}: {
  user: Pick<
    User,
    | "about"
    | "name"
    | "title"
    | "image"
    | "github"
    | "twitter"
    | "dribbble"
    | "contactEmail"
    | "linkedin"
    | "username"
  >;
}) {
  return (
    <dl className="section-container flex-row justify-between items-center mb-6">
      <dt className="section-title flex-col items-start">
        <h1 className="text-lg">{user.name}</h1>
        <h2 className="text-gray-4 text-sm">{user.title}</h2>
      </dt>
      <dd className="section-content flex-row gap-2  py-0">
        <Feed username={user.username} />
        <CommandMenuToggle />
      </dd>
    </dl>
  );
}
