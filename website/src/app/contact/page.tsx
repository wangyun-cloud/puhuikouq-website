import type { Metadata } from "next";
import Image from "next/image";
import { Phone, MapPin, Clock, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const fallbackClinics: ClinicDoc[] = [
  {
    _id: "clinic-1",
    name: "陆家嘴分院",
    address: "上海市浦东新区陆家嘴环路1000号",
    phone: "021-12345678",
    hours: "周一至周日 09:00-18:00",
    mapUrl: "https://map.baidu.com",
  },
  {
    _id: "clinic-2",
    name: "静安分院",
    address: "上海市静安区南京西路1688号",
    phone: "021-87654321",
    hours: "周一至周日 09:00-18:00",
    mapUrl: "https://map.baidu.com",
  },
  {
    _id: "clinic-3",
    name: "徐汇分院",
    address: "上海市徐汇区淮海中路999号",
    phone: "021-11223344",
    hours: "周一至周日 09:00-18:00",
    mapUrl: "https://map.baidu.com",
  },
  {
    _id: "clinic-4",
    name: "虹桥分院",
    address: "上海市闵行区申长路888号",
    phone: "021-55667788",
    hours: "周一至周日 09:00-18:00",
    mapUrl: "https://map.baidu.com",
  },
];

function getClinicImageUrl(doc: ClinicDoc): string {
  if (!isSanityConfigured() || !doc.image?.asset?._ref) {
    return "";
  }
  try {
    return urlFor(doc.image).url();
  } catch {
    return "";
  }
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
      clinics = fallbackClinics;
    }
  } else {
    clinics = fallbackClinics;
  }

  const displayClinics =
    clinics.length > 0
      ? clinics.map((c) => ({
          ...c,
          imageUrl: getClinicImageUrl(c),
          imageAlt: c.image?.alt || `${c.name}照片`,
        }))
      : fallbackClinics.map((c) => ({
          ...c,
          imageUrl: "",
          imageAlt: `${c.name}照片`,
        }));

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-medical-blue via-medical-blue to-medical-blue-dark py-16 text-white md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              联系我们
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              上海普惠口腔在上海设有多家分院，方便您就近就诊
            </p>
          </div>
        </div>
      </section>

      {/* Clinics Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayClinics.map((clinic) => (
              <Card key={clinic._id} className="overflow-hidden">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                  {clinic.imageUrl ? (
                    <Image
                      src={clinic.imageUrl}
                      alt={clinic.imageAlt}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-medical-blue to-medical-blue-light">
                      <MapPin className="h-10 w-10 text-white/80" />
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{clinic.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm text-foreground">{clinic.address}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm text-foreground">{clinic.phone}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm text-foreground">{clinic.hours}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <a href={`tel:${clinic.phone}`}>
                        <Phone className="mr-1 h-3.5 w-3.5" />
                        电话
                      </a>
                    </Button>
                    {clinic.mapUrl && (
                      <Button asChild size="sm" variant="outline" className="flex-1">
                        <a
                          href={clinic.mapUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink className="mr-1 h-3.5 w-3.5" />
                          地图
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="border-t bg-muted/30 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-primary md:text-3xl">
              在线预约
            </h2>
            <p className="mb-8 text-muted-foreground">
              您可以通过在线预约系统选择合适的分院和就诊时间，我们的工作人员会尽快与您确认
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <a href="/booking">
                  <Calendar className="mr-2 h-4 w-4" />
                  立即预约
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
