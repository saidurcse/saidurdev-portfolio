// @flow strict

import { personalData } from "@/utils/data/personal-data";
import { getPageMetadata, siteConfig } from "@/utils/seo/metadata";
import BlogCard from "../components/homepage/blog/blog-card";
import { BreadcrumbSchema, WebPageSchema, BlogPostingSchema } from "../components/seo/json-ld";

export const metadata = getPageMetadata({
  title: "Blog - AI, LLM, RAG, Node.js & Full Stack Engineering Articles",
  description:
    "Technical articles by Muhammad Saidur Rahman on AI/LLM/RAG engineering, Node.js microservices, full-stack development, Android/iOS, and software architecture.",
  path: "/blog",
  type: "website",
  tags: ["Blog", "AI", "LLM", "RAG", "Node.js", "Full Stack", "Android", "Kotlin"],
});

async function getBlogs() {
  const res = await fetch(
    `https://dev.to/api/articles?username=${personalData.devUsername}`,
    {
      next: { revalidate: 3600 } // 1 hour
    }
  );
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json();
  return data;
};

async function page() {
  const blogs = await getBlogs();
  const pageUrl = `${siteConfig.url}/blog`;

  return (
    <div className="py-8">
      <WebPageSchema
        title="Blog - AI, LLM, RAG, Node.js & Full Stack Engineering Articles"
        description={metadata.description}
        url={pageUrl}
        image={`${siteConfig.url}/opengraph-image`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Blog", url: pageUrl },
        ]}
      />
      {blogs.slice(0, 6).map((blog) => (
        <BlogPostingSchema key={`schema-${blog.id}`} blog={blog} />
      ))}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-8 sm:w-24 h-[2px] bg-[#1a1443]"></span>
          <h1 className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl sm:text-2xl rounded-md whitespace-nowrap">
            All Blog
          </h1>
          <span className="w-8 sm:w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {
          blogs.map((blog, i) => (
            blog?.cover_image &&
            <BlogCard blog={blog} key={blog.id ?? i} />
          ))
        }
      </div>
    </div>
  );
};

export default page;