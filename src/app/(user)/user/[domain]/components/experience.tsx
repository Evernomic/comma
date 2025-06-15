import WorkExperience from "@/components/work-experiences/work-experience";
import type { WorkExperience as _WorkExperience } from "@prisma/client";

export default function WorkExperiences({
  experiences,
  subTitle,
  title,
}: {
  title: string;
  subTitle?: string;
  experiences: _WorkExperience[];
}) {
  if (!experiences.length) {
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
        {experiences.map((experience) => (
          <WorkExperience experience={experience} key={experience.id} />
        ))}
      </dd>
    </dl>
  );
}
