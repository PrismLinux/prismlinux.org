import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Coffee, DollarSign } from "lucide-react";

export function SupportSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 md:py-32 bg-gradient-to-br from-muted/10 via-muted/20 to-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary border border-primary/20">
            <Heart className="h-4 w-4" />
            Support Our Project
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
            Support <span className="text-primary">Development</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Help us continue developing and improving PrismLinux for the
            community. Your support enables us to dedicate more time to new
            features, bug fixes, and community support.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto mb-12 items-center justify-center">
          {/* PayPal Card */}
          <Card className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm relative overflow-hidden w-full md:w-80 h-80 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="text-center space-y-4 relative z-10 flex-1 flex flex-col items-center justify-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">
                PayPal Donation
              </CardTitle>
              <CardDescription className="text-muted-foreground text-center">
                Support us with a secure one-time donation via PayPal
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4 relative z-10 pb-6">
              <div className="text-sm text-muted-foreground">
                Quick & secure payment
              </div>
              <Button
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link
                  href="https://paypal.me/"
                  className="flex items-center gap-2 justify-center"
                >
                  <DollarSign className="h-4 w-4" />
                  Donate Now
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Buy Me a Coffee Card */}
          <Card className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm relative overflow-hidden w-full md:w-80 h-80 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="text-center space-y-4 relative z-10 flex-1 flex flex-col items-center justify-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Coffee className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">
                Buy Me a Coffee
              </CardTitle>
              <CardDescription className="text-muted-foreground text-center">
                Support with a coffee to fuel late-night development
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4 relative z-10 pb-6">
              <div className="text-sm text-muted-foreground">
                Casual support
              </div>
              <Button
                variant="secondary"
                className="w-full bg-gradient-to-r from-accent/10 to-accent/20 hover:from-accent/20 hover:to-accent/30 border border-accent/20 hover:border-accent/40 transition-all duration-300"
                asChild
              >
                <Link
                  href="https://buymeacoffee.com/"
                  className="flex items-center gap-2 justify-center"
                >
                  <Coffee className="h-4 w-4" />
                  Buy Coffee
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional info section */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="bg-muted/30 backdrop-blur-sm rounded-2xl p-6 border border-muted">
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Why support us?</strong>
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your contributions help cover development costs, server expenses,
              and allow us to dedicate more time to improving PrismLinux. Every
              donation, no matter the size, makes a real difference in our
              ability to deliver quality software to the community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
