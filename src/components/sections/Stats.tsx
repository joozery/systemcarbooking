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
    <section className="relative overflow-hidden bg-[#001A3D] text-white border-y border-white/5">
      {/* Background Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#001A3D] via-[#001A3D] to-[#0047AB] opacity-95" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row">
        {/* Left CTA */}
        <div className="flex flex-col lg:flex-[0.8] justify-center p-8 lg:p-12 relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-blue-500/10 blur-[80px]" />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center lg:items-start text-center lg:text-left gap-6">
            <div className="flex h-14 w-14 lg:h-16 lg:w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-xl">
               <Crown className="h-7 w-7 lg:h-9 lg:w-9 text-white" fill="currentColor" />
            </div>
            <div>
              <h2 className="text-xl lg:text-2xl font-black tracking-tight leading-tight">พร้อมให้บริการคุณ 24 ชั่วโมง</h2>
              <p className="mt-2 text-xs lg:text-sm font-medium text-slate-300 opacity-80">เราพร้อมดูแลคุณในทุกเส้นทาง ด้วยทีมงานมืออาชีพและรถคุณภาพ</p>
            </div>
          </div>
          <div className="relative z-10 mt-8 lg:mt-10 flex flex-col sm:flex-row gap-3 lg:gap-4">
            <button className="flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-3.5 text-xs font-black text-[#001A3D] transition-all hover:bg-slate-100 active:scale-95 shadow-lg shadow-white/5">
              <Phone className="h-4 w-4" /> ติดต่อเรา
            </button>
            <button className="flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-xs font-black transition-all hover:bg-white/10 active:scale-95">
              <Zap className="h-4 w-4 fill-current" /> แชทกับเรา
            </button>
          </div>
        </div>

        {/* Right Stats Grid */}
        <div className="flex-1 grid grid-cols-2 lg:flex items-stretch bg-white/[0.05] backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-white/10 overflow-hidden">
          {stats.map((stat, i) => (
            <div key={i} className="group flex flex-1 flex-col items-center justify-center bg-[#001A3D]/40 py-8 lg:py-10 text-center transition-all duration-500 hover:bg-white/[0.08] border-r border-b lg:border-b-0 border-white/5 last:border-0">
              <stat.icon className="mb-3 h-6 w-6 lg:h-8 lg:w-8 text-[#0047AB] transition-colors group-hover:text-white" />
              <div className="text-xl lg:text-2xl font-black tracking-tight">{stat.value}</div>
              <div className="mt-1 text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
