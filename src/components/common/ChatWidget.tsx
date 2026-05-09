"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Headset, MoreVertical, Smile } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { id: 1, text: "สวัสดีครับ! Crown Wealth ยินดีให้บริการ มีอะไรให้เราช่วยไหมครับ?", isBot: true, time: "10:00" },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newUserMsg = {
      id: Date.now(),
      text: message,
      isBot: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory([...chatHistory, newUserMsg]);
    setMessage("");

    // Simple Auto-reply Mockup
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        id: Date.now() + 1,
        text: "ขอบคุณสำหรับข้อความครับ เจ้าหน้าที่กำลังจะเข้ามาดูแลคุณในสักครู่...",
        isBot: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-noto-thai">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[360px] md:w-[400px] h-[550px] bg-white rounded-[28px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)] border border-slate-100 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#001A3D] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <Headset className="h-5 w-5" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#001A3D] rounded-full" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Crown Support</h3>
                  <p className="text-[10px] text-blue-200">ออนไลน์พร้อมให้บริการ</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <MoreVertical className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50"
            >
              {chatHistory.map((chat) => (
                <div 
                  key={chat.id} 
                  className={`flex ${chat.isBot ? "justify-start" : "justify-end"} items-end gap-2`}
                >
                  {chat.isBot && (
                    <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center shrink-0 mb-1">
                      <User className="h-3 w-3 text-slate-500" />
                    </div>
                  )}
                  <div className="flex flex-col gap-1 max-w-[80%]">
                    <div className={`px-4 py-2.5 rounded-2xl text-sm font-medium shadow-sm ${
                      chat.isBot 
                        ? "bg-white text-slate-700 rounded-bl-none border border-slate-100" 
                        : "bg-[#0047AB] text-white rounded-br-none"
                    }`}>
                      {chat.text}
                    </div>
                    <span className="text-[9px] text-slate-400 px-1">{chat.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
              <form 
                onSubmit={handleSend}
                className="flex items-center gap-2 bg-slate-100 rounded-2xl px-4 py-2 focus-within:ring-2 ring-blue-500/20 transition-all"
              >
                <button type="button" className="text-slate-400 hover:text-slate-600">
                  <Smile className="h-5 w-5" />
                </button>
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="พิมพ์ข้อความของคุณ..."
                  className="flex-1 bg-transparent border-none outline-none text-sm py-1.5 font-medium placeholder:text-slate-400"
                />
                <button 
                  type="submit"
                  disabled={!message.trim()}
                  className="bg-[#001A3D] text-white p-2 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <p className="text-center text-[10px] text-slate-300 mt-3 font-medium">
                Powered by Crown Wealth Support
              </p>
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
          isOpen ? "bg-white text-[#001A3D] rotate-90" : "bg-[#001A3D] text-white hover:bg-[#002A5D]"
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
