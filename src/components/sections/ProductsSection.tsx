"use client";

import ProductTabs from "@/components/ProductTabs";
import { useTranslations } from "next-intl";

export default function ProductsSection() {
  const tProducts = useTranslations("Products");

  return (
    <section id="products" className="py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="block text-gold font-bold tracking-widest text-sm mb-4 uppercase">{tProducts("subtitle")}</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">{tProducts("title")}</h2>
          <p className="text-lg text-slate-600">{tProducts("desc")}</p>
        </div>
        
        <ProductTabs />
      </div>
    </section>
  );
}
