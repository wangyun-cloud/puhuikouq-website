import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://puhuikouq.com"),
  title: {
    default: "上海普惠口腔 - 专业口腔医疗服务",
    template: "%s | 上海普惠口腔",
  },
  description:
    "上海普惠口腔提供种植牙、牙齿矫正、牙齿修复、牙周治疗、儿童口腔等专业口腔医疗服务，守护您的每一颗牙齿。",
  keywords: [
    "上海普惠口腔",
    "种植牙",
    "牙齿矫正",
    "口腔医疗",
    "牙周治疗",
    "儿童口腔",
  ],
  authors: [{ name: "上海普惠口腔" }],
  creator: "上海普惠口腔",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://puhuikouq.com",
    siteName: "上海普惠口腔",
    title: "上海普惠口腔 - 专业口腔医疗服务",
    description:
      "上海普惠口腔提供种植牙、牙齿矫正、牙齿修复、牙周治疗、儿童口腔等专业口腔医疗服务。",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "上海普惠口腔",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "上海普惠口腔 - 专业口腔医疗服务",
    description:
      "上海普惠口腔提供种植牙、牙齿矫正、牙齿修复、牙周治疗、儿童口腔等专业口腔医疗服务。",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={cn("font-sans")}>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
