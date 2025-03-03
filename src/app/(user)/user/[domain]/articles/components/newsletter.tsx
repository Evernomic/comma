import MDX from "@/components/markdown/mdx";
import { User } from "@prisma/client";
import NewsletterForm from "./newsletter-form";

export default function Newsletter({
  user,
}: {
  user: Pick<User, "username" | "newsletterCta">;
}) {
  return (
    <dl className="section-container gap-3 rounded-md">
      <dt className="section-title flex-col items-start gap-1">
        <h3>Newsletter</h3>
        {user.newsletterCta && (
          <MDX
            source={user.newsletterCta}
            className="!text-gray-4 !leading-6 text-sm"
          />
        )}
      </dt>
      <dd className="section-content">
        <NewsletterForm username={user.username} />
      </dd>
    </dl>
  );
}
