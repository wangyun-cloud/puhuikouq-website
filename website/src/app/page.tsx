import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  ArrowRight,
  CircleDot,
  Smile,
  Sparkles,
  HeartPulse,
  Baby,
  ShieldCheck,
  Users,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BannerCarousel } from "@/components/home/banner-carousel";
import { AboutCarousel } from "@/components/home/about-carousel";
import { sanityFetch, isSanityConfigured, urlFor } from "@/lib/sanity";

interface BannerDoc {
  _id: string;
  title: string;
  subtitle?: string;
  image?: {
    asset?: { _ref?: string; _type?: string };
    alt?: string;
  };
  link?: string;
}

interface DoctorDoc {
  _id: string;
  name: string;
  photo?: {
    asset?: { _ref?: string; _type?: string };
    alt?: string;
  };
  title: string;
  specialties: string[];
  yearsOfPractice: number;
}

interface ClinicDoc {
  _id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
}

const bannersQuery = `*[_type == "banner" && active == true] | order(order asc) {
  _id,
  title,
  subtitle,
  image { asset { _ref }, alt },
  link
}`;

const doctorsQuery = `*[_type == "doctor"] | order(_createdAt desc)[0...6] {
  _id,
  name,
  photo { asset { _ref }, alt },
  title,
  specialties,
  yearsOfPractice
}`;

const clinicsQuery = `*[_type == "clinic"] | order(order asc) {
  _id,
  name,
  address,
  phone,
  hours
}`;

function getBannerImageUrl(doc: BannerDoc): string {
  if (!isSanityConfigured() || !doc.image?.asset?._ref) {
    return "/images/clinic/大厅.jpg";
  }
  try {
    return urlFor(doc.image).url();
  } catch {
    return "/images/clinic/大厅.jpg";
  }
}

function getDoctorImageUrl(doc: DoctorDoc): string {
  if (!isSanityConfigured() || !doc.photo?.asset?._ref) {
    return "";
  }
  try {
    return urlFor(doc.photo).url();
  } catch {
    return "";
  }
}

const fallbackBanners: BannerDoc[] = [
  {
    _id: "banner-1",
    title: "用心呵护每一颗牙齿",
    subtitle: "现代化诊疗环境，温馨舒适的就诊体验，守护全家口腔健康",
    link: "/booking",
  },
  {
    _id: "banner-2",
    title: "专业种植修复团队",
    subtitle: "多位认证种植医师，为您提供规范、专业的口腔诊疗服务",
    link: "/services/implant",
  },
  {
    _id: "banner-3",
    title: "温馨舒适的诊疗环境",
    subtitle: "独立诊室、先进设备，让您在轻松氛围中完成口腔治疗",
    link: "/contact",
  },
];

const realDoctorImages: Record<string, string> = {
  付煜: "/images/doctors/付煜.jpg",
  李玲玉: "/images/doctors/李玲玉.jpg",
  秦风显: "/images/doctors/秦风显.jpg",
  田佳琪: "/images/doctors/田佳琪.jpg",
  许重阳: "/images/doctors/许重阳.jpg",
  谢凯旋: "/images/doctors/谢凯旋.jpg",
  闪阳: "/images/doctors/闪阳.jpg",
  赵先林: "/images/doctors/赵先林.jpg",
  张力: "/images/doctors/张力.jpg",
  王星彤: "/images/doctors/王星彤.jpg",
};

