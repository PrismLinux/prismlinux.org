import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Book, Settings, Download, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "PrismLinux Wiki - Documentation and Guides",
  description: "Comprehensive documentation, installation guides, and troubleshooting resources for PrismLinux.",
}

const categories = [
  {
    name: "Installation",
    icon: Download,
    description: "Complete installation guides and setup instructions",
    articles: [
      { title: "Installation Guide", slug: "installation-guide" },
      { title: "Virtual Machine Installation", slug: "vm-installation" },
      { title: "UEFI vs BIOS", slug: "uefi-vs-bios" },
    ],
  },
  {
    name: "Configuration",
    icon: Settings,
    description: "System configuration and customization guides",
    articles: [
      { title: "Desktop Environment Setup", slug: "desktop-setup" },
    ],
  },
  {
    name: "Package Management",
    icon: Book,
    description: "Using the Prism package manager and software installation",
    articles: [
      { title: "Prism Package Manager", slug: "prism-package-manager" },
      { title: "Installing Software", slug: "installing-software" },
      { title: "Building from Source", slug: "building-source" },
    ],
  },
  {
    name: "Troubleshooting",
    icon: AlertTriangle,
    description: "Common issues and their solutions",
    articles: [
      { title: "Boot Issues", slug: "boot-issues" },
      { title: "Graphics Problems", slug: "graphics-problems" },
      { title: "Audio Troubleshooting", slug: "audio-troubleshooting" },
      { title: "Network Issues", slug: "network-issues" },
    ],
  },
]

export default function WikiPage() {
  return (
    <div className="container py-20">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-6xl font-bold">
          PrismLinux <span className="text-primary">Wiki</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Comprehensive documentation, guides, and troubleshooting resources for PrismLinux users.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-16">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search documentation..." className="pl-10 h-12 text-lg" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category, index) => (
          <Card key={index} className="hover:glow-effect transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <category.icon className="mr-3 h-6 w-6 text-primary" />
                {category.name}
              </CardTitle>
              <CardDescription className="text-base">{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.articles.map((article, articleIndex) => (
                  <Link
                    key={articleIndex}
                    href={`/wiki/${article.slug}`}
                    className="block p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{article.title}</span>
                      <Badge variant="outline">Guide</Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Contributing to the Wiki</CardTitle>
            <CardDescription>Help improve our documentation by contributing guides and tutorials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Our wiki is community-driven and open source. If you'd like to contribute documentation, fix errors, or
              add new guides, we welcome your contributions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://gitlab.com/crystalnetwork-studio/"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Edit on GitLab
              </Link>
              <Link
                href="/wiki/contributing"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Contribution Guidelines
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
