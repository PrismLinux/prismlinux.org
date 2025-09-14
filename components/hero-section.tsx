import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="space-y-6 py-20 md:py-32">
      <div className="container flex max-w-5xl flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          A modern, high-performance Arch-based distribution.
        </h1>
        <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Experience the future of Linux, optimized for gaming, programming, and
          content creation. Built for speed, security, and a great user
          experience.
        </p>
        <div className="flex gap-4">
          <Link href="/download" className={cn(buttonVariants({ size: "lg" }))}>
            Download Now
          </Link>
        </div>
      </div>
    </section>
  );
}
