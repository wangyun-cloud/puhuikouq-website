import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Calendar, Award, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sanityFetch, isSanityConfigured, urlFor } from "@/lib/sanity";
import { fallbackDoctors, realDoctorImages, type DoctorDoc } from "@/lib/doctors-data";

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

function getDoctorImageUrl(doc: DoctorDoc): string {
  if (isSanityConfigured() && doc.photo?.asset?._ref) {
    try {
      return urlFor(doc.photo).url();
    } catch {
      // fall through to local
    }
  }
  return realDoctorImages[doc.name] || "";
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
          photoUrl: getDoctorImageUrl(d) || realDoctorImages[d.name] || "",
          photoAlt: d.photo?.alt || `${d.name}医生照片`,
        }))
      : fallbackDoctors.map((d) => ({
          ...d,
          photoUrl: realDoctorImages[d.name] || "",
          photoAlt: d.photo?.alt || `${d.name}医生照片`,
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
      <section className="bg-[#f9f7f2] py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-medium tracking-wide text-[#e86a33]">
              上海普惠口腔
            </p>
            <h1 className="mb-4 text-3xl font-semibold tracking-tight text-[#1c1917] md:text-4xl lg:text-5xl">
              医生团队
            </h1>
            <p className="text-lg text-[#57534e] md:text-xl">
              经验丰富的口腔医疗团队，致力于为患者提供规范、专业的诊疗服务
            </p>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="bg-[#faf8f5] py-16 md:py-24">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayDoctors.map((doctor) => (
              <article
                key={doctor._id}
                className="group relative flex flex-col rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-8"
              >
                {/* Avatar */}
                <div className="relative mx-auto mb-5">
                  <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-[#f2efe8] shadow-md transition-transform duration-500 group-hover:scale-105">
                    {doctor.photoUrl ? (
                      <Image
                        src={doctor.photoUrl}
                        alt={doctor.photoAlt}
                        fill
                        className="object-cover object-center"
                        loading="eager"
                        sizes="144px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#e8e4db] text-[#78716c]">
                        <span className="text-3xl font-light">
                          {doctor.name.slice(0, 1)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-[#0d7377] px-3 py-1 text-xs font-medium text-white shadow-sm">
                    {doctor.yearsOfPractice} 年经验
                  </div>
                </div>

                {/* Name & Title */}
                <div className="mb-4 text-center">
                  <h2 className="text-xl font-semibold text-[#1c1917]">
                    {doctor.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-[#0d7377]">
                    {doctor.title}
                  </p>
                </div>

                {/* Specialties */}
                <div className="mb-5 flex flex-wrap justify-center gap-2">
                  {doctor.specialties.map((s) => (
                    <Badge
                      key={s}
                      variant="outline"
                      className="rounded-full border-[#0d7377]/20 bg-[#0d7377]/5 px-2.5 py-0.5 text-xs font-medium text-[#0d7377] hover:bg-[#0d7377]/10"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>

                {/* Details */}
                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-[#0d7377]" />
                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-[#57534e]">
                      {doctor.education.map((edu) => (
                        <span key={edu}>{edu}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Award className="mt-0.5 h-4 w-4 shrink-0 text-[#0d7377]" />
                    <div className="flex flex-wrap gap-1">
                      {doctor.qualifications.slice(0, 2).map((q) => (
                        <span
                          key={q}
                          className="inline-block rounded-full bg-[#f2efe8] px-2 py-0.5 text-xs text-[#57534e]"
                        >
                          {q}
                        </span>
                      ))}
                      {doctor.qualifications.length > 2 && (
                        <span className="inline-block rounded-full bg-[#f2efe8] px-2 py-0.5 text-xs text-[#57534e]">
                          +{doctor.qualifications.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-[#78716c]">
                  {doctor.bio}
                </p>

                <div className="mt-auto text-center">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="rounded-full border-[#0d7377] px-6 text-xs text-[#0d7377] hover:bg-[#0d7377] hover:text-white"
                  >
                    <a href="/booking">预约咨询</a>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 text-white md:py-28">
        <Image
          src="/images/clinic/诊室.jpg"
          alt="诊所环境"
          fill
          className="object-cover"
          loading="lazy"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="relative container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-medium tracking-wide text-[#e86a33]">
              预约咨询
            </p>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight md:text-3xl">
              预约咨询
            </h2>
            <p className="mb-8 text-white/90">
              如果您希望了解更多诊疗信息或预约就诊，欢迎通过电话或在线方式联系我们
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="px-8">
                <a href="tel:021-58660039">
                  <Phone className="mr-2 h-4 w-4" />
                  021-5866 0039
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent px-8 text-white hover:bg-white/10"
              >
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
