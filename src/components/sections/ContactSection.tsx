"use client";

import Image from "next/image";
import { Globe, MapPin, Phone, Mail, FileText } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactSection() {
  const tContact = useTranslations("Contact");

  return (
    <footer id="contact" className="bg-white pt-24 pb-10 will-change-transform transform-gpu">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">{tContact("title")}</h2>
            <p className="text-lg text-slate-600 mb-10">{tContact("desc")}</p>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-6 will-change-transform transform-gpu">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center shrink-0 shadow-sm"><Globe className="w-5 h-5" /></div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none">{tContact("org")}</span>
                  <span className="block text-slate-900 font-extrabold mt-2 leading-snug text-[15px]">{tContact("org_val")}</span>
                </div>
              </div>
              <div className="h-[1px] bg-slate-200/60 w-full" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center shrink-0 shadow-sm"><MapPin className="w-5 h-5" /></div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none">{tContact("hq")}</span>
                  <span className="block text-slate-800 font-medium text-sm mt-2 leading-relaxed">{tContact("hq_val")}</span>
                </div>
              </div>
              <div className="h-[1px] bg-slate-200/60 w-full" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center shrink-0 shadow-sm"><Phone className="w-5 h-5" /></div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none">{tContact("hotline")}</span>
                  <span className="block text-forest font-bold mt-2 text-base leading-none">0888 979 012</span>
                </div>
              </div>
              <div className="h-[1px] bg-slate-200/60 w-full" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center shrink-0 shadow-sm"><Mail className="w-5 h-5" /></div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none">{tContact("email")}</span>
                  <span className="block text-slate-800 font-bold mt-2 text-[15px] select-all leading-none">congtytnhhminhphuong@gmail.com</span>
                </div>
              </div>
              <div className="h-[1px] bg-slate-200/60 w-full" />
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0 shadow-sm"><FileText className="w-5 h-5" /></div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none">{tContact("tax")}:</span>
                  <span className="text-slate-900 font-mono font-bold text-xs tracking-wider bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] select-all leading-none">3703477680</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{tContact("fullName")}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{tContact("companyName")}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all" placeholder="XYZ Corporation" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{tContact("businessEmail")}</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all" placeholder="john@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{tContact("phoneNumber")}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all" placeholder="+1 234 567 890" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{tContact("category")}</label>
                <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all bg-white">
                  <option>{tContact("selectCategory")}</option>
                  <option>{tContact("catSeafood")}</option>
                  <option>{tContact("catFruit")}</option>
                  <option>{tContact("catCoffee")}</option>
                  <option>{tContact("catOthers")}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{tContact("message")}</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all" placeholder={tContact("messagePlaceholder")}></textarea>
              </div>
              <button type="button" className="w-full bg-forest text-white font-heading font-bold text-lg py-4 rounded-lg hover:bg-forest-dark transition-colors shadow-lg shadow-forest/30">
                {tContact("submitBtn")}
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center will-change-transform transform-gpu">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
             <Image src="/images/logo_transparent.png" alt="Minh Phuong" width={64} height={64} className="drop-shadow-sm h-14 w-auto object-contain" />
             <span className="font-heading font-extrabold text-2xl text-forest tracking-wider">MINH PHUONG</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 Minh Phuong Production, Import-Export and Trading Services Co., Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
