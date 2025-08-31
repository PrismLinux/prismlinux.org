import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Gitlab,
  Download,
  BookOpen,
  Info,
  Sparkles,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/metadata";

const LINKS = {
  navigation: [
    { href: "/download", label: "Download", icon: Download },
    { href: "/wiki", label: "Documentation", icon: BookOpen },
    { href: "/about", label: "About", icon: Info },
  ],
  social: [
    {
      href: SITE_CONFIG.social.discord,
      icon: MessageCircle,
      label: "Discord",
    },
    {
      href: SITE_CONFIG.social.gitlab + "linux/prismlinux/",
      icon: Gitlab,
      label: "GitLab",
    },
  ],
} as const;

const COMPANY = {
  name: "PrismLinux",
  description:
    "High-performance Arch-based distribution for gaming, programming, and content creation.",
  studio: "CrystalNetwork Studio",
  studioUrl: SITE_CONFIG.social.gitlab,
  year: new Date().getFullYear(),
} as const;

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-border/40 bg-background/95 overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative container py-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Brand Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {COMPANY.name}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm text-center sm:text-left max-w-xs">
              High-performance Arch Linux for creators
            </p>
          </div>

          {/* Navigation & Social */}
          <div className="flex items-center gap-6 lg:gap-8">
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {LINKS.social.map(({ href, icon: Icon, label }) => (
                <Button
                  key={href}
                  variant="outline"
                  size="icon"
                  asChild
                  className="h-8 w-8 transition-all duration-300 hover:scale-110"
                >
                  <Link href={href} aria-label={label}>
                    <Icon className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 pt-6 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-muted-foreground">
            © {COMPANY.year} {COMPANY.studio}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href={COMPANY.studioUrl}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {COMPANY.studio}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
