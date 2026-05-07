"use client";

import { Crown, MessageSquare, Camera, Send, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#001A3D] text-white pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center text-white">
                <Crown className="h-8 w-8" fill="currentColor" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">Crown Wealth</span>
            </Link>
            <p className="text-blue-100/60 text-sm leading-relaxed max-w-xs">
              ผู้ให้บริการรถสไลด์และบริการช่วยเหลือฉุกเฉินบนท้องถนนระดับพรีเมียม 
              ด้วยเครือข่ายพาร์ทเนอร์ที่ครอบคลุมทั่วประเทศ ตลอด 24 ชั่วโมง
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <MessageSquare className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Camera className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">ลิงก์สำคัญ</h4>
            <ul className="space-y-4 text-sm text-blue-100/60">
              <li><Link href="/" className="hover:text-white transition-colors">หน้าแรก</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">บริการของเรา</Link></li>
              <li><Link href="#about" className="hover:text-white transition-colors">เกี่ยวกับเรา</Link></li>
              <li><Link href="/partner/register" className="hover:text-white transition-colors">ร่วมเป็นพาร์ทเนอร์</Link></li>
              <li><Link href="/booking/track" className="hover:text-white transition-colors">ติดตามสถานะรถสไลด์</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">บริการของเรา</h4>
            <ul className="space-y-4 text-sm text-blue-100/60">
              <li><a href="#" className="hover:text-white transition-colors">รถสไลด์ 24 ชั่วโมง</a></li>
              <li><a href="#" className="hover:text-white transition-colors">พ่วงแบตเตอรี่ฉุกเฉิน</a></li>
              <li><a href="#" className="hover:text-white transition-colors">เติมน้ำมันฉุกเฉิน</a></li>
              <li><a href="#" className="hover:text-white transition-colors">บริการช่างกุญแจรถยนต์</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ให้คำปรึกษาอุบัติเหตุ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">ติดต่อเรา</h4>
            <ul className="space-y-4 text-sm text-blue-100/60">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-400 shrink-0" />
                <span>123 อาคารคราวน์ ชั้น 15 ถนนสุขุมวิท <br/>แขวงคลองเตย เขตวัฒนา กรุงเทพฯ 10110</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400 shrink-0" />
                <span>02-123-4567 (Call Center 24 ชม.)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400 shrink-0" />
                <span>contact@crownwealth.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-medium text-blue-100/40 tracking-widest uppercase">
            © {currentYear} CROWN WEALTH OPERATIONS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8 text-[10px] font-bold text-blue-100/40 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
