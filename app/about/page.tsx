import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Users, Code, Shield, Zap, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About PrismLinux - Our Vision and Mission",
  description:
    "Learn about PrismLinux vision, mission, and the team behind this innovative Arch-based Linux distribution.",
};

const teamMembers = [
  {
    name: "Volodia Kraplich",
    role: "Lead Developer",
    description:
      "System architect and Software Engineer with 2+ year in Linux development.",
  },
  {
    name: "Rain Xelelo",
    role: "Developer",
    description: "Discord maintainer and Software Developer.",
  },
];

const technologies = [
  {
    name: "ArchLinux Base",
    icon: "🏗️",
    description: "Rolling release foundation",
  },
  { name: "GoLang", icon: "🐹", description: "High-performance backend" },
  { name: "Rust", icon: "🦀", description: "Memory-safe system programming" },
  {
    name: "Prism Package Manager",
    icon: "📦",
    description: "Enhanced pacman alternative",
  },
  {
    name: "Linux Kernel",
    icon: "🐧",
    description: "Latest stable kernel Cachy or Linux-Zen/Linux",
  },
  { name: "GRUB", icon: "🚀", description: "Advanced bootloader" },
];

export default function AboutPage() {
  return (
    <div className="container py-20">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-6xl font-bold">
          About <span className="text-primary">PrismLinux</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover the vision, mission, and people behind PrismLinux.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <Card className="hover:glow-effect transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Target className="mr-3 h-6 w-6 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              PrismLinux was created to bridge the gap between performance,
              security, and usability in the Linux ecosystem. We believe that
              users shouldn't have to choose between a system that's fast,
              secure, or easy to use.
            </p>
            <p className="text-muted-foreground">
              Our mission is to provide a Linux distribution that excels in all
              areas - from gaming performance to development workflows, from
              content creation to system security.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:glow-effect transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Heart className="mr-3 h-6 w-6 text-primary" />
              Our Philosophy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We believe in the power of open source and community-driven
              development. PrismLinux is built by users, for users, with
              transparency and collaboration at its core.
            </p>
            <p className="text-muted-foreground">
              Every decision we make is guided by three principles: performance
              optimization, security hardening, and user experience enhancement.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Why We Created <span className="text-primary">PrismLinux</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center hover:glow-effect transition-all duration-300">
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mx-auto" />
              <CardTitle>Performance First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Existing distributions often compromise performance for
                compatibility. We optimized every component for maximum speed
                and efficiency.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:glow-effect transition-all duration-300">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mx-auto" />
              <CardTitle>Security by Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Security shouldn't be an afterthought. PrismLinux implements
                security best practices from the ground up, protecting users
                without compromising usability.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:glow-effect transition-all duration-300">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto" />
              <CardTitle>Community Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We listen to our community and build features that users
                actually need. Every update is shaped by real user feedback and
                requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Meet the <span className="text-primary">Team</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="hover:glow-effect transition-all duration-300 w-full max-w-lg"
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <CardTitle>{member.name}</CardTitle>
                    <Badge variant="secondary">{member.role}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Technology <span className="text-primary">Stack</span>
        </h2>

        {/* Option 1: Modern Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <Card
              key={index}
              className="group hover:glow-effect transition-all duration-300 hover:scale-105 bg-gradient-to-br from-background to-background/50 border-2 hover:border-primary/50"
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary">
                  {tech.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {tech.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
