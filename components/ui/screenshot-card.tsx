"use client";

import { Card } from "@/components/ui/card";
import Image, { ImageProps } from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Анимация при открытии/закрытии
  const [animationState, setAnimationState] = useState<"enter" | "exit" | "idle">("idle");

  const getAspectClass = (ratioString: string) => {
    const ratioMap: Record<string, string> = {
      "16/9": "aspect-video",
      "1920/1080": "aspect-video",
      "16/10": "aspect-[16/10]",
      "1680/1050": "aspect-[16/10]",
      "1920/1200": "aspect-[16/10]",
      "2560/1600": "aspect-[16/10]",
      "4/3": "aspect-[4/3]",
      "1024/768": "aspect-[4/3]",
      "1600/1200": "aspect-[4/3]",
      "21/9": "aspect-[21/9]",
      "2560/1080": "aspect-[21/9]",
      "3440/1440": "aspect-[21/9]",
      "3/2": "aspect-[3/2]",
      "5/4": "aspect-[5/4]",
      "1/1": "aspect-square",
      "9/16": "aspect-[9/16]",
      "3/4": "aspect-[3/4]",
    };

    if (ratioMap[ratioString]) {
      return ratioMap[ratioString];
    }

    const normalizeRatio = (ratio: string): string => {
      const [w, h] = ratio.split("/").map(Number);
      if (!w || !h) return ratio;

      const aspectRatio = w / h;

      if (Math.abs(aspectRatio - 16 / 9) < 0.01) return "aspect-video";
      if (Math.abs(aspectRatio - 16 / 10) < 0.01) return "aspect-[16/10]";
      if (Math.abs(aspectRatio - 4 / 3) < 0.01) return "aspect-[4/3]";
      if (Math.abs(aspectRatio - 21 / 9) < 0.01) return "aspect-[21/9]";
      if (Math.abs(aspectRatio - 3 / 2) < 0.01) return "aspect-[3/2]";
      if (Math.abs(aspectRatio - 1) < 0.01) return "aspect-square";

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

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleZoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.2, 4));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      globalThis.addEventListener('mousemove', handleMouseMove);
      globalThis.addEventListener('mouseup', handleMouseUp);

      return () => {
        globalThis.removeEventListener('mousemove', handleMouseMove);
        globalThis.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.min(Math.max(scale + delta, 0.5), 4);
    setScale(newScale);
  }, [scale]);

  // Открытие с анимацией
  const openModal = useCallback(() => {
    setAnimationState("enter");
    setIsModalOpen(true);
    setTimeout(() => {
      setAnimationState("idle");
    }, 300);
  }, []);

  // Закрытие с анимацией
  const closeModal = useCallback(() => {
    setAnimationState("exit");
    setTimeout(() => {
      setIsModalOpen(false);
      resetZoom();
      setAnimationState("idle");
    }, 300);
  }, [resetZoom]);

  return (
    <>
      <Card
        className="overflow-hidden group bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
        onClick={openModal}
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

          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm border border-primary/20">
              {label}
            </span>
          </div>

          <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 transition-colors duration-300 pointer-events-none" />
        </div>
      </Card>

      {/* Модальное окно */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm transition-opacity duration-300 ${animationState === "enter" ? "opacity-0" :
            animationState === "exit" ? "opacity-0" : "opacity-100"
            }`}
          onClick={closeModal}
        >
          <div
            className={`relative max-w-7xl max-h-[95vh] w-full transition-all duration-300 ${animationState === "enter" ? "scale-95 opacity-0" :
              animationState === "exit" ? "scale-95 opacity-0" : "scale-100 opacity-100"
              }`}
            onClick={(e) => e.stopPropagation()}
            ref={containerRef}
          >
            {/* Изображение */}
            <div
              className={`relative ${aspectClass} max-h-[75vh] overflow-hidden cursor-${isDragging ? 'grabbing' : 'move'}`}
              onMouseDown={handleMouseDown}
              onWheel={handleWheel}
            >
              <div
                className="w-full h-full relative"
                style={{
                  transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                  transformOrigin: 'center center',
                  transition: isDragging ? 'none' : 'transform 0.2s ease'
                }}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  quality={100}
                />
              </div>
            </div>

            {/* Описание */}
            <div className="mt-4 text-center text-white bg-black/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold">{label}</h3>
              <p className="text-gray-300 mt-2 max-w-3xl mx-auto">{alt}</p>
            </div>

            {/* Управление (перемещено вниз) */}
            <div className="flex justify-center gap-2 mt-4">
              <button
                className="text-white hover:text-gray-300 text-lg font-bold w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 transition-colors flex items-center justify-center"
                onClick={handleZoomOut}
                aria-label="Уменьшить"
              >
                -
              </button>
              <span className="text-white bg-black/50 px-3 py-1.5 rounded-full text-sm flex items-center justify-center min-w-[60px]">
                {Math.round(scale * 100)}%
              </span>
              <button
                className="text-white hover:text-gray-300 text-lg font-bold w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 transition-colors flex items-center justify-center"
                onClick={handleZoomIn}
                aria-label="Увеличить"
              >
                +
              </button>
              <button
                className="text-white hover:text-gray-300 text-lg font-bold w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 transition-colors flex items-center justify-center ml-2"
                onClick={resetZoom}
                aria-label="Сбросить масштаб"
              >
                ↻
              </button>
              <button
                className="text-white hover:text-gray-300 text-lg font-bold w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 transition-colors flex items-center justify-center ml-2"
                onClick={closeModal}
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
