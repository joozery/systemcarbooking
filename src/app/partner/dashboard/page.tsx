"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Phone, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  LogOut, 
  User, 
  MessageSquare,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PartnerDashboard() {
  const router = useRouter();
  const [partner, setPartner] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const fetchJobs = useCallback(async (pId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/partner/${pId}`);
      const result = await res.json();
      if (result.success) {
        setJobs(result.data);
      }
    } catch (err) {
      console.error("Fetch jobs error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("partner_data");
    if (!savedData) {
      router.push("/partner/login");
      return;
    }
    const pData = JSON.parse(savedData);
    setPartner(pData);
    fetchJobs(pData.id);
  }, [router, fetchJobs]);

  const handleLogout = () => {
    localStorage.removeItem("partner_token");
    localStorage.removeItem("partner_data");
    router.push("/partner/login");
  };

  const updateStatus = async (jobId: string, newStatus: string) => {
    setIsUpdating(jobId);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${jobId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await res.json();
      if (result.success) {
        // Refresh jobs
        if (partner) fetchJobs(partner.id);
      }
    } catch (err) {
      console.error("Update status error:", err);
      alert("เกิดข้อผิดพลาดในการอัปเดตสถานะ");
    } finally {
      setIsUpdating(null);
    }
  };

  const activeJobs = jobs.filter(j => j.status !== 'completed' && j.status !== 'cancelled');
  const finishedJobs = jobs.filter(j => j.status === 'completed');

  if (isLoading || !partner) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-noto-thai">
      {/* Top Header */}
      <header className="bg-[#001A3D] text-white pt-12 pb-20 px-6 rounded-b-[40px] shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
              <User className="h-7 w-7 text-blue-300" />
            </div>
            <div>
              <div className="text-xs font-bold text-blue-300/60 uppercase tracking-widest">ยินดีต้อนรับพาร์ทเนอร์</div>
              <div className="text-xl font-black">{partner.firstName} ({partner.nickname})</div>
            </div>
          </div>
          <button onClick={handleLogout} className="h-12 w-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-10 pb-20">
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-[32px] shadow-lg shadow-blue-900/5 border border-slate-100">
            <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4"><Clock className="h-5 w-5" /></div>
            <div className="text-2xl font-black text-[#001A3D]">{activeJobs.length}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">งานที่กำลังทำ</div>
          </div>
          <div className="bg-white p-6 rounded-[32px] shadow-lg shadow-blue-900/5 border border-slate-100">
            <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4"><CheckCircle2 className="h-5 w-5" /></div>
            <div className="text-2xl font-black text-[#001A3D]">{finishedJobs.length}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">งานที่สำเร็จแล้ว</div>
          </div>
        </div>

        {/* Active Jobs List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-black text-[#001A3D]">รายการงานปัจจุบัน</h2>
            <button onClick={() => fetchJobs(partner.id)} className="text-blue-600"><RefreshCw className="h-4 w-4" /></button>
          </div>

          {activeJobs.length === 0 ? (
            <div className="bg-white/50 border-2 border-dashed border-slate-200 rounded-[32px] p-12 text-center">
              <Truck className="h-12 w-12 text-slate-200 mx-auto mb-4" />
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">ยังไม่มีงานใหม่ในขณะนี้</p>
            </div>
          ) : (
            activeJobs.map((job) => (
              <motion.div 
                layoutId={job._id}
                key={job._id} 
                className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-blue-900/5 border border-slate-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-[#001A3D] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                      Job #{job._id.slice(-6).toUpperCase()}
                    </span>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                      {job.status === 'assigned' ? 'รอยืนยันรับงาน' : 'กำลังดำเนินการ'}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-black text-[#001A3D]">{job.serviceType}</h3>
                    <p className="text-sm font-bold text-red-600 mt-1">{job.reason}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0"><MapPin className="h-4 w-4 text-red-500" /></div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">จุดรับรถ</div>
                        <div className="text-sm font-black text-[#001A3D] leading-tight">{job.origin}</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0"><Navigation className="h-4 w-4 text-blue-600" /></div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">จุดส่งรถ</div>
                        <div className="text-sm font-black text-[#001A3D] leading-tight">{job.destination}</div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Info Card */}
                  <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                       <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm"><User className="h-5 w-5 text-[#001A3D]" /></div>
                       <div>
                         <div className="text-xs font-black text-[#001A3D]">{job.customerName}</div>
                         <div className="text-[10px] font-bold text-slate-400">{job.customerPhone}</div>
                       </div>
                    </div>
                    <a href={`tel:${job.customerPhone}`} className="h-10 w-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 active:scale-90 transition-all">
                      <Phone className="h-5 w-5" />
                    </a>
                  </div>

                  {/* Status Actions */}
                  <div className="grid gap-3">
                    {job.status === 'assigned' && (
                      <button 
                        onClick={() => updateStatus(job._id, 'in_progress')}
                        disabled={isUpdating === job._id}
                        className="w-full bg-blue-600 py-4 rounded-2xl text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all disabled:opacity-50"
                      >
                        {isUpdating === job._id ? "..." : "ยืนยันรับงานและเริ่มเดินทาง"}
                      </button>
                    )}
                    {job.status === 'in_progress' && (
                      <button 
                        onClick={() => updateStatus(job._id, 'completed')}
                        disabled={isUpdating === job._id}
                        className="w-full bg-emerald-500 py-4 rounded-2xl text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20 active:scale-95 transition-all disabled:opacity-50"
                      >
                        {isUpdating === job._id ? "..." : "เสร็จสิ้นงาน (ส่งรถเรียบร้อย)"}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </main>
    </div>
  );
}
