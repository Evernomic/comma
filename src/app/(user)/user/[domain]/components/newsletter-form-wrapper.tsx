import MDX from "@/components/markdown/mdx";
import { getSectionTitle } from "@/lib/utils";
import type { User, UserPageSection } from "@/types";
import NewsletterFormModal from "./newsletter-form-modal";

export default function NewsletterModalWrapper({ user }: { user: User }) {
  const title = getSectionTitle(0, user.sections as UserPageSection[]);

  return (
    <NewsletterFormModal user={user} title={title}>
      {user.newsletterCta && user.newsletter ? (
        <MDX source={user.newsletterCta} className="text-gray-4! text-sm" />
      ) : null}
    </NewsletterFormModal>
  );
}
