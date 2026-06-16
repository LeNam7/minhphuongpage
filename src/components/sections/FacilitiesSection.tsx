"use client";

import { Fish, ThermometerSnowflake, Coffee, Factory } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FacilitiesSection() {
  const tFacilities = useTranslations("Facilities");

  return (
    <section id="facilities" className="py-24 bg-ice-gray">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="block text-gold font-bold tracking-widest text-sm mb-4 uppercase">{tFacilities("subtitle")}</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">{tFacilities("title")}</h2>
          <p className="text-lg text-slate-600">{tFacilities("desc")}</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl hover:shadow-forest/5 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 ease-out border-t-4 border-transparent hover:border-forest cursor-pointer">
            <Fish className="w-12 h-12 text-forest mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
            <h3 className="text-xl font-heading font-bold text-navy mb-2">{tFacilities("seafood_title")}</h3>
            <p className="text-forest font-semibold mb-4">{tFacilities("seafood_cap")}</p>
            <p className="text-slate-600 text-sm">{tFacilities("seafood_desc")}</p>
          </div>
          
          <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl hover:shadow-forest/5 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 ease-out border-t-4 border-transparent hover:border-forest cursor-pointer">
            <ThermometerSnowflake className="w-12 h-12 text-forest mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
            <h3 className="text-xl font-heading font-bold text-navy mb-2">{tFacilities("fruit_title")}</h3>
            <p className="text-forest font-semibold mb-4">{tFacilities("fruit_cap")}</p>
            <p className="text-slate-600 text-sm">{tFacilities("fruit_desc")}</p>
          </div>
          
          <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl hover:shadow-forest/5 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 ease-out border-t-4 border-transparent hover:border-forest cursor-pointer">
            <Coffee className="w-12 h-12 text-forest mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
            <h3 className="text-xl font-heading font-bold text-navy mb-2">{tFacilities("coffee_title")}</h3>
            <p className="text-forest font-semibold mb-4">{tFacilities("coffee_cap")}</p>
            <p className="text-slate-600 text-sm">{tFacilities("coffee_desc")}</p>
          </div>
          
          <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl hover:shadow-forest/5 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 ease-out border-t-4 border-transparent hover:border-forest cursor-pointer">
            <Factory className="w-12 h-12 text-forest mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
            <h3 className="text-xl font-heading font-bold text-navy mb-2">{tFacilities("storage_title")}</h3>
            <p className="text-forest font-semibold mb-4">{tFacilities("storage_cap")}</p>
            <p className="text-slate-600 text-sm">{tFacilities("storage_desc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
