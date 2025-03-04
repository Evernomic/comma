import type { User } from "@/types";
import Feed from "../articles/components/feed";
import CommandMenuToggle from "./toggle";

export default function Intro({ user }: { user: User }) {
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
