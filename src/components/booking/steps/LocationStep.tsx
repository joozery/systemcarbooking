"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import LocationPicker from "../LocationPicker";

interface LocationStepProps {
  type: "origin" | "destination";
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
}

export default function LocationStep({ type, value, onChange, onNext }: LocationStepProps) {
  const title = type === "origin" ? "ระบุจุดรับรถ (ต้นทาง)" : "ระบุจุดส่งรถ (ปลายทาง)";
  const icon = type === "origin" ? MapPin : Navigation;
  const placeholder = type === "origin" 
    ? "เช่น ซอยสุขุมวิท 55, หน้าเซ็นทรัลเวิลด์..." 
    : "เช่น อู่ซ่อมรถ B-Quik สาขาสาทร...";

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-2xl font-black text-[#001A3D]">{title}</h2>
      <div className="mt-8">
        <LocationPicker 
          value={value} 
          onChange={onChange} 
          placeholder={placeholder}
          icon={icon}
        />
      </div>
      <button 
        disabled={!value}
        onClick={onNext}
        className="mt-6 w-full rounded-lg bg-[#0047AB] py-4 text-center font-bold text-white disabled:opacity-50 transition-all hover:bg-[#003580] active:scale-95"
      >
        ยืนยัน{type === "origin" ? "จุดรับรถ" : "จุดส่งรถ"}
      </button>
    </motion.div>
  );
}
