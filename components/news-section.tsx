import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

const news = [
  {
    title: "PrismLinux 2025.8 Released",
    description:
      "Introducing the debut release, showcasing significant advancements in gaming performance, robust security features, and an optimized desktop environment.",
    date: "2025-08-03",
    category: "Release",
  },
]

export function NewsSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Latest <span className="text-primary">News & Updates</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay up to date with the latest PrismLinux developments and community news.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {news.map((item, index) => (
            <Card key={index} className="group hover:glow-effect transition-all duration-300 bg-card/50 backdrop-blur w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{item.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
