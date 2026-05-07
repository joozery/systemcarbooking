"use client";

import { useState } from "react";
import { Navigation, Phone, CheckCircle2, AlertCircle, Camera, Truck, ChevronRight, MapPin, Navigation2, MoreHorizontal } from "lucide-react";

export default function VendorDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [jobStatus, setJobStatus] = useState<"assigned" | "arrived" | "completed">("assigned");

  return (
    <div className="flex h-screen flex-col bg-slate-100 font-sans text-slate-900 mx-auto max-w-md shadow-2xl relative overflow-hidden">
      
      {/* Absolute Map Background (Placeholder) */}
      <div className="absolute inset-0 z-0 bg-[#E8EAED]">
        {/* Simulate map roads using CSS pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        {/* Blue Navigation Route Line Placeholder */}
        <svg className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 z-10" viewBox="0 0 100 100" fill="none">
          <path d="M10,90 Q30,50 90,10" stroke="#0047AB" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 drop-shadow-md" strokeDasharray="5,5" />
          <circle cx="10" cy="90" r="4" fill="#0047AB" />
          <circle cx="90" cy="10" r="4" fill="#10B981" />
        </svg>
      </div>

      {/* App Bar (Floating) */}
      <header className="absolute top-0 left-0 w-full z-20 p-4">
        <div className="flex items-center justify-between rounded-full bg-[#001A3D]/90 backdrop-blur-md px-5 py-3 text-white shadow-lg border border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-inner">
              <Truck className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-[11px] font-black tracking-wider text-blue-100">CROWN DRIVER</div>
              <div className="text-[9px] font-bold text-emerald-400">1ขธ 4422 • ว่างรับงาน</div>
            </div>
          </div>
          
          {/* iOS Style Toggle */}
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`relative flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
              isOnline ? "bg-emerald-500" : "bg-slate-500"
            }`}
          >
            <div className={`absolute h-5 w-5 rounded-full bg-white transition-transform duration-300 shadow-sm ${
              isOnline ? "translate-x-6" : "translate-x-1"
            }`} />
          </button>
        </div>
      </header>

      {/* Main Content Area (Overlaying Map) */}
      <main className="relative z-10 flex-1 flex flex-col justify-end pb-28">
        
        {!isOnline ? (
          <div className="m-4 flex flex-col items-center justify-center rounded-3xl bg-white/90 backdrop-blur-md p-8 text-center shadow-xl border border-white/50">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400 border-4 border-white shadow-inner">
              <Truck className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-black text-[#001A3D]">คุณกำลังออฟไลน์</h2>
            <p className="mt-2 text-sm font-medium text-slate-500">
              เลื่อนสวิตช์ด้านบนเพื่อเข้าสู่ระบบ<br/>และรอรับงานใหม่จากส่วนกลาง
            </p>
          </div>
        ) : jobStatus === "completed" ? (
           <div className="m-4 flex flex-col items-center justify-center rounded-3xl bg-white/90 backdrop-blur-md p-8 text-center shadow-xl border border-white/50">
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-30 rounded-full animate-pulse"></div>
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-400 to-emerald-600 text-white shadow-lg">
                <CheckCircle2 className="h-12 w-12" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-[#001A3D]">ยอดเยี่ยม! ปิดงานสำเร็จ</h2>
            <p className="mt-2 text-sm font-medium text-slate-500 mb-8">
              ระบบบันทึกรายได้และประวัติการทำงานของคุณเรียบร้อยแล้ว
            </p>
            <button 
              onClick={() => setJobStatus("assigned")} // Reset for demo
              className="w-full rounded-2xl bg-[#001A3D] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-[#001A3D]/20 hover:bg-[#002A5D] transition-colors"
            >
              กลับสู่หน้าแผนที่
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            
            {/* Job Alert Banner */}
            {jobStatus === "assigned" && (
              <div className="flex items-center justify-between rounded-2xl bg-blue-600 px-5 py-3 text-white shadow-lg animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <span className="flex h-3 w-3 rounded-full bg-white animate-ping"></span>
                  <span className="font-bold text-sm">งานใหม่เข้า! ระยะทาง 4.2 กม.</span>
                </div>
                <MoreHorizontal className="h-5 w-5 text-blue-200" />
              </div>
            )}

            {/* Job Details Card (Floating) */}
            <div className="rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
              
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="rounded-lg bg-[#001A3D] px-2 py-1 text-[10px] font-black text-white tracking-wider">CW-1042</span>
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg border border-red-100">รถสตาร์ทไม่ติด</span>
                  </div>
                  <div className="font-black text-[#001A3D] text-xl mt-2">คุณแพรวา</div>
                </div>
                
                {/* Call Button */}
                <button className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm active:scale-95 transition-transform">
                  <Phone className="h-5 w-5 fill-current" />
                </button>
              </div>

              {/* Route Timeline */}
              <div className="relative border-l-[3px] border-dashed border-slate-200 ml-3 pl-6 space-y-5">
                {/* Origin */}
                <div className="relative">
                  <div className="absolute -left-[35px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-white border-[3px] border-[#0047AB]">
                     <div className="h-2 w-2 rounded-full bg-[#0047AB]"></div>
                  </div>
                  <div className="text-[9px] font-black text-[#0047AB] uppercase tracking-widest mb-0.5">จุดรับรถ</div>
                  <div className="font-bold text-slate-800 text-sm leading-snug pr-8">ซอยสุขุมวิท 55 (ทองหล่อ)</div>
                  {jobStatus === "assigned" && (
                    <button className="mt-2 flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-[#0047AB]">
                      <Navigation2 className="h-3 w-3" /> เปิด Google Maps
                    </button>
                  )}
                </div>

                {/* Destination */}
                <div className="relative">
                  <div className="absolute -left-[35px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-white border-[3px] border-emerald-500">
                     <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  </div>
                  <div className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-0.5">จุดส่งรถ</div>
                  <div className="font-bold text-slate-800 text-sm leading-snug pr-8">อู่ B-Quik สาทร</div>
                </div>
              </div>

            </div>

            {/* Photo Upload Section for Completion */}
            {jobStatus === "arrived" && (
              <div className="rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <Camera className="h-5 w-5 text-[#0047AB]" />
                  <h3 className="font-black text-[#001A3D]">ถ่ายรูปยืนยันการปฏิบัติงาน</h3>
                </div>
                <button className="w-full flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 py-10 active:bg-slate-100 transition-colors">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm text-slate-400 border border-slate-100">
                    <Camera className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">แตะเพื่อเปิดกล้องถ่ายรูป</span>
                </button>
              </div>
            )}

          </div>
        )}
      </main>

      {/* Sticky Bottom Action (Dynamic based on state) */}
      {isOnline && jobStatus !== "completed" && (
        <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-100 p-5 z-30 pb-safe-8">
          {jobStatus === "assigned" ? (
            <button 
              onClick={() => setJobStatus("arrived")}
              className="group relative flex w-full items-center justify-center overflow-hidden rounded-full bg-[#001A3D] p-1 text-white shadow-2xl shadow-[#001A3D]/30 active:scale-[0.98] transition-all"
            >
              <div className="absolute left-1 top-1 flex h-[calc(100%-8px)] w-[calc(100%-8px)] items-center justify-end rounded-full px-2">
                <div className="text-sm font-black tracking-widest text-white/80 mr-12">เลื่อนเมื่อถึงจุดรับรถ</div>
              </div>
              <div className="relative z-10 flex h-14 w-full max-w-[4.5rem] items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-[#0047AB] shadow-md mr-auto">
                <ChevronRight className="h-6 w-6 text-white" />
              </div>
            </button>
          ) : (
            <button 
              onClick={() => setJobStatus("completed")}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 py-4 text-white shadow-xl shadow-emerald-500/30 active:scale-95 transition-all"
            >
              <CheckCircle2 className="h-6 w-6" />
              <span className="font-black text-lg">ยืนยันปิดงาน</span>
            </button>
          )}
        </div>
      )}

      {/* Extra style for safe area on mobile */}
      <style dangerouslySetInnerHTML={{__html: `
        .pb-safe-8 { padding-bottom: calc(1.25rem + env(safe-area-inset-bottom)); }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .animate-bounce-slow { animation: bounce-slow 2s infinite; }
      `}} />
    </div>
  );
}
