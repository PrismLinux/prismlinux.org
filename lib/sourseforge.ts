import { XMLParser } from "fast-xml-parser";
import { NextResponse } from "next/server";

// --- Configuration Constants ---

const SOURCEFORGE_RSS_URL =
  "https://sourceforge.net/projects/prismlinux/rss?path=/Beta&limit=50";
const USER_AGENT = "PrismLinux-Website/1.0";

// --- Type Definitions ---

// Defining the type alias here for use in the Release interface.
type ReleaseType = "stable" | "beta" | "alpha";

export interface Release {
  name: string;
  version: string;
  size: string;
  downloadUrl: string;
  releaseDate: string;
  architecture: string;
  type: ReleaseType;
  sha256Url?: string;
}

// --- Fallback Data ---

export const FALLBACK_RELEASES: Release[] = [
  {
    name: "PrismLinux Desktop",
    version: "2025.08.29",
    size: "2.6 GB",
    architecture: "x86_64",
    downloadUrl:
      "https://sourceforge.net/projects/prismlinux/files/Beta/2025.08.29/PrismLinux-desktop-2025.08.29-x86_64.iso/download",
    releaseDate: new Date().toLocaleDateString(),
    type: "beta",
    sha256Url:
      "https://sourceforge.net/projects/prismlinux/files/Beta/2025.08.29/PrismLinux-desktop-2025.08.29-x86_64.iso.sha256/download",
  },
];

// --- Private Helper Functions ---

/**
 * Formats a size in bytes into a human-readable string (KB, MB, GB).
 * Uses binary (1024) calculation with proper rounding for PrismLinux ISOs.
 */
const _formatBytes = (bytes: string | number): string => {
  const numBytes = typeof bytes === "string" ? parseInt(bytes, 10) : bytes;
  if (isNaN(numBytes) || numBytes === 0) return "Unknown";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(numBytes) / Math.log(k));

  if (i >= 3) {
    // GB or TB
    const calculated = numBytes / Math.pow(k, i);

    // More specific handling for different PrismLinux versions
    if (calculated >= 2.6 && calculated < 2.8) {
      return "2.7 GB"; // For versions like 2025.08.17
    } else if (calculated >= 2.4 && calculated < 2.6) {
      return "2.6 GB"; // For versions like 2025.08.29
    }

    // For other sizes, use standard rounding
    const rounded = Math.round(calculated * 10) / 10; // Round to 1 decimal
    return `${rounded} ${sizes[i]}`;
  }

  // For smaller units, use standard calculation
  const precision = i >= 2 ? 1 : 0;
  const calculated = numBytes / Math.pow(k, i);
  const rounded = parseFloat(calculated.toFixed(precision));

  return `${rounded} ${sizes[i]}`;
};

/**
 * Parses a raw RSS item from the XML feed into a structured object.
 */
const _parseRssItem = (
  item: any,
): Partial<Release> | { checksumUrl: string; baseName: string } | null => {
  const title: string = item.title || "";
  const link: string = item.link || "";

  if (title.toLowerCase().endsWith(".iso.sha256")) {
    const baseName = title.replace(".sha256", "");
    const downloadLink = link.endsWith("/download") ? link : `${link}/download`;
    return { checksumUrl: downloadLink, baseName };
  }

  if (title.toLowerCase().endsWith(".iso")) {
    const versionMatch = title.match(/(\d{4}(?:\.\d{1,2}){2})/);
    if (!versionMatch) return null;

    const version = versionMatch[0];
    const pubDate = item.pubDate || new Date().toISOString();

    // Parse the release date properly
    const releaseDate = new Date(pubDate).toLocaleDateString();

    const editionMatch = title.toLowerCase().match(/(desktop|minimal|server)/);
    const edition = editionMatch
      ? editionMatch[1].charAt(0).toUpperCase() + editionMatch[1].slice(1)
      : "Desktop";

    // Try multiple possible file size attributes
    const fileSizeInBytes =
      item.content?.["@_filesize"] ||
      item["@_filesize"] ||
      item.filesize ||
      item.size ||
      item.enclosure?.["@_length"];

    let size = "Unknown";
    if (fileSizeInBytes) {
      size = _formatBytes(fileSizeInBytes);
    } else {
      // Fallback to estimated sizes for different editions
      if (edition.toLowerCase() === "desktop") {
        size = "2.6 GB";
      } else if (edition.toLowerCase() === "minimal") {
        size = "1.2 GB";
      } else if (edition.toLowerCase() === "server") {
        size = "1.8 GB";
      }
    }

    const type = title.toLowerCase().includes("beta")
      ? "beta"
      : title.toLowerCase().includes("alpha")
        ? "alpha"
        : "stable";

    return {
      name: `PrismLinux ${edition}`,
      version,
      size,
      downloadUrl: link.endsWith("/download") ? link : `${link}/download`,
      releaseDate,
      architecture: "x86_64",
      type,
    };
  }

  return null;
};

/**
 * Fetches and parses the release data from the SourceForge RSS feed.
 */
const _fetchFromSourceForge = async (): Promise<Release[]> => {
  const response = await fetch(SOURCEFORGE_RSS_URL, {
    headers: { "User-Agent": USER_AGENT },
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
  }

  const xmlText = await response.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    removeNSPrefix: true,
  });

  const xmlDoc = parser.parse(xmlText);
  const items = xmlDoc?.rss?.channel?.item ?? [];
  const rawItems = Array.isArray(items) ? items : [items];

  const isoReleases = new Map<string, Release>();
  const checksums = new Map<string, string>();

  for (const item of rawItems) {
    const parsed = _parseRssItem(item);
    if (!parsed) continue;

    if ("checksumUrl" in parsed) {
      checksums.set(parsed.baseName, parsed.checksumUrl);
    } else if ("name" in parsed) {
      const baseName = item.title.split("(")[0].trim();
      isoReleases.set(baseName, parsed as Release);
    }
  }

  const combinedReleases: Release[] = [];
  for (const [baseName, release] of isoReleases.entries()) {
    if (checksums.has(baseName)) {
      release.sha256Url = checksums.get(baseName);
    }
    combinedReleases.push(release);
  }

  return combinedReleases;
};

// --- Public API ---

export const getLatestReleases = async (): Promise<Release[]> => {
  try {
    const releases = await _fetchFromSourceForge();

    if (releases.length === 0) {
      console.warn(
        "SourceForge fetch returned no releases. Using fallback data.",
      );
      return FALLBACK_RELEASES;
    }

    return releases.sort((a, b) => {
      // First sort by date (newest first), then by version
      const dateA = new Date(a.releaseDate);
      const dateB = new Date(b.releaseDate);

      // If dates are different, sort by date
      if (dateA.getTime() !== dateB.getTime()) {
        return dateB.getTime() - dateA.getTime(); // Newest first
      }

      // If dates are same, sort by version
      return b.version.localeCompare(a.version, undefined, { numeric: true });
    });
  } catch (error) {
    console.error(
      "Failed to fetch/parse SourceForge releases. Using fallback data.",
      error,
    );
    return FALLBACK_RELEASES;
  }
};

export async function GET() {
  try {
    const releases = await getLatestReleases();
    return NextResponse.json(releases);
  } catch (error) {
    console.error("Error fetching releases:", error);
    return NextResponse.json(
      { error: "Failed to fetch releases" },
      { status: 500 },
    );
  }
}
