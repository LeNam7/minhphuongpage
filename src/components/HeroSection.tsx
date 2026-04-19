import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("Hero");
  return (
    <section className="relative min-h-[600px] h-screen flex items-center bg-forest">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/hero.png')` }}
      >
        <div className="absolute inset-0 bg-[#0F2C20]/75"></div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8 text-white w-full">
        <div className="max-w-3xl">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-white drop-shadow-md">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl font-light mb-10 text-slate-200">
            <strong className="font-bold text-white block mb-2">{t("subtitle")}</strong>
            {t("description")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact" 
              className="text-center bg-gold text-white font-heading font-semibold px-8 py-3.5 rounded hover:bg-gold-hover hover:-translate-y-0.5 transition-all"
            >
              {t("contactBtn")}
            </a>
            <a 
              href="/Minh_Phuong_Company_Profile.pdf" 
              download="HoSoNangLuc_MinhPhuong.pdf"
              className="text-center bg-transparent border-2 border-white text-white font-heading font-semibold px-8 py-3.5 rounded hover:bg-white hover:text-forest transition-all"
            >
              {t("downloadBtn")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
