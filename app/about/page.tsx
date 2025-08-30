import type { Metadata } from "next";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Target,
  Users,
  Code,
  Shield,
  Zap,
  Heart,
  Github,
  Instagram,
} from "lucide-react";

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
    // avatar: "/team/volodia.jpg",
    github: "https://github.com/VolodiaKraplich",
    gitlab: "https://gitlab.com/VolodiaKraplich",
  },
  {
    name: "Rain Xelelo",
    role: "Developer",
    description: "Discord maintainer and Software Developer.",
    // avatar: "/team/rain.jpg",
    github: "https://github.com/rxelelo",
    gitlab: "https://gitlab.com/rxelelo",
  },
  /*{
    name: "Example",
    role: "Developer",
    description: "",
    avatar: "/team/picture.jpg",
    github: "https://github.com/",
    gitlab: "https://gitlab.com/",
    instagram: "https://instagram.com/",
  }, */
];

const technologies = [
  {
    name: "ArchLinux Base",
    icon: "🏗️",
    description: "Rolling release foundation",
  },
  // { name: "GoLang", icon: "🐹", description: "High-performance backend" },
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
              className="hover:glow-effect transition-all duration-300 w-full max-w-lg group hover:scale-105"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="relative">
                      {member.avatar ? (
                        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300">
                          <Image
                            src={member.avatar}
                            alt={`${member.name} profile picture`}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-xl ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                        {member.name}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {member.role}
                      </Badge>
                    </div>
                  </div>

                  {/* Social Media Links - Top Right */}
                  {(member.github || member.gitlab || member.instagram) && (
                    <div className="flex gap-1 ml-4">
                      {member.github && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          asChild
                        >
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4" />
                            <span className="sr-only">GitHub</span>
                          </a>
                        </Button>
                      )}
                      {member.gitlab && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          asChild
                        >
                          <a
                            href={member.gitlab}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51 1.22 3.78a.84.84 0 0 1-.3.92z" />
                            </svg>
                            <span className="sr-only">GitLab</span>
                          </a>
                        </Button>
                      )}
                      {member.instagram && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          asChild
                        >
                          <a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Instagram className="h-4 w-4" />
                            <span className="sr-only">Instagram</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
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
