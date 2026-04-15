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

  const activeBanner = banners[current];

  return (
    <section className="relative overflow-hidden bg-[#0d7377]">
      <div className="flex min-h-[420px] flex-col md:min-h-[520px] lg:min-h-[600px] lg:flex-row">
        {/* Left: copy */}
        <div className="relative flex flex-col justify-center px-6 py-12 text-white md:px-12 lg:w-[45%] lg:px-16 lg:py-0 xl:px-20">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/5" />
          <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-white/5" />
          <div className="relative z-10 max-w-lg">
            <p className="mb-3 text-sm font-medium tracking-wide text-white/80">
              上海普惠口腔
            </p>
            <h1 className="mb-4 text-[2rem] font-bold leading-[1.1] md:text-[2.5rem] lg:text-[2.75rem]">
              {activeBanner.title}
            </h1>
            {activeBanner.subtitle ? (
              <p className="mb-6 text-base leading-relaxed text-white/85 md:text-lg">
                {activeBanner.subtitle}
              </p>
            ) : null}

            <p className="mb-8 max-w-sm text-[15px] leading-[1.8] text-white/70 md:max-w-md"
            >
              我们始终坚持以患者为中心，汇聚多位经验丰富的口腔医师，
              配备现代化诊疗设备，致力于为每一位患者提供规范、专业、温暖的口腔医疗服务。
            </p>

            <div className="flex flex-wrap gap-3">
              {activeBanner.link ? (
                <Link
                  href={activeBanner.link}
                  className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-2.5 text-sm font-medium text-[#0d7377] transition-colors hover:bg-white/90"
                >
                  了解详情
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : null}
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-transparent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                立即预约
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 flex gap-8 border-t border-white/20 pt-8 md:mt-12 md:gap-12"
            >
              <div>
                <p className="text-2xl font-bold md:text-3xl">10+</p>
                <p className="mt-0.5 text-xs text-white/75 md:text-sm">专业口腔医师</p>
              </div>
              <div>
                <p className="text-2xl font-bold md:text-3xl">4</p>
                <p className="mt-0.5 text-xs text-white/75 md:text-sm">上海直营分院</p>
              </div>
              <div>
                <p className="text-2xl font-bold md:text-3xl">15+</p>
                <p className="mt-0.5 text-xs text-white/75 md:text-sm">年临床经验</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: image carousel */}
        <div className="relative flex-1 bg-[#e8e4db]">
          {banners.map((banner, index) => {
            const imageUrl = banner.image?.asset?.url ?? "";
            const hasImage = Boolean(imageUrl && imageUrl !== "/placeholder-banner.jpg");

            return (
              <div
                key={banner._id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-out",
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
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-[#0d7377] to-slate-800" />
                )}
              </div>
            );
          })}

          {/* Controls */}
          {banners.length > 1 ? (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-[#1c1917] shadow-sm transition-colors hover:bg-white md:left-6"
                aria-label="上一个"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-[#1c1917] shadow-sm transition-colors hover:bg-white md:right-6"
                aria-label="下一个"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      index === current
                        ? "w-8 bg-white"
                        : "w-1.5 bg-white/50 hover:bg-white/80"
                    )}
                    aria-label={`切换到第 ${index + 1} 张`}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
