"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, ShieldCheck, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/staff/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        login(data.data, data.data.token);
      } else {
        setError(data.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (err) {
      setError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden p-6">
      {/* Subtle Ambient Background */}
      <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[20%] right-[20%] w-[30%] h-[30%] bg-indigo-600/5 rounded-full blur-[100px]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[380px] z-10"
      >
        {/* Minimal Header */}
        <div className="mb-10 flex items-center gap-4">
          <div className="h-10 w-10 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-2 flex items-center justify-center">
            <img src="/logo/logocrown.svg" alt="Logo" className="h-full w-full object-contain brightness-0 invert opacity-40" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-300 tracking-[0.2em] uppercase">Crown Wealth</h1>
            <div className="h-[1px] w-8 bg-blue-600/50 mt-1"></div>
          </div>
        </div>

        {/* Stealth Login Card */}
        <div className="bg-white/[0.02] backdrop-blur-2xl rounded-[1.5rem] border border-white/[0.05] shadow-2xl p-8">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-white/90">การยืนยันตัวตน</h2>
            <p className="text-slate-500 text-[10px] font-medium tracking-wide mt-1">Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400/90 text-[10px] font-bold flex items-center gap-2 py-2"
              >
                <div className="h-1 w-1 rounded-full bg-red-500"></div>
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Identity Identifier</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  required
                  type="email" 
                  placeholder="name@organization.com"
                  className="w-full h-11 rounded-xl border border-white/[0.05] bg-white/[0.03] pl-11 pr-4 text-[11px] text-white font-medium outline-none transition-all focus:border-blue-500/30 focus:bg-white/[0.05]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">Security Key</label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full h-11 rounded-xl border border-white/[0.05] bg-white/[0.03] pl-11 pr-11 text-[11px] text-white font-medium outline-none transition-all focus:border-blue-500/30 focus:bg-white/[0.05]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full h-11 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-slate-200 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="h-3.5 w-3.5" />
                  ยืนยันการเข้าถึง
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 flex justify-between items-center px-2">
          <p className="text-[9px] font-medium text-slate-600 uppercase tracking-widest">Core Access v2.0</p>
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
        </div>
      </motion.div>
    </div>
  );
}
