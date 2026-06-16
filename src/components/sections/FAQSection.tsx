"use client";

import FAQAccordion from "@/components/FAQAccordion";
import { useTranslations } from "next-intl";

export default function FAQSection() {
  const tFAQ = useTranslations("FAQ");

  return (
    <section id="faq" className="py-24 bg-ice-gray/40 border-t border-slate-100">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="block text-gold font-bold tracking-widest text-sm mb-4 uppercase">{tFAQ("subtitle")}</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">{tFAQ("title")}</h2>
          <p className="text-lg text-slate-600">{tFAQ("desc")}</p>
        </div>
        <FAQAccordion />
      </div>
    </section>
  );
}
