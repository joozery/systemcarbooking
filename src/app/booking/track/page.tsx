"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  Truck, 
  Navigation,
  Image as ImageIcon,
  ChevronRight,
  AlertCircle,
  X
} from "lucide-react";
import Link from "next/link";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

export default function BookingTrackPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const _sys_m = useRef<mapboxgl.Map | null>(null);
  const _sys_mk_driver = useRef<mapboxgl.Marker | null>(null);
  
  const [status, setStatus] = useState<"requested" | "assigned" | "arriving" | "on_site" | "payment_pending" | "completed">("requested");
  const [showPayment, setShowPayment] = useState(false);
  const customerLoc: [number, number] = [100.5231, 13.7367]; 
  const [driverLoc, setDriverLoc] = useState<[number, number]>([100.5631, 13.7467]);

  useEffect(() => {
    const timer1 = setTimeout(() => setStatus("assigned"), 3000);
    const timer2 = setTimeout(() => setStatus("arriving"), 8000);
    
    return () => { 
      clearTimeout(timer1); 
      clearTimeout(timer2); 
    };
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;
    const timer = setTimeout(() => {
        if (!mapContainer.current) return;
        try {
            _sys_m.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/light-v11",
                center: customerLoc,
                zoom: 14,
                pitch: 45,
            });

            new mapboxgl.Marker({ color: "#0047AB" })
                .setLngLat(customerLoc)
                .addTo(_sys_m.current);

            const el = document.createElement("div");
            el.className = "driver-marker";
            el.innerHTML = `<div class="bg-[#001A3D] p-1.5 rounded-full shadow-2xl border-2 border-white text-white animate-bounce-slow"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3m15 0h2v-3.34a4 4 0 0 0-1.17-2.83L19 13h-4"/><circle cx="7" cy="17" r="3"/><circle cx="17" cy="17" r="3"/></svg></div>`;

            _sys_mk_driver.current = new mapboxgl.Marker(el)
                .setLngLat(driverLoc)
                .addTo(_sys_m.current);

            _sys_m.current.on('load', () => {
                _sys_m.current?.resize();
            });
        } catch (err) {
            console.error("Mapbox track error:", err);
        }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (_sys_m.current) _sys_m.current.remove();
    };
  }, []);

  useEffect(() => {
    if (status === "arriving" && _sys_mk_driver.current && _sys_m.current) {
      const interval = setInterval(() => {
        setDriverLoc(prev => {
          const newLng = prev[0] - (prev[0] - customerLoc[0]) * 0.05;
          const newLat = prev[1] - (prev[1] - customerLoc[1]) * 0.05;
          const nextLoc: [number, number] = [newLng, newLat];
          _sys_mk_driver.current?.setLngLat(nextLoc);
          return nextLoc;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status]);

  const steps = [
    { id: "requested", label: "รับคำขอแล้ว", time: "10:45" },
    { id: "assigned", label: "ได้รับพาร์ทเนอร์", time: "10:48" },
    { id: "arriving", label: "กำลังเดินทาง", time: "10:52" },
    { id: "on_site", label: "ถึงจุดเกิดเหตุ", time: "--:--" },
    { id: "completed", label: "เสร็จสิ้น", time: "--:--" },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === status);

  return (
    <div className="min-h-screen bg-slate-50 font-noto-thai overflow-hidden flex flex-col lg:flex-row">
      
      {/* Left Panel: Status & Details */}
      <div className="w-full lg:w-[450px] bg-white shadow-2xl z-20 flex flex-col h-screen overflow-y-auto border-r border-slate-100">
        <div className="p-6 md:p-8 flex-1">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#001A3D] transition-colors mb-10">
             <div className="h-6 w-6 flex items-center justify-center rounded-lg bg-slate-100"><ChevronRight className="h-3 w-3 rotate-180" /></div>
             Back to Home
          </Link>

          <div className="mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0047AB] bg-blue-50 px-3 py-1 rounded-full">Order ID: CW-1042</span>
            <h1 className="mt-4 text-3xl font-black text-[#001A3D]">กำลังติดตามบริการ</h1>
            <p className="mt-2 text-sm font-medium text-slate-500">พาร์ทเนอร์กำลังเดินทางไปหาคุณในขณะนี้</p>
          </div>

          {/* Stepper Vertical */}
          <div className="space-y-6 relative mb-12">
            <div className="absolute left-[13px] top-2 bottom-2 w-[2px] bg-slate-100">
               <motion.div 
                 initial={{ height: 0 }} 
                 animate={{ height: `${(currentStepIndex / (steps.length - 1)) * 100}%` }} 
                 className="w-full bg-[#0047AB] transition-all duration-1000"
               />
            </div>
            {steps.map((s, i) => (
              <div key={s.id} className="relative flex items-center gap-6 group">
                <div className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                  currentStepIndex >= i ? "bg-[#0047AB] border-[#0047AB] text-white shadow-lg shadow-blue-200" : "bg-white border-slate-200 text-slate-300"
                }`}>
                  {currentStepIndex > i ? <CheckCircle2 className="h-4 w-4" /> : <div className={`h-1.5 w-1.5 rounded-full ${currentStepIndex === i ? "bg-white animate-pulse" : "bg-current"}`} />}
                </div>
                <div className="flex-1 flex justify-between items-center">
                   <span className={`text-sm font-black transition-colors ${currentStepIndex >= i ? "text-[#001A3D]" : "text-slate-300"}`}>{s.label}</span>
                   <span className="text-[10px] font-bold text-slate-400">{s.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Partner Card */}
          <AnimatePresence>
            {currentStepIndex >= 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 rounded-2xl bg-[#001A3D] p-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Truck className="h-16 w-16" /></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/5 shadow-inner"><User className="h-6 w-6 text-blue-200" /></div>
                  <div className="flex-1">
                    <div className="text-[10px] font-black uppercase tracking-wider text-blue-300/60">Professional Partner</div>
                    <div className="font-bold text-base mt-0.5">สมชาย ใจดี</div>
                    <div className="text-[10px] font-medium text-blue-200/80">รถสไลด์ • ทะเบียน 1ขธ 4422</div>
                  </div>
                </div>
                <div className="mt-6 flex gap-2 relative z-10">
                   <button className="flex-1 rounded-xl bg-white py-3 text-xs font-black text-[#001A3D] flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"><Phone className="h-3.5 w-3.5" /> โทรหาช่าง</button>
                   <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/10 border border-white/5 hover:bg-white/20 transition-all"><ImageIcon className="h-4 w-4" /></button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pricing Info */}
          <div className="rounded-2xl border-2 border-slate-100 p-6 bg-slate-50/50">
             <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-[#001A3D] uppercase tracking-wider">สรุปค่าบริการ</span>
                <button className="text-[10px] font-bold text-[#0047AB] hover:underline">ดูรายละเอียด</button>
             </div>
             {status !== "payment_pending" ? (
               <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100 text-[#0047AB]">
                  <Clock className="h-4 w-4 animate-pulse" />
                  <span className="text-[11px] font-bold">รอประเมินค่าบริการเมื่อถึงที่หมาย</span>
               </div>
             ) : (
               <div className="space-y-2">
                 <div className="flex justify-between text-xs font-medium text-slate-500"><span>ค่าบริการคงที่</span><span>1,500.-</span></div>
                 <div className="flex justify-between text-sm font-black text-[#001A3D] pt-2 border-t border-slate-200"><span>รวมสุทธิ</span><span>2,100.-</span></div>
                 <button onClick={() => setShowPayment(true)} className="w-full mt-4 rounded-xl bg-[#0047AB] py-4 text-xs font-black text-white shadow-lg shadow-blue-200">ชำระเงินทันที</button>
               </div>
             )}
          </div>
        </div>

        {/* Panel Footer */}
        <div className="p-8 border-t border-slate-100 bg-slate-50/30">
           <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white shadow-sm text-red-500"><AlertCircle className="h-5 w-5" /></div>
              <div className="flex-1">
                 <div className="text-[11px] font-black text-[#001A3D]">ต้องการความช่วยเหลือด่วน?</div>
                 <div className="text-[10px] font-medium text-slate-400">Call Center: 1122 (24 ชม.)</div>
              </div>
           </div>
        </div>
      </div>

      {/* Right Panel: Full Screen Map */}
      <div className="flex-1 relative z-10 h-[50vh] lg:h-screen">
         <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
         
         {/* Map Overlays */}
         <div className="absolute top-8 right-8 z-30 flex flex-col gap-2">
            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white shadow-xl text-[#001A3D] hover:bg-slate-50 transition-all"><Navigation className="h-5 w-5" /></button>
            <div className="h-24 w-1 bg-white/20 rounded-full mx-auto" />
         </div>

         <AnimatePresence>
           {status === "requested" && (
             <motion.div exit={{ opacity: 0 }} className="absolute inset-0 z-40 bg-[#001A3D]/10 backdrop-blur-[2px] flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
                   <div className="h-10 w-10 rounded-xl bg-[#0047AB] flex items-center justify-center"><Clock className="h-5 w-5 text-white animate-spin-slow" /></div>
                   <div>
                      <div className="text-xs font-black text-[#001A3D]">กำลังจับคู่พาร์ทเนอร์...</div>
                      <div className="text-[10px] font-medium text-slate-500">คาดว่าพาร์ทเนอร์จะรับงานภายใน 2 นาที</div>
                   </div>
                </div>
             </motion.div>
           )}
         </AnimatePresence>
      </div>

      <AnimatePresence>
        {showPayment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPayment(false)} className="absolute inset-0 bg-[#001A3D]/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-white shadow-2xl">
              <div className="bg-[#001A3D] px-8 py-8 text-white relative">
                <div className="absolute top-0 right-0 p-4 opacity-10"><CreditCard className="h-24 w-24" /></div>
                <div className="flex items-center justify-between relative z-10">
                  <h2 className="text-2xl font-black">ชำระค่าบริการ</h2>
                  <button onClick={() => setShowPayment(false)} className="rounded-xl bg-white/10 p-2 hover:bg-white/20 transition-colors"><X className="h-5 w-5" /></button>
                </div>
                <div className="mt-8 relative z-10">
                   <div className="text-[11px] font-black uppercase tracking-widest text-blue-300/60 mb-2">ยอดชำระรวมสุทธิ</div>
                   <div className="text-5xl font-black tracking-tighter">2,100 <span className="text-xl opacity-60">THB</span></div>
                </div>
              </div>
              <div className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div className="flex flex-col items-center">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 shadow-inner">
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=PROMPTPAY" alt="QR" className="w-40 h-40" />
                    </div>
                    <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Thai QR Payment</p>
                  </div>
                  <div className="space-y-6">
                    <div className="text-xs font-black text-[#001A3D]">ยืนยันการโอนเงิน</div>
                    <button className="group flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/30 py-8 transition-all hover:border-[#0047AB] hover:bg-blue-50/30">
                      <ImageIcon className="h-6 w-6 text-slate-300 group-hover:text-[#0047AB]" />
                      <div className="text-[10px] font-black text-slate-400">แนบสลิปที่นี่</div>
                    </button>
                    <button onClick={() => { setStatus("completed"); setShowPayment(false); }} className="w-full rounded-xl bg-[#001A3D] py-4 text-sm font-black text-white shadow-xl shadow-blue-900/20 active:scale-95 transition-all">ยืนยันชำระเงิน</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === "completed" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[250] flex items-center justify-center bg-[#001A3D] p-6 text-white text-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md">
              <div className="h-24 w-24 rounded-full bg-emerald-500 mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-emerald-500/40"><CheckCircle2 className="h-12 w-12 text-white" /></div>
              <h2 className="text-4xl font-black mb-4 tracking-tight">ชำระเงินสำเร็จ</h2>
              <p className="text-blue-200/80 font-medium mb-10 leading-relaxed">ขอบคุณที่เลือกใช้บริการ Crown Wealth <br/>พาร์ทเนอร์ของเราได้ปฏิบัติงานเสร็จสิ้นแล้ว</p>
              <div className="space-y-4">
                <Link href="/" className="block w-full rounded-2xl bg-white py-4 font-black text-[#001A3D] shadow-xl hover:scale-[1.02] active:scale-95 transition-all">กลับหน้าหลัก</Link>
                <button className="text-[11px] font-black uppercase tracking-widest text-blue-300/40 hover:text-white transition-colors">Download Receipt (PDF)</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .animate-spin-slow { animation: spin 4s linear infinite; }
        .animate-bounce-slow { animation: bounce 3s infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
      `}} />
    </div>
  );
}
