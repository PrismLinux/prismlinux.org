export const siteConfig = {
  name: "PrismLinux",
  url: "https://prismlinux.org",
  ogImage: "https://prismlinux.org/og.jpg",
  description:
    "PrismLinux is a cutting-edge Arch Linux-based distribution optimized for speed, security, gaming, programming, and content creation.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Download",
      href: "/download",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Wiki",
      href: "/wiki",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}

export type SiteConfig = typeof siteConfig
