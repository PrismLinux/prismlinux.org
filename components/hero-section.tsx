import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="space-y-6 py-20 md:py-32">
      <div className="container flex max-w-5xl flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
          A modern, high-performance<br />
          Arch-based distribution.
        </h1>
        <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Experience the future of Linux, optimized for gaming, programming, and content creation.<br />
          Built for speed, security, and a great user experience.
        </p>
        <div className="flex gap-4">
          <Link
            href="/download"
            className={cn(
              buttonVariants({ size: "lg" }),
              "group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
            )}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="relative z-10 group-hover:animate-pulse">
              Download Now
            </span>
            <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 -z-10" />
          </Link>
        </div>
      </div>
    </section>
  );
}
