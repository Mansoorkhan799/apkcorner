import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { getAllPostSlugs, getCategories } from "@/lib/wordpress";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  ];

  try {
    const [slugs, categories] = await Promise.all([
      getAllPostSlugs(),
      getCategories(),
    ]);

    const postRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
      url: `${siteUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const categoryRoutes: MetadataRoute.Sitemap = categories
      .filter((cat) => cat.slug !== "uncategorized")
      .map((cat) => ({
        url: `${siteUrl}/category/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      }));

    return [...staticRoutes, ...postRoutes, ...categoryRoutes];
  } catch {
    return staticRoutes;
  }
}
