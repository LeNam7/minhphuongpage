"use client";

import StatsCounter from "@/components/StatsCounter";
import { useTranslations } from "next-intl";

export default function StatsSection() {
  const t = useTranslations("Stats");

  return (
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
  );
}
