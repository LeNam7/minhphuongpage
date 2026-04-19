"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProductTabs() {
  const t = useTranslations("ProductTabs");
  const [activeTab, setActiveTab] = useState("seafood");

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
              <h3 className="text-3xl font-heading font-bold text-forest mb-4">Seafood Mastery</h3>
              <p className="text-slate-600 mb-6">{t("seafood_desc")}</p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>{t("seafood_1_label")}</strong>&nbsp;{t("seafood_1_val")}</li>
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>{t("seafood_2_label")}</strong>&nbsp;{t("seafood_2_val")}</li>
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>{t("seafood_3_label")}</strong>&nbsp;{t("seafood_3_val")}</li>
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>{t("seafood_4_label")}</strong>&nbsp;{t("seafood_4_val")}</li>
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
              <h3 className="text-3xl font-heading font-bold text-forest mb-4">BQF / IQF Frozen Fruits</h3>
              <p className="text-slate-600 mb-6">{t("frozen_desc")}</p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>{t("frozen_1_label")}</strong>&nbsp;{t("frozen_1_val")}</li>
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>{t("frozen_2_label")}</strong>&nbsp;{t("frozen_2_val")}</li>
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>{t("frozen_3_label")}</strong>&nbsp;{t("frozen_3_val")}</li>
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
              <h3 className="text-3xl font-heading font-bold text-forest mb-4">Fresh & Dried Selections</h3>
              <p className="text-slate-600 mb-6">{t("fresh_desc")}</p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>{t("fresh_1_label")}</strong>&nbsp;{t("fresh_1_val")}</li>
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>{t("fresh_2_label")}</strong>&nbsp;{t("fresh_2_val")}</li>
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
              <h3 className="text-3xl font-heading font-bold text-forest mb-4">Golden Robusta Export</h3>
              <p className="text-slate-600 mb-6">{t("coffee_desc")}</p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>{t("coffee_1_label")}</strong>&nbsp;{t("coffee_1_val")}</li>
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>{t("coffee_2_label")}</strong>&nbsp;{t("coffee_2_val")}</li>
                <li className="flex items-start"><span className="text-gold mr-2">✓</span><strong>{t("coffee_3_label")}</strong>&nbsp;{t("coffee_3_val")}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      

    </div>
  );
}
