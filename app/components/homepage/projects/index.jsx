// @flow strict

import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';

function Projects() {

  return (
    <section id='projects' aria-labelledby="projects-heading" className="relative z-10 my-12 lg:my-24 scroll-mt-20">
      <div className="sticky top-24">
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl  opacity-30"></div>
        <div className="flex items-center justify-center lg:justify-start relative">
          <h2 id="projects-heading" className="bg-[#1a1443] lg:absolute lg:left-0 w-fit text-white px-5 py-3 text-xl rounded-md">
            PROJECTS
          </h2>
          <span className="hidden lg:block w-full h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="pt-16 sm:pt-20 lg:pt-24">
        <div className="flex flex-col gap-4 sm:gap-6">
          {projectsData.slice(0, 4).map((project, index) => (
            <div
              id={`sticky-card-${index + 1}`}
              key={index}
              className="sticky-card w-full mx-auto max-w-2xl sticky"
            >
              <div className="box-border flex items-center justify-center rounded shadow-[0_0_30px_0_rgba(0,0,0,0.3)] transition-all duration-[0.5s]">
                <ProjectCard project={project} />
              </div>
            </div>
          ))}
        </div>

        {projectsData.length > 4 && (
          <div className="flex justify-center mt-6 sm:mt-8">
            <Link
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#16f2b3]"
              href="/projects"
              aria-label="View all projects"
            >
              <span>View More</span>
              <FaArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;