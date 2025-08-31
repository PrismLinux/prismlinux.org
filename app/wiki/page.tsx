import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Book,
  Settings,
  Download,
  AlertTriangle,
  Zap,
  Users,
} from "lucide-react";
import { pageMetadata, SITE_CONFIG } from "@/lib/metadata";

export const metadata = pageMetadata.wiki;

// TODO: Create wiki
const categories = [
  {
    name: "Installation",
    icon: Download,
    description: "Complete installation guides and setup instructions",
    articles: [
      {
        title: "Get Started",
        slug: "installation/get-started",
        badge: "Popular",
      },
      {
        title: "Virtual Machine Installation",
        slug: "installation/vm-installation",
        badge: "Guide",
      },
      {
        title: "UEFI vs BIOS",
        slug: "installation/uefi-vs-bios",
        badge: "Guide",
      },
    ],
  },
  {
    name: "Configuration",
    icon: Settings,
    description: "System configuration and customization guides",
    articles: [
      {
        title: "Desktop Environment Setup",
        slug: "configuration/desktop-setup",
        badge: "Guide",
      },
    ],
  },
  {
    name: "Package Management",
    icon: Book,
    description: "Using the Prism package manager and software installation",
    articles: [
      {
        title: "Prism Package Manager",
        slug: "package-management/prism-package-manager",
        badge: "Essential",
      },
      {
        title: "Installing Software",
        slug: "package-management/installing-software",
        badge: "Guide",
      },
      {
        title: "Building from Source",
        slug: "package-management/building-source",
        badge: "Advanced",
      },
    ],
  },
  {
    name: "Troubleshooting",
    icon: AlertTriangle,
    description: "Common issues and their solutions",
    articles: [
      {
        title: "Boot Issues",
        slug: "troubleshooting/boot-issues",
        badge: "Common",
      },
      {
        title: "Graphics Problems",
        slug: "troubleshooting/graphics-problems",
        badge: "Common",
      },
      {
        title: "Audio Troubleshooting",
        slug: "troubleshooting/audio-troubleshooting",
        badge: "Guide",
      },
      {
        title: "Network Issues",
        slug: "troubleshooting/network-issues",
        badge: "Guide",
      },
    ],
  },
];

const quickStartCards = [
  {
    title: "Install PrismLinux",
    icon: Download,
    description: "Get started with PrismLinux installation on your system",
    link: "/wiki/installation/installation-guide",
    color: "text-blue-400",
  },
  {
    title: "Virtual Machine Setup",
    icon: Zap,
    description: "Try PrismLinux safely in a virtual machine environment",
    link: "/wiki/installation/vm-installation",
    color: "text-green-400",
  },
  {
    title: "Package Management",
    icon: Book,
    description: "Learn to use Prism package manager for software installation",
    link: "/wiki/package-management/prism-package-manager",
    color: "text-purple-400",
  },
  {
    title: "Get Help",
    icon: Users,
    description: "Join our community for support and discussions",
    link: "#community",
    color: "text-orange-400",
  },
];

export default function WikiPage() {
  return (
    <div className="container py-20">
      {/* Hero Section */}
      <div className="text-center space-y-6 mb-20">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            PrismLinux Wiki
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive documentation, installation guides, and
            troubleshooting resources for PrismLinux users.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/wiki/installation/installation-guide"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-lg font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
          >
            <Download className="mr-2 h-5 w-5" />
            Get Started
          </Link>
          <Link
            href="#categories"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background/50 backdrop-blur-sm px-6 py-3 text-lg font-medium shadow-lg transition-all hover:bg-accent hover:text-accent-foreground"
          >
            <Book className="mr-2 h-5 w-5" />
            Browse Documentation
          </Link>
        </div>
      </div>

      {/* Search */}
      {/*<div className="max-w-2xl mx-auto mb-16">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search documentation..."
            className="pl-12 h-14 text-lg bg-background/50 backdrop-blur-sm border-border/50"
          />
        </div>
      </div>*/}

      {/* Quick Start Cards */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Quick Start</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStartCards.map((card, index) => (
            <Link key={index} href={card.link}>
              <Card className="h-full hover:glow-effect transition-all duration-300 hover:-translate-y-1 bg-background/50 backdrop-blur-sm border-border/50">
                <CardHeader className="text-center">
                  <div
                    className={`mx-auto w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-4 ${card.color}`}
                  >
                    <card.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div id="categories" className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Documentation Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="hover:glow-effect transition-all duration-300 bg-background/50 backdrop-blur-sm border-border/50"
            >
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  {category.name}
                </CardTitle>
                <CardDescription className="text-base ml-14">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="ml-14">
                <div className="space-y-3">
                  {category.articles.map((article, articleIndex) => (
                    <Link
                      key={articleIndex}
                      href={`/wiki/${article.slug}`}
                      className="block p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {article.title}
                        </span>
                        <Badge
                          variant={
                            article.badge === "Popular"
                              ? "default"
                              : article.badge === "Essential"
                                ? "destructive"
                                : "outline"
                          }
                        >
                          {article.badge}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contributing Section */}
      <div className="text-center">
        <Card className="max-w-4xl mx-auto bg-background/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-3xl">Contributing to the Wiki</CardTitle>
            <CardDescription className="text-lg">
              Help improve our documentation by contributing guides and
              tutorials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our wiki is community-driven and open source. Whether you're
              fixing typos, adding new guides, or improving existing
              documentation, every contribution helps make PrismLinux better for
              everyone.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">Report Issues</h3>
                <p className="text-sm text-muted-foreground">
                  Found a bug or error in the documentation?
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                  <Book className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="font-semibold mb-2">Add Content</h3>
                <p className="text-sm text-muted-foreground">
                  Share your knowledge by writing new guides
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2">Join Community</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with other PrismLinux users and developers
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={
                  SITE_CONFIG.social.gitlab +
                  "linux/prismlinux/websites/prismlinux.org"
                }
                target="_blank"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
              >
                Edit on GitLab
              </Link>
              <Link
                href="/wiki/contributing"
                target="_blank"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 font-medium shadow-lg transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Contribution Guidelines
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Section */}
      <div id="community" className="mt-20">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Community & Support
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <Card className="text-center hover:glow-effect transition-all duration-300 bg-background/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Zap className="h-5 w-5 mr-2 text-purple-400" />
                Discord
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Real-time chat with developers and users
              </p>
              <Link
                href={SITE_CONFIG.social.discord}
                className="text-primary hover:underline"
              >
                Join Discord →
              </Link>
            </CardContent>
          </Card>

          <Card className="text-center hover:glow-effect transition-all duration-300 bg-background/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Book className="h-5 w-5 mr-2 text-green-400" />
                GitLab
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Source code, issues, and development
              </p>
              <Link
                href={SITE_CONFIG.social.gitlab + "linux/prismlinux/"}
                className="text-primary hover:underline"
              >
                View Repository →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
