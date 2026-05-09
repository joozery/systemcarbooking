"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Scale, CheckCircle2, AlertCircle, HelpCircle, Truck } from "lucide-react";

export default function TermsOfServicePage() {
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
              <Scale className="h-8 w-8" />
            </motion.div>
            <h1 className="text-4xl font-black text-[#001A3D] tracking-tight mb-4">เงื่อนไขการใช้บริการ (Terms of Service)</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">ปรับปรุงล่าสุดเมื่อ: {lastUpdated}</p>
          </div>

          <div className="space-y-12 text-slate-600 leading-relaxed">
            
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#001A3D] flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                1. การยอมรับข้อตกลง
              </h2>
              <p>
                การเข้าถึงหรือใช้งานเว็บไซต์และแอปพลิเคชันของ Crown Wealth ถือว่าคุณได้อ่าน เข้าใจ และตกลงที่จะปฏิบัติตามเงื่อนไขการใช้บริการเหล่านี้ หากคุณไม่เห็นด้วยกับข้อตกลงใดๆ กรุณางดใช้งานบริการของเรา
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#001A3D] flex items-center gap-3">
                <Truck className="h-6 w-6 text-[#0047AB]" />
                2. ขอบเขตการบริการ
              </h2>
              <p>
                Crown Wealth เป็นผู้ให้บริการแพลตฟอร์มที่เชื่อมโยงระหว่างผู้ใช้บริการและผู้ให้บริการรถยก/รถสไลด์มืออาชีพ เรามุ่งมั่นที่จะคัดสรรพาร์ทเนอร์ที่มีคุณภาพและตรวจสอบประวัติอย่างเข้มงวดเพื่อความปลอดภัยสูงสุดของทรัพย์สินของคุณ
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black text-[#001A3D] flex items-center gap-3">
                <Scale className="h-6 w-6 text-amber-500" />
                3. นโยบายการชำระเงินและยกเลิกงาน
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-black text-[#001A3D] mb-2">การชำระเงิน</h4>
                  <p className="text-sm">ผู้ใช้บริการต้องชำระค่าบริการตามจำนวนที่ระบบแจ้งก่อนเริ่มการปฏิบัติงาน โดยสามารถชำระผ่านช่องทางที่ระบบกำหนดเท่านั้น</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-black text-[#001A3D] mb-2">การยกเลิก</h4>
                  <p className="text-sm">หากมีการยกเลิกงานหลังจากรถออกปฏิบัติหน้าที่แล้ว บริษัทขอสงวนสิทธิ์ในการคิดค่าธรรมเนียมการยกเลิกตามความเหมาะสม</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#001A3D] flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-red-500" />
                4. ข้อจำกัดความรับผิดชอบ
              </h2>
              <p>
                แม้ว่าเราจะมุ่งมั่นมอบบริการที่ดีที่สุด แต่บริษัทจะไม่รับผิดชอบต่อความเสียหายที่เกิดจากเหตุสุดวิสัย (Force Majeure) หรือความเสียหายทางอ้อมที่ไม่ได้เกิดจากความบกพร่องโดยตรงของระบบแพลตฟอร์ม อย่างไรก็ตาม เรามีระบบประกันภัยคุ้มครองความเสียหายของทรัพย์สินระหว่างการขนย้ายตามเงื่อนไขที่กำหนด
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#001A3D]">5. กฎหมายที่ใช้บังคับ</h2>
              <p>
                เงื่อนไขการใช้บริการนี้จะอยู่ภายใต้การบังคับใช้และตีความตามกฎหมายของประเทศไทย และหากมีข้อพิพาทเกิดขึ้น ให้คู่สัญญาตกลงระงับข้อพิพาทโดยศาลในเขตอำนาจศาลของกรุงเทพมหานคร
              </p>
            </section>

            <section className="space-y-4">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex items-start gap-5">
                <HelpCircle className="h-6 w-6 text-slate-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-black text-[#001A3D] mb-2">ต้องการความช่วยเหลือเพิ่มเติม?</h4>
                  <p className="text-sm">หากคุณมีข้อสงสัยเกี่ยวกับเงื่อนไขการใช้บริการ กรุณาติดต่อทีมงานของเราที่ ckw.serviceth@gmail.com หรือโทร 081-1657699</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
