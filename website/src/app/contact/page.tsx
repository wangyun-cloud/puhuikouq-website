import type { Metadata } from "next";
import { Phone, MapPin, Clock, Navigation, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sanityFetch, isSanityConfigured, urlFor } from "@/lib/sanity";

interface ClinicDoc {
  _id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapUrl?: string;
  image?: {
    asset?: { _ref?: string; _type?: string };
    alt?: string;
  };
}

const clinicsQuery = `*[_type == "clinic"] | order(order asc) {
  _id,
  name,
  address,
  phone,
  hours,
  mapUrl,
  image { asset { _ref }, alt }
}`;

const clinicDetails = [
  {
    _id: "clinic-1",
    name: "上海清木口腔门诊部",
    address: "上海市静安区愚园路300号申乐大厦7楼和9楼",
    phone: "021-6252 4628",
    hours: "周一至周日 09:00-17:00",
    district: "静安区",
    metro: "地铁2/7号线 静安寺站",
    mapUrl:
      "https://uri.amap.com/search?keyword=%E4%B8%8A%E6%B5%B7%E6%B8%85%E6%9C%A8%E5%8F%A3%E8%85%94%E9%97%A8%E8%AF%8A%E9%83%A8",
  },
  {
    _id: "clinic-2",
    name: "上海正维口腔门诊部",
    address: "上海市静安区公兴路75-83号",
    phone: "189-1873-1832",
    hours: "周一至周日 09:00-18:00",
    district: "静安区",
    metro: "地铁3/4号线 宝山路站",
    mapUrl:
      "https://uri.amap.com/search?keyword=%E4%B8%8A%E6%B5%B7%E6%AD%A3%E7%BB%B4%E5%8F%A3%E8%85%94%E9%97%A8%E8%AF%8A%E9%83%A8",
  },
  {
    _id: "clinic-3",
    name: "上海皓星口腔门诊部",
    address: "上海市浦东新区东方路1381、1383号3层（蓝村大厦3楼）",
    phone: "021-5836 0668",
    hours: "周一至周日 09:00-18:00",
    district: "浦东新区",
    metro: "地铁4/6号线 蓝村路站",
    mapUrl:
      "https://uri.amap.com/search?keyword=%E4%B8%8A%E6%B5%B7%E7%9A%93%E6%98%9F%E5%8F%A3%E8%85%94%E9%97%A8%E8%AF%8A%E9%83%A8",
  },
  {
    _id: "clinic-4",
    name: "上海百维口腔门诊部",
    address: "上海市静安区江场西路160号101-6、101-7、101-8室",
    phone: "188-1750-2972",
    hours: "周一至周日 09:00-18:00",
    district: "静安区",
    metro: "地铁1号线 汶水路站",
    mapUrl:
      "https://uri.amap.com/search?keyword=%E4%B8%8A%E6%B5%B7%E7%99%BE%E7%BB%B4%E5%8F%A3%E8%85%94%E9%97%A8%E8%AF%8A%E9%83%A8",
  },
];

function getClinicImageUrl(doc: ClinicDoc): string {
  if (isSanityConfigured() && doc.image?.asset?._ref) {
    try {
      return urlFor(doc.image).url();
    } catch {
      // fall through
    }
  }
  return "/images/clinic/大厅.jpg";
}

export const metadata: Metadata = {
  title: "联系我们",
  description:
    "联系上海普惠口腔：查看各分院地址、电话、营业时间，预约咨询或到店就诊。",
  alternates: {
    canonical: "/contact",
  },
};

