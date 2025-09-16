import type { Metadata } from "next";

export const SITE_CONFIG = {
  name: "PrismLinux",
  description:
    "High-performance Arch-based distribution for gaming, programming, and content creation.",
  url: "https://prismlinux.org",
  author: "CrystalNetwork Studio",
  keywords: [
    "Linux",
    "Arch Linux",
    "PrismLinux",
    "Gaming",
    "Programming",
    "Content Creation",
    "Security",
    "Performance",
  ] as string[],
  social: {
    discord: "https://discord.gg/hMrWsTpdqw",
    gitlab: "https://gitlab.com/crystalnetwork-studio/",
  },
};

// Base metadata for the entire site
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.name,
    template: `%s`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.author }],
  creator: SITE_CONFIG.author,
  publisher: SITE_CONFIG.author,

  // Icons
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  // OpenGraph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - ${SITE_CONFIG.description}`,
      },
    ],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

// Function to create metadata for specific pages
export function createPageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  images = ["/og-image.png"],
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  images?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const allKeywords = [...SITE_CONFIG.keywords, ...keywords];

  return {
    title,
    description,
    keywords: allKeywords,

    openGraph: {
      title,
      description,
      url,
      images: images.map((image) => ({
        url: image,
        width: 1200,
        height: 630,
        alt: `${title} - ${SITE_CONFIG.name}`,
      })),
    },

    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,

    alternates: {
      canonical: url,
    },
  };
}

// Ready-made metadata for main pages
export const pageMetadata = {
  home: createPageMetadata({
    title: "High-Performance Arch-Based Distribution",
    description:
      "Experience the future of Linux with PrismLinux - optimized for gamers, developers, and creators.",
    keywords: [
      "Linux distribution",
      "Arch Linux",
      "Gaming Linux",
      "Developer tools",
    ],
  }),

  about: createPageMetadata({
    title: "About PrismLinux",
    description:
      "Discover the vision, mission, and people behind PrismLinux. Meet our team and learn about our technology stack.",
    path: "/about",
    keywords: ["team", "mission", "philosophy", "technology stack"],
  }),

  download: createPageMetadata({
    title: "Download PrismLinux",
    description:
      "Download the latest version of PrismLinux. Get installation guides, system requirements, and checksums.",
    path: "/download",
    keywords: ["download", "install", "ISO", "system requirements"],
  }),

  wiki: createPageMetadata({
    title: "PrismLinux Documentation",
    description:
      "Complete documentation for PrismLinux. Installation guides, configuration tips, and troubleshooting.",
    path: "/wiki",
    keywords: [
      "documentation",
      "wiki",
      "guides",
      "tutorials",
      "troubleshooting",
    ],
  }),

  support: createPageMetadata({
    title: "Support & Community",
    description:
      "Get help with PrismLinux. Join our community, report bugs, and access support resources.",
    path: "/support",
    keywords: ["support", "community", "help", "discord", "forum"],
  }),

  terms: createPageMetadata({
    title: "Terms of Service",
    description:
      "Read the terms and conditions for using PrismLinux, an open-source Linux distribution focused on security and privacy.",
    path: "/terms",
    keywords: [
      "terms of service",
      "legal",
      "privacy",
      "open source",
      "license",
      "CrystalNetwork Studio",
    ],
  }),
} as const;
