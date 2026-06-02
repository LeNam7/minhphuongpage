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
        <line x1="12" y1="2" x2="12" y2="8" />
        <path d="M12 8c-4 0-7 2-7 6h14c0-4-3-6-7-6z" />
        <path d="M5 14h14" />
        <path d="M9 10v4" opacity="0.5" />
        <path d="M12 8v6" opacity="0.8" />
        <path d="M15 10v4" opacity="0.5" />
        <circle cx="12" cy="17" r="1.5" />
        <line x1="12" y1="18.5" x2="12" y2="20" opacity="0.8" />
        <line x1="10.5" y1="17" x2="9" y2="17" opacity="0.8" />
        <line x1="13.5" y1="17" x2="15" y2="17" opacity="0.8" />
      </svg>
    </div>
  )
};

const TAB_DATA: Record<string, {
  title: string;
  descKey: string;
  rawImage: string;
  packagedImage: string;
  subItems: {
    id: string;
    labelKey: string;
    valKey: string;
  }[];
}> = {
  seafood: {
    title: "Seafood Mastery",
    descKey: "seafood_desc",
    rawImage: "/images/shrimp.png",
    packagedImage: "/images/seafood_export.png",
    subItems: [
      { id: "seafood_1", labelKey: "seafood_1_label", valKey: "seafood_1_val" },
      { id: "seafood_2", labelKey: "seafood_2_label", valKey: "seafood_2_val" },
      { id: "seafood_3", labelKey: "seafood_3_label", valKey: "seafood_3_val" },
      { id: "seafood_4", labelKey: "seafood_4_label", valKey: "seafood_4_val" }
    ]
  },
  frozen: {
    title: "BQF / IQF Frozen Fruits",
    descKey: "frozen_desc",
    rawImage: "/images/frozen_fruits.png",
    packagedImage: "/images/frozen_export.png",
    subItems: [
      { id: "frozen_1", labelKey: "frozen_1_label", valKey: "frozen_1_val" },
      { id: "frozen_2", labelKey: "frozen_2_label", valKey: "frozen_2_val" },
      { id: "frozen_3", labelKey: "frozen_3_label", valKey: "frozen_3_val" }
    ]
  },
  fresh: {
    title: "Fresh & Dried Selections",
    descKey: "fresh_desc",
    rawImage: "/images/fresh_fruits.png",
    packagedImage: "/images/fresh_export.png",
    subItems: [
      { id: "fresh_1", labelKey: "fresh_1_label", valKey: "fresh_1_val" },
      { id: "fresh_2", labelKey: "fresh_2_label", valKey: "fresh_2_val" }
    ]
  },
  coffee: {
    title: "Golden Robusta Export",
    descKey: "coffee_desc",
    rawImage: "/images/green_coffee.png",
    packagedImage: "/images/coffee_export.png",
    subItems: [
      { id: "coffee_1", labelKey: "coffee_1_label", valKey: "coffee_1_val" },
      { id: "coffee_2", labelKey: "coffee_2_label", valKey: "coffee_2_val" },
      { id: "coffee_3", labelKey: "coffee_3_label", valKey: "coffee_3_val" }
    ]
  },
  cashew: {
    title: "Premium Roasted Cashews",
    descKey: "cashew_desc",
    rawImage: "/images/cashew.png",
    packagedImage: "/images/cashew_export.png",
    subItems: [
      { id: "cashew_1", labelKey: "cashew_1_label", valKey: "cashew_1_val" },
      { id: "cashew_2", labelKey: "cashew_2_label", valKey: "cashew_2_val" },
      { id: "cashew_3", labelKey: "cashew_3_label", valKey: "cashew_3_val" }
    ]
  },
  ceramics: {
    title: "Bamboo & Rattan Art",
    descKey: "ceramics_desc",
    rawImage: "/images/bamboo_raw_materials.png",
    packagedImage: "/images/bamboo_rattan_lamps.png",
    subItems: [
      { id: "ceramics_1", labelKey: "ceramics_1_label", valKey: "ceramics_1_val" },
      { id: "ceramics_2", labelKey: "ceramics_2_label", valKey: "ceramics_2_val" },
      { id: "ceramics_3", labelKey: "ceramics_3_label", valKey: "ceramics_3_val" }
    ]
  }
};;

