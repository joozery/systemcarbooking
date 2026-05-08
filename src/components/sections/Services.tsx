import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation, ShieldCheck, Truck, ArrowRight, X, CheckCircle2, Clock, MapPin } from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "รถบรรทุก",
    icon: Truck,
    desc: "บริการรถบรรทุกขนย้ายสิ่งของทั่วประเทศ ด้วยทีมงานมืออาชีพและระบบติดตามที่แม่นยำ",
    longDesc: "บริการรถบรรทุกขนย้ายของเราครอบคลุมตั้งแต่การขนย้ายบ้าน สำนักงาน ไปจนถึงสินค้าอุตสาหกรรมขนาดใหญ่ เรามีรถหลากหลายขนาดเพื่อรองรับความต้องการของคุณ พร้อมพนักงานยกของมืออาชีพที่ผ่านการฝึกอบรมมาอย่างดี",
    features: ["ประกันสินค้าเสียหาย", "ติดตามตำแหน่ง Real-time", "พนักงานยกของมืออาชีพ", "วางแผนเส้นทางที่มีประสิทธิภาพ"],
    img: "/truck.png",
    color: "blue"
  },
  {
    title: "รถลากจูง",
    icon: Navigation,
    desc: "บริการรถลากจูงและรถสไลด์ช่วยเหลือ 24 ชม. ทั่วประเทศ ถึงที่หมายรวดเร็วและปลอดภัย",
    longDesc: "เมื่อรถของคุณเกิดปัญหา เราพร้อมเข้าช่วยเหลือทันที ด้วยรถสไลด์และรถยกมาตรฐานสากล ที่จะไม่ทำให้ช่วงล่างหรือตัวรถของคุณเสียหาย บริการครอบคลุมกรณีรถเสีย อุบัติเหตุ หรือเคลื่อนย้ายรถใหม่ส่งโชว์รูม",
    features: ["บริการ 24 ชั่วโมง", "ช่างเทคนิควิเคราะห์หน้างาน", "อุปกรณ์ลากจูงมาตรฐานสูง", "รับประกันความปลอดภัยตัวรถ"],
    img: "/hero-bg.png",
    color: "indigo"
  },
  {
    title: "บริการฉุกเฉิน",
    icon: ShieldCheck,
    desc: "ช่วยเหลือฉุกเฉินนอกสถานที่ ตลอด 24 ชั่วโมง ทั้งพ่วงแบตเตอรี่ เปลี่ยนยาง และเติมน้ำมัน",
    longDesc: "ไม่ต้องกังวลเมื่อเกิดเหตุไม่คาดฝัน ทีมช่างฉุกเฉินของเราพร้อมเดินทางไปหาคุณทุกที่ ไม่ว่าจะเป็นการพ่วงแบตเตอรี่ เปลี่ยนยางอะไหล่ เติมน้ำมันฉุกเฉิน หรือบริการช่างกุญแจรถยนต์ เพื่อให้คุณเดินทางต่อได้อย่างสบายใจ",
    features: ["ถึงที่หมายภายใน 30-45 นาที", "ช่างผู้เชี่ยวชาญเฉพาะทาง", "อุปกรณ์ครบครันในรถเซอร์วิส", "บริการโปร่งใส แจ้งราคาก่อนทำ"],
    img: "/assist.png",
    color: "cyan"
  },
];

export function Services() {
  const [selectedService, setSelectedService] = useState<any>(null);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-[#F8FAFC]">
      {/* Decorative BG */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-100 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 flex flex-col items-center text-center lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="mb-4 inline-block rounded-full bg-white px-5 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 shadow-sm border border-blue-50">
              Premium Solutions
            </span>
            <h2 className="text-4xl font-black tracking-tight text-[#001A3D] md:text-5xl lg:text-6xl leading-[1.1]">
              บริการที่ครอบคลุม<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">ทุกความต้องการ</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-[28px] bg-white border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,102,255,0.06)] hover:-translate-y-1.5"
            >
              {/* Image Header */}
              <div className="relative aspect-video w-full overflow-hidden p-2">
                <div className="relative h-full w-full overflow-hidden rounded-[20px]">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D]/70 via-transparent to-transparent" />
                  
                  {/* Glass Tag */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
                      <h3 className="text-base font-black text-white">{service.title}</h3>
                    </div>
                    <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-white text-[#001A3D] shadow-lg">
                      <service.icon className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col px-6 pb-6 pt-3">
                <p className="text-[13px] font-medium leading-relaxed text-slate-500 mb-6 line-clamp-2">
                  {service.desc}
                </p>
                
                <button 
                  onClick={() => setSelectedService(service)}
                  className="mt-auto group/btn flex items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-[11px] font-black text-[#001A3D] transition-all hover:bg-[#001A3D] hover:text-white"
                >
                  ดูรายละเอียดเพิ่มเติม
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-[#001A3D]/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-md border border-white/20 transition-colors hover:bg-white hover:text-[#001A3D]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-col lg:flex-row h-full max-h-[85vh] overflow-y-auto lg:overflow-hidden">
                {/* Modal Image Section */}
                <div className="relative h-48 lg:h-auto lg:w-[35%] shrink-0">
                  <Image
                    src={selectedService.img}
                    alt={selectedService.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] lg:bg-gradient-to-r lg:from-transparent lg:to-[#001A3D]/10" />
                </div>

                {/* Modal Content Section */}
                <div className="flex-1 p-6 lg:p-10 lg:overflow-y-auto">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <selectedService.icon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-600">Service Detail</span>
                  </div>
                  
                  <h2 className="text-2xl font-black text-[#001A3D] mb-4">{selectedService.title}</h2>
                  <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
                    {selectedService.longDesc}
                  </p>

                  <div className="space-y-3 mb-8">
                    <h4 className="text-[11px] font-black text-[#001A3D] uppercase tracking-wider opacity-60">ฟีเจอร์สำคัญ</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedService.features.map((feat: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span className="text-[12px] font-bold text-slate-700">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                      <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Clock className="h-3 w-3" />
                        <span className="text-[9px] font-black uppercase tracking-wider">เวลาให้บริการ</span>
                      </div>
                      <div className="text-xs font-black text-[#001A3D]">24 ชั่วโมง / 7 วัน</div>
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                      <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-[9px] font-black uppercase tracking-wider">พื้นที่ครอบคลุม</span>
                      </div>
                      <div className="text-xs font-black text-[#001A3D]">ทั่วประเทศไทย</div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedService(null);
                      const contactSection = document.getElementById('contact');
                      contactSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-8 w-full rounded-xl bg-[#001A3D] py-4 text-center text-xs font-black text-white shadow-lg shadow-[#001A3D]/20 transition-all hover:scale-[1.01] active:scale-95"
                  >
                    ปรึกษาบริการหรือจองตอนนี้
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
