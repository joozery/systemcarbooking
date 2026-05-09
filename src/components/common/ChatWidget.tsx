"use client";

import { useState } from "react";
import { MessageCircle, X, Phone, Mail, Facebook, MessageSquare, Headphones } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ChatWidget() { // Keep name ChatWidget for layout compatibility, or rename if preferred
  const [isOpen, setIsOpen] = useState(false);

  const contactMethods = [
    { 
      name: "โทรด่วน 24 ชม.", 
      icon: <Phone className="h-5 w-5" />, 
      value: "02-xxx-xxxx", 
      href: "tel:020000000",
      color: "bg-green-500",
      label: "ฝ่ายบริการลูกค้า"
    },
    { 
      name: "Line Official", 
      icon: <MessageSquare className="h-5 w-5" />, 
      value: "@crownwealth", 
      href: "https://line.me/ti/p/~@yourid",
      color: "bg-[#06C755]",
      label: "แชทกับเจ้าหน้าที่"
    },
    { 
      name: "Facebook Messenger", 
      icon: <Facebook className="h-5 w-5" />, 
      value: "Crown Wealth Official", 
      href: "https://m.me/yourpage",
      color: "bg-[#0084FF]",
      label: "ติดตามข่าวสาร"
    },
    { 
      name: "อีเมล", 
      icon: <Mail className="h-5 w-5" />, 
      value: "support@crownwealth.com", 
      href: "mailto:support@crownwealth.com",
      color: "bg-red-500",
      label: "ส่งข้อเสนอแนะ"
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-noto-thai">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[320px] bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#001A3D] p-6 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                 <div className="w-12 h-12 bg-white/5 rounded-full blur-xl" />
              </div>
              <Headphones className="h-8 w-8 mx-auto mb-3 text-blue-400" />
              <h3 className="font-black text-lg tracking-tight">ศูนย์ช่วยเหลือลูกค้า</h3>
              <p className="text-blue-200 text-[11px] font-medium opacity-80 uppercase tracking-widest mt-1">Crown Wealth Support</p>
            </div>

            {/* Contact List */}
            <div className="p-4 bg-slate-50/50 space-y-3">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group"
                >
                  <div className={`${method.color} text-white p-3 rounded-xl shadow-lg shadow-inherit group-hover:scale-110 transition-transform`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{method.label}</p>
                    <p className="text-sm font-bold text-slate-700">{method.name}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-slate-50 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">พร้อมให้บริการตลอด 24 ชั่วโมง</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? "bg-white text-[#001A3D] rotate-90" : "bg-[#001A3D] text-white hover:shadow-blue-900/20"
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full" />
        )}
      </motion.button>
    </div>
  );
}
