import { FeaturesSection } from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";
import { ScreenshotsSection } from "@/components/screenshots-section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata.home;

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <ScreenshotsSection />
      {/*<NewsSection />*/}
      {/*<SupportSection />*/}
    </div>
  );
}
