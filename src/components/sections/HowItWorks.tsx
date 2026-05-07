"use client";

import { ChevronRight, ClipboardList, CreditCard, Search, Truck } from "lucide-react";

const steps = [
  { icon: ClipboardList, step: "1", title: "กรอกข้อมูล", desc: "ระบุประเภทบริการและรายละเอียดงาน" },
  { icon: Search, step: "2", title: "ระบบหารถ", desc: "ระบบค้นหารถใกล้คุณและแจ้งราคา" },
  { icon: CreditCard, step: "3", title: "ยืนยันการชำระเงิน", desc: "ตรวจสอบราคาและยืนยันการชำระเงิน" },
  { icon: Truck, step: "4", title: "รถเข้ารับงาน", desc: "รถเข้ารับงานตรงเวลา ติดตามสถานะได้แบบเรียลไทม์" },
];

export function HowItWorks() {
  return (
    <section className="relative">
      <div className="text-center mb-16">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0047AB]">Our Process</span>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-[#001A3D]">ขั้นตอนการใช้บริการ</h2>
        <p className="mt-4 text-sm font-medium text-slate-500">เริ่มต้นใช้งานได้ง่ายๆ ในเพียงไม่กี่ขั้นตอน</p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Connection Line (Desktop) */}
        <div className="absolute top-[45px] left-0 hidden w-full h-[2px] border-t-2 border-dashed border-slate-100 lg:block -z-10" />

        {steps.map((item, i) => (
          <div key={i} className="group relative flex flex-col items-center bg-white p-8 rounded-2xl border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-[#0047AB]/10 hover:-translate-y-2">
            
            {/* Step Number Background */}
            <div className="absolute -top-4 -right-2 text-6xl font-black text-slate-50 opacity-[0.05] transition-opacity group-hover:opacity-[0.08]">
              0{item.step}
            </div>

            {/* Icon Container */}
            <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#001A3D] shadow-inner transition-all duration-500 group-hover:bg-[#001A3D] group-hover:text-white group-hover:rotate-6">
              <item.icon className="h-9 w-9" />
              
              {/* Floating Step Badge */}
              <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#0047AB] text-xs font-black text-white shadow-lg shadow-[#0047AB]/20">
                {item.step}
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-[#001A3D] transition-colors group-hover:text-[#0047AB]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
                {item.desc}
              </p>
            </div>

            {/* Animation Indicator (Mobile/Tablet focus) */}
            <div className="absolute bottom-0 left-1/2 h-1 w-0 bg-[#0047AB] -translate-x-1/2 transition-all duration-500 group-hover:w-1/2 rounded-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
