import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Phone, Clock, Calendar } from "lucide-react";

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServicePageData {
  title: string;
  subtitle: string;
  description: string;
  whatIs: {
    title: string;
    content: string;
  };
  applicable: {
    title: string;
    situations: string[];
  };
  process: {
    title: string;
    steps: ServiceProcessStep[];
  };
  precautions: {
    title: string;
    items: string[];
  };
  faq: {
    title: string;
    items: ServiceFAQ[];
  };
}

interface ServicePageTemplateProps {
  service: ServicePageData;
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Hero */}
      <section className="bg-[#0d7377] py-16 text-white md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-medium tracking-wide text-white/80">
              上海普惠口腔
            </p>
            <h1 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              {service.title}
            </h1>
            <p className="mb-6 text-lg text-white/90 md:text-xl">
              {service.subtitle}
            </p>
            <p className="mx-auto max-w-2xl text-white/80">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* What is */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-sm font-medium tracking-wide text-[#e86a33]">
              项目介绍
            </p>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-[#1c1917] md:text-3xl">
              {service.whatIs.title}
            </h2>
            <p className="leading-relaxed text-[#57534e]">
              {service.whatIs.content}
            </p>
          </div>
        </div>
      </section>

      {/* Applicable situations */}
      <section className="border-t border-[#e7e5e4] bg-[#f9f7f2] py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-sm font-medium tracking-wide text-[#e86a33]">
              适用情况
            </p>
            <h2 className="mb-8 text-2xl font-semibold tracking-tight text-[#1c1917] md:text-3xl">
              {service.applicable.title}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {service.applicable.situations.map((situation, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 rounded-lg border border-[#e7e5e4] bg-white p-5 transition-shadow hover:shadow-md"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0d7377] text-xs font-medium text-white">
                    {index + 1}
                  </span>
                  <span className="text-[#57534e]">{situation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Treatment process */}
      <section className="bg-[#faf8f5] py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-center text-sm font-medium tracking-wide text-[#e86a33]">
              诊疗流程
            </p>
            <h2 className="mb-12 text-center text-2xl font-semibold tracking-tight text-[#1c1917] md:text-3xl">
              {service.process.title}
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-[#0d7377]/30 via-[#0d7377]/20 to-[#0d7377]/30 md:left-8" />

              <div className="space-y-8">
                {service.process.steps.map((step, index) => (
                  <div
                    key={index}
                    className="relative flex items-start gap-5 md:gap-8"
                  >
                    {/* Step number */}
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0d7377] text-sm font-bold text-white shadow-md ring-4 ring-[#faf8f5] md:h-16 md:w-16 md:text-base md:shadow-lg">
                      {step.step}
                    </div>

                    {/* Content card */}
                    <div className="flex-1 rounded-xl border border-[#e8e4db] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:p-6">
                      <h3 className="text-lg font-semibold text-[#1c1917] md:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#78716c] md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Precautions */}
      <section className="border-t border-[#e7e5e4] bg-[#f9f7f2] py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-sm font-medium tracking-wide text-[#e86a33]">
              注意事项
            </p>
            <h2 className="mb-8 text-2xl font-semibold tracking-tight text-[#1c1917] md:text-3xl">
              {service.precautions.title}
            </h2>
            <div className="rounded-lg border border-[#e7e5e4] bg-white p-6 shadow-sm">
              <ul className="space-y-3">
                {service.precautions.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d7377]" />
                    <span className="text-[#57534e]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-sm font-medium tracking-wide text-[#e86a33]">
              常见问题
            </p>
            <h2 className="mb-8 text-2xl font-semibold tracking-tight text-[#1c1917] md:text-3xl">
              {service.faq.title}
            </h2>
            <Accordion multiple className="w-full">
              {service.faq.items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-[#1c1917]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#57534e]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-stone-900 py-20 text-white md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-medium tracking-wide text-[#e86a33]">
              预约咨询
            </p>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight md:text-3xl">
              预约{service.title}咨询
            </h2>
            <p className="mb-8 text-white/90">
              如果您对{service.title}有任何疑问，欢迎预约咨询，我们的工作人员将为您安排合适的就诊时间。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="px-8">
                <Link href="/booking">
                  <Calendar className="mr-2 h-4 w-4" />
                  在线预约
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent px-8 text-white hover:bg-white/10"
              >
                <a href="tel:021-58660039">
                  <Phone className="mr-2 h-4 w-4" />
                  021-5866 0039
                </a>
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/80">
              <Clock className="h-4 w-4" />
              <span>周一至周日 09:00 - 18:00</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
