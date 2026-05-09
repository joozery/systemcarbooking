"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Edit, Mail, Shield, Key, Loader2, Save, User, Briefcase, Activity } from "lucide-react";
import { useState, useEffect } from "react";

interface EditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  staff: any;
}

export default function EditStaffModal({ isOpen, onClose, onSuccess, staff }: EditStaffModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Support",
    level: "",
    status: "online"
  });

  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name || "",
        email: staff.email || "",
        role: staff.role || "Support",
        level: staff.level || "",
        status: staff.status || "online"
      });
    }
  }, [staff]);

  if (!isOpen || !staff) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/staff/${staff._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        onSuccess();
        onClose();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#001A3D]/30 backdrop-blur-sm" 
          onClick={onClose} 
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-100"
        >
          {/* Header - Compact */}
          <div className="px-6 py-5 bg-blue-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center">
                <Edit className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-black tracking-tight">แก้ไขข้อมูลสมาชิก</h3>
                <p className="text-[9px] font-bold text-blue-100 uppercase tracking-widest opacity-80">Update Staff Details</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="h-8 w-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full transition-all"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">ชื่อ-นามสกุล</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                <input 
                  required
                  type="text" 
                  className="w-full h-11 rounded-xl border border-slate-100 bg-slate-50/50 pl-11 pr-4 text-[12px] font-bold outline-none transition-all focus:border-blue-500 focus:bg-white"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">อีเมลผู้ใช้งาน</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                <input 
                  required
                  type="email" 
                  className="w-full h-11 rounded-xl border border-slate-100 bg-slate-50/50 pl-11 pr-4 text-[12px] font-bold outline-none transition-all focus:border-blue-500 focus:bg-white"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">บทบาท</label>
                <div className="relative">
                  <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300 pointer-events-none" />
                  <select 
                    className="w-full h-11 rounded-xl border border-slate-100 bg-slate-50/50 pl-10 pr-4 text-[11px] font-bold outline-none transition-all focus:border-blue-500 focus:bg-white appearance-none cursor-pointer"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value as any})}
                  >
                    <option value="Admin">แอดมิน</option>
                    <option value="Finance">การเงิน</option>
                    <option value="Support">ฝ่ายปฏิบัติการ</option>
                    <option value="Owner">เจ้าของระบบ</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">ระดับสิทธิ์</label>
                <div className="relative">
                  <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300 pointer-events-none" />
                  <select 
                    className="w-full h-11 rounded-xl border border-slate-100 bg-slate-50/50 pl-10 pr-4 text-[11px] font-bold outline-none transition-all focus:border-blue-500 focus:bg-white appearance-none cursor-pointer"
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">สถานะ</label>
              <div className="relative">
                <Activity className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300 pointer-events-none" />
                <select 
                  className="w-full h-11 rounded-xl border border-slate-100 bg-slate-50/50 pl-10 pr-4 text-[11px] font-bold outline-none transition-all focus:border-blue-500 focus:bg-white appearance-none cursor-pointer"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                >
                  <option value="online">ออนไลน์ / พร้อมทำงาน</option>
                  <option value="offline">ออฟไลน์ / พักงาน</option>
                  <option value="pending">รอการยืนยันตัวตน</option>
                </select>
              </div>
            </div>

            <button 
              disabled={loading}
              className="flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 mt-4 shadow-lg shadow-blue-600/10"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              บันทึกการแก้ไขข้อมูล
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
