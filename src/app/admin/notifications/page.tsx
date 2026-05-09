"use client";

import { Bell, Clock, UserPlus, ShieldAlert, Info, CheckCircle2, Search, Filter, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useNotifications } from "@/context/NotificationContext";

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.unread);

  const getIcon = (type: string) => {
    switch (type) {
      case 'user': return <UserPlus className="h-5 w-5 text-blue-500" />;
      case 'warning': return <ShieldAlert className="h-5 w-5 text-amber-500" />;
      case 'success': return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      default: return <Info className="h-5 w-5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#001A3D] tracking-tight flex items-center gap-3">
            <div className="p-3 bg-[#001A3D] rounded-2xl text-white">
              <Bell className="h-6 w-6" />
            </div>
            การแจ้งเตือนทั้งหมด
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">จัดการและติดตามความเคลื่อนไหวทั้งหมดในระบบ</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-wider text-slate-400 hover:text-[#0047AB] transition-all"
          >
            <Check className="h-4 w-4" />
            อ่านทั้งหมด
          </button>

          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            <button 
              onClick={() => setFilter('all')}
              className={`px-5 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                filter === 'all' ? "bg-white text-[#0047AB] shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              ทั้งหมด
            </button>
            <button 
              onClick={() => setFilter('unread')}
              className={`px-5 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                filter === 'unread' ? "bg-white text-[#0047AB] shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              ยังไม่ได้อ่าน
            </button>
          </div>
        </div>
      </div>

      {/* Main List */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden">
        <div className="divide-y divide-slate-50">
          {filteredNotifications.map((notif) => (
            <Link 
              key={notif.id}
              href={notif.link}
              onClick={() => markAsRead(notif.id)}
              className={`group flex flex-col md:flex-row md:items-center gap-4 p-6 transition-all hover:bg-slate-50/50 cursor-pointer ${notif.unread ? 'bg-blue-50/10' : ''}`}
            >
              <div className="flex shrink-0 items-start gap-4">
                <div className="pt-2 w-2 shrink-0">
                  {notif.unread && (
                    <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                  )}
                </div>
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-white border border-slate-100 shadow-sm transition-transform group-hover:scale-110`}>
                  {getIcon(notif.type)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                  <h4 className={`text-[16px] ${notif.unread ? 'font-black text-[#001A3D]' : 'font-bold text-slate-400'}`}>
                    {notif.title}
                  </h4>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                      <Clock className="h-3.5 w-3.5" />
                      {notif.time}
                    </span>
                    <span className="hidden md:block text-[11px] font-bold text-slate-300">|</span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{notif.date}</span>
                  </div>
                </div>
                <p className={`text-[14px] leading-relaxed max-w-3xl ${notif.unread ? 'font-medium text-slate-500' : 'font-medium text-slate-300'}`}>
                  {notif.message}
                </p>
              </div>

              <div className="md:opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#001A3D] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-blue-900/20 whitespace-nowrap">
                  ดูรายละเอียด
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
              <Bell className="h-10 w-10 text-slate-200" />
            </div>
            <h3 className="text-lg font-black text-[#001A3D]">ไม่มีการแจ้งเตือน</h3>
            <p className="text-slate-400 text-sm font-medium">คุณได้อ่านข้อมูลทั้งหมดเรียบร้อยแล้ว</p>
          </div>
        )}
      </div>
    </div>
  );
}
