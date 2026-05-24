"use client";

import { useState, useEffect, useRef } from "react";
import { Download, LayoutList, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import products from "../data/products.json";
import enMessages from "../../messages/en.json";

const TAB_ICONS: Record<string, (isActive: boolean) => React.ReactNode> = {
  seafood: (isActive) => (
    <div className={`relative flex items-center justify-center rounded-xl shrink-0 transition-all duration-500 ease-out ${
      isActive 
        ? "w-13 h-13 bg-white/15 border border-white/25 text-white" 
        : "w-11 h-11 bg-slate-50 border border-slate-200/80 text-slate-500 group-hover:text-slate-700 group-hover:border-slate-300"
    }`}>
      <svg className={`transition-transform duration-500 ease-out ${isActive ? "scale-105" : "scale-95"}`} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12c.5-2.5 2.5-4.5 5.5-4.5C11 7.5 13 9 15 11c3 3 5 4 7 4M2 12c.5 2.5 2.5 4.5 5.5 4.5C11 16.5 13 15 15 13c3-3 5-4 7-4" />
        <path d="M20 9c-.5 1-1.5 2-2 3M22 12c-1.5.5-3 .5-4.5 0" />
        <path d="M2 12h4" />
      </svg>
    </div>
  ),
  frozen: (isActive) => (
    <div className={`relative flex items-center justify-center rounded-xl shrink-0 transition-all duration-500 ease-out ${
      isActive 
        ? "w-13 h-13 bg-white/15 border border-white/25 text-white" 
        : "w-11 h-11 bg-slate-50 border border-slate-200/80 text-slate-500 group-hover:text-slate-700 group-hover:border-slate-300"
    }`}>
      <svg className={`transition-transform duration-500 ease-out ${isActive ? "scale-105" : "scale-95"}`} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
        <path d="M10 4l2 2 2-2M10 20l2-2 2 2M4 10l2 2-2 2M20 10l2 2-2 2" />
      </svg>
    </div>
  ),
  fresh: (isActive) => (
    <div className={`relative flex items-center justify-center rounded-xl shrink-0 transition-all duration-500 ease-out ${
      isActive 
        ? "w-13 h-13 bg-white/15 border border-white/25 text-white" 
        : "w-11 h-11 bg-slate-50 border border-slate-200/80 text-slate-500 group-hover:text-slate-700 group-hover:border-slate-300"
    }`}>
      <svg className={`transition-transform duration-500 ease-out ${isActive ? "scale-105" : "scale-95"}`} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 20 2c-1.2 5.7-1.8 7.2-7.9 13A7 7 0 0 1 11 20z" />
        <path d="M9 11l4 4" />
      </svg>
    </div>
  ),
  coffee: (isActive) => (
    <div className={`relative flex items-center justify-center rounded-xl shrink-0 transition-all duration-500 ease-out ${
      isActive 
        ? "w-13 h-13 bg-white/15 border border-white/25 text-white" 
        : "w-11 h-11 bg-slate-50 border border-slate-200/80 text-slate-500 group-hover:text-slate-700 group-hover:border-slate-300"
    }`}>
      <svg className={`transition-transform duration-500 ease-out ${isActive ? "scale-105" : "scale-95"}`} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="12" rx="9" ry="6" transform="rotate(-45 12 12)" />
        <path d="M6.3 17.7c2-1 3.5-3.5 5.7-5.7 2.2-2.2 4.7-3.7 5.7-5.7" />
      </svg>
    </div>
  ),
  cashew: (isActive) => (
    <div className={`relative flex items-center justify-center rounded-xl shrink-0 transition-all duration-500 ease-out ${
      isActive 
        ? "w-13 h-13 bg-white/15 border border-white/25 text-white" 
        : "w-11 h-11 bg-slate-50 border border-slate-200/80 text-slate-500 group-hover:text-slate-700 group-hover:border-slate-300"
    }`}>
      <svg className={`transition-transform duration-500 ease-out ${isActive ? "scale-105" : "scale-95"}`} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21a9 9 0 0 1-9-9c0-3.5 2.5-6.5 6-7.5 1-.3 2.5 0 3.5 1a3.5 3.5 0 0 0 4 .5c2.5-1.5 4.5.5 4.5 3 0 4-3.5 12-9 12z" />
        <path d="M8 12c1 1.5 2.5 2 4 1" opacity="0.6" />
      </svg>
    </div>
  ),
  ceramics: (isActive) => (
    <div className={`relative flex items-center justify-center rounded-xl shrink-0 transition-all duration-500 ease-out ${
      isActive 
        ? "w-13 h-13 bg-white/15 border border-white/25 text-white" 
        : "w-11 h-11 bg-slate-50 border border-slate-200/80 text-slate-500 group-hover:text-slate-700 group-hover:border-slate-300"
    }`}>
      <svg className={`transition-transform duration-500 ease-out ${isActive ? "scale-105" : "scale-95"}`} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6M10 3v2c-2.5.5-4 2.5-4 5.5 0 4.5 2 7.5 6 7.5s6-3 6-7.5c0-3-1.5-5-4-5.5V3" />
        <path d="M6.3 12.5h11.4" opacity="0.4" />
        <path d="M12 21a6 6 0 0 1-6-6M12 21a6 6 0 0 0 6-6" />
      </svg>
    </div>
  )
};

export default function ProductTabs() {
  const t = useTranslations("ProductTabs");
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [activeTab, setActiveTab] = useState("seafood");
  const [isProductListOpen, setIsProductListOpen] = useState(false);
  const [marqueeProducts, setMarqueeProducts] = useState<typeof products>([]);
  const [isPaused, setIsPaused] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "seafood", label: t("seafood") },
    { id: "frozen", label: t("frozen") },
    { id: "fresh", label: t("fresh") },
    { id: "coffee", label: t("coffee_tab") },
    { id: "cashew", label: t("cashew") },
    { id: "ceramics", label: t("ceramics") },
  ];

  useEffect(() => {
    // Select 15 random products that have images
    const withImages = products.filter(p => p.image);
    const shuffled = [...withImages].sort(() => 0.5 - Math.random());
    setMarqueeProducts(shuffled.slice(0, 15));
  }, []);

  // Auto-play Carousel Effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = tabs.findIndex((tab) => tab.id === current);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, 6000); // Transitions every 6 seconds

    return () => clearInterval(interval);
  }, [activeTab, isPaused]);

  // Smooth scroll active tab button into view on small screens
  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeEl = tabsContainerRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeTab]);

  return (
    <div 
      className="w-full mt-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Wrapper to center the tabs container if it fits, or align to start if it overflows */}
      <div className="w-full flex justify-start lg:justify-center">
        <div 
          ref={tabsContainerRef}
          className="flex flex-row overflow-x-auto snap-x justify-start items-center gap-3 md:gap-5 mb-12 pb-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 max-w-full"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                data-active={isActive}
                className={`snap-start flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-500 ease-out border-2 select-none group cursor-pointer ${
                  isActive
                    ? "bg-forest border-forest text-white shadow-[0_4px_15px_rgba(26,62,43,0.18)] scale-102"
                    : "bg-white/60 border-slate-200/80 text-slate-500 hover:bg-white hover:border-slate-300 hover:text-slate-700"
                }`}
              >
                {/* Visual Icon with dynamic active/inactive scaling */}
                {TAB_ICONS[tab.id] ? TAB_ICONS[tab.id](isActive) : null}
                
                {/* Text Label that expands and opacity transitions on active */}
                <span className={`font-heading font-bold text-base md:text-lg transition-all duration-500 ease-out overflow-hidden whitespace-nowrap ${
                  isActive
                    ? "max-w-[300px] opacity-100 ml-1.5"
                    : "max-w-0 opacity-0 w-0 pointer-events-none"
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative bg-ice-gray rounded-xl overflow-hidden shadow-sm">
        {/* Subtle auto-advance progress indicator */}
        <div 
          className="absolute top-0 left-0 h-1 bg-gold/85 z-20 transition-all duration-100"
          style={{
            animation: isPaused ? 'none' : 'tabProgress 6000ms linear forwards',
            width: isPaused ? '0%' : undefined
          }}
          key={`${activeTab}-${isPaused}`} // Resets animation when tab changes or pauses
        />

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes tabProgress {
            from { width: 0%; }
            to { width: 100%; }
          }
          .premium-anim-left {
            animation: premiumFadeInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
          }
          .premium-anim-right {
            animation: premiumFadeInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
          }
          .stagger-item-1 { animation: staggerItem 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; animation-delay: 100ms; }
          .stagger-item-2 { animation: staggerItem 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; animation-delay: 180ms; }
          .stagger-item-3 { animation: staggerItem 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; animation-delay: 260ms; }
          .stagger-item-4 { animation: staggerItem 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; animation-delay: 340ms; }

          @keyframes premiumFadeInLeft {
            0% {
              opacity: 0;
              transform: translateX(-40px) scale(0.96);
            }
            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }
          @keyframes premiumFadeInRight {
            0% {
              opacity: 0;
              transform: translateX(40px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes staggerItem {
            0% {
              opacity: 0;
              transform: translateY(15px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}} />

        {activeTab === "seafood" && (
          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center">
            <div className="h-[400px] bg-slate-200 rounded-lg flex items-center justify-center border-2 border-slate-300 overflow-hidden relative premium-anim-left">
              <Image src="/images/shrimp.png" alt="Premium Frozen Shrimp" fill className="object-cover rounded-lg" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="premium-anim-right">
              <h3 className="text-3xl font-heading font-bold text-forest mb-5">Seafood Mastery</h3>
              <div className="mb-8 p-5 bg-white rounded-xl shadow-md border border-slate-100 border-l-4 border-l-gold">
                <p className="text-slate-700 text-[15px] font-medium leading-relaxed">{t("seafood_desc")}</p>
                {isVi && <p className="text-[13px] text-slate-400 mt-2">{enMessages.ProductTabs.seafood_desc}</p>}
              </div>
              <ul className="space-y-0 text-slate-600 ml-2">
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0 stagger-item-1">
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
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0 stagger-item-2">
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
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0 stagger-item-3">
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
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0 stagger-item-4">
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
          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center">
            <div className="h-[400px] bg-slate-200 rounded-lg flex items-center justify-center border-2 border-slate-300 overflow-hidden relative premium-anim-left">
              <Image src="/images/frozen_fruits.png" alt="IQF Frozen Tropical Fruits" fill className="object-cover rounded-lg" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="premium-anim-right">
              <h3 className="text-3xl font-heading font-bold text-forest mb-5">BQF / IQF Frozen Fruits</h3>
              <div className="mb-8 p-5 bg-white rounded-xl shadow-md border border-slate-100 border-l-4 border-l-gold">
                <p className="text-slate-700 text-[15px] font-medium leading-relaxed">{t("frozen_desc")}</p>
                {isVi && <p className="text-[13px] text-slate-400 mt-2">{enMessages.ProductTabs.frozen_desc}</p>}
              </div>
              <ul className="space-y-0 text-slate-600 ml-2">
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0 stagger-item-1">
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
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0 stagger-item-2">
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
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0 stagger-item-3">
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
          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center">
            <div className="h-[400px] bg-slate-200 rounded-lg flex items-center justify-center border-2 border-slate-300 overflow-hidden relative premium-anim-left">
              <Image src="/images/fresh_fruits.png" alt="Fresh Orchards Produce" fill className="object-cover rounded-lg" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="premium-anim-right">
              <h3 className="text-3xl font-heading font-bold text-forest mb-5">Fresh & Dried Selections</h3>
              <div className="mb-8 p-5 bg-white rounded-xl shadow-md border border-slate-100 border-l-4 border-l-gold">
                <p className="text-slate-700 text-[15px] font-medium leading-relaxed">{t("fresh_desc")}</p>
                {isVi && <p className="text-[13px] text-slate-400 mt-2">{enMessages.ProductTabs.fresh_desc}</p>}
              </div>
              <ul className="space-y-0 text-slate-600 ml-2">
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0 stagger-item-1">
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
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0 stagger-item-2">
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
          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center">
            <div className="h-[400px] bg-slate-200 rounded-lg flex items-center justify-center border-2 border-slate-300 overflow-hidden relative premium-anim-left">
              <Image src="/images/coffee.png" alt="Golden Robusta Coffee Beans" fill className="object-cover rounded-lg" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="premium-anim-right">
              <h3 className="text-3xl font-heading font-bold text-forest mb-5">Golden Robusta Export</h3>
              <div className="mb-8 p-5 bg-white rounded-xl shadow-md border border-slate-100 border-l-4 border-l-gold">
                <p className="text-slate-700 text-[15px] font-medium leading-relaxed">{t("coffee_desc")}</p>
                {isVi && <p className="text-[13px] text-slate-400 mt-2">{enMessages.ProductTabs.coffee_desc}</p>}
              </div>
              <ul className="space-y-0 text-slate-600 ml-2">
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0 stagger-item-1">
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
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0 stagger-item-2">
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
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0 stagger-item-3">
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

        {activeTab === "cashew" && (
          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center">
            <div className="h-[400px] bg-slate-200 rounded-lg flex items-center justify-center border-2 border-slate-300 overflow-hidden relative premium-anim-left">
              <Image src="/images/cashew.png" alt="Premium Roasted Cashews" fill className="object-cover rounded-lg" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="premium-anim-right">
              <h3 className="text-3xl font-heading font-bold text-forest mb-5">Premium Roasted Cashews</h3>
              <div className="mb-8 p-5 bg-white rounded-xl shadow-md border border-slate-100 border-l-4 border-l-gold">
                <p className="text-slate-700 text-[15px] font-medium leading-relaxed">{t("cashew_desc")}</p>
                {isVi && <p className="text-[13px] text-slate-400 mt-2">{enMessages.ProductTabs.cashew_desc}</p>}
              </div>
              <ul className="space-y-0 text-slate-600 ml-2">
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0 stagger-item-1">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_0_5px_white]"></span>
                  <div className="text-slate-800 leading-snug">
                    <strong className="text-forest font-bold">{t("cashew_1_label")}</strong> {t("cashew_1_val")}
                  </div>
                  {isVi && (
                    <div className="text-[13px] text-slate-400 mt-1.5 leading-snug">
                      <span className="font-medium text-slate-500">{enMessages.ProductTabs.cashew_1_label}</span> {enMessages.ProductTabs.cashew_1_val}
                    </div>
                  )}
                </li>
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0 stagger-item-2">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_0_5px_white]"></span>
                  <div className="text-slate-800 leading-snug">
                    <strong className="text-forest font-bold">{t("cashew_2_label")}</strong> {t("cashew_2_val")}
                  </div>
                  {isVi && (
                    <div className="text-[13px] text-slate-400 mt-1.5 leading-snug">
                      <span className="font-medium text-slate-500">{enMessages.ProductTabs.cashew_2_label}</span> {enMessages.ProductTabs.cashew_2_val}
                    </div>
                  )}
                </li>
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0 stagger-item-3">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_0_5px_white]"></span>
                  <div className="text-slate-800 leading-snug">
                    <strong className="text-forest font-bold">{t("cashew_3_label")}</strong> {t("cashew_3_val")}
                  </div>
                  {isVi && (
                    <div className="text-[13px] text-slate-400 mt-1.5 leading-snug">
                      <span className="font-medium text-slate-500">{enMessages.ProductTabs.cashew_3_label}</span> {enMessages.ProductTabs.cashew_3_val}
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "ceramics" && (
          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center">
            <div className="h-[400px] bg-slate-200 rounded-lg flex items-center justify-center border-2 border-slate-300 overflow-hidden relative premium-anim-left">
              <Image src="/images/ceramics.png" alt="Handmade Ceramics & Handicrafts" fill className="object-cover rounded-lg" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="premium-anim-right">
              <h3 className="text-3xl font-heading font-bold text-forest mb-5">Handmade Ceramics & Art</h3>
              <div className="mb-8 p-5 bg-white rounded-xl shadow-md border border-slate-100 border-l-4 border-l-gold">
                <p className="text-slate-700 text-[15px] font-medium leading-relaxed">{t("ceramics_desc")}</p>
                {isVi && <p className="text-[13px] text-slate-400 mt-2">{enMessages.ProductTabs.ceramics_desc}</p>}
              </div>
              <ul className="space-y-0 text-slate-600 ml-2">
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0 stagger-item-1">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_0_5px_white]"></span>
                  <div className="text-slate-800 leading-snug">
                    <strong className="text-forest font-bold">{t("ceramics_1_label")}</strong> {t("ceramics_1_val")}
                  </div>
                  {isVi && (
                    <div className="text-[13px] text-slate-400 mt-1.5 leading-snug">
                      <span className="font-medium text-slate-500">{enMessages.ProductTabs.ceramics_1_label}</span> {enMessages.ProductTabs.ceramics_1_val}
                    </div>
                  )}
                </li>
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0 stagger-item-2">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_0_5px_white]"></span>
                  <div className="text-slate-800 leading-snug">
                    <strong className="text-forest font-bold">{t("ceramics_2_label")}</strong> {t("ceramics_2_val")}
                  </div>
                  {isVi && (
                    <div className="text-[13px] text-slate-400 mt-1.5 leading-snug">
                      <span className="font-medium text-slate-500">{enMessages.ProductTabs.ceramics_2_label}</span> {enMessages.ProductTabs.ceramics_2_val}
                    </div>
                  )}
                </li>
                <li className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0 stagger-item-3">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_0_5px_white]"></span>
                  <div className="text-slate-800 leading-snug">
                    <strong className="text-forest font-bold">{t("ceramics_3_label")}</strong> {t("ceramics_3_val")}
                  </div>
                  {isVi && (
                    <div className="text-[13px] text-slate-400 mt-1.5 leading-snug">
                      <span className="font-medium text-slate-500">{enMessages.ProductTabs.ceramics_3_label}</span> {enMessages.ProductTabs.ceramics_3_val}
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
                      <Image src={p.image} alt={p.nameEn} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw" />
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
                        <Image src={p.image} alt={p.nameEn} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
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
