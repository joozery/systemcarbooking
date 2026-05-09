"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function SuccessStep() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center py-12 text-center max-w-lg mx-auto"
    >
      <div className="relative mb-12">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-emerald-400 blur-3xl opacity-20"
        ></motion.div>
        <div className="relative h-32 w-32 rounded-[2.5rem] bg-emerald-50 border-4 border-white shadow-2xl flex items-center justify-center text-emerald-500">
          <CheckCircle2 className="h-16 w-16" />
        </div>
      </div>

      <h2 className="text-4xl font-black text-[#001A3D] mb-4 tracking-tight">ส่งใบสมัครสำเร็จ!</h2>
      <p className="text-sm font-medium text-slate-500 leading-relaxed mb-12 px-6">
        ทีมแอดมินได้รับข้อมูลของคุณแล้ว เราจะทำการตรวจสอบความถูกต้องของเอกสารและติดต่อกลับผ่าน LINE หรือเบอร์โทรศัพท์ของคุณ <span className="text-blue-600 font-bold">ภายใน 24 ชม.</span>
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Link 
          href="/" 
          className="flex-1 px-8 py-4 rounded-2xl bg-[#001A3D] text-white text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/20 hover:bg-[#002a5d] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          กลับหน้าหลัก
          <ArrowRight className="h-4 w-4" />
        </Link>
        <button 
          onClick={() => window.location.reload()}
          className="flex-1 px-8 py-4 rounded-2xl bg-white border border-slate-100 text-[#001A3D] text-xs font-black uppercase tracking-[0.2em] shadow-sm hover:bg-slate-50 transition-all"
        >
          สมัครเพิ่ม
        </button>
      </div>
      
      <p className="mt-12 text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">
        Crown Wealth Service Partner Program
      </p>
    </motion.div>
  );
}
