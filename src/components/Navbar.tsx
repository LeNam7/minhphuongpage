"use client";

import { useState, useEffect } from "react";
import { Menu, X, UserCircle, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import AdminLoginModal from "./AdminLoginModal";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

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

  const { isAdmin } = useAuth();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;

    if (pathname !== "/") {
      return;
    }

    if (href === "/" || href === "") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2"
            : "bg-white/90 backdrop-blur-sm py-4"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" onClick={handleScrollTo} className="flex items-center">
            <Image src="/images/logo_transparent.png" alt="Minh Phuong Logo" width={100} height={70} className="h-[70px] lg:h-[90px] w-auto object-contain scale-[1.25] origin-left drop-shadow-sm" priority />
          </Link>

          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-7 ml-4">
            <Link href="/#about" scroll={false} onClick={handleScrollTo} className="text-navy font-semibold text-sm hover:text-gold transition-colors whitespace-nowrap">{t('about')}</Link>
            <Link href="/#facilities" scroll={false} onClick={handleScrollTo} className="text-navy font-semibold text-sm hover:text-gold transition-colors whitespace-nowrap">{t('facilities')}</Link>
            <Link href="/#products" scroll={false} onClick={handleScrollTo} className="text-navy font-semibold text-sm hover:text-gold transition-colors whitespace-nowrap">{t('products')}</Link>
            <Link href="/#supply-chain" scroll={false} onClick={handleScrollTo} className="text-navy font-semibold text-sm hover:text-gold transition-colors whitespace-nowrap">{t('supplyChain')}</Link>
            <Link href="/#sustainability" scroll={false} onClick={handleScrollTo} className="text-navy font-semibold text-sm hover:text-gold transition-colors whitespace-nowrap">{t('esg')}</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {/* Admin avatar icon */}
            <button
              onClick={() => setLoginModalOpen(true)}
              className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                isAdmin
                  ? "bg-green-100 text-green-600 ring-2 ring-green-400/50 hover:bg-green-200"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-navy"
              }`}
              title={isAdmin ? "Admin" : t('login')}
            >
              <UserCircle size={20} />
              {isAdmin && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </button>

            <LanguageSwitcher />

            {/* Create Post button - only visible when admin */}
            {isAdmin && (
              <Link
                href="/admin/page-builder"
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-forest to-forest-dark text-white font-heading font-semibold text-sm px-4 py-2 rounded hover:shadow-lg hover:shadow-forest/20 transition-all whitespace-nowrap animate-[fadeSlideIn_300ms_ease-out]"
              >
                <Settings size={15} />
                {t('createPost')}
              </Link>
            )}

            <Link href="/#contact" scroll={false} onClick={handleScrollTo} className="bg-gold text-white font-heading font-semibold text-sm px-6 py-2.5 rounded hover:bg-gold-hover transition-colors whitespace-nowrap">
              {t('quote')}
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile admin icon */}
            <button
              onClick={() => setLoginModalOpen(true)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                isAdmin
                  ? "bg-green-100 text-green-600"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <UserCircle size={20} />
            </button>
            <button
              className="text-navy focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-200 transition-all duration-300 overflow-hidden flex flex-col items-center ${
            mobileMenuOpen ? "max-h-[500px] py-4" : "max-h-0 py-0"
          }`}
        >
          <div className="flex flex-col space-y-4 px-6 w-full text-center mb-4">
            <Link href="/#about" scroll={false} onClick={handleScrollTo} className="block text-navy font-semibold hover:text-gold">{t('about')}</Link>
            <Link href="/#facilities" scroll={false} onClick={handleScrollTo} className="block text-navy font-semibold hover:text-gold">{t('facilities')}</Link>
            <Link href="/#products" scroll={false} onClick={handleScrollTo} className="block text-navy font-semibold hover:text-gold">{t('products')}</Link>
            <Link href="/#supply-chain" scroll={false} onClick={handleScrollTo} className="block text-navy font-semibold hover:text-gold">{t('supplyChain')}</Link>
          </div>

          {/* Mobile create post link */}
          {isAdmin && (
            <Link
              href="/admin/page-builder"
              className="inline-flex items-center gap-2 mb-3 bg-gradient-to-r from-forest to-forest-dark text-white font-heading font-semibold text-sm px-6 py-3 rounded hover:shadow-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Settings size={15} />
              {t('createPost')}
            </Link>
          )}

          <LanguageSwitcher />
          <Link href="/#contact" scroll={false} onClick={handleScrollTo} className="inline-block mt-4 text-center bg-gold text-white font-heading font-semibold text-sm px-6 py-3 rounded hover:bg-gold-hover transition-colors">
            {t('quote')}
          </Link>
        </div>
      </header>

      <AdminLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      <style jsx>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
