"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface NotesStepProps {
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
}

export default function NotesStep({ value, onChange, onNext }: NotesStepProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-2xl font-black text-[#001A3D]">เงื่อนไขพิเศษ / หมายเหตุ (ถ้ามี)</h2>
      <div className="mt-8 relative">
        <FileText className="absolute left-4 top-4 h-6 w-6 text-slate-400" />
        <textarea 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="เช่น ต้องการรถสไลด์เท่านั้น, รถโหลดเตี้ย..."
          rows={4}
          className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 pl-14 pr-6 py-4 text-base font-bold outline-none focus:border-[#0047AB] focus:bg-white resize-none"
        />
      </div>
      <button 
        onClick={onNext}
        className="mt-6 w-full rounded-lg bg-[#0047AB] py-4 text-center font-bold text-white transition-all hover:bg-[#003580]"
      >
        ดำเนินการต่อ
      </button>
    </motion.div>
  );
}
