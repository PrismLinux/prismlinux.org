import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Gamepad2, Package, Palette, Shield, Zap } from "lucide-react";
import ScrollFloat from "@/components/ui/scroll-float";

const features = [
  {
    icon: Zap,
    title: "Lightning-Fast Performance",
    description: "Optimized kernel and system configurations for maximum speed.",
  },
  {
    icon: Shield,
    title: "Enhanced Security",
    description: "Hardened kernel and advanced security features.",
  },
  {
    icon: Gamepad2,
    title: "Gaming Ready",
    description: "Pre-configured with Steam and gaming optimizations.",
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description: "A complete development environment out of the box.",
  },
  {
    icon: Palette,
    title: "For Creatives",
    description: "Tools for video editing, 3D modeling, and graphic design.",
  },
  {
    icon: Package,
    title: "Prism Package Manager",
    description: "Easy software installation and system maintenance.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Why <span className="text-primary">PrismLinux</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The features that make PrismLinux the perfect choice for power users.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}