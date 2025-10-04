export const siteConfig = {
  name: "PrismLinux",
  url: "https://prismlinux.org",
  ogImage: "https://prismlinux.org/logo.svg",
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
      title: "Wiki",
      href: "/wiki",
    },
    {
      title: "Terms",
      href: "/terms",
    },
    {
      title: "About",
      href: "/about",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
