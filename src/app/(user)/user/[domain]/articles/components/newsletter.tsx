import MDX from "@/components/markdown/mdx";
import { User } from "@prisma/client";
import NewsletterForm from "./newsletter-form";

export default function Newsletter({
  user,
  title,
}: {
  title: string;
  user: Pick<User, "username" | "newsletter" | "newsletterCta">;
}) {
  if (!user.newsletter) {
    return null;
  }
  return (
    <dl className="section-container gap-3 rounded-md">
      <dt className="section-title flex-col items-start gap-1">
        <h3>{title}</h3>
        {user.newsletterCta && (
          <MDX
            source={user.newsletterCta}
            className="text-gray-4! leading-4! text-sm"
          />
        )}
      </dt>
      <dd className="section-content">
        <NewsletterForm username={user.username} />
      </dd>
    </dl>
  );
}
