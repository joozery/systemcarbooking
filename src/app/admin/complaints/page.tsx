"use client";

import { useState } from "react";
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  MoreVertical, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  User,
  Truck
} from "lucide-react";

const complaints = [
  { 
    id: "CP-8842", 
    customer: "คุณวิภาวรรณ", 
    vendor: "สมชาย ใจดี", 
    subject: "พาร์ทเนอร์มาถึงล่าช้าเกิน 30 นาที", 
    date: "2024-05-08 09:15", 
    status: "pending", 
    priority: "high" 
  },
  { 
    id: "CP-8841", 
    customer: "คุณธนพล", 
    vendor: "เก่งกล้า ยานยนต์", 
    subject: "อุปกรณ์ลากจูงไม่เรียบร้อย", 
    date: "2024-05-07 14:30", 
    status: "investigating", 
    priority: "medium" 
  },
  { 
    id: "CP-8840", 
    customer: "คุณรัตนา", 
    vendor: "วินเนอร์ สไลด์ออน", 
    subject: "เจ้าหน้าที่พูดจาไม่สุภาพ", 
    date: "2024-05-07 11:20", 
    status: "resolved", 
    priority: "low" 
  },
];

export default function ComplaintsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-amber-500";
      case "investigating": return "bg-blue-500";
      case "resolved": return "bg-emerald-500";
      default: return "bg-slate-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "รอดำเนินการ";
      case "investigating": return "กำลังตรวจสอบ";
      case "resolved": return "แก้ไขแล้ว";
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-500 bg-red-50";
      case "medium": return "text-amber-500 bg-amber-50";
      case "low": return "text-emerald-500 bg-emerald-50";
      default: return "text-slate-500 bg-slate-50";
    }
  };

  return (
    <div className="space-y-8 font-noto-thai">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#001A3D] tracking-tight">เรื่องร้องเรียน</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">จัดการและตอบกลับปัญหาที่แจ้งมาจากลูกค้า</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="ค้นหาเลขที่ร้องเรียน..." 
              className="w-full md:w-64 rounded-xl border border-slate-200 bg-white py-2.5 pl-12 pr-4 text-xs font-bold outline-none focus:border-[#0047AB] focus:ring-4 focus:ring-[#0047AB]/5 transition-all" 
            />
          </div>
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-black text-[#001A3D] hover:bg-slate-50 transition-all">
            <Filter className="h-4 w-4" /> กรองข้อมูล
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "รอดำเนินการ", value: "12", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
          { label: "กำลังตรวจสอบ", value: "05", icon: ShieldAlert, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "แก้ไขแล้ววันนี้", value: "08", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex items-center gap-5">
            <div className={`h-12 w-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
              <h3 className="text-2xl font-black text-[#001A3D]">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Table Area */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-xl shadow-[#001A3D]/5 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex gap-4">
            {["all", "pending", "resolved"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === tab ? "bg-[#001A3D] text-white" : "text-slate-400 hover:text-[#001A3D] hover:bg-slate-50"
                }`}
              >
                {tab === "all" ? "ทั้งหมด" : tab === "pending" ? "ค้างอยู่" : "เสร็จแล้ว"}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">เลขที่ / วันที่</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">หัวข้อร้องเรียน</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">ลูกค้า / พาร์ทเนอร์</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">ความสำคัญ</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">สถานะ</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {complaints.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                  <td className="px-6 py-5">
                    <div className="font-black text-[#001A3D] text-sm">{item.id}</div>
                    <div className="text-[10px] font-medium text-slate-400 mt-1">{item.date}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-bold text-[#001A3D] line-clamp-1">{item.subject}</div>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-[#0047AB] font-black uppercase tracking-widest opacity-60">
                      <MessageSquare className="h-3 w-3" /> 2 ข้อความล่าสุด
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-2">
                       <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                          <User className="h-3 w-3 text-slate-400" /> {item.customer}
                       </div>
                       <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                          <Truck className="h-3 w-3 text-slate-400" /> {item.vendor}
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getPriorityColor(item.priority)}`}>
                      {item.priority === "high" ? "เร่งด่วน" : item.priority === "medium" ? "ปกติ" : "ต่ำ"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(item.status)} animate-pulse`} />
                      <span className="text-xs font-bold text-slate-600">{getStatusText(item.status)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 rounded-lg text-slate-400 hover:bg-white hover:text-[#0047AB] transition-all border border-transparent hover:border-slate-100">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400">แสดง 3 จาก 25 รายการ</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-black text-slate-400 disabled:opacity-50" disabled>ก่อนหน้า</button>
            <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-xs font-black text-[#001A3D] hover:bg-slate-50 transition-all shadow-sm">ถัดไป</button>
          </div>
        </div>
      </div>
    </div>
  );
}
