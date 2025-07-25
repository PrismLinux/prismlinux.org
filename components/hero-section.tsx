import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-50" />
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="float-animation">
            <Image
              src="public/logo.svg"
              alt="PrismLinux Logo"
              width={120}
              height={120}
              className="h-24 w-24 md:h-32 md:w-32"
            />
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              Welcome to <span className="text-primary">PrismLinux</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of Linux with our high-performance, Arch-based distribution optimized for{" "}
              <span className="text-accent">gaming</span>, <span className="text-secondary">programming</span>, and{" "}
              <span className="text-primary">content creation</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="pulse-glow text-lg px-8 py-6" asChild>
              <Link href="/download">
                <Download className="mr-2 h-5 w-5" />
                Download Now
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent" asChild>
              <Link href="/about">
                <Play className="mr-2 h-5 w-5" />
                Learn More
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">⚡</div>
              <div className="text-sm text-muted-foreground">Lightning Fast</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-accent">🔒</div>
              <div className="text-sm text-muted-foreground">Ultra Secure</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-secondary">🎮</div>
              <div className="text-sm text-muted-foreground">Gaming Ready</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">💻</div>
              <div className="text-sm text-muted-foreground">Dev Friendly</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
