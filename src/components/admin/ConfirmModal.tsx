"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: "danger" | "success" | "warning";
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "warning",
  confirmText = "ยืนยัน",
  cancelText = "ยกเลิก"
}: ConfirmModalProps) {
  const getColors = () => {
    switch (type) {
      case "danger":
        return {
          icon: "bg-rose-50 text-rose-500",
          button: "bg-rose-600 hover:bg-rose-700 shadow-rose-200",
        };
      case "success":
        return {
          icon: "bg-emerald-50 text-emerald-500",
          button: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200",
        };
      default:
        return {
          icon: "bg-blue-50 text-blue-600",
          button: "bg-[#001A3D] hover:bg-black shadow-slate-200",
        };
    }
  };

  const colors = getColors();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-8 shadow-2xl"
          >
            <div className="flex flex-col items-center text-center">
              <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${colors.icon}`}>
                {type === "success" ? (
                  <CheckCircle2 className="h-8 w-8" />
                ) : (
                  <AlertCircle className="h-8 w-8" />
                )}
              </div>

              <h3 className="mb-2 text-xl font-black text-[#001A3D] tracking-tight">
                {title}
              </h3>
              <p className="mb-8 text-sm font-bold text-slate-400 leading-relaxed">
                {message}
              </p>

              <div className="flex w-full gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 rounded-xl border border-slate-100 bg-white py-3.5 text-xs font-black uppercase tracking-widest text-slate-400 transition-all hover:bg-slate-50 active:scale-95"
                >
                  {cancelText}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-1 rounded-xl py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all active:scale-95 ${colors.button}`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
