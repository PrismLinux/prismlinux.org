import { pageMetadata } from "@/lib/metadata";
import GitCommitClient from "./client";

export const metadata = {
  title: "Git Commits | PrismLinux",
  description: "Latest commits from the PrismLinux repository.",
};

export default function GitCommitPage() {
  return <GitCommitClient />;
}