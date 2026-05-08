"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, FileText, UserCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
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
              <Shield className="h-8 w-8" />
            </motion.div>
            <h1 className="text-4xl font-black text-[#001A3D] tracking-tight mb-4">นโยบายความเป็นส่วนตัว (Privacy Policy)</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">ปรับปรุงล่าสุดเมื่อ: {lastUpdated}</p>
          </div>

          <div className="space-y-12 text-slate-600 leading-relaxed">
            
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#001A3D] flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-500" />
                บทนำ
              </h2>
              <p>
                Crown Wealth ("เรา", "ของเรา") ให้ความสำคัญกับความปลอดภัยของข้อมูลส่วนบุคคลของคุณ เราจัดทำนโยบายความเป็นส่วนตัวนี้เพื่ออธิบายวิธีการที่เราเก็บรวบรวม ใช้ และป้องกันข้อมูลของคุณเมื่อคุณใช้งานแพลตฟอร์มของเรา
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#001A3D] flex items-center gap-3">
                <Eye className="h-6 w-6 text-emerald-500" />
                1. ข้อมูลที่เราเก็บรวบรวม
              </h2>
              <p>เราอาจเก็บรวบรวมข้อมูลส่วนบุคคลประเภทต่างๆ ดังนี้:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>ข้อมูลยืนยันตัวตน:</strong> ชื่อ-นามสกุล, เบอร์โทรศัพท์, อีเมล</li>
                <li><strong>ข้อมูลตำแหน่งที่ตั้ง:</strong> พิกัด GPS เพื่อใช้ในการระบุจุดรับรถและส่งรถ</li>
                <li><strong>ข้อมูลการชำระเงิน:</strong> รายละเอียดบัญชีธนาคารและประวัติการทำรายการ (เราไม่เก็บข้อมูลบัตรเครดิตโดยตรง)</li>
                <li><strong>ข้อมูลทางเทคนิค:</strong> IP Address, ข้อมูลเบราว์เซอร์ และประวัติการเข้าใช้งาน</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#001A3D] flex items-center gap-3">
                <Lock className="h-6 w-6 text-[#0047AB]" />
                2. วัตถุประสงค์ในการใช้ข้อมูล
              </h2>
              <p>เราใช้ข้อมูลของคุณเพื่อวัตถุประสงค์ดังต่อไปนี้:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>เพื่อให้บริการจองรถสไลด์และรถยกตามที่คุณต้องการ</li>
                <li>เพื่อประสานงานระหว่างคุณกับผู้ให้บริการรถยก (พาร์ทเนอร์)</li>
                <li>เพื่อตรวจสอบสถานะการชำระเงินและออกใบเสร็จรับเงิน</li>
                <li>เพื่อปรับปรุงคุณภาพการบริการและวิเคราะห์ความต้องการของผู้ใช้งาน</li>
                <li>เพื่อสื่อสารและแจ้งสถานะการทำงานในรูปแบบ Real-time</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#001A3D] flex items-center gap-3">
                <UserCheck className="h-6 w-6 text-purple-500" />
                3. การเปิดเผยข้อมูลแก่บุคคลที่สาม
              </h2>
              <p>
                เราจะเปิดเผยข้อมูลที่จำเป็น (เช่น ตำแหน่งที่ตั้งและเบอร์ติดต่อ) ให้กับผู้ให้บริการรถยกที่เป็นพาร์ทเนอร์ของเราเท่านั้น เพื่อให้สามารถปฏิบัติงานได้สำเร็จ เราจะไม่มีการขายข้อมูลของคุณให้แก่บริษัทการตลาดภายนอกโดยเด็ดขาด
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#001A3D]">4. สิทธิในข้อมูลส่วนบุคคลของคุณ</h2>
              <p>ภายใต้กฎหมายคุ้มครองข้อมูลส่วนบุคคล (PDPA) คุณมีสิทธิดังนี้:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>สิทธิในการเข้าถึงและขอรับสำเนาข้อมูลของคุณ</li>
                <li>สิทธิในการขอแก้ไขข้อมูลให้ถูกต้อง</li>
                <li>สิทธิในการขอให้ลบหรือทำลายข้อมูล</li>
                <li>สิทธิในการคัดค้านการเก็บรวบรวมหรือใช้ข้อมูล</li>
              </ul>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
