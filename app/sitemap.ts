import { MetadataRoute } from "next";
import { projectsData } from "@/app/data/projects";
import internshipArray from "@/app/data/internships";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://subratachowdhuryportfolio.vercel.app";

  // 1. Define your static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experiences`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // 2. Dynamically generate routes for all your projects
  const projectRoutes: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `${baseUrl}/projects/${project.repoName}`,
    lastModified: new Date(), // You could use project.updatedAt here if you track it
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 3. Dynamically generate routes for all your experiences
  const experienceRoutes: MetadataRoute.Sitemap = internshipArray.map(
    (exp) => ({
      url: `${baseUrl}/experiences/${exp.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  // 4. Return the combined array
  return [...staticRoutes, ...projectRoutes, ...experienceRoutes];
}
