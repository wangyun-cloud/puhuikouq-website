import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";

const footerLinks = [
  { href: "/services/implant", label: "种植牙" },
  { href: "/services/orthodontics", label: "牙齿矫正" },
  { href: "/doctors", label: "医生团队" },
  { href: "/knowledge", label: "口腔知识" },
  { href: "/guide", label: "就诊指南" },
  { href: "/contact", label: "联系我们" },
  { href: "/booking", label: "在线预约" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-muted/40">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">上海普惠口腔</h3>
            <p className="text-sm text-muted-foreground">
              致力于为患者提供优质、温馨的口腔医疗服务
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>021-12345678</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>上海市浦东新区陆家嘴环路1000号</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <span>周一至周日 09:00-18:00</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">快速链接</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">诊疗项目</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/services/implant" className="hover:text-primary">
                  种植牙
                </Link>
              </li>
              <li>
                <Link href="/services/orthodontics" className="hover:text-primary">
                  牙齿矫正
                </Link>
              </li>
              <li>
                <Link href="/services/restoration" className="hover:text-primary">
                  牙齿修复
                </Link>
              </li>
              <li>
                <Link href="/services/periodontal" className="hover:text-primary">
                  牙周治疗
                </Link>
              </li>
              <li>
                <Link href="/services/pediatric" className="hover:text-primary">
                  儿童口腔
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / ICP */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">法律信息</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-primary">
                  就诊须知
                </Link>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground">
              ICP备案号：沪ICP备XXXXXXXX号-1
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} 上海普惠口腔. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
}
