import type { Metadata } from "next";
import { Calendar, Phone, Clock, MapPin } from "lucide-react";
import { sanityFetch, isSanityConfigured } from "@/lib/sanity";
import { BookingForm } from "./booking-form";

interface ClinicDoc {
  _id: string;
  name: string;
}

const clinicsQuery = `*[_type == "clinic"] | order(order asc) {
  _id,
  name
}`;

const fallbackClinics: ClinicDoc[] = [
  { _id: "clinic-1", name: "陆家嘴分院" },
  { _id: "clinic-2", name: "静安分院" },
  { _id: "clinic-3", name: "徐汇分院" },
  { _id: "clinic-4", name: "虹桥分院" },
];

export const metadata: Metadata = {
  title: "在线预约",
  description:
    "在线预约上海普惠口腔门诊，选择适合您的分院和就诊时间，享受专业的口腔医疗服务。",
  alternates: {
    canonical: "/booking",
  },
};

export default async function BookingPage() {
  let clinics: ClinicDoc[] = [];

  if (isSanityConfigured()) {
    try {
      clinics = await sanityFetch<ClinicDoc[]>({
        query: clinicsQuery,
        tags: ["clinic"],
      });
    } catch {
      clinics = fallbackClinics;
    }
  } else {
    clinics = fallbackClinics;
  }

  const displayClinics = clinics.length > 0 ? clinics : fallbackClinics;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-medical-blue via-medical-blue to-medical-blue-dark py-12 text-white md:py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-3 text-2xl font-bold md:text-3xl lg:text-4xl">
              在线预约
            </h1>
            <p className="text-white/90 md:text-lg">
              填写以下信息，我们将尽快与您联系确认就诊安排
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-5">
            {/* Form */}
            <div className="rounded-xl border bg-card p-6 shadow-sm lg:col-span-3">
              <h2 className="mb-6 text-lg font-semibold">预约信息</h2>
              <BookingForm clinics={displayClinics} />
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h3 className="mb-4 text-base font-semibold">预约须知</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>建议提前1-3天预约，以便我们为您安排合适的医生和时间。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>提交预约后，工作人员会在24小时内通过电话与您确认。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>如需改约或取消，请提前致电告知，以便安排其他患者。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>首次就诊请携带有效身份证件，建议提前15分钟到达。</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border bg-gradient-to-br from-medical-blue to-medical-blue-light p-6 text-white">
                <h3 className="mb-2 text-base font-semibold">需要帮助？</h3>
                <p className="mb-4 text-sm text-white/90">
                  如果您在预约过程中遇到问题，欢迎随时致电咨询。
                </p>
                <a
                  href="tel:021-12345678"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur transition-colors hover:bg-white/30"
                >
                  <Phone className="h-4 w-4" />
                  021-12345678
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
