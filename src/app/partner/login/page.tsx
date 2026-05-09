"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Truck, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PartnerLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/partners/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        localStorage.setItem("partner_token", "dummy_token");
        localStorage.setItem("partner_data", JSON.stringify(result.data));
        router.push("/partner/dashboard");
      } else {
        setError(result.message || "การเข้าสู่ระบบล้มเหลว");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 font-noto-thai relative overflow-hidden bg-black">
      {/* Cinematic Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ 
          backgroundImage: "url('/Users/m2/.gemini/antigravity/brain/f557a864-f212-40c1-98be-4329fc2826aa/partner_login_bg_1778354278103.png')",
          filter: "brightness(0.4) saturate(1.2)"
        }}
      />
      
      {/* Overlay Gradients */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-transparent to-black/60" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#001A3D]/80 via-transparent to-transparent" />

      {/* Decorative Orbs */}
      <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full z-[1]" />
      <div className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full z-[1]" />

      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative z-10"
      >
        {/* Branding & Info Section */}
        <div className="flex-1 text-white space-y-8 hidden lg:block">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4"
          >
             <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
               <img src="/logo/logocrown.svg" alt="Crown Wealth" className="h-10 w-auto" />
             </div>
             <div className="h-10 w-[1px] bg-white/20" />
             <div className="text-xl font-black tracking-widest uppercase">Partner Portal</div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl font-black leading-[1.1] tracking-tighter"
          >
            ร่วมสร้าง <br />
            <span className="text-blue-400 text-shadow-glow">มาตรฐานใหม่</span> <br />
            ของการช่วยเหลือ
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-white/60 font-medium max-w-md leading-relaxed"
          >
            เข้าสู่ระบบเพื่อบริหารจัดการงาน และเข้าช่วยเหลือลูกค้าของคุณได้อย่างรวดเร็วและเป็นมืออาชีพ
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-8 pt-4"
          >
            <div className="flex flex-col">
              <span className="text-3xl font-black">24/7</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Support</span>
            </div>
            <div className="h-10 w-[1px] bg-white/10" />
            <div className="flex flex-col">
              <span className="text-3xl font-black">100%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Reliable</span>
            </div>
          </motion.div>
        </div>

        {/* Login Card Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[420px]"
        >
          <div className="bg-white/10 backdrop-blur-[30px] border border-white/20 rounded-[24px] p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Glossy Reflection */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <div className="mb-8 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-blue-400 mb-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em]">Authorized Access</span>
                </div>
                <h1 className="text-2xl font-black text-white tracking-tight mb-1">ยินดีต้อนรับกลับ</h1>
                <p className="text-white/40 font-medium text-xs">กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบรับงาน</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 flex items-center gap-3 text-red-200 text-[11px] font-bold"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-4">
                  <div className="group">
                    <label className="block text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1.5 ml-2">Username</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-blue-400 transition-colors" />
                      <input 
                        type="text" 
                        required
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white font-bold placeholder:text-white/10 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-xs"
                        placeholder="ชื่อผู้ใช้งานของคุณ"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1.5 ml-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-blue-400 transition-colors" />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-white font-bold placeholder:text-white/10 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-xs"
                        placeholder="รหัสผ่าน"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between px-2">
                   <div className="flex items-center gap-2">
                     <input type="checkbox" id="remember" className="accent-blue-500" />
                     <label htmlFor="remember" className="text-[9px] font-bold text-white/40 cursor-pointer">จดจำฉันไว้</label>
                   </div>
                   <button type="button" className="text-[9px] font-bold text-blue-400 hover:text-blue-300">ลืมรหัสผ่าน?</button>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-[#001A3D] py-4 rounded-xl font-black uppercase tracking-[0.15em] shadow-xl flex items-center justify-center gap-3 transition-all hover:bg-blue-50 active:scale-[0.98] disabled:opacity-50 mt-2 overflow-hidden relative group"
                >
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 group-hover:text-white transition-colors text-xs">
                    {isLoading ? "LOADING..." : "SIGN IN"}
                  </span>
                  <ArrowRight className="h-4 w-4 relative z-10 group-hover:text-white transition-colors" />
                </button>
              </form>

              <div className="mt-8 text-center pt-6 border-t border-white/5">
                <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest mb-3">ยังไม่เป็นพาร์ทเนอร์?</p>
                <button 
                  onClick={() => router.push("/partner/register")}
                  className="px-6 py-2.5 rounded-xl border border-white/10 text-white font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-[#001A3D] transition-all"
                >
                  สมัครสมาชิกใหม่
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Version Info */}
      <div className="absolute bottom-10 right-10 text-[10px] font-black text-white/10 tracking-[0.5em] uppercase pointer-events-none">
        Partner System v2.1.0
      </div>
    </div>
  );
}
