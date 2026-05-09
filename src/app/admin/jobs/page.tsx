"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, ArrowRight, Truck, Phone, CheckCircle2, Clock, AlertTriangle, Plus, X, MessageSquare, User as UserIcon, ExternalLink, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminJobsPage() {
  const [activeTab, setActiveTab] = useState("incoming");
  const [bookings, setBookings] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDispatching, setIsDispatching] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [bookingsRes, partnersRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/partners`)
      ]);
      
      const bookingsData = await bookingsRes.json();
      const partnersData = await partnersRes.json();

      if (bookingsData.success) {
        setBookings(bookingsData.data);
        if (bookingsData.data.length > 0 && !selectedJob) {
          setSelectedJob(bookingsData.data[0]);
        } else if (selectedJob) {
          const updated = bookingsData.data.find((b: any) => b._id === selectedJob._id);
          if (updated) setSelectedJob(updated);
        }
      }
      
      if (partnersData.success) {
        setPartners(partnersData.data.filter((p: any) => p.status === 'approved'));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDispatch = async (partnerId: string) => {
    if (!selectedJob) return;
    setIsDispatching(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${selectedJob._id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: 'assigned',
          partnerId: partnerId
        })
      });

      const result = await res.json();
      if (result.success) {
        setShowSuccessModal(true);
        fetchData();
      }
    } catch (error) {
      console.error("Dispatch error:", error);
      alert("เกิดข้อผิดพลาดในการจ่ายงาน");
    } finally {
      setIsDispatching(false);
    }
  };

  const incomingJobs = bookings.filter(b => b.status === 'pending');
  const activeJobs = bookings.filter(b => b.status === 'assigned' || b.status === 'in_progress');
  const historyJobs = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  const displayJobs = activeTab === "incoming" ? incomingJobs : activeTab === "active" ? activeJobs : historyJobs;

  return (
    <div className="space-y-6 flex flex-col h-full relative font-noto-thai">
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#001A3D]/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-sm bg-white rounded-[32px] p-10 shadow-2xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
              <div className="mb-6 mx-auto h-20 w-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-inner">
                <Check className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-black text-[#001A3D] mb-2">จ่ายงานสำเร็จ!</h3>
              <p className="text-slate-500 font-medium mb-8">พาร์ทเนอร์ได้รับแจ้งเตือนแล้ว และกำลังเริ่มดำเนินการเข้าช่วยเหลือ</p>
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-4 rounded-2xl bg-[#001A3D] text-white font-black uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/20 active:scale-95"
              >
                รับทราบ
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#001A3D]">จัดการงาน (Job Dispatching)</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">ตรวจสอบคำสั่งซื้อและจ่ายงานให้พาร์ทเนอร์</p>
        </div>
      </div>

      <div className="flex border-b border-slate-200">
        <button onClick={() => setActiveTab("incoming")} className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === "incoming" ? "border-[#0047AB] text-[#0047AB]" : "border-transparent text-slate-500"}`}>
          งานใหม่รอจ่าย ({incomingJobs.length})
        </button>
        <button onClick={() => setActiveTab("active")} className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === "active" ? "border-[#0047AB] text-[#0047AB]" : "border-transparent text-slate-500"}`}>
          กำลังดำเนินการ ({activeJobs.length})
        </button>
        <button onClick={() => setActiveTab("history")} className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === "history" ? "border-[#0047AB] text-[#0047AB]" : "border-transparent text-slate-500"}`}>
          ประวัติงาน ({historyJobs.length})
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
           <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0047AB] border-t-transparent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 flex-1 min-h-0">
          {/* Left Column: Job List */}
          <div className="col-span-1 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col h-[calc(100vh-280px)]">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="ค้นหาชื่อลูกค้า, ID..." className="w-full pl-10 pr-4 py-2 text-xs font-medium rounded-lg border border-slate-200 outline-none focus:border-[#0047AB]" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {displayJobs.map((job) => (
                <div 
                  key={job._id} 
                  onClick={() => setSelectedJob(job)}
                  className={`cursor-pointer rounded-xl border p-4 transition-all hover:shadow-md ${
                    selectedJob?._id === job._id ? "border-[#0047AB] bg-blue-50/50 shadow-sm" : "border-slate-100 bg-white"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="rounded bg-[#001A3D] px-2 py-1 text-[10px] font-bold text-white uppercase tracking-tighter">
                      {job._id.substring(job._id.length - 6)}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {new Date(job.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="font-black text-[#001A3D] text-[14px] leading-tight">{job.serviceType}</div>
                  <div className="mt-1 text-[12px] font-bold text-[#0047AB]">{job.customerName || "ไม่ทราบชื่อ"}</div>
                  <div className="mt-2 flex items-center gap-2 text-[10px] font-medium text-slate-400">
                    <Phone className="h-3 w-3" /> {job.customerPhone}
                  </div>
                </div>
              ))}
              {displayJobs.length === 0 && (
                <div className="text-center py-10 text-slate-400 text-xs font-bold uppercase tracking-widest">ไม่มีรายการงาน</div>
              )}
            </div>
          </div>

          {/* Right Column: Details & Dispatch */}
          <div className="col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col h-[calc(100vh-280px)] overflow-hidden">
            {selectedJob ? (
              <div className="flex-1 overflow-y-auto p-8">
                <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                  <div className="space-y-8">
                    {/* Customer Info Section */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#0047AB]"></div> ข้อมูลลูกค้า
                      </h4>
                      <div className="rounded-2xl border border-[#0047AB]/10 bg-blue-50/30 p-5">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#0047AB]">
                            <UserIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="text-lg font-black text-[#001A3D] leading-none">{selectedJob.customerName}</div>
                            <div className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Customer Profile</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <a href={`tel:${selectedJob.customerPhone}`} className="flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-100 py-2.5 text-xs font-black text-[#0047AB] hover:bg-[#0047AB] hover:text-white transition-all shadow-sm">
                            <Phone className="h-3.5 w-3.5" /> โทรหาลูกค้า
                          </a>
                          {selectedJob.customerLineId && (
                            <div className="flex items-center justify-center gap-2 rounded-xl bg-[#00B900] py-2.5 text-xs font-black text-white hover:opacity-90 transition-all shadow-sm">
                              <MessageSquare className="h-3.5 w-3.5" /> LINE ID: {selectedJob.customerLineId}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Request Details */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-300"></div> รายละเอียดคำขอ
                      </h4>
                      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 space-y-4">
                        <div>
                          <div className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">ประเภทบริการ / สาเหตุ</div>
                          <div className="font-black text-[#001A3D] text-lg">{selectedJob.serviceType}</div>
                          <div className="text-sm font-bold text-red-600">{selectedJob.reason}</div>
                        </div>
                        <div className="pt-4 border-t border-slate-200 grid gap-3">
                          <div>
                            <div className="text-[10px] font-bold uppercase text-slate-400">ต้นทาง (รับรถ)</div>
                            <div className="text-sm font-bold text-[#001A3D]">{selectedJob.origin}</div>
                          </div>
                          <div>
                            <div className="text-[10px] font-bold uppercase text-slate-400">ปลายทาง (ส่งรถ)</div>
                            <div className="text-sm font-bold text-[#001A3D]">{selectedJob.destination}</div>
                          </div>
                          {selectedJob.notes && (
                            <div>
                              <div className="text-[10px] font-bold uppercase text-slate-400">หมายเหตุจากลูกค้า</div>
                              <div className="text-sm font-medium text-slate-600 italic bg-white p-3 rounded-xl border border-slate-100 mt-2">"{selectedJob.notes}"</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* Partner Section */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div> พาร์ทเนอร์ที่ดูแล
                      </h4>
                      {selectedJob.partnerId ? (
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
                           <div className="flex items-center gap-4">
                             <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center border border-emerald-100 shadow-sm overflow-hidden">
                               {selectedJob.partnerId.profileImage ? (
                                 <img src={selectedJob.partnerId.profileImage} alt="Partner" className="h-full w-full object-cover" />
                               ) : (
                                 <Truck className="h-7 w-7 text-emerald-600" />
                               )}
                             </div>
                             <div>
                               <div className="text-base font-black text-[#001A3D]">{selectedJob.partnerId.firstName} {selectedJob.partnerId.lastName}</div>
                               <div className="text-xs font-bold text-slate-500">{selectedJob.partnerId.vehiclePlate || selectedJob.partnerId.licensePlate} • {selectedJob.partnerId.phone}</div>
                             </div>
                           </div>
                           <div className="mt-4 pt-4 border-t border-emerald-100 flex justify-between items-center">
                              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">สถานะพาร์ทเนอร์: รับงานแล้ว</span>
                              <a href={`tel:${selectedJob.partnerId.phone}`} className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all">
                                <Phone className="h-4 w-4" />
                              </a>
                           </div>
                        </div>
                      ) : (
                        <div className="rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center bg-slate-50/50">
                           <Truck className="h-10 w-10 text-slate-200 mx-auto mb-3" />
                           <p className="text-xs font-bold text-slate-400">ยังไม่มีพาร์ทเนอร์รับงาน</p>
                        </div>
                      )}
                    </div>

                    {/* Dispatching Section */}
                    {selectedJob.status === 'pending' && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></div> จ่ายงานด่วน
                        </h4>
                        <div className="space-y-3">
                          {partners.map((partner) => (
                            <div key={partner._id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 hover:border-[#0047AB] hover:shadow-md transition-all group">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#0047AB] transition-colors"><Truck className="h-5 w-5" /></div>
                                <div>
                                  <div className="text-sm font-black text-[#001A3D]">{partner.firstName} ({partner.nickname})</div>
                                  <div className="text-[10px] font-bold text-slate-500">{partner.baseDistrict}, {partner.baseProvince}</div>
                                </div>
                              </div>
                              <button 
                                onClick={() => handleDispatch(partner._id)}
                                disabled={isDispatching}
                                className="rounded-xl bg-[#0047AB] px-4 py-2 text-[11px] font-black text-white shadow-lg shadow-blue-500/20 hover:bg-[#003580] transition-all disabled:opacity-50"
                              >
                                {isDispatching ? "..." : "จ่ายงาน"}
                              </button>
                            </div>
                          ))}
                          {partners.length === 0 && (
                            <div className="text-center py-6 text-xs text-slate-400 font-bold italic">ไม่พบพาร์ทเนอร์ที่พร้อมรับงาน</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
                <Truck className="h-20 w-20 opacity-20 mb-4" />
                <p className="text-sm font-black uppercase tracking-[0.2em]">กรุณาเลือกรายการงาน</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
