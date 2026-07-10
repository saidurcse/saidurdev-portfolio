// @flow strict

import { projectsData } from "@/utils/data/projects-data";
import { getPageMetadata, siteConfig } from "@/utils/seo/metadata";
import ProjectCard from "../components/homepage/projects/project-card";
import { BreadcrumbSchema, WebPageSchema, ProjectSchema } from "../components/seo/json-ld";

export const metadata = getPageMetadata({
  title: "Projects - AI, LLM, RAG, Mobile & Full Stack Engineering Portfolio",
  description:
    "Explore Muhammad Saidur Rahman's portfolio of 24+ enterprise projects spanning AI/LLM/RAG systems, Node.js microservices, Android/iOS apps, and cloud-native architecture.",
  path: "/projects",
  type: "website",
  tags: ["Projects", "AI", "LLM", "RAG", "Node.js", "Android", "Kotlin", "Full Stack"],
});

function page() {
  const pageUrl = `${siteConfig.url}/projects`;

  return (
    <div className="py-8">
      <WebPageSchema
        title="Projects - AI, LLM, RAG, Mobile & Full Stack Engineering Portfolio"
        description={metadata.description}
        url={pageUrl}
        image={`${siteConfig.url}/opengraph-image`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Projects", url: pageUrl },
        ]}
      />
      {projectsData.slice(0, 12).map((project) => (
        <ProjectSchema key={`schema-${project.id}`} project={project} />
      ))}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-8 sm:w-24 h-[2px] bg-[#1a1443]"></span>
          <h1 className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl sm:text-2xl rounded-md whitespace-nowrap">
            All Projects
          </h1>
          <span className="w-8 sm:w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        {projectsData.map((project, index) => (
          <div
            key={project.id}
            id={`project-${project.id}`}
            className="w-full scroll-mt-24"
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
