"use client";

import { Crown, Phone, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "หน้าแรก", href: "/" },
    { name: "บริการของเรา", href: "#services" },
    { name: "เกี่ยวกับเรา", href: "#about" },
    { name: "วิธีการใช้งาน", href: "#how-it-works" },
    { name: "ติดต่อเรา", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img 
            src="/logo/logocrown.svg" 
            alt="Crown Wealth Logo" 
            className="h-10 w-auto object-contain"
          />
          <span className="text-xl font-black tracking-tighter uppercase text-[#001A3D]">Crown Wealth</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="text-sm font-semibold text-slate-500 transition-colors hover:text-[#001A3D]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden items-center gap-2 text-sm font-bold md:flex text-[#001A3D]">
            <Phone className="h-4 w-4 fill-current text-[#0047AB]" />
            02-123-4567
          </div>
          <Link href="/partner/register" className="hidden text-sm font-bold text-[#0047AB] hover:text-[#001A3D] transition-colors lg:block">
            ร่วมเป็นพาร์ทเนอร์
          </Link>
          <button className="rounded-lg bg-[#001A3D] px-5 md:px-6 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#002A5D] shadow-md shadow-[#001A3D]/20">
            เข้าสู่ระบบ
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-[#001A3D]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-50 bg-white overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-bold text-slate-600 hover:text-[#001A3D]"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-50 flex flex-col gap-4">
                <Link 
                  href="/partner/register"
                  onClick={() => setIsOpen(false)}
                  className="text-base font-bold text-[#0047AB]"
                >
                  ร่วมเป็นพาร์ทเนอร์
                </Link>
                <div className="flex items-center gap-2 text-sm font-bold text-[#001A3D]">
                  <Phone className="h-4 w-4 fill-current text-[#0047AB]" />
                  02-123-4567
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
