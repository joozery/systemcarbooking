"use client";

import { motion } from "framer-motion";
import { Clock, Crown, ShieldCheck, Zap, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative h-[720px] w-full overflow-hidden bg-white">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/cover/cover.png" 
          alt="Background" 
          fill 
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col lg:flex-row items-center justify-center lg:justify-between px-6 pt-20 lg:pt-0">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl flex-1 text-center lg:text-left"
        >
          <h1 className="text-5xl font-black uppercase leading-[0.85] tracking-tighter sm:text-[76px]">
            <span className="text-[#001A3D]">CROWN</span>{" "}
            <span className="text-[#0047AB]">WEALTH</span>
          </h1>

          <h2 className="mt-4 lg:mt-6 text-2xl font-bold tracking-tight text-[#001A3D] leading-[1.2] sm:text-4xl">
            เชื่อมต่อทุกการเดินทาง <br className="hidden sm:block" /> มั่นใจทุกบริการ
          </h2>
          <p className="mt-4 lg:mt-6 text-base lg:text-lg font-medium text-slate-500 leading-relaxed max-w-lg mx-auto lg:mx-0">
            แพลตฟอร์มเรียกรถบรรทุกและรถลากจูง <br className="hidden sm:block" /> ที่พร้อมดูแลคุณตลอด 24 ชั่วโมง ด้วยระบบที่ทันสมัยที่สุด
          </p>

          <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-4 lg:gap-5">
            <Link href="/booking" className="flex items-center justify-center gap-3 rounded-xl bg-[#001A3D] px-10 lg:px-12 py-4 lg:py-5 text-base font-bold text-white shadow-2xl shadow-[#001A3D]/30 transition-all hover:scale-105 active:scale-95">
              <Truck className="h-5 w-5" fill="currentColor" />
              เรียกรถทันที
            </Link>
            <button className="rounded-xl border-2 border-[#001A3D]/10 bg-[#F0F7FF]/50 backdrop-blur-sm px-10 lg:px-12 py-4 lg:py-5 text-base font-bold text-[#001A3D] transition-all hover:bg-white active:scale-95">
              รายละเอียดบริการ
            </button>
          </div>

          <div className="mt-12 lg:mt-16 grid grid-cols-2 sm:flex gap-8 lg:gap-12 justify-center lg:justify-start">
            {[
              { icon: Zap, label: "รวดเร็ว" },
              { icon: ShieldCheck, label: "ปลอดภัย" },
              { icon: Crown, label: "เชื่อถือได้" },
              { icon: Clock, label: "บริการ 24 ชม." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 lg:gap-4">
                <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center text-[#001A3D]">
                  <item.icon className="h-6 w-6 lg:h-8 lg:w-8" fill={i === 2 ? "currentColor" : "none"} />
                </div>
                <span className="text-[10px] lg:text-[11px] font-black text-[#001A3D] uppercase tracking-wider whitespace-nowrap">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Content: Larger Mobile/Tablet Image */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="relative hidden flex-1 lg:flex justify-end items-center"
        >
          <div className="relative h-[680px] w-full max-w-[650px]">
             <Image 
               src="/cover/moblie.png" 
               alt="Mobile and Tablet App Mockup" 
               fill 
               className="object-contain object-right"
               priority
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
             />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
