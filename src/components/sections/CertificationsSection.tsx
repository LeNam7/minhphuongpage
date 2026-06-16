export default function CertificationsSection() {
  return (
    <section className="py-20 bg-forest text-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold mb-10 tracking-widest text-[#94a3b8] uppercase">Certified Quality &amp; Trust by Global Standards</h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-80">
          {['FDA', 'ISO 22000', 'HACCP', 'BRCGS', 'IFS Food', 'HALAL', 'BSCI', 'EU DL200'].map((cert) => (
            <span key={cert} className="text-xl md:text-3xl font-heading font-extrabold tracking-tight">
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
