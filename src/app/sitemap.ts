import { MetadataRoute } from "next";

const siteUrl = "https://nexait.studio";

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/projects", "/reviews", "/about", "/contact"];
  
  // Example dynamic project slugs
  const projectSlugs = ["realestate", "coffee", "agency", "vision", "logistics", "education"];
  const projectRoutes = projectSlugs.map(slug => `/projects/${slug}`);

  const allRoutes = [...routes, ...projectRoutes];

  return allRoutes.map((route) => ({
    url: `${siteUrl}/en${route}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `${siteUrl}/en${route}`,
        ar: `${siteUrl}/ar${route}`,
      },
    },
  }));
}
