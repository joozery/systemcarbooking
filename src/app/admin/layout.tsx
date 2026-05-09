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
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { NotificationProvider, useNotifications } from "@/context/NotificationContext";
import NotificationPopover from "@/components/admin/NotificationPopover";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { unreadCount } = useNotifications();

  const isLoginPage = pathname === "/admin/login";
// ... (rest of navigation logic)
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
      
      {/* Sidebar */}
      <aside 
        className={`flex flex-col bg-[#001A3D] text-white z-20 transition-all duration-300 ease-in-out shadow-xl ${
          isCollapsed ? "w-[80px]" : "w-[280px]"
        }`}
      >
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

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-8 scrollbar-hide">
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
                  >
                    <item.icon className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"}`} />
                    {!isCollapsed && <span className="text-[13px] font-bold">{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
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
                    } ${isActive ? "bg-[#0047AB] text-white shadow-lg shadow-[#0047AB]/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                  >
                    <item.icon className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"}`} />
                    {!isCollapsed && <span className="text-[13px] font-bold">{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className={`border-t border-white/5 bg-[#000E1C]/50 p-5 ${isCollapsed ? "p-3" : "p-5"}`}>
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="flex items-center gap-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white mb-4 w-full px-4 py-3">
            {isCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
            {!isCollapsed && <span className="text-[13px] font-bold">หุบเมนู</span>}
          </button>
          <button onClick={logout} className="flex items-center justify-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 w-full px-4 py-3 text-xs font-bold">
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span>ออกจากระบบ</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col overflow-hidden relative min-w-0">
        <header className="flex h-[70px] shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-xl px-8 z-50 sticky top-0">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="ค้นหาข้อมูล..." className="w-full rounded-full bg-slate-100/80 py-2.5 pl-12 pr-4 text-xs font-bold outline-none border border-slate-200 focus:bg-white transition-all" />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:text-[#001A3D]">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>
              <NotificationPopover isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-black text-[#001A3D]">{user?.name || "Admin"}</p>
                <p className="text-[10px] font-bold text-emerald-500 uppercase">{user?.role || "ผู้ดูแลระบบ"}</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-[#001A3D] flex items-center justify-center text-white text-xs font-black shadow-lg">
                AD
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 relative">
          <div className="relative z-10 max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </NotificationProvider>
    </AuthProvider>
  );
}