export default async function ContactPage() {
  let clinics: ClinicDoc[] = [];

  if (isSanityConfigured()) {
    try {
      clinics = await sanityFetch<ClinicDoc[]>({
        query: clinicsQuery,
        tags: ["clinic"],
      });
    } catch {
      clinics = clinicDetails;
    }
  } else {
    clinics = clinicDetails;
  }

  // Use fallback when Sanity data is incomplete
  const sourceClinics =
    clinics.length >= clinicDetails.length ? clinics : clinicDetails;

  const displayClinics = sourceClinics.map((c, index) => {
    const detail = clinicDetails[index] || clinicDetails[0];
    const doc = c as ClinicDoc;
    return {
      ...c,
      district: detail.district,
      metro: detail.metro,
      imageUrl: getClinicImageUrl(doc),
      imageAlt: doc.image?.alt || `${doc.name}照片`,
    };
  });

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
              联系我们
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              在上海设有多家分院，方便您就近就诊
            </p>
          </div>
        </div>
      </section>

      {/* Clinics Grid */}
      <section className="bg-[#faf8f5] py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center md:mb-16">
            <p className="mb-2 text-sm font-medium tracking-wide text-[#e86a33]">
              分院地址
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-[#1c1917] md:text-3xl lg:text-4xl">
              就近选择就诊分院
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-5 md:gap-6">
            {displayClinics.map((clinic, index) => (
              <article
                key={clinic._id}
                className="group flex flex-col gap-5 rounded-2xl border border-[#e8e4db] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:flex-row md:items-center md:justify-between md:p-8"
              >
                {/* Left: Info */}
                <div className="flex flex-1 items-start gap-4 md:gap-6">
                  {/* Index circle */}
                  <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0d7377] text-lg font-bold text-white shadow-md md:flex">
                    {index + 1}
                  </div>

                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-[#1c1917] md:text-xl">
                        {clinic.name}
                      </h3>
                      <span className="rounded-full bg-[#f2efe8] px-2.5 py-0.5 text-xs font-medium text-[#78716c]">
                        {clinic.district}
                      </span>
                    </div>

                    <div className="mb-3 flex items-start gap-2 text-[#57534e]">
                      <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#0d7377]" />
                      <p className="text-base leading-relaxed md:text-lg">
                        {clinic.address}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#78716c]">
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-4 w-4 text-[#0d7377]" />
                        <span>{clinic.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-[#0d7377]" />
                        <span>{clinic.hours}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="inline-block h-4 w-4 rounded-full border border-[#0d7377]/30 bg-[#0d7377]/10 text-center text-[10px] leading-4 text-[#0d7377]">
                          地
                        </span>
                        <span>{clinic.metro}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex shrink-0 gap-3 md:flex-col md:gap-3 lg:flex-row">
                  <Button
                    asChild
                    size="sm"
                    className="flex-1 rounded-full bg-[#0d7377] text-white hover:bg-[#0d7377]/90 md:w-32 md:flex-none"
                  >
                    <a href={`tel:${clinic.phone.replace(/\s|-/g, "")}`}>
                      <Phone className="mr-1.5 h-4 w-4" />
                      电话咨询
                    </a>
                  </Button>
                  {clinic.mapUrl && (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="flex-1 rounded-full border-[#e8e4db] md:w-32 md:flex-none"
                    >
                      <a
                        href={clinic.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Navigation className="mr-1.5 h-4 w-4" />
                        导航前往
                      </a>
                    </Button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="relative overflow-hidden bg-[#0d7377] py-16 text-white md:py-24">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 md:h-96 md:w-96" />
        <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-white/5 md:h-[28rem] md:w-[28rem]" />
        <div className="relative container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-medium tracking-wide text-white/80">
              在线预约
            </p>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
              预约咨询
            </h2>
            <p className="mb-8 text-white/90">
              您可以通过在线预约系统选择合适的分院和就诊时间，我们的工作人员会尽快与您确认
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white px-8 text-[#0d7377] hover:bg-white/90"
              >
                <a href="/booking">
                  <Calendar className="mr-2 h-4 w-4" />
                  立即预约
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/40 bg-transparent px-8 text-white hover:bg-white/10"
              >
                <a href="tel:021-58660039">
                  <Phone className="mr-2 h-4 w-4" />
                  021-5866 0039
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
