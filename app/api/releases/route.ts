import { XMLParser } from "fast-xml-parser";
import { NextResponse } from "next/server";

const SOURCEFORGE_RSS_URL =
  "https://sourceforge.net/projects/prismlinux/rss?path=/Beta&limit=50";
const USER_AGENT = "PrismLinux-Website/1.0";

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

export const FALLBACK_RELEASES: Release[] = [
  {
    name: "PrismLinux Desktop",
    version: "2025.10.01",
    size: "2.4 GB",
    architecture: "x86_64",
    downloadUrl:
      "https://sourceforge.net/projects/prismlinux/files/Beta/2025.10.01/PrismLinux-2025.10.01-x86_64.iso/download",
    releaseDate: new Date().toLocaleDateString(),
    type: "beta",
    sha256Url:
      "https://sourceforge.net/projects/prismlinux/files/Beta/2025.10.01/PrismLinux-2025.10.01-x86_64.iso/download",
  },
];

// Cache configuration
export const dynamic = "force-dynamic";
export const revalidate = 300; // 5 minutes cache

const formatBytes = (bytes: string | number): string => {
  const numBytes = typeof bytes === "string" ? parseInt(bytes, 10) : bytes;
  if (isNaN(numBytes) || numBytes === 0) return "Unknown";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(numBytes) / Math.log(k));

  if (i >= 3) {
    const calculated = numBytes / Math.pow(k, i);
    if (calculated >= 2.6 && calculated < 2.8) return "2.7 GB";
    if (calculated >= 2.4 && calculated < 2.6) return "2.6 GB";
    const rounded = Math.round(calculated * 10) / 10;
    return `${rounded} ${sizes[i]}`;
  }

  const precision = i >= 2 ? 1 : 0;
  const calculated = numBytes / Math.pow(k, i);
  const rounded = parseFloat(calculated.toFixed(precision));
  return `${rounded} ${sizes[i]}`;
};

const parseRssItem = (
  item: any,
): { checksumUrl: string; baseName: string } | Partial<Release> | null => {
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
    const releaseDate = new Date(pubDate).toLocaleDateString();

    const editionMatch = title.toLowerCase().match(/(desktop|minimal|server)/);
    const edition = editionMatch
      ? editionMatch[1].charAt(0).toUpperCase() + editionMatch[1].slice(1)
      : "Desktop";

    const fileSizeInBytes =
      item.content?.["@_filesize"] ||
      item["@_filesize"] ||
      item.filesize ||
      item.size ||
      item.enclosure?.["@_length"];

    let size = "Unknown";
    if (fileSizeInBytes) {
      size = formatBytes(fileSizeInBytes);
    } else {
      if (edition.toLowerCase() === "desktop") size = "2.6 GB";
      else if (edition.toLowerCase() === "minimal") size = "1.2 GB";
      else if (edition.toLowerCase() === "server") size = "1.8 GB";
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

async function fetchFromSourceForge(): Promise<Release[]> {
  console.log("🌐 [Fetch] Fetching from SourceForge RSS...");

  const response = await fetch(SOURCEFORGE_RSS_URL, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/rss+xml, application/xml, text/xml, */*",
    },
    cache: "no-store", // Force fresh fetch
    next: { revalidate: 0 }, // Disable Next.js cache
  });

  console.log("📡 [Fetch] Response status:", response.status);
  console.log(
    "📋 [Fetch] Response headers:",
    Object.fromEntries(response.headers.entries()),
  );

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
  }

  const xmlText = await response.text();
  console.log("📄 [Fetch] XML length:", xmlText.length);
  console.log("🔍 [Fetch] XML preview:", xmlText.substring(0, 500));

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    removeNSPrefix: true,
  });

  const xmlDoc = parser.parse(xmlText);
  console.log(
    "🗂️ [Parse] Parsed XML structure:",
    JSON.stringify(xmlDoc, null, 2).substring(0, 1000),
  );

  const items = xmlDoc?.rss?.channel?.item ?? [];
  const rawItems = Array.isArray(items) ? items : [items];
  console.log("📦 [Parse] Found items:", rawItems.length);

  const isoReleases = new Map<string, Release>();
  const checksums = new Map<string, string>();

  for (const item of rawItems) {
    console.log("🔍 [Parse] Processing item:", item.title);
    const parsed = parseRssItem(item);

    if (!parsed) {
      console.log("⏭️ [Parse] Skipped item (no match)");
      continue;
    }

    if ("checksumUrl" in parsed) {
      console.log("🔐 [Parse] Found checksum:", parsed.baseName);
      checksums.set(parsed.baseName, parsed.checksumUrl);
    } else if ("name" in parsed) {
      const baseName = item.title.split("(")[0].trim();
      console.log("💿 [Parse] Found ISO:", baseName);
      isoReleases.set(baseName, parsed as Release);
    }
  }

  console.log("📊 [Parse] Total ISOs:", isoReleases.size);
  console.log("📊 [Parse] Total checksums:", checksums.size);

  const combinedReleases: Release[] = [];
  for (const [baseName, release] of isoReleases.entries()) {
    const checksum = checksums.get(baseName);
    if (checksum) {
      release.sha256Url = checksum;
    }
    combinedReleases.push(release);
  }

  const sorted = combinedReleases.sort((a, b) => {
    const dateA = new Date(a.releaseDate);
    const dateB = new Date(b.releaseDate);
    if (dateA.getTime() !== dateB.getTime()) {
      return dateB.getTime() - dateA.getTime();
    }
    return b.version.localeCompare(a.version, undefined, { numeric: true });
  });

  console.log("✅ [Parse] Final releases:", sorted.length);
  return sorted;
}

export async function GET() {
  console.log("🔍 [API] Starting fetch from SourceForge...");
  console.log("🔗 [API] URL:", SOURCEFORGE_RSS_URL);

  try {
    const releases = await fetchFromSourceForge();

    console.log("✅ [API] Fetched releases:", releases.length);
    console.log("📦 [API] Releases:", JSON.stringify(releases, null, 2));

    if (releases.length === 0) {
      console.warn("⚠️ [API] No releases found, using fallback");
      return NextResponse.json(FALLBACK_RELEASES);
    }

    return NextResponse.json(releases);
  } catch (error) {
    console.error("❌ [API] Failed to fetch releases:", error);
    console.error(
      "🔍 [API] Error details:",
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json(FALLBACK_RELEASES);
  }
}
