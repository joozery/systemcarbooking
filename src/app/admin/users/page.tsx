"use client";

import { motion } from "framer-motion";
import { 
  Users, UserPlus, UserCheck, Search, Filter, 
  MoreHorizontal, Mail, Phone, Calendar,
  Shield, Star, ArrowRight
} from "lucide-react";
import { useState } from "react";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const userStats = [
    { name: "ผู้ใช้งานทั้งหมด", value: "1,284", change: "+48 ในเดือนนี้", icon: Users, color: "bg-indigo-500" },
    { name: "ผู้ใช้งานที่แอคทีฟ", value: "856", change: "Active ภายใน 7 วัน", icon: UserCheck, color: "bg-emerald-500" },
    { name: "สมาชิกระดับ Gold", value: "124", change: "ลูกค้าชั้นยอด", icon: Star, color: "bg-amber-500" },
  ];

  const users = [
    { id: "USR-001", name: "วิชัย สมดุล", email: "wichai.s@email.com", phone: "081-234-5678", joined: "12 ม.ค. 2026", jobs: 12, totalSpent: "฿24,500", status: "active" },
    { id: "USR-002", name: "กมลพร สายบัว", email: "kamolporn.b@email.com", phone: "082-345-6789", joined: "15 ม.ค. 2026", jobs: 4, totalSpent: "฿8,200", status: "active" },
    { id: "USR-003", name: "เอกลักษณ์ ใจบุญ", email: "ekkalak.j@email.com", phone: "089-876-5432", joined: "20 ม.ค. 2026", jobs: 1, totalSpent: "฿1,500", status: "inactive" },
    { id: "USR-004", name: "พรรณิภา ขยันเรียน", email: "pannipa.k@email.com", phone: "085-555-4433", joined: "22 ม.ค. 2026", jobs: 8, totalSpent: "฿12,400", status: "active" },
    { id: "USR-005", name: "มานะ มีแฮง", email: "mana.m@email.com", phone: "087-111-2233", joined: "25 ม.ค. 2026", jobs: 0, totalSpent: "฿0", status: "new" },
  ];

  return (
    <div className="space-y-10">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#001A3D] tracking-tight">จัดการผู้ใช้งาน</h1>
          <p className="mt-2 text-sm font-medium text-slate-500">บริหารจัดการฐานข้อมูลลูกค้าและประวัติการใช้บริการ</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-[#0047AB] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-[#003580] transition-all">
            <UserPlus className="h-4 w-4" />
            เพิ่มผู้ใช้งานใหม่
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {userStats.map((stat, i) => (
          <motion.div 
            key={stat.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100 flex items-center gap-6"
          >
            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${stat.color} text-white shadow-lg shadow-current/20`}>
              <stat.icon className="h-8 w-8" />
            </div>
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 mb-1">{stat.name}</div>
              <div className="text-3xl font-black text-[#001A3D] leading-none mb-2">{stat.value}</div>
              <div className="text-[11px] font-bold text-emerald-500">{stat.change}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Users Table Section */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="ค้นหาชื่อ, อีเมล, หรือเบอร์โทรศัพท์..."
              className="w-full rounded-xl bg-slate-50 py-3 pl-12 pr-4 text-xs font-bold outline-none border border-slate-100 focus:border-blue-400 focus:bg-white transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Filter className="h-4 w-4" />
              ตัวกรอง
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Calendar className="h-4 w-4" />
              วันที่สมัคร
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <th className="px-8 py-4">ข้อมูลผู้ใช้งาน</th>
                <th className="px-8 py-4">ช่องทางติดต่อ</th>
                <th className="px-8 py-4 text-center">จำนวนงาน</th>
                <th className="px-8 py-4">ยอดใช้จ่ายรวม</th>
                <th className="px-8 py-4">สถานะ</th>
                <th className="px-8 py-4 text-right">ดำเนินการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0047AB] font-black text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#001A3D]">{user.name}</span>
                        <span className="text-[10px] font-medium text-slate-400">ID: {user.id} • สมัครเมื่อ {user.joined}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-medium text-slate-600">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-slate-400" />
                        <span className="text-xs">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-slate-400" />
                        <span className="text-xs">{user.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-600">
                      {user.jobs}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-[#001A3D]">{user.totalSpent}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${
                      user.status === 'active' ? 'bg-emerald-50 text-emerald-600' :
                      user.status === 'new' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${
                        user.status === 'active' ? 'bg-emerald-500' :
                        user.status === 'new' ? 'bg-blue-500' : 'bg-slate-400'
                      }`}></div>
                      {user.status === 'active' ? 'ปกติ' : user.status === 'new' ? 'ผู้ใช้งานใหม่' : 'ไม่ออกตัว'}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-[10px] font-black text-slate-600 hover:bg-[#0047AB] hover:text-white transition-all">
                        ดูประวัติ
                        <ArrowRight className="h-3 w-3" />
                      </button>
                      <button className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-slate-600 transition-all">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-8 py-4 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-400">แสดง 5 จาก 1,284 รายชื่อ</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded border border-slate-200 text-[10px] font-bold text-slate-400 cursor-not-allowed">ก่อนหน้า</button>
            <button className="px-3 py-1 rounded bg-[#0047AB] text-[10px] font-bold text-white shadow-sm">1</button>
            <button className="px-3 py-1 rounded border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-50">2</button>
            <button className="px-3 py-1 rounded border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-50">ถัดไป</button>
          </div>
        </div>
      </div>

    </div>
  );
}
