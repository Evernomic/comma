import MDX from "@/components/markdown/mdx";
import { getSectionProps } from "@/lib/utils";
import type { User, UserPageSection } from "@/types";
import NewsletterFormModal from "./newsletter-form-modal";

export default function NewsletterModalWrapper({ user }: { user: User }) {
  const title = getSectionProps(0, user.sections as UserPageSection[]).title;

  return (
    <NewsletterFormModal user={user} title={title}>
      {user.newsletterCta && user.newsletter ? (
        <MDX source={user.newsletterCta} className="text-gray-4! text-sm" />
      ) : null}
    </NewsletterFormModal>
  );
}
