import MDX from "@/components/markdown/mdx";
import type { User } from "@/types";

export default function About({
  title,
  user,
  subTitle,
}: {
  title: string;
  subTitle?: string;
  user: User;
}) {
  if (!user.about?.trim()?.length) {
    return null;
  }
  return (
    <dl className="section-container not-prose">
      <dt className="section-title">
        <div className="flex flex-col gap-1">
          <h3>{title}</h3>
          {subTitle && <p className="section-subtitle">{subTitle}</p>}
        </div>
      </dt>
      <dd className="section-content">
        <MDX source={user.about} className="text-gray-4! text-sm" />
      </dd>
    </dl>
  );
}
