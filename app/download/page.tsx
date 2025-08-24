import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  HardDrive,
  Monitor,
  CheckCircle,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { fetchReleasesWithFallback } from "./lib/sourseforge";

export const metadata: Metadata = {
  title: "Download PrismLinux - Get Started Today",
  description:
    "Download the latest version of PrismLinux. Multiple download options including ISO with system requirements.",
};

const systemRequirements = [
  {
    component: "Processor",
    requirement: "64-bit x86_64 CPU (2 GHz or faster)",
  },
  { component: "Memory", requirement: "4 GB RAM minimum (6 GB recommended)" },
  { component: "Storage", requirement: "30+ GB available disk space" },
  { component: "Graphics", requirement: "OpenGL 4.0+ compatible" },
  { component: "Network", requirement: "Internet connection for updates" },
];

export default async function DownloadPage() {
  const releases = await fetchReleasesWithFallback();
  const downloadOptions = releases;

  return (
    <div className="container py-20">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-6xl font-bold">
          Download <span className="text-primary">PrismLinux</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose your preferred edition and start your PrismLinux journey today.
        </p>
      </div>

      <div className="flex flex-wrap justify-around gap-8 mb-16">
        {downloadOptions.map((option, index) => (
          <Card
            key={index}
            className="group hover:glow-effect transition-all duration-300 w-full lg:w-96"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge
                  variant={option.type === "stable" ? "default" : "secondary"}
                >
                  {option.type === "stable" ? "Stable" : "Beta"}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  {option.size}
                </div>
              </div>
              <CardTitle className="text-xl">{option.name}</CardTitle>
              <CardDescription>Released: {option.releaseDate}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span className="font-mono">{option.version}</span>
                </div>
                <div className="flex justify-between">
                  <span>Architecture:</span>
                  <span className="font-mono">{option.architecture}</span>
                </div>
                <div className="flex justify-between">
                  <span>Source:</span>
                  <span className="text-xs text-muted-foreground">
                    SourceForge
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Button asChild className="w-full pulse-glow">
                  <a
                    href={option.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Direct Download
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Show all releases section only if there are archived versions */}
      {downloadOptions.length > 2 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">All Releases</h2>
          <Card>
            <CardHeader>
              <CardTitle>Release Archive</CardTitle>
              <CardDescription>
                All available PrismLinux releases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {downloadOptions.map((release, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant={
                          release.type === "stable" ? "default" : "secondary"
                        }
                      >
                        {release.type}
                      </Badge>
                      <div>
                        <div className="font-medium">{release.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {release.size} • {release.releaseDate}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={release.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="mr-2 h-3 w-3" />
                        Download
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Monitor className="mr-2 h-5 w-5 text-primary" />
              System Requirements
            </CardTitle>
            <CardDescription>
              Minimum and recommended system specifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemRequirements.map((req, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{req.component}</div>
                    <div className="text-sm text-muted-foreground">
                      {req.requirement}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HardDrive className="mr-2 h-5 w-5 text-primary" />
              Installation Guide
            </CardTitle>
            <CardDescription>Quick start guide for new users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <div className="font-medium">Download ISO</div>
                  <div className="text-sm text-muted-foreground">
                    Choose your preferred edition above
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <div className="font-medium">Create Bootable USB</div>
                  <div className="text-sm text-muted-foreground">
                    Use Ventoy (Recommended)
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <div className="font-medium">Boot & Install</div>
                  <div className="text-sm text-muted-foreground">
                    Follow the graphical installer
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              View Full Installation Guide
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* SourceForge Integration Status */}
      <div className="mt-16 text-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <ExternalLink className="h-4 w-4" />
              <span>Downloads hosted on</span>
              <a
                href="https://sourceforge.net/projects/prismlinux/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                SourceForge
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
