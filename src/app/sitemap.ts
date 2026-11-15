import type { MetadataRoute } from "next";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";

const STATIC_LAST_MODIFIED = "2026-08-16T00:00:00.000Z";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = PROFILE.website.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/stack`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
