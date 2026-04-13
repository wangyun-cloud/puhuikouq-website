import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  AlignCenterHorizontal,
  Puzzle,
  HeartPulse,
  Smile,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BannerCarousel } from "@/components/home/banner-carousel";
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

const doctorsQuery = `*[_type == "doctor"] | order(_createdAt desc)[0...4] {
  _id,
  name,
  photo { asset { _ref }, alt },
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
    return "/placeholder-banner.jpg";
  }
  try {
    return urlFor(doc.image).url();
  } catch {
    return "/placeholder-banner.jpg";
  }
}

function getDoctorImageUrl(doc: DoctorDoc): string {
  if (!isSanityConfigured() || !doc.photo?.asset?._ref) {
    return "/placeholder-doctor.jpg";
  }
  try {
    return urlFor(doc.photo).url();
  } catch {
    return "/placeholder-doctor.jpg";
  }
}

const fallbackBanners: BannerDoc[] = [
  {
    _id: "banner-1",
    title: "上海普惠口腔",
    subtitle: "用心呵护每一颗牙齿，守护全家口腔健康",
    link: "/services/implant",
  },
  {
    _id: "banner-2",
    title: "专业种植牙服务",
    subtitle: "先进的种植技术，帮助患者恢复咀嚼功能",
    link: "/services/implant",
  },
  {
    _id: "banner-3",
    title: "牙齿矫正咨询",
    subtitle: "个性化的矫正方案，改善牙齿排列",
    link: "/services/orthodontics",
  },
];

const fallbackDoctors: DoctorDoc[] = [
  {
    _id: "doctor-1",
    name: "张医生",
    specialties: ["种植牙", "口腔修复"],
    yearsOfPractice: 15,
  },
  {
    _id: "doctor-2",
    name: "李医生",
    specialties: ["牙齿矫正", "儿童口腔"],
    yearsOfPractice: 12,
  },
  {
    _id: "doctor-3",
    name: "王医生",
    specialties: ["牙周治疗", "根管治疗"],
    yearsOfPractice: 10,
  },
  {
    _id: "doctor-4",
    name: "陈医生",
    specialties: ["口腔外科", "种植牙"],
    yearsOfPractice: 8,
  },
];

const services = [
  {
    href: "/services/implant",
    title: "种植牙",
    description: "帮助缺牙患者恢复咀嚼功能，改善生活质量",
    icon: Sparkles,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    href: "/services/orthodontics",
    title: "牙齿矫正",
    description: "针对牙齿排列不齐提供个性化矫正方案",
    icon: AlignCenterHorizontal,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    href: "/services/restoration",
    title: "牙齿修复",
    description: "修复缺损牙齿，恢复牙齿形态与功能",
    icon: Puzzle,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    href: "/services/periodontal",
    title: "牙周治疗",
    description: "针对牙龈出血、牙周炎症进行综合治疗",
    icon: HeartPulse,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    href: "/services/pediatric",
    title: "儿童口腔",
    description: "为儿童提供涂氟、窝沟封闭等预防性口腔服务",
    icon: Smile,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

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
            asset: { url: "/placeholder-banner.jpg" },
            alt: b.title,
          },
          link: b.link,
        }));

  const displayDoctors =
    doctors.length > 0
      ? doctors.map((d) => ({
          _id: d._id,
          name: d.name,
          photoUrl: getDoctorImageUrl(d),
          photoAlt: d.photo?.alt || `${d.name}医生照片`,
          specialties: d.specialties,
          yearsOfPractice: d.yearsOfPractice,
        }))
      : fallbackDoctors.map((d) => ({
          _id: d._id,
          name: d.name,
          photoUrl: "/placeholder-doctor.jpg",
          photoAlt: `${d.name}医生照片`,
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
    telephone: firstClinic?.phone || "021-12345678",
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
          streetAddress: "上海市浦东新区陆家嘴环路1000号",
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

      {/* Introduction */}
      <section className="bg-warm-cream py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-primary md:text-4xl">
              上海普惠口腔
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              上海普惠口腔致力于为社区居民提供规范、专业的口腔医疗服务。我们配备完善的诊疗设备，
              注重 patient experience，希望能够帮助更多人维护口腔健康、预防和解决口腔问题。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/booking">立即预约</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services/implant">了解服务项目</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              诊疗项目
            </h2>
            <p className="mt-3 text-muted-foreground">
              覆盖成人和儿童的多种口腔健康需求
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group block rounded-xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${service.bg}`}
                  >
                    <Icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Doctors Preview */}
      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                医生团队
              </h2>
              <p className="mt-2 text-muted-foreground">
                经验丰富的口腔医疗团队
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/doctors" className="inline-flex items-center gap-1">
                查看全部
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayDoctors.map((doctor) => (
              <Card key={doctor._id} className="overflow-hidden">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                  {doctor.photoUrl !== "/placeholder-doctor.jpg" ? (
                    <Image
                      src={doctor.photoUrl}
                      alt={doctor.photoAlt}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-medical-blue to-medical-blue-light">
                      <span className="text-4xl font-bold text-white">
                        {doctor.name.slice(0, 1)}
                      </span>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{doctor.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    执业 {doctor.yearsOfPractice} 年
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {doctor.specialties.map((s) => (
                      <span
                        key={s}
                        className="inline-block rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold md:text-3xl">
                预约咨询
              </h2>
              <p className="text-primary-foreground/90">
                如果您有口腔健康方面的疑问，欢迎通过电话或在线方式预约咨询。
                我们的工作人员将为您安排合适的就诊时间。
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/booking">在线预约</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <a href="tel:021-12345678">拨打热线</a>
                </Button>
              </div>
            </div>

            <div className="space-y-6 rounded-xl bg-white/10 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold">门诊信息</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground/80" />
                  <div>
                    <p className="font-medium">地址</p>
                    <p className="text-sm text-primary-foreground/80">
                      {firstClinic?.address || "上海市浦东新区陆家嘴环路1000号"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground/80" />
                  <div>
                    <p className="font-medium">电话</p>
                    <p className="text-sm text-primary-foreground/80">
                      {firstClinic?.phone || "021-12345678"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground/80" />
                  <div>
                    <p className="font-medium">营业时间</p>
                    <p className="text-sm text-primary-foreground/80">
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
