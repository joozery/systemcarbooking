"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, UserPlus, Search, Filter, 
  MoreHorizontal, Mail, Shield, Key,
  CheckCircle2, Clock, Eye, Trash2, Edit
} from "lucide-react";
import { useState } from "react";

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const staffStats = [
    { name: "แอดมินทั้งหมด", value: "8", icon: ShieldCheck, color: "bg-blue-600" },
    { name: "ออนไลน์ตอนนี้", value: "3", icon: CheckCircle2, color: "bg-emerald-500" },
    { name: "รอการยืนยัน", value: "1", icon: Clock, color: "bg-amber-500" },
  ];

  const staffList = [
    { id: "ADM-001", name: "Admin Opor", email: "opor.admin@crownwealth.com", role: "Owner", level: "Super Admin", lastLogin: "กำลังใช้งาน", status: "online", avatar: "https://ui-avatars.com/api/?name=Admin+Opor&background=0047AB&color=fff" },
    { id: "ADM-002", name: "วิลาศิณี ใจดี", email: "wilasinee.j@crownwealth.com", role: "Finance", level: "Financial Manager", lastLogin: "2 ชม. ที่แล้ว", status: "offline", avatar: "https://ui-avatars.com/api/?name=Wilasinee+J&background=E11D48&color=fff" },
    { id: "ADM-003", name: "เกรียงไกร สายลุย", email: "kriangkrai.s@crownwealth.com", role: "Support", level: "Dispatch Officer", lastLogin: "5 นาทีที่แล้ว", status: "online", avatar: "https://ui-avatars.com/api/?name=Kriangkrai+S&background=0284C7&color=fff" },
    { id: "ADM-004", name: "สมโภชน์ ยอดขวัญ", email: "sompoch.y@crownwealth.com", role: "Support", level: "Dispatch Officer", lastLogin: "เมื่อวานนี้, 18:45", status: "offline", avatar: "https://ui-avatars.com/api/?name=Sompoch+Y&background=0284C7&color=fff" },
    { id: "ADM-005", name: "จิราพร แสงดาว", email: "jiraporn.s@crownwealth.com", role: "Support", level: "Junior Admin", lastLogin: "ยังไม่เคยเข้าใช้งาน", status: "pending", avatar: "https://ui-avatars.com/api/?name=Jiraporn+S&background=F59E0B&color=fff" },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Owner': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Finance': return 'bg-rose-50 text-rose-600 border-rose-200';
      case 'Support': return 'bg-sky-50 text-sky-600 border-sky-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
               <ShieldCheck className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-black text-[#001A3D] tracking-tight">ทีมงานแอดมิน</h1>
          </div>
          <p className="text-sm font-medium text-slate-500 ml-11">จัดการสิทธิ์การเข้าถึงและเพิ่มเพื่อนร่วมทีมในระบบหลังบ้าน</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-[#001A3D] px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-slate-900/10 hover:bg-black transition-all">
          <UserPlus className="h-4 w-4" />
          เชิญทีมงานใหม่
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {staffStats.map((stat, i) => (
          <motion.div 
            key={stat.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl ${stat.color} text-white flex items-center justify-center shadow-lg shadow-current/20`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{stat.name}</div>
                <div className="text-2xl font-black text-[#001A3D]">{stat.value} <span className="text-xs font-bold text-slate-300">คน</span></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Staff Table Section */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="ค้นหาชื่อ หรืออีเมล..."
              className="w-full rounded-xl bg-slate-50 py-3 pl-12 pr-4 text-xs font-bold outline-none border border-slate-100 focus:border-blue-400 focus:bg-white transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Filter className="h-4 w-4" />
              ตำแหน่งทั้งหมด
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Shield className="h-4 w-4" />
              ระดับสิทธิ์
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <th className="px-8 py-5">ทีมงาน</th>
                <th className="px-8 py-5">บทบาท (Role)</th>
                <th className="px-8 py-5">ระดับสิทธิ์</th>
                <th className="px-8 py-5">เข้าใช้งานล่าสุด</th>
                <th className="px-8 py-5">สถานะ</th>
                <th className="px-8 py-5 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {staffList.map((staff) => (
                <tr key={staff.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        <img src={staff.avatar} alt={staff.name} className="h-10 w-10 rounded-xl border border-slate-200 shadow-sm" />
                        <div className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white ${
                          staff.status === 'online' ? 'bg-emerald-500' : 
                          staff.status === 'pending' ? 'bg-amber-500' : 'bg-slate-300'
                        }`}></div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#001A3D]">{staff.name}</span>
                        <span className="text-[11px] font-medium text-slate-400">{staff.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${getRoleColor(staff.role)}`}>
                      {staff.role}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Key className="h-3 w-3 text-slate-400" />
                      {staff.level}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-xs font-bold ${staff.lastLogin === 'กำลังใช้งาน' ? 'text-[#0047AB]' : 'text-slate-500'}`}>
                      {staff.lastLogin}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                     <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${
                       staff.status === 'online' ? 'text-emerald-500' : 
                       staff.status === 'pending' ? 'text-amber-500' : 'text-slate-400'
                     }`}>
                       <div className={`h-1.5 w-1.5 rounded-full ${
                         staff.status === 'online' ? 'bg-emerald-500 animate-pulse' : 
                         staff.status === 'pending' ? 'bg-amber-500' : 'bg-slate-400'
                       }`}></div>
                       {staff.status === 'online' ? 'Online' : staff.status === 'pending' ? 'Pending' : 'Offline'}
                     </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all" title="แก้ไข">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all" title="ดูข้อมูล">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all" title="ระงับการใช้งาน">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-lg text-slate-300">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-6 bg-slate-50/30 border-t border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {staffList.slice(0, 3).map((s, i) => (
                    <img key={i} src={s.avatar} className="h-8 w-8 rounded-full border-2 border-white" alt="Team" />
                  ))}
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">+5</div>
                </div>
                <span className="text-xs font-medium text-slate-500">ทีมงานทั้งหมดช่วยกันดูแลระบบ {staffList.length} คน</span>
             </div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Crown Wealth Operations Team</p>
          </div>
        </div>
      </div>

    </div>
  );
}
