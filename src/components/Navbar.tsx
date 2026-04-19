"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("Nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;
    
    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return;
    
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.substring(hashIndex);

    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(targetId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-white/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 flex items-center justify-between">
        <a href="#" onClick={handleScrollTo} className="flex items-center">
          <img src="/images/logo_transparent.png" alt="Minh Phuong Logo" className="h-[70px] lg:h-[90px] w-auto object-contain scale-[1.25] origin-left drop-shadow-sm" />
        </a>

        <nav className="hidden lg:flex items-center space-x-5 xl:space-x-8 -ml-8">
          <Link href="#about" scroll={false} onClick={handleScrollTo} className="text-navy font-semibold text-sm hover:text-gold transition-colors whitespace-nowrap">{t('about')}</Link>
          <Link href="#facilities" scroll={false} onClick={handleScrollTo} className="text-navy font-semibold text-sm hover:text-gold transition-colors whitespace-nowrap">{t('facilities')}</Link>
          <Link href="#products" scroll={false} onClick={handleScrollTo} className="text-navy font-semibold text-sm hover:text-gold transition-colors whitespace-nowrap">{t('products')}</Link>
          <Link href="#supply-chain" scroll={false} onClick={handleScrollTo} className="text-navy font-semibold text-sm hover:text-gold transition-colors whitespace-nowrap">{t('supplyChain')}</Link>
          <Link href="#sustainability" scroll={false} onClick={handleScrollTo} className="text-navy font-semibold text-sm hover:text-gold transition-colors whitespace-nowrap">{t('esg')}</Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="#contact" scroll={false} onClick={handleScrollTo} className="bg-gold text-white font-heading font-semibold text-sm px-6 py-2.5 rounded hover:bg-gold-hover transition-colors whitespace-nowrap">
            {t('quote')}
          </Link>
        </div>

        <button
          className="lg:hidden text-navy focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-200 transition-all duration-300 overflow-hidden flex flex-col items-center ${
          mobileMenuOpen ? "max-h-[400px] py-4" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col space-y-4 px-6 w-full text-center mb-4">
          <Link href="#about" scroll={false} onClick={handleScrollTo} className="block text-navy font-semibold hover:text-gold">{t('about')}</Link>
          <Link href="#facilities" scroll={false} onClick={handleScrollTo} className="block text-navy font-semibold hover:text-gold">{t('facilities')}</Link>
          <Link href="#products" scroll={false} onClick={handleScrollTo} className="block text-navy font-semibold hover:text-gold">{t('products')}</Link>
          <Link href="#supply-chain" scroll={false} onClick={handleScrollTo} className="block text-navy font-semibold hover:text-gold">{t('supplyChain')}</Link>
        </div>
        <LanguageSwitcher />
        <Link href="#contact" scroll={false} onClick={handleScrollTo} className="inline-block mt-4 text-center bg-gold text-white font-heading font-semibold text-sm px-6 py-3 rounded hover:bg-gold-hover transition-colors">
          {t('quote')}
        </Link>
      </div>
    </header>
  );
}
