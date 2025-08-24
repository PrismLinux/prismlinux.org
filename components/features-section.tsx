import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, Gamepad2, Code, Palette, Package } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning-Fast Performance",
    description:
      "Optimized kernel and system configurations for maximum speed.",
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
            The features that make PrismLinux the perfect choice for power
            users.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="card-glow">
              <CardHeader className="flex flex-row items-center gap-4">
                <feature.icon className="h-8 w-8 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
