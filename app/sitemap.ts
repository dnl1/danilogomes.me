import type { MetadataRoute } from "next";
import { getCollection } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, personalProjects, caseStudies, music, blog] = await Promise.all([
    getCollection("en", "projects"),
    getCollection("en", "personal-projects"),
    getCollection("en", "case-studies"),
    getCollection("en", "music"),
    getCollection("en", "blog")
  ]);

  const staticPages = ["", "/about", "/experience", "/projects", "/personal-projects", "/case-studies", "/music", "/blog", "/contact"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7
  }));

  const dynamicPages = [
    ...projects.map((item) => ({
      url: `${siteConfig.url}/projects/${item.slug}`,
      lastModified: new Date(item.frontmatter.date),
      changeFrequency: "monthly" as const,
      priority: 0.65
    })),
    ...personalProjects.map((item) => ({
      url: `${siteConfig.url}/personal-projects/${item.slug}`,
      lastModified: new Date(item.frontmatter.date),
      changeFrequency: "monthly" as const,
      priority: 0.65
    })),
    ...caseStudies.map((item) => ({
      url: `${siteConfig.url}/case-studies/${item.slug}`,
      lastModified: new Date(item.frontmatter.date),
      changeFrequency: "monthly" as const,
      priority: 0.65
    })),
    ...music.map((item) => ({
      url: `${siteConfig.url}/music/${item.slug}`,
      lastModified: new Date(item.frontmatter.date),
      changeFrequency: "monthly" as const,
      priority: 0.65
    })),
    ...blog.map((item) => ({
      url: `${siteConfig.url}/blog/${item.slug}`,
      lastModified: new Date(item.frontmatter.date),
      changeFrequency: "weekly" as const,
      priority: 0.6
    }))
  ];

  return [...staticPages, ...dynamicPages];
}
