"use client";

import { Crown, Phone, User } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="flex h-10 w-10 items-center justify-center text-[#001A3D]">
            <Crown className="h-8 w-8" fill="currentColor" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase text-[#001A3D]">Crown Wealth</span>
        </Link>
        
        <div className="hidden items-center gap-8 lg:flex">
          <Link href="#" className="text-sm font-bold text-[#0047AB] border-b-2 border-[#0047AB] pb-1">หน้าแรก</Link>
          <Link href="#services" className="text-sm font-semibold text-slate-500 transition-colors hover:text-[#001A3D]">บริการของเรา</Link>
          <Link href="#about" className="text-sm font-semibold text-slate-500 transition-colors hover:text-[#001A3D]">เกี่ยวกับเรา</Link>
          <Link href="#how-it-works" className="text-sm font-semibold text-slate-500 transition-colors hover:text-[#001A3D]">วิธีการใช้งาน</Link>
          <Link href="#contact" className="text-sm font-semibold text-slate-500 transition-colors hover:text-[#001A3D]">ติดต่อเรา</Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-2 text-sm font-bold md:flex text-[#001A3D]">
            <Phone className="h-4 w-4 fill-current text-[#0047AB]" />
            02-123-4567
          </div>
          <Link href="/partner/register" className="hidden text-sm font-bold text-[#0047AB] hover:text-[#001A3D] transition-colors lg:block">
            ร่วมเป็นพาร์ทเนอร์
          </Link>
          <button className="rounded-lg bg-[#001A3D] px-6 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#002A5D] shadow-md shadow-[#001A3D]/20">
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    </nav>
  );
}
