import type { WorkExperience } from "@prisma/client";
import Link from "next/link";
import MDX from "../markdown/mdx";
import { Icons } from "../shared/icons";
import ExperienceOperations from "./experience-operations";

interface Props {
  experience: WorkExperience;
  admin?: boolean;
}

export default async function WorkExperience({ experience, admin }: Props) {
  const title = (
    <p>
      {experience.title} {experience.company && `at ${experience.company}`}
    </p>
  );
  return (
    <div className="-mx-2 flex min-h-5 max-md:h-auto relative group items-center justify-between rounded-md  p-2 px-3 text-sm transition-colors  hover:bg-gray-3 max-md:flex-col max-md:items-start">
      <div className="flex-1 flex gap-2 items-center max-md:flex-col max-md:items-baseline max-md:gap-1">
        <span className="block text-gray-4 w-28 self-start group-hover:text-secondary transition-colors">
          {experience.from} —{" "}
          {experience.to === "present" ? "Present" : experience.to}
        </span>
        <div>
          <div>
            {experience.url ? (
              <Link
                href={experience.url}
                className="flex gap-1 hover:underline underline-offset-4"
                target="_blank"
              >
                {title} <Icons.arrowUpRight size={14} />
              </Link>
            ) : (
              title
            )}
            {experience.location && (
              <p className="text-gray-4 text-xs mb-1">Remote</p>
            )}
            {experience.description && (
              <MDX
                source={experience.description}
                className="!text-gray-4 !leading-6 text-xs"
              />
            )}
          </div>
        </div>
      </div>
      {admin && (
        <div className="flex max-md:mt-2 justify-end max-md:w-full ">
          <ExperienceOperations experience={experience} />
        </div>
      )}
    </div>
  );
}
