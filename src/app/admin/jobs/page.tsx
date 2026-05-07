"use client";

import { useState } from "react";
import { Search, Filter, MapPin, ArrowRight, Truck, Phone, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export default function AdminJobsPage() {
  const [activeTab, setActiveTab] = useState("incoming");

  const incomingJobs = [
    { id: "CW-1042", type: "รถลากจูง", customer: "คุณแพรวา", phone: "081-xxx-xxxx", reason: "รถเสีย (สตาร์ทไม่ติด)", origin: "ซอยสุขุมวิท 55 (ทองหล่อ)", destination: "อู่ B-Quik สาทร", notes: "ต้องการรถสไลด์เท่านั้น รถโหลดเตี้ย", time: "10 นาทีที่แล้ว" },
  ];

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#001A3D]">จัดการงาน (Job Dispatching)</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">ตรวจสอบคำสั่งซื้อและจ่ายงานให้พาร์ทเนอร์</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-xl bg-[#001A3D] px-6 py-2 text-sm font-bold text-white shadow-md shadow-[#001A3D]/20 hover:bg-[#002A5D] transition-all">สร้างงานใหม่ (Manual)</button>
        </div>
      </div>

      <div className="flex border-b border-slate-200">
        <button onClick={() => setActiveTab("incoming")} className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === "incoming" ? "border-[#0047AB] text-[#0047AB]" : "border-transparent text-slate-500"}`}>งานใหม่รอจ่าย (1)</button>
        <button onClick={() => setActiveTab("active")} className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === "active" ? "border-[#0047AB] text-[#0047AB]" : "border-transparent text-slate-500"}`}>กำลังดำเนินการ (0)</button>
      </div>

      {activeTab === "incoming" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 flex-1 min-h-0">
          <div className="col-span-1 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col h-[calc(100vh-280px)]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {incomingJobs.map((job, idx) => (
                <div key={job.id} className="cursor-pointer rounded-xl border border-[#0047AB] bg-blue-50/50 shadow-sm p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="rounded bg-[#001A3D] px-2 py-1 text-[10px] font-bold text-white">{job.id}</span>
                    <span className="text-[10px] font-bold text-slate-400">{job.time}</span>
                  </div>
                  <div className="font-bold text-[#001A3D] text-sm">{job.type}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col h-[calc(100vh-280px)] overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">ข้อมูลลูกค้า</h4>
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <div className="font-bold text-[#001A3D]">{incomingJobs[0].customer}</div>
                      <div className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-500"><Phone className="h-3.5 w-3.5" /> {incomingJobs[0].phone}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">เส้นทาง</h4>
                    <div className="relative rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <div className="text-[10px] font-bold uppercase text-slate-400">ต้นทาง</div>
                      <div className="text-sm font-bold text-[#001A3D] mb-4">{incomingJobs[0].origin}</div>
                      <div className="text-[10px] font-bold uppercase text-slate-400">ปลายทาง</div>
                      <div className="text-sm font-bold text-[#001A3D]">{incomingJobs[0].destination}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">ค้นหาและจ่ายงาน (Dispatch)</h4>
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-[#001A3D]">พาร์ทเนอร์ที่แนะนำ (ใกล้เคียง)</div>
                    {[
                      { name: "สมชาย ใจดี", plate: "1ขธ 4422", dist: "2.5 km", status: "ว่าง" }
                    ].map((vendor, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 hover:border-[#0047AB]/30 transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100"><Truck className="h-5 w-5 text-slate-500" /></div>
                          <div>
                            <div className="text-sm font-bold text-[#001A3D]">{vendor.name}</div>
                            <div className="text-xs font-medium text-slate-500">ทะเบียน {vendor.plate} • ห่าง {vendor.dist}</div>
                          </div>
                        </div>
                        <button className="rounded-lg bg-[#0047AB]/10 px-4 py-2 text-xs font-bold text-[#0047AB] hover:bg-[#0047AB] hover:text-white transition-all">จ่ายงาน</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
