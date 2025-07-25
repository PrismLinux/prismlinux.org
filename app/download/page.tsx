import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, HardDrive, Monitor, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Download PrismLinux - Get Started Today",
  description:
    "Download the latest version of PrismLinux. Multiple download options including ISO with system requirements.",
}

const downloadOptions = [
  {
    name: "PrismLinux 2025.8 (Stable)",
    description: "Classic Version",
    size: "2.5 GB",
    architecture: "x86_64",
    checksum: "sha256: ??",
    downloadUrl: "#",
  },
]

const systemRequirements = [
  { component: "Processor", requirement: "64-bit x86_64 CPU (2 GHz or faster)" },
  { component: "Memory", requirement: "4 GB RAM minimum (8 GB recommended)" },
  { component: "Storage", requirement: "20 GB available disk space" },
  { component: "Graphics", requirement: "OpenGL 4.0+ compatible" },
  { component: "Network", requirement: "Internet connection for updates" },
]

export default function DownloadPage() {
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
          <Card key={index} className="group hover:glow-effect transition-all duration-300 w-full lg:w-96">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">Latest</Badge>
                <div className="text-sm text-muted-foreground">{option.size}</div>
              </div>
              <CardTitle className="text-xl">{option.name}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Architecture:</span>
                  <span className="font-mono">{option.architecture}</span>
                </div>
                <div className="flex justify-between">
                  <span>Checksum:</span>
                  <span className="font-mono text-xs">{option.checksum}</span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Button className="w-full pulse-glow">
                  <Download className="mr-2 h-4 w-4" />
                  Direct Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Monitor className="mr-2 h-5 w-5 text-primary" />
              System Requirements
            </CardTitle>
            <CardDescription>Minimum and recommended system specifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemRequirements.map((req, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{req.component}</div>
                    <div className="text-sm text-muted-foreground">{req.requirement}</div>
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
                  <div className="text-sm text-muted-foreground">Choose your preferred edition above</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <div className="font-medium">Create Bootable USB</div>
                  <div className="text-sm text-muted-foreground">Use Ventoy (Recommended)</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <div className="font-medium">Boot & Install</div>
                  <div className="text-sm text-muted-foreground">Follow the graphical installer</div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              View Full Installation Guide
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
