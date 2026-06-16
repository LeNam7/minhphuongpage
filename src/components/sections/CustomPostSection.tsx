"use client";

import { useEffect, useState } from "react";
import { FileText, Calendar, Tag } from "lucide-react";

interface CustomPostData {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  images: string[];
  createdAt: number;
}

interface CustomPostSectionProps {
  blockId: string;
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  seafood: { bg: "bg-forest/10", text: "text-forest", label: "Thủy sản / Seafood" },
  fruit: { bg: "bg-gold/10", text: "text-gold", label: "Trái cây / Fruits" },
  coffee: { bg: "bg-amber-100", text: "text-amber-800", label: "Cà phê / Coffee" },
  news: { bg: "bg-navy/10", text: "text-navy", label: "Tin tức / News" },
  event: { bg: "bg-rose-100", text: "text-rose-700", label: "Sự kiện / Event" },
};

export default function CustomPostSection({ blockId }: CustomPostSectionProps) {
  const [post, setPost] = useState<CustomPostData | null>(null);

  useEffect(() => {
    fetch("/api/custom-blocks")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const found = data.find((b) => b.id === blockId);
          if (found) {
            setPost(found);
          }
        }
      })
      .catch((err) => {
        console.error("Failed to fetch custom post from DB API:", err);
        const customBlocksStr = localStorage.getItem("mp_custom_blocks");
        if (customBlocksStr) {
          try {
            const customBlocks = JSON.parse(customBlocksStr) as CustomPostData[];
            const found = customBlocks.find((b) => b.id === blockId);
            if (found) {
              setPost(found);
            }
          } catch (e) {
            // ignore
          }
        }
      });
  }, [blockId]);

  if (!post) return null;

  const catStyle = CATEGORY_STYLES[post.category] || {
    bg: "bg-slate-100",
    text: "text-slate-600",
    label: post.category,
  };

  const formattedDate = new Date(post.createdAt).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="bg-white py-24 border-t border-slate-100 will-change-transform transform-gpu">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Post Content */}
          <div className={`lg:col-span-7 space-y-6 ${post.images.length === 0 ? "lg:col-span-12" : ""}`}>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${catStyle.bg} ${catStyle.text}`}>
                <Tag size={12} />
                {catStyle.label}
              </span>
              <span className="flex items-center gap-1.5 text-slate-400 font-medium text-xs">
                <Calendar size={12} />
                {formattedDate}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy leading-tight">
              {post.title}
            </h2>

            {post.summary && (
              <p className="text-lg text-slate-600 font-medium leading-relaxed italic border-l-4 border-forest/30 pl-4">
                {post.summary}
              </p>
            )}

            <div className="text-slate-600 leading-relaxed text-base space-y-4 whitespace-pre-line">
              {post.content}
            </div>
          </div>

          {/* Post Images */}
          {post.images.length > 0 && (
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
                <img
                  src={post.images[0]}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Thumbnail grid if multiple images */}
              {post.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {post.images.slice(1, 5).map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-sm border border-slate-100">
                      <img
                        src={img}
                        alt={`${post.title} thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
