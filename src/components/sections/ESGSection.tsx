"use client";

import Image from "next/image";
import { ShieldCheck, Leaf } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ESGSection() {
  const tESG = useTranslations("ESG");

  return (
    <section id="sustainability" className="py-24 bg-navy text-white relative overflow-hidden">
      <div className="absolute right-[-10%] top-[-10%] w-[50%] h-[120%] bg-forest opacity-30 blur-3xl transform -rotate-12 pointer-events-none"></div>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div className="z-10">
          <span className="block text-gold font-bold tracking-widest text-sm mb-4 uppercase">{tESG("subtitle")}</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6 leading-tight">
            {tESG("title")}
          </h2>
          <p className="text-lg text-slate-300 mb-10">
            {tESG("desc")}
          </p>
          
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold font-heading text-white mb-2 flex items-center"><ShieldCheck className="w-5 h-5 text-gold mr-2" /> {tESG("blockchain_title")}</h4>
              <p className="text-slate-400 text-sm">{tESG("blockchain_desc")}</p>
            </div>
            <div>
              <h4 className="text-lg font-bold font-heading text-white mb-2 flex items-center"><Leaf className="w-5 h-5 text-gold mr-2" /> {tESG("lowemission_title")}</h4>
              <p className="text-slate-400 text-sm">{tESG("lowemission_desc")}</p>
            </div>
          </div>
        </div>
        
        <div className="h-[450px] bg-[#141d29] rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden z-10">
           <Image src="/images/map.png" alt="Global Market Reach 15+ Countries" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </div>
    </section>
  );
}
