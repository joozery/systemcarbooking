"use client";

import { motion } from "framer-motion";

interface VehicleStatusStepProps {
  type: "engine" | "movement";
  value: string;
  onSelect: (val: string) => void;
}

export default function VehicleStatusStep({ type, value, onSelect }: VehicleStatusStepProps) {
  const options = type === "engine" 
    ? ["สตาร์ทติด", "สตาร์ทไม่ติด"] 
    : ["เข็นเคลื่อนย้ายได้", "เข็นไม่ได้ / ล้อล็อค"];

  const title = type === "engine"
    ? "สถานะเครื่องยนต์ของรถคุณ"
    : "สถานะการเคลื่อนย้าย (เข็นได้หรือไม่?)";

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-2xl font-black text-[#001A3D]">{title}</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`rounded-lg border-2 p-6 text-xl font-bold transition-all ${
              value === opt ? "border-[#0047AB] bg-[#0047AB]/5 text-[#0047AB]" : "border-slate-100 text-[#001A3D] hover:border-[#0047AB]/50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
