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
      title: "About",
      href: "/about",
    },
    // {
    //   title: "Wiki",
    //   href: "/wiki",
    // },
  ],
};

export type SiteConfig = typeof siteConfig;
