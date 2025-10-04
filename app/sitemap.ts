import fs from "fs/promises";
import { MetadataRoute } from "next";
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://prismlinux.org";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/download",
    "/wiki",
    "/support",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Wiki pages (only .mdx files, no images)
  const wikiPages = await getWikiPages();

  return [...staticPages, ...wikiPages];
}

async function getWikiPages(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://prismlinux.org";
  const wikiDir = path.join(process.cwd(), "content", "wiki");

  const pages: MetadataRoute.Sitemap = [];

  async function scanDir(dir: string, urlPath: string = "/wiki"): Promise<void> {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const fileName = entry.name.replace(/\.mdx$/, "").replace(/^index$/, "");
        const newUrlPath = fileName ? `${urlPath}/${fileName}` : urlPath;

        if (entry.isDirectory()) {
          await scanDir(fullPath, `${urlPath}/${entry.name}`);
        } else if (entry.name.endsWith(".mdx")) {
          // Only include .mdx files
          pages.push({
            url: `${baseUrl}${newUrlPath}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.6,
          });
        }
        // Ignore image files (.png, .jpg, etc.)
      }
    } catch (error) {
      console.error("Error scanning wiki directory:", error);
    }
  }

  await scanDir(wikiDir);
  return pages;
}
