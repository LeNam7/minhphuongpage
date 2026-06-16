"use client";

import { useTranslations } from "next-intl";

export default function SupplyChainSection() {
  const tSupplyChain = useTranslations("SupplyChain");

  return (
    <section id="supply-chain" className="py-24 border-y border-slate-100 relative overflow-hidden">
      <div className="absolute -left-[500px] top-0 w-[1000px] h-[1000px] bg-forest/5 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="block text-gold font-bold tracking-widest text-sm mb-4 uppercase">{tSupplyChain("subtitle")}</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">{tSupplyChain("title")}</h2>
          <p className="text-lg text-slate-600">{tSupplyChain("desc")}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-slate-200 -z-10"></div>
          
          <div className="text-center relative">
            <div className="w-24 h-24 bg-white border-4 border-ice-gray text-forest rounded-full flex items-center justify-center font-heading font-bold text-2xl mx-auto mb-6 shadow-sm">
              01
            </div>
            <h4 className="text-xl font-bold font-heading text-navy mb-3">{tSupplyChain("step1_title")}</h4>
            <p className="text-sm text-slate-500">{tSupplyChain("step1_desc")}</p>
          </div>
          
          <div className="text-center relative">
            <div className="w-24 h-24 bg-forest border-4 border-ice-gray text-white rounded-full flex items-center justify-center font-heading font-bold text-2xl mx-auto mb-6 shadow-md">
              02
            </div>
            <h4 className="text-xl font-bold font-heading text-navy mb-3">{tSupplyChain("step2_title")}</h4>
            <p className="text-sm text-slate-500">{tSupplyChain("step2_desc")}</p>
          </div>
          
          <div className="text-center relative">
            <div className="w-24 h-24 bg-white border-4 border-ice-gray text-forest rounded-full flex items-center justify-center font-heading font-bold text-2xl mx-auto mb-6 shadow-sm">
              03
            </div>
            <h4 className="text-xl font-bold font-heading text-navy mb-3">{tSupplyChain("step3_title")}</h4>
            <p className="text-sm text-slate-500">{tSupplyChain("step3_desc")}</p>
          </div>
          
          <div className="text-center relative">
            <div className="w-24 h-24 bg-white border-4 border-ice-gray text-forest rounded-full flex items-center justify-center font-heading font-bold text-2xl mx-auto mb-6 shadow-sm">
              04
            </div>
            <h4 className="text-xl font-bold font-heading text-navy mb-3">{tSupplyChain("step4_title")}</h4>
            <p className="text-sm text-slate-500">{tSupplyChain("step4_desc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
