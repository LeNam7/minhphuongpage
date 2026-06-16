"use client";

import { useState, useEffect, useRef } from "react";
import { X, Eye, EyeOff, ShieldCheck, AlertCircle, LogOut } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useTranslations } from "next-intl";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const t = useTranslations("Admin");
  const { isAdmin, login, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && !isAdmin) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, isAdmin]);

  useEffect(() => {
    if (!isOpen) {
      setUsername("");
      setPassword("");
      setError("");
      setSuccess(false);
      setShowPassword(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate a brief loading state
    await new Promise((r) => setTimeout(r, 600));

    const ok = login(username, password);
    setIsLoading(false);

    if (ok) {
      setSuccess(true);
      setTimeout(() => onClose(), 1000);
    } else {
      setError(t("loginError"));
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-[slideUp_300ms_ease-out]">
        {/* Header gradient */}
        <div className="relative bg-gradient-to-br from-navy via-[#243b50] to-forest-dark px-8 pt-8 pb-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
              <ShieldCheck size={24} className="text-gold" />
            </div>
            <div>
              <h2 className="text-white font-heading font-bold text-xl">
                {t("title")}
              </h2>
              <p className="text-white/60 text-sm">{t("subtitle")}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6 -mt-4">
          {isAdmin ? (
            /* Already logged in */
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <ShieldCheck size={32} className="text-green-600" />
              </div>
              <p className="text-lg font-semibold text-navy mb-1">{t("loggedIn")}</p>
              <p className="text-sm text-slate-500 mb-6">{t("loggedInDesc")}</p>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-red-50 text-red-600 font-semibold text-sm hover:bg-red-100 transition-colors"
              >
                <LogOut size={16} />
                {t("logoutBtn")}
              </button>
            </div>
          ) : success ? (
            /* Success state */
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center animate-[scaleIn_300ms_ease-out]">
                <ShieldCheck size={32} className="text-green-600" />
              </div>
              <p className="text-lg font-semibold text-green-700">{t("success")}</p>
            </div>
          ) : (
            /* Login form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-navy mb-1.5">
                  {t("usernameLabel")}
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm text-navy"
                  placeholder={t("usernamePlaceholder")}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-1.5">
                  {t("passwordLabel")}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 bg-slate-50/50 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm text-navy"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-gold to-[#d4af61] text-white font-heading font-bold text-sm hover:shadow-lg hover:shadow-gold/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t("loggingIn")}
                  </>
                ) : (
                  t("loginBtn")
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
