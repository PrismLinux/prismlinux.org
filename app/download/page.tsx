import { pageMetadata } from "@/lib/metadata";
import DownloadPageClient from "./client";

export const metadata = pageMetadata.download;

export default function DownloadPage() {
  return <DownloadPageClient />;
}
