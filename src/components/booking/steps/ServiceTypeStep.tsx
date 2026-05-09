"use client";

import { motion } from "framer-motion";

interface ServiceTypeStepProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

export default function ServiceTypeStep({ selectedType, onSelect }: ServiceTypeStepProps) {
  const serviceOptions = [
    { id: "รถบรรทุก", image: "/car/truck.png", desc: "สำหรับขนย้ายสินค้าหรือสิ่งของขนาดใหญ่" },
    { id: "รถลากจูง", image: "/car/larh.png", desc: "สำหรับยกรถเสียหรือเกิดอุบัติเหตุ" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-2xl font-black text-[#001A3D]">เลือกประเภทบริการที่คุณต้องการ</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {serviceOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`group flex flex-col items-center rounded-2xl border-2 p-8 text-center transition-all duration-300 ${
              selectedType === opt.id ? "border-[#0047AB] bg-[#0047AB]/5 ring-4 ring-[#0047AB]/5" : "border-slate-100 hover:border-[#0047AB]/30 bg-white"
            }`}
          >
            <div className="relative mb-4 flex h-40 w-full items-center justify-center transition-all duration-500 group-hover:scale-110">
               <img 
                src={opt.image} 
                alt={opt.id}
                className="h-full w-full object-contain drop-shadow-2xl"
               />
            </div>
            <span className="text-xl font-bold text-[#001A3D]">{opt.id}</span>
            <span className="mt-2 text-xs font-medium text-slate-500 leading-relaxed">{opt.desc}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
