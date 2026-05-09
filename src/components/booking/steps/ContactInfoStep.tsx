"use client";

import { motion } from "framer-motion";
import { User, Phone, MessageSquare } from "lucide-react";

interface ContactInfoStepProps {
  name: string;
  phone: string;
  lineId: string;
  onChange: (key: string, value: string) => void;
  onNext: () => void;
}

export default function ContactInfoStep({ name, phone, lineId, onChange, onNext }: ContactInfoStepProps) {
  const isComplete = name.length > 0 && phone.length >= 9;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-[#001A3D]">ข้อมูลติดต่อกลับ</h2>
        <p className="text-sm font-medium text-slate-500 mt-2">เพื่อให้เจ้าหน้าที่และพาร์ทเนอร์สามารถติดต่อคุณได้สะดวก</p>
      </div>

      <div className="space-y-4">
        {/* Name Input */}
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">ชื่อผู้ติดต่อ</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="กรุณากรอกชื่อ-นามสกุล"
              value={name}
              onChange={(e) => onChange("customerName", e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:border-[#0047AB]/20 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Phone Input */}
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">เบอร์โทรศัพท์ (จำเป็น)</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="tel"
              placeholder="08X-XXX-XXXX"
              value={phone}
              onChange={(e) => onChange("customerPhone", e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:border-[#0047AB]/20 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Line ID Input */}
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">ID Line (ถ้ามี)</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="@line_id"
              value={lineId}
              onChange={(e) => onChange("customerLineId", e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:border-[#0047AB]/20 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!isComplete}
        className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-xl ${
          isComplete 
          ? "bg-[#001A3D] text-white hover:bg-blue-900 shadow-blue-900/20" 
          : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
        }`}
      >
        ดำเนินการต่อ
      </button>
    </motion.div>
  );
}
