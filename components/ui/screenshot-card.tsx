"use client";

import { Card } from "@/components/ui/card";
import Image, { ImageProps } from "next/image";

type ScreenshotCardProps = {
  src: string;
  alt: string;
  label: string;
  ratio: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
} & Omit<ImageProps, "src" | "alt">;

export default function ScreenshotCard({
  src,
  alt,
  label,
  ratio,
  priority = false,
  loading,
  ...imageProps
}: ScreenshotCardProps) {
  // Enhanced ratio mapping with more comprehensive support
  const getAspectClass = (ratioString: string) => {
    const ratioMap: Record<string, string> = {
      // Standard formats
      "16/9": "aspect-video", // 1.778:1
      "1920/1080": "aspect-video", // Same as 16:9

      // Monitor formats
      "16/10": "aspect-[16/10]", // 1.6:1
      "1680/1050": "aspect-[16/10]", // Same ratio as 16:10
      "1920/1200": "aspect-[16/10]", // Same ratio as 16:10
      "2560/1600": "aspect-[16/10]", // Same ratio as 16:10

      // Legacy formats
      "4/3": "aspect-[4/3]", // 1.333:1
      "1024/768": "aspect-[4/3]", // Same ratio as 4:3
      "1600/1200": "aspect-[4/3]", // Same ratio as 4:3

      // Ultrawide formats
      "21/9": "aspect-[21/9]", // 2.333:1
      "2560/1080": "aspect-[21/9]", // Same ratio as 21:9
      "3440/1440": "aspect-[21/9]", // Same ratio as 21:9

      // Other common formats
      "3/2": "aspect-[3/2]", // 1.5:1
      "5/4": "aspect-[5/4]", // 1.25:1
      "1/1": "aspect-square", // 1:1

      // Mobile/Portrait (if needed)
      "9/16": "aspect-[9/16]", // 0.5625:1
      "3/4": "aspect-[3/4]", // 0.75:1
    };

    // Direct match
    if (ratioMap[ratioString]) {
      return ratioMap[ratioString];
    }

    // Try to normalize common dimension formats to standard ratios
    const normalizeRatio = (ratio: string): string => {
      const [w, h] = ratio.split("/").map(Number);
      if (!w || !h) return ratio;

      const aspectRatio = w / h;

      // Match to closest standard ratio
      if (Math.abs(aspectRatio - 16 / 9) < 0.01) return "aspect-video";
      if (Math.abs(aspectRatio - 16 / 10) < 0.01) return "aspect-[16/10]";
      if (Math.abs(aspectRatio - 4 / 3) < 0.01) return "aspect-[4/3]";
      if (Math.abs(aspectRatio - 21 / 9) < 0.01) return "aspect-[21/9]";
      if (Math.abs(aspectRatio - 3 / 2) < 0.01) return "aspect-[3/2]";
      if (Math.abs(aspectRatio - 1) < 0.01) return "aspect-square";

      // Fallback: create custom aspect class
      const gcd = (a: number, b: number): number =>
        b === 0 ? a : gcd(b, a % b);
      const divisor = gcd(w, h);
      const simpleW = w / divisor;
      const simpleH = h / divisor;

      return `aspect-[${simpleW}/${simpleH}]`;
    };

    return normalizeRatio(ratioString);
  };

  const aspectClass = getAspectClass(ratio);

  return (
    <Card
      className="overflow-hidden group bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className={`relative ${aspectClass} overflow-hidden`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out select-none"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={90}
          priority={priority}
          loading={loading}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          {...imageProps}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Clean label without ratio information */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm border border-primary/20">
            {label}
          </span>
        </div>

        {/* Border effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 transition-colors duration-300 pointer-events-none" />
      </div>
    </Card>
  );
}
