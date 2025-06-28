import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import type { User } from "@/types";

export default function Intro({ user }: { user: User }) {
  if (!user) {
    return null;
  }
  return (
    <dl className="section-container flex-row justify-between items-center not-prose">
      <dt className="section-title gap-4">
        <Avatar className="rounded-md size-20">
          {user.image && (
            <AvatarImage src={user.image} alt={`Avatar of ${user.username}`} />
          )}
          <AvatarFallback>
            {getInitials(user.name ?? user.username)}
          </AvatarFallback>
        </Avatar>
        <div className="flex  flex-col items-start">
          <div className="text-lg font-medium">{user.name}</div>
          <p className="text-gray-4 text-sm font-normal">{user.title}</p>
        </div>
      </dt>
    </dl>
  );
}
