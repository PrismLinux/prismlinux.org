import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Coffee, Github } from "lucide-react";

export function SupportSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/20 flex justify-center">
      <div className="container max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold neon-text">
            Support <span className="text-primary">Development</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us continue developing and improving PrismLinux for the
            community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="text-center group hover:glow-effect transition-all duration-300 flex flex-col">
            <CardHeader className="flex flex-col items-center">
              <Heart className="h-12 w-12 text-red-500 mx-auto group-hover:scale-110 transition-transform" />
              <CardTitle className="text-center">PayPal Donation</CardTitle>
              <CardDescription className="text-center">
                Support us with a one-time donation via PayPal
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end">
              <div className="flex justify-center">
                <Button className="w-full max-w-xs" asChild>
                  <Link href="https://paypal.me/">Donate Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/*<Card className="text-center group hover:glow-effect transition-all duration-300 flex flex-col">
            <CardHeader className="flex flex-col items-center">
              <Github className="h-12 w-12 text-primary mx-auto group-hover:scale-110 transition-transform" />
              <CardTitle className="text-center">GitHub Sponsors</CardTitle>
              <CardDescription className="text-center">
                Become a monthly sponsor on GitHub
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end">
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="w-full max-w-xs bg-transparent"
                  asChild
                >
                  <Link href="https://github.com/sponsors/VolodiaKraplich">
                    Sponsor
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>*/}

          <Card className="text-center group hover:glow-effect transition-all duration-300 flex flex-col">
            <CardHeader className="flex flex-col items-center">
              <Coffee className="h-12 w-12 text-accent mx-auto group-hover:scale-110 transition-transform" />
              <CardTitle className="text-center">Buy Me a Coffee</CardTitle>
              <CardDescription className="text-center">
                Support with a coffee to fuel development
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end">
              <div className="flex justify-center">
                <Button variant="secondary" className="w-full max-w-xs" asChild>
                  <Link href="https://buymeacoffee.com/">Buy Coffee</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
