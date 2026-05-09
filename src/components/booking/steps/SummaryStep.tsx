"use client";

import { motion } from "framer-motion";
import { CheckCircle2, User, Phone, MessageSquare } from "lucide-react";

interface SummaryStepProps {
  data: any;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export default function SummaryStep({ data, isSubmitting, onSubmit }: SummaryStepProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="mt-4 text-2xl font-black text-[#001A3D]">ตรวจสอบข้อมูลการจอง</h2>
      </div>
      
      <div className="mt-8 space-y-4 rounded-[24px] bg-slate-50 p-6 border border-slate-100">
        {/* Contact Info Section */}
        <div className="pb-4 border-b border-slate-200 mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#0047AB]">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ชื่อผู้ติดต่อ</p>
              <p className="text-sm font-bold text-[#001A3D]">{data.customerName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-green-600">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">เบอร์โทรศัพท์</p>
              <p className="text-sm font-bold text-[#001A3D]">{data.customerPhone}</p>
            </div>
          </div>
          {data.customerLineId && (
            <div className="flex items-center gap-3 col-span-full pt-2">
              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-emerald-500">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID Line</p>
                <p className="text-sm font-bold text-[#001A3D]">{data.customerLineId}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between border-b border-slate-200 pb-3">
          <span className="text-slate-500 font-medium">ประเภทบริการ</span>
          <span className="font-bold text-[#001A3D]">{data.serviceType}</span>
        </div>
        <div className="flex justify-between border-b border-slate-200 pb-3">
          <span className="text-slate-500 font-medium">สาเหตุ</span>
          <span className="font-bold text-[#001A3D]">{data.reason}</span>
        </div>
        <div className="flex justify-between border-b border-slate-200 pb-3">
          <span className="text-slate-500 font-medium">สถานะรถ</span>
          <span className="font-bold text-[#001A3D]">{data.engineStatus} / {data.movementStatus}</span>
        </div>
        <div className="flex flex-col gap-1 border-b border-slate-200 pb-3">
          <span className="text-slate-500 font-medium">ต้นทาง</span>
          <span className="font-bold text-[#001A3D] text-xs leading-relaxed">{data.origin}</span>
        </div>
        <div className="flex flex-col gap-1 border-b border-slate-200 pb-3">
          <span className="text-slate-500 font-medium">ปลายทาง</span>
          <span className="font-bold text-[#001A3D] text-xs leading-relaxed">{data.destination}</span>
        </div>
        
        {/* Pricing Info */}
        <div className="pt-2">
          <div className="flex justify-between items-center">
            <span className="text-[#0047AB] font-black uppercase tracking-wider text-xs">ราคาเริ่มต้น</span>
            <span className="text-2xl font-black text-[#0047AB]">{data.serviceType === 'รถสไลด์' ? '2,500.-' : '1,500.-'} <span className="text-xs opacity-60">THB</span></span>
          </div>
          <p className="mt-2 text-[10px] font-bold text-red-500 bg-red-50 p-2 rounded-md border border-red-100">
            * หมายเหตุ: ราคาอาจมีการเปลี่ยนแปลงเพิ่มหรือลดตามระยะทางและประเภทรถจริง
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button 
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-[#001A3D] py-4 text-center font-black text-white shadow-xl shadow-blue-900/30 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              กำลังสร้างคำขอ...
            </span>
          ) : (
            "ยืนยันการเรียกใช้บริการ"
          )}
        </button>
      </div>
    </motion.div>
  );
}
