"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "vi" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button 
      onClick={toggleLocale}
      className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:text-forest hover:border-forest transition-colors bg-slate-50 hover:bg-white text-sm font-semibold"
    >
      <Globe size={16} />
      <span>{locale === "en" ? "EN" : "VN"}</span>
    </button>
  );
}
