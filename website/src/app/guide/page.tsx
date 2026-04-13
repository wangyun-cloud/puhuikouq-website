import type { Metadata } from "next";
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

export default function GuidePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-medical-blue via-medical-blue to-medical-blue-dark py-12 text-white md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-3 text-2xl font-bold md:text-3xl lg:text-4xl">
              就诊指南
            </h1>
            <p className="text-white/90 md:text-lg">
              了解预约流程、营业时间和交通信息，让您的就诊体验更加顺畅
            </p>
          </div>
        </div>
      </section>

      {/* Appointment Process */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="mb-8 text-center text-xl font-bold text-primary md:text-2xl">
            预约就诊流程
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className={`relative flex items-start gap-4 md:gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`hidden md:block md:w-1/2 ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <div
                      className={`inline-block rounded-xl border bg-card p-5 shadow-sm ${
                        index % 2 === 0 ? "md:mr-6" : "md:ml-6"
                      }`}
                    >
                      <h3 className="mb-2 font-semibold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-background md:left-1/2">
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>

                  <div className="ml-10 flex-1 md:ml-0 md:w-1/2 md:hidden">
                    <div className="rounded-xl border bg-card p-5 shadow-sm">
                      <div className="mb-2 flex items-center gap-2">
                        <step.icon className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`hidden md:flex md:w-1/2 md:items-center ${
                      index % 2 === 0
                        ? "md:justify-start"
                        : "md:justify-end"
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 ${
                        index % 2 === 0 ? "md:ml-6" : "md:mr-6"
                      }`}
                    >
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="border-t bg-muted/30 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-xl font-bold text-primary md:text-2xl">
              营业时间
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">门诊时间</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">周一至周五</span>
                    <span>09:00 - 18:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">周六至周日</span>
                    <span>09:00 - 17:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">节假日</span>
                    <span>09:00 - 16:00</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">客服热线</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  如有任何疑问，欢迎拨打客服热线咨询预约事宜。
                </p>
                <div className="mt-4">
                  <a
                    href="tel:021-12345678"
                    className="text-lg font-semibold text-primary hover:underline"
                  >
                    021-12345678
                  </a>
                  <p className="text-xs text-muted-foreground">
                    服务时间：08:00 - 20:00（全年无休）
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transportation */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="mb-8 text-center text-xl font-bold text-primary md:text-2xl">
            交通指引
          </h2>
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <Train className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">地铁</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">陆家嘴分院：</strong>
                  地铁2号线陆家嘴站3号口出，步行约5分钟
                </li>
                <li>
                  <strong className="text-foreground">静安分院：</strong>
                  地铁2/7号线静安寺站1号口出，向东步行约8分钟
                </li>
                <li>
                  <strong className="text-foreground">徐汇分院：</strong>
                  地铁1号线陕西南路站4号口出，向北步行约6分钟
                </li>
                <li>
                  <strong className="text-foreground">虹桥分院：</strong>
                  地铁2/10/17号线虹桥火车站站C口出，换乘公交或打车约10分钟
                </li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <Car className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">自驾</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  各分院均设有停车场或临近公共停车场，建议提前预约停车位。
                </li>
                <li>
                  就诊当天请预留充足的停车时间，避免因停车耽误就诊。
                </li>
                <li>
                  部分分院提供代客泊车服务，具体可致电咨询。
                </li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">周边设施</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                各分院周边均有便利店、餐饮等配套设施，方便您就诊前后的需求。
                部分分院设有儿童游乐区，让带小朋友就诊的家长更加省心。
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
