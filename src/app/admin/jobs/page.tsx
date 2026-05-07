"use client";

import { useState } from "react";
import { Search, Filter, MapPin, ArrowRight, Truck, Phone, CheckCircle2, Clock, AlertTriangle, Plus, X, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminJobsPage() {
  const [activeTab, setActiveTab] = useState("incoming");
  const [showNewJobModal, setShowNewJobModal] = useState(false);

  const incomingJobs = [
    { id: "CW-1042", type: "รถลากจูง", customer: "คุณแพรวา", phone: "081-xxx-xxxx", reason: "รถเสีย (สตาร์ทไม่ติด)", origin: "ซอยสุขุมวิท 55 (ทองหล่อ)", destination: "อู่ B-Quik สาทร", notes: "ต้องการรถสไลด์เท่านั้น รถโหลดเตี้ย", time: "10 นาทีที่แล้ว" },
  ];

  return (
    <div className="space-y-6 flex flex-col h-full relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#001A3D]">จัดการงาน (Job Dispatching)</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">ตรวจสอบคำสั่งซื้อและจ่ายงานให้พาร์ทเนอร์</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowNewJobModal(true)}
            className="flex items-center gap-2 rounded-xl bg-[#001A3D] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#001A3D]/20 hover:bg-[#002A5D] transition-all active:scale-95"
          >
            <Plus className="h-4 w-4" /> สร้างงานใหม่ (Manual)
          </button>
        </div>
      </div>

      <div className="flex border-b border-slate-200">
        <button onClick={() => setActiveTab("incoming")} className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === "incoming" ? "border-[#0047AB] text-[#0047AB]" : "border-transparent text-slate-500"}`}>งานใหม่รอจ่าย (1)</button>
        <button onClick={() => setActiveTab("active")} className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === "active" ? "border-[#0047AB] text-[#0047AB]" : "border-transparent text-slate-500"}`}>กำลังดำเนินการ (0)</button>
        <button onClick={() => setActiveTab("history")} className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === "history" ? "border-[#0047AB] text-[#0047AB]" : "border-transparent text-slate-500"}`}>ประวัติงาน</button>
      </div>

      {activeTab === "incoming" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 flex-1 min-h-0">
          <div className="col-span-1 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col h-[calc(100vh-280px)]">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="ค้นหาเลขอ้างอิง / ชื่อลูกค้า..." className="w-full pl-10 pr-4 py-2 text-xs font-medium rounded-lg border border-slate-200 outline-none focus:border-[#0047AB]" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {incomingJobs.map((job, idx) => (
                <div key={job.id} className="cursor-pointer rounded-xl border border-[#0047AB] bg-blue-50/50 shadow-sm p-4 transition-all hover:shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <span className="rounded bg-[#001A3D] px-2 py-1 text-[10px] font-bold text-white">{job.id}</span>
                    <span className="text-[10px] font-bold text-slate-400">{job.time}</span>
                  </div>
                  <div className="font-bold text-[#001A3D] text-sm">{job.type}</div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <UserIcon className="h-3 w-3" /> {job.customer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col h-[calc(100vh-280px)] overflow-hidden">
            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div> ข้อมูลลูกค้าและการจอง
                    </h4>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="font-black text-[#001A3D] text-lg">{incomingJobs[0].customer}</div>
                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md active:scale-95 transition-transform">
                          <Phone className="h-4 w-4 fill-current" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                        <Phone className="h-3.5 w-3.5" /> {incomingJobs[0].phone}
                      </div>
                      <div className="pt-4 border-t border-slate-200">
                        <div className="text-[10px] font-bold uppercase text-slate-400">สาเหตุการเรียก</div>
                        <div className="text-sm font-bold text-red-600 mt-1">{incomingJobs[0].reason}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div> บันทึกการติดตามงาน (Log)
                    </h4>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 transition-all">
                        <MessageSquare className="h-3.5 w-3.5" /> บันทึกการโทรติดตาม/หมายเหตุแอดมิน
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div> ค้นหาและจ่ายงาน (Dispatch)
                    </h4>
                    <div className="space-y-3">
                      <div className="text-xs font-black text-[#001A3D] mb-4">พาร์ทเนอร์ที่แนะนำ (อยู่ในรัศมี 10 กม.)</div>
                      {[
                        { name: "สมชาย ใจดี", plate: "1ขธ 4422", dist: "2.5 km", status: "ว่าง", type: "รถสไลด์" }
                      ].map((vendor, i) => (
                        <div key={i} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 hover:border-[#0047AB] hover:shadow-md transition-all cursor-pointer group">
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#0047AB] transition-colors"><Truck className="h-6 w-6" /></div>
                            <div>
                              <div className="text-sm font-black text-[#001A3D]">{vendor.name}</div>
                              <div className="text-[10px] font-bold text-slate-500">{vendor.type} • ทะเบียน {vendor.plate}</div>
                              <div className="mt-1 text-[10px] font-black text-[#0047AB] tracking-widest uppercase">ห่าง {vendor.dist}</div>
                            </div>
                          </div>
                          <button className="rounded-xl bg-[#0047AB] px-5 py-2.5 text-xs font-black text-white shadow-lg shadow-blue-500/20 hover:bg-[#003580] transition-all">จ่ายงาน</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Job Creation Modal */}
      <AnimatePresence>
        {showNewJobModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowNewJobModal(false)} className="absolute inset-0 bg-[#001A3D]/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl rounded-[32px] bg-white p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-[#001A3D]">สร้างงานใหม่ (Manual Entry)</h3>
                <button onClick={() => setShowNewJobModal(false)} className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"><X className="h-5 w-5" /></button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">ชื่อลูกค้า</label>
                    <input type="text" placeholder="ระบุชื่อ-นามสกุล" className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-[#0047AB]" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">เบอร์โทรศัพท์</label>
                    <input type="text" placeholder="08x-xxx-xxxx" className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-[#0047AB]" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">ประเภทบริการ</label>
                    <select className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-[#0047AB]">
                      <option>รถลากจูง</option>
                      <option>รถบรรทุก</option>
                      <option>บริการฉุกเฉิน</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">จุดรับรถ (ต้นทาง)</label>
                    <input type="text" placeholder="ค้นหาพิกัดหรือชื่อสถานที่" className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-[#0047AB]" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">จุดส่งรถ (ปลายทาง)</label>
                    <input type="text" placeholder="ระบุปลายทาง" className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-[#0047AB]" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">หมายเหตุเพิ่มเติม</label>
                    <textarea rows={2} placeholder="เช่น ระบุทะเบียนรถ, รุ่นรถ" className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold outline-none focus:border-[#0047AB] resize-none"></textarea>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex gap-4">
                <button onClick={() => setShowNewJobModal(false)} className="flex-1 rounded-2xl border border-slate-200 py-4 font-bold text-slate-500 hover:bg-slate-50 transition-all">ยกเลิก</button>
                <button className="flex-1 rounded-2xl bg-[#001A3D] py-4 font-black text-white shadow-xl shadow-[#001A3D]/20 hover:bg-[#002A5D] transition-all">สร้างและบันทึกงาน</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function UserIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  );
}