const fallbackDoctors: DoctorDoc[] = [
  {
    _id: "doctor-1",
    name: "张力",
    photo: { asset: { _ref: "", _type: "image" }, alt: "张力医生" },
    title: "院长 / 副主任医师",
    specialties: ["种植牙", "全口种植修复"],
    yearsOfPractice: 15,
  },
  {
    _id: "doctor-2",
    name: "赵先林",
    photo: { asset: { _ref: "", _type: "image" }, alt: "赵先林医生" },
    title: "种植主任 / 副主任医师",
    specialties: ["疑难种植", "半口/全口种植"],
    yearsOfPractice: 18,
  },
  {
    _id: "doctor-3",
    name: "付煜",
    photo: { asset: { _ref: "", _type: "image" }, alt: "付煜医生" },
    title: "口腔全科医师",
    specialties: ["种植牙", "口腔修复"],
    yearsOfPractice: 12,
  },
  {
    _id: "doctor-4",
    name: "秦风显",
    photo: { asset: { _ref: "", _type: "image" }, alt: "秦风显医生" },
    title: "口腔主治医师",
    specialties: ["种植牙", "口腔修复"],
    yearsOfPractice: 15,
  },
  {
    _id: "doctor-5",
    name: "田佳琪",
    photo: { asset: { _ref: "", _type: "image" }, alt: "田佳琪医生" },
    title: "正畸专科医师",
    specialties: ["牙齿矫正", "隐形矫正"],
    yearsOfPractice: 8,
  },
  {
    _id: "doctor-6",
    name: "闪阳",
    photo: { asset: { _ref: "", _type: "image" }, alt: "闪阳医生" },
    title: "主治医师",
    specialties: ["微创种植", "即刻种植"],
    yearsOfPractice: 10,
  },
];

const services = [
  {
    href: "/services/implant",
    title: "种植牙",
    description: "帮助缺牙患者恢复咀嚼功能，改善生活质量",
    icon: CircleDot,
  },
  {
    href: "/services/orthodontics",
    title: "牙齿矫正",
    description: "针对牙齿排列不齐提供个性化矫正方案",
    icon: Smile,
  },
  {
    href: "/services/restoration",
    title: "牙齿修复",
    description: "修复缺损牙齿，恢复牙齿形态与功能",
    icon: Sparkles,
  },
  {
    href: "/services/periodontal",
    title: "牙周治疗",
    description: "针对牙龈出血、牙周炎症进行综合治疗",
    icon: HeartPulse,
  },
  {
    href: "/services/pediatric",
    title: "儿童口腔",
    description: "为儿童提供涂氟、窝沟封闭等预防性口腔服务",
    icon: Baby,
  },
];

const clinicGallery = [
  { src: "/images/clinic/大厅.jpg", alt: "候诊大厅", label: "候诊大厅" },
  { src: "/images/clinic/微信图片_20250618140550.jpg", alt: "前台导诊", label: "前台导诊" },
  { src: "/images/clinic/诊室.jpg", alt: "独立诊疗室", label: "独立诊疗室" },
  { src: "/images/clinic/CT.jpg", alt: "CBCT影像室", label: "CBCT影像室" },
  { src: "/images/clinic/操作间.jpg", alt: "无菌操作间", label: "无菌操作间" },
  { src: "/images/clinic/过道2.jpg", alt: "门诊走廊", label: "门诊走廊" },
  { src: "/images/clinic/茶水.jpg", alt: "患者荣誉墙", label: "患者荣誉墙" },
  { src: "/images/clinic/环境1.jpg", alt: "温馨环境", label: "温馨环境" },
];

export const metadata: Metadata = {
  title: "上海普惠口腔 - 专业口腔医疗服务",
  description:
    "上海普惠口腔提供种植牙、牙齿矫正、牙齿修复、牙周治疗、儿童口腔等专业口腔医疗服务，用心呵护每一颗牙齿，守护全家口腔健康。",
};

