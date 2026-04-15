"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Slide {
  src: string;
  alt: string;
}

interface AboutCarouselProps {
  slides: Slide[];
}

export function AboutCarousel({ slides }: AboutCarouselProps) {
  const [current, setCurrent] = React.useState(0);

  const next = React.useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = React.useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  React.useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [slides.length, next]);

  if (slides.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg">
      <div className="relative aspect-[4/3] w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              index === current ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-[#1c1917] shadow-sm transition-colors hover:bg-white"
            aria-label="上一个"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-[#1c1917] shadow-sm transition-colors hover:bg-white"
            aria-label="下一个"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  index === current
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/60 hover:bg-white/90"
                )}
                aria-label={`切换到第 ${index + 1} 张`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
