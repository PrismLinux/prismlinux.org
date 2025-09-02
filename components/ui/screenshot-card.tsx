"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ImageProps } from "next/image";

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
  return (
    <Card
      className="overflow-hidden group bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div
        className={`relative ${ratio === "1680/1050" ? "aspect-[1680/1050]" : "aspect-video"} overflow-hidden`}
      >
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
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm border border-primary/20">
            {label}
          </span>
        </div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 transition-colors duration-300 pointer-events-none" />
      </div>
    </Card>
  );
}
