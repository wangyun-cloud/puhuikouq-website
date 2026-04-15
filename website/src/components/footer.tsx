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
    <footer className="w-full bg-[#1c1917]">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">上海普惠口腔</h3>
            <p className="text-sm text-white/70">
              来自上海的本土企业，致力于为患者提供优质、温馨的口腔医疗服务
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>021-5866 0039</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>上海市浦东新区东方路1381号兰村大厦3楼（4号线蓝村路地铁站2号口旁）</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <span>周一至周日 09:00-18:00</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">快速链接</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">诊疗项目</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/services/implant" className="hover:text-white">
                  种植牙
                </Link>
              </li>
              <li>
                <Link href="/services/orthodontics" className="hover:text-white">
                  牙齿矫正
                </Link>
              </li>
              <li>
                <Link href="/services/restoration" className="hover:text-white">
                  牙齿修复
                </Link>
              </li>
              <li>
                <Link href="/services/periodontal" className="hover:text-white">
                  牙周治疗
                </Link>
              </li>
              <li>
                <Link href="/services/pediatric" className="hover:text-white">
                  儿童口腔
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / ICP */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">法律信息</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/privacy" className="hover:text-white">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-white">
                  就诊须知
                </Link>
              </li>
            </ul>
            <p className="text-xs text-white/50">
              ICP备案号：沪ICP备XXXXXXXX号-1
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/60">
          <p>
            © {new Date().getFullYear()} 上海普惠口腔. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
}
