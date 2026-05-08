"use client";

import { motion } from "framer-motion";
import { 
  Settings, Globe, Shield, Bell, CreditCard, 
  Save, RefreshCcw, Truck, MapPin, Phone, 
  Mail, Lock, Database, Zap
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", name: "ทั่วไป", icon: Globe },
    { id: "pricing", name: "ราคาและบริการ", icon: CreditCard },
    { id: "security", name: "ความปลอดภัย", icon: Shield },
    { id: "notifications", name: "การแจ้งเตือน", icon: Bell },
  ];

  return (
    <div className="space-y-10">
      
      {/* Header Area */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#001A3D] tracking-tight">ตั้งค่าระบบ</h1>
          <p className="mt-2 text-sm font-medium text-slate-500">จัดการข้อมูลบริษัท และกำหนดค่าการทำงานของแพลตฟอร์ม</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-500 hover:bg-slate-200 transition-all">
            <RefreshCcw className="h-4 w-4" />
            คืนค่าเริ่มต้น
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-[#0047AB] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-[#003580] transition-all">
            <Save className="h-4 w-4" />
            บันทึกการเปลี่ยนแปลง
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <nav className="flex flex-row lg:flex-col gap-2 p-1 bg-slate-100/50 rounded-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? "bg-white text-[#0047AB] shadow-sm" 
                    : "text-slate-500 hover:text-[#001A3D]"
                }`}
              >
                <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? "text-[#0047AB]" : "text-slate-400"}`} />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-8">
          
          {activeTab === "general" && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Profile Settings */}
              <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
                <h3 className="text-lg font-black text-[#001A3D] mb-8 flex items-center gap-3">
                  <Globe className="h-5 w-5 text-blue-500" />
                  ข้อมูลพื้นฐานของเว็บไซต์
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">ชื่อแอปพลิเคชัน / แบรนด์</label>
                    <input type="text" defaultValue="Crown Wealth" className="w-full rounded-xl bg-slate-50 px-4 py-3.5 text-sm font-bold outline-none border border-slate-100 focus:border-blue-400 focus:bg-white transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">สโลแกน</label>
                    <input type="text" defaultValue="เชื่อมต่อทุกการเดินทาง มั่นใจทุกบริการ" className="w-full rounded-xl bg-slate-50 px-4 py-3.5 text-sm font-bold outline-none border border-slate-100 focus:border-blue-400 focus:bg-white transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">อีเมลติดต่อกลาง</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                      <input type="email" defaultValue="support@crownwealth.com" className="w-full rounded-xl bg-slate-50 pl-12 pr-4 py-3.5 text-sm font-bold outline-none border border-slate-100 focus:border-blue-400 focus:bg-white transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">เบอร์โทรศัพท์ Call Center</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                      <input type="text" defaultValue="02-123-4567" className="w-full rounded-xl bg-slate-50 pl-12 pr-4 py-3.5 text-sm font-bold outline-none border border-slate-100 focus:border-blue-400 focus:bg-white transition-all" />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">ที่อยู่สำนักงานใหญ่</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 h-4 w-4 text-slate-300" />
                      <textarea rows={3} defaultValue="123 อาคารคราวน์ ชั้น 15 ถนนสุขุมวิท แขวงคลองเตย เขตวัฒนา กรุงเทพฯ 10110" className="w-full rounded-xl bg-slate-50 pl-12 pr-4 py-4 text-sm font-bold outline-none border border-slate-100 focus:border-blue-400 focus:bg-white transition-all resize-none" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "pricing" && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
                <h3 className="text-lg font-black text-[#001A3D] mb-8 flex items-center gap-3">
                  <Zap className="h-5 w-5 text-amber-500" />
                  การกำหนดค่าบริการ (Pricing Rules)
                </h3>
                
                <div className="space-y-8">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                      <Truck className="h-5 w-5 text-[#0047AB]" />
                      <span className="text-sm font-black text-[#001A3D]">บริการรถสไลด์ (Slide-on)</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">ราคาเริ่มต้น (Base Fee)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">฿</span>
                          <input type="number" defaultValue="1500" className="w-full rounded-xl bg-white pl-10 pr-4 py-3 text-sm font-black outline-none border border-slate-200 focus:border-blue-400 transition-all" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">ค่าบริการต่อกิโลเมตร</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">฿</span>
                          <input type="number" defaultValue="50" className="w-full rounded-xl bg-white pl-10 pr-4 py-3 text-sm font-black outline-none border border-slate-200 focus:border-blue-400 transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 opacity-60 grayscale cursor-not-allowed">
                    <div className="flex items-center gap-3 mb-6">
                      <Truck className="h-5 w-5 text-[#0047AB]" />
                      <span className="text-sm font-black text-[#001A3D]">บริการรถยก (Towing Truck) - เร็วๆ นี้</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">ราคาเริ่มต้น</label>
                        <input disabled type="number" defaultValue="1200" className="w-full rounded-xl bg-white px-4 py-3 text-sm font-black outline-none border border-slate-200" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">ค่าบริการต่อกิโลเมตร</label>
                        <input disabled type="number" defaultValue="40" className="w-full rounded-xl bg-white px-4 py-3 text-sm font-black outline-none border border-slate-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
                <h3 className="text-lg font-black text-[#001A3D] mb-8 flex items-center gap-3">
                  <Lock className="h-5 w-5 text-red-500" />
                  รหัสผ่านและความปลอดภัย
                </h3>
                
                <div className="max-w-md space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">รหัสผ่านปัจจุบัน</label>
                    <input type="password" placeholder="••••••••" className="w-full rounded-xl bg-slate-50 px-4 py-3.5 text-sm outline-none border border-slate-100 focus:border-red-400 focus:bg-white transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">รหัสผ่านใหม่</label>
                    <input type="password" placeholder="••••••••" className="w-full rounded-xl bg-slate-50 px-4 py-3.5 text-sm outline-none border border-slate-100 focus:border-blue-400 focus:bg-white transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">ยืนยันรหัสผ่านใหม่</label>
                    <input type="password" placeholder="••••••••" className="w-full rounded-xl bg-slate-50 px-4 py-3.5 text-sm outline-none border border-slate-100 focus:border-blue-400 focus:bg-white transition-all" />
                  </div>
                  <button className="rounded-xl bg-[#001A3D] px-6 py-3 text-xs font-black text-white hover:bg-black transition-all">
                    เปลี่ยนรหัสผ่าน
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-dashed border-slate-200 p-8 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <Database className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-black text-[#001A3D]">สำรองข้อมูลระบบ (Database Backup)</h4>
                <p className="mt-2 text-xs font-medium text-slate-500 max-w-sm">แนะนำให้ทำการสำรองข้อมูลอย่างน้อยสัปดาห์ละครั้งเพื่อป้องกันเหตุขัดข้องทางเทคนิค</p>
                <button className="mt-6 rounded-xl border border-slate-200 px-6 py-2.5 text-[11px] font-black uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition-all">
                  เริ่มการสำรองข้อมูลเดี๋ยวนี้
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </div>

    </div>
  );
}
