"use client";

import { useState, useEffect } from "react";
import { Download, LayoutList, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import products from "../data/products.json";
import enMessages from "../../messages/en.json";

export default function ProductTabs() {
  const t = useTranslations("ProductTabs");
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [activeTab, setActiveTab] = useState("seafood");
  const [isProductListOpen, setIsProductListOpen] = useState(false);
  const [marqueeProducts, setMarqueeProducts] = useState<typeof products>([]);

  useEffect(() => {
    // Select 15 random products that have images
    const withImages = products.filter(p => p.image);
    const shuffled = [...withImages].sort(() => 0.5 - Math.random());
    setMarqueeProducts(shuffled.slice(0, 15));
  }, []);

  const tabs = [
    { id: "seafood", label: t("seafood") },
    { id: "frozen", label: t("frozen") },
    { id: "fresh", label: t("fresh") },
    { id: "coffee", label: t("coffee_tab") },
  ];

  return (
    <div className="w-full mt-12">
      <div className="flex flex-row overflow-x-auto snap-x md:justify-center gap-2 md:gap-4 mb-10 border-b border-slate-200 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`snap-start whitespace-nowrap px-4 md:px-6 py-4 text-base md:text-lg font-heading font-semibold transition-colors border-b-4 ${
              activeTab === tab.id
                ? "text-forest border-forest"
                : "text-slate-500 border-transparent hover:text-forest"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-ice-gray rounded-xl overflow-hidden shadow-sm">
        {activeTab === "seafood" && (
          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center animate-in fade-in duration-500">
            <div className="h-[400px] bg-slate-200 rounded-lg flex items-center justify-center border-2 border-slate-300 overflow-hidden relative">
              <img src="/images/shrimp.png" alt="Premium Frozen Shrimp" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h3 className="text-3xl font-heading font-bold text-forest mb-5">Seafood Mastery</h3>
              <div className="mb-8 p-5 bg-white rounded-xl shadow-md border border-slate-100 border-l-4 border-l-gold">
                <p className="text-slate-700 text-[15px] font-medium leading-relaxed">{t("seafood_desc")}</p>
                {isVi && <p className="text-[13px] text-slate-400 mt-2">{enMessages.ProductTabs.seafood_desc}</p>}
              </div>
              <ul className="space-y-0 text-slate-600 ml-2">
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_0_5px_white]"></span>
                  <div className="text-slate-800 leading-snug">
                    <strong className="text-forest font-bold">{t("seafood_1_label")}</strong> {t("seafood_1_val")}
                  </div>
                  {isVi && (
                    <div className="text-[13px] text-slate-400 mt-1.5 leading-snug">
                      <span className="font-medium text-slate-500">{enMessages.ProductTabs.seafood_1_label}</span> {enMessages.ProductTabs.seafood_1_val}
                    </div>
                  )}
                </li>
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_0_5px_white]"></span>
                  <div className="text-slate-800 leading-snug">
                    <strong className="text-forest font-bold">{t("seafood_2_label")}</strong> {t("seafood_2_val")}
                  </div>
                  {isVi && (
                    <div className="text-[13px] text-slate-400 mt-1.5 leading-snug">
                      <span className="font-medium text-slate-500">{enMessages.ProductTabs.seafood_2_label}</span> {enMessages.ProductTabs.seafood_2_val}
                    </div>
                  )}
                </li>
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_0_5px_white]"></span>
                  <div className="text-slate-800 leading-snug">
                    <strong className="text-forest font-bold">{t("seafood_3_label")}</strong> {t("seafood_3_val")}
                  </div>
                  {isVi && (
                    <div className="text-[13px] text-slate-400 mt-1.5 leading-snug">
                      <span className="font-medium text-slate-500">{enMessages.ProductTabs.seafood_3_label}</span> {enMessages.ProductTabs.seafood_3_val}
                    </div>
                  )}
                </li>
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_0_5px_white]"></span>
                  <div className="text-slate-800 leading-snug">
                    <strong className="text-forest font-bold">{t("seafood_4_label")}</strong> {t("seafood_4_val")}
                  </div>
                  {isVi && (
                    <div className="text-[13px] text-slate-400 mt-1.5 leading-snug">
                      <span className="font-medium text-slate-500">{enMessages.ProductTabs.seafood_4_label}</span> {enMessages.ProductTabs.seafood_4_val}
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === "frozen" && (
          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center animate-in fade-in duration-500">
            <div className="h-[400px] bg-slate-200 rounded-lg flex items-center justify-center border-2 border-slate-300 overflow-hidden relative">
              <img src="/images/frozen_fruits.png" alt="IQF Frozen Tropical Fruits" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h3 className="text-3xl font-heading font-bold text-forest mb-5">BQF / IQF Frozen Fruits</h3>
              <div className="mb-8 p-5 bg-white rounded-xl shadow-md border border-slate-100 border-l-4 border-l-gold">
                <p className="text-slate-700 text-[15px] font-medium leading-relaxed">{t("frozen_desc")}</p>
                {isVi && <p className="text-[13px] text-slate-400 mt-2">{enMessages.ProductTabs.frozen_desc}</p>}
              </div>
              <ul className="space-y-0 text-slate-600 ml-2">
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_0_5px_white]"></span>
                  <div className="text-slate-800 leading-snug">
                    <strong className="text-forest font-bold">{t("frozen_1_label")}</strong> {t("frozen_1_val")}
                  </div>
                  {isVi && (
                    <div className="text-[13px] text-slate-400 mt-1.5 leading-snug">
                      <span className="font-medium text-slate-500">{enMessages.ProductTabs.frozen_1_label}</span> {enMessages.ProductTabs.frozen_1_val}
                    </div>
                  )}
                </li>
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_0_5px_white]"></span>
                  <div className="text-slate-800 leading-snug">
                    <strong className="text-forest font-bold">{t("frozen_2_label")}</strong> {t("frozen_2_val")}
                  </div>
                  {isVi && (
                    <div className="text-[13px] text-slate-400 mt-1.5 leading-snug">
                      <span className="font-medium text-slate-500">{enMessages.ProductTabs.frozen_2_label}</span> {enMessages.ProductTabs.frozen_2_val}
                    </div>
                  )}
                </li>
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_0_5px_white]"></span>
                  <div className="text-slate-800 leading-snug">
                    <strong className="text-forest font-bold">{t("frozen_3_label")}</strong> {t("frozen_3_val")}
                  </div>
                  {isVi && (
                    <div className="text-[13px] text-slate-400 mt-1.5 leading-snug">
                      <span className="font-medium text-slate-500">{enMessages.ProductTabs.frozen_3_label}</span> {enMessages.ProductTabs.frozen_3_val}
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "fresh" && (
          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center animate-in fade-in duration-500">
            <div className="h-[400px] bg-slate-200 rounded-lg flex items-center justify-center border-2 border-slate-300 overflow-hidden relative">
              <img src="/images/fresh_fruits.png" alt="Fresh Orchards Produce" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h3 className="text-3xl font-heading font-bold text-forest mb-5">Fresh & Dried Selections</h3>
              <div className="mb-8 p-5 bg-white rounded-xl shadow-md border border-slate-100 border-l-4 border-l-gold">
                <p className="text-slate-700 text-[15px] font-medium leading-relaxed">{t("fresh_desc")}</p>
                {isVi && <p className="text-[13px] text-slate-400 mt-2">{enMessages.ProductTabs.fresh_desc}</p>}
              </div>
              <ul className="space-y-0 text-slate-600 ml-2">
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_0_5px_white]"></span>
                  <div className="text-slate-800 leading-snug">
                    <strong className="text-forest font-bold">{t("fresh_1_label")}</strong> {t("fresh_1_val")}
                  </div>
                  {isVi && (
                    <div className="text-[13px] text-slate-400 mt-1.5 leading-snug">
                      <span className="font-medium text-slate-500">{enMessages.ProductTabs.fresh_1_label}</span> {enMessages.ProductTabs.fresh_1_val}
                    </div>
                  )}
                </li>
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_0_5px_white]"></span>
                  <div className="text-slate-800 leading-snug">
                    <strong className="text-forest font-bold">{t("fresh_2_label")}</strong> {t("fresh_2_val")}
                  </div>
                  {isVi && (
                    <div className="text-[13px] text-slate-400 mt-1.5 leading-snug">
                      <span className="font-medium text-slate-500">{enMessages.ProductTabs.fresh_2_label}</span> {enMessages.ProductTabs.fresh_2_val}
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "coffee" && (
          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center animate-in fade-in duration-500">
            <div className="h-[400px] bg-slate-200 rounded-lg flex items-center justify-center border-2 border-slate-300 overflow-hidden relative">
              <img src="/images/coffee.png" alt="Golden Robusta Coffee Beans" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h3 className="text-3xl font-heading font-bold text-forest mb-5">Golden Robusta Export</h3>
              <div className="mb-8 p-5 bg-white rounded-xl shadow-md border border-slate-100 border-l-4 border-l-gold">
                <p className="text-slate-700 text-[15px] font-medium leading-relaxed">{t("coffee_desc")}</p>
                {isVi && <p className="text-[13px] text-slate-400 mt-2">{enMessages.ProductTabs.coffee_desc}</p>}
              </div>
              <ul className="space-y-0 text-slate-600 ml-2">
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_0_5px_white]"></span>
                  <div className="text-slate-800 leading-snug">
                    <strong className="text-forest font-bold">{t("coffee_1_label")}</strong> {t("coffee_1_val")}
                  </div>
                  {isVi && (
                    <div className="text-[13px] text-slate-400 mt-1.5 leading-snug">
                      <span className="font-medium text-slate-500">{enMessages.ProductTabs.coffee_1_label}</span> {enMessages.ProductTabs.coffee_1_val}
                    </div>
                  )}
                </li>
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_0_5px_white]"></span>
                  <div className="text-slate-800 leading-snug">
                    <strong className="text-forest font-bold">{t("coffee_2_label")}</strong> {t("coffee_2_val")}
                  </div>
                  {isVi && (
                    <div className="text-[13px] text-slate-400 mt-1.5 leading-snug">
                      <span className="font-medium text-slate-500">{enMessages.ProductTabs.coffee_2_label}</span> {enMessages.ProductTabs.coffee_2_val}
                    </div>
                  )}
                </li>
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_0_5px_white]"></span>
                  <div className="text-slate-800 leading-snug">
                    <strong className="text-forest font-bold">{t("coffee_3_label")}</strong> {t("coffee_3_val")}
                  </div>
                  {isVi && (
                    <div className="text-[13px] text-slate-400 mt-1.5 leading-snug">
                      <span className="font-medium text-slate-500">{enMessages.ProductTabs.coffee_3_label}</span> {enMessages.ProductTabs.coffee_3_val}
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-16 mb-8 overflow-hidden relative w-full flex flex-col items-center">
        <style>{`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 0.75rem)); }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 45s linear infinite;
            width: max-content;
          }
          .animate-infinite-scroll:hover {
            animation-play-state: paused;
          }
          .marquee-wrapper::-webkit-scrollbar { display: none; }
          .marquee-wrapper { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        
        {marqueeProducts.length > 0 && (
          <div className="w-full flex-1 overflow-hidden marquee-wrapper relative mb-10">
            {/* Gradient masks for smooth edge fading */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex gap-6 animate-infinite-scroll pr-6">
              {[...marqueeProducts, ...marqueeProducts].map((p, idx) => (
                <div key={`${p.id}-${idx}`} className="w-44 md:w-52 lg:w-60 bg-white rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-slate-100 flex-shrink-0 flex flex-col overflow-hidden group cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="h-36 md:h-44 lg:h-48 bg-slate-50 relative overflow-hidden">
                    {p.image ? (
                      <img src={p.image} alt={p.nameEn} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-300">No Image</div>
                    )}
                    <div className="absolute top-2 left-2 bg-white/95 backdrop-blur shadow-sm text-forest font-bold px-2 py-0.5 rounded-lg text-xs z-10 border border-slate-100">
                      {p.id}
                    </div>
                  </div>
                  <div className="p-4 text-center flex-1 flex flex-col justify-center">
                    <p className="font-heading font-bold text-slate-800 line-clamp-1 transition-colors group-hover:text-forest" title={p.nameVi}>{p.nameVi}</p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1" title={p.nameEn}>{p.nameEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={() => setIsProductListOpen(true)}
          className="flex items-center gap-3 px-8 py-4 bg-forest text-white rounded-full font-heading text-lg font-bold hover:bg-forest/90 transition-transform hover:-translate-y-1 shadow-xl hover:shadow-2xl"
        >
          <LayoutList size={24} />
          {t("view_product_list")}
        </button>
      </div>

      {isProductListOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsProductListOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-slate-100">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-forest flex items-center gap-3">
                <LayoutList className="text-gold" size={32} />
                {t("view_product_list")}
              </h2>
              <button onClick={() => setIsProductListOpen(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                <X size={28} />
              </button>
            </div>
            <div className="overflow-y-auto p-6 md:p-8 flex-1 bg-slate-50/80 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
                {products.map((p, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                    <div className="h-48 md:h-56 lg:h-64 relative bg-slate-100 overflow-hidden">
                      {p.image ? (
                        <img src={p.image} alt={p.nameEn} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-medium bg-slate-50">No Image</div>
                      )}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur shadow-sm text-forest font-bold px-3 py-1 rounded-lg text-sm z-10 border border-slate-100">
                        {p.id}
                      </div>
                    </div>
                    <div className="p-5 md:p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold font-heading text-slate-800 group-hover:text-forest transition-colors line-clamp-1" title={p.nameVi}>{p.nameVi}</h3>
                      <p className="text-slate-500 text-sm mb-4 line-clamp-1" title={p.nameEn}>{p.nameEn}</p>
                      
                      <div className="mt-auto space-y-3">
                        {p.packing && (
                          <div className="flex items-start gap-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <span className="text-gold shrink-0">📦</span>
                            <span className="line-clamp-2" title={p.packing}>{p.packing}</span>
                          </div>
                        )}
                        {p.notes && (
                          <div className="text-xs text-slate-400 italic line-clamp-2 px-1">
                            * {p.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
