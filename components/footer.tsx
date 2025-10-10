import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/metadata";
import { Github, Gitlab, Sparkles } from "lucide-react";
import Link from "next/link";

const LINKS = {
  social: [
    {
      href: SITE_CONFIG.social.discord,
      icon: DiscordIcon,
      label: "Discord",
    },
    {
      href: SITE_CONFIG.social.github,
      icon: Github,
      label: "GitHub",
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

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z M8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

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
              <h3 className="text-xl font-bold text-foreground">{COMPANY.name}</h3>
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
                  className="h-10 w-10 transition-all duration-300 hover:scale-110 hover:bg-primary/10 hover:border-primary group"
                >
                  <Link href={href} aria-label={label}>
                    <Icon className="h-4.5 w-4.5 text-foreground group-hover:text-primary transition-colors duration-300" />
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
