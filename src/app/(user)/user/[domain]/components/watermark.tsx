import { Badge } from "@/components/ui/badge";
import { getUserViaEdge } from "@/lib/edge";
import type { User } from "@prisma/client";
import Link from "next/link";

export default async function Watermark({ user }: { user: Pick<User, "id"> }) {
  const res = await getUserViaEdge(undefined, undefined, user.id);
  if (!res.showBranding) {
    return null;
  }
  return (
    <Link
      href="https://nucelo.com"
      target="_blank"
      aria-label="Powered by Nucelo"
    >
      <Badge className="text-xs fixed right-4.4 bottom-4.4 text-gray-4 font-normal border border-gray-2 ">
        Powered by Nucelo
      </Badge>
    </Link>
  );
}