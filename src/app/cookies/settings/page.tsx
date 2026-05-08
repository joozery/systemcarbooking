"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Settings, Cookie, CheckCircle2, Shield, Info, Save } from "lucide-react";
import { useState, useEffect } from "react";

export default function CookieSettingsPage() {
  const [settings, setSettings] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    functional: true
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("cookie-consent", "true");
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6">
          
          {/* Header */}
          <div className="mb-16 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#0047AB] mb-6"
            >
              <Settings className="h-8 w-8" />
            </motion.div>
            <h1 className="text-4xl font-black text-[#001A3D] tracking-tight mb-4">การตั้งค่าคุกกี้ (Cookies Settings)</h1>
            <p className="text-sm font-medium text-slate-500 max-w-2xl mx-auto">จัดการความเป็นส่วนตัวของคุณโดยการเลือกประเภทคุกกี้ที่คุณอนุญาตให้เราใช้งานบนแพลตฟอร์ม Crown Wealth</p>
          </div>

          <div className="space-y-8">
            
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm space-y-8">
              
              {/* Essential */}
              <div className="flex items-start justify-between gap-6 pb-8 border-b border-slate-50">
                <div className="flex gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 text-[#0047AB]">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-[#001A3D]">คุกกี้ที่มีความจำเป็นอย่างยิ่ง (Essential Cookies)</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">จำเป็นสำหรับการทำงานของเว็บไซต์เพื่อให้คุณใช้งานฟังก์ชันพื้นฐานได้ ไม่สามารถปิดการใช้งานได้</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-[10px] font-black uppercase text-slate-400">เปิดใช้งานเสมอ</div>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-6 pb-8 border-b border-slate-50">
                <div className="flex gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600">
                    <Info className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-[#001A3D]">คุกกี้เพื่อการวิเคราะห์ (Analytics Cookies)</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">ช่วยให้เราเข้าใจการใช้งานเว็บไซต์และนำข้อมูลไปพัฒนาบริการให้ดียิ่งขึ้น</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={settings.analytics} onChange={() => setSettings({...settings, analytics: !settings.analytics})} className="sr-only peer" />
                  <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between gap-6">
                <div className="flex gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 text-amber-600">
                    <Cookie className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-[#001A3D]">คุกกี้เพื่อการตลาด (Marketing Cookies)</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">ใช้ในการนำเสนอโฆษณาและเนื้อหาที่ตรงกับความสนใจของคุณจากเราและพาร์ทเนอร์</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={settings.marketing} onChange={() => setSettings({...settings, marketing: !settings.marketing})} className="sr-only peer" />
                  <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0047AB]"></div>
                </label>
              </div>

            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10">
              <p className="text-xs font-medium text-slate-400">เมื่อคุณกด "บันทึกการตั้งค่า" เราจะจำการตั้งค่าของคุณไว้ในเบราว์เซอร์นี้</p>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-8 py-4 rounded-2xl border border-slate-200 text-sm font-black text-[#001A3D] hover:bg-slate-50 transition-all">ยอมรับทั้งหมด</button>
                <button 
                  onClick={handleSave}
                  className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-[#001A3D] text-white text-sm font-black shadow-xl shadow-blue-500/10 hover:bg-black transition-all"
                >
                  {saved ? <CheckCircle2 className="h-5 w-5" /> : <Save className="h-5 w-5" />}
                  {saved ? "บันทึกสำเร็จ" : "บันทึกการตั้งค่า"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
