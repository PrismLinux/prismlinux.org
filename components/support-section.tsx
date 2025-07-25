import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Coffee, Github } from "lucide-react"

export function SupportSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/20">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold neon-text">
            Support <span className="text-primary">Development</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us continue developing and improving PrismLinux for the community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center group hover:glow-effect transition-all duration-300">
            <CardHeader>
              <Heart className="h-12 w-12 text-red-500 mx-auto group-hover:scale-110 transition-transform" />
              <CardTitle>PayPal Donation</CardTitle>
              <CardDescription>Support us with a one-time donation via PayPal</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="https://paypal.me/">Donate Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center group hover:glow-effect transition-all duration-300">
            <CardHeader>
              <Github className="h-12 w-12 text-primary mx-auto group-hover:scale-110 transition-transform" />
              <CardTitle>GitHub Sponsors</CardTitle>
              <CardDescription>Become a monthly sponsor on GitHub</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="https://github.com/sponsors/VolodiaKraplich">Sponsor</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center group hover:glow-effect transition-all duration-300">
            <CardHeader>
              <Coffee className="h-12 w-12 text-accent mx-auto group-hover:scale-110 transition-transform" />
              <CardTitle>Buy Me a Coffee</CardTitle>
              <CardDescription>Support with a coffee to fuel development</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full" asChild>
                <Link href="https://buymeacoffee.com/">Buy Coffee</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
