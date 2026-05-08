"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Don't show cookie consent on admin pages
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAdminPage) return null;

  useEffect(() => {
    if (isAdminPage) return;
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("cookie-consent");
    if (!hasAccepted) {
      // Delay appearance for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 left-6 right-6 z-[9999] mx-auto max-w-4xl"
        >
          <div className="overflow-hidden rounded-2xl bg-white/80 border border-white/40 shadow-2xl backdrop-blur-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#001A3D] text-white shadow-lg shadow-[#001A3D]/20">
                  <Cookie className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-[#001A3D]">เราใช้คุกกี้เพื่อประสบการณ์ที่ดีที่สุด</h4>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-xl">
                    Crown Wealth ใช้คุกกี้เพื่อพัฒนาประสิทธิภาพการทำงานของเว็บไซต์ และมอบประสบการณ์การใช้งานที่ดียิ่งขึ้นให้กับคุณ 
                    คุณสามารถเลือกตั้งค่าความเป็นส่วนตัวของคุณได้ตลอดเวลา <Link href="/cookies" className="text-[#0047AB] font-bold hover:underline">นโยบายคุกกี้</Link>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button 
                  onClick={handleDecline}
                  className="flex-1 md:flex-none px-6 py-3 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  ปฏิเสธ
                </button>
                <button 
                  onClick={handleAccept}
                  className="flex-1 md:flex-none px-8 py-3 bg-[#001A3D] text-white text-xs font-black rounded-xl shadow-xl shadow-[#001A3D]/20 hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="h-4 w-4" />
                  ยอมรับทั้งหมด
                </button>
              </div>

            </div>
            
            <button 
              onClick={handleDecline}
              className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
