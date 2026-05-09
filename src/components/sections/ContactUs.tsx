"use client";

import { Mail, MapPin, Phone, Send, Globe, MessageCircle, Share2, ThumbsUp } from "lucide-react";

export function ContactUs() {
  return (
    <section id="contact" className="py-8">
      <div className="overflow-hidden rounded-3xl bg-[#001A3D] text-white shadow-2xl">
        <div className="flex flex-col lg:flex-row">
          
          {/* Left: Contact Info */}
          <div className="flex flex-col lg:flex-[0.7] bg-[#001430] p-8 lg:p-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0047AB]">Get In Touch</span>
            <h2 className="mt-2 text-2xl lg:text-3xl font-black tracking-tight">ติดต่อเรา</h2>
            <p className="mt-3 text-xs lg:text-sm font-medium text-slate-400 leading-relaxed max-w-sm">
              ทีมงานของเราพร้อมตอบทุกคำถามและให้บริการคุณตลอด 24 ชั่วโมง
            </p>

            <div className="mt-10 space-y-6">
              {[
                { icon: Phone, label: "เบอร์โทรศัพท์", value: "02-123-4567, 081-234-5678" },
                { icon: Mail, label: "อีเมล", value: "contact@crownwealth.com" },
                { icon: MapPin, label: "ที่ตั้งสำนักงาน", value: "123 อาคารสาทรทาวเวอร์ ชั้น 15 ถนนสาทรใต้ แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพฯ 10120" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                    <item.icon className="h-4 w-4 text-[#0047AB]" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500">{item.label}</div>
                    <div className="mt-0.5 text-xs font-bold leading-snug">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-12">
               <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-4">Social Media Channels</div>
               <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Line", icon: MessageCircle, color: "hover:bg-[#06C755]" },
                    { label: "TikTok", icon: Globe, color: "hover:bg-black" },
                    { label: "IG", icon: Camera, color: "hover:bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500" },
                    { label: "Facebook", icon: ThumbsUp, color: "hover:bg-[#1877F2]" }
                  ].map((social, i) => (
                    <a 
                      key={i} 
                      href="#"
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all ${social.color} hover:scale-110 active:scale-95`}
                      title={social.label}
                    >
                      <social.icon className="h-4 w-4 text-white" />
                    </a>
                  ))}
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all hover:bg-black hover:scale-110 active:scale-95" title="X">
                    <span className="text-xs font-black text-white">X</span>
                  </a>
               </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="flex-1 bg-white p-8 lg:p-12 text-[#001A3D]">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">ชื่อ-นามสกุล</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 text-xs font-bold outline-none transition-all focus:border-[#0047AB] focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">เบอร์โทรศัพท์</label>
                  <input 
                    type="tel" 
                    placeholder="08X-XXX-XXXX"
                    className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 text-xs font-bold outline-none transition-all focus:border-[#0047AB] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">อีเมล</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 text-xs font-bold outline-none transition-all focus:border-[#0047AB] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">หัวข้อสอบถาม</label>
                <select className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 text-xs font-bold outline-none transition-all focus:border-[#0047AB] focus:bg-white appearance-none">
                  <option>สอบถามบริการทั่วไป</option>
                  <option>สนใจร่วมเป็นพาร์ทเนอร์</option>
                  <option>แจ้งปัญหาการใช้งาน</option>
                  <option>อื่นๆ</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">ข้อความ</label>
                <textarea 
                  rows={4}
                  placeholder="พิมพ์ข้อความของคุณที่นี่..."
                  className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 text-xs font-bold outline-none transition-all focus:border-[#0047AB] focus:bg-white resize-none"
                />
              </div>

              <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#001A3D] py-4.5 text-xs font-black text-white shadow-xl shadow-[#001A3D]/20 transition-all hover:scale-[1.01] active:scale-95 mt-2">
                <Send className="h-4 w-4" />
                ส่งข้อความ
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
