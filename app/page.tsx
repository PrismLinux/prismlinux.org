import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ScreenshotsSection } from "@/components/screenshots-section"
import { NewsSection } from "@/components/news-section"
import { SupportSection } from "@/components/support-section"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <ScreenshotsSection />
      <NewsSection />
      <SupportSection />
    </div>
  )
}
