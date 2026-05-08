"use client";

import { useState } from "react";
import { 
  LayoutDashboard, Car, Users, Settings, Bell, Search, 
  LogOut, ShieldAlert, BarChart3, HelpCircle, 
  PanelLeftClose, PanelLeftOpen, ChevronDown, CheckCircle2, Clock,
  CreditCard, Users2, ShieldCheck, History
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainNavItems = [
    { name: "แดชบอร์ด", href: "/admin", icon: LayoutDashboard },
    { name: "จัดการงาน", href: "/admin/jobs", icon: Car },
    { name: "จัดการพาร์ทเนอร์", href: "/admin/vendors", icon: Users },
    { name: "จัดการผู้ใช้งาน", href: "/admin/users", icon: Users2 },
    { name: "การเงิน", href: "/admin/finance", icon: CreditCard },
  ];

  const secondaryNavItems = [
    { name: "ทีมงาน", href: "/admin/staff", icon: ShieldCheck },
    { name: "บันทึกกิจกรรม", href: "/admin/logs", icon: History },
    { name: "รายงานและสถิติ", href: "/admin/reports", icon: BarChart3 },
    { name: "เรื่องร้องเรียน", href: "/admin/complaints", icon: ShieldAlert },
    { name: "ตั้งค่าระบบ", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] text-[#1E293B] font-sans antialiased">
      
      {/* 🌟 Professional Dark Sidebar (Collapsible) */}
      <aside 
        className={`flex flex-col bg-[#001A3D] text-white z-20 transition-all duration-300 ease-in-out shadow-xl ${
          isCollapsed ? "w-[80px]" : "w-[280px]"
        }`}
      >
        
        {/* Brand/Logo Area */}
        <div className="flex h-[70px] items-center px-5 border-b border-white/5 bg-[#001430]/50">
          <div className="flex items-center gap-3 w-full">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-lg border border-blue-400/30 p-1">
              <img src="/logo/logocrown.svg" alt="Logo" className="h-full w-full object-contain" />
            </div>
            
            {!isCollapsed && (
              <div className="flex flex-col justify-center whitespace-nowrap overflow-hidden">
                <span className="text-[14px] font-black uppercase tracking-widest text-white leading-tight">Crown Wealth</span>
                <span className="text-[10px] font-bold tracking-widest text-[#0047AB] uppercase">Workspace</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Area */}
        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-8 scrollbar-hide">
          
          {/* Main Menu */}
          <div className="px-4">
            {!isCollapsed && <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 px-4 whitespace-nowrap">เมนูหลัก</p>}
            <nav className="space-y-1.5">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group relative flex items-center rounded-xl transition-all duration-200 ${
                      isCollapsed ? "justify-center h-12 w-12 mx-auto" : "gap-4 px-4 py-3"
                    } ${
                      isActive 
                        ? "bg-[#0047AB] text-white shadow-lg shadow-[#0047AB]/20" 
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                    title={isCollapsed ? item.name : ""}
                  >
                    {isActive && !isCollapsed && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-blue-400 rounded-r-full shadow-[0_0_10px_rgba(96,165,250,0.8)]"></div>
                    )}
                    <item.icon className={`h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"}`} />
                    {!isCollapsed && <span className="text-[13px] font-bold whitespace-nowrap">{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Secondary Menu */}
          <div className="px-4">
            {!isCollapsed && <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 px-4 whitespace-nowrap">ระบบและเครื่องมือ</p>}
            <nav className="space-y-1.5">
              {secondaryNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group relative flex items-center rounded-xl transition-all duration-200 ${
                      isCollapsed ? "justify-center h-12 w-12 mx-auto" : "gap-4 px-4 py-3"
                    } ${
                      isActive 
                        ? "bg-[#0047AB] text-white shadow-lg shadow-[#0047AB]/20" 
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                    title={isCollapsed ? item.name : ""}
                  >
                    <item.icon className={`h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"}`} />
                    {!isCollapsed && <span className="text-[13px] font-bold whitespace-nowrap">{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

        </div>

        {/* Footer Area */}
        <div className={`border-t border-white/5 bg-[#000E1C]/50 transition-all duration-300 ${isCollapsed ? "p-3" : "p-5"}`}>
          
          {/* Toggle Button */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`flex items-center gap-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all mb-4 ${
              isCollapsed ? "h-12 w-12 justify-center mx-auto" : "px-4 py-3 w-full"
            }`}
          >
            {isCollapsed ? <PanelLeftOpen className="h-5 w-5 shrink-0" /> : <PanelLeftClose className="h-5 w-5 shrink-0" />}
            {!isCollapsed && <span className="text-[13px] font-bold">หุบเมนู</span>}
          </button>

          {!isCollapsed && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5 mb-4 group cursor-pointer hover:bg-white/10 transition-all">
              <div className="relative shrink-0">
                <img src="https://ui-avatars.com/api/?name=Admin+Opor&background=0047AB&color=fff" alt="User" className="h-9 w-9 rounded-full border border-white/10 shadow-sm" />
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#001A3D] bg-[#10B981]"></div>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[13px] font-bold text-white truncate">Admin Opor</span>
                <span className="text-[10px] font-medium text-slate-500 truncate">ผู้ดูแลระบบ</span>
              </div>
            </div>
          )}

          <button className={`flex items-center justify-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 transition-all hover:bg-red-500 hover:text-white shadow-sm ${
            isCollapsed ? "h-12 w-12 mx-auto" : "w-full px-4 py-3 text-xs font-bold"
          }`} title={isCollapsed ? "ออกจากระบบ" : ""}>
            <LogOut className="h-4 w-4 shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">ออกจากระบบ</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area Wrapper */}
      <main className="flex flex-1 flex-col overflow-hidden relative min-w-0">
        
        {/* Top Header */}
        <header className="flex h-[70px] shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-xl px-8 z-10 sticky top-0">
          
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="ค้นหาเลขที่งาน, ชื่อลูกค้า, ทะเบียนรถ..."
              className="w-full rounded-full bg-slate-100/80 py-2.5 pl-12 pr-4 text-xs font-bold text-slate-700 outline-none border border-slate-200 focus:border-[#0047AB]/40 focus:bg-white focus:ring-4 focus:ring-[#0047AB]/5 transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden sm:flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0047AB] transition-colors">
              <HelpCircle className="h-4 w-4" />
              ช่วยเหลือ
            </button>

            <div className="hidden sm:block h-6 w-px bg-slate-200"></div>

            <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:text-[#001A3D] hover:shadow-sm transition-all shrink-0">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">3</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8 relative">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent z-0 pointer-events-none"></div>
          <div className="relative z-10 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
