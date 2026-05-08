"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Truck, FileText, CheckCircle2, ChevronRight, ChevronLeft, UploadCloud, Camera, IdCard, Check } from "lucide-react";
import Link from "next/link";

type PartnerData = {
  firstName: string;
  lastName: string;
  phone: string;
  lineId: string;
  vehicleType: string;
  licensePlate: string;
  province: string;
};

const steps = [
  { id: 1, name: "ข้อมูลส่วนตัว", icon: User },
  { id: 2, name: "ข้อมูลรถ", icon: Truck },
  { id: 3, name: "เอกสาร", icon: FileText },
];

export function PartnerWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<PartnerData>({
    firstName: "",
    lastName: "",
    phone: "",
    lineId: "",
    vehicleType: "รถลากจูง",
    licensePlate: "",
    province: "กรุงเทพมหานคร",
  });

  const updateData = (key: keyof PartnerData, value: string) => setData((prev) => ({ ...prev, [key]: value }));
  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="mx-auto max-w-4xl rounded-3xl bg-white shadow-2xl shadow-[#001A3D]/5 border border-slate-100 overflow-hidden">
      
      {/* Header & Stepper */}
      <div className="bg-[#001A3D] p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 opacity-10">
          <Truck className="h-64 w-64 text-white" />
        </div>
        
        <div className="relative z-10 text-center md:text-left mb-8">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0047AB] bg-white/10 px-3 py-1 rounded-full border border-white/20">Driver Application</span>
          <h2 className="mt-4 text-3xl font-black text-white tracking-tight">สมัครพาร์ทเนอร์คนขับ</h2>
          <p className="mt-2 text-sm font-medium text-slate-300">เข้าร่วมเป็นส่วนหนึ่งของเครือข่ายความช่วยเหลือที่ใหญ่ที่สุด</p>
        </div>

        {/* Stepper */}
        {step < 4 && (
          <div className="relative z-10 mt-8">
            <div className="flex justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 z-0"></div>
              {steps.map((s, i) => {
                const isActive = step === s.id;
                const isPassed = step > s.id;
                return (
                  <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
                    <div className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive ? "bg-[#0047AB] border-[#0047AB] text-white shadow-[0_0_15px_rgba(0,71,171,0.5)] scale-110" : 
                      isPassed ? "bg-emerald-500 border-emerald-500 text-white" : 
                      "bg-[#001430] border-white/20 text-white/40"
                    }`}>
                      {isPassed ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                    </div>
                    <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${isActive ? "text-white" : "text-white/40"}`}>
                      {s.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="min-h-[450px] p-8 md:p-12 relative bg-slate-50">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500">ชื่อจริง</label>
                  <input type="text" placeholder="สมชาย" value={data.firstName} onChange={(e) => updateData("firstName", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold shadow-sm focus:border-[#0047AB] focus:ring-1 focus:ring-[#0047AB] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500">นามสกุล</label>
                  <input type="text" placeholder="ใจดี" value={data.lastName} onChange={(e) => updateData("lastName", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold shadow-sm focus:border-[#0047AB] focus:ring-1 focus:ring-[#0047AB] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500">เบอร์โทรศัพท์</label>
                  <input type="tel" placeholder="08X-XXX-XXXX" value={data.phone} onChange={(e) => updateData("phone", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold shadow-sm focus:border-[#0047AB] focus:ring-1 focus:ring-[#0047AB] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500">LINE ID (ถ้ามี)</label>
                  <input type="text" placeholder="@yourlineid" value={data.lineId} onChange={(e) => updateData("lineId", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold shadow-sm focus:border-[#0047AB] focus:ring-1 focus:ring-[#0047AB] outline-none transition-all" />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Vehicle Info */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-2xl mx-auto space-y-8">
              
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500">ประเภทรถที่ใช้รับงาน</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { type: "รถลากจูง", image: "/car/larh.png", desc: "สำหรับลากจูงรถเสีย" },
                    { type: "รถบรรทุก", image: "/car/truck.png", desc: "สไลด์ออน, รถยก" }
                  ].map((v) => (
                    <button 
                      key={v.type}
                      onClick={() => updateData("vehicleType", v.type)}
                      className={`group flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 ${
                        data.vehicleType === v.type ? "border-[#0047AB] bg-white ring-4 ring-[#0047AB]/5" : "border-slate-200 bg-white hover:border-[#0047AB]/30"
                      }`}
                    >
                      <div className="relative mb-4 flex h-32 w-full items-center justify-center transition-all duration-500 group-hover:scale-110">
                        <img 
                          src={v.image} 
                          alt={v.type}
                          className="h-full w-full object-contain drop-shadow-xl"
                        />
                      </div>
                      <span className={`font-bold transition-colors ${data.vehicleType === v.type ? "text-[#0047AB]" : "text-[#001A3D]"}`}>
                        {v.type}
                      </span>
                      <span className="text-[10px] mt-1 font-medium text-slate-500">{v.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500">ทะเบียนรถ</label>
                  <input type="text" placeholder="1ขธ 1234" value={data.licensePlate} onChange={(e) => updateData("licensePlate", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold shadow-sm focus:border-[#0047AB] focus:ring-1 focus:ring-[#0047AB] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500">จังหวัดป้ายทะเบียน</label>
                  <select value={data.province} onChange={(e) => updateData("province", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold shadow-sm focus:border-[#0047AB] focus:ring-1 focus:ring-[#0047AB] outline-none transition-all appearance-none">
                    <option>กรุงเทพมหานคร</option>
                    <option>นนทบุรี</option>
                    <option>ปทุมธานี</option>
                    <option>สมุทรปราการ</option>
                    <option>ชลบุรี</option>
                    <option>อื่นๆ</option>
                  </select>
                </div>
              </div>

            </motion.div>
          )}

          {/* STEP 3: Documents */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-2xl mx-auto space-y-6">
              
              {[
                { title: "สำเนาบัตรประชาชน", icon: IdCard, desc: "ถ่ายภาพให้เห็นข้อมูลชัดเจน ไม่สะท้อนแสง" },
                { title: "ใบอนุญาตขับขี่", icon: FileText, desc: "ต้องเป็นใบขับขี่ที่ยังไม่หมดอายุ" },
                { title: "ภาพถ่ายรถ", icon: Camera, desc: "ภาพถ่ายด้านหน้ารถเห็นป้ายทะเบียนชัดเจน" }
              ].map((doc, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#0047AB]/30 transition-all cursor-pointer group">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0047AB] group-hover:bg-[#0047AB] group-hover:text-white transition-colors">
                    <doc.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="font-bold text-[#001A3D]">{doc.title}</div>
                    <div className="text-xs font-medium text-slate-500">{doc.desc}</div>
                  </div>
                  <div className="px-4 py-2 rounded-lg border-2 border-dashed border-slate-300 text-xs font-bold text-slate-500 group-hover:border-[#0047AB] group-hover:text-[#0047AB] transition-colors flex items-center gap-2">
                    <UploadCloud className="h-4 w-4" /> อัปโหลด
                  </div>
                </div>
              ))}
              
            </motion.div>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center max-w-lg mx-auto">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-emerald-400 blur-[30px] opacity-20 rounded-full animate-pulse"></div>
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-lg border border-emerald-200">
                  <CheckCircle2 className="h-14 w-14" />
                </div>
              </div>
              <h2 className="text-3xl font-black text-[#001A3D] mb-4">ส่งข้อมูลสำเร็จ!</h2>
              <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8">
                ระบบได้รับข้อมูลของคุณแล้ว ทีมงานจะทำการตรวจสอบเอกสารและติดต่อกลับผ่านเบอร์โทรศัพท์ที่คุณให้ไว้ภายใน 24 ชั่วโมง
              </p>
              <Link href="/" className="rounded-xl border border-slate-200 bg-white px-10 py-4 text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-all">
                กลับสู่หน้าหลัก
              </Link>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Footer Navigation */}
        {step < 4 && (
          <div className="mt-12 flex items-center justify-between max-w-2xl mx-auto">
            <button 
              onClick={handlePrev} 
              disabled={step === 1}
              className={`flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-all ${
                step === 1 ? "text-slate-300 cursor-not-allowed" : "text-slate-500 hover:bg-white hover:shadow-sm"
              }`}
            >
              <ChevronLeft className="h-4 w-4" /> ย้อนกลับ
            </button>
            <button 
              onClick={handleNext} 
              className="flex items-center gap-2 rounded-xl bg-[#001A3D] px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#001A3D]/20 transition-all hover:bg-[#002A5D] active:scale-95"
            >
              {step === 3 ? "ส่งใบสมัคร" : "ถัดไป"} <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
