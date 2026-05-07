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
  AlertCircle
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
    const timer3 = setTimeout(() => setStatus("on_site"), 15000);
    const timer4 = setTimeout(() => setStatus("payment_pending"), 22000);
    
    return () => { 
      clearTimeout(timer1); 
      clearTimeout(timer2); 
      clearTimeout(timer3);
      clearTimeout(timer4);
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
                zoom: 13,
                pitch: 45,
            });

            new mapboxgl.Marker({ color: "#0047AB" })
                .setLngLat(customerLoc)
                .setPopup(new mapboxgl.Popup().setHTML("<b class='font-noto-thai'>จุดรับรถของคุณ</b>"))
                .addTo(_sys_m.current);

            const el = document.createElement("div");
            el.className = "driver-marker";
            el.innerHTML = `<div class="bg-[#001A3D] p-2 rounded-lg shadow-xl border-2 border-white text-white"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3m15 0h2v-3.34a4 4 0 0 0-1.17-2.83L19 13h-4"/><circle cx="7" cy="17" r="3"/><circle cx="17" cy="17" r="3"/></svg></div>`;

            _sys_mk_driver.current = new mapboxgl.Marker(el)
                .setLngLat(driverLoc)
                .addTo(_sys_m.current);

            (window as any).map = _sys_m.current;
            (window as any).marker = _sys_mk_driver.current;
            (window as any).mapboxgl = mapboxgl;

            _sys_m.current.on('load', () => {
                _sys_m.current?.resize();
            });
        } catch (err) {
            console.error("Mapbox track page error:", err);
        }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (_sys_m.current) {
        _sys_m.current.remove();
        _sys_m.current = null;
      }
      delete (window as any).map;
      delete (window as any).marker;
      delete (window as any).mapboxgl;
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
    { id: "requested", label: "รับคำขอแล้ว", desc: "กำลังรอเจ้าหน้าที่ตรวจสอบงาน" },
    { id: "assigned", label: "ได้รับพาร์ทเนอร์แล้ว", desc: "คุณสมชาย ใจดี กำลังเตรียมตัวเดินทาง" },
    { id: "arriving", label: "กำลังเดินทาง", desc: "รถสไลด์กำลังมุ่งหน้าไปหาคุณ" },
    { id: "on_site", label: "ถึงจุดเกิดเหตุ", desc: "พาร์ทเนอร์กำลังดำเนินการช่วยเหลือคุณ" },
    { id: "payment_pending", label: "รอชำระเงิน", desc: "กรุณาชำระเงินเพื่อยืนยันการปิดงาน" },
    { id: "completed", label: "เสร็จสิ้น", desc: "ขอบคุณที่ใช้บริการ Crown Wealth" },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === status);

  return (
    <div className="min-h-screen bg-slate-50 font-noto-thai">
      <header className="sticky top-0 z-50 bg-[#001A3D] text-white p-4 flex items-center justify-between">
        <Link href="/" className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity">← กลับหน้าหลัก</Link>
        <span className="font-black tracking-widest text-xs uppercase">Tracking ID: CW-1042</span>
        <div className="w-12"></div>
      </header>

      <main className="max-w-6xl mx-auto p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg bg-white p-10 shadow-2xl shadow-[#001A3D]/5 border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse"></div>
                <div className="relative flex h-14 w-14 items-center justify-center rounded-lg bg-[#0047AB] text-white shadow-lg">
                  {status === "requested" ? <Clock className="animate-spin-slow h-7 w-7" /> : <Truck className="h-7 w-7" />}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#001A3D]">{steps[Math.max(0, currentStepIndex)].label}</h1>
                <p className="text-sm font-medium text-slate-500">{steps[Math.max(0, currentStepIndex)].desc}</p>
              </div>
            </div>

            <div className="relative h-[400px] w-full rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shadow-inner">
               <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
               <AnimatePresence>
                 {status === "requested" && (
                   <motion.div exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex items-center justify-center bg-slate-50/50 backdrop-blur-[2px]">
                      <div className="text-slate-500 text-sm font-bold flex flex-col items-center gap-2">
                        <Navigation className="h-8 w-8 text-blue-500 animate-pulse" />
                        กำลังระบุตำแหน่งรถช่วยเหลือ...
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </motion.div>

          <div className="rounded-lg bg-white p-10 shadow-2xl shadow-[#001A3D]/5 border border-slate-100">
            <h3 className="text-xl font-black text-[#001A3D] mb-10">สถานะการดำเนินการ</h3>
            <div className="space-y-10 relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
              {steps.slice(0, 6).map((s, i) => (
                <div key={s.id} className="relative flex items-start gap-8 pl-0">
                  <div className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white shadow-md transition-all duration-500 ${
                    currentStepIndex >= i ? "bg-[#0047AB] text-white scale-110" : "bg-slate-200 text-slate-400"
                  }`}>
                    {currentStepIndex > i ? <CheckCircle2 className="h-5 w-5" /> : <div className="h-2.5 w-2.5 rounded-full bg-current" />}
                  </div>
                  <div className={`${currentStepIndex >= i ? "opacity-100" : "opacity-40"}`}>
                    <div className="text-lg font-black text-[#001A3D]">{s.label}</div>
                    <div className="text-sm text-slate-500 mt-1">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <AnimatePresence>
            {currentStepIndex >= 1 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="rounded-lg bg-[#001A3D] p-10 text-white shadow-2xl shadow-[#001A3D]/20">
                <h3 className="text-xs font-bold uppercase tracking-widest text-blue-300/60 mb-4">พาร์ทเนอร์ที่ดูแลคุณ</h3>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center"><User className="h-8 w-8" /></div>
                  <div>
                    <div className="font-bold text-lg leading-none">สมชาย ใจดี</div>
                    <div className="text-xs font-medium text-blue-200 mt-1">รถสไลด์ • ทะเบียน 1ขธ 4422</div>
                    <div className="mt-3 flex items-center gap-2">
                      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg active:scale-95 transition-transform"><Phone className="h-4 w-4 fill-current" /></button>
                      <button className="rounded-full bg-white/10 px-4 py-2 text-[10px] font-bold border border-white/5 hover:bg-white/20 transition-all">ส่งข้อความ</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="rounded-lg bg-white p-10 shadow-2xl shadow-[#001A3D]/5 border border-slate-100 overflow-hidden relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600 shadow-sm"><CreditCard className="h-6 w-6" /></div>
              <h3 className="text-xl font-black text-[#001A3D]">สรุปค่าใช้จ่าย</h3>
            </div>
            {status !== "payment_pending" && status !== "completed" ? (
              <div className="text-center py-10">
                <div className="flex justify-center mb-6"><AlertCircle className="h-12 w-12 text-slate-200" /></div>
                <p className="text-sm font-bold text-slate-400 leading-relaxed">รอเจ้าหน้าที่ประเมินค่าบริการ<br/>หลังจากรถถึงที่หมาย</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex justify-between items-center py-4 border-b border-dashed border-slate-100"><span className="text-slate-500 font-medium">ค่าบริการเริ่มต้น</span><span className="font-bold text-lg">1,500.-</span></div>
                <div className="flex justify-between items-center py-4 border-b border-dashed border-slate-100"><span className="text-slate-500 font-medium">ส่วนต่างระยะทาง (12 กม.)</span><span className="font-bold text-lg">600.-</span></div>
                <div className="flex justify-between items-center pt-4"><span className="text-lg font-black text-[#001A3D]">ยอดชำระรวม</span><span className="text-3xl font-black text-[#0047AB]">2,100.-</span></div>
                <button onClick={() => setShowPayment(true)} className="w-full mt-6 rounded-lg bg-[#0047AB] py-5 font-black text-white shadow-2xl shadow-blue-500/30 hover:bg-[#003580] hover:scale-[1.02] active:scale-95 transition-all">ชำระเงินทันที</button>
              </div>
            )}
          </div>

          <div className="rounded-lg bg-slate-50 p-10 border border-slate-100">
            <div className="text-xs font-black text-[#001A3D] uppercase tracking-wider mb-4">มีปัญหาในการรับบริการ?</div>
            <p className="text-sm text-slate-500 leading-relaxed mb-8">หากพาร์ทเนอร์ล่าช้าเกิน 30 นาที หรือเกิดความผิดพลาดใดๆ กรุณาติดต่อ Call Center ตลอด 24 ชม.</p>
            <button className="flex w-full items-center justify-between rounded-lg bg-white px-6 py-4 text-sm font-bold text-[#001A3D] shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">ติดต่อเจ้าหน้าที่ 1122 <ChevronRight className="h-5 w-5 text-blue-500" /></button>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showPayment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPayment(false)} className="absolute inset-0 bg-[#001A3D]/60 backdrop-blur-sm" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              {/* Modal Header */}
              <div className="bg-[#001A3D] px-8 py-6 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black">ชำระค่าบริการ</h2>
                  <button onClick={() => setShowPayment(false)} className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors">
                    <AlertCircle className="h-5 w-5 rotate-45" />
                  </button>
                </div>
              </div>

              <div className="p-8">
                {/* Payment Summary Card */}
                <div className="mb-8 rounded-xl bg-slate-50 p-6 border border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ยอดรวมที่ต้องชำระ</span>
                    <span className="text-xs font-bold text-[#0047AB] bg-blue-50 px-2 py-1 rounded">CW-1042</span>
                  </div>
                  <div className="text-4xl font-black text-[#001A3D]">2,100 <span className="text-lg">บาท</span></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* QR Section */}
                  <div className="flex flex-col items-center">
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                      <div className="relative aspect-square w-full max-w-[180px] rounded-xl bg-white p-2 border border-slate-100 shadow-xl overflow-hidden flex items-center justify-center">
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PROMPTPAY_MOCK_PAYMENT_2100_BAHT" 
                          alt="PromptPay QR Code"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                       <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-tight">
                         Thai QR Payment Ready
                       </p>
                    </div>
                    <p className="mt-2 text-[9px] font-medium text-slate-400 text-center leading-relaxed">
                      สแกนผ่านแอปธนาคารของคุณ <br/>เพื่อชำระเงิน 2,100.-
                    </p>
                  </div>

                  {/* Upload Section */}
                  <div className="space-y-4">
                    <div className="text-xs font-bold text-[#001A3D] mb-2">ยืนยันการโอนเงิน</div>
                    <button className="group flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-8 transition-all hover:border-[#0047AB] hover:bg-blue-50/50">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm group-hover:text-[#0047AB] transition-colors">
                        <ImageIcon className="h-6 w-6" />
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-black text-[#001A3D]">แนบสลิปที่นี่</div>
                        <div className="text-[10px] font-medium text-slate-400 mt-1">ไฟล์ JPG, PNG ไม่เกิน 5MB</div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <button 
                    onClick={() => { setStatus("completed"); setShowPayment(false); }}
                    className="flex-1 rounded-xl bg-[#001A3D] py-4 font-black text-white shadow-xl shadow-[#001A3D]/20 transition-all hover:bg-[#002a61] active:scale-95"
                  >
                    ยืนยันการชำระเงิน
                  </button>
                </div>

                <p className="mt-6 text-center text-[10px] font-medium text-slate-400 italic">
                  * หากพบปัญหาในการชำระเงิน กรุณาติดต่อฝ่ายบริการลูกค้า 1122
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === "completed" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[250] flex items-center justify-center bg-[#001A3D] p-6 text-white">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: "spring" }} className="flex flex-col items-center text-center max-w-sm">
              <div className="mb-8 relative"><div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-40 animate-pulse"></div><div className="relative h-24 w-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-2xl"><CheckCircle2 className="h-12 w-12 text-white" /></div></div>
              <h2 className="text-4xl font-black mb-4">ชำระเงินสำเร็จ!</h2>
              <p className="text-blue-200 font-medium mb-10 leading-relaxed">ขอบคุณที่ไว้วางใจใช้บริการ Crown Wealth <br/>พาร์ทเนอร์ของเราได้ปฏิบัติงานเสร็จสิ้นแล้ว <br/>หวังว่าจะได้ดูแลคุณใหม่ในโอกาสหน้าครับ</p>
              <div className="w-full space-y-4">
                <Link href="/" className="block w-full rounded-lg bg-white py-4 font-black text-[#001A3D] shadow-xl transition-all hover:scale-[1.02] active:scale-95 text-center">กลับหน้าหลัก</Link>
                <button className="text-sm font-bold text-blue-300/60 hover:text-white transition-colors">ดาวน์โหลดใบเสร็จ (PDF)</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .animate-spin-slow { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
