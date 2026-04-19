"use client";

import { useState, useEffect, useRef } from "react";

interface StatsCounterProps {
  end: number;
  label: string;
  sub: string;
  duration?: number;
}

export default function StatsCounter({ end, label, sub, duration = 2000 }: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-center p-6 bg-white rounded-lg shadow-sm border border-slate-100 transition-transform hover:-translate-y-1">
      <div className="flex justify-center items-baseline text-forest mb-2">
        <h3 className="text-5xl font-extrabold font-heading">{count.toLocaleString('en-US')}</h3>
        <span className="text-4xl font-bold ml-1">+</span>
      </div>
      <p className="text-lg font-bold text-navy mt-2">{label}</p>
      <p className="text-sm text-slate-500 mt-1">{sub}</p>
    </div>
  );
}
