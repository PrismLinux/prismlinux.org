import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Edit, Calendar, User } from "lucide-react"

// This would typically come from a CMS or markdown files
const articles = {
  "installation-guide": {
    title: "PrismLinux Installation Guide",
    description: "Complete step-by-step guide to installing PrismLinux on your system",
    content: `
# PrismLinux Installation Guide

Welcome to the comprehensive PrismLinux installation guide. This guide will walk you through the entire installation process step by step.

## Prerequisites

Before you begin, make sure you have:

- A USB drive with at least 4GB of space
- A computer that meets the system requirements
- A stable internet connection
- Backup of important data

## Step 1: Download PrismLinux

Visit our [download page](/download) and choose the edition that best fits your needs:

- **Standard Edition**: For general use
- **Gaming Edition**: Optimized for gaming
- **Developer Edition**: Pre-configured for development

## Step 2: Create Bootable USB

### Using Rufus (Windows)

1. Download and install Rufus
2. Insert your USB drive
3. Select the PrismLinux ISO file
4. Click "Start" to create the bootable USB

### Using Etcher (Cross-platform)

1. Download and install Balena Etcher
2. Select the ISO file
3. Select your USB drive
4. Click "Flash"

### Using dd (Linux/macOS)

\`\`\`bash
sudo dd if=prismlinux.iso of=/dev/sdX bs=4M status=progress
\`\`\`

## Step 3: Boot from USB

1. Insert the USB drive into your computer
2. Restart your computer
3. Enter BIOS/UEFI settings (usually F2, F12, or Delete)
4. Set USB as the first boot device
5. Save and exit

## Step 4: Start Installation

1. Select "Install PrismLinux" from the boot menu
2. Choose your language and keyboard layout
3. Connect to Wi-Fi if needed

## Step 5: Disk Partitioning

### Automatic Partitioning (Recommended)

- Select "Erase disk and install PrismLinux"
- Choose your disk
- The installer will create optimal partitions automatically

### Manual Partitioning (Advanced)

Create the following partitions:

- **EFI System Partition**: 512MB (if using UEFI)
- **Root Partition**: At least 20GB (ext4 or btrfs)
- **Home Partition**: Remaining space (optional)
- **Swap Partition**: Equal to RAM size (optional)

## Step 6: User Account Setup

1. Enter your full name
2. Choose a username
3. Set a strong password
4. Enable automatic login if desired

## Step 7: Installation

The installation process will:

1. Copy files to your hard drive
2. Install the bootloader
3. Configure the system
4. Install updates

This process typically takes 15-30 minutes.

## Step 8: First Boot

1. Remove the USB drive
2. Restart your computer
3. Log in with your credentials
4. Complete the initial setup wizard

## Post-Installation

### Update Your System

\`\`\`bash
sudo prism update
sudo prism upgrade
\`\`\`

### Install Additional Software

\`\`\`bash
sudo prism install firefox vlc gimp
\`\`\`

### Enable Firewall

\`\`\`bash
sudo ufw enable
\`\`\`

## Troubleshooting

### Boot Issues

If you encounter boot issues:

1. Check BIOS/UEFI settings
2. Disable Secure Boot temporarily
3. Try different USB ports
4. Recreate the bootable USB

### Graphics Issues

If you have graphics problems:

1. Boot with "nomodeset" parameter
2. Install proprietary drivers after installation
3. Check our [graphics troubleshooting guide](/wiki/graphics-problems)

## Getting Help

If you need assistance:

- Visit our [community forum](https://forum.prismlinux.org)
- Join our [Discord server](https://discord.gg/prismlinux)
- Check our [troubleshooting guides](/wiki)

Congratulations! You've successfully installed PrismLinux. Welcome to the community!
    `,
    lastModified: "2025-01-15",
    author: "PrismLinux Team",
    category: "Installation",
  },
}

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articles[params.slug as keyof typeof articles]

  if (!article) {
    return {
      title: "Article Not Found - PrismLinux Wiki",
    }
  }

  return {
    title: `${article.title} - PrismLinux Wiki`,
    description: article.description,
  }
}

export default function WikiArticlePage({ params }: Props) {
  const article = articles[params.slug as keyof typeof articles]

  if (!article) {
    notFound()
  }

  return (
    <div className="container py-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/wiki">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Wiki
            </Link>
          </Button>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{article.category}</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold">{article.title}</h1>

            <p className="text-xl text-muted-foreground">{article.description}</p>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <User className="mr-1 h-4 w-4" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {new Date(article.lastModified).toLocaleDateString()}
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`https://gitlab.com/crystalnetwork/prismlinux-wiki/edit/main/${params.slug}.md`}>
                  <Edit className="mr-1 h-4 w-4" />
                  Edit Page
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(/^# /gm, "## ")
                  .replace(/^## /gm, "### ")
                  .replace(/^### /gm, "#### ")
                  .split("\n")
                  .map((line) => {
                    if (line.startsWith("```")) {
                      return line.includes("```bash")
                        ? '<pre class="code-block"><code>'
                        : line.includes("```") && !line.includes("bash")
                          ? "</code></pre>"
                          : line
                    }
                    if (line.startsWith("#### ")) {
                      return `<h4 class="text-xl font-bold mt-8 mb-4 text-primary">${line.slice(5)}</h4>`
                    }
                    if (line.startsWith("### ")) {
                      return `<h3 class="text-2xl font-bold mt-8 mb-4 text-primary">${line.slice(4)}</h3>`
                    }
                    if (line.startsWith("## ")) {
                      return `<h2 class="text-3xl font-bold mt-8 mb-6 text-primary">${line.slice(3)}</h2>`
                    }
                    if (line.startsWith("- ")) {
                      return `<li class="ml-4">${line.slice(2)}</li>`
                    }
                    if (line.trim() === "") {
                      return "<br>"
                    }
                    return `<p class="mb-4 text-muted-foreground">${line}</p>`
                  })
                  .join(""),
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
