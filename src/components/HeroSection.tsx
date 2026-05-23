import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("Hero");
  return (
    <section className="relative min-h-[600px] h-screen flex items-center bg-forest">
      {/* Dynamic Logistics Truck Ticker */}
      <div className="absolute top-[86px] lg:top-[122px] left-0 right-0 h-11 bg-black/45 backdrop-blur-sm z-20 border-b border-white/10 overflow-hidden flex items-center">
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes drive {
            0% { transform: translateX(-560px); }
            100% { transform: translateX(100vw); }
          }
          @keyframes rotate-wheel {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes wave {
            0%, 100% { transform: translateY(0) scale(1) rotate(0.5deg); }
            50% { transform: translateY(-3px) scale(0.98) rotate(-1deg); }
          }
          @keyframes smoke-puff-1 {
            0% { transform: translate(-2px, 2px) scale(0.4); opacity: 0.8; filter: blur(0px); }
            50% { opacity: 0.5; }
            100% { transform: translate(-25px, -8px) scale(1.4); opacity: 0; filter: blur(1.5px); }
          }
          @keyframes smoke-puff-2 {
            0% { transform: translate(-2px, 2px) scale(0.4); opacity: 0.8; filter: blur(0px); }
            50% { opacity: 0.5; }
            100% { transform: translate(-35px, -5px) scale(1.6); opacity: 0; filter: blur(2px); }
          }
          @keyframes smoke-puff-3 {
            0% { transform: translate(-2px, 2px) scale(0.4); opacity: 0.8; filter: blur(0px); }
            50% { opacity: 0.5; }
            100% { transform: translate(-45px, -10px) scale(1.8); opacity: 0; filter: blur(2.5px); }
          }
          .animate-drive {
            animation: drive 22s linear infinite;
          }
          .animate-wheel {
            animation: rotate-wheel 0.8s linear infinite;
            transform-origin: center;
          }
          .smoke-1 {
            animation: smoke-puff-1 1.2s ease-out infinite;
          }
          .smoke-2 {
            animation: smoke-puff-2 1.2s ease-out infinite;
            animation-delay: 0.4s;
          }
          .smoke-3 {
            animation: smoke-puff-3 1.2s ease-out infinite;
            animation-delay: 0.8s;
          }
        `}} />

        {/* The moving truck container (flex aligned) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 animate-drive flex items-center pointer-events-none select-none">

          {/* 1. Trailing Ribbon (displays dynamic translated tagline) */}
          <div
            className="bg-gradient-to-r from-[#dfa135] via-[#f5c26b] to-[#dfa135] text-white text-[9.5px] font-heading font-black px-3.5 py-1 rounded-l-sm rounded-r-md shadow-md border-y border-white/10 flex items-center whitespace-nowrap relative select-none uppercase tracking-wide"
            style={{ animation: 'wave 1.6s ease-in-out infinite' }}
          >
            {/* Swallowtail cut effect on left end */}
            <div className="absolute -left-[4px] top-0 bottom-0 w-[4px] bg-transparent flex flex-col justify-between">
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[4px] border-l-[#dfa135]"></div>
              <div className="w-0 h-0 border-b-[8px] border-b-transparent border-l-[4px] border-l-[#dfa135]"></div>
            </div>
            {/* Tagline Text */}
            <span className="drop-shadow-sm text-navy font-extrabold">{t("ribbon")}</span>
          </div>

          {/* 2. Stylized Dashed Connecting Towline */}
          <div className="w-6 h-[2px] border-t-2 border-dashed border-[#dfa135]/80 mr-[-2px] self-center shrink-0"></div>

          {/* 3. Exhaust Smoke Puffs (Drifting behind the cab exhaust) */}
          <div className="absolute left-[452px] bottom-[10px] flex items-center justify-end">
            <div className="absolute w-3.5 h-3.5 bg-slate-300/40 rounded-full smoke-1"></div>
            <div className="absolute w-4 h-4 bg-slate-400/40 rounded-full smoke-2"></div>
            <div className="absolute w-4.5 h-4.5 bg-slate-500/30 rounded-full smoke-3"></div>
          </div>

          {/* 4. SVG Truck Container */}
          <svg className="w-[140px] h-[34px] shrink-0" viewBox="0 0 140 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Cab Front (White/Silver with Green Accent) */}
            <path d="M102 12C102 12 108 12 113 14L123 21H129V30H102V12Z" fill="#F1F5F9" />
            <path d="M110 14H115L120 20H110V14Z" fill="#334155" /> {/* Windshield */}
            <rect x="102" y="24" width="27" height="6" fill="#0F5132" /> {/* Lower Cab green guard */}
            <rect x="123" y="23" width="5" height="2" fill="#E2E8F0" /> {/* Headlight */}

            {/* Connection/Hitch area */}
            <rect x="94" y="24" width="8" height="6" fill="#475569" />

            {/* Cargo Trailer (Forest Green Container with Gold Borders) */}
            <rect x="8" y="2" width="86" height="26" rx="2" fill="#0F5132" stroke="#DFA135" strokeWidth="1" />

            {/* Trailer decorative ribs (for realism) */}
            <line x1="16" y1="3" x2="16" y2="27" stroke="#166534" strokeWidth="1.5" />
            <line x1="26" y1="3" x2="26" y2="27" stroke="#166534" strokeWidth="1.5" />
            <line x1="36" y1="3" x2="36" y2="27" stroke="#166534" strokeWidth="1.5" />
            <line x1="46" y1="3" x2="46" y2="27" stroke="#166534" strokeWidth="1.5" />
            <line x1="56" y1="3" x2="56" y2="27" stroke="#166534" strokeWidth="1.5" />
            <line x1="66" y1="3" x2="66" y2="27" stroke="#166534" strokeWidth="1.5" />
            <line x1="76" y1="3" x2="76" y2="27" stroke="#166534" strokeWidth="1.5" />
            <line x1="86" y1="3" x2="86" y2="27" stroke="#166534" strokeWidth="1.5" />

            {/* MINH PHUONG Branding on Trailer */}
            {/* Gold leaf emblem */}
            <path d="M22 13C22 10 25 10 27 12C26 14 23 15 22 13Z" fill="#DFA135" />
            <path d="M27 12C29 10 32 10 32 13C31 15 28 14 27 12Z" fill="#DFA135" />
            <text x="36" y="17" fill="#FFFFFF" fontSize="6.5" fontFamily="sans-serif" fontWeight="900" letterSpacing="0.4">MINH PHUONG</text>
            <text x="36" y="23" fill="#DFA135" fontSize="4" fontFamily="sans-serif" fontWeight="700" letterSpacing="0.6">AGRI-FOOD EXPORT</text>

            {/* Rear Bumper & Lights */}
            <rect x="4" y="16" width="4" height="12" fill="#334155" />
            <rect x="2" y="22" width="2" height="4" fill="#EF4444" />

            {/* Wheels Group (Wheels will spin) */}
            {/* Front Wheel */}
            <g className="animate-wheel" style={{ transformOrigin: '118px 29px' }}>
              <circle cx="118" cy="29" r="4.5" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
              <line x1="118" y1="24.5" x2="118" y2="33.5" stroke="#94A3B8" strokeWidth="1" />
              <line x1="113.5" y1="29" x2="122.5" y2="29" stroke="#94A3B8" strokeWidth="1" />
            </g>

            {/* Rear Cab/Tractor Wheel */}
            <g className="animate-wheel" style={{ transformOrigin: '98px 29px' }}>
              <circle cx="98" cy="29" r="4.5" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
              <line x1="98" y1="24.5" x2="98" y2="33.5" stroke="#94A3B8" strokeWidth="1" />
              <line x1="93.5" y1="29" x2="102.5" y2="29" stroke="#94A3B8" strokeWidth="1" />
            </g>

            {/* Trailer Rear Wheels (Double axle) */}
            <g className="animate-wheel" style={{ transformOrigin: '28px 29px' }}>
              <circle cx="28" cy="29" r="4.5" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
              <line x1="28" y1="24.5" x2="28" y2="33.5" stroke="#94A3B8" strokeWidth="1" />
              <line x1="23.5" y1="29" x2="32.5" y2="29" stroke="#94A3B8" strokeWidth="1" />
            </g>
            <g className="animate-wheel" style={{ transformOrigin: '38px 29px' }}>
              <circle cx="38" cy="29" r="4.5" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
              <line x1="38" y1="24.5" x2="38" y2="33.5" stroke="#94A3B8" strokeWidth="1" />
              <line x1="33.5" y1="29" x2="42.5" y2="29" stroke="#94A3B8" strokeWidth="1" />
            </g>
          </svg>
        </div>
      </div>

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
