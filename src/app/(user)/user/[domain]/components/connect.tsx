import { Icons } from "@/components/shared/icons";
import { getLinks } from "@/config/user-page";
import type { User } from "@/types";
import Link from "next/link";

export default function Connect({
  title,
  user,
}: {
  title: string;
  user: User;
}) {
  const links = getLinks(user);

  if (links === null) {
    return null;
  }
  return (
    <dl className="section-container not-prose">
      <dt className="section-title">
        <h3>{title}</h3>
      </dt>
      <dd className="section-content flex flex-col">
        {links.map((link) => {
          return (
            <Link
              href={link.url}
              className="flex text-gray-4 items-center group -mx-2  relative justify-between rounded-md  p-2 text-sm transition-colors  hover:bg-gray-3 "
              key={link.id}
              target="_blank"
            >
              <p>{link.title}</p>
              <span className="flex gap-1 group-hover:text-secondary transition-colors">
                {link.username}
                <Icons.arrowUpRight size={14} />
              </span>
            </Link>
          );
        })}
      </dd>
    </dl>
  );
}
