import { pageMetadata } from "@/lib/metadata";
import TermsPageClient from "./client";

export const metadata = pageMetadata.terms;

export default function TermsPage() {
  return <TermsPageClient />;
}