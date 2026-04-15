"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/services/implant", label: "服务项目" },
  { href: "/pricing", label: "收费标准" },
  { href: "/doctors", label: "医生团队" },
  { href: "/knowledge", label: "口腔知识" },
  { href: "/guide", label: "就诊指南" },
  { href: "/contact", label: "联系我们" },
];

export function Navigation() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-[#e8e4db] bg-[#faf8f5]/98 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-[#faf8f5]/95"
          : "border-transparent bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo/logo-color.png"
            alt="上海普惠口腔"
            width={140}
            height={32}
            className="h-7 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:021-58660039"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <Phone className="h-4 w-4" />
            <span>021-5866 0039</span>
          </a>
          <Button asChild size="sm" variant="outline" className="px-5">
            <Link href="/booking">在线预约</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <Button asChild size="sm" variant="outline" className="hidden sm:inline-flex">
            <Link href="/booking">预约</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="打开菜单">
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-[280px] bg-background">
              <SheetTitle className="sr-only">导航菜单</SheetTitle>
              <div className="flex flex-col gap-6 pt-6">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center"
                >
                  <Image
                    src="/images/logo/logo-color.png"
                    alt="上海普惠口腔"
                    width={120}
                    height={28}
                    className="h-6 w-auto object-contain"
                    priority
                  />
                </Link>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "text-base font-medium text-foreground/80 transition-colors hover:text-primary"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
                  <a
                    href="tel:021-58660039"
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Phone className="h-4 w-4" />
                    <span>021-5866 0039</span>
                  </a>
                  <Button asChild variant="outline">
                    <Link href="/booking" onClick={() => setOpen(false)}>
                      在线预约
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