export default async function HomePage() {
  let banners: BannerDoc[] = [];
  let doctors: DoctorDoc[] = [];
  let clinics: ClinicDoc[] = [];

  if (isSanityConfigured()) {
    try {
      banners = await sanityFetch<BannerDoc[]>({
        query: bannersQuery,
        tags: ["banner"],
      });
    } catch {
      banners = fallbackBanners;
    }
    try {
      doctors = await sanityFetch<DoctorDoc[]>({
        query: doctorsQuery,
        tags: ["doctor"],
      });
    } catch {
      doctors = fallbackDoctors;
    }
    try {
      clinics = await sanityFetch<ClinicDoc[]>({
        query: clinicsQuery,
        tags: ["clinic"],
      });
    } catch {
      clinics = [];
    }
  } else {
    banners = fallbackBanners;
    doctors = fallbackDoctors;
  }

  const displayBanners =
    banners.length > 0
      ? banners.map((b) => ({
          _id: b._id,
          title: b.title,
          subtitle: b.subtitle,
          image: {
            asset: { url: getBannerImageUrl(b) },
            alt: b.image?.alt || b.title,
          },
          link: b.link,
        }))
      : fallbackBanners.map((b) => ({
          _id: b._id,
          title: b.title,
          subtitle: b.subtitle,
          image: {
            asset: { url: "/images/clinic/大厅.jpg" },
            alt: b.title,
          },
          link: b.link,
        }));

  const displayDoctors =
    doctors.length > 0
      ? doctors.map((d) => ({
          _id: d._id,
          name: d.name,
          photoUrl: getDoctorImageUrl(d) || realDoctorImages[d.name] || "",
          photoAlt: d.photo?.alt || `${d.name}医生照片`,
          title: d.title || "医师",
          specialties: d.specialties,
          yearsOfPractice: d.yearsOfPractice,
        }))
      : fallbackDoctors.map((d) => ({
          _id: d._id,
          name: d.name,
          photoUrl: realDoctorImages[d.name] || "",
          photoAlt: d.photo?.alt || `${d.name}医生照片`,
          title: d.title || "医师",
          specialties: d.specialties,
          yearsOfPractice: d.yearsOfPractice,
        }));

  const firstClinic = clinics[0];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "上海普惠口腔",
    description:
      "上海普惠口腔提供种植牙、牙齿矫正、牙齿修复、牙周治疗、儿童口腔等专业口腔医疗服务",
    url: "https://puhuikouq.com",
    telephone: firstClinic?.phone || "021-5866 0039",
    address: firstClinic
      ? {
          "@type": "PostalAddress",
          streetAddress: firstClinic.address,
          addressLocality: "上海",
          addressRegion: "上海",
          addressCountry: "CN",
        }
      : {
          "@type": "PostalAddress",
          streetAddress: "上海市浦东新区东方路1381号兰村大厦3楼（4号线蓝村路地铁站2号口旁）",
          addressLocality: "上海",
          addressRegion: "上海",
          addressCountry: "CN",
        },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    medicalSpecialty: {
      "@type": "MedicalSpecialty",
      name: "Dentistry",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <BannerCarousel banners={displayBanners} />

      {/* Introduction — Editorial split with carousel */}
      <section className="bg-[#f9f7f2] py-20 md:py-28">
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left: copy */}
            <div>
              <p className="mb-3 text-sm font-medium tracking-wide text-[#e86a33]">
                关于我们
              </p>
              <h2 className="mb-8 text-[2rem] font-bold leading-[1.1] text-[#1c1917] md:text-[2.5rem] lg:text-[3rem]">
                用心呵护
                <br />
                每一颗牙齿
              </h2>
              <p className="mb-8 max-w-md text-base leading-[1.8] text-[#57534e] md:text-[17px]">
                上海普惠口腔致力于为社区居民提供规范、专业的口腔医疗服务。
                配备完善的诊疗设备，注重就诊体验，帮助更多人维护口腔健康。
              </p>

              <div className="mb-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-md bg-[#0d7377] px-8 hover:bg-[#0a5c5f]">
                  <Link href="/booking">立即预约</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-md border-[#0d7377] px-8 text-[#0d7377] hover:bg-[#0d7377] hover:text-white">
                  <Link href="/services/implant">了解服务项目</Link>
                </Button>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#e8e4db] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0d7377]/10">
                    <Stethoscope className="h-5 w-5 text-[#0d7377]" />
                  </div>
                  <p className="mb-1 text-[15px] font-semibold text-[#1c1917]">专业医师团队</p>
                  <p className="text-sm leading-relaxed text-[#57534e]">多位资深口腔医师，覆盖种植、正畸、修复等全科领域</p>
                </div>
                <div className="rounded-2xl border border-[#e8e4db] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0d7377]/10">
                    <ShieldCheck className="h-5 w-5 text-[#0d7377]" />
                  </div>
                  <p className="mb-1 text-[15px] font-semibold text-[#1c1917]">规范诊疗流程</p>
                  <p className="text-sm leading-relaxed text-[#57534e]">严格遵循医疗规范，从检查到治疗全程透明可控</p>
                </div>
                <div className="rounded-2xl border border-[#e8e4db] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0d7377]/10">
                    <Users className="h-5 w-5 text-[#0d7377]" />
                  </div>
                  <p className="mb-1 text-[15px] font-semibold text-[#1c1917]">温馨就诊体验</p>
                  <p className="text-sm leading-relaxed text-[#57534e]">现代化环境与贴心服务，让您安心完成每一次治疗</p>
                </div>
              </div>
            </div>

            {/* Right: carousel */}
            <div>
              <AboutCarousel
                slides={[
                  { src: "/images/clinic/大厅.jpg", alt: "候诊大厅" },
                  { src: "/images/clinic/诊室.jpg", alt: "独立诊疗室" },
                  { src: "/images/clinic/微信图片_20250618140550.jpg", alt: "前台导诊" },
                  { src: "/images/clinic/环境1.jpg", alt: "温馨环境" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services — Bento grid */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mb-12 md:mb-16">
            <p className="mb-2 text-sm font-medium tracking-wide text-[#e86a33]">
              诊疗项目
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#1c1917] md:text-4xl">
              专业口腔医疗服务
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#57534e]">
              覆盖成人和儿童的多种口腔健康需求，提供规范、专业的诊疗方案
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
            {/* Featured: 种植牙 */}
            {(() => {
              const FeaturedIcon = services[0].icon;
              return (
                <Link
                  href={services[0].href}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#0d7377] p-7 text-white shadow-sm transition-all hover:shadow-md md:col-span-1 md:row-span-2 md:p-8"
                >
                  <div className="relative z-10">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 transition-colors group-hover:bg-white/20">
                      <FeaturedIcon className="h-7 w-7" strokeWidth={1.5} />
                    </div>
                <h3 className="mb-3 text-2xl font-semibold md:text-3xl">{services[0].title}</h3>
                <p className="text-base leading-relaxed text-white/85 md:text-lg">
                  帮助缺牙患者恢复咀嚼功能，改善生活质量。多位认证种植医师为您提供规范、专业的种植修复服务。
                </p>
              </div>
              <div className="relative z-10 mt-8 flex items-center gap-1 text-sm font-medium">
                了解更多
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
              {/* subtle decorative circle */}
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/5" />
            </Link>
              );
            })()}

            {/* Other 4 services */}
            {services.slice(1).map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group flex flex-col justify-between rounded-2xl border border-[#e8e4db] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0d7377]/30 hover:shadow-md"
                >
                  <div>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#f2efe8] text-[#0d7377] transition-colors group-hover:bg-[#0d7377] group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-[#1c1917]">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-[#57534e]">{service.description}</p>
                  </div>
                  <div className="mt-5 flex items-center gap-1 text-sm font-medium text-[#0d7377]">
                    了解更多
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clinic Environment — Asymmetric editorial gallery */}
      <section className="border-t bg-white py-20 md:py-28">
        <div className="container">
          <div className="mb-10 md:mb-14">
            <p className="mb-2 text-sm font-medium tracking-wide text-[#e86a33]">
              门诊环境
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#1c1917] md:text-4xl">
              温馨舒适的就诊空间
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#57534e]">
              现代化诊疗设备与温馨的就诊环境，让您在轻松氛围中完成口腔治疗
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-5 md:gap-5">
            {/* Left tall image */}
            <div className="group md:col-span-2">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#e8e4db] md:aspect-auto md:h-full md:min-h-[460px]">
                <Image
                  src={clinicGallery[0].src}
                  alt={clinicGallery[0].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-[#1c1917]">{clinicGallery[0].label}</p>
            </div>

            {/* Right grid */}
            <div className="grid grid-cols-2 gap-4 md:col-span-3 md:gap-5">
              {clinicGallery.slice(1, 5).map((item) => (
                <div key={item.src} className="group">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#e8e4db]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, 30vw"
                    />
                  </div>
                  <p className="mt-2 text-sm text-[#57534e]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Preview — Clean card grid */}
      <section className="bg-[#f9f7f2] py-20 md:py-28">
        <div className="container">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end md:mb-16">
            <div>
              <p className="mb-2 text-sm font-medium tracking-wide text-[#e86a33]">
                医生团队
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[#1c1917] md:text-4xl">
                经验丰富的口腔医疗团队
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-md border-[#0d7377] px-5 text-[#0d7377] hover:bg-[#0d7377] hover:text-white">
              <Link href="/doctors" className="inline-flex items-center gap-1">
                查看全部
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayDoctors.map((doctor) => (
              <article
                key={doctor._id}
                className="group rounded-2xl border border-[#e8e4db] bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md md:p-8"
              >
                {/* Avatar */}
                <div className="relative mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border-4 border-[#f2efe8] shadow-sm md:h-32 md:w-32">
                  {doctor.photoUrl ? (
                    <Image
                      src={doctor.photoUrl}
                      alt={doctor.photoAlt}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      sizes="128px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#e8e4db] text-[#78716c]">
                      <span className="text-3xl font-light">{doctor.name.slice(0, 1)}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-[#1c1917]">{doctor.name}</h3>
                <p className="mb-3 text-sm font-medium text-[#0d7377]">{doctor.title}</p>
                <p className="mb-4 text-sm text-[#57534e]">
                  从业 <span className="font-medium text-[#1c1917]">{doctor.yearsOfPractice} 年</span>
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {doctor.specialties.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[#0d7377]/20 bg-[#faf8f5] px-3 py-1 text-xs text-[#0d7377]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA — Bold brand block with glass card */}
      <section className="relative overflow-hidden bg-[#0d7377] py-20 text-white md:py-28">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 md:h-96 md:w-96" />
        <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-white/5 md:h-[28rem] md:w-[28rem]" />
        <div className="container relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-medium tracking-wide text-white/80">
                联系我们
              </p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                预约咨询
              </h2>
              <p className="text-lg leading-relaxed text-white/85">
                如果您有口腔健康方面的疑问，欢迎通过电话或在线方式预约咨询。
                我们的工作人员将为您安排合适的就诊时间。
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-md bg-white px-6 text-[#0d7377] hover:bg-white/90">
                  <Link href="/booking">在线预约</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-md border-white/40 bg-transparent px-6 text-white hover:bg-white/10"
                >
                  <a href="tel:021-58660039">拨打热线</a>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-md md:p-8">
              <h3 className="mb-6 text-lg font-semibold text-white">门诊信息</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">地址</p>
                    <p className="text-sm text-white/75">
                      {firstClinic?.address || "上海市浦东新区东方路1381号兰村大厦3楼（4号线蓝村路地铁站2号口旁）"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">电话</p>
                    <p className="text-sm text-white/75">
                      {firstClinic?.phone || "021-5866 0039"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">营业时间</p>
                    <p className="text-sm text-white/75">
                      {firstClinic?.hours || "周一至周日 09:00-18:00"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
