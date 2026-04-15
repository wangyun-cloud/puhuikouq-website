import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Train,
  Car,
  Phone,
  FileText,
  Stethoscope,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "就诊指南",
  description:
    "了解上海普惠口腔的预约流程、营业时间、交通指引和就诊注意事项，让您的就诊更加顺利。",
  alternates: {
    canonical: "/guide",
  },
};

const processSteps = [
  {
    icon: Calendar,
    title: "在线或电话预约",
    description:
      "通过网站在线预约或拨打客服电话，选择您方便的就诊时间和分院。",
  },
  {
    icon: Phone,
    title: "工作人员确认",
    description:
      "我们的客服人员会在24小时内与您电话确认预约信息，并告知注意事项。",
  },
  {
    icon: FileText,
    title: "到院登记",
    description:
      "请携带有效身份证件，按照预约时间提前15分钟到达分院前台登记。",
  },
  {
    icon: Stethoscope,
    title: "医生面诊",
    description:
      "医生会详细了解您的口腔状况，进行必要检查，并制定个性化的治疗方案。",
  },
  {
    icon: CheckCircle,
    title: "治疗或随访安排",
    description:
      "根据诊断结果，当天进行治疗或预约后续治疗时间，确保治疗效果。",
  },
];

const businessHours = [
  { label: "周一至周五", time: "09:00 - 18:00" },
  { label: "周六至周日", time: "09:00 - 17:00" },
  { label: "节假日", time: "09:00 - 16:00" },
];

const transportModes = [
  {
    icon: Train,
    title: "地铁",
    items: [
      { branch: "陆家嘴分院", detail: "地铁2号线陆家嘴站3号口出，步行约5分钟" },
      { branch: "静安分院", detail: "地铁2/7号线静安寺站1号口出，向东步行约8分钟" },
      { branch: "徐汇分院", detail: "地铁1号线陕西南路站4号口出，向北步行约6分钟" },
      { branch: "虹桥分院", detail: "地铁2/10/17号线虹桥火车站站C口出，换乘公交或打车约10分钟" },
    ],
  },
  {
    icon: Car,
    title: "自驾",
    items: [
      { detail: "各分院均设有停车场或临近公共停车场，建议提前预约停车位。" },
      { detail: "就诊当天请预留充足的停车时间，避免因停车耽误就诊。" },
      { detail: "部分分院提供代客泊车服务，具体可致电咨询。" },
    ],
  },
  {
    icon: MapPin,
    title: "周边设施",
    items: [
      { detail: "各分院周边均有便利店、餐饮等配套设施，方便您就诊前后的需求。" },
      { detail: "部分分院设有儿童游乐区，让带小朋友就诊的家长更加省心。" },
    ],
  },
];

export default function GuidePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0d7377] py-16 text-white md:py-24">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 md:h-96 md:w-96" />
        <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-white/5 md:h-[28rem] md:w-[28rem]" />
        <div className="relative container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-medium tracking-wide text-white/80">
              上海普惠口腔
            </p>
            <h1 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              就诊指南
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              了解预约流程、营业时间和交通信息，让您的就诊体验更加顺畅
            </p>
          </div>
        </div>
      </section>

      {/* Appointment Process */}
      <section className="bg-[#faf8f5] py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center md:mb-16">
            <p className="mb-2 text-sm font-medium tracking-wide text-[#e86a33]">
              预约就诊
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-[#1c1917] md:text-3xl lg:text-4xl">
              预约就诊流程
            </h2>
          </div>

          <div className="relative mx-auto max-w-4xl">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#0d7377]/30 via-[#0d7377]/20 to-[#0d7377]/30 md:left-8" />

            <div className="space-y-6 md:space-y-8">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative flex items-start gap-4 md:gap-8"
                >
                  {/* Step number */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0d7377] text-sm font-bold text-white shadow-md ring-4 ring-[#faf8f5] md:h-16 md:w-16 md:text-base md:shadow-lg">
                    {index + 1}
                  </div>

                  {/* Content card */}
                  <div className="flex flex-1 flex-col gap-3 rounded-xl border border-[#e8e4db] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:flex-row md:items-center md:gap-6 md:p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0d7377]/10 md:h-12 md:w-12">
                      <step.icon className="h-5 w-5 text-[#0d7377] md:h-6 md:w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-[#1c1917] md:text-lg">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#78716c] md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours & Contact */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center md:mb-16">
            <p className="mb-2 text-sm font-medium tracking-wide text-[#e86a33]">
              营业时间
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-[#1c1917] md:text-3xl lg:text-4xl">
              门诊时间与联系方式
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {/* Hours card */}
            <div className="group rounded-2xl border border-[#e8e4db] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0d7377]/10">
                  <Clock className="h-6 w-6 text-[#0d7377]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1c1917]">门诊时间</h3>
              </div>
              <ul className="space-y-3">
                {businessHours.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-between border-b border-dashed border-[#e8e4db] pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-[#57534e]">{item.label}</span>
                    <span className="font-medium text-[#1c1917]">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact card */}
            <div className="group rounded-2xl border border-[#e8e4db] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0d7377]/10">
                  <Phone className="h-6 w-6 text-[#0d7377]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1c1917]">客服热线</h3>
              </div>
              <p className="text-sm text-[#78716c]">
                如有任何疑问，欢迎拨打客服热线咨询预约事宜。
              </p>
              <div className="mt-5 rounded-xl bg-[#faf8f5] p-5">
                <a
                  href="tel:021-58660039"
                  className="text-2xl font-semibold text-[#0d7377] hover:underline"
                >
                  021-5866 0039
                </a>
                <p className="mt-1 text-xs text-[#78716c]">
                  服务时间：08:00 - 20:00（全年无休）
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transportation */}
      <section className="bg-[#faf8f5] py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center md:mb-16">
            <p className="mb-2 text-sm font-medium tracking-wide text-[#e86a33]">
              交通指引
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-[#1c1917] md:text-3xl lg:text-4xl">
              如何到达分院
            </h2>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {transportModes.map((mode) => (
              <div
                key={mode.title}
                className="group rounded-2xl border border-[#e8e4db] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0d7377]/10 transition-colors group-hover:bg-[#0d7377]/20">
                  <mode.icon className="h-6 w-6 text-[#0d7377]" />
                </div>
                <h3 className="mb-4 text-lg font-semibold text-[#1c1917]">
                  {mode.title}
                </h3>
                <ul className="space-y-3 text-sm text-[#57534e]">
                  {mode.items.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {"branch" in item && item.branch ? (
                        <>
                          <span className="font-medium text-[#1c1917]">
                            {item.branch}：
                          </span>
                          {item.detail}
                        </>
                      ) : (
                        item.detail
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#0d7377] py-16 text-white md:py-24">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 md:h-96 md:w-96" />
        <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-white/5 md:h-[28rem] md:w-[28rem]" />
        <div className="relative container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-medium tracking-wide text-white/80">
              预约咨询
            </p>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
              立即预约您的就诊时间
            </h2>
            <p className="mb-8 text-white/90">
              我们的工作人员将为您安排合适的就诊时间，并提供详细的就诊指引
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white px-8 text-[#0d7377] hover:bg-white/90"
              >
                <Link href="/booking">
                  <Calendar className="mr-2 h-4 w-4" />
                  在线预约
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/40 bg-transparent px-8 text-white hover:bg-white/10"
              >
                <a href="tel:021-58660039">
                  <Phone className="mr-2 h-4 w-4" />
                  电话预约
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
