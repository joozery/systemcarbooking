"use client";

import { Crown, MapPin, Phone, Truck, UserCheck, Zap } from "lucide-react";

const stats = [
  { icon: UserCheck, value: "10,000+", label: "ลูกค้าที่ไว้วางใจ" },
  { icon: Truck, value: "5,000+", label: "งานที่ให้บริการ" },
  { icon: MapPin, value: "77 จังหวัด", label: "ครอบคลุมทั่วประเทศ" },
  { icon: Zap, value: "24 ชม.", label: "พร้อมให้บริการ" },
];

export function Stats() {
  return (
    <section className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-[#001A3D] via-[#001A3D] to-[#0047AB] text-white shadow-2xl shadow-[#001A3D]/30 border border-white/5">
      <div className="flex flex-col lg:flex-row">
        {/* Left CTA */}
        <div className="flex flex-[0.8] flex-col justify-center p-10 lg:p-12 relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-blue-500/10 blur-[80px]" />
          
          <div className="relative z-10 flex items-center gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-xl">
               <Crown className="h-9 w-9 text-white" fill="currentColor" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight leading-tight">พร้อมให้บริการคุณ 24 ชั่วโมง</h2>
              <p className="mt-2 text-sm font-medium text-slate-300 opacity-80">เราพร้อมดูแลคุณในทุกเส้นทาง ด้วยทีมงานมืออาชีพและรถคุณภาพ</p>
            </div>
          </div>
          <div className="relative z-10 mt-10 flex gap-4">
            <button className="flex items-center gap-3 rounded-xl bg-white px-8 py-3.5 text-xs font-black text-[#001A3D] transition-all hover:bg-slate-100 active:scale-95 shadow-lg shadow-white/5">
              <Phone className="h-4 w-4" /> ติดต่อเรา
            </button>
            <button className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-xs font-black transition-all hover:bg-white/10 active:scale-95">
              <Zap className="h-4 w-4 fill-current" /> แชทกับเรา
            </button>
          </div>
        </div>

        {/* Right Stats Grid */}
        <div className="flex flex-1 items-center gap-3 bg-white/[0.03] p-4 lg:p-6 backdrop-blur-sm">
          {stats.map((stat, i) => (
            <div key={i} className="group flex flex-1 flex-col items-center justify-center rounded-2xl border border-white/[0.05] bg-white/[0.02] py-10 text-center transition-all duration-500 hover:bg-white/[0.08] hover:border-white/10 hover:-translate-y-1">
              <stat.icon className="mb-4 h-8 w-8 text-[#0047AB] transition-colors group-hover:text-white" />
              <div className="text-2xl font-black tracking-tight">{stat.value}</div>
              <div className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
