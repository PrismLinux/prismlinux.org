import { pageMetadata } from "@/lib/metadata";
import { getLatestReleases } from "@/lib/sourseforge";
import DownloadPageClient from "./client";

export const metadata = pageMetadata.download;

export default function DownloadPage() {
  return <DownloadPageClient />;
}

/**
 * Server-side function to fetch PrismLinux releases
 *
 * This function acts as a bridge between the client component and the
 * SourceForge API. It's exported so that the client component can call
 * it to retrieve the latest release information.
 *
 * The function handles:
 * - Fetching data from SourceForge RSS feed
 * - Parsing XML response into structured Release objects
 * - Fallback to static data if the API is unavailable
 * - Error handling and logging
 *
 * @returns Promise<Release[]> Array of available PrismLinux releases
 */
export async function fetchReleases() {
  return await getLatestReleases();
}
