"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Cookie, ShieldCheck, Info, MousePointer2 } from "lucide-react";

export default function CookiePolicyPage() {
  const lastUpdated = "8 พฤษภาคม 2026";

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
              <Cookie className="h-8 w-8" />
            </motion.div>
            <h1 className="text-4xl font-black text-[#001A3D] tracking-tight mb-4">นโยบายคุกกี้ (Cookie Policy)</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">ปรับปรุงล่าสุดเมื่อ: {lastUpdated}</p>
          </div>

          {/* Content Sections */}
          <div className="space-y-12 text-slate-600 leading-relaxed">
            
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#001A3D] flex items-center gap-3">
                <Info className="h-6 w-6 text-blue-500" />
                1. คุกกี้คืออะไร?
              </h2>
              <p>
                คุกกี้ (Cookies) คือไฟล์ข้อความขนาดเล็กที่ถูกจัดเก็บไว้ในคอมพิวเตอร์หรืออุปกรณ์เคลื่อนที่ของคุณ เมื่อคุณเข้าเยี่ยมชมเว็บไซต์ของเรา 
                คุกกี้ช่วยให้เว็บไซต์สามารถจดจำการตั้งค่าของคุณ (เช่น ภาษา ตัวอักษร และการตั้งค่าอื่นๆ) และช่วยให้เราเข้าใจว่าผู้ใช้งานมีปฏิสัมพันธ์กับเว็บไซต์อย่างไร
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#001A3D] flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-emerald-500" />
                2. เราใช้คุกกี้อย่างไร?
              </h2>
              <p>
                Crown Wealth ใช้คุกกี้เพื่อวัตถุประสงค์หลายประการ เพื่อให้แน่ใจว่าคุณจะได้รับประสบการณ์ที่ดีที่สุดในการใช้งานเว็บไซต์ของเรา:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>เพื่อให้ฟังก์ชันหลักของเว็บไซต์ทำงานได้อย่างถูกต้อง (เช่น การจองบริการรถสไลด์)</li>
                <li>เพื่อจดจำข้อมูลการเข้าสู่ระบบและการตั้งค่าส่วนตัวของคุณ</li>
                <li>เพื่อวิเคราะห์สถิติการใช้งานและปรับปรุงประสิทธิภาพของเว็บไซต์</li>
                <li>เพื่อมอบคุณหาและโฆษณาที่ตรงกับความสนใจของคุณมากที่สุด</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black text-[#001A3D] flex items-center gap-3">
                <MousePointer2 className="h-6 w-6 text-purple-500" />
                3. ประเภทของคุกกี้ที่เราใช้
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-black text-[#001A3D] mb-2">คุกกี้ที่มีความจำเป็นอย่างยิ่ง</h4>
                  <p className="text-sm">จำเป็นสำหรับการทำงานของเว็บไซต์ ช่วยให้คุณสามารถเคลื่อนที่ไปรอบๆ เว็บไซต์และใช้งานฟีเจอร์ต่างๆ ได้</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-black text-[#001A3D] mb-2">คุกกี้เพื่อการวิเคราะห์</h4>
                  <p className="text-sm">ช่วยให้เราเข้าใจว่าผู้เยี่ยมชมใช้งานเว็บไซต์อย่างไร ช่วยในการปรับปรุงคุณภาพและประสบการณ์การใช้งาน</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-black text-[#001A3D] mb-2">คุกกี้เพื่อการทำงาน</h4>
                  <p className="text-sm">ช่วยให้เว็บไซต์จดจำตัวเลือกที่คุณเลือกไว้ (เช่น ชื่อผู้ใช้ ภาษา หรือภูมิภาค) เพื่อมอบประสบการณ์ที่เป็นส่วนตัวมากขึ้น</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-black text-[#001A3D] mb-2">คุกกี้เพื่อการโฆษณา</h4>
                  <p className="text-sm">ใช้เพื่อมอบโฆษณาที่เกี่ยวข้องกับคุณและความสนใจของคุณมากขึ้น รวมถึงจำกัดจำนวนครั้งที่คุณเห็นโฆษณา</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#001A3D]">4. การจัดการคุกกี้ของคุณ</h2>
              <p>
                คุณสามารถเลือกที่จะยอมรับหรือปฏิเสธคุกกี้ได้ เบราว์เซอร์ส่วนใหญ่จะยอมรับคุกกี้โดยอัตโนมัติ 
                แต่คุณมักจะสามารถแก้ไขการตั้งค่าเบราว์เซอร์ของคุณเพื่อปฏิเสธคุกกี้หากคุณต้องการ อย่างไรก็ตาม 
                การดำเนินการดังกล่าวอาจทำให้คุณไม่สามารถใช้ประโยชน์จากเว็บไซต์ได้อย่างเต็มที่
              </p>
              <div className="mt-4 p-6 rounded-2xl border-2 border-dashed border-slate-200 text-center">
                <p className="text-sm font-bold text-slate-400">คุณสามารถปรับเปลี่ยนการตั้งค่าคุกกี้ได้ที่เมนู "การตั้งค่า" ของเบราว์เซอร์ที่คุณใช้งาน</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#001A3D]">5. ติดต่อเรา</h2>
              <p>
                หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับนโยบายคุกกี้ของเรา กรุณาติดต่อเราได้ที่:
              </p>
              <div className="bg-[#001A3D] text-white p-8 rounded-2xl shadow-xl">
                <p className="font-black mb-2">ฝ่ายคุ้มครองข้อมูลส่วนบุคคล (PDPA Team)</p>
                <p className="text-sm opacity-80">อีเมล: privacy@crownwealth.com</p>
                <p className="text-sm opacity-80">โทรศัพท์: 02-123-4567</p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
