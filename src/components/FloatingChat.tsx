'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { X, MessageSquare, Phone, QrCode } from 'lucide-react';

export default function FloatingChat() {
  const locale = useLocale();
  const isVi = locale === 'vi';
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="print:hidden">
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleModal}
          className="group relative flex items-center justify-center w-14 h-14 bg-[#0068ff] rounded-full shadow-lg hover:shadow-[#0068ff]/30 hover:-translate-y-1 transition-all duration-300 active:scale-95 outline-none focus:outline-none"
          aria-label="Contact via Zalo"
        >
          {/* Pulsing ring animation */}
          <span className="absolute inset-0 rounded-full bg-[#0068ff]/30 animate-ping opacity-75 group-hover:animate-none"></span>
          
          {/* Custom Zalo Icon SVG */}
          <svg 
            viewBox="0 0 24 24" 
            className="w-7 h-7 fill-white relative z-10 drop-shadow-sm"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.48 2 2 5.92 2 10.75c0 2.45 1.16 4.67 3.03 6.18L4.1 20.8a.5.5 0 0 0 .76.54l4.24-2.5c.92.25 1.89.38 2.9.38 5.52 0 10-3.92 10-8.75S17.52 2 12 2zm3.36 12.3c-.22.25-.58.3-.87.12l-2.12-1.28c-.28-.17-.63-.17-.91 0l-2.12 1.28c-.29.18-.65.13-.87-.12a.66.66 0 0 1-.09-.76l.85-2.07c.11-.27.05-.59-.16-.8L7.4 8.79a.66.66 0 0 1 .12-.91c.29-.19.66-.1.82.19l1.13 2.05c.15.27.47.4.77.31l2.36-.67a.64.64 0 0 1 .77.44c.09.31-.08.64-.38.72l-1.92.54c-.3.09-.5.38-.47.7l.19 1.94c.03.31.28.56.59.56h.04l2.12-.22c.31-.03.58.18.61.5.03.31-.18.58-.5.61z"/>
          </svg>
          
          {/* Desktop Tooltip */}
          <span className="absolute right-16 bg-[#1e293b] text-white text-xs font-semibold px-3 py-1.5 rounded-md opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-md">
            {isVi ? 'Chat Zalo / Hotline' : 'Chat Zalo / Call'}
          </span>
        </button>
      </div>

      {/* Zalo Contact Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={toggleModal}
        >
          <div 
            className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col items-center relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0068ff] to-[#0052cc] text-white p-6 w-full text-center relative">
              <button 
                onClick={toggleModal}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-heading font-extrabold tracking-wide flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5 fill-white" />
                MINH PHUONG ZALO
              </h3>
              <p className="text-white/80 text-xs mt-1">
                {isVi ? 'Kết nối xuất khẩu nhanh chóng' : 'Fast Export Connection'}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 w-full flex flex-col items-center">
              <p className="text-slate-600 text-sm leading-relaxed mb-4 text-center">
                {isVi 
                  ? 'Quét mã QR dưới đây bằng ứng dụng Zalo trên điện thoại để nhắn tin trực tiếp, hoặc liên hệ Hotline.' 
                  : 'Scan the QR code below using your Zalo mobile app to chat directly, or call our Hotline.'}
              </p>

              {/* QR Code Container */}
              <div className="relative w-48 h-48 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-3 shadow-inner my-2 group">
                <Image 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https%3A%2F%2Fzalo.me%2F0888979012"
                  alt="Zalo QR Code"
                  width={170}
                  height={170}
                  className="object-contain rounded-xl"
                  unoptimized
                />
              </div>
              
              <span className="text-[11px] text-slate-400 font-medium tracking-wide flex items-center gap-1.5 mt-2 mb-6">
                <QrCode size={13} className="text-gold" />
                {isVi ? 'Hỗ trợ quét bằng Camera hoặc Zalo app' : 'Scan via phone camera or Zalo app'}
              </span>

              {/* Info Elements */}
              <div className="w-full space-y-3">
                <div
                  className="w-full bg-[#0068ff] hover:bg-[#0052cc] text-white font-heading font-bold py-3.5 px-4 rounded-xl transition-all hover:scale-[1.02] duration-200 shadow-md shadow-[#0068ff]/20 flex items-center justify-center gap-2.5 text-center select-none cursor-default"
                >
                  <Phone size={18} className="text-white fill-white animate-pulse" />
                  {isVi ? 'Gọi Hotline: 0888 979 012' : 'Call Hotline: 0888 979 012'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
