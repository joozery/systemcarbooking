"use client";

import { motion } from "framer-motion";
import { Wrench, AlertTriangle, Move } from "lucide-react";

interface ReasonStepProps {
  selectedReason: string;
  onSelect: (reason: string) => void;
}

export default function ReasonStep({ selectedReason, onSelect }: ReasonStepProps) {
  const reasonOptions = [
    { id: "รถเสีย", icon: Wrench },
    { id: "อุบัติเหตุ", icon: AlertTriangle },
    { id: "เคลื่อนย้ายปกติ", icon: Move },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-2xl font-black text-[#001A3D]">ระบุสาเหตุที่เรียกใช้บริการ</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {reasonOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`group flex flex-col items-center rounded-lg border-2 p-6 text-center transition-all ${
              selectedReason === opt.id ? "border-[#0047AB] bg-[#0047AB]/5" : "border-slate-100 hover:border-[#0047AB]/50"
            }`}
          >
            <opt.icon className={`mb-3 h-8 w-8 ${selectedReason === opt.id ? "text-[#0047AB]" : "text-slate-400 group-hover:text-[#0047AB]"}`} />
            <span className="font-bold text-[#001A3D]">{opt.id}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
