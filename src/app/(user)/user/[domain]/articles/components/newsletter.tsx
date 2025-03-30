import MDX from "@/components/markdown/mdx";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import NewsletterForm from "./newsletter-form";

export default function Newsletter({
  user,
  title,
  className,
}: {
  title: string;
  className?: string;
  user: Pick<User, "username" | "newsletter" | "newsletterCta">;
}) {
  if (!user.newsletter) {
    return null;
  }
  return (
    <dl
      className={cn("section-container gap-3 rounded-md not-prose bg-gray-3 border border-gray-2 p-[35px] -mx-[35px]", className)}
    >
      <dt className="section-title flex-col items-start  gap-1">
        <h3>{title}</h3>
        {user.newsletterCta && (
          <MDX source={user.newsletterCta} className="text-gray-4! text-sm" />
        )}
      </dt>
      <dd className="section-content">
        <NewsletterForm username={user.username} />
      </dd>
    </dl>
  );
}
