import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import AddEditExperienceModal from "@/components/work-experiences/add-edit-work-experience";
import NoExperiencesPlaceholder from "@/components/work-experiences/no-experiences-placeholder";
import WorkExperience from "@/components/work-experiences/work-experience";
import { getWorkExperiences } from "@/lib/fetchers/users";
import { sortWorkExperiences } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
};

export default async function Work() {
  const experiences = await getWorkExperiences();
  const sortedExperiences = sortWorkExperiences(experiences);
  return (
    <AppShell>
      <AppHeader title="Work">
        <AddEditExperienceModal />
      </AppHeader>
      <div>
        {experiences.map((experience) => (
          <WorkExperience experience={experience} key={experience.id} admin />
        ))}
        {!experiences.length && <NoExperiencesPlaceholder />}
      </div>
    </AppShell>
  );
}
