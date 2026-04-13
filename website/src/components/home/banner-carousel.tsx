"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  image: {
    asset: {
      url?: string;
      _ref?: string;
    };
    alt?: string;
  };
  link?: string;
}

interface BannerCarouselProps {
  banners: Banner[];
}

export function BannerCarousel({ banners }: BannerCarouselProps) {
  const [current, setCurrent] = React.useState(0);

  const next = React.useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prev = React.useCallback(() => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  React.useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [banners.length, next]);

  if (banners.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden bg-muted">
      <div className="relative aspect-[16/9] max-h-[600px] w-full md:aspect-[21/9]">
        {banners.map((banner, index) => {
          const imageUrl = banner.image?.asset?.url ?? "";
          const hasImage = Boolean(imageUrl && imageUrl !== "/placeholder-banner.jpg");
          const content = (
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                index === current ? "opacity-100" : "opacity-0"
              )}
            >
              {hasImage ? (
                <Image
                  src={imageUrl}
                  alt={banner.image?.alt || banner.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  sizes="100vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-medical-blue via-medical-blue-light to-warm-beige" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="container">
                  <div className="max-w-xl space-y-4 text-white">
                    <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
                      {banner.title}
                    </h2>
                    {banner.subtitle ? (
                      <p className="text-base text-white/90 md:text-lg">
                        {banner.subtitle}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );

          if (banner.link) {
            return (
              <Link
                key={banner._id}
                href={banner.link}
                className="block"
                aria-label={banner.title}
              >
                {content}
              </Link>
            );
          }

          return <div key={banner._id}>{content}</div>;
        })}
      </div>

      {banners.length > 1 ? (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            aria-label="上一个"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            aria-label="下一个"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  index === current
                    ? "w-6 bg-white"
                    : "bg-white/50 hover:bg-white/80"
                )}
                aria-label={`切换到第 ${index + 1} 张`}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
