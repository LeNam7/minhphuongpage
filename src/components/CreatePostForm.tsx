"use client";

import { useState, useRef, useCallback } from "react";
import {
  ImagePlus,
  X,
  Send,
  ArrowLeft,
  FileText,
  Tag,
  AlignLeft,
  Loader2,
  CheckCircle2,
  GripVertical,
} from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useAuth } from "./AuthContext";

interface ImagePreview {
  id: string;
  file: File;
  url: string;
}

export default function CreatePostForm() {
  const t = useTranslations("CreatePost");
  const { isAdmin } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (files: FileList | null) => {
    if (!files) return;
    const newImages: ImagePreview[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        newImages.push({
          id: crypto.randomUUID(),
          file,
          url: URL.createObjectURL(file),
        });
      }
    });
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.url);
      return prev.filter((i) => i.id !== id);
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleImageSelect(e.dataTransfer.files);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate post submission
    await new Promise((r) => setTimeout(r, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset after showing success
    setTimeout(() => {
      setTitle("");
      setCategory("");
      setSummary("");
      setContent("");
      setImages([]);
      setIsSuccess(false);
    }, 3000);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-100 flex items-center justify-center">
            <FileText size={36} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-navy mb-3">
            {t("unauthorized")}
          </h2>
          <p className="text-slate-500 mb-6">{t("unauthorizedDesc")}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-xl hover:bg-navy/90 transition-colors"
          >
            <ArrowLeft size={16} />
            {t("backHome")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-[120px] pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-navy hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-navy">
                {t("pageTitle")}
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">{t("pageDesc")}</p>
            </div>
          </div>
        </div>

        {/* Success overlay */}
        {isSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]">
            <div className="bg-white rounded-2xl p-10 shadow-2xl text-center animate-[scaleIn_300ms_ease-out]">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 size={40} className="text-green-600" />
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-2">
                {t("successTitle")}
              </h3>
              <p className="text-slate-500">{t("successDesc")}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Area */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
              <ImagePlus size={18} className="text-gold" />
              <h2 className="font-heading font-semibold text-navy">
                {t("imageSection")}
              </h2>
              <span className="text-xs text-slate-400 ml-auto">
                {images.length} {t("imagesUploaded")}
              </span>
            </div>

            <div className="p-6">
              {/* Drop zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                  dragOver
                    ? "border-gold bg-gold/5 scale-[1.01]"
                    : "border-slate-200 hover:border-gold/50 hover:bg-slate-50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageSelect(e.target.files)}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-1">
                    <ImagePlus size={24} className="text-gold" />
                  </div>
                  <p className="text-sm font-semibold text-navy">
                    {t("dropzoneTitle")}
                  </p>
                  <p className="text-xs text-slate-400">
                    {t("dropzoneDesc")}
                  </p>
                </div>
              </div>

              {/* Image previews */}
              {images.length > 0 && (
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {images.map((img) => (
                    <div
                      key={img.id}
                      className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 hover:border-gold/50 transition-all hover:shadow-md"
                    >
                      <Image
                        src={img.url}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      {/* File name */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                        <p className="text-[10px] text-white truncate">
                          {img.file.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Title & Category */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
              <FileText size={18} className="text-gold" />
              <h2 className="font-heading font-semibold text-navy">
                {t("contentSection")}
              </h2>
            </div>

            <div className="p-6 space-y-5">
              {/* Title */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-navy mb-2">
                  <FileText size={14} className="text-slate-400" />
                  {t("titleLabel")} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm text-navy placeholder:text-slate-300"
                  placeholder={t("titlePlaceholder")}
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-navy mb-2">
                  <Tag size={14} className="text-slate-400" />
                  {t("categoryLabel")}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm text-navy"
                >
                  <option value="">{t("categoryPlaceholder")}</option>
                  <option value="seafood">{t("catSeafood")}</option>
                  <option value="fruit">{t("catFruit")}</option>
                  <option value="coffee">{t("catCoffee")}</option>
                  <option value="news">{t("catNews")}</option>
                  <option value="event">{t("catEvent")}</option>
                </select>
              </div>

              {/* Summary */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-navy mb-2">
                  <AlignLeft size={14} className="text-slate-400" />
                  {t("summaryLabel")}
                </label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm text-navy placeholder:text-slate-300 resize-none"
                  placeholder={t("summaryPlaceholder")}
                />
              </div>

              {/* Content */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-navy mb-2">
                  <AlignLeft size={14} className="text-slate-400" />
                  {t("contentLabel")} <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm text-navy placeholder:text-slate-300 resize-y min-h-[200px]"
                  placeholder={t("contentPlaceholder")}
                  required
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-slate-400 order-2 sm:order-1">
              {t("disclaimer")}
            </p>
            <div className="flex items-center gap-3 order-1 sm:order-2">
              <Link
                href="/"
                className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                {t("cancelBtn")}
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || !title || !content}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-gold to-[#d4af61] text-white font-heading font-bold text-sm hover:shadow-lg hover:shadow-gold/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {t("publishing")}
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    {t("publishBtn")}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
