import { MainNavItem, SidebarNavItem } from "@/types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}
// TODO: update pages
export const wikiConfig: DocsConfig = {
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
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/wiki",
          items: [],
        },
        {
          title: "Installation",
          href: "/wiki/installation",
          items: [],
        },
      ],
    },
    {
      title: "Documentation",
      items: [
        {
          title: "Package Management",
          href: "/wiki/package-management",
          items: [],
        },
        {
          title: "System Configuration",
          href: "/wiki/system-configuration",
          items: [],
        },
        {
          title: "Troubleshooting",
          href: "/wiki/troubleshooting",
          items: [],
        },
      ],
    },
    {
      title: "Community",
      items: [
        {
          title: "Contributing",
          href: "/docs/contributing",
          items: [],
        },
        {
          title: "Code of Conduct",
          href: "/docs/code-of-conduct",
          items: [],
        },
      ],
    },
  ],
};
