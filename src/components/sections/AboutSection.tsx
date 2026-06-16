"use client";

import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutSection() {
  const tAbout = useTranslations("About");

  return (
    <section id="about" className="py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="block text-gold font-bold tracking-widest text-sm mb-4 uppercase">{tAbout("subtitle")}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6 leading-tight">
              {tAbout("title")}
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {tAbout("desc")}
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-start">
                <CheckCircle2 className="text-gold mr-3 shrink-0" />
                <span className="text-slate-700"><strong>{tAbout("quality_title")}</strong> {tAbout("quality_desc")}</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="text-gold mr-3 shrink-0" />
                <span className="text-slate-700"><strong>{tAbout("transparency_title")}</strong> {tAbout("transparency_desc")}</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="text-gold mr-3 shrink-0" />
                <span className="text-slate-700"><strong>{tAbout("sustainability_title")}</strong> {tAbout("sustainability_desc")}</span>
              </li>
            </ul>
            
            <a href="#facilities" className="inline-flex items-center font-heading font-semibold text-forest border-b-2 border-forest pb-1 hover:text-gold hover:border-gold transition-colors">
              {tAbout("cta")} <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
          
          <div className="h-[500px] bg-ice-gray rounded-2xl flex items-center justify-center shadow-sm relative overflow-hidden">
              <Image src="/images/engineers.png" alt="High-tech agricultural engineers" fill className="object-cover rounded-2xl" sizes="(max-width: 768px) 100vw, 50vw" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
