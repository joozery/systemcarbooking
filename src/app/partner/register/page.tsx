"use client";

import { Navbar } from "@/components/layout/Navbar";
import { PartnerWizard } from "@/components/partner/PartnerWizard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PartnerRegistrationPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="pt-28 pb-20 px-6 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-10">
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-all group">
              <div className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                <ArrowLeft className="h-4 w-4" />
              </div>
              กลับหน้าแรก
            </Link>
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ต้องการความช่วยเหลือ?</span>
              <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">ติดต่อแอดมิน</button>
            </div>
          </div>
          
          <PartnerWizard />

          <div className="mt-12 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
              &copy; 2024 Crown Wealth Service. Secure Registration.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
