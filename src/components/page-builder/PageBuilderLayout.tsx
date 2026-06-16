"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/components/AuthContext";
import { usePageBuilder } from "./usePageBuilder";
import { BLOCK_REGISTRY, getBlockDef } from "@/lib/block-registry";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  ArrowLeft, Save, Undo2, Redo2, RotateCcw,
  GripVertical, Eye, EyeOff, Trash2, Lock, Plus, Check,
  Image as ImageIcon, BarChart3, Info, Factory, Package, Link as LinkIcon,
  Award, Leaf, HelpCircle, Phone, FileText, Calendar, Tag, Upload, Sparkles,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Image: ImageIcon, BarChart3, Info, Factory, Package,
  Link: LinkIcon, Award, Leaf, HelpCircle, Phone, FileText,
};

const CATEGORY_LABELS: Record<string, string> = {
  layout: "Bố cục",
  content: "Nội dung",
  marketing: "Marketing",
};

const MOCK_IMAGES = [
  { url: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=600&q=80", label: "Hải sản / Seafood" },
  { url: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&w=600&q=80", label: "Trái cây / Fruits" },
  { url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80", label: "Cà phê / Coffee" },
  { url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80", label: "ESG / Farm" },
  { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80", label: "Nhà máy / Factory" },
];

export default function PageBuilderLayout() {
  const { isAdmin } = useAuth();
  const t = useTranslations("PageBuilder");
  const pb = usePageBuilder();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [paletteDrag, setPaletteDrag] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Tabs
  const [activeTab, setActiveTab] = useState<"overview" | "create">("overview");

  // New Block/Post Form states
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("seafood");
  const [newSummary, setNewSummary] = useState("");
  const [newContent, setNewContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(MOCK_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [formError, setFormError] = useState("");
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  // Custom blocks loaded from localStorage
  const [customBlocks, setCustomBlocks] = useState<any[]>([]);

  const loadCustomBlocks = useCallback(() => {
    fetch("/api/custom-blocks")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCustomBlocks(data);
        }
      })
      .catch((err) => console.error("Failed to load custom blocks from DB API:", err));
  }, []);

  useEffect(() => {
    loadCustomBlocks();
  }, [loadCustomBlocks]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ice-gray pt-24">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-navy mb-4">{t("unauthorized")}</h1>
          <p className="text-slate-500 mb-6">{t("unauthorizedDesc")}</p>
          <Link href="/" className="text-forest font-semibold hover:underline">{t("backHome")}</Link>
        </div>
      </div>
    );
  }

  // Blocks already in canvas
  const usedBlockIds = pb.blocks.map((b) => b.blockId);
  
  // Available palette items (unique standard blocks not yet used)
  const availablePalette = BLOCK_REGISTRY.filter(
    (def) => !def.unique || !usedBlockIds.includes(def.id)
  );

  // Map custom blocks to BlockDefinitions
  const customBlockDefs = customBlocks.map((cb) => ({
    id: cb.id,
    labelKey: cb.title, // Use title directly for dynamic label rendering
    icon: "FileText",
    descriptionKey: cb.summary || "Khối bài viết tùy chỉnh",
    category: "content" as const,
    unique: true,
  }));

  // Available custom blocks not yet added to canvas
  const availableCustomDefs = customBlockDefs.filter(
    (def) => !usedBlockIds.includes(def.id)
  );

  // Canvas drag handlers
  const handleCanvasDragStart = (index: number) => {
    setDraggedIndex(index);
  };
  const handleCanvasDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (paletteDrag) {
      setDragOverIndex(index);
      return;
    }
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };
  const handleCanvasDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (paletteDrag) {
      pb.addBlock(paletteDrag, index);
      setPaletteDrag(null);
      setDragOverIndex(null);
      return;
    }
    if (draggedIndex !== null && draggedIndex !== index) {
      pb.moveBlock(draggedIndex, index);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };
  const handleCanvasDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
    setPaletteDrag(null);
  };

  // Drop at the end of canvas
  const handleEndDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (paletteDrag) {
      pb.addBlock(paletteDrag);
      setPaletteDrag(null);
      setDragOverIndex(null);
      return;
    }
    if (draggedIndex !== null) {
      pb.moveBlock(draggedIndex, pb.blocks.length - 1);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Palette drag
  const handlePaletteDragStart = (blockId: string) => {
    setPaletteDrag(blockId);
  };

  // Create custom block
  const handleCreateBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setFormError("Vui lòng nhập tiêu đề khối / bài viết");
      return;
    }
    if (!newContent.trim()) {
      setFormError("Vui lòng nhập nội dung chi tiết bài viết");
      return;
    }

    const finalImage = customImageUrl.trim() || selectedImage;
    const blockId = `custom-post-${Date.now()}`;

    const newBlockData = {
      id: blockId,
      title: newTitle,
      category: newCategory,
      summary: newSummary,
      content: newContent,
      images: [finalImage],
      createdAt: Date.now(),
    };

    fetch("/api/custom-blocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBlockData),
    })
      .then((res) => res.json())
      .then(() => {
        loadCustomBlocks();
      })
      .catch((err) => console.error("Failed to save custom block to DB API:", err));

    // Clear form
    setNewTitle("");
    setNewCategory("seafood");
    setNewSummary("");
    setNewContent("");
    setSelectedImage(MOCK_IMAGES[0].url);
    setCustomImageUrl("");
    setFormError("");

    // Notify user
    setShowSuccessNotification(true);
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 4000);

    // Switch back to overview tab
    setActiveTab("overview");
  };

  // Delete custom block from reserve list (Database API)
  const handleDeleteCustomBlock = (blockId: string) => {
    fetch(`/api/custom-blocks?id=${blockId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        loadCustomBlocks();
      })
      .catch((err) => console.error("Failed to delete custom block from DB API:", err));
  };

  // Convert uploaded image to Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 800 * 1024) {
      setFormError("Kích thước ảnh quá lớn (vui lòng chọn ảnh < 800KB để đảm bảo lưu trữ tốt)");
      return;
    }
    setFormError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      setCustomImageUrl(""); // reset url input
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-[100px] pb-16">
      {/* Success Toast Notification */}
      {showSuccessNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-forest text-white px-5 py-3 rounded-xl shadow-2xl animate-[slideInUp_300ms_ease-out]">
          <div className="bg-white/20 p-1.5 rounded-lg">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="font-bold text-sm">Tạo khối bài viết thành công!</p>
            <p className="text-[11px] text-white/80">Kéo thả khối mới trong "Kho Khối Dự Bị" vào trang của bạn.</p>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="fixed top-[70px] left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-navy transition-colors">
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">{t("backHome")}</span>
            </Link>
            <div className="w-px h-5 bg-slate-200" />
            <h1 className="font-heading font-bold text-navy text-sm">{t("title")}</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Undo */}
            <button
              onClick={pb.undo}
              disabled={!pb.canUndo}
              className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title={`${t("undo")} (Ctrl+Z) — ${pb.undoCount}`}
            >
              <Undo2 size={16} />
            </button>
            {/* Redo */}
            <button
              onClick={pb.redo}
              disabled={!pb.canRedo}
              className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title={`${t("redo")} (Ctrl+Shift+Z) — ${pb.redoCount}`}
            >
              <Redo2 size={16} />
            </button>

            <div className="w-px h-5 bg-slate-200" />

            {/* Reset */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
              title={t("reset")}
            >
              <RotateCcw size={16} />
            </button>

            {/* Save */}
            <button
              onClick={pb.save}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest text-white text-sm font-semibold hover:bg-forest-dark transition-colors"
            >
              <Save size={14} />
              {t("save")}
            </button>

            {/* Status */}
            {pb.savedAt && (
              <span className="text-xs text-green-600 flex items-center gap-1 ml-1">
                <Check size={12} /> {pb.savedAt}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="max-w-[1400px] mx-auto px-4 mt-6">
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-4 px-1 border-b-2 font-heading font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === "overview"
                  ? "border-forest text-forest"
                  : "border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300"
              }`}
            >
              <FileText size={16} />
              Tổng Quát Trang (Page Overview)
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className={`pb-4 px-1 border-b-2 font-heading font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === "create"
                  ? "border-forest text-forest"
                  : "border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300"
              }`}
            >
              <Plus size={16} />
              Tạo Khối Mới (Create New Block)
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === "overview" ? (
        /* Main Builder Layout */
        <div className="max-w-[1400px] mx-auto px-4 py-6 flex gap-6 mt-2">
          {/* Sidebar — Block Palette */}
          <aside className="w-[300px] shrink-0">
            <div className="sticky top-[130px]">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">{t("palette")}</h2>

              {/* Standard blocks categories */}
              {Object.keys(CATEGORY_LABELS).map((cat) => {
                const items = availablePalette.filter((d) => d.category === cat);
                if (items.length === 0) return null;
                return (
                  <div key={cat} className="mb-4">
                    <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
                      {CATEGORY_LABELS[cat]}
                    </h3>
                    <div className="space-y-1.5">
                      {items.map((def) => {
                        const IconComp = ICON_MAP[def.icon];
                        const isUsed = usedBlockIds.includes(def.id);
                        return (
                          <div
                            key={def.id}
                            draggable={!isUsed}
                            onDragStart={() => handlePaletteDragStart(def.id)}
                            onDragEnd={handleCanvasDragEnd}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all ${
                              isUsed
                                ? "bg-slate-50 border-slate-100 opacity-40 cursor-not-allowed"
                                : "bg-white border-slate-200 hover:border-forest/30 hover:shadow-md cursor-grab active:cursor-grabbing"
                            }`}
                          >
                            {IconComp && <IconComp size={16} className="text-forest shrink-0" />}
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-semibold text-navy block truncate">{t(def.labelKey)}</span>
                              <span className="text-[11px] text-slate-400 block truncate">{isUsed ? t("inUse") : t("dragToAdd")}</span>
                            </div>
                            {!isUsed && (
                              <button
                                onClick={() => pb.addBlock(def.id)}
                                className="p-1 rounded-md hover:bg-forest/10 text-forest transition-colors shrink-0"
                                title={t("addBlock")}
                              >
                                <Plus size={14} />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Custom created blocks category */}
              {availableCustomDefs.length > 0 && (
                <div className="mb-4 pt-2 border-t border-slate-200">
                  <h3 className="text-[11px] font-bold text-forest uppercase tracking-wider mb-2 px-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />
                    Khối Bài Viết Tự Tạo
                  </h3>
                  <div className="space-y-1.5">
                    {availableCustomDefs.map((def) => {
                      const isUsed = usedBlockIds.includes(def.id);
                      return (
                        <div
                          key={def.id}
                          draggable={!isUsed}
                          onDragStart={() => handlePaletteDragStart(def.id)}
                          onDragEnd={handleCanvasDragEnd}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all ${
                            isUsed
                              ? "bg-slate-50 border-slate-100 opacity-40 cursor-not-allowed"
                              : "bg-white border-slate-200 hover:border-forest/30 hover:shadow-md cursor-grab active:cursor-grabbing"
                          }`}
                        >
                          <FileText size={16} className="text-forest shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-semibold text-navy block truncate">{def.labelKey}</span>
                            <span className="text-[11px] text-slate-400 block truncate">{isUsed ? t("inUse") : t("dragToAdd")}</span>
                          </div>
                          {!isUsed && (
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteCustomBlock(def.id);
                                }}
                                className="p-1 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                                title="Xóa khối dự bị"
                              >
                                <Trash2 size={14} />
                              </button>
                              <button
                                onClick={() => pb.addBlock(def.id)}
                                className="p-1 rounded-md hover:bg-forest/10 text-forest transition-colors"
                                title={t("addBlock")}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Canvas */}
          <div className="flex-1">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">
              {t("canvas")} ({pb.blocks.length} {t("blocks")})
            </h2>

            <div className="space-y-0">
              {pb.blocks.map((block, index) => {
                const def = getBlockDef(block.blockId);
                if (!def) return null;
                const IconComp = def.id.startsWith("custom-post-") ? FileText : ICON_MAP[def.icon];
                const isDragging = draggedIndex === index;
                const isOver = dragOverIndex === index;

                return (
                  <div key={block.instanceId}>
                    {/* Drop indicator line */}
                    {isOver && draggedIndex !== index && (
                      <div className="h-1 bg-forest rounded-full mx-4 my-1 transition-all animate-pulse" />
                    )}

                    <div
                      draggable
                      onDragStart={() => handleCanvasDragStart(index)}
                      onDragOver={(e) => handleCanvasDragOver(e, index)}
                      onDrop={(e) => handleCanvasDrop(e, index)}
                      onDragEnd={handleCanvasDragEnd}
                      className={`group flex items-center gap-3 px-4 py-3 rounded-xl border mb-2 transition-all duration-200 ${
                        isDragging
                          ? "opacity-40 scale-95 border-dashed border-slate-300 bg-slate-50"
                          : block.visible
                          ? "bg-white border-slate-200 hover:border-forest/20 hover:shadow-md"
                          : "bg-slate-50/80 border-slate-100 opacity-60"
                      }`}
                    >
                      {/* Drag handle */}
                      <div className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-slate-100 transition-colors">
                        <GripVertical size={16} className="text-slate-300 group-hover:text-slate-500" />
                      </div>

                      {/* Icon */}
                      {IconComp && <IconComp size={18} className={block.visible ? "text-forest" : "text-slate-300"} />}

                      {/* Label */}
                      <div className="flex-1 min-w-0">
                        <span className={`text-sm font-semibold block truncate ${block.visible ? "text-navy" : "text-slate-400 line-through"}`}>
                          {def.id.startsWith("custom-post-") ? def.labelKey : t(def.labelKey)}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {def.required && (
                          <span className="p-1 text-gold" title={t("required")}>
                            <Lock size={14} />
                          </span>
                        )}

                        <button
                          onClick={() => pb.toggleVisibility(block.instanceId)}
                          className="p-1.5 rounded-md hover:bg-slate-100 transition-colors"
                          title={block.visible ? t("hide") : t("show")}
                        >
                          {block.visible ? <Eye size={14} className="text-slate-400" /> : <EyeOff size={14} className="text-slate-300" />}
                        </button>

                        {!def.required && (
                          <button
                            onClick={() => setDeleteConfirm(block.instanceId)}
                            className="p-1.5 rounded-md hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors"
                            title={t("delete")}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* End drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOverIndex(pb.blocks.length); }}
                onDrop={handleEndDrop}
                onDragLeave={() => setDragOverIndex(null)}
                className={`border-2 border-dashed rounded-xl py-8 text-center transition-all mt-2 ${
                  dragOverIndex === pb.blocks.length
                    ? "border-forest bg-forest/5 text-forest"
                    : "border-slate-200 text-slate-300"
                }`}
              >
                <Plus size={20} className="mx-auto mb-1" />
                <span className="text-sm font-medium">{t("dropHere")}</span>
              </div>
            </div>

            {/* Undo info */}
            <div className="mt-6 text-xs text-slate-400 text-center">
              {t("undoHint")} — Ctrl+Z / Ctrl+Shift+Z
            </div>
          </div>
        </div>
      ) : (
        /* Create Block Form Layout */
        <div className="max-w-[900px] mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="mb-6 flex items-center gap-2.5">
              <div className="bg-forest/10 p-2 rounded-xl text-forest">
                <Sparkles size={20} />
              </div>
              <div>
                <h2 className="font-heading font-bold text-navy text-xl">Tạo Khối Bài Viết Mới</h2>
                <p className="text-slate-500 text-xs">Sau khi tạo, bài viết sẽ lưu tại kho khối dự bị để bạn kéo thả tùy chỉnh.</p>
              </div>
            </div>

            {formError && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-600 rounded-r-lg text-sm font-medium">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateBlock} className="space-y-6">
              <div className="grid sm:grid-cols-12 gap-6">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tiêu đề bài viết <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ví dụ: Xuất Khẩu Lô Tôm Sú Đầu Tiên Đi Nhật Bản"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Danh mục</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all"
                  >
                    <option value="seafood">Thủy sản / Seafood</option>
                    <option value="fruit">Trái cây / Fruits</option>
                    <option value="coffee">Cà phê / Coffee</option>
                    <option value="news">Tin tức / News</option>
                    <option value="event">Sự kiện / Event</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tóm tắt ngắn (Hiện dạng in nghiêng)</label>
                <textarea
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Một đoạn mô tả ngắn dẫn dắt người đọc..."
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nội dung chi tiết <span className="text-red-500">*</span></label>
                <textarea
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Nhập nội dung chi tiết bài viết của bạn tại đây..."
                  rows={6}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all"
                />
              </div>

              {/* Image Input Section */}
              <div className="border-t border-slate-100 pt-6">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Hình ảnh bài viết</label>
                
                {/* Image library */}
                <div className="mb-4">
                  <p className="text-[11px] font-semibold text-slate-400 mb-2">1. Chọn nhanh từ thư viện ảnh Minh Phương:</p>
                  <div className="grid grid-cols-5 gap-3">
                    {MOCK_IMAGES.map((img, idx) => {
                      const isSelected = selectedImage === img.url && !customImageUrl;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedImage(img.url);
                            setCustomImageUrl("");
                          }}
                          className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                            isSelected ? "border-forest shadow-md scale-102" : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img src={img.url} alt={img.label} className="object-cover w-full h-full" />
                          <div className="absolute inset-x-0 bottom-0 bg-black/60 text-[9px] text-white py-0.5 text-center truncate">
                            {img.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Upload or Custom Link */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] font-semibold text-slate-400 mb-1.5">2. Hoặc dán đường dẫn ảnh khác:</p>
                    <input
                      type="url"
                      value={customImageUrl}
                      onChange={(e) => {
                        setCustomImageUrl(e.target.value);
                      }}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all"
                    />
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-slate-400 mb-1.5">3. Hoặc tải tệp ảnh từ máy tính:</p>
                    <div className="relative flex items-center justify-center border border-slate-200 border-dashed rounded-xl py-1 px-4 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Upload size={14} className="text-slate-400" />
                        <span>Chọn ảnh...</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image preview */}
                <div className="mt-4 p-4 bg-slate-50 rounded-xl flex items-center gap-4">
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-white">
                    <img
                      src={customImageUrl.trim() || selectedImage}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy">Xem trước hình ảnh</p>
                    <p className="text-[10px] text-slate-400 truncate max-w-[500px]">
                      {customImageUrl.trim() || selectedImage.slice(0, 100) + "..."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("overview");
                    setFormError("");
                  }}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-forest text-white font-semibold text-sm hover:bg-forest-dark transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Tạo Khối Bố Cục
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4 animate-[scaleIn_200ms_ease-out]">
            <h3 className="font-heading font-bold text-navy text-lg mb-2">{t("confirmDeleteTitle")}</h3>
            <p className="text-slate-500 text-sm mb-6">{t("confirmDeleteDesc")}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                {t("cancel")}
              </button>
              <button
                onClick={() => { pb.removeBlock(deleteConfirm); setDeleteConfirm(null); }}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors"
              >
                {t("delete")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset confirmation modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4 animate-[scaleIn_200ms_ease-out]">
            <h3 className="font-heading font-bold text-navy text-lg mb-2">{t("confirmResetTitle")}</h3>
            <p className="text-slate-500 text-sm mb-6">{t("confirmResetDesc")}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                {t("cancel")}
              </button>
              <button
                onClick={() => { pb.resetLayout(); setShowResetConfirm(false); }}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors"
              >
                {t("reset")}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
