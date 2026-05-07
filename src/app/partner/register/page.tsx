"use client";

import { Navbar } from "@/components/layout/Navbar";
import { PartnerWizard } from "@/components/partner/PartnerWizard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PartnerRegistrationPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-24 pb-12 px-6">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#001A3D] transition-colors">
            <ArrowLeft className="h-4 w-4" />
            กลับหน้าแรก
          </Link>
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-black text-[#001A3D] tracking-tight uppercase">ร่วมเป็นพาร์ทเนอร์กับเรา</h1>
          </div>
          <PartnerWizard />
        </div>
      </main>
    </div>
  );
}
