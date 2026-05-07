"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Car, AlertTriangle, Wrench, Move, CheckCircle2, MapPin, Navigation, FileText, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

type BookingData = {
  serviceType: string;
  reason: string;
  engineStatus: string;
  movementStatus: string;
  origin: string;
  destination: string;
  notes: string;
};

export function BookingWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingData>({
    serviceType: "",
    reason: "",
    engineStatus: "",
    movementStatus: "",
    origin: "",
    destination: "",
    notes: "",
  });

  const updateData = (key: keyof BookingData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 8));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  // Options
  const serviceOptions = [
    { id: "รถบรรทุก", icon: Truck, desc: "สำหรับขนย้ายสินค้าหรือสิ่งของขนาดใหญ่" },
    { id: "รถลากจูง", icon: Car, desc: "สำหรับยกรถเสียหรือเกิดอุบัติเหตุ" },
  ];

  const reasonOptions = [
    { id: "รถเสีย", icon: Wrench },
    { id: "อุบัติเหตุ", icon: AlertTriangle },
    { id: "เคลื่อนย้ายปกติ", icon: Move },
  ];

  return (
    <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-2xl shadow-[#001A3D]/10 border border-slate-100">
      
      {/* Progress Bar */}
      <div className="mb-10 flex items-center justify-between">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
              step >= s ? "bg-[#0047AB] text-white" : "bg-slate-100 text-slate-400"
            }`}>
              {s}
            </div>
            {s < 8 && (
              <div className={`h-1 w-8 sm:w-16 mx-1 rounded-full transition-colors ${
                step > s ? "bg-[#0047AB]" : "bg-slate-100"
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="min-h-[350px]">
        <AnimatePresence mode="wait">
          
          {/* Step 1: Service Type */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-black text-[#001A3D]">เลือกประเภทบริการที่คุณต้องการ</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {serviceOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { updateData("serviceType", opt.id); handleNext(); }}
                    className={`group flex flex-col items-center rounded-2xl border-2 p-8 text-center transition-all ${
                      data.serviceType === opt.id ? "border-[#0047AB] bg-[#0047AB]/5" : "border-slate-100 hover:border-[#0047AB]/50"
                    }`}
                  >
                    <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors ${
                      data.serviceType === opt.id ? "bg-[#0047AB] text-white" : "bg-slate-100 text-slate-500 group-hover:bg-[#0047AB]/20 group-hover:text-[#0047AB]"
                    }`}>
                      <opt.icon className="h-8 w-8" />
                    </div>
                    <span className="text-xl font-bold text-[#001A3D]">{opt.id}</span>
                    <span className="mt-2 text-xs font-medium text-slate-500">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Reason */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-black text-[#001A3D]">ระบุสาเหตุที่เรียกใช้บริการ</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {reasonOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { updateData("reason", opt.id); handleNext(); }}
                    className={`group flex flex-col items-center rounded-2xl border-2 p-6 text-center transition-all ${
                      data.reason === opt.id ? "border-[#0047AB] bg-[#0047AB]/5" : "border-slate-100 hover:border-[#0047AB]/50"
                    }`}
                  >
                    <opt.icon className={`mb-3 h-8 w-8 ${data.reason === opt.id ? "text-[#0047AB]" : "text-slate-400 group-hover:text-[#0047AB]"}`} />
                    <span className="font-bold text-[#001A3D]">{opt.id}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Engine Status */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-black text-[#001A3D]">สถานะเครื่องยนต์ของรถคุณ</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {["สตาร์ทติด", "สตาร์ทไม่ติด"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { updateData("engineStatus", opt); handleNext(); }}
                    className={`rounded-2xl border-2 p-6 text-xl font-bold transition-all ${
                      data.engineStatus === opt ? "border-[#0047AB] bg-[#0047AB]/5 text-[#0047AB]" : "border-slate-100 text-[#001A3D] hover:border-[#0047AB]/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Movement Status */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-black text-[#001A3D]">สถานะการเคลื่อนย้าย (เข็นได้หรือไม่?)</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {["เข็นเคลื่อนย้ายได้", "เข็นไม่ได้ / ล้อล็อค"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { updateData("movementStatus", opt); handleNext(); }}
                    className={`rounded-2xl border-2 p-6 text-xl font-bold transition-all ${
                      data.movementStatus === opt ? "border-[#0047AB] bg-[#0047AB]/5 text-[#0047AB]" : "border-slate-100 text-[#001A3D] hover:border-[#0047AB]/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 5: Origin */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-black text-[#001A3D]">ระบุจุดรับรถ (ต้นทาง)</h2>
              <div className="mt-8 relative">
                <MapPin className="absolute left-4 top-4 h-6 w-6 text-[#0047AB]" />
                <input 
                  type="text" 
                  value={data.origin}
                  onChange={(e) => updateData("origin", e.target.value)}
                  placeholder="เช่น ซอยสุขุมวิท 55, หน้าเซ็นทรัลเวิลด์..."
                  className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 pl-14 pr-6 py-4 text-lg font-bold outline-none focus:border-[#0047AB] focus:bg-white"
                />
              </div>
              <button 
                disabled={!data.origin}
                onClick={handleNext}
                className="mt-6 w-full rounded-xl bg-[#0047AB] py-4 text-center font-bold text-white disabled:opacity-50"
              >
                ยืนยันจุดรับรถ
              </button>
            </motion.div>
          )}

          {/* Step 6: Destination */}
          {step === 6 && (
            <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-black text-[#001A3D]">ระบุจุดส่งรถ (ปลายทาง)</h2>
              <div className="mt-8 relative">
                <Navigation className="absolute left-4 top-4 h-6 w-6 text-[#0047AB]" />
                <input 
                  type="text" 
                  value={data.destination}
                  onChange={(e) => updateData("destination", e.target.value)}
                  placeholder="เช่น อู่ซ่อมรถ B-Quik สาขาสาทร..."
                  className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 pl-14 pr-6 py-4 text-lg font-bold outline-none focus:border-[#0047AB] focus:bg-white"
                />
              </div>
              <button 
                disabled={!data.destination}
                onClick={handleNext}
                className="mt-6 w-full rounded-xl bg-[#0047AB] py-4 text-center font-bold text-white disabled:opacity-50"
              >
                ยืนยันจุดส่งรถ
              </button>
            </motion.div>
          )}

          {/* Step 7: Notes */}
          {step === 7 && (
            <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-black text-[#001A3D]">เงื่อนไขพิเศษ / หมายเหตุ (ถ้ามี)</h2>
              <div className="mt-8 relative">
                <FileText className="absolute left-4 top-4 h-6 w-6 text-slate-400" />
                <textarea 
                  value={data.notes}
                  onChange={(e) => updateData("notes", e.target.value)}
                  placeholder="เช่น ต้องการรถสไลด์เท่านั้น, รถโหลดเตี้ย..."
                  rows={4}
                  className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 pl-14 pr-6 py-4 text-base font-bold outline-none focus:border-[#0047AB] focus:bg-white resize-none"
                />
              </div>
              <button 
                onClick={handleNext}
                className="mt-6 w-full rounded-xl bg-[#0047AB] py-4 text-center font-bold text-white"
              >
                ดำเนินการต่อ
              </button>
            </motion.div>
          )}

          {/* Step 8: Confirm */}
          {step === 8 && (
            <motion.div key="step8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="mt-4 text-2xl font-black text-[#001A3D]">ตรวจสอบข้อมูลการจอง</h2>
              </div>
              
              <div className="mt-8 space-y-4 rounded-2xl bg-slate-50 p-6 border border-slate-100">
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
                  <span className="font-bold text-[#001A3D]">{data.origin}</span>
                </div>
                <div className="flex flex-col gap-1 pb-1">
                  <span className="text-slate-500 font-medium">ปลายทาง</span>
                  <span className="font-bold text-[#001A3D]">{data.destination}</span>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button className="w-full rounded-xl bg-[#001A3D] py-4 text-center font-black text-white shadow-xl shadow-[#001A3D]/20 transition-all hover:scale-[1.02] active:scale-95">
                  ยืนยันการเรียกใช้บริการ
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      {step > 1 && step < 8 && (
        <div className="mt-8 flex justify-between border-t border-slate-100 pt-6">
          <button onClick={handlePrev} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#001A3D]">
            <ChevronLeft className="h-4 w-4" /> ย้อนกลับ
          </button>
        </div>
      )}
    </div>
  );
}
