import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, Gamepad2, Code, Palette, Package } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning-Fast Performance",
    description:
      "Built on Arch Linux foundation with optimized kernel and system configurations for maximum speed and responsiveness.",
    color: "text-primary",
  },
  {
    icon: Shield,
    title: "Enhanced Security",
    description:
      "Advanced security features including hardened(or zen) kernel, and firewall configuration.",
    color: "text-accent",
  },
  {
    icon: Gamepad2,
    title: "Gaming Optimizations",
    description:
      "Pre-configured with Steam, Lutris, and gaming-specific kernel optimizations for the ultimate gaming experience.",
    color: "text-secondary",
  },
  {
    icon: Code,
    title: "Developer-Friendly Tools",
    description:
      "Complete development environment with popular IDEs, compilers, and development tools pre-configured out of the box.",
    color: "text-primary",
  },
  {
    icon: Palette,
    title: "Content Creation Suite",
    description:
      "Pre-configured settings for professional creative software including video editing, 3D modeling, and graphic design tools.",
    color: "text-accent",
  },
  {
    icon: Package,
    title: "Prism Package Manager",
    description:
      "Our custom package manager provides easy software installation and system maintenance with advanced dependency resolution.",
    color: "text-secondary",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Why Choose <span className="text-primary">PrismLinux</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the features that make PrismLinux the perfect choice for power users, gamers, and creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:glow-effect transition-all duration-300 bg-card/50 backdrop-blur">
              <CardHeader>
                <feature.icon className={`h-12 w-12 ${feature.color} group-hover:scale-110 transition-transform`} />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
