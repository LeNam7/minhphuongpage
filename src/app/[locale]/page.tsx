import HeroSection from "@/components/HeroSection";
import StatsCounter from "@/components/StatsCounter";
import ProductTabs from "@/components/ProductTabs";
import { CheckCircle2, Factory, ThermometerSnowflake, Leaf, ArrowRight, ShieldCheck, Fish, Coffee } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Stats");
  const tAbout = useTranslations("About");
  const tFacilities = useTranslations("Facilities");
  const tProducts = useTranslations("Products");
  const tSupplyChain = useTranslations("SupplyChain");
  const tESG = useTranslations("ESG");
  const tContact = useTranslations("Contact");

  return (
    <main className="w-full flex flex-col min-h-screen">
      <HeroSection />

      <section className="py-20 border-b border-slate-100 relative -mt-10 bg-transparent z-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 bg-white/80 backdrop-blur inline-block px-10 py-4 rounded-xl mx-auto flex flex-col shadow-sm">
            <h2 className="text-3xl font-heading font-bold text-navy">{t("title")}</h2>
            <p className="text-slate-500 mt-2">{t("desc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCounter end={55000} label={t("capacity")} sub={t("capacitySub")} />
            <StatsCounter end={5} label={t("facilities")} sub={t("facilitiesSub")} duration={1000} />
            <StatsCounter end={500} label={t("farmland")} sub={t("farmlandSub")} duration={1500} />
            <StatsCounter end={15} label={t("export")} sub={t("exportSub")} duration={1200} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="block text-gold font-bold tracking-widest text-sm mb-4 uppercase">{tAbout("subtitle")}</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6 leading-tight">
                {tAbout("title")}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {tAbout("desc")}
              </p>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-start">
                  <CheckCircle2 className="text-gold mr-3 shrink-0" />
                  <span className="text-slate-700"><strong>{tAbout("quality_title")}</strong> {tAbout("quality_desc")}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-gold mr-3 shrink-0" />
                  <span className="text-slate-700"><strong>{tAbout("transparency_title")}</strong> {tAbout("transparency_desc")}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-gold mr-3 shrink-0" />
                  <span className="text-slate-700"><strong>{tAbout("sustainability_title")}</strong> {tAbout("sustainability_desc")}</span>
                </li>
              </ul>
              
              <a href="#facilities" className="inline-flex items-center font-heading font-semibold text-forest border-b-2 border-forest pb-1 hover:text-gold hover:border-gold transition-colors">
                {tAbout("cta")} <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
            
            <div className="h-[500px] bg-ice-gray rounded-2xl flex items-center justify-center shadow-sm relative overflow-hidden">
                <img src="/images/engineers.png" alt="High-tech agricultural engineers" className="w-full h-full object-cover absolute inset-0 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="py-24 bg-ice-gray">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="block text-gold font-bold tracking-widest text-sm mb-4 uppercase">{tFacilities("subtitle")}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">{tFacilities("title")}</h2>
            <p className="text-lg text-slate-600">{tFacilities("desc")}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-transparent hover:border-forest">
              <Fish className="w-12 h-12 text-forest mb-6" />
              <h3 className="text-xl font-heading font-bold text-navy mb-2">{tFacilities("seafood_title")}</h3>
              <p className="text-forest font-semibold mb-4">{tFacilities("seafood_cap")}</p>
              <p className="text-slate-600 text-sm">{tFacilities("seafood_desc")}</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-transparent hover:border-forest">
              <ThermometerSnowflake className="w-12 h-12 text-forest mb-6" />
              <h3 className="text-xl font-heading font-bold text-navy mb-2">{tFacilities("fruit_title")}</h3>
              <p className="text-forest font-semibold mb-4">{tFacilities("fruit_cap")}</p>
              <p className="text-slate-600 text-sm">{tFacilities("fruit_desc")}</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-transparent hover:border-forest">
              <Coffee className="w-12 h-12 text-forest mb-6" />
              <h3 className="text-xl font-heading font-bold text-navy mb-2">{tFacilities("coffee_title")}</h3>
              <p className="text-forest font-semibold mb-4">{tFacilities("coffee_cap")}</p>
              <p className="text-slate-600 text-sm">{tFacilities("coffee_desc")}</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-transparent hover:border-forest">
              <Factory className="w-12 h-12 text-forest mb-6" />
              <h3 className="text-xl font-heading font-bold text-navy mb-2">{tFacilities("storage_title")}</h3>
              <p className="text-forest font-semibold mb-4">{tFacilities("storage_cap")}</p>
              <p className="text-slate-600 text-sm">{tFacilities("storage_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
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

      {/* Supply Chain Section */}
      <section id="supply-chain" className="py-24 border-y border-slate-100 relative overflow-hidden">
        <div className="absolute -left-[500px] top-0 w-[1000px] h-[1000px] bg-forest/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="block text-gold font-bold tracking-widest text-sm mb-4 uppercase">{tSupplyChain("subtitle")}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">{tSupplyChain("title")}</h2>
            <p className="text-lg text-slate-600">{tSupplyChain("desc")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-slate-200 -z-10"></div>
            
            <div className="text-center relative">
              <div className="w-24 h-24 bg-white border-4 border-ice-gray text-forest rounded-full flex items-center justify-center font-heading font-bold text-2xl mx-auto mb-6 shadow-sm">
                01
              </div>
              <h4 className="text-xl font-bold font-heading text-navy mb-3">{tSupplyChain("step1_title")}</h4>
              <p className="text-sm text-slate-500">{tSupplyChain("step1_desc")}</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-24 h-24 bg-forest border-4 border-ice-gray text-white rounded-full flex items-center justify-center font-heading font-bold text-2xl mx-auto mb-6 shadow-md">
                02
              </div>
              <h4 className="text-xl font-bold font-heading text-navy mb-3">{tSupplyChain("step2_title")}</h4>
              <p className="text-sm text-slate-500">{tSupplyChain("step2_desc")}</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-24 h-24 bg-white border-4 border-ice-gray text-forest rounded-full flex items-center justify-center font-heading font-bold text-2xl mx-auto mb-6 shadow-sm">
                03
              </div>
              <h4 className="text-xl font-bold font-heading text-navy mb-3">{tSupplyChain("step3_title")}</h4>
              <p className="text-sm text-slate-500">{tSupplyChain("step3_desc")}</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-24 h-24 bg-white border-4 border-ice-gray text-forest rounded-full flex items-center justify-center font-heading font-bold text-2xl mx-auto mb-6 shadow-sm">
                04
              </div>
              <h4 className="text-xl font-bold font-heading text-navy mb-3">{tSupplyChain("step4_title")}</h4>
              <p className="text-sm text-slate-500">{tSupplyChain("step4_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-forest text-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-10 tracking-widest text-[#94a3b8] uppercase">Certified Quality & Trust by Global Standards</h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-80">
            {['FDA', 'ISO 22000', 'HACCP', 'BRCGS', 'IFS Food', 'HALAL', 'BSCI', 'EU DL200'].map((cert) => (
              <span key={cert} className="text-xl md:text-3xl font-heading font-extrabold tracking-tight">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>
      
      {/* ESG Section */}
      <section id="sustainability" className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="absolute right-[-10%] top-[-10%] w-[50%] h-[120%] bg-forest opacity-30 blur-3xl transform -rotate-12 pointer-events-none"></div>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <span className="block text-gold font-bold tracking-widest text-sm mb-4 uppercase">{tESG("subtitle")}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6 leading-tight">
              {tESG("title")}
            </h2>
            <p className="text-lg text-slate-300 mb-10">
              {tESG("desc")}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold font-heading text-white mb-2 flex items-center"><ShieldCheck className="w-5 h-5 text-gold mr-2" /> {tESG("blockchain_title")}</h4>
                <p className="text-slate-400 text-sm">{tESG("blockchain_desc")}</p>
              </div>
              <div>
                <h4 className="text-lg font-bold font-heading text-white mb-2 flex items-center"><Leaf className="w-5 h-5 text-gold mr-2" /> {tESG("lowemission_title")}</h4>
                <p className="text-slate-400 text-sm">{tESG("lowemission_desc")}</p>
              </div>
            </div>
          </div>
          
          <div className="h-[450px] bg-[#141d29] rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden z-10">
             <img src="/images/map.png" alt="Global Market Reach 15+ Countries" className="w-full h-full object-cover absolute inset-0" />
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-white pt-24 pb-10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">{tContact("title")}</h2>
              <p className="text-lg text-slate-600 mb-10">{tContact("desc")}</p>
              
              <div className="bg-ice-gray p-8 rounded-xl border border-slate-100">
                  <p className="text-slate-700 mb-3"><strong>🏢 {tContact("hq")}</strong> {tContact("hq_val")}</p>
                  <p className="text-slate-700 mb-3"><strong>📞 {tContact("hotline")}</strong> [PLACEHOLDER_PHONE]</p>
                  <p className="text-slate-700 mb-3"><strong>✉️ {tContact("email")}</strong> contact@minhphuong.com.vn</p>
                  <p className="text-slate-700 mb-3"><strong>🌐 {tContact("org")}</strong> {tContact("org_val")}</p>
                  <p className="text-slate-700"><strong>📜 {tContact("tax")}</strong> [PLACEHOLDER_TAX_ID]</p>
              </div>
            </div>
            
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name *</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all" placeholder="XYZ Corporation" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Business Email *</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all" placeholder="john@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all" placeholder="+1 234 567 890" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Interested Category</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all bg-white">
                    <option>Select a product category...</option>
                    <option>Premium Frozen Seafood</option>
                    <option>Fresh / Frozen Fruits</option>
                    <option>Golden Robusta Coffee</option>
                    <option>General Partnership / Others</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Your Message / RFQ *</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all" placeholder="Please specify quantity, destination port, or any specific requirements..."></textarea>
                </div>
                
                <button type="button" className="w-full bg-forest text-white font-heading font-bold text-lg py-4 rounded-lg hover:bg-forest-dark transition-colors shadow-lg shadow-forest/30">
                  Send Inquiry to Export Team
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
               <img src="/images/logo_transparent.png" alt="Minh Phuong" className="h-14 lg:h-16 w-auto drop-shadow-sm" />
               <span className="font-heading font-extrabold text-2xl text-forest tracking-wider">MINH PHUONG</span>
            </div>
            <p className="text-slate-500 text-sm">© 2026 Minh Phuong Production, Import-Export and Trading Services Co., Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