export default function ProductTabs() {
  const t = useTranslations("ProductTabs");
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [activeTab, setActiveTab] = useState("seafood");
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const [isProductListOpen, setIsProductListOpen] = useState(false);
  const [marqueeProducts, setMarqueeProducts] = useState<typeof products>([]);
  const [isPaused, setIsPaused] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const outerContainerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    if (outerContainerRef.current) {
      observer.observe(outerContainerRef.current);
    }
    return () => observer.disconnect();
  }, []);

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
    if (isPaused || !isIntersecting) return;

    const interval = setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = tabs.findIndex((tab) => tab.id === current);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, 6000); // Transitions every 6 seconds

    return () => clearInterval(interval);
  }, [activeTab, isPaused, isIntersecting]);

  // Smooth scroll active tab button to the left side of the container on small screens
  useEffect(() => {
    if (tabsContainerRef.current) {
      const container = tabsContainerRef.current;
      
      const performScroll = () => {
        const activeEl = container.querySelector('[data-active="true"]') as HTMLElement;
        if (activeEl) {
          const buttonLeft = activeEl.offsetLeft;
          // Align the button to the left edge of the container with a 16px padding offset
          const targetScrollLeft = buttonLeft - 16;
          
          container.scrollTo({
            left: Math.max(0, targetScrollLeft),
            behavior: "smooth"
          });
        }
      };

      // Run once immediately
      performScroll();

      // Run again at 150ms and 300ms to adjust scroll as width layout settles during CSS transition
      const timer1 = setTimeout(performScroll, 150);
      const timer2 = setTimeout(performScroll, 300);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [activeTab]);

  return (
    <div 
      ref={outerContainerRef}
      className="w-full mt-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Wrapper to center the tabs container if it fits, or align to start if it overflows */}
      <div className="w-full flex justify-start lg:justify-center">
        <div 
          ref={tabsContainerRef}
          className="flex flex-row overflow-x-auto justify-start items-center gap-3 md:gap-5 mb-12 pb-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 max-w-full"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                data-active={isActive}
                className={`flex-shrink-0 flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-500 ease-out border-2 select-none group cursor-pointer ${
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

      <div className="relative bg-ice-gray rounded-xl overflow-hidden shadow-sm min-h-[660px] sm:min-h-[610px] md:min-h-[560px] lg:min-h-[520px] flex flex-col justify-stretch">
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
              transform: translate3d(-40px, 0, 0) scale3d(0.96, 0.96, 1);
            }
            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
            }
          }
          @keyframes premiumFadeInRight {
            0% {
              opacity: 0;
              transform: translate3d(40px, 0, 0);
            }
            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }
          @keyframes staggerItem {
            0% {
              opacity: 0;
              transform: translate3d(0, 15px, 0);
            }
            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }
        `}} />

        {(() => {
          const currentTabData = TAB_DATA[activeTab];
          if (!currentTabData) return null;
          const productTabsEn = enMessages.ProductTabs as Record<string, string>;

          return (
            <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 p-6 md:p-10 lg:p-12 items-stretch flex-grow w-full h-auto">
              {/* Left Column: Symmetrical Widescreen Dual-Image Showcase (Vertical Stack) */}
              <div className="premium-anim-left bg-white p-3 md:p-4 rounded-[32px] border border-slate-200/70 shadow-[0_20px_50px_rgba(0,0,0,0.04)] flex flex-col justify-between gap-4 h-full min-h-[380px] md:min-h-[440px] lg:min-h-[480px] w-full">
                {/* Image 1: Raw / Pre-processed */}
                <div 
                  onClick={() => setLightboxImage({ src: currentTabData.rawImage, alt: isVi ? "Nguyên Liệu Sơ Chế" : "Raw Materials" })}
                  className="relative w-full h-[180px] md:h-1/2 rounded-2xl md:rounded-[20px] overflow-hidden border border-slate-200/50 shadow-sm group transition-all duration-500 hover:!opacity-100 hover:!scale-[1.02] hover:!blur-none hover:shadow-xl hover:border-forest/30 group-hover/outer:opacity-75 group-hover/outer:scale-[0.98] group-hover/outer:blur-[0.5px] cursor-zoom-in flex-grow"
                >
                  <Image
                    src={currentTabData.rawImage}
                    alt={isVi ? "Nguyên liệu sơ chế" : "Raw / Pre-processed"}
                    fill
                    className="object-cover transition-transform duration-[1000ms] group-hover:scale-108 select-none"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                  />
                  {/* Bottom Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                  
                  {/* Premium Forest Leaf Glassmorphic Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-forest/85 backdrop-blur-md border border-white/20 rounded-2xl py-3 px-2 flex items-center justify-center gap-2 text-white shadow-lg transition-all duration-500 group-hover:scale-102 group-hover:bg-forest">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold shrink-0"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z"/><path d="M9 22v-4h-4"/></svg>
                    <span className="font-heading font-extrabold text-[11px] md:text-[13px] tracking-wider uppercase">{isVi ? "Nguyên Liệu Sơ Chế" : "Raw Materials"}</span>
                  </div>
                </div>

                {/* Image 2: Export Packaged */}
                <div 
                  onClick={() => setLightboxImage({ src: currentTabData.packagedImage, alt: isVi ? "Đóng Gói Thành Phẩm" : "Export Packaged" })}
                  className="relative w-full h-[180px] md:h-1/2 rounded-2xl md:rounded-[20px] overflow-hidden border border-slate-200/50 shadow-sm group transition-all duration-500 hover:!opacity-100 hover:!scale-[1.02] hover:!blur-none hover:shadow-xl hover:border-gold/40 group-hover/outer:opacity-75 group-hover/outer:scale-[0.98] group-hover/outer:blur-[0.5px] cursor-zoom-in flex-grow"
                >
                  <Image
                    src={currentTabData.packagedImage}
                    alt={isVi ? "Đóng gói thành phẩm" : "Export Packaged"}
                    fill
                    className="object-cover transition-transform duration-[1000ms] group-hover:scale-108 select-none"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  {/* Bottom Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                  
                  {/* Premium Gold Shipment Glassmorphic Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-gold/90 backdrop-blur-md border border-white/25 rounded-2xl py-3 px-2 flex items-center justify-center gap-2 text-white shadow-lg transition-all duration-500 group-hover:scale-102 group-hover:bg-gold">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white shrink-0"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                    <span className="font-heading font-extrabold text-[11px] md:text-[13px] tracking-wider uppercase text-white">{isVi ? "Đóng Gói Thành Phẩm" : "Export Packaged"}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Symmetrical dynamic-height spec card wrapper */}
              <div className="premium-anim-right bg-white p-6 md:p-8 rounded-[32px] border border-slate-200/70 shadow-[0_20px_50px_rgba(0,0,0,0.04)] flex flex-col justify-center h-full min-h-[380px] md:min-h-[440px] lg:min-h-[480px] w-full">
                <h3 className="text-3xl lg:text-4xl font-heading font-extrabold text-forest mb-2 tracking-tight">
                  {currentTabData.title}
                </h3>
                <div className="mb-6 p-4 bg-slate-50/80 rounded-2xl border border-slate-100 border-l-4 border-l-gold">
                  <p className="text-slate-700 text-[15px] font-semibold leading-relaxed">
                    {t(currentTabData.descKey)}
                  </p>
                  {isVi && (
                    <p className="text-[13px] text-slate-400 mt-1.5 italic">
                      {productTabsEn[currentTabData.descKey]}
                    </p>
                  )}
                </div>

                <ul className="space-y-0 text-slate-600 ml-2">
                  {currentTabData.subItems.map((item, idx) => (
                    <li 
                      key={item.id} 
                      className={`relative pl-8 pb-5 border-l-2 border-slate-200/80 last:border-transparent last:pb-0 hover:bg-slate-50/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-l-gold hover:rounded-r-2xl transition-all duration-300 px-4 py-2.5 -ml-4 stagger-item-${idx + 1}`}
                    >
                      {/* Decorative Gold pulsing concentric dot */}
                      <span className="absolute -left-[9px] top-3.5 flex h-5 w-5 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold/25 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-2 border-gold shadow-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-forest"></span>
                        </span>
                      </span>
                      <div className="text-slate-800 leading-relaxed text-[15px] md:text-[16px]">
                        <strong className="text-forest font-extrabold">{t(item.labelKey)}</strong>{" "}
                        <span className="font-semibold text-slate-700">{t(item.valKey)}</span>
                      </div>
                      {isVi && (
                        <div className="text-[13px] text-slate-400 mt-1 leading-snug">
                          <span className="font-semibold text-slate-500">
                            {productTabsEn[item.labelKey]}
                          </span>{" "}
                          {productTabsEn[item.valKey]}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })()}

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div 
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[9999] flex flex-col items-center justify-center p-4 cursor-zoom-out animate-fadeIn select-none"
            onClick={() => setLightboxImage(null)}
          >
            {/* Visual backdrop style helper */}
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes zoomIn {
                from { transform: scale(0.95); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
              }
              .animate-fadeIn { animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both; }
              .animate-zoomIn { animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both; }
            `}} />

            {/* High-fidelity full screen image container */}
            <div className="relative w-full max-w-4xl h-[70vh] md:h-[80vh] flex items-center justify-center animate-zoomIn">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                fill
                className="object-contain rounded-2xl md:rounded-3xl"
                sizes="90vw"
                priority
              />
            </div>
            
            {/* Elegant glassmorphic title and instructions */}
            <div className="mt-6 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-white max-w-md text-center">
              <span className="font-heading font-extrabold text-sm md:text-base text-gold tracking-wide uppercase">{lightboxImage.alt}</span>
              <span className="h-4 w-px bg-white/20" />
              <span className="text-[12px] md:text-sm font-medium text-slate-300">{isVi ? "Nhấp bất kỳ đâu để đóng" : "Click anywhere to close"}</span>
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
            
            <div className="flex gap-6 animate-infinite-scroll pr-6 will-change-transform transform-gpu">
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
