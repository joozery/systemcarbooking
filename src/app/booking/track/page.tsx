"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Truck, 
  ChevronRight,
  AlertCircle,
  Navigation,
  FileText,
  RefreshCw
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";

export default function BookingTrackPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";
  
  const [bookingData, setBookingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchBooking = useCallback(async (silent = false) => {
    if (!bookingId) {
      setError("ไม่พบหมายเลขการจอง");
      setIsLoading(false);
      return;
    }

    if (!silent) setIsRefreshing(true);
    
    try {
      const res = await fetch(`${apiUrl}/bookings/${bookingId}`);
      const result = await res.json();
      
      if (result.success) {
        setBookingData(result.data);
        setError(null);
      } else {
        setError(result.message || "ไม่สามารถโหลดข้อมูลได้");
      }
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [bookingId, apiUrl]);

  useEffect(() => {
    fetchBooking();
    
    // Polling every 10 seconds to auto-update status
    const interval = setInterval(() => {
      fetchBooking(true);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [fetchBooking]);

  const steps = [
    { id: "pending", label: "รับคำขอแล้ว", desc: "ระบบได้รับข้อมูลของคุณแล้ว กำลังจัดหาพาร์ทเนอร์ที่ใกล้ที่สุด" },
    { id: "assigned", label: "ยืนยันพาร์ทเนอร์", desc: "พาร์ทเนอร์รับงานแล้ว กำลังเตรียมตัวเดินทางไปหาคุณ" },
    { id: "in_progress", label: "กำลังดำเนินการ", desc: "พาร์ทเนอร์อยู่ระหว่างการเข้าช่วยเหลือ" },
    { id: "completed", label: "เสร็จสิ้น", desc: "การปฏิบัติงานเสร็จสมบูรณ์ ขอบคุณที่ใช้บริการ" },
  ];

  const getStatusIndex = (status: string) => {
    if (status === 'cancelled') return -1;
    return steps.findIndex(s => s.id === status);
  };

  const currentStepIndex = bookingData ? getStatusIndex(bookingData.status) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-[#0047AB] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-[#001A3D]">กำลังโหลดข้อมูลการจองของคุณ...</p>
        </div>
      </div>
    );
  }

  if (error || !bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md w-full bg-white p-10 rounded-[32px] shadow-xl text-center">
          <div className="h-20 w-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-black text-[#001A3D] mb-4">ขออภัย...</h2>
          <p className="text-slate-500 font-medium mb-8">{error || "ไม่พบข้อมูลการจองที่ระบุ"}</p>
          <Link href="/" className="inline-block w-full bg-[#0047AB] py-4 rounded-2xl text-white font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-noto-thai">
      <Navbar />
      
      <main className="pt-24 pb-20 px-6">
        <div className="mx-auto max-w-2xl">
          
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#001A3D] transition-colors">
              <ChevronRight className="h-3 w-3 rotate-180" />
              Back to Home
            </Link>
            {isRefreshing && (
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#0047AB] animate-pulse">
                <RefreshCw className="h-3 w-3 animate-spin" />
                Updating...
              </div>
            )}
          </div>

          <div className="mb-10 text-center lg:text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0047AB] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
              Order ID: {bookingData._id.slice(-8).toUpperCase()}
            </span>
            <h1 className="mt-6 text-4xl font-black text-[#001A3D] tracking-tight">ติดตามสถานะบริการ</h1>
            <p className="mt-3 text-base font-medium text-slate-500">สถานะล่าสุดจะอัปเดตอัตโนมัติเมื่อแอดมินดำเนินการ</p>
          </div>

          <div className="grid gap-8">
            
            {/* Status Timeline Card */}
            <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-2xl shadow-[#001A3D]/5 border border-slate-100">
              <h3 className="text-lg font-black text-[#001A3D] mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#0047AB]" />
                  ความคืบหน้าปัจจุบัน
                </div>
                {bookingData.status === 'cancelled' && (
                  <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full font-black uppercase tracking-wider">ยกเลิกแล้ว</span>
                )}
              </h3>
              
              <div className="space-y-8 relative">
                {bookingData.status !== 'cancelled' && (
                  <div className="absolute left-[15px] top-2 bottom-2 w-[3px] bg-slate-100">
                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: `${(currentStepIndex / (steps.length - 1)) * 100}%` }} 
                      className="w-full bg-[#0047AB] transition-all duration-1000"
                    />
                  </div>
                )}
                
                {steps.map((s, i) => {
                  const isCompleted = currentStepIndex > i;
                  const isActive = currentStepIndex === i;
                  const isPending = currentStepIndex < i;
                  
                  return (
                    <div key={s.id} className={`relative flex gap-8 group ${bookingData.status === 'cancelled' ? 'opacity-30' : ''}`}>
                      <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                        !isPending ? "bg-[#0047AB] border-[#0047AB] text-white shadow-lg shadow-blue-200" : "bg-white border-slate-200 text-slate-300"
                      }`}>
                        {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <div className={`h-2 w-2 rounded-full ${isActive ? "bg-white animate-pulse" : "bg-current"}`} />}
                      </div>
                      <div>
                         <h4 className={`text-lg font-black leading-none transition-colors ${!isPending ? "text-[#001A3D]" : "text-slate-300"}`}>
                           {s.label}
                         </h4>
                         <p className={`mt-2 text-sm font-medium transition-colors ${!isPending ? "text-slate-500" : "text-slate-300"}`}>
                           {s.desc}
                         </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Partner Info Card (Shows only when assigned or further) */}
            <AnimatePresence>
              {bookingData.partnerId && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="bg-[#001A3D] rounded-[32px] p-8 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all duration-700"><Truck className="h-32 w-32 rotate-[-15deg]" /></div>
                  <div className="relative z-10">
                    <div className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6">Partner Assigned</div>
                    <div className="flex items-center gap-6">
                      <div className="h-20 w-20 rounded-3xl bg-white/10 flex items-center justify-center border border-white/5 shadow-inner overflow-hidden">
                        {bookingData.partnerId.documents?.carFrontUrl ? (
                          <img src={bookingData.partnerId.documents.carFrontUrl} alt="Partner Vehicle" className="h-full w-full object-cover" />
                        ) : (
                          <User className="h-10 w-10 text-blue-200" />
                        )}
                      </div>
                      <div>
                        <div className="text-2xl font-black">{bookingData.partnerId.firstName} {bookingData.partnerId.lastName}</div>
                        <div className="mt-1 flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-blue-200/60 font-bold text-sm">
                            <Truck className="h-4 w-4" />
                            <span>{bookingData.partnerId.vehicleModel} • {bookingData.partnerId.licensePlate} {bookingData.partnerId.plateProvince}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 flex gap-4">
                       <a href={`tel:${bookingData.partnerId.phone}`} className="flex-1 rounded-2xl bg-white py-4 text-sm font-black text-[#001A3D] flex items-center justify-center gap-3 hover:bg-blue-50 transition-all active:scale-95 shadow-xl shadow-black/20">
                         <Phone className="h-4 w-4" /> 
                         โทรหาพาร์ทเนอร์
                       </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Request Summary Card */}
            <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-xl shadow-[#001A3D]/5 border border-slate-100">
               <h3 className="text-lg font-black text-[#001A3D] mb-6 flex items-center gap-2">
                 <FileText className="h-5 w-5 text-[#0047AB]" />
                 รายละเอียดการจอง
               </h3>
               
               <div className="space-y-4">
                 <div className="flex justify-between items-center py-4 border-b border-slate-50">
                   <span className="text-sm font-bold text-slate-400">ประเภทบริการ</span>
                   <span className="text-sm font-black text-[#001A3D]">{bookingData.serviceType}</span>
                 </div>
                 <div className="grid gap-2 py-4 border-b border-slate-50">
                   <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                     <MapPin className="h-4 w-4 text-red-500" /> จุดรับรถ (ต้นทาง)
                   </div>
                   <div className="text-sm font-black text-[#001A3D] ml-6">{bookingData.origin}</div>
                 </div>
                 <div className="grid gap-2 py-4 border-b border-slate-50">
                   <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                     <Navigation className="h-4 w-4 text-[#0047AB]" /> จุดส่งรถ (ปลายทาง)
                   </div>
                   <div className="text-sm font-black text-[#001A3D] ml-6">{bookingData.destination}</div>
                 </div>
                 
                 <div className="mt-6 p-6 rounded-2xl bg-blue-50 border border-blue-100 flex justify-between items-center">
                    <div>
                      <div className="text-[10px] font-black text-[#0047AB] uppercase tracking-widest">ราคาเริ่มต้น</div>
                      <div className="text-2xl font-black text-[#0047AB] tracking-tighter">
                        {bookingData.serviceType === 'รถสไลด์' ? '2,500' : '1,500'} <span className="text-xs">THB</span>
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="text-[10px] font-bold text-slate-400 mb-1 italic">* ราคาอาจมีการเปลี่ยนแปลง</div>
                       <div className="text-[10px] font-bold text-slate-400 italic">ตามระยะทางจริง</div>
                    </div>
                 </div>
               </div>
            </div>

            {/* Help Support */}
            <div className="flex items-center gap-6 p-8 rounded-[32px] bg-red-50 border border-red-100">
               <div className="h-14 w-14 shrink-0 flex items-center justify-center rounded-2xl bg-white shadow-sm text-red-500">
                 <AlertCircle className="h-7 w-7" />
               </div>
               <div className="flex-1">
                  <div className="text-sm font-black text-[#001A3D]">ต้องการความช่วยเหลือเร่งด่วน?</div>
                  <div className="text-xs font-bold text-slate-500 mt-1">สามารถติดต่อ Call Center ได้ตลอด 24 ชั่วโมง</div>
                  <a href="tel:0811657699" className="mt-3 inline-block text-lg font-black text-red-600">081-1657699</a>
               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
