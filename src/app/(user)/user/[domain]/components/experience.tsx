import WorkExperience from "@/components/work-experiences/work-experience";
import type { WorkExperience as _WorkExperience } from "@prisma/client";

export default function WorkExperiences({
  experiences,
}: {
  experiences: _WorkExperience[];
}) {
  if (!experiences.length) {
    return null;
  }
  return (
    <dl className="section-container">
      <dt className="section-title">
        <h3>Work Experience</h3>
      </dt>

      <dd className="section-content">
        {experiences.map((experience) => (
          <WorkExperience experience={experience} key={experience.id} />
        ))}
      </dd>
    </dl>
  );
}
