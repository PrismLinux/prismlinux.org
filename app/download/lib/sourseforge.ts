import { XMLParser } from "fast-xml-parser";

interface ParsedRelease {
  name: string;
  version: string;
  size: string;
  downloadUrl: string;
  releaseDate: string;
  architecture: string;
  type: "stable" | "beta" | "alpha";
}

export async function fetchLatestReleases(): Promise<ParsedRelease[]> {
  try {
    const rssUrl = "https://sourceforge.net/projects/prismlinux/rss?path=/Beta";

    const response = await fetch(rssUrl, {
      headers: {
        "User-Agent": "PrismLinux-Website/1.0",
      },
      cache: "no-cache", // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const xmlText = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      parseAttributeValue: true,
      trimValues: true,
    });

    const xmlDoc = parser.parse(xmlText);
    const items = xmlDoc?.rss?.channel?.item || [];

    const releases: ParsedRelease[] = [];
    const itemsArray = Array.isArray(items) ? items : [items];

    itemsArray.forEach((item: any) => {
      const title = item.title || "";
      const link = item.link || "";
      const pubDate = item.pubDate || "";

      // Skip if not an ISO file
      if (!title.toLowerCase().includes(".iso")) return;

      // Parse filename to extract version info
      const versionMatch = title.match(/(\d{4})\.(\d{1,2})\.(\d+)/);
      const sizeMatch = title.match(/\((\d+(?:\.\d+)?\s*[KMGT]?B)\)/i);

      if (versionMatch) {
        const version = `${versionMatch[1]}.${versionMatch[2]}.${versionMatch[3]}`;
        const type = title.toLowerCase().includes("beta")
          ? "beta"
          : title.toLowerCase().includes("alpha")
            ? "alpha"
            : "stable";

        releases.push({
          name: `PrismLinux ${version} ${type === "stable" ? "(Stable)" : `(${type.charAt(0).toUpperCase() + type.slice(1)})`}`,
          version,
          size: sizeMatch ? sizeMatch[1] : "Unknown",
          downloadUrl: link,
          releaseDate: pubDate
            ? new Date(pubDate).toLocaleDateString()
            : new Date().toLocaleDateString(),
          architecture: "x86_64",
          type,
        });
      }
    });

    // Sort by version (most recent first)
    const sortedReleases = releases.sort((a, b) => {
      const [yearA, monthA, dayA] = a.version.split(".").map(Number);
      const [yearB, monthB, dayB] = b.version.split(".").map(Number);

      if (yearA !== yearB) return yearB - yearA;
      if (monthA !== monthB) return monthB - monthA;
      return dayB - dayA;
    });

    // Get only the latest of each type
    const result: ParsedRelease[] = [];
    const stableRelease = sortedReleases.find((r) => r.type === "stable");
    const betaRelease = sortedReleases.find((r) => r.type === "beta");

    // Add stable first if it exists
    if (stableRelease) {
      result.push(stableRelease);
    }

    // Add only one beta release
    if (betaRelease) {
      result.push(betaRelease);
    }

    // If no releases found, don't return anything (will trigger fallback)
    return result;
  } catch (error) {
    console.error("Failed to fetch SourceForge releases:", error);
    return [];
  }
}

// Fallback with static data
export async function fetchReleasesWithFallback(): Promise<ParsedRelease[]> {
  try {
    const releases = await fetchLatestReleases();

    // If we got releases, return them
    if (releases.length > 0) {
      return releases;
    }

    // Fallback to static data
    return [
      {
        name: "PrismLinux 2025.8 (Beta)",
        version: "2025.8",
        size: "2.5 GB",
        architecture: "x86_64",
        downloadUrl: "https://sourceforge.net/projects/prismlinux/files/Beta/",
        releaseDate: new Date().toLocaleDateString(),
        type: "beta",
      },
    ];
  } catch (error) {
    console.error("All fetch methods failed:", error);

    // Return fallback data
    return [
      {
        name: "PrismLinux 2025.8 (Beta)",
        version: "2025.8",
        size: "2.5 GB",
        architecture: "x86_64",
        downloadUrl: "https://sourceforge.net/projects/prismlinux/files/Beta/",
        releaseDate: new Date().toLocaleDateString(),
        type: "beta",
      },
    ];
  }
}
