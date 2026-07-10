import { personalData } from "@/utils/data/personal-data";
import { projectsData } from "@/utils/data/projects-data";
import { siteConfig } from "@/utils/seo/metadata";

const EXTERNAL_BLOGS = [];

export default async function sitemap() {
  const siteUrl = siteConfig.url;
  const now = new Date();

  // Fetch dynamic blog posts from Dev.to
  let blogPosts = [];
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`,
      {
        next: { revalidate: 3600 },
      }
    );
    if (res.ok) {
      const data = await res.json();
      blogPosts = data.filter((item) => item?.cover_image || item?.url);
    }
  } catch (error) {
    console.error("Failed to fetch blogs for sitemap:", error);
  }

  // Static routes
  const staticRoutes = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/#about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/#experience`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/#skills`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/#projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/#education`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/#blogs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/#contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Project detail routes (project list page anchors)
  const projectRoutes = projectsData.map((project) => ({
    url: `${siteUrl}/projects#project-${project.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Blog post routes (external Dev.to URLs are not part of this domain,
  // so we keep only the internal blog listing anchors for discoverability)
  const blogRoutes = blogPosts.map((blog) => ({
    url: `${siteUrl}/blog#blog-${blog.id}`,
    lastModified: new Date(blog.published_at || now),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
