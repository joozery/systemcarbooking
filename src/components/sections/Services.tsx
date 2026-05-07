"use client";

import { motion } from "framer-motion";
import { Navigation, ShieldCheck, Truck, ArrowRight } from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "รถบรรทุก",
    icon: Truck,
    desc: "บริการรถบรรทุกขนย้ายสิ่งของทั่วประเทศ ด้วยทีมงานมืออาชีพและระบบติดตามที่แม่นยำ",
    img: "/truck.png",
    color: "from-blue-600 to-indigo-700"
  },
  {
    title: "รถลากจูง",
    icon: Navigation,
    desc: "บริการรถลากจูงและรถสไลด์ช่วยเหลือ 24 ชม. ทั่วประเทศ ถึงที่หมายรวดเร็วและปลอดภัย",
    img: "/hero-bg.png",
    color: "from-cyan-500 to-blue-600"
  },
  {
    title: "บริการฉุกเฉิน",
    icon: ShieldCheck,
    desc: "ช่วยเหลือฉุกเฉินนอกสถานที่ ตลอด 24 ชั่วโมง ทั้งพ่วงแบตเตอรี่ เปลี่ยนยาง และเติมน้ำมัน",
    img: "/assist.png",
    color: "from-indigo-500 to-purple-600"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Services() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-50/50 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-50/30 blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-center text-center lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">
              Our Premium Services
            </span>
            <h2 className="text-4xl font-black tracking-tight text-[#001A3D] md:text-5xl lg:text-6xl">
              บริการที่ครอบคลุม<span className="text-blue-600">ทุกความต้องการ</span>
            </h2>
            <div className="mt-6 h-1 w-24 rounded-full bg-blue-600/20 mx-auto" />
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)]"
            >
              {/* Image Container */}
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
                
                {/* Icon Overlay */}
                <div className="absolute top-6 right-6">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-lg bg-white shadow-xl backdrop-blur-sm transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-[#001A3D] group-hover:text-white`}>
                    <service.icon className="h-7 w-7" />
                  </div>
                </div>

                {/* Service Title on Image */}
                <div className="absolute bottom-6 left-8">
                  <h3 className="text-2xl font-bold text-white tracking-wide">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Content Container */}
              <div className="flex flex-1 flex-col p-8">
                <p className="text-base leading-relaxed text-slate-500">
                  {service.desc}
                </p>
                
                <div className="mt-auto pt-8">
                  <button className="group/btn relative flex items-center gap-3 overflow-hidden rounded-lg bg-slate-50 px-6 py-3 text-sm font-bold text-[#001A3D] transition-all hover:bg-[#001A3D] hover:text-white">
                    <span className="relative z-10">ดูรายละเอียดเพิ่มเติม</span>
                    <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Hover Accent Line */}
              <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
