import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pageMetadata } from "@/lib/metadata";
import { Github, Heart, Instagram, Shield, Target, Users, Youtube, Zap } from "lucide-react";
import Image from "next/image";

export const metadata = pageMetadata.about;

const teamMembers = [
  {
    name: "Volodia Kraplich",
    role: "Lead Developer",
    description:
      "Software/System Engineer with 2+ years crafting high-performance Linux solutions. Founder of CrystalNetwork Studio, dedicated to building robust systems and pushing technical boundaries.",
    github: "https://github.com/VolodiaKraplich",
    gitlab: "https://gitlab.com/VolodiaKraplich",
    instagram: "https://instagram.com/volodiakraplich",
    youtube: "https://www.youtube.com/@VolodiaKraplich"
  },
  {
    name: "Vladimir Banov",
    role: "Translator",
    description:
      "Responsible for localization and translation efforts, ensuring PrismLinux is accessible to a global audience. Also active in community support and Discord maintenance. Developer with multiple projects in the Minecraft ecosystem.",
    avatar: "/team/vladimir-banov.jpeg",
    github: "https://github.com/BANSAFAn",
    gitlab: "https://gitlab.com/baneronetwo",
    youtube: "https://www.youtube.com/@Baneronetwo",
  },
];

const technologies = [
  {
    name: "ArchLinux Base",
    icon: "🏗️",
    description: "Rolling release foundation",
  },
  {
    name: "Prism Package Manager",
    icon: "📦",
    description: "Enhanced pacman alternative",
  },
  {
    name: "Linux Kernel",
    icon: "🐧",
    description: "Latest stable kernel Cachy, Linux-Zen/Linux",
  },
  {
    name: "GRUB",
    icon: "🚀",
    description: "Advanced bootloader",
  },
  {
    name: "Rust & Go",
    icon: "⚡",
    description: "Performance-critical tools built with modern languages",
  },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Dynamic background  */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary/5 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 20}px`,
                height: `${Math.random() * 100 + 20}px`,
                animationDuration: `${Math.random() * 5 + 5}s`,
                opacity: Math.random() * 0.3 + 0.1
              }}
            />
          ))}
        </div>
      </div>

      {/* Content in center, with spaces */}
      <div className="container py-20 relative z-10">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold">
            About <span className="text-primary">PrismLinux</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the vision, mission, and people behind PrismLinux.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="group hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Target className="mr-3 h-6 w-6 text-primary group-hover:animate-pulse" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                PrismLinux was created to bridge the gap between performance, security, and usability
                in the Linux ecosystem. We believe that users shouldn't have to choose between a
                system that's fast, secure, or easy to use.
              </p>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Our mission is to provide a Linux distribution that excels in all areas - from gaming
                performance to development workflows, from content creation to system security.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Heart className="mr-3 h-6 w-6 text-primary group-hover:animate-pulse" />
                Our Philosophy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                We believe in the power of open source and community-driven development. PrismLinux is
                built by users, for users, with transparency and collaboration at its core.
              </p>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Every decision we make is guided by three principles: performance optimization,
                security hardening, and user experience enhancement.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Why We Created <span className="text-primary">PrismLinux</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Performance First", desc: "Existing distributions often compromise performance for compatibility. We optimized every component for maximum speed and efficiency." },
              { icon: Shield, title: "Security by Design", desc: "Security shouldn't be an afterthought. PrismLinux implements security best practices from the ground up, protecting users without compromising usability." },
              { icon: Users, title: "Community Driven", desc: "We listen to our community and build features that users actually need. Every update is shaped by real user feedback and requirements." }
            ].map((item, index) => (
              <Card
                key={index}
                className="group text-center hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                <CardHeader>
                  <item.icon className="h-12 w-12 text-primary mx-auto group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
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
                className="group hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:scale-105 w-full max-w-lg"
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
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

                    {(member.github || member.gitlab || member.instagram || member.youtube) && (
                      <div className="flex gap-1 ml-4">
                        {member.github && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" asChild>
                            <a href={member.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                              <span className="sr-only">GitHub</span>
                            </a>
                          </Button>
                        )}
                        {member.gitlab && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" asChild>
                            <a href={member.gitlab} target="_blank" rel="noopener noreferrer">
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51 1.22 3.78a.84.84 0 0 1-.3.92z" />
                              </svg>
                              <span className="sr-only">GitLab</span>
                            </a>
                          </Button>
                        )}
                        {member.instagram && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" asChild>
                            <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                              <Instagram className="h-4 w-4" />
                              <span className="sr-only">Instagram</span>
                            </a>
                          </Button>
                        )}
                        {member.youtube && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" asChild>
                            <a href={member.youtube} target="_blank" rel="noopener noreferrer">
                              <Youtube className="h-4 w-4" />
                              <span className="sr-only">YouTube</span>
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Technology <span className="text-primary">Stack</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {technologies.map((tech, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl hover:border-primary/50 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-background to-background/50 border-2 hover:border-primary/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-lg" />
                <CardContent className="p-6 text-center relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300">
                    {tech.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-primary group-hover:text-foreground transition-colors duration-300">
                    {tech.name}
                  </h3>
                  <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-300">
                    {tech.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
