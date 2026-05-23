'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQAccordion() {
  const t = useTranslations('FAQ');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div 
            key={idx} 
            className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-6 text-left outline-none focus:outline-none select-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-start gap-4">
                <HelpCircle className="w-6 h-6 text-forest shrink-0 mt-0.5" />
                <span className="font-heading font-bold text-navy text-lg leading-tight">
                  {faq.q}
                </span>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-forest' : ''
                }`}
              />
            </button>
            
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-[300px] border-t border-slate-50' : 'max-h-0'
              }`}
            >
              <p className="p-6 text-slate-600 leading-relaxed bg-slate-50/50">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
