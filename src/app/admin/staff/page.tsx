"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, UserPlus, Search, Filter, 
  MoreHorizontal, Mail, Shield, Key,
  CheckCircle2, Clock, Eye, Trash2, Edit,
  Users, Activity, UserCog, ChevronRight,
  ExternalLink, LogIn, LayoutGrid
} from "lucide-react";
import { useState, useEffect } from "react";
import AddStaffModal from "@/components/admin/AddStaffModal";
import EditStaffModal from "@/components/admin/EditStaffModal";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [staffList, setStaffList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  
  // Confirmation Modal State
  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "warning" | "danger" | "success";
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "warning",
    onConfirm: () => {},
  });

  const fetchStaff = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/staff`);
      const data = await response.json();
      if (data.success) {
        setStaffList(data.data);
      }
    } catch (error) {
      console.error("Error fetching staff:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const staffStats = [
    { 
      name: "พนักงานทั้งหมด", 
      value: staffList.length.toString(), 
      icon: Users, 
      color: "from-blue-600 to-blue-500",
      label: "จำนวนทีมงาน"
    },
    { 
      name: "ออนไลน์", 
      value: staffList.filter(s => s.status === 'online').length.toString(), 
      icon: Activity, 
      color: "from-emerald-600 to-emerald-500",
      label: "กำลังใช้งาน"
    },
    { 
      name: "รอการยืนยัน", 
      value: staffList.filter(s => s.status === 'pending').length.toString(), 
      icon: Clock, 
      color: "from-amber-600 to-amber-500",
      label: "รออนุมัติ"
    },
  ];

  const getRoleStyle = (role: string) => {
    switch (role) {
      case 'Owner': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'Finance': return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
      case 'Support': return 'bg-sky-500/10 text-sky-600 border-sky-500/20';
      case 'Admin': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      default: return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6 pb-10 max-w-[1600px] mx-auto">
      
      {/* Header Area - Compact */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <LayoutGrid className="h-4 w-4 text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Staff Management Console</span>
          </div>
          <h1 className="text-2xl font-black text-[#001A3D] tracking-tight">
            จัดการทีมงานแอดมิน
          </h1>
        </div>
        <div className="flex items-center gap-2">
           <button className="h-10 px-4 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
             <Filter className="h-3.5 w-3.5" />
             ตัวกรอง
           </button>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="h-10 px-4 rounded-lg bg-[#001A3D] text-xs font-bold text-white hover:bg-black transition-all flex items-center gap-2 shadow-lg shadow-[#001A3D]/10 group"
           >
             <UserPlus className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
             เพิ่มทีมงานใหม่
           </button>
        </div>
      </div>

      <AddStaffModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={fetchStaff} />
      <EditStaffModal isOpen={isEditModalOpen} onClose={() => { setIsEditModalOpen(false); setSelectedStaff(null); }} onSuccess={fetchStaff} staff={selectedStaff} />

      {/* Stats Cards - Smaller & Compact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {staffStats.map((stat, i) => (
          <motion.div 
            key={stat.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm border border-slate-100 hover:border-blue-200 transition-all duration-300"
          >
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{stat.label}</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-xl font-black text-[#001A3D]">{stat.value}</h3>
                  <span className="text-[10px] font-bold text-slate-300">รายชื่อ</span>
                </div>
              </div>
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shadow-md shadow-current/10`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Table Section - Clean & High density */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        {/* Table Toolbar - Compact */}
        <div className="px-6 py-4 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/20">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-sm group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                placeholder="ค้นหาด้วยชื่อ, อีเมล หรือตำแหน่ง..."
                className="h-9 w-full rounded-lg bg-white border border-slate-200 pl-10 pr-4 text-[11px] font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">จัดเรียงตาม</span>
            <select className="h-8 px-3 rounded-lg border border-slate-200 bg-white text-[10px] font-black text-slate-600 outline-none hover:bg-slate-50 transition-all cursor-pointer">
              <option>ล่าสุด</option>
              <option>ตามตัวอักษร</option>
              <option>บทบาท</option>
            </select>
          </div>
        </div>

        {/* The Table - Compact Rows */}
        <div className="overflow-x-auto">
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="h-10 w-10 border-3 border-slate-100 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">กำลังดึงข้อมูลระบบ...</p>
              </div>
            ) : staffList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <UserCog className="h-10 w-10 text-slate-200 mb-3" />
                <h3 className="text-sm font-black text-slate-400 tracking-tight">ไม่พบรายชื่อพนักงาน</h3>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-50 text-[9px] font-black uppercase tracking-wider text-slate-400">
                    <th className="pl-6 pr-4 py-4">ข้อมูลบัญชี</th>
                    <th className="px-4 py-4">ตำแหน่ง</th>
                    <th className="px-4 py-4">ระดับสิทธิ์</th>
                    <th className="px-4 py-4">ใช้งานล่าสุด</th>
                    <th className="px-4 py-4">สถานะ</th>
                    <th className="pl-4 pr-6 py-4 text-right">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50/50">
                  {staffList.filter(staff => 
                    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    staff.role.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((staff, idx) => (
                    <tr key={staff._id} className="group hover:bg-slate-50/50 transition-all duration-200">
                      <td className="pl-6 pr-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="relative flex-shrink-0">
                            <img 
                              src={staff.avatar || `https://ui-avatars.com/api/?name=${staff.name}&background=0047AB&color=fff&bold=true`} 
                              alt={staff.name} 
                              className="h-9 w-9 rounded-lg border border-slate-100 shadow-sm object-cover" 
                            />
                            <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                              staff.status === 'online' ? 'bg-emerald-500' : 
                              staff.status === 'pending' ? 'bg-amber-500' : 'bg-slate-300'
                            }`}></div>
                          </div>
                          <div className="flex flex-col leading-tight">
                            <span className="text-[12px] font-bold text-[#001A3D]">{staff.name}</span>
                            <span className="text-[10px] font-medium text-slate-400">{staff.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[9px] font-black uppercase tracking-wider ${getRoleStyle(staff.role)}`}>
                          {staff.role}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <Key className="h-3 w-3 text-slate-300" />
                          <span className="text-[11px] font-bold text-slate-600 tracking-tight">{staff.level}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                          <LogIn className="h-3 w-3" />
                          {staff.lastLogin ? new Date(staff.lastLogin).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }) : 'ยังไม่มีข้อมูล'}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                         <span className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest ${
                           staff.status === 'online' ? 'text-emerald-500' : 
                           staff.status === 'pending' ? 'text-amber-500' : 'text-slate-400'
                         }`}>
                           <div className={`h-1.5 w-1.5 rounded-full ${
                             staff.status === 'online' ? 'bg-emerald-500 animate-pulse' : 
                             staff.status === 'pending' ? 'bg-amber-500' : 'bg-slate-400'
                           }`}></div>
                           {staff.status === 'online' ? 'ออนไลน์' : staff.status === 'pending' ? 'รออนุมัติ' : 'ออฟไลน์'}
                         </span>
                      </td>
                      <td className="pl-4 pr-6 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          {staff.status === 'pending' && (
                            <button 
                              className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all animate-pulse hover:animate-none" 
                              title="อนุมัติพนักงาน"
                              onClick={() => {
                                setConfirmConfig({
                                  isOpen: true,
                                  title: "อนุมัติพนักงาน",
                                  message: `คุณต้องการอนุมัติ ${staff.name} เข้าใช้งานระบบใช่หรือไม่?`,
                                  type: "warning",
                                  onConfirm: async () => {
                                    try {
                                      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/staff/${staff._id}`, { 
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ status: 'online' })
                                      });
                                      const data = await res.json();
                                      if (data.success) {
                                        fetchStaff();
                                        setConfirmConfig({
                                          isOpen: true,
                                          title: "ดำเนินการสำเร็จ",
                                          message: `อนุมัติ ${staff.name} เรียบร้อยแล้ว`,
                                          type: "success",
                                          onConfirm: () => {}
                                        });
                                      }
                                    } catch (e) {
                                      setConfirmConfig({
                                        isOpen: true,
                                        title: "เกิดข้อผิดพลาด",
                                        message: "ไม่สามารถอนุมัติได้ในขณะนี้",
                                        type: "danger",
                                        onConfirm: () => {}
                                      });
                                    }
                                  }
                                });
                              }}
                            >
                              <ShieldCheck className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <button 
                            className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all" 
                            title="แก้ไข"
                            onClick={() => {
                              setSelectedStaff(staff);
                              setIsEditModalOpen(true);
                            }}
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button 
                            className="h-8 w-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all" 
                            title="ลบ"
                            onClick={() => {
                              setConfirmConfig({
                                isOpen: true,
                                title: "ลบรายชื่อพนักงาน",
                                message: `ยืนยันการลบ ${staff.name} ออกจากระบบ? การกระทำนี้ไม่สามารถย้อนกลับได้`,
                                type: "danger",
                                onConfirm: async () => {
                                  try {
                                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/staff/${staff._id}`, { method: 'DELETE' });
                                    const data = await res.json();
                                    if (data.success) {
                                      fetchStaff();
                                      setConfirmConfig({
                                        isOpen: true,
                                        title: "ลบข้อมูลสำเร็จ",
                                        message: "ระบบได้นำรายชื่อออกเรียบร้อยแล้ว",
                                        type: "success",
                                        onConfirm: () => {}
                                      });
                                    }
                                  } catch (e) { 
                                    setConfirmConfig({
                                      isOpen: true,
                                      title: "เกิดข้อผิดพลาด",
                                      message: "ไม่สามารถลบข้อมูลได้ในขณะนี้",
                                      type: "danger",
                                      onConfirm: () => {}
                                    });
                                  }
                                }
                              });
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info - Compact */}
        <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 tracking-tight">
               ทีมงานทั้งหมด {staffList.length} รายชื่อ
            </span>
            <div className="flex items-center gap-1 text-[9px] font-black text-slate-300 uppercase tracking-widest">
               <ShieldCheck className="h-3 w-3" />
               ระบบจัดการพนักงานปลอดภัย 100%
            </div>
        </div>
      </div>

      <ConfirmModal 
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ ...confirmConfig, isOpen: false })}
        onConfirm={confirmConfig.onConfirm}
        title={confirmConfig.title}
        message={confirmConfig.message}
        type={confirmConfig.type}
      />

    </div>
  );
}
