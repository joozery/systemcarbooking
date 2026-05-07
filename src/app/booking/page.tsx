"use client";

import { Navbar } from "@/components/layout/Navbar";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="pt-24 pb-12 px-6">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#001A3D] transition-colors">
            <ArrowLeft className="h-4 w-4" />
            กลับหน้าแรก
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-[#001A3D] tracking-tight">เรียกใช้บริการ</h1>
            <p className="mt-2 text-sm font-medium text-slate-500">
              กรุณากรอกข้อมูลให้ครบถ้วนเพื่อให้ทีมงานจัดหารถที่เหมาะสมที่สุดสำหรับคุณ
            </p>
          </div>

          <BookingWizard />
        </div>
      </main>
    </div>
  );
}
