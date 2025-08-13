import { MainNavItem, SidebarNavItem } from "@/types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
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
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
      ],
    },
    {
      title: "Documentation",
      items: [
        {
          title: "Package Management",
          href: "/docs/package-management",
          items: [],
        },
        {
          title: "System Configuration",
          href: "/docs/system-configuration",
          items: [],
        },
        {
          title: "Troubleshooting",
          href: "/docs/troubleshooting",
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
}
