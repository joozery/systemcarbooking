"use client";

import { Navigation, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";

const services = [
  { 
    title: "รถบรรทุก", 
    icon: Truck, 
    desc: "บริการรถบรรทุกขนย้ายสิ่งของทั่วประเทศ",
    img: "/truck.png"
  },
  { 
    title: "รถลากจูง", 
    icon: Navigation, 
    desc: "บริการรถลากจูงช่วยเหลือ 24 ชม. ทั่วประเทศ",
    img: "/hero-bg.png"
  },
  { 
    title: "บริการฉุกเฉิน", 
    icon: ShieldCheck, 
    desc: "ช่วยเหลือฉุกเฉินนอกสถานที่ ตลอด 24 ชั่วโมง",
    img: "/assist.png"
  },
];

export function Services() {
  return (
    <section className="">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0047AB]">Our Services</span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-[#001A3D]">บริการของเรา</h2>
        </div>
        <div className="hidden h-[1px] flex-1 bg-slate-100 mx-12 lg:block" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <div key={i} className="group flex flex-col rounded-xl border border-slate-200/60 bg-white p-1 transition-all duration-500 hover:border-[#0047AB]/20 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
            <div className="relative h-56 w-full overflow-hidden rounded-t-[10px]">
              <Image 
                src={service.img} 
                alt={service.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="absolute top-4 left-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 shadow-sm backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#0047AB] group-hover:text-white">
                  <service.icon className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-bold tracking-tight text-[#001A3D] transition-colors group-hover:text-[#0047AB]">
                {service.title}
              </h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500/90">
                {service.desc}
              </p>
              
              <div className="mt-8 flex items-center justify-between">
                <div className="h-[1px] flex-1 bg-slate-100 group-hover:bg-[#0047AB]/10 transition-colors" />
                <button className="ml-4 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#0047AB] transition-all hover:gap-3">
                  ดูรายละเอียด
                  <span className="text-base">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
