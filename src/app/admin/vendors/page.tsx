"use client";

import { useState } from "react";
import { Search, Filter, ShieldCheck, UserX, UserCheck, MoreVertical, Truck, CheckCircle2, XCircle } from "lucide-react";

export default function AdminVendorsPage() {
  const [activeTab, setActiveTab] = useState("pending");

  const vendors = [
    { id: "V-1001", name: "สมชาย ใจดี", phone: "081-234-5678", type: "รถลากจูง", plate: "1ขธ 4422 (กทม.)", status: "pending", date: "วันนี้, 10:30 น." },
  ];

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#001A3D]">จัดการพาร์ทเนอร์ (Vendors)</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">ตรวจสอบเอกสารและอนุมัติคนขับเข้าสู่ระบบ</p>
        </div>
      </div>

      <div className="flex border-b border-slate-200">
        <button onClick={() => setActiveTab("pending")} className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === "pending" ? "border-[#0047AB] text-[#0047AB]" : "border-transparent text-slate-500"}`}>รอตรวจสอบเอกสาร (1)</button>
      </div>

      {activeTab === "pending" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 flex-1 min-h-0">
          <div className="col-span-1 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col h-[calc(100vh-280px)]">
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {vendors.map((vendor, idx) => (
                <div key={vendor.id} className="cursor-pointer rounded-xl border border-[#0047AB] bg-blue-50/50 shadow-sm p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-[#001A3D] text-sm">{vendor.name}</span>
                    <span className="text-[10px] font-bold text-slate-400">{vendor.date}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-500 mb-2">{vendor.phone}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col h-[calc(100vh-280px)] overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-6">
              <div>
                <h3 className="text-xl font-black text-[#001A3D]">{vendors[0].name}</h3>
                <span className="rounded bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-700">รอตรวจสอบ</span>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2 text-sm font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all">
                  <ShieldCheck className="h-4 w-4" /> อนุมัติพาร์ทเนอร์
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
