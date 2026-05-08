"use client";

import { CheckCircle2, ShieldCheck, Users, Trophy } from "lucide-react";
import Image from "next/image";

const stats = [
  { icon: Users, label: "ผู้ใช้งาน", value: "50,000+" },
  { icon: ShieldCheck, label: "ความปลอดภัย", value: "100%" },
  { icon: Trophy, label: "รางวัลการันตี", value: "12 Awards" },
];

export function AboutUs() {
  return (
    <section id="about" className="relative overflow-hidden bg-white">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Image with Decorative Elements */}
        <div className="relative flex-1 group">
          <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
            <Image 
              src="/coveabot.png" 
              alt="About Crown Wealth" 
              width={800} 
              height={600} 
              className="object-cover h-[500px]"
            />
            {/* Experience Badge */}
            <div className="absolute bottom-8 left-8 rounded-xl bg-[#001A3D] p-6 text-white shadow-xl">
              <div className="text-3xl font-black">10+</div>
              <div className="text-xs font-bold uppercase tracking-wider opacity-80">Years of Excellence</div>
            </div>
          </div>
          {/* Decorative Background Box */}
          <div className="absolute -top-6 -left-6 h-full w-full rounded-2xl border-2 border-slate-100 -z-0" />
        </div>

        {/* Right: Content */}
        <div className="flex-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0047AB]">Who We Are</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-[#001A3D] leading-tight">
            เราคือผู้นำด้านแพลตฟอร์ม <br className="hidden sm:block" />
            <span className="text-[#0047AB]">บริการรถขนส่งและรถลากจูง</span>
          </h2>
          
          <p className="mt-6 text-sm sm:text-base font-medium leading-relaxed text-slate-500">
            Crown Wealth ก่อตั้งขึ้นด้วยความมุ่งมั่นที่จะยกระดับมาตรฐานการบริการรถขนส่งและรถลากจูงในประเทศไทย 
            เราเชื่อมโยงผู้ให้บริการมืออาชีพเข้ากับผู้ใช้งานที่ต้องการความช่วยเหลืออย่างรวดเร็วและปลอดภัย
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "บริการครอบคลุม 77 จังหวัดทั่วไทย",
              "ทีมงานมืออาชีพผ่านการตรวจสอบประวัติ",
              "ระบบติดตามสถานะแบบ Real-time",
              "ประกันภัยคุ้มครองทุกการขนส่ง"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-[#0047AB]" />
                <span className="text-[13px] sm:text-sm font-bold text-[#001A3D]">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-12 border-t border-slate-100 pt-10">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-[#001A3D]">{stat.value}</span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
