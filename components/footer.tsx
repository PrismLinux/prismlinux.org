import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, MessageCircle, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">PrismLinux</h3>
            <p className="text-sm text-muted-foreground">
              High-performance Arch-based distribution for gaming, programming, and content creation.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/download" className="text-muted-foreground hover:text-primary transition-colors">
                  Download
                </Link>
              </li>
              <li>
                <Link href="/wiki" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Community</h4>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://discord.gg/prismlinux">
                  <MessageCircle className="h-4 w-4" />
                  <span className="sr-only">Discord</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://gitlab.com/crystalnetwork-studio/">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitLab</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Support Development</h4>
            <Button variant="outline" size="sm" className="bg-transparent" asChild>
              <Link href="/support">
                <Heart className="mr-2 h-4 w-4" />
                Sponsor
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2025 CrystalNetwork Studio. All rights reserved.</p>
          <Link
            href="https://gitlab.com/crystalnetwork-studio/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            CrystalNetwork Studio
          </Link>
        </div>
      </div>
    </footer>
  )
}
