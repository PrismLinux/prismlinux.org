import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function ScreenshotsSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/20">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold neon-text">
            Beautiful <span className="text-primary">Desktop Environment</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience a modern, customizable desktop that adapts to your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="overflow-hidden group hover:glow-effect transition-all duration-300">
            <CardContent className="p-0">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="PrismLinux Desktop Environment"
                width={600}
                height={400}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
            </CardContent>
          </Card>

          <Card className="overflow-hidden group hover:glow-effect transition-all duration-300">
            <CardContent className="p-0">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="PrismLinux Gaming Setup"
                width={600}
                height={400}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
            </CardContent>
          </Card>

          <Card className="overflow-hidden group hover:glow-effect transition-all duration-300">
            <CardContent className="p-0">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="PrismLinux Development Environment"
                width={600}
                height={400}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
            </CardContent>
          </Card>

          <Card className="overflow-hidden group hover:glow-effect transition-all duration-300">
            <CardContent className="p-0">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="PrismLinux Content Creation"
                width={600}
                height={400}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
