"use client";

import type { Metadata } from "next";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Release, FALLBACK_RELEASES } from "../../lib/sourseforge";
import {
  Download,
  HardDrive,
  Monitor,
  CheckCircle,
  ExternalLink,
  RefreshCw,
  Star,
  Zap,
  Info,
} from "lucide-react";
import { fetchReleases } from ".";

// --- Constants & Static Data ---
const SYSTEM_REQUIREMENTS = [
  {
    component: "Processor",
    requirement: "64-bit x86_64 CPU (2 GHz or faster)",
  },
  {
    component: "Memory",
    requirement: "4 GB RAM minimum (8 GB recommended for best performance)",
  },
  {
    component: "Storage",
    requirement: "30 GB of available space (SSD recommended)",
  },
  {
    component: "Graphics",
    requirement: "OpenGL 4.0+ compatible graphics card",
  },
  {
    component: "Network",
    requirement: "Internet connection for updates and package management",
  },
];

const INSTALLATION_STEPS = [
  {
    title: "Download the ISO",
    description: "Choose your preferred edition from the options above.",
  },
  {
    title: "Create a Bootable USB",
    description:
      "Use a tool like Ventoy or BalenaEtcher to flash the ISO to a USB drive.",
  },
  {
    title: "Boot and Install",
    description:
      "Restart your computer, boot from the USB, and follow the on-screen installer.",
  },
];

function DownloadCard({ release }: { release: Release }) {
  const isStable = release.type === "stable";
  const accentColor = isStable ? "green" : "blue";

  return (
    <Card
      className={`group hover:shadow-lg transition-shadow duration-300 w-full lg:w-96 ${
        isStable
          ? "border-green-200 dark:border-green-800"
          : "border-blue-200 dark:border-blue-800"
      }`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">{release.name}</CardTitle>
          <div className="text-sm text-muted-foreground font-mono">
            {release.size}
          </div>
        </div>
        <CardDescription>Released: {release.releaseDate}</CardDescription>
        <div
          className={`text-xs font-medium flex items-center ${
            isStable
              ? "text-green-600 dark:text-green-400"
              : "text-blue-600 dark:text-blue-400"
          }`}
        >
          {isStable ? (
            <CheckCircle className="w-4 h-4 mr-1.5" />
          ) : (
            <Info className="w-4 h-4 mr-1.5" />
          )}
          {isStable
            ? "Recommended for general use"
            : "May contain experimental features"}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm border-t pt-4">
          <div className="flex justify-between">
            <span>Version:</span>
            <span className="font-mono">{release.version}</span>
          </div>
          <div className="flex justify-between">
            <span>Architecture:</span>
            <span className="font-mono">{release.architecture}</span>
          </div>
          <div className="flex justify-between">
            <span>Source:</span>
            <span>SourceForge</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <Button
            asChild
            className={`w-full text-white ${
              isStable
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <a
              href={release.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 h-4 w-4" /> Download ISO{" "}
              <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </Button>
          {release.sha256Url && (
            <Button asChild variant="outline" size="sm" className="w-full">
              <a
                href={release.sha256Url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                Download SHA256 Checksum
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6 text-center">
        <RefreshCw className="w-8 h-8 mx-auto mb-4 text-muted-foreground animate-spin" />
        <p className="text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}

function ReleaseSection({
  title,
  description,
  releases,
  emptyMessage,
  accentColor,
}: {
  title: string;
  description: string;
  releases: Release[];
  emptyMessage: string;
  accentColor: "green" | "blue";
}) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2
          className={`text-2xl font-bold ${
            accentColor === "green"
              ? "text-green-600 dark:text-green-400"
              : "text-blue-600 dark:text-blue-400"
          }`}
        >
          {title}
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">{description}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {releases.length > 0 ? (
          releases.map((release) => (
            <DownloadCard key={release.version} release={release} />
          ))
        ) : (
          <EmptyState message={emptyMessage} />
        )}
      </div>
    </div>
  );
}

function ReleaseTabs({ stable, beta }: { stable: Release[]; beta: Release[] }) {
  return (
    <Tabs
      defaultValue={stable.length > 0 ? "stable" : "beta"}
      className="w-full mb-20"
    >
      <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
        <TabsTrigger value="stable" className="flex items-center space-x-2">
          <Star className="w-4 h-4" />
          <span>Stable</span>
        </TabsTrigger>
        <TabsTrigger value="beta" className="flex items-center space-x-2">
          <Zap className="w-4 h-4" />
          <span>Beta</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="stable">
        <ReleaseSection
          title="Stable Release"
          description="The most reliable version, tested for production use. Recommended for most users."
          releases={stable}
          emptyMessage="No stable release available yet. Please check the beta channel."
          accentColor="green"
        />
      </TabsContent>
      <TabsContent value="beta">
        <ReleaseSection
          title="Beta Release"
          description="Get a sneak peek at the latest features. Your feedback helps us shape the future of PrismLinux."
          releases={beta}
          emptyMessage="No beta release is available at the moment."
          accentColor="blue"
        />
      </TabsContent>
    </Tabs>
  );
}

// --- Main Page Component ---
export default function DownloadPage() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchReleases();
        setReleases(data);
      } catch (error) {
        console.warn("Failed to fetch releases, using fallback", error);
        setReleases(FALLBACK_RELEASES);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const latestStable = releases.find((r) => r.type === "stable");
  const latestBeta = releases.find((r) => r.type === "beta");

  const stableForTabs = latestStable ? [latestStable] : [];
  const betaForTabs = latestBeta ? [latestBeta] : [];

  // While loading - show fallback
  if (loading) {
    return (
      <div className="container py-20">
        <header className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold">
            Download <span className="text-primary">PrismLinux</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fetching the latest releases...
          </p>
        </header>
        <div className="flex justify-center">
          <EmptyState message="Loading latest releases..." />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-20">
      <header className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-6xl font-bold">
          Download <span className="text-primary">PrismLinux</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose your preferred edition and begin your journey with a modern,
          efficient Linux distribution.
        </p>
      </header>

      <main>
        <ReleaseTabs stable={stableForTabs} beta={betaForTabs} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* System Requirements Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Monitor className="mr-2 h-5 w-5 text-primary" />
                System Requirements
              </CardTitle>
              <CardDescription>
                Ensure your hardware meets these specifications for a smooth
                experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {SYSTEM_REQUIREMENTS.map((req) => (
                  <li
                    key={req.component}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">{req.component}:</span>
                      <span className="text-sm text-muted-foreground ml-1.5">
                        {req.requirement}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Installation Guide Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HardDrive className="mr-2 h-5 w-5 text-primary" />
                Installation Guide
              </CardTitle>
              <CardDescription>
                A quick start guide to get PrismLinux up and running.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {INSTALLATION_STEPS.map((step, index) => (
                  <div key={step.title} className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{step.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {step.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                View Full Installation Guide
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="text-center">
        <a
          href="https://sourceforge.net/projects/prismlinux/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Downloads are securely hosted on SourceForge</span>
        </a>
      </footer>
    </div>
  );
}
