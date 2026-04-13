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
      <section className="bg-gradient-to-br from-medical-blue via-medical-blue to-medical-blue-dark py-16 text-white md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
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
            <h2 className="mb-6 text-2xl font-bold text-primary md:text-3xl">
              {service.whatIs.title}
            </h2>
            <p className="leading-relaxed text-foreground">
              {service.whatIs.content}
            </p>
          </div>
        </div>
      </section>

      {/* Applicable situations */}
      <section className="border-t bg-warm-cream py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold text-primary md:text-3xl">
              {service.applicable.title}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {service.applicable.situations.map((situation, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{situation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Treatment process */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-10 text-center text-2xl font-bold text-primary md:text-3xl">
              {service.process.title}
            </h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2" />
              <div className="space-y-8">
                {service.process.steps.map((step, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div
                      key={index}
                      className={`relative flex items-center gap-6 md:gap-0 ${
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div
                        className={`hidden w-1/2 md:block ${
                          isEven ? "pr-10 text-right" : "pl-10 text-left"
                        }`}
                      >
                        <h3 className="text-lg font-semibold text-foreground">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>

                      <div className="absolute left-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground md:left-1/2">
                        {step.step}
                      </div>

                      <div className="ml-10 w-full md:ml-0 md:w-1/2 md:pl-10">
                        <h3 className="text-lg font-semibold text-foreground md:hidden">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground md:hidden">
                          {step.description}
                        </p>
                        <div
                          className={`hidden md:block ${
                            isEven ? "pl-10 text-left" : "pr-10 text-right"
                          }`}
                        >
                          <h3 className="text-lg font-semibold text-foreground">
                            {step.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Precautions */}
      <section className="border-t bg-muted/30 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold text-primary md:text-3xl">
              {service.precautions.title}
            </h2>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <ul className="space-y-3">
                {service.precautions.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-foreground">{item}</span>
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
            <h2 className="mb-8 text-2xl font-bold text-primary md:text-3xl">
              {service.faq.title}
            </h2>
            <Accordion multiple className="w-full">
              {service.faq.items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              预约{service.title}咨询
            </h2>
            <p className="mb-8 text-primary-foreground/90">
              如果您对{service.title}有任何疑问，欢迎预约咨询，我们的工作人员将为您安排合适的就诊时间。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/booking">
                  <Calendar className="mr-2 h-4 w-4" />
                  在线预约
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="tel:021-12345678">
                  <Phone className="mr-2 h-4 w-4" />
                  021-12345678
                </a>
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-primary-foreground/80">
              <Clock className="h-4 w-4" />
              <span>周一至周日 09:00 - 18:00</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
