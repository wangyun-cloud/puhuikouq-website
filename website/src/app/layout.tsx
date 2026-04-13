import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "上海普惠口腔",
  description: "上海普惠口腔 - 专业口腔医疗服务",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={cn("font-sans")}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
