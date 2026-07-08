// @flow strict

import { projectsData } from "@/utils/data/projects-data";
import ProjectCard from "../components/homepage/projects/project-card";

function page() {

  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-8 sm:w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl sm:text-2xl rounded-md whitespace-nowrap">
            All Projects
          </span>
          <span className="w-8 sm:w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="w-full"
          >
            <div className="box-border flex items-center justify-center rounded shadow-[0_0_30px_0_rgba(0,0,0,0.3)] transition-all duration-[0.5s]">
              <ProjectCard project={project} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
