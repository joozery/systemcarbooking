"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Globe, Check } from "lucide-react";
import { FormInput } from "./FormInput";

interface ZoneTimeStepProps {
  data: any;
  updateData: (key: string, value: any) => void;
}

export function ZoneTimeStep({ data, updateData }: ZoneTimeStepProps) {
  const scopeOptions = [
    { label: "เฉพาะในจังหวัดและปริมณฑล", sub: "เน้นงานใกล้ รวดเร็ว", id: "local" },
    { label: "วิ่งข้ามจังหวัด/ทั่วไทย", sub: "รับงานระยะไกลได้", id: "national" }
  ];

  const timeOptions = [
    { label: "สแตนด์บาย 24 ชม.", id: "24h" },
    { label: "ช่วงกลางวัน (06:00-20:00)", id: "day" },
    { label: "ช่วงกลางคืน (20:00-06:00)", id: "night" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }} 
      className="max-w-2xl mx-auto space-y-10"
    >
      <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
         <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm shadow-blue-100">
          <MapPin className="h-5 w-5" />
         </div>
         <div>
            <h3 className="text-xl font-black text-[#001A3D] tracking-tight">พื้นที่ให้บริการและเวลา</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Service Area and Availability</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput 
          label="จังหวัดที่สแตนด์บายหลัก"
          placeholder="เช่น กรุงเทพฯ, นนทบุรี"
          value={data.baseProvince}
          onChange={(val) => updateData("baseProvince", val)}
          icon={MapPin}
          required
        />
        <FormInput 
          label="อำเภอ/เขต ที่รับงานประจำ"
          placeholder="เช่น ลาดพร้าว, ปากเกร็ด"
          value={data.baseDistrict}
          onChange={(val) => updateData("baseDistrict", val)}
          icon={Globe}
        />
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">พื้นที่ที่ยินดีไป (Scope)</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {scopeOptions.map((opt) => (
            <button 
              key={opt.id} 
              type="button"
              onClick={() => updateData("serviceScope", opt.label)} 
              className={`flex items-center gap-4 p-5 rounded-xl border transition-all text-left ${
                data.serviceScope === opt.label 
                  ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600" 
                  : "bg-white border-slate-100 hover:border-slate-300"
              }`}
            >
               <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
                 data.serviceScope === opt.label ? "border-blue-600 bg-blue-600" : "border-slate-300"
               }`}>
                  {data.serviceScope === opt.label && <Check className="h-3 w-3 text-white" />}
               </div>
               <div>
                  <div className={`text-xs font-black ${data.serviceScope === opt.label ? "text-blue-900" : "text-slate-600"}`}>{opt.label}</div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{opt.sub}</div>
               </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">ช่วงเวลาที่สะดวกรับงาน</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {timeOptions.map((time) => (
            <button 
              key={time.id} 
              type="button"
              onClick={() => updateData("availableTime", time.label)} 
              className={`p-4 rounded-xl border text-center transition-all ${
                data.availableTime === time.label 
                  ? "bg-[#001A3D] border-[#001A3D] text-white shadow-lg shadow-blue-900/20" 
                  : "bg-white border-slate-100 text-slate-500 hover:border-slate-300"
              }`}
            >
               <Clock className={`h-4 w-4 mx-auto mb-2 ${data.availableTime === time.label ? "text-blue-400" : "text-slate-300"}`} />
               <div className="text-[10px] font-black leading-tight uppercase">{time.label}</div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
