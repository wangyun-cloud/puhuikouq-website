import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Calendar, Award, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sanityFetch, isSanityConfigured, urlFor } from "@/lib/sanity";

interface DoctorDoc {
  _id: string;
  name: string;
  photo?: {
    asset?: { _ref?: string; _type?: string };
    alt?: string;
  };
  education: string[];
  qualifications: string[];
  specialties: string[];
  yearsOfPractice: number;
  bio?: string;
}

const doctorsQuery = `*[_type == "doctor"] | order(order asc) {
  _id,
  name,
  photo { asset { _ref }, alt },
  education,
  qualifications,
  specialties,
  yearsOfPractice,
  bio
}`;

const fallbackDoctors: DoctorDoc[] = [
  {
    _id: "doctor-1",
    name: "张明远",
    education: ["上海交通大学医学院口腔医学硕士"],
    qualifications: ["口腔执业医师", "种植修复专科培训证书"],
    specialties: ["种植牙", "口腔修复"],
    yearsOfPractice: 15,
    bio: "长期从事口腔种植与修复临床工作，注重治疗方案的规范化与个性化。",
  },
  {
    _id: "doctor-2",
    name: "李静怡",
    education: ["四川大学华西口腔医学院正畸学硕士"],
    qualifications: ["口腔执业医师", "口腔正畸专科医师"],
    specialties: ["牙齿矫正", "儿童口腔"],
    yearsOfPractice: 12,
    bio: "专注于青少年及成人牙齿矫正，重视矫正过程中的口腔健康管理。",
  },
  {
    _id: "doctor-3",
    name: "王建华",
    education: ["同济大学口腔医学院牙周病学硕士"],
    qualifications: ["口腔执业医师", "牙周病专科培训证书"],
    specialties: ["牙周治疗", "根管治疗"],
    yearsOfPractice: 10,
    bio: "擅长牙周疾病的综合诊治与长期维护，倡导预防为主的口腔健康理念。",
  },
  {
    _id: "doctor-4",
    name: "陈思源",
    education: ["复旦大学上海医学院口腔医学学士"],
    qualifications: ["口腔执业医师", "口腔外科培训证书"],
    specialties: ["口腔外科", "种植牙"],
    yearsOfPractice: 8,
    bio: "主要从事口腔外科及种植修复工作，注重手术安全和患者体验。",
  },
];

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

export const metadata: Metadata = {
  title: "医生团队",
  description:
    "了解上海普惠口腔的医生团队：教育背景、执业资质、诊疗方向及从业经历。",
  alternates: {
    canonical: "/doctors",
  },
};

export default async function DoctorsPage() {
  let doctors: DoctorDoc[] = [];

  if (isSanityConfigured()) {
    try {
      doctors = await sanityFetch<DoctorDoc[]>({
        query: doctorsQuery,
        tags: ["doctor"],
      });
    } catch {
      doctors = fallbackDoctors;
    }
  } else {
    doctors = fallbackDoctors;
  }

  const displayDoctors =
    doctors.length > 0
      ? doctors.map((d) => ({
          ...d,
          photoUrl: getDoctorImageUrl(d),
          photoAlt: d.photo?.alt || `${d.name}医生照片`,
        }))
      : fallbackDoctors.map((d) => ({
          ...d,
          photoUrl: "",
          photoAlt: `${d.name}医生照片`,
        }));

  const physicianSchemas = displayDoctors.map((doctor) => ({
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    medicalSpecialty: doctor.specialties.join(", "),
    description: doctor.bio,
    worksFor: {
      "@type": "MedicalOrganization",
      name: "上海普惠口腔",
    },
    alumniOf: doctor.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu,
    })),
    hasCredential: doctor.qualifications.map((q) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: q,
    })),
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(physicianSchemas),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-medical-blue via-medical-blue to-medical-blue-dark py-16 text-white md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              医生团队
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              经验丰富的口腔医疗团队，致力于为患者提供规范、专业的诊疗服务
            </p>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayDoctors.map((doctor) => (
              <Card key={doctor._id} className="overflow-hidden">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                  {doctor.photoUrl ? (
                    <Image
                      src={doctor.photoUrl}
                      alt={doctor.photoAlt}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      unoptimized
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
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    执业 {doctor.yearsOfPractice} 年
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div className="space-y-1">
                        {doctor.education.map((edu) => (
                          <p key={edu} className="text-xs text-foreground">
                            {edu}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div className="flex flex-wrap gap-1">
                        {doctor.qualifications.map((q) => (
                          <span
                            key={q}
                            className="inline-block rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                          >
                            {q}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {doctor.specialties.map((s) => (
                      <span
                        key={s}
                        className="inline-block rounded border border-primary/20 bg-primary/5 px-2 py-0.5 text-xs text-primary"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {doctor.bio && (
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {doctor.bio}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-primary md:text-3xl">
              预约咨询
            </h2>
            <p className="mb-8 text-muted-foreground">
              如果您希望了解更多诊疗信息或预约就诊，欢迎通过电话或在线方式联系我们
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <a href="tel:021-12345678">
                  <Phone className="mr-2 h-4 w-4" />
                  021-12345678
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="/booking">
                  <Calendar className="mr-2 h-4 w-4" />
                  在线预约
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
